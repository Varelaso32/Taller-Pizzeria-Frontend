<template>
  <div class="container py-4">
    <h1 class="text-danger fw-bold mb-4">Nueva Pizza</h1>
    <div class="card shadow-sm rounded">
      <div class="card-header fw-bold">Datos de la Pizza</div>
      <div class="card-body">
        <form @submit.prevent="createPizza">
          <!-- Nombre de la Pizza -->
          <div class="mb-3">
            <label for="name" class="form-label">Nombre de la Pizza</label>
            <input
              type="text"
              id="name"
              v-model="form.name"
              class="form-control"
              required
              placeholder="Ingrese el nombre de la pizza"
            />
          </div>

          <!-- Botones -->
          <button
            type="submit"
            class="btn text-white"
            style="background-color: #c1121f"
          >
            Crear
          </button>
          <button
            type="button"
            class="btn btn-secondary ms-2"
            @click="cancelCreate"
          >
            Cancelar
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
  name: "NewPizza",
  data() {
    return {
      form: {
        name: "",
      },
    };
  },
  methods: {
    createPizza() {
      axios
        .post("http://127.0.0.1:8000/api/pizzas", this.form)
        .then(() => {
          Swal.fire(
            "Creado",
            "La pizza ha sido creada correctamente.",
            "success"
          );
          this.$router.push({ name: "Pizzas" });
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            Swal.fire(
              "Error",
              "El nombre ya está en uso o es inválido.",
              "error"
            );
          } else {
            Swal.fire("Error", "Error al crear la pizza.", "error");
          }
        });
    },
    cancelCreate() {
      this.$router.push({ name: "Pizzas" });
    },
  },
};
</script>
