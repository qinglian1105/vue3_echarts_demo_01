<template>
    <div class="container">     
        <div class="row"> 

            <div id="login-background-div">
                <div id="login-text-background-div">
                    <div stylfe="float: left;">
                        
                        <div class="page-name">
                            <br>
                            {{ page_name }}
                        </div>                                                         
                    </div>

                    <div style="float: right;">
                        <div class="not-login">
                            <br>
                            <div>
                                <i class="bi bi-person-fill-lock"></i>
                                You have been logged out. Please login.
                            </div>
                            <br>
                            <div style="margin-right: 285px">
                                <a href="/"><i class="bi bi-box-arrow-right"></i>&nbsp;&nbsp;Login</a>
                            </div>
                        </div>                        
                    </div>

                </div> 
            </div> 

        </div>                             
    </div>
</template>
  
  
<script setup>

import { useUserStore } from '@/stores/user';
import { onMounted } from 'vue'; 

const userStore = useUserStore();
const page_name = 'Page / Logout'
   
onMounted(() => {  
    userStore.clearUser()       
})

</script>


<style lang="scss" src="../assets/additional.scss" scoped></style>
<style lang="scss" src="../assets/bootstrap-icons/font/bootstrap-icons.scss" scoped></style>
  