<template>
  <div class="container text-start">
    <h1 class="text-danger fw-bold">Editar Ingrediente Extra</h1>
    <div class="card">
      <div class="card-header fw-bold">Formulario de Edición</div>
      <div class="card-body">
        <form @submit.prevent="updateExtraIngredient">
          <!-- Nombre -->
          <div class="mb-3">
            <label for="name" class="form-label">Nombre</label>
            <div class="input-group">
              <span class="input-group-text">
                <font-awesome-icon icon="cheese" />
              </span>
              <input
                type="text"
                id="name"
                v-model="extraIngredient.name"
                class="form-control"
                required
              />
            </div>
          </div>

          <!-- Precio -->
          <div class="mb-3">
            <label for="price" class="form-label">Precio</label>
            <div class="input-group">
              <span class="input-group-text">
                <font-awesome-icon icon="dollar-sign" />
              </span>
              <input
                type="number"
                id="price"
                v-model="extraIngredient.price"
                class="form-control"
                step="0.01"
                min="0"
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
  name: "EditExtraIngredient",
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      extraIngredient: {
        id: null,
        name: "",
        price: 0,
      },
    };
  },
  methods: {
    cancel() {
      this.$router.push({ name: "ExtraIngredients" });
    },
    async updateExtraIngredient() {
      try {
        await axios.put(
          `http://127.0.0.1:8000/api/extra_ingredients/${this.extraIngredient.id}`,
          this.extraIngredient
        );
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Ingrediente extra actualizado correctamente",
          showConfirmButton: false,
          timer: 2000,
        });
        this.$router.push({ name: "ExtraIngredients" });
      } catch (error) {
        console.error("Error al actualizar el ingrediente extra:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo actualizar el ingrediente extra.",
        });
      }
    },
  },
  mounted() {
    const id = this.$route.params.id;
    axios
      .get(`http://127.0.0.1:8000/api/extra_ingredients/${id}`)
      .then((response) => {
        this.extraIngredient = response.data;
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo cargar el ingrediente extra.",
        });
      });
  },
};
</script>
