<template>
  <div class="container py-4">
    <h2 class="mb-4">Editar Pizza</h2>
    <form @submit.prevent="updatePizza" class="bg-white p-4 rounded shadow-sm">
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
      <button type="submit" class="btn btn-warning me-2">Actualizar</button>
      <button type="button" class="btn btn-secondary" @click="cancelEdit">
        Cancelar
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "EditPizza",
  data() {
    return {
      form: {
        name: "",
      },
    };
  },
  methods: {
    fetchPizza() {
      const id = this.$route.params.id;
      axios
        .get(`http://127.0.0.1:8000/api/pizzas/${id}`)
        .then((response) => {
          this.form.name = response.data.name;
        })
        .catch(() => {
          Swal.fire("Error", "Pizza no encontrada", "error");
          this.$router.push({ name: "Pizzas" });
        });
    },
    updatePizza() {
      const id = this.$route.params.id;
      axios
        .put(`http://127.0.0.1:8000/api/pizzas/${id}`, this.form)
        .then(() => {
          Swal.fire(
            "Actualizado",
            "La pizza se ha actualizado correctamente.",
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
            Swal.fire("Error", "Error al actualizar la pizza.", "error");
          }
        });
    },
    cancelEdit() {
      this.$router.push({ name: "Pizzas" });
    },
  },
  mounted() {
    this.fetchPizza();
  },
};
</script>
