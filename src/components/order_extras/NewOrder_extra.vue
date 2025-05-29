<template>
  <div class="container text-start py-4">
    <h1 class="h3 text-danger fw-bold mb-4">
      <font-awesome-icon class="me-2" />
      Nuevo Ingrediente Extra por Orden
    </h1>
    <div class="card shadow rounded">
      <div class="card-header fw-bold">Formulario de Registro</div>
      <div class="card-body">
        <form @submit.prevent="createOrderExtra">
          <!-- Dropdown de Orden -->
          <div class="mb-3">
            <label for="order_id" class="form-label">Orden</label>
            <select
              id="order_id"
              v-model="orderExtra.order_id"
              class="form-select"
              required
            >
              <option value="" disabled>Selecciona una orden</option>
              <option v-for="order in orders" :key="order.id" :value="order.id">
                {{ order.id }} - Cliente:
                {{ order.client_name || order.id }}
              </option>
            </select>
          </div>

          <!-- Dropdown de Ingrediente Extra -->
          <div class="mb-3">
            <label for="extra_ingredient_id" class="form-label"
              >Ingrediente Extra</label
            >
            <select
              id="extra_ingredient_id"
              v-model="orderExtra.extra_ingredient_id"
              class="form-select"
              required
            >
              <option value="" disabled>Selecciona un ingrediente</option>
              <option v-for="extra in extras" :key="extra.id" :value="extra.id">
                {{ extra.name }}
              </option>
            </select>
          </div>

          <!-- Cantidad -->
          <div class="mb-3">
            <label for="quantity" class="form-label">Cantidad</label>
            <input
              type="number"
              id="quantity"
              v-model="orderExtra.quantity"
              class="form-control"
              required
            />
          </div>

          <!-- Botones -->
          <div class="d-flex justify-content-start mt-4">
            <button
              type="submit"
              class="btn text-white me-2"
              style="background-color: #c1121f"
              :disabled="loading"
            >
              <span
                v-if="loading"
                class="spinner-border spinner-border-sm me-1"
              ></span>
              {{ loading ? "Guardando..." : "Guardar" }}
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              @click="cancel"
              :disabled="loading"
            >
              Cancelar
            </button>
          </div>
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
  name: "NewOrderExtra",
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      orderExtra: {
        order_id: "",
        extra_ingredient_id: "",
        quantity:"",
      },
      orders: [],
      extras: [],
      loading: false,
    };
  },
  created() {
    this.fetchOrders();
    this.fetchExtras();
  },
  methods: {
    async fetchOrders() {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/orders");
        this.orders = res.data;
      } catch {
        this.orders = [];
      }
    },
    async fetchExtras() {
      try {
        const res = await axios.get(
          "http://127.0.0.1:8000/api/extra_ingredients"
        );
        this.extras = res.data;
      } catch {
        this.extras = [];
      }
    },
    cancel() {
      this.$router.push({ name: "Order_extra" });
    },
    async createOrderExtra() {
      this.loading = true;
      try {
        await axios.post(
          "http://127.0.0.1:8000/api/order_extra_ingredients",
          this.orderExtra
        );
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Ingrediente extra creado correctamente",
          showConfirmButton: false,
          timer: 2000,
        });
        this.$router.push({ name: "Order_extra" });
      } catch (error) {
        let errorMsg = "No se pudo crear el ingrediente extra.";
        if (error.response?.data?.msg) {
          errorMsg = error.response.data.msg;
        }
        Swal.fire({
          icon: "error",
          title: "Error",
          text: errorMsg,
        });
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
