<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal bordered class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Postulacion Ayudantias DICI
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      behavior="desktop"
      bordered
    >
      <q-item active clickable v-ripple to="Crear">
        <q-item-section avatar>
          <q-icon name="add" />
        </q-item-section>

        <q-item-section> Crear Postulacion </q-item-section>
      </q-item>

      <q-item active clickable v-ripple to="Lista">
        <q-item-section avatar>
          <q-icon name="list" />
        </q-item-section>

        <q-item-section> Lista Postulaciones </q-item-section>
      </q-item>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
};
</script>
