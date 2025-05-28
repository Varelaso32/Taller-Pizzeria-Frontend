<template>
  <div class="container py-4">
    <div class="card shadow-sm">
      <div class="card-header bg-danger text-white d-flex justify-content-between align-items-center">
        <h2 class="h5 mb-0">
          <font-awesome-icon icon="plus" class="me-2" />
          Crear Tamaño de Pizza
        </h2>
        <button @click="$router.back()" class="btn btn-outline-light btn-sm">
          <font-awesome-icon icon="arrow-left" class="me-1" />
          Volver
        </button>
      </div>

      <div class="card-body">
        <form @submit.prevent="createPizzaSize">
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

          <button type="submit" class="btn btn-danger">
            <font-awesome-icon icon="save" class="me-2" />
            Guardar Tamaño
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
  name: "NewPizzaSize",
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
    createPizzaSize() {
      axios
        .post("http://127.0.0.1:8000/api/pizza-sizes", this.form)
        .then(() => {
          Swal.fire(
            "¡Creado!",
            "El tamaño de pizza ha sido registrado correctamente.",
            "success"
          );
          this.form = { pizza_id: "", size: "", price: "" };
        })
        .catch((err) => {
          console.error("Error al crear tamaño:", err);
          Swal.fire("Error", "No se pudo crear el tamaño de pizza.", "error");
        });
    },
  },
};
</script>
