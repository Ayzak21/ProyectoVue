
import { createRouter, createWebHistory } from 'vue-router'
import PaginaView from '../views/paginaView.vue'
import LoginView from '../views/loginView.vue'
import PerfilUsuarioView from '../views/PerfilUsuarioView.vue'
import PostulantesView from '../views/PostulantesView.vue'
import SeleccionView from '../views/Seleccion/seleccionView.vue'
import RegistroEmpresaView from '../views/Seleccion/RegistroEmpresa/registroempresaView.vue'
import RegistroGraduadoView from '../views/Seleccion/RegistroGraduado/registrograduadoView.vue'

const routes = [
  {
    path: '/',
    name: 'PaginaView',
    component: PaginaView
  },
  {
    path: '/login',
    name: 'loginView',
    component: LoginView
  },
  {
    path: '/panel-graduado',
    name: 'PerfilUsuarioView',
    component: PerfilUsuarioView
  },
  {
    path: '/panel-empresa',
    name: 'PostulantesView',
    component: PostulantesView
  },
  {
    path: '/seleccion',
    name: 'SeleccionView',
    component: SeleccionView
  },
   {
     path: '/registro-empresas',
     name: 'RegistroEmpresa',
     component: RegistroEmpresaView
   },
  {
    path: '/registro-graduados',
    name: 'RegistroGraduado',
    component: RegistroGraduadoView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router