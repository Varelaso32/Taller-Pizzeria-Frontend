<template>
  <div class="container text-start">
    <h1 class="text-danger fw-bold">{{ $t("order_extras.newTitle") }}</h1>
    <div class="card">
      <div class="card-header fw-bold">{{ $t("order_extras.header") }}</div>
      <div class="card-body">
        <form @submit.prevent="createOrderExtra">
          <!-- Orden -->
          <div class="mb-3">
            <label for="order_id" class="form-label">{{ $t("order_extras.order") }}</label>
            <select
              id="order_id"
              v-model="orderExtra.order_id"
              class="form-select"
              required
            >
              <option v-for="order in orders" :key="order.id" :value="order.id">
                {{ order.id }}
              </option>
            </select>
          </div>
          <!-- Extra -->
          <div class="mb-3">
            <label for="extra_ingredient_id" class="form-label">{{ $t("order_extras.extra") }}</label>
            <select
              id="extra_ingredient_id"
              v-model="orderExtra.extra_ingredient_id"
              class="form-select"
              required
            >
              <option v-for="extra in extras" :key="extra.id" :value="extra.id">
                {{ extra.name }}
              </option>
            </select>
          </div>
          <!-- Cantidad -->
          <div class="mb-3">
            <label for="quantity" class="form-label">{{ $t("order_extras.quantity") }}</label>
            <input
              type="number"
              id="quantity"
              v-model="orderExtra.quantity"
              class="form-control"
              min="1"
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
  name: "NewOrderExtra",
  data() {
    return {
      orderExtra: {
        order_id: "",
        extra_ingredient_id: "",
        quantity: 1
      },
      orders: [],
      extras: [],
      loading: false
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
      this.$router.push({ name: "OrderExtras" });
    },
    async createOrderExtra() {
      this.loading = true;
      try {
        await axios.post("/api/order-extra-ingredients", this.orderExtra);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: this.$t("order_extras.createdSuccess"),
          showConfirmButton: false,
          timer: 2000,
        });
        this.$router.push({ name: "OrderExtras" });
      } catch (error) {
        let errorMsg = this.$t("order_extras.createError");
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