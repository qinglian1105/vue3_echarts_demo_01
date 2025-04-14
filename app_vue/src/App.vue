<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("authToken");

  if (!token && to.path !== '/login') {
    return next('/login');
  }

  if (to.meta.title) {
    document.title = to.meta.title;
  }

  next();
});

onMounted(() => {
  document.body.style.overflow = 'auto'
  document.body.style.paddingRight = '0'

  document.addEventListener('hidden.bs.offcanvas', () => {
    document.body.style.overflow = 'auto'
    document.body.style.paddingRight = '0'
  })

  router.afterEach(() => {
    document.body.style.overflow = 'auto'
    document.body.style.paddingRight = '0'
  })
})
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}
</style>
