<template>
  <div class="container text-start">
    <h1 class="text-danger fw-bold mb-4">Ingredientes</h1>
    <button class="btn btn-success mb-3" @click="showForm = true">
      Nuevo Ingrediente
    </button>
    <div class="card">
      <div class="card-header fw-bold">Listado de Ingredientes</div>
      <div class="card-body">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ingredient in ingredients" :key="ingredient.id">
              <td>{{ ingredient.name }}</td>
              <td>
                <!-- Aquí podrías agregar un botón de editar si lo necesitas -->
                <button
                  class="btn btn-danger btn-sm"
                  @click="deleteIngredient(ingredient.id)"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-if="error" class="text-danger">{{ error }}</p>
      </div>
    </div>

    <!-- Formulario para nuevo ingrediente -->
    <div v-if="showForm" class="modal-backdrop fade show"></div>
    <div v-if="showForm" class="modal d-block" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <form @submit.prevent="createIngredient">
            <div class="modal-header">
              <h5 class="modal-title">Nuevo Ingrediente</h5>
              <button type="button" class="btn-close" @click="showForm = false"></button>
            </div>
            <div class="modal-body">
              <input
                type="text"
                v-model="newIngredient"
                class="form-control"
                placeholder="Nombre del ingrediente"
                required
              />
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-success">Guardar</button>
              <button type="button" class="btn btn-secondary" @click="showForm = false">Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "IngredientsView",
  data() {
    return {
      ingredients: [],
      newIngredient: "",
      showForm: false,
      error: ""
    };
  },
  created() {
    this.getIngredients();
  },
  methods: {
    async getIngredients() {
      try {
        const res = await axios.get("/api/ingredients");
        this.ingredients = res.data;
      } catch (e) {
        this.error = "No se pudieron cargar los ingredientes.";
      }
    },
    async createIngredient() {
      try {
        await axios.post("/api/ingredients", { name: this.newIngredient });
        this.newIngredient = "";
        this.showForm = false;
        this.getIngredients();
      } catch (e) {
        this.error = "No se pudo crear el ingrediente.";
      }
    },
    async deleteIngredient(id) {
      if (!confirm("¿Eliminar ingrediente?")) return;
      try {
        await axios.delete(`/api/ingredients/${id}`);
        this.getIngredients();
      } catch (e) {
        this.error = "Error eliminando ingrediente.";
      }
    }
  }
};
</script>