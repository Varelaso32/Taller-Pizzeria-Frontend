<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="h3 text-danger">
        <font-awesome-icon icon="pizza-slice" class="me-2" />
        Ingredientes por Pizza
      </h1>
      <button @click="newPizzaIngredient" class="btn btn-danger d-flex align-items-center">
        <font-awesome-icon icon="plus" class="me-2" />
        Nuevo
      </button>
    </div>

    <div class="table-responsive shadow-sm rounded bg-white">
      <table class="table table-striped align-middle mb-0">
        <thead class="table-dark text-white">
          <tr>
            <th>#</th>
            <th>Pizza</th>
            <th>Ingrediente</th>
            <th class="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in pizzaIngredients" :key="item.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ item.pizza_name }}</td>
            <td>{{ item.ingredient_name }}</td>
            <td class="text-center">
              <button @click="editPizzaIngredient(item.id)" class="btn btn-sm btn-warning me-2">
                <font-awesome-icon icon="pencil" />
              </button>
              <button @click="deletePizzaIngredient(item.id)" class="btn btn-sm btn-danger">
                <font-awesome-icon icon="trash" />
              </button>
            </td>
          </tr>
          <tr v-if="pizzaIngredients.length === 0">
            <td colspan="4" class="text-center py-4 text-muted">
              No hay registros de ingredientes por pizza.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "PizzaIngredient",
  data() {
    return {
      pizzaIngredients: [],
    };
  },
  methods: {
    fetchPizzaIngredients() {
      axios
        .get("http://127.0.0.1:8000/api/pizza_ingredients")
        .then((response) => {
          this.pizzaIngredients = response.data;
        })
        .catch((error) => {
          console.error("Error fetching pizza-ingredients:", error);
        });
    },
    deletePizzaIngredient(id) {
      Swal.fire({
        title: `¿Deseas eliminar esta relación pizza-ingrediente?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#c1121f",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`http://127.0.0.1:8000/api/pizza_ingredients/${id}`)
            .then((response) => {
              Swal.fire("¡Eliminado!", "La relación fue eliminada.", "success");
              this.pizzaIngredients = response.data;
            })
            .catch((error) => {
              console.error("Error deleting:", error);
              Swal.fire("Error", "No se pudo eliminar la relación.", "error");
            });
        }
      });
    },
    editPizzaIngredient(id) {
      this.$router.push({ name: "EditarPizzaIngrediente", params: { id: `${id}` } });
    },
    newPizzaIngredient() {
      this.$router.push({ name: "NuevoPizzaIngrediente" });
    },
  },
  mounted() {
    this.fetchPizzaIngredients();
  },
};
</script>
