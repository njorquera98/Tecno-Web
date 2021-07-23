<template>
<q-layout view="lHh Lpr lff">
      <q-header elevated class="primary">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title>Postulacion Ayudantias</q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above
        :width="200"
        :breakpoint="400"
      >
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
          <q-list padding>

            <q-item clickable v-ripple to="/Crear">
              <q-item-section avatar>
                <q-icon name="star" />
              </q-item-section>

              <q-item-section>
                Mis Datos
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple  to="/Sign-in">
              <q-item-section avatar>
                <q-icon name="inbox"/>
              </q-item-section>

              <q-item-section  >
                Ofertas
              </q-item-section>
            </q-item>

          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" src="https://www.crushpixel.com/big-static14/preview4/binary-blue-background-blue-digital-1710154.jpg" style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <div class="text-weight-bold">Usuario</div>
            <div>@Nombre_Usuario</div>
          </div>
        </q-img>
      </q-drawer>

      <q-page-container>
        <router-view></router-view>
      </q-page-container>
    </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const drawer = ref(false)

    return {
      drawer
    }
  }
}
</script>