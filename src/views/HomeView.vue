<script setup>
import { ref } from "vue";
import {
  mdiPlusCircle,
  mdiFileDownload,
  mdiSquareEditOutline,
  mdiDelete,
} from "@mdi/js";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import TableTodoList from "@/components/TableTodoList.vue";
import FormLegend from "@/components/FormLegend.vue";
import CardBox from "@/components/CardBox.vue";

// const items = ref([]);
// const branchStore = useContractStore();
// onMounted(async () => {
//   items.value = await branchStore.listTodoList();
//   console.log(items.value);
// });
const buttonTable = ref([
  {
    color: "info",
    icon: mdiPlusCircle,
    roundedFull: true,
    small: true,
    outline: true,
    label: "Thêm mới",
  },
  {
    color: "info",
    icon: mdiFileDownload,
    roundedFull: true,
    small: true,
    outline: true,
    label: "Export",
  },
]);
const buttonOperation = ref([
  {
    color: "info",
    icon: mdiSquareEditOutline,
    name: "edit",
    small: true,
  },
  {
    color: "danger",
    icon: mdiDelete,
    name: "delete",
    small: true,
  },
]);
</script>

<template>
  <LayoutAuthenticated>
    <div class="col-md-6 column">
      <CardBox>
        <FormLegend label="Danh sách công việc">
          <TableTodoList
            checkable
            :button-table="buttonTable"
            :button-operation="buttonOperation"
          ></TableTodoList></FormLegend
      ></CardBox>
    </div>
  </LayoutAuthenticated>
</template>
