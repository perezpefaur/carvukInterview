<template>
  <div>
      <h1>Ingresa con una cuenta existente</h1>
      <p><input type="text" placeholder="Correo" v-model="email" /></p>
      <p><input type="password" placeholder="Contraseña" v-model="password" /></p>
      <p v-if="errMsg">{{ errMsg }}</p>
      <p><button @click="signIn">Ir</button></p>
      <p><button @click="signInWithGoogle">Ingresar con Google</button></p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {getAuth, signInWithEmailAndPassword,
        GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { useRouter } from "vue-router";
const email = ref("");
const password = ref("");
const errMsg = ref();
const router = useRouter();

const signIn = () => { 
  const auth = getAuth()
  signInWithEmailAndPassword(auth, email.value, password.value)
  .then((data) => {
    router.push('/sheet');
  }).catch((err) =>{
    console.log(err.code);
    switch (err.code) {
      case "auth/invalid-email":
        errMsg.value = "Mail no valido";
        break;
      case "auth/user-not-found":
        errMsg.value = "Usuario no encontrado";
        break;
      case "auth/wrong-password":
        errMsg.value = "Contraseña Equivocada";
        break;
      default:
        errMsg.value = "Algo salio mal";
        break;
    }
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
