// ./src/views/Countries.vue
<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      請以中文輸入國家/地區關鍵字：
      <input type="text" v-model="query" />
    </div>
    <br />
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">國家/區域</th>
          <th scope="col">英文名稱</th>
          <th scope="col">洲別</th>
          <th scope="col">簽證類型</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(country,index) in filterRows.slice(pageStart, pageStart + offset)"
          :key="index.id"
        >
          <th scope="row">{{country.id}}</th>
          <td>{{country.name}}</td>
          <td>{{country.nameEn}}</td>
          <td>{{country.Continent.name}}</td>
          <td>{{country.Category.name}}</td>
        </tr>
      </tbody>
    </table>

    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li
          class="page-item"
          :class="['page-item',{disabled:currentPage===1}]"
          @click.prevent="setPage(currentPage-1)"
        >
          <a class="page-link" href="#">上一頁</a>
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
          <a class="page-link" href="#">下一頁</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
const dummyData = {
  countries: [
    {
      id: 1,
      name: "日本",
      nameEn: "Japan",
      ContinentId: 1,
      RegionId: 1,
      CategoryId: 1,
      days: 51,
      remark: "beatae",
      createdAt: "2019-12-22T16:47:35.000Z",
      updatedAt: "2019-12-22T16:47:35.000Z",
      Category: {
        id: 1,
        name: "免簽",
        createdAt: "2019-12-22T16:47:35.000Z",
        updatedAt: "2019-12-22T16:47:35.000Z"
      },
      Continent: {
        id: 1,
        name: "亞洲",
        nameEn: "Asia",
        createdAt: "2019-12-22T16:47:35.000Z",
        updatedAt: "2019-12-22T16:47:35.000Z"
      },
      Region: {
        id: 1,
        name: "東北亞",
        nameEn: "Northeast Asia",
        continentId: 1,
        createdAt: "2019-12-22T16:47:35.000Z",
        updatedAt: "2019-12-22T16:47:35.000Z",
        ContinentId: 1
      }
    },
    {
      id: 2,
      name: "國家1",
      nameEn: "country1",
      ContinentId: 6,
      RegionId: 2,
      CategoryId: 1,
      days: 52,
      remark: "voluptatibus",
      createdAt: "2019-12-22T16:47:35.000Z",
      updatedAt: "2019-12-22T16:47:35.000Z",
      Category: {
        id: 1,
        name: "免簽",
        createdAt: "2019-12-22T16:47:35.000Z",
        updatedAt: "2019-12-22T16:47:35.000Z"
      },
      Continent: {
        id: 6,
        name: "南美洲",
        nameEn: "South America",
        createdAt: "2019-12-22T16:47:35.000Z",
        updatedAt: "2019-12-22T16:47:35.000Z"
      },
      Region: {
        id: 2,
        name: "東亞",
        nameEn: "East Asia",
        continentId: 1,
        createdAt: "2019-12-22T16:47:35.000Z",
        updatedAt: "2019-12-22T16:47:35.000Z",
        ContinentId: 1
      }
    },
    {
      id: 3,
      name: "國家2",
      nameEn: "country2",
      ContinentId: 7,
      RegionId: 6,
      CategoryId: 2,
      days: 114,
      remark: "qui",
      createdAt: "2019-12-22T16:47:35.000Z",
      updatedAt: "2019-12-22T16:47:35.000Z",
      Category: {
        id: 2,
        name: "落地簽",
        createdAt: "2019-12-22T16:47:35.000Z",
        updatedAt: "2019-12-22T16:47:35.000Z"
      },
      Continent: {
        id: 7,
        name: "南極洲",
        nameEn: "Antarctica",
        createdAt: "2019-12-22T16:47:35.000Z",
        updatedAt: "2019-12-22T16:47:35.000Z"
      },
      Region: {
        id: 6,
        name: "東歐",
        nameEn: "East Europe",
        continentId: 2,
        createdAt: "2019-12-22T16:47:35.000Z",
        updatedAt: "2019-12-22T16:47:35.000Z",
        ContinentId: 2
      }
    },
    {
      id: 4,
      name: "國家3",
      nameEn: "country3",
      ContinentId: 4,
      RegionId: 6,
      CategoryId: 1,
      days: 96,
      remark: "placeat",
      createdAt: "2019-12-22T16:47:35.000Z",
      updatedAt: "2019-12-22T16:47:35.000Z",
      Category: {
        id: 1,
        name: "免簽",
        createdAt: "2019-12-22T16:47:35.000Z",
        updatedAt: "2019-12-22T16:47:35.000Z"
      },
      Continent: {
        id: 4,
        name: "大洋洲",
        nameEn: "Oceania",
        createdAt: "2019-12-22T16:47:35.000Z",
        updatedAt: "2019-12-22T16:47:35.000Z"
      },
      Region: {
        id: 6,
        name: "東歐",
        nameEn: "East Europe",
        continentId: 2,
        createdAt: "2019-12-22T16:47:35.000Z",
        updatedAt: "2019-12-22T16:47:35.000Z",
        ContinentId: 2
      }
    },
    {
      id: 5,
      name: "國家4",
      nameEn: "country4",
      ContinentId: 4,
      RegionId: 9,
      CategoryId: 3,
      days: 124,
      remark: "rerum",
      createdAt: "2019-12-22T16:47:35.000Z",
      updatedAt: "2019-12-22T16:47:35.000Z",
      Category: {
        id: 3,
        name: "電子簽證",
        createdAt: "2019-12-22T16:47:35.000Z",
        updatedAt: "2019-12-22T16:47:35.000Z"
      },
      Continent: {
        id: 4,
        name: "大洋洲",
        nameEn: "Oceania",
        createdAt: "2019-12-22T16:47:35.000Z",
        updatedAt: "2019-12-22T16:47:35.000Z"
      },
      Region: {
        id: 9,
        name: "南歐",
        nameEn: "South Europe",
        continentId: 2,
        createdAt: "2019-12-22T16:47:35.000Z",
        updatedAt: "2019-12-22T16:47:35.000Z",
        ContinentId: 2
      }
    },
    {
      id: 6,
      name: "國家5",
      nameEn: "country5",
      ContinentId: 1,
      RegionId: 2,
      CategoryId: 3,
      days: 49,
      remark: "fugit",
      createdAt: "2019-12-22T16:47:35.000Z",
      updatedAt: "2019-12-22T16:47:35.000Z",
      Category: {
        id: 3,
        name: "電子簽證",
        createdAt: "2019-12-22T16:47:35.000Z",
        updatedAt: "2019-12-22T16:47:35.000Z"
      },
      Continent: {
        id: 1,
        name: "亞洲",
        nameEn: "Asia",
        createdAt: "2019-12-22T16:47:35.000Z",
        updatedAt: "2019-12-22T16:47:35.000Z"
      },
      Region: {
        id: 2,
        name: "東亞",
        nameEn: "East Asia",
        continentId: 1,
        createdAt: "2019-12-22T16:47:35.000Z",
        updatedAt: "2019-12-22T16:47:35.000Z",
        ContinentId: 1
      }
    },
    {
      id: 7,
      name: "國家6",
      nameEn: "country6",
      ContinentId: 7,
      RegionId: 13,
      CategoryId: 3,
      days: 78,
      remark: "suscipit",
      createdAt: "2019-12-22T16:47:35.000Z",
      updatedAt: "2019-12-22T16:47:35.000Z",
      Category: {
        id: 3,
        name: "電子簽證",
        createdAt: "2019-12-22T16:47:35.000Z",
        updatedAt: "2019-12-22T16:47:35.000Z"
      },
      Continent: {
        id: 7,
        name: "南極洲",
        nameEn: "Antarctica",
        createdAt: "2019-12-22T16:47:35.000Z",
        updatedAt: "2019-12-22T16:47:35.000Z"
      },
      Region: {
        id: 13,
        name: "紐澳",
        nameEn: "Australia & New Zealand",
        continentId: 4,
        createdAt: "2019-12-22T16:47:35.000Z",
        updatedAt: "2019-12-22T16:47:35.000Z",
        ContinentId: 4
      }
    },
    {
      id: 8,
      name: "國家7",
      nameEn: "country7",
      ContinentId: 4,
      RegionId: 6,
      CategoryId: 1,
      days: 7,
      remark: "aut",
      createdAt: "2019-12-22T16:47:35.000Z",
      updatedAt: "2019-12-22T16:47:35.000Z",
      Category: {
        id: 1,
        name: "免簽",
        createdAt: "2019-12-22T16:47:35.000Z",
        updatedAt: "2019-12-22T16:47:35.000Z"
      },
      Continent: {
        id: 4,
        name: "大洋洲",
        nameEn: "Oceania",
        createdAt: "2019-12-22T16:47:35.000Z",
        updatedAt: "2019-12-22T16:47:35.000Z"
      },
      Region: {
        id: 6,
        name: "東歐",
        nameEn: "East Europe",
        continentId: 2,
        createdAt: "2019-12-22T16:47:35.000Z",
        updatedAt: "2019-12-22T16:47:35.000Z",
        ContinentId: 2
      }
    },
    {
      id: 9,
      name: "國家8",
      nameEn: "country8",
      ContinentId: 6,
      RegionId: 4,
      CategoryId: 2,
      days: 159,
      remark: "quaerat",
      createdAt: "2019-12-22T16:47:35.000Z",
      updatedAt: "2019-12-22T16:47:35.000Z",
      Category: {
        id: 2,
        name: "落地簽",
        createdAt: "2019-12-22T16:47:35.000Z",
        updatedAt: "2019-12-22T16:47:35.000Z"
      },
      Continent: {
        id: 6,
        name: "南美洲",
        nameEn: "South America",
        createdAt: "2019-12-22T16:47:35.000Z",
        updatedAt: "2019-12-22T16:47:35.000Z"
      },
      Region: {
        id: 4,
        name: "印度次大陸",
        nameEn: "Subcontinent",
        continentId: 1,
        createdAt: "2019-12-22T16:47:35.000Z",
        updatedAt: "2019-12-22T16:47:35.000Z",
        ContinentId: 1
      }
    },
    {
      id: 10,
      name: "國家9",
      nameEn: "country9",
      ContinentId: 3,
      RegionId: 10,
      CategoryId: 2,
      days: 67,
      remark: "aut",
      createdAt: "2019-12-22T16:47:35.000Z",
      updatedAt: "2019-12-22T16:47:35.000Z",
      Category: {
        id: 2,
        name: "落地簽",
        createdAt: "2019-12-22T16:47:35.000Z",
        updatedAt: "2019-12-22T16:47:35.000Z"
      },
      Continent: {
        id: 3,
        name: "非洲",
        nameEn: "Africa",
        createdAt: "2019-12-22T16:47:35.000Z",
        updatedAt: "2019-12-22T16:47:35.000Z"
      },
      Region: {
        id: 10,
        name: "北非",
        nameEn: "North Africa",
        continentId: 3,
        createdAt: "2019-12-22T16:47:35.000Z",
        updatedAt: "2019-12-22T16:47:35.000Z",
        ContinentId: 3
      }
    },
    {
      id: 11,
      name: "國家10",
      nameEn: "country10",
      ContinentId: 3,
      RegionId: 12,
      CategoryId: 3,
      days: 128,
      remark: "porro",
      createdAt: "2019-12-22T16:47:35.000Z",
      updatedAt: "2019-12-22T16:47:35.000Z",
      Category: {
        id: 3,
        name: "電子簽證",
        createdAt: "2019-12-22T16:47:35.000Z",
        updatedAt: "2019-12-22T16:47:35.000Z"
      },
      Continent: {
        id: 3,
        name: "非洲",
        nameEn: "Africa",
        createdAt: "2019-12-22T16:47:35.000Z",
        updatedAt: "2019-12-22T16:47:35.000Z"
      },
      Region: {
        id: 12,
        name: "南非(非洲南部)",
        nameEn: "Southern Africa",
        continentId: 3,
        createdAt: "2019-12-22T16:47:35.000Z",
        updatedAt: "2019-12-22T16:47:35.000Z",
        ContinentId: 3
      }
    },
    {
      id: 12,
      name: "國家11",
      nameEn: "country11",
      ContinentId: 2,
      RegionId: 12,
      CategoryId: 3,
      days: 151,
      remark: "et",
      createdAt: "2019-12-22T16:47:35.000Z",
      updatedAt: "2019-12-22T16:47:35.000Z",
      Category: {
        id: 3,
        name: "電子簽證",
        createdAt: "2019-12-22T16:47:35.000Z",
        updatedAt: "2019-12-22T16:47:35.000Z"
      },
      Continent: {
        id: 2,
        name: "歐洲",
        nameEn: "Europe",
        createdAt: "2019-12-22T16:47:35.000Z",
        updatedAt: "2019-12-22T16:47:35.000Z"
      },
      Region: {
        id: 12,
        name: "南非(非洲南部)",
        nameEn: "Southern Africa",
        continentId: 3,
        createdAt: "2019-12-22T16:47:35.000Z",
        updatedAt: "2019-12-22T16:47:35.000Z",
        ContinentId: 3
      }
    },
    {
      id: 13,
      name: "國家12",
      nameEn: "country12",
      ContinentId: 6,
      RegionId: 6,
      CategoryId: 2,
      days: 171,
      remark: "ut",
      createdAt: "2019-12-22T16:47:35.000Z",
      updatedAt: "2019-12-22T16:47:35.000Z",
      Category: {
        id: 2,
        name: "落地簽",
        createdAt: "2019-12-22T16:47:35.000Z",
        updatedAt: "2019-12-22T16:47:35.000Z"
      },
      Continent: {
        id: 6,
        name: "南美洲",
        nameEn: "South America",
        createdAt: "2019-12-22T16:47:35.000Z",
        updatedAt: "2019-12-22T16:47:35.000Z"
      },
      Region: {
        id: 6,
        name: "東歐",
        nameEn: "East Europe",
        continentId: 2,
        createdAt: "2019-12-22T16:47:35.000Z",
        updatedAt: "2019-12-22T16:47:35.000Z",
        ContinentId: 2
      }
    },
    {
      id: 14,
      name: "國家13",
      nameEn: "country13",
      ContinentId: 2,
      RegionId: 14,
      CategoryId: 2,
      days: 17,
      remark: "tenetur",
      createdAt: "2019-12-22T16:47:35.000Z",
      updatedAt: "2019-12-22T16:47:35.000Z",
      Category: {
        id: 2,
        name: "落地簽",
        createdAt: "2019-12-22T16:47:35.000Z",
        updatedAt: "2019-12-22T16:47:35.000Z"
      },
      Continent: {
        id: 2,
        name: "歐洲",
        nameEn: "Europe",
        createdAt: "2019-12-22T16:47:35.000Z",
        updatedAt: "2019-12-22T16:47:35.000Z"
      },
      Region: {
        id: 14,
        name: "美拉尼西亞",
        nameEn: "Melanesia",
        continentId: 4,
        createdAt: "2019-12-22T16:47:35.000Z",
        updatedAt: "2019-12-22T16:47:35.000Z",
        ContinentId: 4
      }
    },
    {
      id: 15,
      name: "國家14",
      nameEn: "country14",
      ContinentId: 4,
      RegionId: 18,
      CategoryId: 3,
      days: 163,
      remark: "sit",
      createdAt: "2019-12-22T16:47:35.000Z",
      updatedAt: "2019-12-22T16:47:35.000Z",
      Category: {
        id: 3,
        name: "電子簽證",
        createdAt: "2019-12-22T16:47:35.000Z",
        updatedAt: "2019-12-22T16:47:35.000Z"
      },
      Continent: {
        id: 4,
        name: "大洋洲",
        nameEn: "Oceania",
        createdAt: "2019-12-22T16:47:35.000Z",
        updatedAt: "2019-12-22T16:47:35.000Z"
      },
      Region: {
        id: 18,
        name: "中美",
        nameEn: "Central America",
        continentId: 6,
        createdAt: "2019-12-22T16:47:35.000Z",
        updatedAt: "2019-12-22T16:47:35.000Z",
        ContinentId: 6
      }
    }
  ]
};

export default {
  name: "Countries",
  data() {
    return {
      query: "",
      countries: [],
      currentPage: 1,
      offset: 5
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
    fetchCountries() {
      this.countries = dummyData.countries;
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