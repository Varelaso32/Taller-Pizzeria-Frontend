<template>
  <div class="container text-start">
    <h1 class="text-danger fw-bold">{{ $t("pizza_sizes.editTitle") }}</h1>
    <div class="card">
      <div class="card-header fw-bold">{{ $t("pizza_sizes.header") }}</div>
      <div class="card-body">
        <form @submit.prevent="updatePizzaSize">
          <!-- Pizza -->
          <div class="mb-3">
            <label for="pizza_id" class="form-label">{{ $t("pizza_sizes.pizza") }}</label>
            <select
              id="pizza_id"
              v-model="pizzaSize.pizza_id"
              class="form-select"
              required
            >
              <option v-for="pizza in pizzas" :key="pizza.id" :value="pizza.id">
                {{ pizza.name }}
              </option>
            </select>
          </div>
          <!-- Tamaño -->
          <div class="mb-3">
            <label for="size" class="form-label">{{ $t("pizza_sizes.size") }}</label>
            <select
              id="size"
              v-model="pizzaSize.size"
              class="form-select"
              required
            >
              <option value="pequeña">{{ $t("pizza_sizes.small") }}</option>
              <option value="mediana">{{ $t("pizza_sizes.medium") }}</option>
              <option value="grande">{{ $t("pizza_sizes.large") }}</option>
            </select>
          </div>
          <!-- Precio -->
          <div class="mb-3">
            <label for="price" class="form-label">{{ $t("pizza_sizes.price") }}</label>
            <input
              type="number"
              id="price"
              v-model="pizzaSize.price"
              class="form-control"
              min="0.01"
              max="9999.99"
              step="0.01"
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
  name: "EditPizzaSize",
  data() {
    return {
      pizzaSize: {
        pizza_id: "",
        size: "pequeña",
        price: ""
      },
      pizzas: [],
      loading: false
    };
  },
  created() {
    this.fetchPizzas();
    this.fetchPizzaSize();
  },
  methods: {
    async fetchPizzas() {
      try {
        const res = await axios.get("/api/pizzas");
        this.pizzas = res.data;
      } catch (e) {
        this.pizzas = [];
      }
    },
    async fetchPizzaSize() {
      const id = this.$route.params.id;
      try {
        const res = await axios.get(`/api/pizza-sizes/${id}`);
        this.pizzaSize = res.data;
      } catch (e) {
        Swal.fire({
          icon: "error",
          title: this.$t("errors.title"),
          text: this.$t("pizza_sizes.loadError"),
        });
        this.$router.push({ name: "PizzaSizes" });
      }
    },
    cancel() {
      this.$router.push({ name: "PizzaSizes" });
    },
    async updatePizzaSize() {
      this.loading = true;
      const id = this.$route.params.id;
      try {
        await axios.put(`/api/pizza-sizes/${id}`, this.pizzaSize);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: this.$t("pizza_sizes.updatedSuccess"),
          showConfirmButton: false,
          timer: 2000,
        });
        this.$router.push({ name: "PizzaSizes" });
      } catch (error) {
        let errorMsg = this.$t("pizza_sizes.updateError");
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