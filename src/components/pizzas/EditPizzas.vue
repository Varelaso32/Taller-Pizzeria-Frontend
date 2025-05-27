<template>
  <div class="container text-start">
    <h1 class="text-danger fw-bold">{{ $t("pizzas.editTitle") }}</h1>
    <div class="card">
      <div class="card-header fw-bold">{{ $t("pizzas.header") }}</div>
      <div class="card-body">
        <form @submit.prevent="updatePizza">
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
  name: "EditPizza",
  data() {
    return {
      pizza: {
        name: ""
      },
      loading: false
    };
  },
  created() {
    this.fetchPizza();
  },
  methods: {
    async fetchPizza() {
      const id = this.$route.params.id;
      try {
        const res = await axios.get(`/api/pizzas/${id}`);
        this.pizza = res.data;
      } catch (e) {
        Swal.fire({
          icon: "error",
          title: this.$t("errors.title"),
          text: this.$t("pizzas.loadError"),
        });
        this.$router.push({ name: "Pizzas" });
      }
    },
    cancel() {
      this.$router.push({ name: "Pizzas" });
    },
    async updatePizza() {
      this.loading = true;
      const id = this.$route.params.id;
      try {
        await axios.put(`/api/pizzas/${id}`, this.pizza);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: this.$t("pizzas.updatedSuccess"),
          showConfirmButton: false,
          timer: 2000,
        });
        this.$router.push({ name: "Pizzas" });
      } catch (error) {
        let errorMsg = this.$t("pizzas.updateError");
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