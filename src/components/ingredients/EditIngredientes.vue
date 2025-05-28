<template>
  <div class="container text-start">
    <h1 class="text-danger fw-bold">Editar Ingrediente</h1>
    <div class="card">
      <div class="card-header fw-bold">Formulario de Edición</div>
      <div class="card-body">
        <form @submit.prevent="updateIngredient">
          <!-- Nombre -->
          <div class="mb-3">
            <label for="name" class="form-label">Nombre</label>
            <div class="input-group">
              <span class="input-group-text">
                <font-awesome-icon icon="tags" />
              </span>
              <input
                type="text"
                id="name"
                v-model="ingredient.name"
                class="form-control"
                required
              />
            </div>
          </div>

          <!-- Botones -->
          <button
            type="submit"
            class="btn text-white"
            style="background-color: #c1121f"
          >
            Guardar Cambios
          </button>
          <button type="button" class="btn btn-secondary ms-2" @click="cancel">
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
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "EditIngredient",
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      ingredient: {
        id: null,
        name: "",
      },
      apiUrl: "http://127.0.0.1:8000/api/ingredients",
    };
  },
  methods: {
    cancel() {
      this.$router.push({ name: "Ingredients" });
    },
    async updateIngredient() {
      try {
        const res = await axios.put(`${this.apiUrl}/${this.ingredient.id}`, {
          name: this.ingredient.name,
        });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Ingrediente actualizado correctamente",
          showConfirmButton: false,
          timer: 2000,
        });
        this.$router.push({ name: "Ingredients" });
      } catch (error) {
        console.error("Error al actualizar ingrediente:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            error.response?.data?.msg ||
            "No se pudo actualizar el ingrediente.",
        });
      }
    },
  },
  mounted() {
    const id = this.$route.params.id;
    axios
      .get(`${this.apiUrl}/${id}`)
      .then((response) => {
        this.ingredient = { ...response.data };
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo cargar el ingrediente.",
        });
      });
  },
};
</script>
