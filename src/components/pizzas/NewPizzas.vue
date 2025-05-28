<template>
  <div class="container text-start">
    <h1 class="text-danger fw-bold">{{ $t("pizzas.newTitle") }}</h1>
    <div class="card">
      <div class="card-header fw-bold">{{ $t("pizzas.header") }}</div>
      <div class="card-body">
        <form @submit.prevent="createPizza">
          <!-- Nombre de la pizza -->
          <div class="mb-3">
            <label for="name" class="form-label">{{ $t("pizzas.name") }}</label>
            <input
              type="text"
              id="name"
              v-model="pizza.name"
              class="form-control"
              maxlength="255"
              required
            />
          </div>
          <!-- Botones -->
          <button
            type="submit"
            class="btn text-white"
            style="background-color: #c1121f"
            :disabled="loading"
          >
            <span v-if="loading" class="spinner-border spinner-border-sm me-1"></span>
            {{ loading ? $t("buttons.saving") : $t("buttons.save") }}
          </button>
          <button type="button" class="btn btn-secondary ms-2" @click="cancel">
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

export default {
  name: "NewPizza",
  data() {
    return {
      pizza: {
        name: ""
      },
      loading: false
    };
  },
  methods: {
    cancel() {
      this.$router.push({ name: "Pizzas" });
    },
    async createPizza() {
      this.loading = true;
      try {
        await axios.post("/api/pizzas", this.pizza);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: this.$t("pizzas.createdSuccess"),
          showConfirmButton: false,
          timer: 2000,
        });
        this.$router.push({ name: "Pizzas" });
      } catch (error) {
        let errorMsg = this.$t("pizzas.createError");
        if (error.response?.data?.msg) {
          errorMsg = error.response.data.msg;
        }
        Swal.fire({
          icon: "error",
          title: this.$t("errors.title"),
          text: errorMsg,
        });
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>