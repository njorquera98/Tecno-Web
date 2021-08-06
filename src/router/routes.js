const routes = [
  {
    path: '/',
    component: () => import('layouts/Index.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }      
    ],
  },
  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/Lista', component: () => import('pages/ListaPostulaciones.vue')},
      { path: '/Crear', component: () => import('pages/CrearPostulaciones.vue')},
      { path: '/Test', component: () => import('pages/test.vue')}
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes