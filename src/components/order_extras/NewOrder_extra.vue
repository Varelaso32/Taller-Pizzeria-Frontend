<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="h3 text-danger">
        <font-awesome-icon icon="plus" class="me-2" />
        Nuevo Ingrediente Extra
      </h1>
      <button class="btn btn-danger" @click="cancel" :disabled="loading">
        <font-awesome-icon icon="arrow-left" class="me-2" />
        Volver
      </button>
    </div>
    <div class="card shadow-sm rounded">
      <div class="card-body">
        <form @submit.prevent="createOrderExtra">
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
                {{ order.id }}
              </option>
            </select>
          </div>
          <div class="mb-3">
            <label for="extra_ingredient_id" class="form-label"
              >Ingrediente extra</label
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
          <div class="mb-3">
            <label for="quantity" class="form-label">Cantidad</label>
            <input
              type="number"
              id="quantity"
              v-model="orderExtra.quantity"
              class="form-control"
              min="1"
              required
            />
          </div>
          <div class="d-flex justify-content-end">
            <button
              type="submit"
              class="btn btn-primary me-2"
              :disabled="loading"
            >
              <span
                v-if="loading"
                class="spinner-border spinner-border-sm me-1"
              ></span>
              Guardar
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

export default {
  name: "NewOrderExtra",
  data() {
    return {
      orderExtra: {
        order_id: "",
        extra_ingredient_id: "",
        quantity: 1,
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
        const res = await axios.get("/api/orders");
        this.orders = res.data;
      } catch {
        this.orders = [];
      }
    },
    async fetchExtras() {
      try {
        const res = await axios.get("/api/extra-ingredients");
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
        await axios.post("/api/order-extra-ingredients", this.orderExtra);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Ingrediente extra creado correctamente",
          showConfirmButton: false,
          timer: 2000,
        });
        this.$router.push({ name: "Order_extraView" }); // Ajusta el nombre según tu router
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
