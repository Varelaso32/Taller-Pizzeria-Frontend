<template>
  <div class="container text-start">
    <h1 class="text-danger fw-bold">{{ $t("pizza_raw_material.form.add_title") }}</h1>
    <div class="card">
      <div class="card-header fw-bold">{{ $t("pizza_raw_material.form.ingredient_info") }}</div>
      <div class="card-body">
        <form @submit.prevent="saveIngredient">
          <!-- Pizza -->
          <div class="mb-3">
            <label for="pizza_id" class="form-label">{{ $t("pizza_raw_material.form.pizza") }}</label>
            <div class="input-group">
              <span class="input-group-text">
                <font-awesome-icon icon="pizza-slice" />
              </span>
              <select id="pizza_id" v-model="ingredient.pizza_id" class="form-select" required>
                <option disabled value="">{{ $t("pizza_raw_material.form.select_pizza") }}</option>
                <option v-for="pizza in pizzas" :key="pizza.id" :value="pizza.id">
                  {{ pizza.name }}
                </option>
              </select>
            </div>
          </div>

          <!-- Materia prima -->
          <div class="mb-3">
            <label for="raw_material_id" class="form-label">{{ $t("pizza_raw_material.form.raw_material") }}</label>
            <div class="input-group">
              <span class="input-group-text">
                <font-awesome-icon icon="leaf" />
              </span>
              <select id="raw_material_id" v-model="ingredient.raw_material_id" class="form-select" required>
                <option disabled value="">{{ $t("pizza_raw_material.form.select_raw_material") }}</option>
                <option v-for="material in rawMaterials" :key="material.id" :value="material.id">
                  {{ material.name }}
                </option>
              </select>
            </div>
          </div>

          <!-- Cantidad -->
          <div class="mb-3">
            <label for="quantity" class="form-label">{{ $t("pizza_raw_material.form.quantity") }}</label>
            <div class="input-group">
              <span class="input-group-text">
                <font-awesome-icon icon="balance-scale" />
              </span>
              <input type="number" id="quantity" v-model="ingredient.quantity" class="form-control" min="0.01" step="0.01" required />
            </div>
          </div>

          <!-- Botones -->
          <button type="submit" class="btn text-white" style="background-color: #c1121f">
            {{ $t("pizza_raw_material.form.save") }}
          </button>
          <button type="button" class="btn btn-secondary ms-2" @click="cancel">
            {{ $t("pizza_raw_material.form.cancel") }}
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
  name: "NewPizzaRawMaterial",
  data() {
    return {
      ingredient: {
        pizza_id: "",
        raw_material_id: "",
        quantity: "",
      },
      pizzas: [],
      rawMaterials: [],
    };
  },
  mounted() {
    this.fetchPizzas();
    this.fetchRawMaterials();
  },
  methods: {
    async fetchPizzas() {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/pizzas");
        this.pizzas = res.data;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchRawMaterials() {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/raw-materials");
        this.rawMaterials = res.data;
      } catch (error) {
        console.error(error);
      }
    },
    async saveIngredient() {
      try {
        await axios.post("http://127.0.0.1:8000/api/pizza-raw-materials", this.ingredient);
        Swal.fire({
          icon: "success",
          title: this.$t("pizza_raw_material.messages.added_success"),
          showConfirmButton: false,
          timer: 2000,
          position: "top-end",
        });
        this.$router.push({ name: "PizzaRawMaterial" });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response?.data?.msg || this.$t("pizza_raw_material.messages.add_error"),
        });
      }
    },
    cancel() {
      this.$router.push({ name: "PizzaRawMaterial" });
    },
  },
};
</script>
