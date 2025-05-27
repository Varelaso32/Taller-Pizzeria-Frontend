<template>
  <div class="container text-start">
    <h1 class="text-success fw-bold mb-4">Nueva Sucursal</h1>
    <div class="card">
      <div class="card-header fw-bold">Datos de la Sucursal</div>
      <div class="card-body">
        <form @submit.prevent="createBranch">
          <!-- Nombre -->
          <div class="mb-3">
            <label for="name" class="form-label">Nombre:</label>
            <div class="input-group">
              <span class="input-group-text">
                <font-awesome-icon icon="building" />
              </span>
              <input
                type="text"
                id="name"
                v-model="branch.name"
                class="form-control"
                required
              />
            </div>
          </div>

          <!-- Dirección -->
          <div class="mb-3">
            <label for="address" class="form-label">Dirección:</label>
            <div class="input-group">
              <span class="input-group-text">
                <font-awesome-icon icon="map-marker-alt" />
              </span>
              <input
                type="text"
                id="address"
                v-model="branch.address"
                class="form-control"
                required
              />
            </div>
          </div>

          <!-- Botones -->
          <button
            type="submit"
            class="btn text-white"
            style="background-color: #2b9348"
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
  name: "CrearBranch",
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      branch: {
        name: "",
        address: "",
      },
    };
  },
  methods: {
    async createBranch() {
      try {
        await axios.post("http://127.0.0.1:8000/api/branches", this.branch);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Sucursal creada exitosamente",
          showConfirmButton: false,
          timer: 2000,
        });
        this.$router.push({ name: "Branches" });
      } catch (error) {
        let msg = "Error al crear la sucursal.";
        if (error.response?.data?.msg) {
          msg = error.response.data.msg;
        }
        Swal.fire({
          icon: "error",
          title: "Error",
          text: msg,
        });
      }
    },
    cancel() {
      this.$router.push({ name: "Branches" });
    },
  },
};
</script>
