<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="h3 text-danger">
        <font-awesome-icon icon="pizza-slice" class="me-2" />
        Listado de Pizzas
      </h1>
      <button
        @click="newPizza"
        class="btn btn-danger d-flex align-items-center"
      >
        <font-awesome-icon icon="plus" class="me-2" />
        Nueva Pizza
      </button>
    </div>

    <div class="table-responsive shadow-sm rounded bg-white">
      <table class="table table-striped align-middle mb-0">
        <thead class="table-dark text-white">
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Creado</th>
            <th>Actualizado</th>
            <th class="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(pizza, index) in pizzas" :key="pizza.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ pizza.name }}</td>
            <td>{{ formatDate(pizza.created_at) }}</td>
            <td>{{ formatDate(pizza.updated_at) }}</td>
            <td class="text-center">
              <button
                @click="editPizza(pizza.id)"
                class="btn btn-sm btn-warning me-2"
              >
                <font-awesome-icon icon="pencil" />
              </button>
              <button
                @click="deletePizza(pizza.id)"
                class="btn btn-sm btn-danger"
              >
                <font-awesome-icon icon="trash" />
              </button>
            </td>
          </tr>
          <tr v-if="pizzas.length === 0">
            <td colspan="5" class="text-center py-4 text-muted">
              No hay pizzas registradas.
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
  name: "PizzasView",
  data() {
    return {
      pizzas: [],
    };
  },
  methods: {
    fetchPizzas() {
      axios
        .get("http://127.0.0.1:8000/api/pizzas")
        .then((response) => {
          this.pizzas = response.data;
        })
        .catch((error) => {
          console.error("Error al cargar las pizzas:", error);
        });
    },
    formatDate(date) {
      if (!date) return "";
      return new Date(date).toLocaleString();
    },
    newPizza() {
      this.$router.push({ name: "NewPizzas" });
    },
    editPizza(id) {
      this.$router.push({ name: "EditPizzas", params: { id: `${id}` } });
    },
    deletePizza(id) {
      Swal.fire({
        title: `¿Deseas eliminar la pizza con ID ${id}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#c1121f",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`http://127.0.0.1:8000/api/pizzas/${id}`)
            .then(() => {
              Swal.fire(
                "¡Eliminado!",
                "La pizza ha sido eliminada.",
                "success"
              );
              this.fetchPizzas();
            })
            .catch((error) => {
              console.error("Error al eliminar pizza:", error);
              Swal.fire("Error", "No se pudo eliminar la pizza.", "error");
            });
        }
      });
    },
  },
  mounted() {
    this.fetchPizzas();
  },
};
</script>
