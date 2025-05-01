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
              <h5 style="text-align: center; font-weight: bold;">User Management</h5><br><br>
              <div>
                <div style="float: left;">
                  <button type="button" class="btn btn-outline-success mb-3" style="margin-right: 10px;"
                    @click="updateTableUser">Update
                    table</button>

                  <!-- new add button   -->
                  <button type="button" class="btn btn-outline-primary mb-3" data-bs-toggle="modal"
                    data-bs-target="#addModal">New Add</button>
                  <!-- new add button   -->


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
                      <td>
                        <button class="btn btn-sm" data-bs-toggle="modal" data-bs-target="#editModal"
                          @click="editItem(trs)">
                          <i class="bi bi-pen-fill"></i>
                        </button>
                        <button class="btn btn-sm" data-bs-toggle="modal" data-bs-target="#deleteModal"
                          @click="deleteItem(trs)">
                          <i class="bi bi-trash3-fill"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>


      </div>
    </div>

    <div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addModalLabel">Please enter new data</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3 row">
              <label class="col-sm-2 col-form-label">Name</label>
              <div class="col-sm-10">
                <input v-model="newItemName" type="text" class="form-control">
              </div>
            </div>
            <div class="mb-3 row">
              <label class="col-sm-2 col-form-label">Password</label>
              <div class="col-sm-10">
                <input v-model="newItemPassword" type="text" class="form-control">
              </div>
            </div>
            <div class="mb-3 row">
              <label class="col-sm-2 col-form-label">Authority</label>
              <div class="col-sm-10">
                <input v-model="newItemAuthority" type="text" class="form-control">
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-success" @click="cleanItem()">Clean</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="addItem()">Save</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteModalLabel">Delete the data</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3 row">
              <label class="col-sm-2 col-form-label">Id</label>
              <div class="col-sm-10">
                <input v-model="deleteItemId" type="text" class="form-control" disabled readonly>
              </div>
            </div>
            <div class="mb-3 row">
              <label class="col-sm-2 col-form-label">Name</label>
              <div class="col-sm-10">
                <input v-model="deleteItemName" type="text" class="form-control" disabled readonly>
              </div>
            </div>
            <div class="mb-3 row">
              <label class="col-sm-2 col-form-label">Password</label>
              <div class="col-sm-10">
                <input v-model="deleteItemPassword" type="text" class="form-control" disabled readonly>
              </div>
            </div>
            <div class="mb-3 row">
              <label class="col-sm-2 col-form-label">Authority</label>
              <div class="col-sm-10">
                <input v-model="deleteItemAuthority" type="text" class="form-control" disabled readonly>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
              @click="deleteItemComfirm()">Comfirm</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editModalLabel">Edit the data</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3 row">
              <label class="col-sm-2 col-form-label">Id</label>
              <div class="col-sm-10">
                <input v-model="editItemId" type="text" class="form-control" disabled readonly>
              </div>
            </div>
            <div class="mb-3 row">
              <label class="col-sm-2 col-form-label">Name</label>
              <div class="col-sm-10">
                <input v-model="editItemName" type="text" class="form-control">
              </div>
            </div>
            <div class="mb-3 row">
              <label class="col-sm-2 col-form-label">Password</label>
              <div class="col-sm-10">
                <input v-model="editItemPassword" type="text" class="form-control">
              </div>
            </div>

            <div class="mb-3 row">
              <label class="col-sm-2 col-form-label">Authority</label>
              <div class="col-sm-10">
                <input v-model="editItemAuthority" type="text" class="form-control">
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
              @click="editItemComfirm()">Comfirm</button>
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
const router = useRouter()

const isLoggedIn = userStore.isLoggedIn;
const userName = userStore.userName;
const page_name = 'Page / Auth'
const user_api_url = 'http://localhost:5009/api'
const api_display_all_users = user_api_url + '/display_all_users'
const api_change_user_table = user_api_url + '/process_sql_query_submit'


let isAccessiable = ref('')
let api_gate = ref('')
let table_content = ref('')
let update_time = ref('')
let accessible_pages = ref('')

let newItemName = ref(null)
let newItemPassword = ref(null)
let newItemAuthority = ref(null)

let deleteItemId = ref(null)
let deleteItemName = ref(null)
let deleteItemPassword = ref(null)
let deleteItemAuthority = ref(null)

let editItemId = ref(null)
let editItemName = ref(null)
let editItemPassword = ref(null)
let editItemAuthority = ref(null)


function editItem(item) {
  editItemId.value = item[0]
  editItemName.value = item[1]
  editItemPassword.value = item[2]
  editItemAuthority.value = item[3]
}


function deleteItem(item) {
  deleteItemId.value = item[0]
  deleteItemName.value = item[1]
  deleteItemPassword.value = item[2]
  deleteItemAuthority.value = item[3]
}

function updateTableUser() {
  axios.get(api_display_all_users)
    .then(function (response) {
      if (response.data) {
        let tb = transfer_auth_user_display_all(response.data.ds_record)
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

function cleanItem() {
  newItemName.value = ''
  newItemPassword.value = ''
  newItemAuthority.value = ''
}


async function editItemComfirm() {
  try {
    let post_data = {
      username: editItemName.value,
      password: editItemPassword.value,
      authority: editItemAuthority.value,
      query_type: "Update"
    }
    let res = await axios.post(api_change_user_table, post_data);
  } catch (error) {
    console.log(error);
  }
}

async function deleteItemComfirm() {
  try {
    let post_data = {
      username: deleteItemName.value,
      password: deleteItemPassword.value,
      authority: deleteItemAuthority.value,
      query_type: "Delete"
    }
    let res = await axios.post(api_change_user_table, post_data);
  } catch (error) {
    console.log(error);
  }
}


async function addItem() {
  try {
    let post_data = {
      username: newItemName.value,
      password: newItemPassword.value,
      authority: newItemAuthority.value,
      query_type: "Create"
    }
    let res = await axios.post(api_change_user_table, post_data);
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
