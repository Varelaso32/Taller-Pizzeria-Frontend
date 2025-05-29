<template>
  <div class="container text-start">
    <h1 class="text-danger fw-bold">Editar Compra</h1>
    <div class="card">
      <div class="card-header fw-bold">Formulario de Edición</div>
      <div class="card-body">
        <form @submit.prevent="updatePurchase">
          <!-- Proveedor -->
          <div class="mb-3">
            <label for="supplier" class="form-label">Proveedor</label>
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
                <option disabled value="">Seleccione un proveedor</option>
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
            <label for="raw_material" class="form-label">Materia Prima</label>
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
                <option disabled value="">Seleccione materia prima</option>
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
            <div class="input-group">
              <span class="input-group-text">
                <font-awesome-icon icon="sort-numeric-up" />
              </span>
              <input
                type="number"
                step="0.01"
                id="quantity"
                v-model="purchase.quantity"
                class="form-control"
                required
              />
            </div>
          </div>

          <!-- Precio de Compra -->
          <div class="mb-3">
            <label for="price" class="form-label">Precio de Compra</label>
            <div class="input-group">
              <span class="input-group-text">
                <font-awesome-icon icon="dollar-sign" />
              </span>
              <input
                type="number"
                step="0.01"
                id="price"
                v-model="purchase.purchase_price"
                class="form-control"
                required
              />
            </div>
          </div>

          <!-- Fecha de Compra -->
          <div class="mb-3">
            <label for="date" class="form-label">Fecha de Compra</label>
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
          >
            Guardar Cambios
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
    };
  },
  methods: {
    cancel() {
      this.$router.push({ name: "Purchases" });
    },
    async updatePurchase() {
      try {
        await axios.put(
          `http://127.0.0.1:8000/api/purchases/${this.$route.params.id}`,
          this.purchase
        );
        Swal.fire(
          "Actualizado",
          "La compra fue actualizada correctamente.",
          "success"
        );
        this.$router.push({ name: "Purchases" });
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "No se pudo actualizar la compra.", "error");
      }
    },
    async fetchData() {
      try {
        const [purchaseRes, suppliersRes, materialsRes] = await Promise.all([
          axios.get(
            `http://127.0.0.1:8000/api/purchases/${this.$route.params.id}`
          ),
          axios.get("http://127.0.0.1:8000/api/suppliers"),
          axios.get("http://127.0.0.1:8000/api/raw-materials"),
        ]);

        const purchase = purchaseRes.data;
        if (purchase.purchase_date) {
          purchase.purchase_date = purchase.purchase_date.slice(0, 10);
        }

        this.purchase = purchase;
        this.suppliers = suppliersRes.data;
        this.rawMaterials = materialsRes.data;
      } catch (error) {
        Swal.fire("Error", "No se pudo cargar la información.", "error");
      }
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
