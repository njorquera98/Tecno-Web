<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md" style="max-width: 400px">
      <img class="flex flex-center" src="https://i.ibb.co/17BfZPQ/logo-negro-y-color.png" style="max-width: 300px">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input 
        filled
        v-model="name"
        hint="Usuario"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Por favor escriba el usuario']"
      />

      <q-input v-model="password" filled :type="isPwd ? 'password' : 'text'" hint="Contraseña">
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

      <div class="flex flex-center">
        <q-btn 
        label="Entrar" 
        type="submit" 
        color="primary" 
        to="/List"/>
      </div>
      <div class="flex flex-center">
        <q-btn label="Ingresar con Gmail Institucional" type="submit" color="negative" to=""/>
      </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { useQuasar } from 'quasar'
import { ref } from 'vue'

export default {
  setup () {
    const $q = useQuasar()

    const name = ref(null)
    const age = ref(null)
    const accept = ref(false)

    return {
      name,
      age,
      accept,

      password: ref(''),
      isPwd: ref(true),

      onSubmit () {
        if (accept.value !== true) {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'You need to accept the license and terms first'
          })
        }
        else {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Submitted'
          })
        }
      },

      onReset () {
        name.value = null
        age.value = null
        accept.value = false
      }
    }
  }
}
</script>