<script setup>
import { useMainStore } from "@/stores/main";
import UserAvatar from "@/components/UserAvatar.vue";
import localS from "@/util/localS";
const userDataJSON = localS.getItem("user");
const userData = JSON.parse(userDataJSON);
</script>

<template>
  <UserAvatar :username="userData.username" :avatar="userData.avatar">
    <slot />
  </UserAvatar>
</template>
