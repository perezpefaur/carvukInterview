<template>
  <div>
      <iframe class="excel" src="https://docs.google.com/spreadsheets/d/1tKGznqnMPUxH0P53WOQ-Ckdz1hlL4H298uE7vu0b6yc/edit?usp=sharing"></iframe>
      <p>{{'char.name'}}</p>
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
    console.log(user.accessToken);
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
    width: 150em;
    height: 200vh;
}

</style>
