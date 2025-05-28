<template>
  <div class="container text-start">
    <h1 class="text-danger fw-bold">Editar Pedido</h1>
    <div class="card">
      <div class="card-header fw-bold">Formulario de Pedido</div>
      <div class="card-body">
        <form @submit.prevent="updateOrder">
          <!-- Cliente -->
          <div class="mb-3" v-if="clients.length">
            <label for="client_id" class="form-label">Cliente</label>
            <select
              id="client_id"
              v-model="order.client_id"
              class="form-select"
              required
            >
              <option disabled value="">Seleccione un cliente</option>
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
            <label for="branch_id" class="form-label">Sucursal</label>
            <select
              id="branch_id"
              v-model="order.branch_id"
              class="form-select"
              required
            >
              <option disabled value="">Seleccione una sucursal</option>
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
            <label for="delivery_person_id" class="form-label"
              >Repartidor</label
            >
            <select
              id="delivery_person_id"
              v-model="order.delivery_person_id"
              class="form-select"
            >
              <option value="">Sin repartidor</option>
              <option
                v-for="employee in deliveryPersons"
                :key="employee.id"
                :value="employee.id"
              >
                {{ employee.user_name }}
              </option>
            </select>
          </div>

          <!-- Precio Total -->
          <div class="mb-3">
            <label for="total_price" class="form-label"
              >Precio Total (COP)</label
            >
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

          <!-- Tipo de Entrega -->
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
      clients: [],
      branches: [],
      deliveryPersons: [],
    };
  },
  methods: {
    cancel() {
      this.$router.push({ name: "Orders" });
    },
    async fetchOrder() {
      const id = this.$route.params.id;
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/orders/${id}`
        );
        this.order = response.data;
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo cargar la orden.",
        });
      }
    },
    async updateOrder() {
      const id = this.$route.params.id;
      try {
        await axios.put(`http://127.0.0.1:8000/api/orders/${id}`, this.order);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Orden actualizada correctamente",
          showConfirmButton: false,
          timer: 2000,
        });
        this.$router.push({ name: "Orders" });
      } catch (error) {
        console.error("Error al actualizar orden:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo actualizar la orden.",
        });
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
    this.fetchOrder();
    this.fetchClients();
    this.fetchBranches();
    this.fetchEmployees();
  },
};
</script>
