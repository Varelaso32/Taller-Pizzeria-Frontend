<template>
  <div class="container text-start">
    <h1 class="text-danger fw-bold">{{ $t("newPizzaIngredient.title") }}</h1>
    <div class="card">
      <div class="card-header fw-bold">{{ $t("newPizzaIngredient.header") }}</div>
      <div class="card-body">
        <form @submit.prevent="savePizzaIngredient">
          <!-- Selección de Pizza -->
          <div class="mb-3">
            <label for="pizza" class="form-label">{{ $t("newPizzaIngredient.pizza") }}</label>
            <div class="input-group">
              <span class="input-group-text">
                <font-awesome-icon icon="pizza-slice" />
              </span>
              <select
                id="pizza"
                v-model="relation.pizza_id"
                class="form-select"
                required
              >
                <option value="" disabled>{{ $t("newPizzaIngredient.selectPizza") }}</option>
                <option v-for="pizza in pizzas" :key="pizza.id" :value="pizza.id">
                  {{ pizza.name }}
                </option>
              </select>
            </div>
          </div>

          <!-- Selección de Ingrediente -->
          <div class="mb-3">
            <label for="ingredient" class="form-label">{{ $t("newPizzaIngredient.ingredient") }}</label>
            <div class="input-group">
              <span class="input-group-text">
                <font-awesome-icon icon="leaf" />
              </span>
              <select
                id="ingredient"
                v-model="relation.ingredient_id"
                class="form-select"
                required
              >
                <option value="" disabled>{{ $t("newPizzaIngredient.selectIngredient") }}</option>
                <option v-for="ingredient in ingredients" :key="ingredient.id" :value="ingredient.id">
                  {{ ingredient.name }}
                </option>
              </select>
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
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "NuevoPizzaIngrediente",
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      relation: {
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
    async savePizzaIngredient() {
      try {
        await axios.post("http://127.0.0.1:8000/api/pizza_ingredients", this.relation);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: this.$t("newPizzaIngredient.success"),
          showConfirmButton: false,
          timer: 2000,
        });
        this.$router.push({ name: "PizzaIngredients" });
      } catch (error) {
        console.error("Error al guardar relación pizza-ingrediente:", error);
        let msg = this.$t("newPizzaIngredient.saveError");
        if (error.response?.data?.msg) {
          msg = error.response.data.msg;
        }
        Swal.fire({
          icon: "error",
          title: this.$t("error.title"),
          text: msg,
        });
      }
    },
    async fetchData() {
      try {
        const [pizzasRes, ingredientsRes] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/pizzas"),
          axios.get("http://127.0.0.1:8000/api/ingredients"),
        ]);
        this.pizzas = pizzasRes.data;
        this.ingredients = ingredientsRes.data;
      } catch (error) {
        console.error("Error al cargar pizzas o ingredientes:", error);
        Swal.fire({
          icon: "error",
          title: this.$t("error.title"),
          text: this.$t("newPizzaIngredient.loadError"),
        });
      }
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
