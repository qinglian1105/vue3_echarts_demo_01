<template>
  <div class="container">
    <PageSideMenu></PageSideMenu>

    <div id="login-background-div">
      <div id="login-text-background-div">
        <div>

          <div >
            <div class="page-name">
              {{ page_name }}
            </div>
          </div>  

          <div>            
            <div v-if="isLoggedIn === false" class="not-login">
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
        <hr v-if="isLoggedIn"><br>        

        <div v-if="isLoggedIn" class="row">          
          <div class="home-page-text">
            <p>{{ home_text_one }}</p>
            <p>{{ home_text_two }}</p>
            <p>{{ home_text_three }}</p>
            <p>{{ home_text_four }} </p>
          </div>
          <div>
            <PlatformTree></PlatformTree>
          </div>
        </div>


      </div>
    </div>

  </div>

</template>

<script setup>
import PageSideMenu from '@/components/PageSideMenu.vue';
import PlatformTree from '@/components/HomeTree.vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const isLoggedIn = userStore.isLoggedIn;
const userName = userStore.userName;
const page_name = 'Page / Home'

const home_text_one = 'Hi, very happy to welcome you.'
const home_text_two = 'This is a personal platform developed by Vue 3, Bootstrap, ECharts, FastAPI, PostgreSQL...'
const home_text_three = 'The main content of this website can refer the tree chart below.'
const home_text_four = 'Please click the mark in the upper left corner to view side menu for more details.'
</script>

<style lang="scss" src="../assets/additional.scss" scoped></style>
<style lang="scss" src="../assets/bootstrap-icons/font/bootstrap-icons.scss" scoped></style>
