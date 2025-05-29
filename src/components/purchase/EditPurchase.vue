<template>
  <div class="container text-start">
    <h1 class="text-danger fw-bold">{{ $t("purchase.editTitle") }}</h1>
    <div class="card">
      <div class="card-header fw-bold">{{ $t("purchase.editFormTitle") }}</div>
      <div class="card-body">
        <form @submit.prevent="updatePurchase">
          <!-- Proveedor -->
          <div class="mb-3">
            <label for="supplier" class="form-label">{{ $t("purchase.supplier") }}</label>
            <div class="input-group">
              <span class="input-group-text">
                <font-awesome-icon icon="truck" />
              </span>
              <select
                id="supplier"
                v-model="purchase.supplier_id"
                class="form-select"
                required
              >
                <option disabled value="">{{ $t("purchase.selectSupplier") }}</option>
                <option
                  v-for="supplier in suppliers"
                  :key="supplier.id"
                  :value="supplier.id"
                >
                  {{ supplier.name }}
                </option>
              </select>
            </div>
          </div>

          <!-- Materia Prima -->
          <div class="mb-3">
            <label for="raw_material" class="form-label">{{ $t("purchase.rawMaterial") }}</label>
            <div class="input-group">
              <span class="input-group-text">
                <font-awesome-icon icon="leaf" />
              </span>
              <select
                id="raw_material"
                v-model="purchase.raw_material_id"
                class="form-select"
                required
              >
                <option disabled value="">{{ $t("purchase.selectRawMaterial") }}</option>
                <option
                  v-for="material in rawMaterials"
                  :key="material.id"
                  :value="material.id"
                >
                  {{ material.name }}
                </option>
              </select>
            </div>
          </div>

          <!-- Cantidad -->
          <div class="mb-3">
            <label for="quantity" class="form-label">{{ $t("purchase.quantity") }}</label>
            <div class="input-group">
              <span class="input-group-text">
                <font-awesome-icon icon="sort-numeric-up" />
              </span>
              <input
                type="number"
                step="0.01"
                id="quantity"
                v-model.number="purchase.quantity"
                class="form-control"
                required
                min="0.01"
              />
            </div>
          </div>

          <!-- Precio de Compra -->
          <div class="mb-3">
            <label for="price" class="form-label">{{ $t("purchase.purchasePrice") }}</label>
            <div class="input-group">
              <span class="input-group-text">
                <font-awesome-icon icon="dollar-sign" />
              </span>
              <input
                type="number"
                step="0.01"
                id="price"
                v-model.number="purchase.purchase_price"
                class="form-control"
                required
                min="0"
              />
            </div>
          </div>

          <!-- Fecha de Compra -->
          <div class="mb-3">
            <label for="date" class="form-label">{{ $t("purchase.purchaseDate") }}</label>
            <div class="input-group">
              <span class="input-group-text">
                <font-awesome-icon icon="calendar-alt" />
              </span>
              <input
                type="date"
                id="date"
                v-model="purchase.purchase_date"
                class="form-control"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            class="btn text-white"
            style="background-color: #c1121f"
            :disabled="loading"
          >
            <span v-if="loading" class="spinner-border spinner-border-sm me-1"></span>
            {{ loading ? $t("purchase.saving") : $t("purchase.saveChanges") }}
          </button>
          <button type="button" class="btn btn-secondary ms-2" @click="cancel" :disabled="loading">
            {{ $t("purchase.cancel") }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "EditPurchase",
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      purchase: {
        supplier_id: "",
        raw_material_id: "",
        quantity: 0,
        purchase_price: 0,
        purchase_date: "",
      },
      suppliers: [],
      rawMaterials: [],
      loading: false,
    };
  },
  methods: {
    cancel() {
      this.$router.push({ name: "Purchases" });
    },
    async updatePurchase() {
      this.loading = true;
      try {
        await axios.put(
          `http://127.0.0.1:8000/api/purchases/${this.$route.params.id}`,
          this.purchase
        );
        Swal.fire(
          this.$t("purchase.updatedTitle"),
          this.$t("purchase.updatedText"),
          "success"
        );
        this.$router.push({ name: "Purchases" });
      } catch (error) {
        Swal.fire(
          this.$t("purchase.errorTitle"),
          this.$t("purchase.updateError"),
          "error"
        );
      } finally {
        this.loading = false;
      }
    },
    async fetchSuppliers() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/suppliers");
        this.suppliers = response.data;
      } catch (error) {
        console.error(this.$t("purchase.fetchErrorSuppliers"), error);
      }
    },
    async fetchRawMaterials() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/raw-materials"
        );
        this.rawMaterials = response.data;
      } catch (error) {
        console.error(this.$t("purchase.fetchErrorMaterials"), error);
      }
    },
    async fetchPurchase() {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/purchases/${this.$route.params.id}`
        );
        this.purchase = response.data;
        // Format date to yyyy-mm-dd if needed
        if (this.purchase.purchase_date) {
          this.purchase.purchase_date = this.purchase.purchase_date.substr(0, 10);
        }
      } catch (error) {
        Swal.fire(
          this.$t("purchase.errorTitle"),
          this.$t("purchase.fetchErrorPurchase"),
          "error"
        );
        this.$router.push({ name: "Purchases" });
      }
    },
  },
  mounted() {
    this.fetchSuppliers();
    this.fetchRawMaterials();
    this.fetchPurchase();
  },
};
</script>

<style scoped>
.card {
  max-width: 600px;
  margin: 2rem auto;
}
</style>
