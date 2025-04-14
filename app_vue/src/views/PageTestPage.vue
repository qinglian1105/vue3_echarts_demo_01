<template>
  <div class="container">
    <PageSideMenu></PageSideMenu>

    <div id="login-background-div">
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
                  <div style="margin-right: 380px">
                    <router-link :to="{ name: 'home' }"><i class="bi bi-house-fill"></i>&nbsp;&nbsp;Home</router-link>
                  </div>
                </div>

            </div>
            <div v-else class="not-login">
              <i class="bi bi-person-fill-lock"></i>
              You are not logged in yet.            
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
            <div class="home-page-text">
              <p>Hi...</p>
            </div>
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
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const isLoggedIn = userStore.isLoggedIn;
const userName = userStore.userName;
const page_name = 'Page / Test'
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
