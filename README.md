# front

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



<!-- //RUTAS Kota

import BranchsView from "@/views/BranchsView.vue";
import NewBranchs from "@/components/branchs/NewBranchs.vue";
import EditBranchs from "@/components/branchs/EditBranchs.vue";

import IngredientsView from "@/views/IngredientsView.vue";
import NewIngredientes from "@/components/ingredients/NewIngredientes.vue";
import EditIngredientes from "@/components/ingredients/EditIngredientes.vue";

import Order_extraView from "@/views/Order_extraView.vue";
import EditOrder_extra from "@/components/order_extras/EditOrder_extra.vue";
import NewOrder_extra from "@/components/order_extras/NewOrder_extra.vue";

import OrdersView from "@/views/OrdersView.vue";
import EditOrder from "@/components/orders/EditOrder.vue";
import NewOrder from "@/components/orders/NewOrder.vue";

import PizzaSizesView from "@/views/Pizza-sizesView.vue";
import NewPizzaSize from "@/components/pizas-sizes/NewPizza-size.vue";
import EditPizzaSize from "@/components/pizas-sizes/EditPizza-size.vue";

import RawMaterialsView from "@/views/RawMaterialsView.vue";
import EditRawMaterials from "@/components/rawMaterials/EditRawMaterials.vue";
import NewRawMaterials from "@/components/rawMaterials/NewRawMaterials.vue";




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
    path: "/branchs/edit",
    name: "BranchsEdit",
    component: EditBranchs,
  },


    {
    path: "/ingredients",
    name: "Ingredients",
    component: IngredientsView,
  },
  {
    path: "/ingredients/new",
    name: "Nuew Ingredients",
    component: NewIngredientes,
  },
 {
    path: "/ingredients/edit",
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
    path: "/order_extra/edit/:id",
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
    path: '/pizza-sizes/:id/edit',
    name : 'EditPizzaSize',
    component: EditPizzaSize
  },
    {
    path: '/pizza-sizes/new',
    name : 'NewPizzaSize',
    component: NewPizzaSize
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
    path: '/pizzas/:id/edit',
    name: 'EditPizzas',
    component: EditPizzas
  },

    {
    path: '/RawMaterials',
    name: 'RawMaterials',
    component : RawMaterialsView
  },
  {
    path: '/RawMaterials/new',
    name: 'NewRawMaterials',
    component: NewRawMaterials
  },
    {
    path: '/RawMaterials/edit',
    name: 'EditRawMaterials',
    component: EditRawMaterials
  },

  

