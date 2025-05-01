<template>
  <div class="container">
    <div id="login-background-div">
      <div id="login-text-background-div">
        <form id="login-form" class="form-signin" @submit.prevent="handleLogin">
          <div style="text-align: center;"><i class="bi bi-keyboard-fill" style="font-size: 4rem;"></i></div>
          <label for="inputUsername" class="visually-hidden">Username</label>
          <input v-model="username" type="text" id="inputUsername" class="form-control" placeholder="Username" required
            autofocus><br>
          <label for="inputPassword" class="visually-hidden">Password</label>
          <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password"
            required><br>
          <button class="w-100 btn btn-lg btn-primary" type="submit">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import axios from "axios";

const username = ref('');
const password = ref('');
const router = useRouter();
const userStore = useUserStore();
const errorMessage = ref('');
const user_api_url = 'http://localhost:5009/api'


async function handleLogin() {
  try {
    const response = await getApiData(username.value, password.value)
    if (response.success) {
      userStore.setUser(response.userData);
      if (response.token) {
        userStore.setToken(response.token);
        localStorage.setItem('authToken', response.token);
      }
      router.push('/home');
    } else {
      if (response.message == 'user not in db') {
        alert('Sorry, incorrect username.\nPlease retry.')
      } else if (response.message == 'wrong password') {
        alert('Sorry, wrong password.\nPlease retry.')
      } else {
        alert('Sorry, DB (user) for API may be disconnected ???\nPlease check.')
      }
    }
  } catch (error) {
    console.error('Failed to login: ', error);
    errorMessage.value = 'Get error when logining';
  }
};

async function getApiData(username, password) {
  try {    
    const post_data = { username: username, password: password }
    let res = await axios.post(user_api_url + '/signin', post_data);
    return res.data;
  } catch (error) {
    alert(user_api_url + '/signin' + ' ---> disconnected ???\n' + 'Please check...')
    console.log(error);
  }
}
</script>

<style lang="scss" src="../assets/additional.scss" scoped></style>
<style lang="scss" src="../assets/bootstrap-icons/font/bootstrap-icons.scss" scoped></style>
