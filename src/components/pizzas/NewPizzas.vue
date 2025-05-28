<template>
  <div class="container py-4">
    <h2 class="mb-4">Crear Nueva Pizza</h2>
    <form @submit.prevent="createPizza" class="bg-white p-4 rounded shadow-sm">
      <div class="mb-3">
        <label for="name" class="form-label">Nombre de la Pizza</label>
        <input
          type="text"
          id="name"
          v-model="form.name"
          class="form-control"
          required
        />
      </div>
      <button type="submit" class="btn btn-danger me-2">Crear</button>
      <button type="button" class="btn btn-secondary" @click="cancelCreate">
        Cancelar
      </button>
    </form>
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
