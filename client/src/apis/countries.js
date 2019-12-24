// ./src/apis/countries.js
import { apiHelper } from './../utils/helpers'

export default {
  getCountries() {
    return apiHelper.get(`/visa/countries`)
  }
}