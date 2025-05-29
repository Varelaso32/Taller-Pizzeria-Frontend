<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="h3 text-danger">
        <font-awesome-icon icon="cart-plus" class="me-2" />
        {{ $t("purchase.title") }}
      </h1>
      <button @click="newPurchase" class="btn btn-danger d-flex align-items-center">
        <font-awesome-icon icon="plus" class="me-2" />
        {{ $t("purchase.newButton") }}
      </button>
    </div>

    <div class="table-responsive shadow-sm rounded bg-white">
      <table class="table table-striped align-middle mb-0">
        <thead class="table-dark text-white">
          <tr>
            <th>{{ $t("purchase.id") }}</th>
            <th>{{ $t("purchase.supplier") }}</th>
            <th>{{ $t("purchase.rawMaterial") }}</th>
            <th>{{ $t("purchase.quantity") }}</th>
            <th>{{ $t("purchase.purchasePrice") }}</th>
            <th>{{ $t("purchase.purchaseDate") }}</th>
            <th>{{ $t("purchase.createdAt") }}</th>
            <th>{{ $t("purchase.updatedAt") }}</th>
            <th class="text-center">{{ $t("purchase.actions") }}</th>
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
              <button @click="editPurchase(purchase.id)" class="btn btn-sm btn-warning me-2" :title="$t('purchase.edit')">
                <font-awesome-icon icon="pencil" />
              </button>
              <button @click="deletePurchase(purchase.id)" class="btn btn-sm btn-danger" :title="$t('purchase.delete')">
                <font-awesome-icon icon="trash" />
              </button>
            </td>
          </tr>
          <tr v-if="purchases.length === 0">
            <td colspan="9" class="text-center py-4 text-muted">
              {{ $t("purchase.noRecords") }}
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
          console.error(this.$t("purchase.fetchError"), error);
        });
    },
    deletePurchase(id) {
      Swal.fire({
        title: this.$t("purchase.confirmDelete", { id }),
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: this.$t("purchase.delete"),
        cancelButtonText: this.$t("purchase.cancel"),
        confirmButtonColor: "#c1121f",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`http://127.0.0.1:8000/api/purchases/${id}`)
            .then((response) => {
              this.purchases = response.data;
              Swal.fire(
                this.$t("purchase.deletedTitle"),
                this.$t("purchase.deletedText"),
                "success"
              );
            })
            .catch(() => {
              Swal.fire(this.$t("purchase.errorTitle"), this.$t("purchase.deleteError"), "error");
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
      return new Date(date).toLocaleString(this.$i18n.locale === "es" ? "es-CO" : "en-US", {
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
