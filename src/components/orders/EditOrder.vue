<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="h3 text-danger fw-bold">
        <font-awesome-icon icon="edit" class="me-2" />
        Editar Orden
      </h1>
      <button class="btn btn-secondary" @click="cancel" :disabled="loading">
        <font-awesome-icon icon="arrow-left" class="me-2" />
        Volver
      </button>
    </div>
    <div class="card shadow-sm rounded">
      <div class="card-header fw-bold">Datos de la Orden</div>
      <div class="card-body">
        <form @submit.prevent="updateOrder">
          <!-- Cliente -->
          <div class="mb-3">
            <label for="client_id" class="form-label">Cliente</label>
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
            <label for="branch_id" class="form-label">Sucursal</label>
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
            <label for="total_price" class="form-label">Total</label>
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
            <label for="status" class="form-label">Estado</label>
            <select
              id="status"
              v-model="order.status"
              class="form-select"
              required
            >
              <option value="pendiente">Pendiente</option>
              <option value="en_preparacion">En preparación</option>
              <option value="listo">Listo</option>
              <option value="entregado">Entregado</option>
            </select>
          </div>
          <!-- Tipo de entrega -->
          <div class="mb-3">
            <label for="delivery_type" class="form-label"
              >Tipo de Entrega</label
            >
            <select
              id="delivery_type"
              v-model="order.delivery_type"
              class="form-select"
              required
            >
              <option value="en_local">En local</option>
              <option value="a_domicilio">A domicilio</option>
            </select>
          </div>
          <!-- Repartidor -->
          <div class="mb-3">
            <label for="delivery_person_id" class="form-label"
              >Repartidor</label
            >
            <input
              type="number"
              id="delivery_person_id"
              v-model="order.delivery_person_id"
              class="form-control"
            />
          </div>
          <!-- Botones -->
          <div class="d-flex justify-content-end">
            <button
              type="submit"
              class="btn btn-danger me-2 text-white"
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
  name: "EditOrder",
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
    };
  },
  created() {
    this.fetchOrder();
  },
  methods: {
    async fetchOrder() {
      const id = this.$route.params.id;
      try {
        const response = await axios.get(`/api/orders/${id}`);
        this.order = response.data;
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo cargar la orden.",
        });
        this.$router.push({ name: "Orders" });
      }
    },
    cancel() {
      this.$router.push({ name: "Orders" });
    },
    async updateOrder() {
      this.loading = true;
      const id = this.$route.params.id;
      try {
        await axios.put(`/api/orders/${id}`, this.order);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Orden actualizada correctamente",
          showConfirmButton: false,
          timer: 2000,
        });
        this.$router.push({ name: "Orders" });
      } catch (error) {
        let errorMsg = "No se pudo actualizar la orden.";
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
