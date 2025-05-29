<template>
  <div class="container py-4">
    <h1 class="text-danger fw-bold mb-4">{{ $t("pizzaSizes.editTitle") }}</h1>
    <div class="card shadow-sm rounded">
      <div class="card-header fw-bold">{{ $t("pizzaSizes.dataTitle") }}</div>
      <div class="card-body">
        <form @submit.prevent="updatePizzaSize">
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
              placeholder="{{ $t('pizzaSizes.pricePlaceholder') }}"
              min="0"
            />
          </div>

          <button type="submit" class="btn btn-warning text-white">
            <font-awesome-icon icon="save" class="me-2" />
            {{ $t("buttons.update") }}
          </button>
          <button type="button" class="btn btn-secondary ms-2" @click="cancelEdit">
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
      form: {
        pizza_id: "",
        size: "",
        price: "",
      },
      pizzas: [],
    };
  },
  methods: {
    async fetchPizzaSize() {
      const id = this.$route.params.id;
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/pizza-sizes/${id}`);
        this.form = response.data;
      } catch (error) {
        console.error("Error loading pizza size:", error);
        Swal.fire(this.$t("alerts.error"), this.$t("pizzaSizes.loadError"), "error");
        this.$router.push({ name: "Pizza-Sizes" });
      }
    },
    async fetchPizzas() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/pizzas");
        this.pizzas = response.data;
      } catch (error) {
        console.error("Error loading pizzas:", error);
        Swal.fire(this.$t("alerts.error"), this.$t("pizzaSizes.errorLoadPizzas"), "error");
      }
    },
    async updatePizzaSize() {
      const id = this.$route.params.id;
      try {
        await axios.put(`http://127.0.0.1:8000/api/pizza-sizes/${id}`, this.form);
        Swal.fire(this.$t("pizzaSizes.updated"), this.$t("pizzaSizes.updatedMsg"), "success");
        this.$router.push({ name: "Pizza-Sizes" });
      } catch (error) {
        console.error("Error updating pizza size:", error);
        Swal.fire(this.$t("alerts.error"), this.$t("pizzaSizes.updateError"), "error");
      }
    },
    cancelEdit() {
      this.$router.push({ name: "Pizza-Sizes" });
    },
  },
  mounted() {
    this.fetchPizzaSize();
    this.fetchPizzas();
  },
};
</script>
