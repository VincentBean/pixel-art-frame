<template>
  <PageHeading title="Art" :button="{ label: 'Upload', path: '/art/create' }"/>

  <Panel>
    <span class="text-gray-600" v-if="files.length == 0">Retrieving art...</span>

    <div class="flow-root">
      <ul class="-my-5 divide-y divide-gray-200">
        <li class="py-4" v-for="file in files">
          <div class="flex items-center space-x-4">
            <div class="flex-shrink-0">
              <img @click="preview(file)" :id="file" class="h-8 w-32 cursor-pointer" alt="" :lazy-src="'/file?name=' + file">
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate">
                {{ getFilename(file) }}
              </p>
              <p class="text-sm text-gray-500 truncate">
                {{ file }}
              </p>
            </div>
            <div>
              <span class="relative z-0 inline-flex shadow-sm rounded-md">
              <button @click="deleteFile(file)" type="button"
                      class="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-red-600 text-sm font-medium text-white hover:bg-red-400 focus:z-10 focus:outline-none">
                Delete
              </button>
              <a :href="'/file?name=' + file" target="_blank" type="button"
                 class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                Download
              </a>
              <button @click="playGif(file)" type="button"
                      class="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                Play
              </button>
            </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <button v-if="canLoadMore" v-on:click="getFiles" type="button"
            class="mt-6 inline-flex items-center px-12 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
      Load more
    </button>
    <button v-if="canLoadMore" v-on:click="getFiles(true)" type="button"
            class="ml-4 mt-6 inline-flex items-center px-12 py-2 border border-gray-300 shadow-sm text-center text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
      Load all
    </button>
  </Panel>
</template>

<script>
import PageHeading from "../components/PageHeading.vue";
import Panel from "../components/Panel.vue"

export default {
  name: "Art",
  components: {
    PageHeading,
    Panel
  },
  data: () => {
    return {
      indexCount: 0,
      currentIndex: 0,
      loading: true,

      files: []
    }
  },
  computed: {
    canLoadMore() {
      return !this.loading && this.indexCount != (this.currentIndex - 1);
    }
  },
  created() {
    this.getFiles();
  },
  methods: {
    getFiles(all) {
      // TODO: Add option to get files via /files endpoint

      this.getFilesByIndex(all);
    },
    getFilesByIndex(all) {
      let self = this;

      if (all === undefined)
        all = false;

      if (this.indexCount > 0 && !this.canLoadMore) {
        return; // All files retrieved
      }

      this.loading = true;

      if (this.indexCount == 0) {
        this.$http.get('index/count').then(function (response) {
          self.indexCount = response.data;
          self.loading = false;
          self.getFilesByIndex();
        });

        return;
      }

      this.$http.get('index/index.' + this.currentIndex).then(function (response) {
        self.files = self.files.concat(response.data.split("\n"));
        self.files.pop(); // Last line is empty

        self.currentIndex++;
        self.loading = false;

        if (all) {
          self.getFilesByIndex(all);
        }
      });

    },
    getFilename(file) {
      return file.replace('/gifs/', '').replace('.gif', '');
    },
    playGif(file) {
      this.$http.post('gif?name=' + file);
    },
    deleteFile(file) {
      if (!confirm('Are you sure you want to delete ' + file + '?')) {
        return;
      }

      this.files = [];

      var self = this;

      setTimeout(() => {
        self.$http.post('file/delete?name=' + file).then((response) => {
          self.getFiles();
        });
      }, 500);
    },
    preview(file) {
      let elem = document.getElementById(file);
      let src = elem.getAttribute('lazy-src');
      elem.setAttribute('src', src);
    }
  }
}
</script>