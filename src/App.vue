<template>
  <nav>
    <router-link to="/" v-if="isLoggedIn"> Inicio </router-link>
    <router-link to="/sheet" v-if="isLoggedIn"> Hoja de excel </router-link>
    <router-link to="/register" v-if="!isLoggedIn"> Registrarse </router-link>
    <router-link to="/signIn" v-if="!isLoggedIn"> Iniciar Sesion </router-link>
    <button @click="handleSignOut" v-if="isLoggedIn">Cerrar Sesion</button>
  </nav>
  <router-view/>
</template>

<script setup>
import { onMounted, ref } from "vue";
import {getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router";

const isLoggedIn = ref(false);
const router = useRouter();
let auth

onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user){
      isLoggedIn.value = true;
      localStorage.setItem("token", user.accessToken);
    } else {
      isLoggedIn.value = false;
      localStorage.setItem("token", null);
    }
  });
});

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push("/signIn")
  });
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
nav {
  padding: 30px;
}
nav a {
  font-weight: bold;
  color: #2c3e50;
}
nav a.router-link-exact-active {
  color: #42b983;
}
</style>
