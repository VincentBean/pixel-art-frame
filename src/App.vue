<template>
  <Nav/>
  <main class="py-6">
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <router-view/>
    </div>
  </main>
</template>

<script>
import Nav from './components/Nav.vue'

export default {
  name: 'App',
  components: {
    Nav
  }
}
</script>
