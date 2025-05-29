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

// Employees
import Employees from "../views/Employees.vue";
import NewEmploye from "@/components/employees/NewEmploye.vue";
import EditEmploye from "@/components/employees/EditEmploye.vue";

//Branchs
import BranchsView from "@/views/BranchsView.vue";
import NewBranchs from "@/components/branchs/NewBranchs.vue";
import EditBranchs from "@/components/branchs/EditBranchs.vue";

//Ingredients
import IngredientsView from "@/views/IngredientsView.vue";
import NewIngredientes from "@/components/ingredients/NewIngredientes.vue";
import EditIngredientes from "@/components/ingredients/EditIngredientes.vue";

//Order_extra
import Order_extraView from "@/views/Order_extraView.vue";
import EditOrder_extra from "@/components/order_extras/EditOrder_extra.vue";
import NewOrder_extra from "@/components/order_extras/NewOrder_extra.vue";

//Orders
import OrdersView from "@/views/OrdersView.vue";
import EditOrder from "@/components/orders/EditOrder.vue";
import NewOrder from "@/components/orders/NewOrder.vue";

//PizzasSisez
import PizzaSizesView from "@/views/Pizza-sizesView.vue";
import NewPizzaSize from "@/components/pizas-sizes/NewPizza-size.vue";
import EditPizzaSize from "@/components/pizas-sizes/EditPizza-size.vue";

//Pizzas
import PizzasView from "@/views/PizzasView.vue";
import NewPizzas from "@/components/pizzas/NewPizzas.vue";
import EditPizzas from "@/components/pizzas/EditPizzas.vue";

//RawMaterials
import RawMaterialsView from "@/views/RawMaterialsView.vue";
import EditRawMaterials from "@/components/rawMaterials/EditRawMaterials.vue";
import NewRawMaterials from "@/components/rawMaterials/NewRawMaterials.vue";

//Sipplider
import SuppliersView from "@/views/SuppliersView.vue";
import NewSupliders from "@/components/supliders/NewSupliders.vue";
import EditSupliders from "@/components/supliders/EditSupliders.vue";

import Pizza_raw_material from "@/views/pizza_raw_material.vue";
import NewPizza_raw_material from "@/components/pizza_raw_material/NewPizza_raw_material.vue";
import Editpizza_raw_material from "@/components/pizza_raw_material/EditPizza_raw_material.vue";

//PizzaIngredient
import PizzaIngredient from "@/views/PizzaIngredient.vue";
import NewPizzaIngredient from "@/components/pizzaIngredient/NewPizzaIngredient.vue";
import EditPizzaIngredient from "@/components/pizzaIngredient/EditPizzaIngredient.vue";

//ExtraIngredients
import ExtraIngredient from "@/views/ExtraIngredient.vue";
import NewExtraIngredient from "@/components/extraIngredient/NewExtraIngredient.vue";
import EditExtraIngredient from "@/components/extraIngredient/EditExtraIngredient.vue";

