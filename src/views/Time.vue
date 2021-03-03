<template>
  <PageHeading title="Date / Time"/>

  <span v-if="loading">Retrieving date / time settings</span>
  <Panel v-if="!loading">
      <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div>
          <div class="divide-y divide-gray-200 space-y-6 sm:pt-10 sm:space-y-5">
            <div class="space-y-6 sm:space-y-5 divide-y divide-gray-200">
                <div role="group" aria-labelledby="label-email">
                  <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline">
                    <div>
                      <div class="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700" id="label-email">
                        Enabled
                      </div>
                    </div>
                    <div class="mt-4 sm:mt-0 sm:col-span-2">
                      <div class="max-w-lg space-y-4">
                        <div class="relative flex items-start">
                          <div class="flex items-center h-5">
                            <input v-model="enabled" id="enabled" name="enabled" type="checkbox"
                                   class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded">
                          </div>
                          <div class="ml-3 text-sm">
                            <p class="text-gray-500" @click="enabled = !enabled">Enable date / time</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>

          <div class="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
            <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label for="interval" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Interval
                <p class="mt-1 max-w-2xl text-sm text-gray-500">
                  How often the time should be shown
                </p>
              </label>
              <div class="mt-1 sm:mt-0 sm:col-span-2">
                <div class="max-w-lg flex rounded-md shadow-sm">
                  <input v-model="interval" type="text" name="interval" id="interval"
                         class="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300">
                </div>
              </div>
            </div>
          </div>

          <div class="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
            <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label for="show" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                How long should we display the time?
                <p class="mt-1 max-w-2xl text-sm text-gray-500">
                  In seconds
                </p>
              </label>
              <div class="mt-1 sm:mt-0 sm:col-span-2">
                <div class="max-w-lg flex rounded-md shadow-sm">
                  <input v-model="show" type="text" name="show" id="show"
                         class="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300">
                </div>
              </div>
            </div>
          </div>

          <div class="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
            <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label for="show" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                UTC offset (What timezone you live in)
                <p class="mt-1 max-w-2xl text-sm text-gray-500">
                  In hours
                </p>
              </label>
              <div class="mt-1 sm:mt-0 sm:col-span-2">
                <div class="max-w-lg flex rounded-md shadow-sm">
                  <input v-model="utcOffset" type="text" name="show" id="show"
                         class="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300">
                </div>
              </div>
            </div>
          </div>

          <div class="pt-5">
            <div class="flex justify-end">
              <button @click="showTime()" type="button"
                      class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Display time
              </button>
              <button @click="save()" type="submit"
                      class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
  </Panel>
</template>

<script>
import PageHeading from "../components/PageHeading.vue";
import Panel from "../components/Panel.vue";

export default {
  name: "Time",
  components: {Panel, PageHeading},
  data: () => {
    return {
      loading: true,

      enabled: true,
      interval: 60,
      show: 10,
      utcOffset: 0
    }
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      let self = this;

      this.$http.get('time/settings').then(function(response) {
        self.enabled = response.data.enable == 1;
        self.inteval = response.data.inteval;
        self.offset = response.data.utcOffset / 3600;
        self.show = response.data.show;
        self.loading = false;
      });

    },
    save() {
      this.$http.post('time/settings?enable=' + (this.enabled ? '1' : '0') +
          '&interval=' + this.interval + '&show=' + this.show + '&offset=' + this.utcOffset * 3600);
    },
    showTime() {
      this.$http.get('time/show');
    }
  }
}
</script>

<style scoped>

</style>