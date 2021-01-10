<template>
  <nav class="bg-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <img class="block lg:hidden h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                 alt="Workflow">
            <img class="hidden lg:block h-8 w-auto"
                 src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg" alt="Workflow">
          </div>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <router-link v-for="route in routes" :to="route.path"
                           class="router-link px-3 py-2 rounded-md text-sm font-medium">{{ route.text }}
              </router-link>
            </div>
          </div>
        </div>

        <div class="-mr-2 flex sm:hidden">
          <!-- Mobile menu button -->
          <button
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-insest focus:ring-white"
              aria-expanded="false"
              @click="open = !open">
            <span class="sr-only">Open main menu</span>
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor" aria-hidden="true" :class="open ? 'hidden' : 'block'">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor" aria-hidden="true" :class="open ? 'block' : 'hidden'">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div class="sm:hidden" :class="open ? 'block' : 'hidden'">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <router-link v-for="route in routes" :to="route.path"
                     class="router-link px-3 py-2 rounded-md text-sm font-medium">{{ route.text }}
        </router-link>
      </div>
    </div>
  </nav>

</template>

<script>
import r from '../routes.js'

export default {
  name: "Nav",
  data: () => {
    return {
      open: false
    }
  },
  created() {
    console.log(this.$route.fullPath == window.location.href);
  },
  computed: {
    routes: () => {
      return r;
    }

  },
  methods: {
    isActive: (path) => {
      return false;
    }
  }
}
</script>

<style scoped>

</style>