// ./src/views/Countries.vue
<template>
  <div class="container py-5">
    <Navbar />
    <br />
    <br />
    <br />
    <DataWithPagination :countries="countries" />
  </div>
</template>

<script>
import Navbar from "./../components/Navbar";
import { Toast } from "./../utils/helpers";
import countriesAPI from "./../apis/countries";
import DataWithPagination from "./../components/Pagination";

export default {
  name: "Countries",
  components: {
    Navbar,
    DataWithPagination
  },
  data() {
    return {
      countries: []
    };
  },
  created() {
    this.fetchCountries();
  },
  methods: {
    async fetchCountries() {
      try {
        const { data, statusText } = await countriesAPI.getCountries();
        if (statusText !== "OK") {
          throw new Error();
        }
        this.countries = data.originData;
      } catch (err) {
        Toast.fire({
          icon: "error",
          title: "暫時無法取得資料，請稍後再試"
        });
      }
    }
  }
};
</script>