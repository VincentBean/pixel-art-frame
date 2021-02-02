<template>
  <PageHeading title="Connect to Wifi network"></PageHeading>
  <div>
    <div class="flow-root mt-6">
      <ul class="-my-5 divide-y divide-gray-200">
        <li class="py-4" v-for="network in networks">
          <div class="flex items-center space-x-4">
            <div class="min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate">
                {{ network.ssid }}
              </p>
              <p class="text-sm text-gray-500 truncate">
                RSSI: {{ network.rssi }} | Auth: {{ network.auth }}
              </p>
            </div>
            <div class="flex-1 flex justify-end">
              <input v-model="password" v-if="ssid == network.ssid" @keyup.enter.native="connect()" type="password"
                     name="password" id="password"
                     class="shadow-sm max-w-lg float-left focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                     placeholder="WiFi Password">
              <button @click="ssid = network.ssid"
                  class="inline-flex items-center shadow-sm px-4 py-2 float-left ml-3 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 hover:text-white bg-white hover:bg-indigo-600">
                <span v-if="ssid != network.ssid" @click="ssid = network.ssid">Select</span>
                <span v-if="ssid == network.ssid" @click="connect()">Connect</span>
              </button>
            </div>
          </div>
        </li>

      </ul>
    </div>
    <div class="mt-6">
      <button @click="scanNetworks()" v-if="!scanning"
              class="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
        {{ networks.length == 0 ? 'Scan' : 'Scan again' }}
      </button>
      <div class="text-gray-800 flex" v-if="scanning">
        <span class="mr-4">Scanning</span>
        <svg class="animate-bounce w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
             xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"></path>
        </svg>
      </div>
    </div>
  </div>

  <h3 class="mt-8 text-lg leading-6 font-medium text-gray-900">
    Manual
  </h3>
  <div class="mt-2 max-w-xl text-sm text-gray-500">
    <p>
      Enter your network name and password manually
    </p>
  </div>
  <form class="mt-5 sm:flex sm:items-center">
    <div class="max-w-xs w-full">
      <label for="ssid" class="sr-only">Network name</label>
      <input type="text" name="ssid" id="ssid" v-model="ssid"
             class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
             placeholder="Network name">
    </div>

    <div class="max-w-xs w-full ml-3">
      <label for="pass" class="sr-only">Password</label>
      <input type="password" name="password" id="pass" v-model="password" @keyup.enter.native="connect()"
             class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
             placeholder="Password">
    </div>
    <button type="submit" @click="connect()"
            class="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
      Connect
    </button>
  </form>

</template>

<script>
import PageHeading from "../components/PageHeading.vue";

export default {
  name: "Wifi",
  components: {PageHeading},
  data: function () {
    return {
      scanning: false,

      networks: [],

      ssid: '',
      password: ''
    }
  },
  methods: {
    scanNetworks() {
      this.scanning = true;

      this.networks = [];

      var self = this;
      this.$http.get('/wifi/scan').then(function (response) {
        self.networks = response.data;
        self.scanning = false;
      });
    },
    connect() {
      this.$http.post('/config/wifi?ssid=' + this.ssid + '&pass=' + this.password).then(function (response) {
        alert(response.data);
      });
      this.password = this.ssid = '';
    }
  }
}
</script>

<style scoped>

</style>