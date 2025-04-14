<template>
  <div class="container">
    <PageSideMenu></PageSideMenu>
    <br><br>
    <div>
      <div>
        <div>
          <div>

            <div class="page-name">
              {{ page_name }}
            </div>

            <div v-if="isLoggedIn" id="current-user">

              <div v-if="isAccessiable === false">
                <div>
                  <i class="bi bi-person-fill-lock"></i>
                  Sorry, '{{ userName }}' is not allowed to access '{{ api_gate }}'.
                </div>
                <br>
                <div style="margin-right: 405px">
                  <router-link :to="{ name: 'home' }"><i class="bi bi-house-fill"></i>&nbsp;&nbsp;Home</router-link>
                </div>
              </div>

            </div>
            <div class="not-login" v-else>
              <div>
                <i class="bi bi-person-fill-lock"></i>
                You are not logged in yet.
              </div>
              <br>
              <div style="margin-right: 165px">
                <a href="/"><i class="bi bi-box-arrow-right"></i>&nbsp;&nbsp;Login</a>
              </div>
            </div>

          </div><br>
        </div>
        <hr v-if="isAccessiable"><br>

        <div v-if="isLoggedIn" class="row justify-content-center"></div>
        <div v-if="isAccessiable">

          <div id="db-status-content">
            <h5>Main tables of DB (invest)</h5><br>

            <h6 class="db-status-table-title">Table "top-etf" counts</h6>
            <table class="table table-hover sm" id="table-counts-etf">
              <thead>
                <tr>
                  <th scope="col" v-for="thd in table_counts_etf.thead">{{ thd }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="trs in table_counts_etf.trs">
                  <td v-for="tr in trs">{{ tr }}</td>
                </tr>
              </tbody>
            </table><br>

            <h6 class="db-status-table-title">Table "top-etf-holding" counts</h6>
            <table class="table table-hover" id="table-counts-etf-holding">
              <thead>
                <tr>
                  <th v-for="thd in table_counts_etf_holding.thead">{{ thd }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="trs in table_counts_etf_holding.trs">
                  <td v-for="tr in trs">{{ tr }}</td>
                </tr>
              </tbody>
            </table><br>

            <h6 class="db-status-table-title">Table "top-etf" latest records</h6>
            <table class="table table-hover" id="table-records-etf">
              <thead>
                <tr>
                  <th v-for="thd in table_latest_record_etf.thead">{{ thd }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="trs in table_latest_record_etf.trs">
                  <td v-for="tr in trs">{{ tr }}</td>
                </tr>
              </tbody>
            </table><br>

            <h6 class="db-status-table-title">Table "top-etf-holding" latest records</h6>
            <table class="table table-hover" id="table-records-etf-holding">
              <thead>
                <tr>
                  <th v-for="thd in table_latest_record_etf_holding.thead">{{ thd }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="trs in table_latest_record_etf_holding.trs">
                  <td v-for="tr in trs">{{ tr }}</td>
                </tr>
              </tbody>
            </table><br>

          </div>

        </div>
      </div>

    </div>

  </div>
</template>


<script setup>
import PageSideMenu from '@/components/PageSideMenu.vue';
import { useUserStore } from '@/stores/user';
import { onMounted, ref } from 'vue';
import axios from "axios";
import { useRouter } from 'vue-router';
import { transfer_data_status_table_counts, transfer_data_status_table_records } from "../assets/js-funcs/data_status.js"

const userStore = useUserStore();
const isLoggedIn = userStore.isLoggedIn;
const userName = userStore.userName;
const page_name = 'Page / Data Status'
const router = useRouter();
const api_url_invest = 'http://localhost:5008/api'



let isAccessiable = ref('')
let api_gate = ref('')
let accessible_pages = ref('')
let table_counts_etf = ref('')
let table_counts_etf_holding = ref('')
let table_latest_record_etf = ref('')
let table_latest_record_etf_holding = ref('')

let counts_apis = [
  api_url_invest + '/data_status/get_table_etf_recent_counts',
  api_url_invest + '/data_status/get_table_holding_recent_counts'
]
let counts_tables = [table_counts_etf, table_counts_etf_holding]

let records_apis = [
  api_url_invest + '/data_status/get_table_etf_latest_records',
  api_url_invest + '/data_status/get_table_holding_latest_records'
]
let records_tables = [table_latest_record_etf, table_latest_record_etf_holding]


onMounted(() => {
  isAccessiable.value = ''
  accessible_pages = userStore.user.authority
  api_gate.value = router.currentRoute.value.name
  if (accessible_pages.includes(api_gate.value)) {
    isAccessiable.value = true
  } else {
    isAccessiable.value = false
  }

  if (isAccessiable) {

    for (let i = 0; i < counts_apis.length; i++) {
      axios.get(counts_apis[i])
        .then(function (response) {
          if (response.data) {
            let table_counts = transfer_data_status_table_counts(response.data)
            eval(counts_tables[i]).value = table_counts
          } else {
            eval(counts_tables[i]).value = {}
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    for (let i = 0; i < records_apis.length; i++) {
      axios.get(records_apis[i])
        .then(function (response) {
          if (response.data) {
            let table_counts = transfer_data_status_table_records(response.data)
            eval(records_tables[i]).value = table_counts
          } else {
            eval(records_tables[i]).value = {}
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }

  }

})
</script>


<style lang="scss" src="../assets/additional.scss" scoped></style>
<style lang="scss" src="../assets/bootstrap-icons/font/bootstrap-icons.scss" scoped></style>
