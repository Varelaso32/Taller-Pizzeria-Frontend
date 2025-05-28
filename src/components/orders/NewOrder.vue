<template>
  <div class="container text-start">
    <h1 class="text-danger fw-bold">{{ $t("listado orders") }}</h1>
    <div class="card">
      <div class="card-header fw-bold">{{ $t("orders.header") }}</div>
      <div class="card-body">
        <form @submit.prevent="createOrder">
          <!-- Cliente -->
          <div class="mb-3">
            <label for="client_id" class="form-label">{{ $t("orders.client") }}</label>
            <input
              type="number"
              id="client_id"
              v-model="order.client_id"
              class="form-control"
              required
            />
          </div>
          <!-- Sucursal -->
          <div class="mb-3">
            <label for="branch_id" class="form-label">{{ $t("orders.branch") }}</label>
            <input
              type="number"
              id="branch_id"
              v-model="order.branch_id"
              class="form-control"
              required
            />
          </div>
          <!-- Total -->
          <div class="mb-3">
            <label for="total_price" class="form-label">{{ $t("orders.total") }}</label>
            <input
              type="number"
              id="total_price"
              v-model="order.total_price"
              class="form-control"
              min="0"
              required
            />
          </div>
          <!-- Estado -->
          <div class="mb-3">
            <label for="status" class="form-label">{{ $t("orders.status") }}</label>
            <select id="status" v-model="order.status" class="form-select" required>
              <option value="pendiente">{{ $t("orders.status_pending") }}</option>
              <option value="en_preparacion">{{ $t("orders.status_preparing") }}</option>
              <option value="listo">{{ $t("orders.status_ready") }}</option>
              <option value="entregado">{{ $t("orders.status_delivered") }}</option>
            </select>
          </div>
          <!-- Tipo de entrega -->
          <div class="mb-3">
            <label for="delivery_type" class="form-label">{{ $t("orders.delivery_type") }}</label>
            <select id="delivery_type" v-model="order.delivery_type" class="form-select" required>
              <option value="en_local">{{ $t("orders.delivery_local") }}</option>
              <option value="a_domicilio">{{ $t("orders.delivery_home") }}</option>
            </select>
          </div>
          <!-- Repartidor -->
          <div class="mb-3">
            <label for="delivery_person_id" class="form-label">{{ $t("orders.delivery_person") }}</label>
            <input
              type="number"
              id="delivery_person_id"
              v-model="order.delivery_person_id"
              class="form-control"
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
  name: "NewOrder",
  data() {
    return {
      order: {
        client_id: "",
        branch_id: "",
        total_price: "",
        status: "pendiente",
        delivery_type: "en_local",
        delivery_person_id: ""
      },
      loading: false
    };
  },
  methods: {
    cancel() {
      this.$router.push({ name: "Orders" });
    },
    async createOrder() {
      this.loading = true;
      try {
        await axios.post("/api/orders", this.order);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: this.$t("orders.createdSuccess"),
          showConfirmButton: false,
          timer: 2000,
        });
        this.$router.push({ name: "Orders" });
      } catch (error) {
        let errorMsg = this.$t("orders.createError");
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