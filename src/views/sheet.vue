<template>
  <div>
      <iframe class="excel" src="https://docs.google.com/spreadsheets/d/1tKGznqnMPUxH0P53WOQ-Ckdz1hlL4H298uE7vu0b6yc/edit?usp=sharing"></iframe>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import {getAuth, onAuthStateChanged} from "firebase/auth";

const usuario = ref("");
let auth;

onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user){
      usuario.value = true;
    } else {
      usuario.value = false;
    }
  });
});

</script>

<style lang="css">
.excel {
    width: 80em;
    height: 70vh;
}

</style>
