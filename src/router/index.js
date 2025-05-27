import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

// Usuarios
import Users from "../views/Users.vue";
import NewUser from "@/components/users/NewUser.vue";
import EditUser from "@/components/users/EditUser.vue";

// Clientes
import Clients from "../views/Clients.vue";
import NewClient from "@/components/clients/NewClient.vue";
import EditClient from "@/components/clients/EditClient.vue";

// Empleados
// Employees
import Employees from "../views/Employees.vue";
import NewEmploye from "@/components/employees/NewEmploye.vue";
import EditEmploye from "@/components/employees/EditEmploye.vue";


const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  // Rutas de Usuarios
  {
    path: "/users",
    name: "Users",
    component: Users,
  },
  {
    path: "/users/new",
    name: "NuevoUsuario",
    component: NewUser,
  },
  {
    path: "/users/:id/edit",
    name: "EditarUsuario",
    component: EditUser,
  },

  // Rutas de Clientes
  {
    path: "/clients",
    name: "Clients",
    component: Clients,
  },
  {
    path: "/clients/new",
    name: "NuevoCliente",
    component: NewClient,
  },
  {
    path: "/clients/:id/edit",
    name: "EditarCliente",
    component: EditClient,
  },

  // Rutas de Empleados
  {
    path: "/employees",
    name: "Employes",
    component: Employees,
  },
  {
    path: "/employees/new",
    name: "NuevoEmpleado",
    component: NewEmploye,
  },
  {
    path: "/employees/:id/edit",
    name: "EditarEmpleado",
    component: EditEmploye,
  },


  // Ruta About
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
