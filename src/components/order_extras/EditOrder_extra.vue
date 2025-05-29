<template>
  <div class="container text-start py-4">
    <h1 class="h3 text-danger fw-bold mb-4">
      {{ $t("orderExtra.editTitle") }}
    </h1>
    <div class="card shadow rounded">
      <div class="card-header fw-bold">{{ $t("orderExtra.editFormTitle") }}</div>
      <div class="card-body">
        <form @submit.prevent="updateOrderExtra">
          <div class="mb-3">
            <label for="order_id" class="form-label">{{ $t("orderExtra.orderLabel") }}</label>
            <select
              id="order_id"
              v-model="orderExtra.order_id"
              class="form-select"
              required
            >
              <option v-for="order in orders" :key="order.id" :value="order.id">
                {{ order.id }} - Cliente: {{ order.client_name || order.id }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label for="extra_ingredient_id" class="form-label">{{ $t("orderExtra.extraIngredientLabel") }}</label>
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

          <div class="mb-3">
            <label for="quantity" class="form-label">{{ $t("orderExtra.quantityLabel") }}</label>
            <input
              type="number"
              id="quantity"
              v-model.number="orderExtra.quantity"
              class="form-control"
              min="1"
              required
            />
          </div>

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
              {{ loading ? $t("orderExtra.saving") : $t("orderExtra.saveChanges") }}
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              @click="cancel"
              :disabled="loading"
            >
              {{ $t("orderExtra.cancel") }}
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
  name: "EditOrderExtra",
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
  methods: {
    cancel() {
      this.$router.push({ name: "Order_extra" });
    },
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
        const res = await axios.get("http://127.0.0.1:8000/api/extra_ingredients");
        this.extras = res.data;
      } catch {
        this.extras = [];
      }
    },
    async fetchOrderExtra() {
      const id = this.$route.params.id;
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/order_extra_ingredients/${id}`);
        this.orderExtra = res.data;
      } catch {
        Swal.fire({
          icon: "error",
          title: this.$t("orderExtra.editTitle"),
          text: this.$t("orderExtra.updateError"),
        });
        this.$router.push({ name: "Order_extra" });
      }
    },
    async updateOrderExtra() {
      this.loading = true;
      const id = this.$route.params.id;
      try {
        await axios.put(`http://127.0.0.1:8000/api/order_extra_ingredients/${id}`, this.orderExtra);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: this.$t("orderExtra.updateSuccess"),
          showConfirmButton: false,
          timer: 2000,
        });
        this.$router.push({ name: "Order_extra" });
      } catch (error) {
        let errorMsg = this.$t("orderExtra.updateError");
        if (error.response?.data?.msg) {
          errorMsg = error.response.data.msg;
        }
        Swal.fire({
          icon: "error",
          title: this.$t("orderExtra.editTitle"),
          text: errorMsg,
        });
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.fetchOrders();
    this.fetchExtras();
    this.fetchOrderExtra();
  },
};
</script>
