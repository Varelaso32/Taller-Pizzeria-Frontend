<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="h3 text-danger">
        <font-awesome-icon icon="clipboard-list" class="me-2" /> Listado de
        Órdenes
      </h1>
      <button
        @click="newOrder"
        class="btn btn-danger d-flex align-items-center"
      >
        <font-awesome-icon icon="plus" class="me-2" />
        Nueva Orden
      </button>
    </div>

    <div class="table-responsive shadow-sm rounded bg-white">
      <table class="table table-striped align-middle mb-0">
        <thead class="table-dark text-white">
          <tr>
            <th>#</th>
            <th>Cliente</th>
            <th>Sucursal</th>
            <th>Repartidor</th>
            <th>Total</th>
            <th>Estado</th>
            <th>Tipo de Entrega</th>
            <th class="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, index) in orders" :key="order.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ order.client_name }}</td>
            <td>{{ order.branch_name }}</td>
            <td>{{ order.employee_name || "N/A" }}</td>
            <td>${{ Number(order.total_price).toFixed(2) }}</td>
            <td>{{ order.status }}</td>
            <td>{{ order.delivery_type }}</td>
            <td class="text-center">
              <button
                @click="editOrder(order.id)"
                class="btn btn-sm btn-warning me-2"
              >
                <font-awesome-icon icon="pencil" />
              </button>
              <button
                @click="deleteOrder(order.id)"
                class="btn btn-sm btn-danger"
              >
                <font-awesome-icon icon="trash" />
              </button>
            </td>
          </tr>
          <tr v-if="orders.length === 0">
            <td colspan="8" class="text-center py-4 text-muted">
              No hay órdenes registradas.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faClipboardList,
  faPencil,
  faTrash,
  faPlus,
  faArrowLeft,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";

library.add(faClipboardList, faPencil, faTrash, faPlus, faArrowLeft, faEdit);

export default {
  name: "OrderView",
  data() {
    return {
      orders: [],
    };
  },
  methods: {
    fetchOrders() {
      axios
        .get("http://127.0.0.1:8000/api/orders")
        .then((response) => {
          this.orders = response.data;
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
        });
    },
    deleteOrder(id) {
      Swal.fire({
        title: `¿Deseas eliminar la orden con ID ${id}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#c1121f",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`http://127.0.0.1:8000/api/orders/${id}`)
            .then((response) => {
              Swal.fire(
                "¡Eliminado!",
                "La orden ha sido eliminada.",
                "success"
              );
              this.orders = response.data;
            })
            .catch((error) => {
              console.error("Error deleting order:", error);
              Swal.fire("Error", "No se pudo eliminar la orden.", "error");
            });
        }
      });
    },
    editOrder(id) {
      this.$router.push({ name: "EditOrder", params: { id: `${id}` } });
    },
    newOrder() {
      this.$router.push({ name: "NewOrder" });
    },
  },
  mounted() {
    this.fetchOrders();
  },
};
</script>
