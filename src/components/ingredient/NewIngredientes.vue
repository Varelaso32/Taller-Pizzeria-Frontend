<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="h3 text-primary">
        <font-awesome-icon icon="plus-circle" class="me-2" />
        Nuevo Ingrediente
      </h1>
      <button @click="$router.go(-1)" class="btn btn-secondary">
        Volver
      </button>
    </div>

    <div class="card shadow-sm">
      <div class="card-body">
        <form @submit.prevent="submitForm">
          <div class="mb-3">
            <label for="name" class="form-label">Nombre del Ingrediente</label>
            <input
              type="text"
              class="form-control"
              id="name"
              v-model="form.name"
              :class="{ 'is-invalid': errors.name }"
              required
            />
            <div v-if="errors.name" class="invalid-feedback">
              {{ errors.name[0] }}
            </div>
          </div>
          
          <button type="submit" class="btn btn-primary" :disabled="loading">
            <span v-if="loading" class="spinner-border spinner-border-sm"></span>
            {{ loading ? 'Guardando...' : 'Guardar' }}
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
  name: "NewIngredient",
  data() {
    return {
      form: {
        name: "",
      },
      errors: {},
      loading: false,
    };
  },
  methods: {
    async submitForm() {
      this.loading = true;
      this.errors = {};
      
      try {
        const response = await axios.post("/api/ingredients", this.form);
        
        Swal.fire({
          title: "¡Éxito!",
          text: "Ingrediente creado correctamente",
          icon: "success",
          confirmButtonColor: "#0d6efd",
        }).then(() => {
          this.$router.push({ name: "Ingredients" });
        });
      } catch (error) {
        if (error.response && error.response.status === 400) {
          this.errors = error.response.data.errors;
        } else {
          Swal.fire({
            title: "Error",
            text: "No se pudo crear el ingrediente",
            icon: "error",
            confirmButtonColor: "#0d6efd",
          });
          console.error("Error creating ingredient:", error);
        }
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>