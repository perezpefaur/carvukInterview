<template>
  <div>
      <iframe class="excel" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRVVgejXturzFjQSj34C1RTlNSduymedeh1D7T0KKctr1sWmPRWZsqxPZ1spV-3CZW2CpYNsXmmpGZU/pubhtml?widget=true&amp;headers=false"></iframe>
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
    width: 50em;
    height: 30vh;
}

</style>
