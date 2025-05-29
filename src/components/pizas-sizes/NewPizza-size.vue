<template>
  <div class="container py-4">
    <h1 class="text-danger fw-bold mb-4">{{ $t("pizzaSizes.newTitle") }}</h1>
    <div class="card shadow-sm rounded">
      <div class="card-header fw-bold">{{ $t("pizzaSizes.dataTitle") }}</div>
      <div class="card-body">
        <form @submit.prevent="createPizzaSize">
          <div class="mb-3">
            <label for="pizza_id" class="form-label">{{ $t("pizzaSizes.pizza") }}:</label>
            <select id="pizza_id" v-model="form.pizza_id" class="form-select" required>
              <option disabled value="">{{ $t("pizzaSizes.selectPizza") }}</option>
              <option v-for="pizza in pizzas" :key="pizza.id" :value="pizza.id">{{ pizza.name }}</option>
            </select>
          </div>

          <div class="mb-3">
            <label for="size" class="form-label">{{ $t("pizzaSizes.size") }}:</label>
            <select id="size" v-model="form.size" class="form-select" required>
              <option disabled value="">{{ $t("pizzaSizes.selectSize") }}</option>
              <option value="pequeña">{{ $t("pizzaSizes.sizes.small") }}</option>
              <option value="mediana">{{ $t("pizzaSizes.sizes.medium") }}</option>
              <option value="grande">{{ $t("pizzaSizes.sizes.large") }}</option>
            </select>
          </div>

          <div class="mb-3">
            <label for="price" class="form-label">{{ $t("pizzaSizes.price") }} (COP):</label>
            <input
  id="price"
  v-model="form.price"
  type="number"
  class="form-control"
  required
  :placeholder="$t('pizzaSizes.pricePlaceholder')"
  min="0"
/>
          </div>

          <button type="submit" class="btn text-white" style="background-color: #c1121f">
            {{ $t("buttons.create") }}
          </button>
          <button type="button" class="btn btn-secondary ms-2" @click="cancelCreate">
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
  name: "NewPizzaSize",
  data() {
    return {
      form: {
        pizza_id: "",
        size: "",
        price: "",
      },
      pizzas: [],
    };
  },
  methods: {
    async fetchPizzas() {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/pizzas");
        this.pizzas = res.data;
      } catch (err) {
        console.error("Error fetching pizzas:", err);
        Swal.fire(this.$t("alerts.error"), this.$t("pizzaSizes.errorLoadPizzas"), "error");
      }
    },
    async createPizzaSize() {
      try {
        await axios.post("http://127.0.0.1:8000/api/pizza-sizes", this.form);
        Swal.fire(this.$t("pizzaSizes.created"), this.$t("pizzaSizes.createdMsg"), "success");
        this.$router.push({ name: "Pizza-Sizes" });
      } catch (err) {
        console.error("Error creating pizza size:", err);
        Swal.fire(this.$t("alerts.error"), this.$t("pizzaSizes.createError"), "error");
      }
    },
    cancelCreate() {
      this.$router.push({ name: "Pizza-Sizes" });
    },
  },
  mounted() {
    this.fetchPizzas();
  },
};
</script>
