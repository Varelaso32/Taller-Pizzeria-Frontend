<template>
  <div class="container text-start">
    <h1 class="text-danger fw-bold">{{ $t('clients.new') }}</h1>
    <div class="card">
      <div class="card-header fw-bold">{{ $t('clients.form_title') }}</div>
      <div class="card-body">
        <form @submit.prevent="saveClient">
          <!-- Usuario -->
          <div class="mb-3">
            <label for="user_id" class="form-label">{{ $t('clients.user') }}:</label>
            <div class="input-group">
              <span class="input-group-text"><font-awesome-icon icon="user" /></span>
              <select id="user_id" v-model="client.user_id" class="form-select" required>
                <option value="" disabled>{{ $t('clients.select_user') }}</option>
                <option v-for="user in users" :key="user.id" :value="user.id">
                  {{ user.name }} - {{ user.email }}
                </option>
              </select>
            </div>
          </div>

          <!-- Dirección -->
          <div class="mb-3">
            <label for="address" class="form-label">{{ $t('clients.address') }}:</label>
            <div class="input-group">
              <span class="input-group-text"><font-awesome-icon icon="map-marker-alt" /></span>
              <input type="text" id="address" v-model="client.address" class="form-control" required />
            </div>
          </div>

          <!-- Teléfono -->
          <div class="mb-3">
            <label for="phone" class="form-label">{{ $t('clients.phone') }}:</label>
            <div class="input-group">
              <span class="input-group-text"><font-awesome-icon icon="phone" /></span>
              <input type="text" id="phone" v-model="client.phone" class="form-control" required />
            </div>
          </div>

          <!-- Botones -->
          <button type="submit" class="btn text-white" style="background-color: #c1121f">
            {{ $t('clients.save') }}
          </button>
          <button type="button" class="btn btn-secondary ms-2" @click="cancel">
            {{ $t('clients.cancel') }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "NewClient",
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
      this.$router.push({ name: "Clients" });
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
          title: this.$t('clients.created_success'),
          showConfirmButton: false,
          timer: 2000,
        });
        this.$router.push({ name: "Clients" });
      } catch (error) {
        const msg = error.response?.data?.msg || this.$t('clients.create_error');
        Swal.fire({ icon: "error", title: "Error", text: msg });
      }
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>
