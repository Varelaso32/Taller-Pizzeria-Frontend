<template>
  <div class="container text-start">
    <h1 class="text-danger fw-bold">Agregar Ingrediente a Pizza</h1>
    <div class="card">
      <div class="card-header fw-bold">Nuevo Ingrediente</div>
      <div class="card-body">
        <form @submit.prevent="saveIngredient">
          <!-- Pizza -->
          <div class="mb-3">
            <label for="pizza_id" class="form-label">Pizza</label>
            <div class="input-group">
              <span class="input-group-text">
                <font-awesome-icon icon="pizza-slice" />
              </span>
              <select
                id="pizza_id"
                v-model="ingredient.pizza_id"
                class="form-select"
                required
              >
                <option disabled value="">Seleccione una pizza</option>
                <option
                  v-for="pizza in pizzas"
                  :key="pizza.id"
                  :value="pizza.id"
                >
                  {{ pizza.name }}
                </option>
              </select>
            </div>
          </div>

          <!-- Materia prima -->
          <div class="mb-3">
            <label for="raw_material_id" class="form-label">Materia Prima</label>
            <div class="input-group">
              <span class="input-group-text">
                <font-awesome-icon icon="leaf" />
              </span>
              <select
                id="raw_material_id"
                v-model="ingredient.raw_material_id"
                class="form-select"
                required
              >
                <option disabled value="">Seleccione una materia prima</option>
                <option
                  v-for="material in rawMaterials"
                  :key="material.id"
                  :value="material.id"
                >
                  {{ material.name }}
                </option>
              </select>
            </div>
          </div>

          <!-- Cantidad -->
          <div class="mb-3">
            <label for="quantity" class="form-label">Cantidad (en gramos)</label>
            <div class="input-group">
              <span class="input-group-text">
                <font-awesome-icon icon="balance-scale" />
              </span>
              <input
                type="number"
                id="quantity"
                v-model="ingredient.quantity"
                class="form-control"
                min="0.01"
                step="0.01"
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
            Guardar
          </button>
          <button type="button" class="btn btn-secondary ms-2" @click="cancel">
            Cancelar
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
  name: "NewPizzaRawMaterial",
  components: {
    FontAwesomeIcon,
  },
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
        console.error("Error al cargar pizzas:", error);
      }
    },
    async fetchRawMaterials() {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/raw-materials");
        this.rawMaterials = res.data;
      } catch (error) {
        console.error("Error al cargar materias primas:", error);
      }
    },
    async saveIngredient() {
      try {
        const res = await axios.post(
          "http://127.0.0.1:8000/api/pizza-raw-materials",
          this.ingredient
        );
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Ingrediente agregado correctamente",
          showConfirmButton: false,
          timer: 2000,
        });
        this.$router.push({ name: "PizzaRawMaterial" });
      } catch (error) {
        console.error("Error al guardar el ingrediente:", error);
        let msg = "No se pudo agregar el ingrediente.";
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
    cancel() {
      this.$router.push({ name: "PizzaRawMaterial" });
    },
  },
};
</script>
