<template>
  <div class="container text-start">
    <h1 class="text-danger fw-bold">{{ $t("ingredients.new") }}</h1>
    <div class="card">
      <div class="card-header fw-bold">{{ $t("ingredients.form_register_title") }}</div>
      <div class="card-body">
        <form @submit.prevent="saveIngredient">
          <!-- Nombre del Ingrediente -->
          <div class="mb-3">
            <label for="name" class="form-label">{{ $t("ingredients.name") }}</label>
            <div class="input-group">
              <span class="input-group-text">
                <font-awesome-icon icon="tags" />
              </span>
              <input
                type="text"
                id="name"
                v-model="ingredient.name"
                class="form-control"
                :class="{ 'is-invalid': errors.name }"
                required
              />
            </div>
            <div v-if="errors.name" class="invalid-feedback d-block">
              {{ errors.name[0] }}
            </div>
          </div>

          <!-- Botones -->
          <button
            type="submit"
            class="btn text-white"
            style="background-color: #c1121f"
            :disabled="loading"
          >
            <span
              v-if="loading"
              class="spinner-border spinner-border-sm me-1"
            ></span>
            {{ loading ? $t("ingredients.saving") : $t("ingredients.save") }}
          </button>
          <button type="button" class="btn btn-secondary ms-2" @click="cancel">
            {{ $t("ingredients.cancel") }}
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
  name: "NewIngredient",
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      ingredient: {
        name: "",
      },
      errors: {},
      loading: false,
    };
  },
  methods: {
    cancel() {
      this.$router.push({ name: "Ingredients" });
    },
    async saveIngredient() {
      this.loading = true;
      this.errors = {};

      try {
        await axios.post(
          "http://127.0.0.1:8000/api/ingredients",
          this.ingredient
        );

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: this.$t("ingredients.created_success"),
          showConfirmButton: false,
          timer: 2000,
        });
        this.$router.push({ name: "Ingredients" });
      } catch (error) {
        if (error.response?.status === 400) {
          this.errors = error.response.data.errors || {};
        } else {
          Swal.fire({
            icon: "error",
            title: this.$t("alerts.error"),
            text: this.$t("ingredients.create_error"),
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
