<template>
  <div class="q-pa-md q-gutter-sm">
    <h5>Formulario de {{ acceder ? "Login" : "Registro" }}</h5>
    <pre> {{ isAuthenticated }} </pre>
    <pre> {{ user }} </pre>
    <q-form class="q-gutter-md" @submit.prevent="procesarFormulario">
      <q-input label="Email" v-model="email" />
      <q-input label="Contraseña" v-model="password" />
      <q-btn :label="acceder ? 'Login' : 'Registro '" type="submit" />

      <q-btn color="primary" v-if="!acceder" @click="acceder = true">
        Tienes cuenta
      </q-btn>

      <q-btn color="negative" v-else @click="acceder = false">
        no Tienes cuenta
      </q-btn>
    </q-form>

    <q-btn color="negative"> Salir </q-btn>
  </div>
</template>

<script>
import { ref } from "vue";
import { db } from "boot/firebase";
import { auth } from "boot/firebase";
import {useAuth} from "@vueuse/firebase";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const acceder = ref(true);

    const {isAuthenticated, user} = useAuth()

    const procesarFormulario = async () => {
      if (!email.value.trim() || !password.value.trim()) {
        console.log("campos vacios");
        return;
      }
      try {
        if (!acceder.value) {
          const usuario = await auth.createUserWithEmailAndPassword(
            email.value,
            password.value
          );
          await db.collection("usuarios").doc(usuario.user.uid).set({
            email: usuario.user.email,
            estado: true,
            uid: usuario.user.uid,
          });
          console.log(usuario.user);
        } else {
          const usuario = await auth.signInWithEmailAndPassword(
            email.value,
            password.value
          );
            await db.collection("usuarios").doc(usuario.user.uid).set({
            
            estado: true,
            
          });
          console.log(usuario.user);
        }
        email.value = "";
        password.value = "";
      } catch (error) {
        console.log(error); // notificacion de error
      }
    };
    return {
      email,
      password,
      procesarFormulario,
      acceder,
      isAuthenticated, 
      user
    };
  },
};
</script>
