<script>

import {defineComponent} from "vue";
import AdminTableComponent from "@/components/AdminTableComponent.vue";
import AdminComponent from "@/components/AdminComponent.vue";
import Header from "@/components/Header.vue";

export default {
  components: {Header, AdminComponent, AdminTableComponent}
}
</script>

<template>
  <Header></Header>
<AdminComponent/>
</template>

<style scoped>

</style>