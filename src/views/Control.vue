<template>
  <PageHeading title="Control"/>

  <Panel>
    <form class="space-y-8 divide-y divide-gray-200">
      <div class="space-y-8 divide-y divide-gray-200">
        <div>
          <div class="sm:col-span-6">
            <label class="block text-md font-medium text-gray-700">
              Now playing: pacman - blinky
            </label>
          </div>

          <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div class="sm:col-span-4">
              <label class="block text-sm font-medium text-gray-700">
                Next / Previous Animation
              </label>
              <div class="mt-2 flex ">
                <button type="button" @click="prev()"
                        class="inline-flex items-center p-3 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                       xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                  </svg>
                </button>
                <button type="button" @click="next()"
                        class="ml-4 inline-flex items-center p-3 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                       xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </button>
              </div>
            </div>

            <div class="sm:col-span-6">
              <label class="block text-sm font-medium text-gray-700">
                Brightness
              </label>
              <div class="mt-2 flex" @mouseleave="brightness = currentBrightness">
                <span class="relative z-0 inline-flex shadow-sm rounded-md">
                    <button type="button"
                            @mouseover="brightness = 10"
                            @click="setBrightness(10)"
                            class="relative bg-indigo-600 inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-white focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                      10%
                    </button>
                 <button type="button" v-for="step in brignessSteps"
                         :class="step <= brightness ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'"
                         @mouseover="brightness = step"
                         @click="setBrightness(step)"
                         class="-ml-px relative transition inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                      {{ step }}%
                  </button>
                  <button type="button"
                          @mouseover="brightness = 100"
                          @click="setBrightness(100)"
                          :class="brightness > 90 ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'"
                          class="-ml-px relative transition inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                    100%
                  </button>

                </span>
              </div>
            </div>

          </div>
        </div>


      </div>
    </form>

  </Panel>

</template>

<script>
import PageHeading from "../components/PageHeading.vue";
import Panel from "../components/Panel.vue"

export default {
  name: "Control",
  components: {PageHeading, Panel},
  data: () => {
    return {
      brightness: 50,
      currentBrightness: 50
    }
  },
  computed: {
    brignessSteps: () => {
      var steps = [];

      for (let i = 20; i < 100; i += 10) {
        steps.push(i);
      }

      return steps;
    }
  },
  methods: {
    setBrightness(b) {
      this.currentBrightness = this.brightness = b;

      // TODO: Set brightness

    },
    next() {
      // TODO: Go to next animation
    },
    prev() {
      // TODO: Go to previous animation
    }
  }
}
</script>

<style scoped>

</style>