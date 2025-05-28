<template>
  <div class="container py-4">
    <h1 class="h3 text-warning mb-4">
      <font-awesome-icon icon="edit" class="me-2" /> Editar Orden
    </h1>
    <form @submit.prevent="updateOrder">
      <!-- Campos del formulario -->
      <div class="mb-3">
        <label for="client_id" class="form-label">Cliente</label>
        <input type="number" v-model="order.client_id" class="form-control" id="client_id" required />
      </div>
      <div class="mb-3">
        <label for="branch_id" class="form-label">Sucursal</label>
        <input type="number" v-model="order.branch_id" class="form-control" id="branch_id" required />
      </div>
      <div class="mb-3">
        <label for="delivery_person_id" class="form-label">Repartidor</label>
        <input type="number" v-model="order.delivery_person_id" class="form-control" id="delivery_person_id" />
      </div>
      <div class="mb-3">
        <label for="total_price" class="form-label">Precio Total</label>
        <input type="number" v-model="order.total_price" class="form-control" id="total_price" required />
      </div>
      <div class="mb-3">
        <label for="status" class="form-label">Estado</label>
        <select v-model="order.status" class="form-select" id="status" required>
          <option value="pendiente">Pendiente</option>
          <option value="en_preparacion">En Preparación</option>
          <option value="listo">Listo</option>
          <option value="entregado">Entregado</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="delivery_type" class="form-label">Tipo de Entrega</label>
        <select v-model="order.delivery_type" class="form-select" id="delivery_type" required>
          <option value="en_local">En Local</option>
          <option value="a_domicilio">A Domicilio</option>
        </select>
      </div>
      <button type="submit" class="btn btn-warning">Actualizar Orden</button>
    </form>
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
        delivery_person_id: null,
        total_price: "",
        status: "pendiente",
        delivery_type: "en_local",
      },
    };
  },
  methods: {
    fetchOrder() {
      const id = this.$route.params.id;
      axios
        .get(`http://127.0.0.1:8000/api/orders/${id}`)
        .then((response) => {
          this.order = response.data;
        })
        .catch((error) => {
          console.error("Error fetching order:", error);
        });
    },
    updateOrder() {
      const id = this.$route.params.id;
      axios
        .put(`http://127.0.0.1:8000/api/orders/${id}`, this.order)
        .then(() => {
          Swal.fire("¡Actualizado!", "La orden ha sido actualizada.", "success");
          this.$router.push({ name: "ListadoOrdenes" });
        })
        .catch((error) => {
          console.error("Error updating order:", error);
          Swal.fire("Error", "No se pudo actualizar la orden.", "error");
        });
    },
  },
  mounted() {
    this.fetchOrder();
  },
};
</script>
