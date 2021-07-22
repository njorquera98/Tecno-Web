
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/Sign-in', component: () => import('pages/Sign-in.vue') },
      { path: '/Crear', component: () => import('pages/MainCrear.vue') },
      { path: '/Datos', component: () => import('pages/MisDatos.vue') }
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
