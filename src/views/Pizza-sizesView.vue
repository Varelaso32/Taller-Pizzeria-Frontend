<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="h3 text-danger">
        <font-awesome-icon icon="pizza-slice" class="me-2" />
        Listado de Tamaños de Pizza
      </h1>
      <button @click="newPizzaSize" class="btn btn-danger d-flex align-items-center">
        <font-awesome-icon icon="plus" class="me-2" />
        Nuevo Tamaño
      </button>
    </div>

    <div class="table-responsive shadow-sm rounded bg-white">
      <table class="table table-striped align-middle mb-0">
        <thead class="table-dark text-white">
          <tr>
            <th>#</th>
            <th>Pizza</th>
            <th>Tamaño</th>
            <th>Precio</th>
            <th class="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in pizzaSizes" :key="item.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ item.pizza_name }}</td>
            <td>{{ item.size }}</td>
            <td>${{ Number(item.price).toFixed(2) }}</td>
            <td class="text-center">
              <button @click="editPizzaSize(item.id)" class="btn btn-sm btn-warning me-2">
                <font-awesome-icon icon="pencil" />
              </button>
              <button @click="deletePizzaSize(item.id)" class="btn btn-sm btn-danger">
                <font-awesome-icon icon="trash" />
              </button>
            </td>
          </tr>
          <tr v-if="pizzaSizes.length === 0">
            <td colspan="5" class="text-center py-4 text-muted">
              No hay tamaños de pizza registrados.
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
  name: "PizzaSizeView",
  data() {
    return {
      pizzaSizes: [],
    };
  },
  methods: {
    fetchPizzaSizes() {
      axios
        .get("http://127.0.0.1:8000/api/pizza-sizes")
        .then((response) => {
          this.pizzaSizes = response.data;
        })
        .catch((error) => {
          console.error("Error al cargar los tamaños de pizza:", error);
        });
    },
    deletePizzaSize(id) {
      Swal.fire({
        title: `¿Deseas eliminar el tamaño de pizza con ID ${id}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#c1121f",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`http://127.0.0.1:8000/api/pizza-sizes/${id}`)
            .then(() => {
              Swal.fire("¡Eliminado!", "El tamaño ha sido eliminado.", "success");
              this.fetchPizzaSizes();
            })
            .catch((error) => {
              console.error("Error al eliminar tamaño:", error);
              Swal.fire("Error", "No se pudo eliminar el tamaño.", "error");
            });
        }
      });
    },
    editPizzaSize(id) {
      this.$router.push({ name: "EditPizzaSize", params: { id: `${id}` } });
    },
    newPizzaSize() {
      this.$router.push({ name: "NewPizzaSize" });
    },
  },
  mounted() {
    this.fetchPizzaSizes();
  },
};
</script>
