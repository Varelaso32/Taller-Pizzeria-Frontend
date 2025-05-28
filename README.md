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