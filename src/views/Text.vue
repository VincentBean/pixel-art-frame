<template>
  <PageHeading title="Text"/>

  <Panel>
    <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
      <div class="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
        <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
          <label for="interval" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
            Text
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
              Text to display
            </p>
          </label>
          <div class="mt-1 sm:mt-0 sm:col-span-2">
            <div class="max-w-lg flex rounded-md shadow-sm">
              <input v-model="text" type="text" name="interval" id="interval"
                     class="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300">
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
        <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
          <label class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
            Color
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
              RGB Color
            </p>
          </label>
          <div class="mt-1 sm:mt-0 sm:col-span-2">
            <div class="max-w-lg flex rounded-md shadow-sm">

              <span class="mt-2 mr-2">R</span>
              <input v-model="color.red" type="text" name="red" min="0" max="255"
                     class="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300">

              <span class="mt-2 ml-4 mr-2">G</span>
              <input v-model="color.green" type="number" name="green" min="0" max="255"
                     class="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300">

              <span class="mt-2 ml-4 mr-2">B</span>
              <input v-model="color.blue" type="number" name="blue" min="0" max="255"
                     class="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300">

            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
        <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
          <label class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
            Text size
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
              1 is default 6x8, 2 is 12x18, 3 is 18x24 etc
            </p>
          </label>
          <div class="mt-1 sm:mt-0 sm:col-span-2">
            <div class="max-w-lg flex rounded-md shadow-sm">
              <input v-model="textSize" type="text" name="red" min="0" max="6"
                     class="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300">
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
        <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
          <label class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
            Position
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
              X, Y position
            </p>
          </label>
          <div class="mt-1 sm:mt-0 sm:col-span-2">
            <div class="max-w-lg flex rounded-md shadow-sm">

              <span class="mt-2 mr-2">X</span>
              <input v-model="position.x" type="text"
                     class="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300">

              <span class="mt-2 ml-4 mr-2">Y</span>
              <input v-model="position.y" type="number"
                     class="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300">
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
        <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
          <label class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
            Delay time
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
              How long should we display the text in seconds?
            </p>
          </label>
          <div class="mt-1 sm:mt-0 sm:col-span-2">
            <div class="max-w-lg flex rounded-md shadow-sm">
              <input v-model="delay" type="number"
                     class="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300">
            </div>
          </div>
        </div>
      </div>

      <div class="divide-y divide-gray-200 space-y-6 sm:pt-10 sm:space-y-5">
        <div class="space-y-6 sm:space-y-5 divide-y divide-gray-200">
          <div role="group" aria-labelledby="label-email">
            <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline">
              <label class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Scroll
              </label>
              <div class="mt-4 sm:mt-0 sm:col-span-2">
                <div class="max-w-lg space-y-4">
                  <div class="relative flex items-start">
                    <div class="flex items-center h-5">
                      <input v-model="scroll" id="scroll" name="scroll" type="checkbox"
                             class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 sm:mt-5 space-y-6 sm:space-y-5" v-if="scroll">
        <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
          <label class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
            Scroll speed
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
              Time between each text movement in ms. <br/>
              1000 ms = 1s
            </p>
          </label>
          <div class="mt-1 sm:mt-0 sm:col-span-2">
            <div class="max-w-lg flex rounded-md shadow-sm">
              <input v-model="scrollSpeed" type="number"
                     class="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300">
            </div>
          </div>
        </div>
      </div>

      <div class="pt-5">
        <div class="flex justify-end">
          <button @click="send()" type="submit"
                  class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Send
          </button>
        </div>
      </div>
    </div>
  </Panel>
</template>

<script>
import PageHeading from "../components/PageHeading.vue";
import Panel from "../components/Panel.vue";

export default {
  name: "Text",
  components: {Panel, PageHeading},
  data: () => {
    return {
      text: "",
      textSize: 1,
      delay: 4,
      color: {
        red: 255,
        green: 0,
        blue: 0
      },
      position: {
        x: 4,
        y: 4
      },
      scroll: false,
      scrollSpeed: 4
    }
  },
  methods: {
    send() {
      let data = '?text=' + this.text;

      if (this.text == '') {
        return; // TODO: error
      }

      let r = parseInt(this.color.red);
      let g = parseInt(this.color.green);
      let b = parseInt(this.color.blue);

      if (r > 0 || g > 0 || b > 0) {
        data += '&color=' + this.getColorRGB565(r, g, b);
      }

      if (this.textSize > 1) {
        data += '&size=' + this.textSize;
      }

      data += '&x=' + this.position.x + '&y=' + this.position.y;
      data += '&delay=' + this.delay;

      if (this.scroll) {
        data += '&scroll=1&speed=' + this.scrollSpeed;
      }

      this.$http.post('/text' + data);
    },
    getColorRGB565(r, g, b) {
      return ((r & 0xF8) << 8) | ((g & 0xFC) << 3) | (b >> 3);
    }
  }
}
</script>

<style scoped>

</style>