import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

// Usuarios
import Users from "../views/Users.vue";
import NewUser from "@/components/users/NewUser.vue";
import EditUser from "@/components/users/EditUser.vue";
import LoginView from "../views/LoginView.vue";

// Clientes
import Clients from "../views/Clients.vue";
import NewClient from "@/components/clients/NewClient.vue";
import EditClient from "@/components/clients/EditClient.vue";

// Empleados
// Employees
import Employees from "../views/Employees.vue";
import NewEmploye from "@/components/employees/NewEmploye.vue";
import EditEmploye from "@/components/employees/EditEmploye.vue";


import PizzasView from "@/views/PizzasView.vue";
import EditPizzas from "@/components/pizzas/EditPizzas.vue";
import NewPizzas from "@/components/pizzas/NewPizzas.vue";

const routes = [
  {
    path: "/pizzas",
    name: "Pizzas",
    component: PizzasView,
  },
  {
    path: "/pizzas/new",
    name: "NewPizzas",
    component: NewPizzas,
  },
      {
    path: '/pizzas/:id/edit',
    name: 'EditPizzas',
    component: EditPizzas
  },

  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
    meta: { requiresAdmin: true },
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
  //////////////jose

  // Ruta About
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
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

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const isAuthenticated = !!user;

  // Rutas públicas (login, etc)
  const publicPages = ["login", "about"];
  const authRequired = !publicPages.includes(to.name);

  if (authRequired && !isAuthenticated) {
    return next({ name: "login" });
  }

  // Ejemplo rol (si tienes rol en user)
  if (to.meta.requiresAdmin && (!user || !user.isAdmin)) {
    return next({ name: "home" }); // o página "no autorizado"
  }

  if (to.name === "login" && isAuthenticated) {
    return next({ name: "home" });
  }

  next();
});
export default router;
