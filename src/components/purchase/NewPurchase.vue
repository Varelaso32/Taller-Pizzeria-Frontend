<template>
  <div class="container text-start">
    <h1 class="text-danger fw-bold">Nueva Compra</h1>
    <div class="card">
      <div class="card-header fw-bold">Formulario de Registro</div>
      <div class="card-body">
        <form @submit.prevent="savePurchase">
          <!-- Proveedor -->
          <div class="mb-3">
            <label for="supplier_id" class="form-label">Proveedor</label>
            <div class="input-group">
              <span class="input-group-text">
                <font-awesome-icon icon="truck" />
              </span>
              <select
                id="supplier_id"
                v-model="purchase.supplier_id"
                class="form-select"
                required
              >
                <option value="" disabled>Seleccione un proveedor</option>
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
            <label for="raw_material_id" class="form-label"
              >Materia Prima</label
            >
            <div class="input-group">
              <span class="input-group-text">
                <font-awesome-icon icon="leaf" />
              </span>
              <select
                id="raw_material_id"
                v-model="purchase.raw_material_id"
                class="form-select"
                required
              >
                <option value="" disabled>Seleccione materia prima</option>
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
            <label for="quantity" class="form-label">Cantidad</label>
            <input
              type="number"
              id="quantity"
              v-model.number="purchase.quantity"
              class="form-control"
              required
              min="1"
            />
          </div>

          <!-- Precio Total -->
          <div class="mb-3">
            <label for="total_price" class="form-label">Precio Total</label>
            <input
              type="number"
              id="purchase_price"
              v-model.number="purchase.purchase_price"
              class="form-control"
              required
              step="0.01"
              min="0"
            />
          </div>

          <!-- Fecha -->
          <div class="mb-3">
            <label for="purchase_date" class="form-label"
              >Fecha de Compra</label
            >
            <input
              type="date"
              id="purchase_date"
              v-model="purchase.purchase_date"
              class="form-control"
              required
            />
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
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "NewPurchase",
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
    };
  },
  methods: {
    cancel() {
      this.$router.push({ name: "Purchases" });
    },
    async savePurchase() {
      try {
          console.log("Datos enviados:", this.purchase);
        await axios.post("http://127.0.0.1:8000/api/purchases", this.purchase);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Compra registrada correctamente",
          showConfirmButton: false,
          timer: 2000,
        });
        this.$router.push({ name: "Purchases" });
      } catch (error) {
        console.error("Error al guardar compra:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response?.data?.msg || "No se pudo guardar la compra.",
        });
      }
    },
    async fetchSuppliers() {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/suppliers");
        this.suppliers = res.data;
      } catch (error) {
        console.error("Error al cargar proveedores:", error);
      }
    },
    async fetchRawMaterials() {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/raw-materials");
        this.rawMaterials = res.data;
      } catch (error) {
        console.error("Error al cargar materias primas:", error);
      }
    },
  },
  mounted() {
    this.fetchSuppliers();
    this.fetchRawMaterials();
  },
};
</script>
