<template>
  <div class="container text-start">
    <h1 class="text-danger fw-bold">{{ $t("extraIngredient.title") }}</h1>
    <div class="card">
      <div class="card-header fw-bold">{{ $t("extraIngredient.header") }}</div>
      <div class="card-body">
        <form @submit.prevent="saveExtraIngredient">
          <!-- Nombre del ingrediente extra -->
          <div class="mb-3">
            <label for="name" class="form-label">{{ $t("extraIngredient.name") }}</label>
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
            <label for="price" class="form-label">{{ $t("extraIngredient.price") }}</label>
            <div class="input-group">
              <span class="input-group-text">
                <font-awesome-icon icon="dollar-sign" />
              </span>
              <input
                type="number"
                step="0.01"
                id="price"
                v-model="extraIngredient.price"
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
            {{ $t("buttons.save") }}
          </button>
          <button
            type="button"
            class="btn btn-secondary ms-2"
            @click="cancel"
          >
            {{ $t("buttons.cancel") }}
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
  name: "NewExtraIngredient",
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      extraIngredient: {
        name: "",
        price: null,
      },
    };
  },
  methods: {
    cancel() {
      this.$router.push({ name: "ExtraIngredients" });
    },
    async saveExtraIngredient() {
      try {
        await axios.post("http://127.0.0.1:8000/api/extra_ingredients", this.extraIngredient);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Ingrediente extra creado correctamente",
          showConfirmButton: false,
          timer: 2000,
        });
        this.$router.push({ name: "ExtraIngredients" });
      } catch (error) {
        console.error("Error al crear ingrediente extra:", error);
        let msg = "No se pudo crear el ingrediente extra.";
        if (error.response?.data?.msg) {
          msg = error.response.data.msg;
        }
        Swal.fire({
          icon: "error",
          title: "Error",
          text: msg,
        });
      }
    },
  },
};
</script>
