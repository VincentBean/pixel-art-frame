<template>
  <PageHeading title="Art" :button="{ label: 'Upload', path: '/art/create' }"/>

  <div>
    <div class="flow-root mt-8">
      <ul class="-my-5 divide-y divide-gray-200">
        <li class="py-4" v-for="file in files">
          <div class="flex items-center space-x-4">
            <div class="flex-shrink-0">
              <img class="h-8 w-8 rounded-full"
                   :ref="file"
                   alt="">
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
  </div>
</template>

<script>
import PageHeading from "../components/PageHeading.vue";

export default {
  name: "Art",
  components: {
    PageHeading
  },
  data: () => {
    return {
      files: []
    }
  },
  created() {
    this.getFiles();
  },
  methods: {
    getFiles() {
      var self = this;
      this.$http.get("files").then((response) => {
        self.files = response.data;

        setTimeout(function () {
          self.loadImages();
        }, 100);
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
    loadImages() {
      var self = this;
      for (let i = 0; i < this.files.length; i++) {
        let file = this.files[i];

        let element = this.$refs[file];

        setTimeout(function () {
          element.src = self.$http.defaults.baseURL + 'file?name=' + file;
        }, 250 * i)
      }

    },
  }
}
</script>

<style scoped>

</style>