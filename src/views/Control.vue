<template>
  <PageHeading title="Control"/>

  <Panel>
    <form class="space-y-8 divide-y divide-gray-200">
      <div class="space-y-8 divide-y divide-gray-200">
        <div>
          <div class="sm:col-span-6">
            <label class="block text-md font-medium text-gray-700">
              Now playing: {{ currentFile }}
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
                <button type="button" @click="toggleAutoplay()"
                        class="ml-4 inline-flex items-center p-3 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">

                  <svg v-if="!autoplay" class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                       viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>

                  <svg v-if="autoplay" class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                       viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
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
                <span v-if="!brightnessLoaded">Loading brightness</span>
                <span v-if="brightnessLoaded">Brightness: {{ brightness }}</span>
              </label>
              <div v-if="brightnessLoaded">
                <vue-slider class="max-w-sm" :lazy="true" v-model="brightness"></vue-slider>
              </div>
            </div>

          </div>
        </div>

      </div>
    </form>

    <button @click="restart()" type="button"
            class="mt-8 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
      Restart
    </button>

  </Panel>

</template>

<script>
import PageHeading from "../components/PageHeading.vue"
import Panel from "../components/Panel.vue"
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'

export default {
  name: "Control",
  components: {PageHeading, Panel, VueSlider},
  data: () => {
    return {
      currentFile: 'Loading...',

      brightness: 50,
      brightnessLoaded: false,

      autoplay: true
    }
  },
  watch: {
    brightness: function (newVal, oldVal) {
      if (!this.brightnessLoaded)
        return

      this.setBrightness(newVal)
    }
  },
  created() {
    var self = this

    setInterval(this.updateData, 4000)

    this.$http.get('gif/autoplay').then((response) => {
      self.autoplay = response.data == '1'
    })

    this.$http.get('panel/brightness').then((response) => {
      let currentBrightness = parseInt(response.data)

      self.brightness = parseInt((currentBrightness / 254) * 100)

    }).finally(() => { self.brightnessLoaded = true })

  },
  methods: {
    updateData() {
      var self = this
      this.$http.get('gif/name').then((response) => {
        self.currentFile = response.data.replace('/gifs/', '').replace('.gif', '')
      })
    },
    setBrightness(b) {
      let value = Math.round((b / 100) * 254)

      if (value <= 1) value = 2

      this.$http.post('panel/brightness?value=' + value)
    },
    next() {
      var self = this
      this.$http.get('gif/next').then(() => {
        self.updateData()
      })
    },
    prev() {
      var self = this
      this.$http.get('gif/prev').then(() => {
        self.updateData()
      })
    },
    toggleAutoplay() {
      var self = this
      this.autoplay = !this.autoplay

      this.$http.post('gif/autoplay?value=' + (this.autoplay ? '1' : '0')).then((response) => {
        self.autoplay = response.data == '1'
      })
    },
    restart() {
      this.$http.get('restart')
    }
  }
}
</script>

<style scoped>

</style>