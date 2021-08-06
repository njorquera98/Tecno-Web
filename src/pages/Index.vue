<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md" style="max-width: 400px">
      <!--<h5>Formulario de {{ acceder ? "Login" : "Registro" }}</h5>-->
      <img
        class="flex flex-center"
        src="https://i.ibb.co/17BfZPQ/logo-negro-y-color.png"
        style="max-width: 300px"
      />
      <br />
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
        @submit.prevent="procesarFormulario"
      >
        <q-input
          filled
          v-model="email"
          hint="Usuario"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Por favor escriba el correo',
          ]"
        />

        <q-input
          v-model="password"
          filled
          :type="isPwd ? 'password' : 'text'"
          hint="Contraseña"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <div class="q-gutter-sm flex flex-center ">
          <!--<q-btn label="Entrar" type="submit" color="primary" to="/Lista" />-->
          <q-btn :label="acceder ? 'Login' : 'Registro '" type="submit"/>
          <q-btn color="primary" v-if="!acceder" @click="acceder = true">
            Tienes cuenta
          </q-btn>

          <q-btn color="negative" v-else @click="acceder = false">
            no Tienes cuenta
          </q-btn>
          <q-btn color="positive" :to="acceder ? 'Crear' : 'Lista'">
            cambiar pagina
          </q-btn>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import { ref } from "vue";
import { db } from "boot/firebase";
import { auth } from "boot/firebase";

export default {
  setup() {
    const $q = useQuasar();

    const accept = ref(false);

    const email = ref("");
    const password = ref("");
    const acceder = ref(true);

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
          await db.collection("usuarios").doc(usuario.user.uid).update({
            estado: false,
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

      accept,

      isPwd: ref(true),

      onSubmit() {
        if (accept.value !== false) {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "You need to accept the license and terms first",
          });
        } else {
          $q.notify({
            color: "positive",
            textColor: "white",
            icon: "cloud_done",
            message: "Submitted",
          });
        }
      },

      onReset() {
        email.value = null;
        accept.value = false;
      },
    };
  },
};
</script>