import PurchasesView from "@/views/PurchasesView .vue";
import NewPurchase from "@/components/purchase/NewPurchase.vue";
import EditPurchase from "@/components/purchase/EditPurchase.vue";
import OrderPizzaView from "@/views/OrderPizzaView.vue";
import NewOrderPizza from "@/components/orders_pizza/NewOrderPizza.vue";
import EditOrderPizza from "@/components/orders_pizza/EditOrderPizza.vue";

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
  // Rutas PizzaIngredient
  {
    path: "/pizza-ingredients",
    name: "PizzaIngredients",
    component: PizzaIngredient,
  },
  {
    path: "/pizza-ingredients/new",
    name: "NuevoPizzaIngrediente",
    component: NewPizzaIngredient,
  },
  {
    path: "/pizza-ingredients/:id/edit",
    name: "EditarPizzaIngrediente",
    component: EditPizzaIngredient,
  },

  {
    path: "/order-pizza",
    name: "OrderPizza",
    component: OrderPizzaView,
  },
  {
    path: "/order-pizza/new",
    name: "NewOrderPizza",
    component: NewOrderPizza,
  },
  {
    path: "/order-pizza/edit/:id",
    name: "EditOrderPizza",
    component: EditOrderPizza,
  },

  // Rutas ExtraIngredients
  {
    path: "/extra-ingredients",
    name: "ExtraIngredients",
    component: ExtraIngredient,
  },
  {
    path: "/extra-ingredients/new",
    name: "NewExtraIngredient",
    component: NewExtraIngredient,
  },
  {
    path: "/extra-ingredients/:id/edit",
    name: "EditExtraIngredient",
    component: EditExtraIngredient,
  },

  {
    path: "/branchs",
    name: "Branchs",
    component: BranchsView,
  },
  {
    path: "/branchs/new",
    name: "BranchsNew",
    component: NewBranchs,
  },
  {
    path: "/branchs/:id/edit",
    name: "EditarBranch",
    component: EditBranchs,
  },

  {
    path: "/ingredients",
    name: "Ingredients",
    component: IngredientsView,
  },
  {
    path: "/ingredients/new",
    name: "New Ingredients",
    component: NewIngredientes,
  },
  {
    path: "/ingredients/:id/edit",
    name: "Edit Ingredients",
    component: EditIngredientes,
  },

  {
    path: "/order_extra",
    name: "Order_extra",
    component: Order_extraView,
  },
  {
    path: "/order_extra/new",
    name: "Order_extraNew",
    component: NewOrder_extra,
  },
  {
    path: "/order_extra/:id/edit/",
    name: "Order_extraEdit",
    component: EditOrder_extra,
  },

  {
    path: "/orders",
    name: "Orders",
    component: OrdersView,
  },
  {
    path: "/order/new",
    name: "NewOrder",
    component: NewOrder,
  },
  {
    path: "/orders/edit/:id",
    name: "EditOrder",
    component: EditOrder,
  },

  {
    path: "/pizza-sizes",
    name: "Pizza-Sizes",
    component: PizzaSizesView,
  },
  {
    path: "/pizza-sizes/:id/edit",
    name: "EditPizzaSize",
    component: EditPizzaSize,
  },
  {
    path: "/pizza-sizes/new",
    name: "NewPizzaSize",
    component: NewPizzaSize,
  },

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
    path: "/pizzas/:id/edit",
    name: "EditPizzas",
    component: EditPizzas,
  },

  {
    path: "/RawMaterials",
    name: "RawMaterials",
    component: RawMaterialsView,
  },
  {
    path: "/RawMaterials/new",
    name: "NewRawMaterials",
    component: NewRawMaterials,
  },
  {
    path: "/RawMaterials/:id/edit",
    name: "EditRawMaterials",
    component: EditRawMaterials,
  },

  {
    path: "/supliders",
    name: "Supliders",
    component: SuppliersView,
  },
  {
    path: "/supliders/new",
    name: "NewSuppliers",
    component: NewSupliders,
  },
  {
    path: "/supliders/:id/edit",
    name: "EditSuppliers",
    component: EditSupliders,
  },

  //Ruta Pizza_Raw_Materials
  {
    path: "/pizza-raw-materials",
    name: "PizzaRawMaterial",
    component: Pizza_raw_material,
  },
  {
    path: "/pizza-raw-material/new",
    name: "NuevaMateriaPrima",
    component: NewPizza_raw_material,
  },
  {
    path: "/pizza-raw-material/:id/edit",
    name: "EditarMateriaPrima",
    component: Editpizza_raw_material,
  },

  {
    path: "/purchases",
    name: "Purchases",
    component: PurchasesView,
  },
  {
    path: "/purchases/new",
    name: "NewPurchase",
    component: NewPurchase,
  },
  {
    path: "/purchases/:id/edit",
    name: "EditPurchase",
    component: EditPurchase,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
const publicPages = ['/login']; // rutas públicas
router.beforeEach((to, from, next) => {
  const loggedIn = !!localStorage.getItem('user');

  if (!loggedIn && !publicPages.includes(to.path)) {
    return next('/login');
  }

  next();
});

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const isAuthenticated = !!user;

  const publicPages = ["login", "about"];
  const authRequired = !publicPages.includes(to.name);

  if (authRequired && !isAuthenticated) {
    return next({ name: "login" });
  }

  if (to.meta.requiresAdmin && (!user || !user.isAdmin)) {
    return next({ name: "home" });
  }

  if (to.name === "login" && isAuthenticated) {
    return next({ name: "home" });
  }

  next();
});
export default router;
