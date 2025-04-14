<template>
  <div class="container">
    <PageSideMenu></PageSideMenu>

    <div id="login-background-div" style="height: auto; overflow: visible;">
      <div id="login-text-background-div">

        <div>
          <div>
            <div class="page-name">
              {{ page_name }}
            </div>

            <div v-if="isLoggedIn" id="current-user">              
              
              <div v-if="isAccessiable === false">
                <div>
                  <i class="bi bi-person-fill-lock"></i>
                  Sorry, '{{ userName }}' are not allowed to access '{{ api_gate }}'.
                </div>
                <br>
                <div style="margin-right: 415px">
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

        <div v-if="isLoggedIn" class="row">

          <div v-if="isAccessiable">
          
            <div class="financial-info-page-content">
              <h4 style="text-align: center;">{{ topic_name }}</h4>
              <nav>
                <div class="nav nav-tabs mb-3" id="nav-tab" role="tablist">
                  <button class="nav-link active" id="nav-introduction-tab" data-bs-toggle="tab"
                    data-bs-target="#nav-introduction" type="button" role="tab" aria-controls="nav-introduction"
                    aria-selected="true">Introduction</button>
                  <button class="nav-link" id="nav-overview-tab" data-bs-toggle="tab" data-bs-target="#nav-overview"
                    type="button" role="tab" aria-controls="nav-overview" aria-selected="false">Overview</button>

                  <button class="nav-link" id="nav-industry-tab" data-bs-toggle="tab" data-bs-target="#nav-industry"
                    type="button" role="tab" aria-controls="nav-industry" aria-selected="false">Distribution by
                    Industry</button>

                </div>
              </nav>
              <div class="tab-content p-3 border bg-light" id="nav-tabContent">
                <div class="tab-pane fade active show" id="nav-introduction" role="tabpanel"
                  aria-labelledby="nav-introduction-tab">
                  <TabIntroductionText></TabIntroductionText><br>
                </div>
                <div class="tab-pane fade" id="nav-overview" role="tabpanel" aria-labelledby="nav-overview-tab">
                  <div>
                    <RowSelectDate></RowSelectDate><br>
                    <RowMetric></RowMetric>
                    <RowChart></RowChart><br>
                    <RowTable></RowTable>
                  </div>
                </div>
                <div class="tab-pane fade" id="nav-industry" role="tabpanel" aria-labelledby="nav-industry-tab">
                  <h4 style="color:red;">Sorry, under construction...</h4><br><br><br><br><br><br><br><br><br><br>
                </div>
              </div>

            </div>
          </div>
       
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import PageSideMenu from '@/components/PageSideMenu.vue';
import RowChart from '@/components/FinCharts.vue';
import RowMetric from '@/components/FinMetric.vue';
import RowSelectDate from '@/components/FinSelectDate.vue';
import RowTable from '@/components/FinTable.vue';
import TabIntroductionText from '@/components/FinIntroduction.vue';

import { useUserStore } from '@/stores/user';
import { useFinSelectDateStore } from "../stores/FinInfoSelectDate.js";
import { ref, onMounted  } from 'vue';
import { useRouter } from 'vue-router';

import { get_date_time_string } from "../assets/js-funcs/auth_user.js"

const userStore = useUserStore();
const isLoggedIn = userStore.isLoggedIn;
const userName = userStore.userName;
const page_name = 'Page / Financial Info'
const topic_name = 'The Statistics of top ETFs in Taiwan'
const useFinDateStore = useFinSelectDateStore()

const router = useRouter();
let isAccessiable = ref('')
let api_gate = ref('')
let accessible_pages = ref('')

onMounted(() => {
  isAccessiable.value = ''
  accessible_pages = userStore.user.authority
  api_gate.value = router.currentRoute.value.name 
  if (accessible_pages.includes(api_gate.value)) {
    isAccessiable.value = true
  } else {
    isAccessiable.value = false
  }   
})

</script>

<style lang="scss" src="../assets/additional.scss" scoped></style>
<style lang="scss" src="../assets/bootstrap-icons/font/bootstrap-icons.scss" scoped></style>
