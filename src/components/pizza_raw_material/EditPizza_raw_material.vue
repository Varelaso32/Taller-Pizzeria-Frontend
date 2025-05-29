<template>
  <div class="container text-start">
    <h1 class="text-danger fw-bold">{{ $t("pizza_raw_material.form.edit_title") }}</h1>
    <div class="card">
      <div class="card-header fw-bold">{{ $t("pizza_raw_material.form.ingredient_info") }}</div>
      <div class="card-body">
        <form @submit.prevent="updatePizzaRawMaterial">
          <!-- Pizza -->
          <div class="mb-3">
            <label for="pizza_id" class="form-label">{{ $t("pizza_raw_material.form.pizza") }}</label>
            <div class="input-group">
              <span class="input-group-text">
                <font-awesome-icon icon="pizza-slice" />
              </span>
              <select id="pizza_id" v-model="form.pizza_id" class="form-select" required>
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
              <select id="raw_material_id" v-model="form.raw_material_id" class="form-select" required>
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
              <input
                type="number"
                id="quantity"
                v-model="form.quantity"
                class="form-control"
                min="0.01"
                step="0.01"
                required
              />
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
  name: "EditPizzaRawMaterial",
  data() {
    return {
      form: {
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
    this.loadData();
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
    async loadData() {
      const id = this.$route.params.id;
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/pizza-raw-materials/${id}`);
        this.form = {
          pizza_id: res.data.pizza_id,
          raw_material_id: res.data.raw_material_id,
          quantity: res.data.quantity,
        };
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: this.$t("pizza_raw_material.messages.load_error"),
        });
      }
    },
    async updatePizzaRawMaterial() {
      const id = this.$route.params.id;
      try {
        await axios.put(`http://127.0.0.1:8000/api/pizza-raw-materials/${id}`, this.form);
        Swal.fire({
          icon: "success",
          title: this.$t("pizza_raw_material.messages.updated_success"),
          showConfirmButton: false,
          timer: 2000,
          position: "top-end",
        });
        this.$router.push({ name: "PizzaRawMaterial" });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response?.data?.msg || this.$t("pizza_raw_material.messages.update_error"),
        });
      }
    },
    cancel() {
      this.$router.push({ name: "PizzaRawMaterial" });
    },
  },
};
</script>
