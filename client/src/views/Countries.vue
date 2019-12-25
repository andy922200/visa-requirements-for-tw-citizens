// ./src/views/Countries.vue
<template>
  <div class="container py-5">
    <Navbar />
    <br />
    <br />
    <br />
    <div class="row justify-content-center">
      請以中文輸入國家/地區關鍵字
      <input type="text" class="form-control" placeholder="如：英國" v-model="query" />
    </div>
    <br />
    <div class="row justify-content-center">
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li
            class="page-item"
            :class="['page-item',{disabled:currentPage===1}]"
            @click.prevent="setPage(currentPage-1)"
          >
            <a class="page-link" href="#">&lt;</a>
          </li>
          <li
            v-for="page in totalPage"
            :key="page"
            class="page-item"
            :class="['page-item',{active:currentPage === page}]"
            @click.prevent="setPage(page)"
          >
            <a class="page-link" href="#">{{page}}</a>
          </li>
          <li
            class="page-item"
            :class="['page-item',{disabled:currentPage===totalPage}]"
            @click.prevent="setPage(currentPage+1)"
          >
            <a class="page-link" href="#">&gt;</a>
          </li>
        </ul>
      </nav>
    </div>
    <div class="row justify-content-center">
      <a target="_blank" href="https://www.boca.gov.tw/cp-37-220-9f130-1.html">
        <h5>最新官方 PDF 檔請點此</h5>
      </a>
      <h5 style="margin-left:10px;">2019.12.06 資料</h5>
    </div>
    <table class="table table-hover">
      <thead class="thead-dark">
        <tr>
          <th scope="col">國家/區域</th>
          <th scope="col">類型</th>
          <th scope="col">天數</th>
          <th scope="col">備註</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(country,index) in filterRows.slice(pageStart, pageStart + offset)"
          :key="index.id"
        >
          <td>{{country.name}}</td>
          <td>{{country.Category.name}}</td>
          <td>{{country.days}}</td>
          <td>{{country.remark}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Navbar from "./../components/Navbar";
import { Toast } from "./../utils/helpers";
import countriesAPI from "./../apis/countries";

export default {
  name: "Countries",
  components: {
    Navbar
  },
  data() {
    return {
      query: "",
      countries: [],
      currentPage: 1,
      offset: 20
    };
  },
  computed: {
    filterRows() {
      let query = this.query.toLowerCase();
      if (!this.query.match(/^[ ]*$/)) {
        return this.countries.filter(d => {
          return d.name.toLowerCase().indexOf(query) > -1;
        });
      } else {
        return this.countries;
      }
    },
    pageStart() {
      return (this.currentPage - 1) * this.offset;
    },
    totalPage() {
      return Math.ceil(this.filterRows.length / this.offset);
    }
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
    },
    setPage(idx) {
      if (idx <= 0 || idx > this.totalPage) {
        return;
      }
      this.currentPage = idx;
    }
  }
};
</script>