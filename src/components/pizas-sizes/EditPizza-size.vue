<template>
  <div class="container py-4">
    <div class="card shadow-sm">
      <div class="card-header bg-danger text-white d-flex justify-content-between align-items-center">
        <h2 class="h5 mb-0">
          <font-awesome-icon icon="pencil-alt" class="me-2" />
          Editar Tamaño de Pizza
        </h2>
        <button @click="$router.back()" class="btn btn-outline-light btn-sm">
          <font-awesome-icon icon="arrow-left" class="me-1" />
          Volver
        </button>
      </div>

      <div class="card-body">
        <form @submit.prevent="updatePizzaSize">
          <div class="mb-3">
            <label for="pizza_id" class="form-label">ID Pizza:</label>
            <input
              id="pizza_id"
              v-model="form.pizza_id"
              type="number"
              class="form-control"
              required
            />
          </div>

          <div class="mb-3">
            <label for="size" class="form-label">Tamaño:</label>
            <select
              id="size"
              v-model="form.size"
              class="form-select"
              required
            >
              <option disabled value="">Selecciona un tamaño</option>
              <option value="pequeña">Pequeña</option>
              <option value="mediana">Mediana</option>
              <option value="grande">Grande</option>
            </select>
          </div>

          <div class="mb-3">
            <label for="price" class="form-label">Precio:</label>
            <input
              id="price"
              v-model="form.price"
              type="number"
              step="0.01"
              class="form-control"
              required
            />
          </div>

          <button type="submit" class="btn btn-warning">
            <font-awesome-icon icon="save" class="me-2" />
            Actualizar Tamaño
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "EditPizzaSize",
  data() {
    return {
      form: {
        pizza_id: "",
        size: "",
        price: "",
      },
    };
  },
  methods: {
    fetchPizzaSize() {
      const id = this.$route.params.id;
      axios
        .get(`http://127.0.0.1:8000/api/pizza-sizes/${id}`)
        .then((response) => {
          this.form = response.data;
        })
        .catch((error) => {
          console.error("Error al cargar tamaño:", error);
          Swal.fire("Error", "No se pudo cargar el tamaño de pizza.", "error");
        });
    },
    updatePizzaSize() {
      const id = this.$route.params.id;
      axios
        .put(`http://127.0.0.1:8000/api/pizza-sizes/${id}`, this.form)
        .then(() => {
          Swal.fire(
            "¡Actualizado!",
            "El tamaño de pizza ha sido actualizado correctamente.",
            "success"
          );
        })
        .catch((error) => {
          console.error("Error al actualizar tamaño:", error);
          Swal.fire("Error", "No se pudo actualizar el tamaño de pizza.", "error");
        });
    },
  },
  mounted() {
    this.fetchPizzaSize();
  },
};
</script>
