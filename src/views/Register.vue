<template>
  <div>
      <h1>Create una cuenta</h1>
      <p><input type="text" placeholder="Correo" v-model="email" /></p>
      <p><input type="password" placeholder="Contraseña" v-model="password" /></p>
      <p><button @click="register">Ir</button></p>
      <p><button @click="signInWithGoogle">Ingresar con Google</button></p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {getAuth, createUserWithEmailAndPassword, 
        GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { useRouter } from "vue-router";
const email = ref("");
const password = ref("");
const router = useRouter();

const register = () => { 
  const auth = getAuth()
  createUserWithEmailAndPassword(auth, email.value, password.value)
  .then((data) => {
    router.push('/sheet')
  }).catch((err) =>{
    console.log(err)
  });
};

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
  .then((result) => {
    router.push('/sheet')
  }).catch((err) =>{
    console.log(err)
  });
};

</script>
