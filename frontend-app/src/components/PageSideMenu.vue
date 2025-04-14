<template>
    <div class="row">
        <nav class="navbar navbar-light bg-light fixed-top">
            <div class="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div v-if="isLoggedIn" id="current-user">
                    <i class="bi bi-person-vcard-fill"></i>
                    {{ userName }}
                </div>

                <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel">
                    <div class="offcanvas-header">
                        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"
                            aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">
                        <ul class="navbar-nav justify-content-start flex-grow-1 pe-3">
                            <li class="nav-item">
                                <router-link :to="{ name: 'home' }"><i
                                        class="bi bi-house-fill"></i>&nbsp;&nbsp;Home</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link :to="{ name: 'financial_info' }"><i
                                        class="bi bi-bar-chart-line-fill"></i>&nbsp;&nbsp;Financial
                                    Info</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link :to="{ name: 'data_status' }"><i
                                        class="bi bi-database-fill"></i>&nbsp;&nbsp;Data Status</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link :to="{ name: 'auth_user' }"><i
                                        class="bi bi-person-fill-gear"></i>&nbsp;&nbsp;Auth (user
                                    management)</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link :to="{ name: 'page_tst' }"><i
                                        class="bi bi-motherboard-fill"></i>&nbsp;&nbsp;Test Page</router-link>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="offcanvasNavbarDropdown" role="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="bi bi-laptop-fill"></i>&nbsp;&nbsp;Other Items
                                </a>
                                <ul class="dropdown-menu" aria-labelledby="offcanvasNavbarDropdown">
                                    <li><a class="dropdown-item" href="#">Sub Item_01</a></li>
                                    <li><a class="dropdown-item" href="#">Sub Item_02</a></li>
                                    <li><a class="dropdown-item" href="#">Sub Item_03</a></li>
                                    <li><a class="dropdown-item" href="#">Sub Item_04</a></li>
                                    <li><a class="dropdown-item" href="#">Sub Item_05</a></li>
                                </ul>
                            </li>
                            <br><br>
                            <li class="nav-item" id="side-menu-logout">                               
                                <router-link :to="{ name: 'Logout' }"><i
                                    class="bi bi-box-arrow-left"></i>&nbsp;&nbsp;Logout</router-link>        
                            </li>
                        </ul>

                    </div>
                </div>
            </div>
        </nav>
    </div><br>
</template>


<script setup>
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const isLoggedIn = userStore.isLoggedIn;
const userName = userStore.userName;
</script>


<style lang="scss" src="../assets/additional.scss" scoped></style>
<style lang="scss" src="../assets/bootstrap-icons/font/bootstrap-icons.scss" scoped></style>
