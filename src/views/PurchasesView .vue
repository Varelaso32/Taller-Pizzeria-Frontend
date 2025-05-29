<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="h3 text-danger">
        <font-awesome-icon icon="cart-plus" class="me-2" />
        Compras de Materia Prima
      </h1>
      <button
        @click="newPurchase"
        class="btn btn-danger d-flex align-items-center"
      >
        <font-awesome-icon icon="plus" class="me-2" />
        Nueva Compra
      </button>
    </div>

    <div class="table-responsive shadow-sm rounded bg-white">
      <table class="table table-striped align-middle mb-0">
        <thead class="table-dark text-white">
          <tr>
            <th>ID</th>
            <th>Proveedor</th>
            <th>Materia Prima</th>
            <th>Cantidad</th>
            <th>Precio de Compra</th>
            <th>Fecha de Compra</th>
            <th>Creado</th>
            <th>Actualizado</th>
            <th class="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="purchase in purchases" :key="purchase.id">
            <td>{{ purchase.id }}</td>
            <td>{{ purchase.supplier_name }}</td>
            <td>{{ purchase.raw_material_name }}</td>
            <td>{{ purchase.quantity }}</td>
            <td>${{ Number(purchase.purchase_price).toFixed(2) }}</td>
            <td>{{ formatDate(purchase.purchase_date) }}</td>
            <td>{{ formatDate(purchase.created_at) }}</td>
            <td>{{ formatDate(purchase.updated_at) }}</td>
            <td class="text-center">
              <button
                @click="editPurchase(purchase.id)"
                class="btn btn-sm btn-warning me-2"
              >
                <font-awesome-icon icon="pencil" />
              </button>
              <button
                @click="deletePurchase(purchase.id)"
                class="btn btn-sm btn-danger"
              >
                <font-awesome-icon icon="trash" />
              </button>
            </td>
          </tr>
          <tr v-if="purchases.length === 0">
            <td colspan="9" class="text-center py-4 text-muted">
              No hay compras registradas.
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
  name: "PurchasesView",
  data() {
    return {
      purchases: [],
    };
  },
  methods: {
    fetchPurchases() {
      axios
        .get("http://127.0.0.1:8000/api/purchases")
        .then((response) => {
          this.purchases = response.data;
        })
        .catch((error) => {
          console.error("Error al cargar las compras:", error);
        });
    },
    deletePurchase(id) {
      Swal.fire({
        title: `¿Eliminar la compra con ID ${id}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#c1121f",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`http://127.0.0.1:8000/api/purchases/${id}`)
            .then((response) => {
              this.purchases = response.data;
              Swal.fire(
                "¡Eliminado!",
                "La compra ha sido eliminada.",
                "success"
              );
            })
            .catch(() => {
              Swal.fire("Error", "No se pudo eliminar la compra.", "error");
            });
        }
      });
    },
    editPurchase(id) {
      this.$router.push({ name: "EditPurchase", params: { id } });
    },
    newPurchase() {
      this.$router.push({ name: "NewPurchase" });
    },
    formatDate(date) {
      return new Date(date).toLocaleString("es-CO", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
  mounted() {
    this.fetchPurchases();
  },
};
</script>

<style scoped>
.table th,
.table td {
  vertical-align: middle;
}
</style>