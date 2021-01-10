<template>
  <PageHeading title="Art" :button="{ label: 'Create', path: '/art/create' }"/>

</template>

<script>
import PageHeading from "../components/PageHeading.vue";

export default {
  name: "Art",
  components: {
    PageHeading
  }
}
</script>

<style scoped>

</style>