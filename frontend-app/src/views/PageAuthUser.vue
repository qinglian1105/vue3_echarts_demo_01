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
                  Sorry, '{{ userName }}' is not allowed to access '{{ api_gate }}'.
                </div>
                <br>
                <div style="margin-right: 370px">
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

        <div v-if="isAccessiable">

          <div v-if="isLoggedIn" class="row justify-content-center">
            <div id="auth-user-content">
              <h5 style="text-align: center; font-weight: bold;">All users in Table</h5><br><br>
              <div>
                <div style="float: left;">
                  <button type="button" class="btn btn-outline-success mb-3" @click="updateTableUser">Update
                    table</button>
                </div>
                <div style="float: right; color: blue;">{{ update_time }}</div>
              </div>

              <div>
                <table class="table table-hover sm">
                  <thead>
                    <tr>
                      <th scope="col" v-for="thd in table_content.thead">{{ thd }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="trs in table_content.trs">
                      <td v-for="tr in trs">{{ tr }}</td>
                    </tr>
                  </tbody>
                </table>
              </div><br><br><br>
              <hr>

              <div>
                <div>

                  <div>
                    <p class="auth-user-query-note">Only authorized personnel can add new users, remove users, update
                      information of users.</p>
                    <p class="auth-user-query-note">Please carefully type text into input boxes, select dropdown item
                      and
                      then click "Submit" to deal with recrods.</p>
                    <p class="auth-user-query-note">After submitting, check the results in the table above.</p>
                  </div><br>

                  <div>
                    <form class="row g-1">
                      <div class="col-auto">
                        <input v-model="input_username" type="text" class="form-control" placeholder="Useranme">
                      </div>
                      <div class="col-auto">
                        <input v-model="input_password" type="text" class="form-control" placeholder="Password">
                      </div>
                      <div class="col-auto">
                        <input v-model="input_authority" type="text" class="form-control" placeholder="Authority">
                      </div>
                    </form>
                  </div><br>

                  <div>
                    <form class="row g-4">
                      <div class="col-auto">
                        <select v-model="query_selected" class="form-select">
                          <option disabled value="">Select SQL Command</option>
                          <option v-for="query_type in query_types">{{ query_type }}</option>
                        </select>
                      </div>
                      <div class="col-auto">
                        <button type="button" class="btn btn-outline-primary mb-3" @click="SubmitInputs">Submit</button>
                      </div>
                      <div class="col-auto">
                        <button type="button" class="btn btn-outline-primary mb-3" @click="cleanInputs">Clean</button>
                      </div>
                    </form>
                  </div>

                </div><br>
                <div id="message-after-sumit-query">{{ message_after_sumit }}</div>

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
import { useUserStore } from '@/stores/user';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from "axios";
import { transfer_auth_user_display_all, get_date_time_string } from "../assets/js-funcs/auth_user.js"

const userStore = useUserStore();
const isLoggedIn = userStore.isLoggedIn;
const userName = userStore.userName;
const page_name = 'Page / Auth'
const user_api_url = 'http://localhost:5005/api'

const api_display_all_users = user_api_url + '/display_all_users'
const api_change_user_table = user_api_url + '/change_user_table'
const router = useRouter()

let isAccessiable = ref('')
let api_gate = ref('')
let table_content = ref('')
let update_time = ref('')

const query_types = ['Create', 'Update', 'Delete']
let query_selected = ref('')
let input_username = ref('')
let input_password = ref('')
let input_authority = ref('')
let message_after_sumit = ref('')
let accessible_pages = ref('')


function updateTableUser() {
  axios.get(api_display_all_users)
    .then(function (response) {
      if (response.data) {
        let tb = transfer_auth_user_display_all(response.data)
        table_content.value = tb
        update_time = get_date_time_string(Date.now())
      } else {
        table_content.value = []
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

function cleanInputs() {
  input_username.value = ''
  input_password.value = ''
  input_authority.value = ''
  query_selected.value = ''
  message_after_sumit.value = ''
}

async function SubmitInputs() {
  try {
    let post_data = {
      username: input_username.value,
      password: input_password.value,
      authority: input_authority.value,
      query_type: query_selected.value
    }
    let res = await axios.post(api_change_user_table, post_data);
    message_after_sumit.value = res.data
  } catch (error) {
    console.log(error);
  }
}


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
    updateTableUser()
  }
})

</script>


<style lang="scss" src="../assets/additional.scss" scoped></style>
<style lang="scss" src="../assets/bootstrap-icons/font/bootstrap-icons.scss" scoped></style>
