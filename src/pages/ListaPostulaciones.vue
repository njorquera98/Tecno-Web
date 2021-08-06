<template>
  <div class="q-pa-md q-gutter-sm">
    <br>
    <h4 class="flex flex-center">Lista Postulacion de Ayudantias</h4>
    
    <q-card class= "row"
      flat bordered v-for="(item, index) in tasks" :key="index">
      <q-card-section 
      class = "col" v-html= "item.texto"/>
      <!-- <q-btn flat color = "blue" @click="postular(index, item.id)">Postular</q-btn> -->
    </q-card>

    <div class = "flex flex-center" v-if = "tasks.length == 0">
      <h6> Sin postulaciones a ayudantias </h6>
    </div>
  </div>
</template>

<script>

import { ref } from 'vue'
import { db } from 'boot/firebase'

export default {
  data() {
    return {
      editor: '',
      tasks:[],
      index: null,
      modoEdicion: false,
      id: null
    }
  },  
  created(){
    this.listarPostulaciones();
  },
    methods: {
      async listarPostulaciones(){
        try {
          const resDB = await db.collection('postulacion').get();

          resDB.forEach(res => {
            console.log(res.id);
            const tarea = {
              id: res.id,
              texto: res.data().texto,
              estado: res.data().estado
            }
            this.tasks.push(tarea)
          })

        }catch(error) {
          console.log(error);
        }
      }
    }   
  }
</script>