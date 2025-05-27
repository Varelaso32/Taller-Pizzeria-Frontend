<template>
  <div class="container text-start">
    <h1 class="text-danger fw-bold">Editar Cliente</h1>
    <div class="card">
      <div class="card-header fw-bold">Datos del Cliente</div>
      <div class="card-body">
        <form @submit.prevent="updateClient">

          <!-- Usuario asociado -->
          <div class="mb-3">
            <label for="user_id" class="form-label">Usuario:</label>
            <div class="input-group">
              <span class="input-group-text">
                <font-awesome-icon icon="user" />
              </span>
              <select id="user_id" v-model="client.user_id" class="form-select" required>
                <option disabled value="">Seleccione un usuario</option>
                <option v-for="user in users" :key="user.id" :value="user.id">
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
          <button type="submit" class="btn text-white" style="background-color: #c1121f">
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
  name: "EditarCliente",
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      client: {
        id: null,
        user_id: "",
        address: "",
        phone: "",
      },
      users: [],
    };
  },
  methods: {
    cancel() {
      this.$router.push({ name: "Clients" }); // Ajusta según tu ruta
    },
    async updateClient() {
      try {
        await axios.put(`http://127.0.0.1:8000/api/clients/${this.client.id}`, this.client);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Cliente actualizado correctamente",
          showConfirmButton: false,
          timer: 2000,
        });
        this.$router.push({ name: "Clients" });
      } catch (error) {
        console.error("Error al actualizar cliente:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response?.data?.msg || "No se pudo actualizar el cliente.",
        });
      }
    },
    async loadUsers() {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/users");
        this.users = res.data;
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudieron cargar los usuarios.",
        });
      }
    },
    async loadClient() {
      const id = this.$route.params.id;
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/clients/${id}`);
        this.client = res.data;
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo cargar el cliente.",
        });
      }
    },
  },
  mounted() {
    this.loadUsers();
    this.loadClient();
  },
};
</script>
