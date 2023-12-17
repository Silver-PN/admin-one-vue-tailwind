<script setup>
import { computed, ref, onMounted, watch } from "vue";
import TableCheckboxCell from "@/components/TableCheckboxCell.vue";
import BaseLevel from "@/components/BaseLevel.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseButton from "@/components/BaseButton.vue";
import { useContractStore } from "@/stores/contract";
import { useRouter } from "vue-router";
import FormControl from "@/components/FormControl.vue";
import {
  mdiChevronRight,
  mdiChevronLeft,
  mdiPageLast,
  mdiPageFirst,
} from "@mdi/js";

const router = useRouter();
const props = defineProps({
  checkable: {
    type: Boolean,
    default: false,
  },
  buttonTable: {
    type: Object,
    default: () => ({}),
  },
  buttonOperation: {
    type: Object,
    default: () => ({}),
  },
  searchBranch: {
    type: Object,
    default: () => ({}),
  },
});

const items = ref([]);
const branchStore = useContractStore();

onMounted(async () => {
  items.value = await branchStore.listTodoList();
});

const perPage = ref(5);
const perPageOptions = ref({ id: perPage.value, label: perPage.value });

const currentPage = ref(0);

const checkedRows = ref([]);

const itemsPaginated = computed(() =>
  items.value.slice(
    perPage.value * currentPage.value,
    perPage.value * (currentPage.value + 1)
  )
);

const currentPageHuman = computed(() => {
  const from = currentPage.value * perPage.value + 1;
  const to = Math.min(from + perPage.value - 1, items.value.length);
  return `${from}-${to} trong tổng ${items.value.length}`;
});

const numPages = computed(() => Math.ceil(items.value.length / perPage.value));

const remove = (arr, cb) => {
  const newArr = [];

  arr.forEach((item) => {
    if (!cb(item)) {
      newArr.push(item);
    }
  });

  return newArr;
};

const checked = (isChecked, client) => {
  if (isChecked) {
    checkedRows.value.push(client);
  } else {
    checkedRows.value = remove(
      checkedRows.value,
      (row) => row.id === client.id
    );
  }
};

const handleButtonClick = (bts) => {
  if (bts.label === "Thêm mới") {
    router.push("/newbranch");
  }
};
const handleButtonOperation = (button, client) => {
  if (button.name === "edit") {
    router.push(`/informationbranch/${client.id}`);
  }
};
// const handleBranchCode = (client) => {
//   router.push(`/informationbranch/${client.id}`);
// };
const options = [
  { id: 1, label: "1" },
  { id: 2, label: "2" },
  { id: 5, label: "5" },
  { id: 10, label: "10" },
  { id: 20, label: "20" },
  { id: 50, label: "50" },
  { id: 100, label: "100" },
];
const maxDisplayedPages = 5;

const displayedPages = computed(() => {
  const start = Math.max(
    currentPage.value - Math.floor(maxDisplayedPages / 2),
    0
  );
  const end = Math.min(start + maxDisplayedPages, numPages.value);
  const displayed = [];
  for (let i = start; i < end; i++) {
    displayed.push(i);
  }
  return displayed;
});
watch(
  () => perPageOptions.value,
  (newValue) => {
    perPage.value = newValue.id;
    currentPage.value = 0;
  }
);
watch(
  () => props.searchBranch,
  async (newValue) => {
    const fetchData = async () => {
      try {
        const result = await branchStore.searchBranch(newValue);
        items.value = result;
        const data = await branchStore.dataBranch();
        for (const item of items.value) {
          await branchStore.getLabelbranch(data, item);
        }
        currentPage.value = 0;
      } catch (error) {
        console.error(error);
      }
    };

    await fetchData();
  }
);
</script>

