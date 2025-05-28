<template>
  <div class="container text-start">
    <h1 class="text-danger fw-bold">{{ $t("orders.newOrderTitle") }}</h1>
    <div class="card">
      <div class="card-header fw-bold">{{ $t("orders.orderForm") }}</div>
      <div class="card-body">
        <form @submit.prevent="createOrder">
          <!-- Cliente -->
          <div class="mb-3" v-if="clients.length">
            <label for="client_id" class="form-label">{{ $t("orders.client") }}</label>
            <select
              id="client_id"
              v-model="order.client_id"
              class="form-select"
              required
            >
              <option disabled value="">{{ $t("orders.selectClient") }}</option>
              <option
                v-for="client in clients"
                :key="client.id"
                :value="client.id"
              >
                {{ client.user_name }}
              </option>
            </select>
          </div>

          <!-- Sucursal -->
          <div class="mb-3" v-if="branches.length">
            <label for="branch_id" class="form-label">{{ $t("orders.branch") }}</label>
            <select
              id="branch_id"
              v-model="order.branch_id"
              class="form-select"
              required
            >
              <option disabled value="">{{ $t("orders.selectBranch") }}</option>
              <option
                v-for="branch in branches"
                :key="branch.id"
                :value="branch.id"
              >
                {{ branch.name }}
              </option>
            </select>
          </div>

          <!-- Repartidor -->
          <div class="mb-3" v-if="deliveryPersons.length">
            <label for="delivery_person_id" class="form-label">
              {{ $t("orders.deliveryPerson") }}
            </label>
            <select
              id="delivery_person_id"
              v-model="order.delivery_person_id"
              class="form-select"
            >
              <option value="">{{ $t("orders.noDeliveryPerson") }}</option>
              <option
                v-for="employee in deliveryPersons"
                :key="employee.id"
                :value="employee.id"
              >
                {{ employee.user_name }}
              </option>
            </select>
          </div>

          <!-- Total -->
          <div class="mb-3">
            <label for="total_price" class="form-label">{{ $t("orders.totalLabel") }} (COP)</label>
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
            <select
              id="status"
              v-model="order.status"
              class="form-select"
              required
            >
              <option value="pendiente">{{ $t("orders.statusPending") }}</option>
              <option value="en_preparacion">{{ $t("orders.statusPreparing") }}</option>
              <option value="listo">{{ $t("orders.statusReady") }}</option>
              <option value="entregado">{{ $t("orders.statusDelivered") }}</option>
            </select>
          </div>

          <!-- Tipo de entrega -->
          <div class="mb-3">
            <label for="delivery_type" class="form-label">{{ $t("orders.deliveryType") }}</label>
            <select
              id="delivery_type"
              v-model="order.delivery_type"
              class="form-select"
              required
            >
              <option value="en_local">{{ $t("orders.deliveryLocal") }}</option>
              <option value="a_domicilio">{{ $t("orders.deliveryHome") }}</option>
            </select>
          </div>

          <!-- Botones -->
          <button
            type="submit"
            class="btn text-white"
            style="background-color: #c1121f"
            :disabled="loading"
          >
            <span
              v-if="loading"
              class="spinner-border spinner-border-sm me-1"
            ></span>
            {{ loading ? $t("orders.saving") : $t("orders.save") }}
          </button>
          <button type="button" class="btn btn-secondary ms-2" @click="cancel">
            {{ $t("orders.cancel") }}
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
        delivery_person_id: "",
      },
      loading: false,
      clients: [],
      branches: [],
      deliveryPersons: [],
    };
  },
  methods: {
    cancel() {
      this.$router.push({ name: "Orders" });
    },
    async createOrder() {
      this.loading = true;
      try {
        await axios.post("http://127.0.0.1:8000/api/orders", this.order);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Pedido creado correctamente.",
          showConfirmButton: false,
          timer: 2000,
        });
        this.$router.push({ name: "Orders" });
      } catch (error) {
        let errorMsg = "Error al crear el pedido.";
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
    async fetchClients() {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/clients");
        this.clients = res.data;
      } catch (error) {
        console.error("Error al obtener clientes:", error);
      }
    },
    async fetchBranches() {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/branchs");
        this.branches = res.data;
      } catch (error) {
        console.error("Error al obtener sucursales:", error);
      }
    },
    async fetchEmployees() {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/employees");
        this.deliveryPersons = res.data.map((e) => ({
          id: e.id,
          user_name: e.user_name,
        }));
      } catch (error) {
        console.error("Error al obtener empleados:", error);
      }
    },
  },
  mounted() {
    this.fetchClients();
    this.fetchBranches();
    this.fetchEmployees();
  },
};
</script>
