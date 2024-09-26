<template>
  <div class="flex flex-col min-h-screen">
    <div class="flex-grow">
      <RouterView @authenticated="checkAuthentication" />
    </div>
    <AppBarComponent />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import AppBarComponent from './components/AppBarComponent.vue';
</script>