<template>
  <div v-if="checkedRows.length" class="p-3 bg-gray-100/50 dark:bg-slate-800">
    <span
      v-for="checkedRow in checkedRows"
      :key="checkedRow.id"
      class="inline-block px-2 py-1 rounded-sm mr-2 text-sm bg-gray-100 dark:bg-slate-700"
    >
      {{ checkedRow.Branch_Code }}
    </span>
  </div>
  <div class="flex justify-end space-x-2 my-1">
    <div v-for="(bts, btsIndex) in buttonTable" :key="btsIndex">
      <BaseButton
        :color="bts.color"
        :icon="bts.icon"
        :small="bts.small"
        :outline="bts.outline"
        :active="bts.active"
        :disabled="bts.disabled"
        :rounded-full="bts.roundedFull"
        :label="bts.label"
        @click="handleButtonClick(bts)"
      />
    </div>
  </div>
  <table>
    <thead>
      <tr>
        <th v-if="checkable" />
        <th>No.</th>
        <th>Thao Tác</th>
        <th>Mã công Việc</th>
        <th>Mô tả công việc</th>
        <th>Mức độ ưu tiên</th>
        <th>Người sở hữu</th>
        <th>Trạng thái</th>
        <th>Ngày bắt đầu</th>
        <th>Ngày kết thúc</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(client, index) in itemsPaginated"
        :key="client.id"
        style="background-color: transparent"
      >
        <TableCheckboxCell
          v-if="checkable"
          @checked="checked($event, client)"
        />
        <td class="border-b-0 lg:w-6 before:hidden">
          {{ index + 1 }}
        </td>
        <td class="before:hidden lg:w-1 whitespace-nowrap">
          <BaseButtons type="justify-start lg:justify-end" no-wrap>
            <div v-for="button in props.buttonOperation" :key="button.id">
              <BaseButton
                :color="button.color"
                :icon="button.icon"
                :small="button.small"
                icon-size="30"
                @click="handleButtonOperation(button, client)"
              />
            </div>
          </BaseButtons>
        </td>
        <td data-label="Branch_Code">
          <span class="branchcode"
            ><strong>{{ client.ID }}</strong></span
          >
        </td>

        <td data-label="Branch_Name">
          <span class="branchname"
            ><strong>{{ client.Description }}</strong></span
          >
        </td>
        <td>
          {{ client.Priority }}
        </td>
        <td>
          {{ client.Owner }}
        </td>
        <td>
          {{ client.Status }}
        </td>
        <td>
          {{ new Date(client.StartDate).toLocaleDateString("vi-VN") }}
        </td>
        <td>
          {{ new Date(client.EndDate).toLocaleDateString("vi-VN") }}
        </td>
      </tr>
    </tbody>
  </table>
  <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
    <BaseLevel>
      <BaseButtons>
        <!-- First Page Button -->
        <BaseButton
          :icon="mdiPageFirst"
          :color="'whiteDark'"
          small
          :disabled="currentPage === 0"
          @click="currentPage = 0"
        />

        <!-- Previous Page Button -->
        <BaseButton
          :icon="mdiChevronLeft"
          :color="'whiteDark'"
          small
          :disabled="currentPage === 0"
          @click="currentPage = currentPage - 1 >= 0 ? currentPage - 1 : 0"
        />

        <!-- Page Number Buttons -->
        <BaseButton
          v-for="page in displayedPages"
          :key="page"
          :active="page === currentPage"
          :label="page + 1"
          :color="page === currentPage ? 'lightDark' : 'whiteDark'"
          small
          @click="currentPage = page"
        />

        <!-- Next Page Button -->
        <BaseButton
          :icon="mdiChevronRight"
          :color="'whiteDark'"
          small
          :disabled="currentPage === numPages - 1"
          @click="
            currentPage =
              currentPage + 1 < numPages ? currentPage + 1 : currentPage
          "
        />

        <!-- Last Page Button -->
        <BaseButton
          :icon="mdiPageLast"
          :color="'whiteDark'"
          small
          :disabled="currentPage === numPages - 1"
          @click="currentPage = numPages - 1"
        />
        <FormControl
          v-model="perPageOptions"
          placeholder=""
          type="select"
          :options="options"
          class="w-[70px]"
        />
      </BaseButtons>

      <small>Công việc {{ currentPageHuman }} Công việc</small>
    </BaseLevel>
  </div>
</template>
