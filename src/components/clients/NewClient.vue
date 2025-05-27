<template>
  <div class="container text-start">
    <h1 class="text-danger fw-bold">Nuevo Cliente</h1>
    <div class="card">
      <div class="card-header fw-bold">Datos del Cliente</div>
      <div class="card-body">
        <form @submit.prevent="saveClient">
          <!-- Usuario -->
          <div class="mb-3">
            <label for="user_id" class="form-label">Usuario:</label>
            <div class="input-group">
              <span class="input-group-text">
                <font-awesome-icon icon="user" />
              </span>
              <select
                id="user_id"
                v-model="client.user_id"
                class="form-select"
                required
              >
                <option value="" disabled>Selecciona un usuario</option>
                <option
                  v-for="user in users"
                  :key="user.id"
                  :value="user.id"
                >
                  {{ user.name }} - {{ user.email }}
                </option>
              </select>
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
                v-model="client.address"
                class="form-control"
                required
              />
            </div>
          </div>

          <!-- Teléfono -->
          <div class="mb-3">
            <label for="phone" class="form-label">Teléfono:</label>
            <div class="input-group">
              <span class="input-group-text">
                <font-awesome-icon icon="phone" />
              </span>
              <input
                type="text"
                id="phone"
                v-model="client.phone"
                class="form-control"
                required
              />
            </div>
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
  name: "NewClient",
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      users: [],
      client: {
        user_id: "",
        address: "",
        phone: "",
      },
    };
  },
  methods: {
    cancel() {
      this.$router.push({ name: "Clients" }); // Cambia según el nombre de la ruta lista clientes
    },
    async fetchUsers() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/users");
        this.users = response.data;
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
      }
    },
    async saveClient() {
      try {
        await axios.post("http://127.0.0.1:8000/api/clients", this.client);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Cliente creado correctamente",
          showConfirmButton: false,
          timer: 2000,
        });
        this.$router.push({ name: "Clients" });
      } catch (error) {
        console.error("Error al crear cliente:", error);
        let msg = "No se pudo crear el cliente.";
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
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>
