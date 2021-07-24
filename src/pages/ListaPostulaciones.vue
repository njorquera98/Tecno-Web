<template>
  <div class="q-pa-md q-gutter-sm">
    <q-editor
      v-model="editor"
      :definitions="{
        save: {
          tip: 'Subir postulacion',
          icon: 'save',
          label: 'Subir',
          handler: saveWork
        }
      }"
      :toolbar="[
        ['bold', 'italic', 'underline'],
        ['save']
      ]"
    />

    <q-card class= "row"
      flat bordered v-for="(item, index) in tasks" :key="index">
      <q-card-section 
      class = "col" v-html= "item.texto"
      :class = "item.estado ? 'tachar': '' "/>
      <q-btn 
      flat color = "blue" @click="item.estado = ! item.estado" >Accion</q-btn>
      <q-btn flat color = "red" @click="eliminar(index)">Eliminar</q-btn>
    </q-card>

    <div class = "flex flex-center" v-if = "tasks.length == 0">
      <h6> Sin postulaciones a ayudantias </h6>
    </div>
  </div>
</template>

<script>

import { ref } from 'vue'

export default {
  data() {
    return {
      editor: ref(' '),
      tasks:[]
    }
  },  
    methods: {
      saveWork () {
        this.tasks.push({
          texto: this.editor,
          estado: false
        })
        this.$q.notify({
          message: 'Postulacion publicada',
          color: 'positive',
          textColor: 'white',
          icon: 'cloud_done'
        })
      },
      eliminar(index){
        this.$q.dialog({
        title: '¿Esta seguro?',
        message: '¿Realmente quiere eliminar la postulacion?',
        cancel: true,
        persistent: true
        }).onOk(() => {
        this.tasks.splice(index, 1);
        })
      }
    }   
  }
</script>

<style >
  .tachar{
    text-decoration: line-through;
  }
</style>