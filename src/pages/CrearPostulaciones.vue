<template>
  <div class="q-pa-md q-gutter-sm">
    <br />
    <h4 class="flex flex-center">Crear Postulacion de Ayudantias</h4>
    <q-editor
      v-if="!modoEdicion"
      v-model="editor"
      :definitions="{
        save: {
          tip: 'Subir postulacion',
          icon: 'save',
          label: 'Subir',
          handler: saveWork,
        },
      }"
      :toolbar="[['bold', 'italic', 'underline'], ['save']]"
    />

    <q-editor
      v-else
      v-model="editor"
      :definitions="{
        save: {
          tip: 'Actualizar postulacion',
          icon: 'save',
          label: 'Actualizar',
          handler: UpdateWork,
        },
      }"
      :toolbar="[['bold', 'italic', 'underline'], ['save']]"
    />

    <q-card
      class="row"
      flat
      bordered
      v-for="(item, index) in tasks"
      :key="index"
    >
      <q-card-section
        class="col"
        v-html="item.texto"
        :class="item.estado ? 'tachar' : ''"
      />
      <!--<q-btn flat color = "blue" icon="edit" @click="editar(index, item.id)"> Editar</q-btn>
      <q-btn flat color = "red" @click="eliminar(index, item.id)"> Eliminar</q-btn>-->
      <q-btn
        flat
        color="secondary"
        icon="edit"
        label="Editar"
        @click="editar(index, item.id)"
      />
      <q-btn
        flat
        color="red"
        icon="delete"
        label="Eliminar"
        @click="eliminar(index, item.id)"
      />
    </q-card>

    <div class="flex flex-center" v-if="tasks.length == 0">
      <h6>Sin postulaciones a ayudantias</h6>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { db } from "boot/firebase";

export default {
  data() {
    return {
      editor: "",
      tasks: [],
      index: null,
      modoEdicion: false,
      id: null,
    };
  },
  created() {
    this.listarPostulaciones();
  },
  methods: {
    async UpdateWork() {
      try {
        const resDB = await db.collection("postulacion").doc(this.id).update({
          texto: this.editor,
        });
        this.tasks[this.index].texto = this.editor;

        this.$q.notify({
          message: "Postulacion Actualizada",
          color: "info",
          textColor: "white",
          icon: "cloud_done",
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.modoEdicion = false;
        this.index = null;
        this.id = null;
        this.editor = "";
      }
    },
    editar(index, id) {
      this.editor = this.tasks[index].texto;
      this.index = index;
      this.modoEdicion = true;
      this.id = id;
    },
    async listarPostulaciones() {
      try {
        const resDB = await db.collection("postulacion").get();

        resDB.forEach((res) => {
          console.log(res.id);
          const tarea = {
            id: res.id,
            texto: res.data().texto,
            estado: res.data().estado,
          };
          this.tasks.push(tarea);
        });
      } catch (error) {
        console.log(error);
      }
    },
    async saveWork() {
      try {
        const resDB = await db.collection("postulacion").add({
          texto: this.editor,
          estado: false,
        });
        this.tasks.push({
          texto: this.editor,
          estado: false,
          id: resDB.id,
        });
        this.editor = "";

        this.$q.notify({
          message: "Postulacion publicada",
          color: "positive",
          textColor: "white",
          icon: "cloud_done",
        });
      } catch (error) {
        console.log(error);
      }
    },
    eliminar(index, id) {
      this.$q
        .dialog({
          title: "¿Esta seguro?",
          message: "¿Realmente quiere eliminar la postulacion?",
          cancel: true,
          persistent: true,
        })
        .onOk(async () => {
          try {
            await db.collection("postulacion").doc(id).delete();
            this.tasks.splice(index, 1);
          } catch (error) {
            console.log(error);
          } finally {
            this.$q.notify({
              message: "Postulacion eliminada",
              color: "negative",
              textColor: "white",
              icon: "cloud_off",
            });
          }
        });
    },
  },
};
</script>
