<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="h3 text-danger">
        <font-awesome-icon icon="truck" class="me-2" />
        {{ $t("suppliers.title") }}
      </h1>
      <button @click="newSupplier" class="btn btn-danger d-flex align-items-center">
        <font-awesome-icon icon="plus" class="me-2" />
        {{ $t("suppliers.new") }}
      </button>
    </div>

    <div class="table-responsive shadow-sm rounded bg-white">
      <table class="table table-striped align-middle mb-0">
        <thead class="table-dark text-white">
          <tr>
            <th>#</th>
            <th>{{ $t("suppliers.name") }}</th>
            <th>{{ $t("suppliers.contact") }}</th>
            <th>{{ $t("suppliers.created") }}</th>
            <th>{{ $t("suppliers.updated") }}</th>
            <th class="text-center">{{ $t("suppliers.actions") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(supplier, index) in suppliers" :key="supplier.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ supplier.name }}</td>
            <td>{{ supplier.contact_info }}</td>
            <td>{{ formatDate(supplier.created_at) }}</td>
            <td>{{ formatDate(supplier.updated_at) }}</td>
            <td class="text-center">
              <button @click="editSupplier(supplier.id)" class="btn btn-sm btn-warning me-2">
                <font-awesome-icon icon="pencil" />
              </button>
              <button @click="deleteSupplier(supplier.id)" class="btn btn-sm btn-danger">
                <font-awesome-icon icon="trash" />
              </button>
            </td>
          </tr>
          <tr v-if="suppliers.length === 0">
            <td colspan="6" class="text-center py-4 text-muted">
              {{ $t("suppliers.noSuppliers") }}
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
  name: "SuppliersList",
  data() {
    return {
      suppliers: [],
    };
  },
  methods: {
    fetchSuppliers() {
      axios
        .get("http://127.0.0.1:8000/api/suppliers")
        .then((response) => {
          this.suppliers = response.data;
        })
        .catch((error) => {
          console.error("Error fetching suppliers:", error);
        });
    },
    deleteSupplier(id) {
      Swal.fire({
        title: `¿Deseas eliminar el proveedor con ID ${id}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#c1121f",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`http://127.0.0.1:8000/api/suppliers/${id}`)
            .then((response) => {
              Swal.fire("¡Eliminado!", "El proveedor ha sido eliminado.", "success");
              this.suppliers = response.data;
            })
            .catch((error) => {
              console.error("Error deleting supplier:", error);
              Swal.fire("Error", "No se pudo eliminar el proveedor.", "error");
            });
        }
      });
    },
    editSupplier(id) {
      this.$router.push({ name: "EditSuppliers", params: { id: `${id}` } });
    },
    newSupplier() {
      this.$router.push({ name: "NewSuppliers" });
    },
    formatDate(date) {
      if (!date) return "";
      return new Date(date).toLocaleString();
    },
  },
  mounted() {
    this.fetchSuppliers();
  },
};
</script>
