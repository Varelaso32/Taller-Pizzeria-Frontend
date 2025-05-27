import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Users from "../views/Users.vue";
import NewUser from "@/components/users/NewUser.vue";
import EditUser from "@/components/users/EditUser.vue";
import LoginView from "../views/LoginView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },

  {
    path: "/users",
    name: "Users",
    component: Users,
    meta: { requiresAdmin: true }
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
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const isAuthenticated = !!user;

  // Rutas públicas (login, etc)
  const publicPages = ['login', 'about'];
  const authRequired = !publicPages.includes(to.name);

  if (authRequired && !isAuthenticated) {
    return next({ name: 'login' });
  }

  // Ejemplo rol (si tienes rol en user)
  if (to.meta.requiresAdmin && (!user || !user.isAdmin)) {
    return next({ name: 'home' }); // o página "no autorizado"
  }

  if (to.name === 'login' && isAuthenticated) {
    return next({ name: 'home' });
  }

  next();
});
export default router;
