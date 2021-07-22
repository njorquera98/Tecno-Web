<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md">
    <div class="q-gutter-md" style="max-width: 300px">     
      <q-input outlined v-model="text" label="User Name" />
      <q-input outlined v-model="text" label="Password1" />
    </div>
  </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { ref } from 'vue';


export default defineComponent({
  name: 'PageSign-in',

  setup () {
    return {
      text: ref('')
    }
  }
  
})
</script>
