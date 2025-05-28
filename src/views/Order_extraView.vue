<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="h3 text-primary">
        <font-awesome-icon icon="utensils" class="me-2" />
        Ingredientes Extra por Orden
      </h1>
      <button
        @click="newOrderExtra"
        class="btn btn-primary d-flex align-items-center"
      >
        <font-awesome-icon icon="plus" class="me-2" />
        Nuevo Ingrediente Extra
      </button>
    </div>

    <div class="table-responsive shadow-sm rounded bg-white">
      <table class="table table-striped align-middle mb-0">
        <thead class="table-dark text-white">
          <tr>
            <th>#</th>
            <th>Cliente</th>
            <th>Ingrediente Extra</th>
            <th>Cantidad</th>
            <th>ID Orden</th>
            <th class="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in orderExtras" :key="item.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ item.client_name }}</td>
            <td>{{ item.extra_ingredient_name }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.order_id }}</td>
            <td class="text-center">
              <button
                @click="editOrderExtra(item.id)"
                class="btn btn-sm btn-warning me-2"
              >
                <font-awesome-icon icon="pencil" />
              </button>
              <button
                @click="deleteOrderExtra(item.id)"
                class="btn btn-sm btn-danger"
              >
                <font-awesome-icon icon="trash" />
              </button>
            </td>
          </tr>
          <tr v-if="orderExtras.length === 0">
            <td colspan="6" class="text-center py-4 text-muted">
              No hay ingredientes extra registrados.
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

export default {
  name: "OrderExtraView",
  data() {
    return {
      orderExtras: [],
    };
  },
  methods: {
    fetchOrderExtras() {
      axios
        .get("http://127.0.0.1:8000/api/order-extra-ingredients")
        .then((response) => {
          this.orderExtras = response.data;
        })
        .catch((error) => {
          console.error("Error al cargar los datos:", error);
        });
    },
    deleteOrderExtra(id) {
      Swal.fire({
        title: `¿Deseas eliminar el ingrediente extra con ID ${id}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#dc3545",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`http://127.0.0.1:8000/api/order-extra-ingredients/${id}`)
            .then((response) => {
              Swal.fire(
                "¡Eliminado!",
                "El ingrediente extra fue eliminado.",
                "success"
              );
              this.orderExtras = response.data;
            })
            .catch((error) => {
              console.error("Error al eliminar:", error);
              Swal.fire("Error", "No se pudo eliminar el registro.", "error");
            });
        }
      });
    },
    editOrderExtra(id) {
      this.$router.push({ name: "EditarOrderExtra", params: { id: `${id}` } });
    },
    newOrderExtra() {
      this.$router.push({ name: "Order_extraNew" });
    },
  },
  mounted() {
    this.fetchOrderExtras();
  },
};
</script>
