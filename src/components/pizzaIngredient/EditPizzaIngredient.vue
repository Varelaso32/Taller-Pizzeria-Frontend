<template>
  <div class="container text-start">
    <h1 class="text-danger fw-bold">{{ $t("editPizzaIngredient.title") }}</h1>
    <div class="card">
      <div class="card-header fw-bold">{{ $t("editPizzaIngredient.header") }}</div>
      <div class="card-body">
        <form @submit.prevent="updatePizzaIngredient">
          <!-- Pizza -->
          <div class="mb-3">
            <label for="pizza" class="form-label">{{ $t("editPizzaIngredient.pizza") }}</label>
            <select v-model="pizzaIngredient.pizza_id" id="pizza" class="form-select" required>
              <option value="" disabled>{{ $t("editPizzaIngredient.selectPizza") }}</option>
              <option v-for="pizza in pizzas" :key="pizza.id" :value="pizza.id">
                {{ pizza.name }}
              </option>
            </select>
          </div>

          <!-- Ingrediente -->
          <div class="mb-3">
            <label for="ingredient" class="form-label">{{ $t("editPizzaIngredient.ingredient") }}</label>
            <select v-model="pizzaIngredient.ingredient_id" id="ingredient" class="form-select" required>
              <option value="" disabled>{{ $t("editPizzaIngredient.selectIngredient") }}</option>
              <option v-for="ingredient in ingredients" :key="ingredient.id" :value="ingredient.id">
                {{ ingredient.name }}
              </option>
            </select>
          </div>

          <!-- Botones -->
          <button type="submit" class="btn text-white" style="background-color: #c1121f">
            {{ $t("buttons.save") }}
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
  name: "EditarPizzaIngrediente",
  data() {
    return {
      pizzaIngredient: {
        pizza_id: null,
        ingredient_id: null,
      },
      pizzas: [],
      ingredients: [],
    };
  },
  methods: {
    cancel() {
      this.$router.push({ name: "PizzaIngredients" });
    },
    async updatePizzaIngredient() {
      try {
        await axios.put(`http://127.0.0.1:8000/api/pizza_ingredients/${this.$route.params.id}`, {
          pizza_id: this.pizzaIngredient.pizza_id,
          ingredient_id: this.pizzaIngredient.ingredient_id,
        });

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: this.$t("editPizzaIngredient.success"),
          showConfirmButton: false,
          timer: 2000,
        });

        this.$router.push({ name: "PizzaIngredients" });
      } catch (error) {
        console.error("Error al actualizar relación:", error);
        Swal.fire({
          icon: "error",
          title: this.$t("error.title"),
          text: error.response?.data?.msg || this.$t("editPizzaIngredient.updateError"),
        });
      }
    },
    async fetchOptions() {
      try {
        const [pizzaRes, ingredientRes] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/pizzas"),
          axios.get("http://127.0.0.1:8000/api/ingredients"),
        ]);
        this.pizzas = pizzaRes.data;
        this.ingredients = ingredientRes.data;
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: this.$t("error.title"),
          text: this.$t("editPizzaIngredient.loadError"),
        });
      }
    },
    async fetchPizzaIngredient() {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/pizza_ingredients/${this.$route.params.id}`);
        this.pizzaIngredient = {
          pizza_id: res.data.pizza_id,
          ingredient_id: res.data.ingredient_id,
        };
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: this.$t("error.title"),
          text: this.$t("editPizzaIngredient.loadRelationError"),
        });
      }
    },
  },
  mounted() {
    this.fetchOptions();
    this.fetchPizzaIngredient();
  },
};
</script>
