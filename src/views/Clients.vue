<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="h3 text-danger">
        <font-awesome-icon icon="users" class="me-2" />
        {{ $t('clients.title') }}
      </h1>
      <button @click="newClient" class="btn btn-danger d-flex align-items-center">
        <font-awesome-icon icon="plus" class="me-2" />
        {{ $t('clients.new') }}
      </button>
    </div>

    <div class="table-responsive shadow-sm rounded bg-white">
      <table class="table table-striped align-middle mb-0">
        <thead class="table-dark text-white">
          <tr>
            <th>#</th>
            <th>{{ $t('clients.name') }}</th>
            <th>{{ $t('clients.email') }}</th>
            <th>{{ $t('clients.role') }}</th>
            <th>{{ $t('clients.address') }}</th>
            <th>{{ $t('clients.phone') }}</th>
            <th class="text-center">{{ $t('clients.actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(client, index) in clients" :key="client.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ client.user_name }}</td>
            <td>{{ client.user_email }}</td>
            <td>{{ client.user_role }}</td>
            <td>{{ client.address }}</td>
            <td>{{ client.phone }}</td>
            <td class="text-center">
              <button @click="editClient(client.id)" class="btn btn-sm btn-warning me-2">
                <font-awesome-icon icon="pencil" />
              </button>
              <button @click="deleteClient(client.id)" class="btn btn-sm btn-danger">
                <font-awesome-icon icon="trash" />
              </button>
            </td>
          </tr>
          <tr v-if="clients.length === 0">
            <td colspan="7" class="text-center py-4 text-muted">
              {{ $t('clients.no_clients') }}
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
  name: "ClientsList",
  data() {
    return {
      clients: [],
    };
  },
  methods: {
    fetchClients() {
      axios.get("http://127.0.0.1:8000/api/clients")
        .then((res) => this.clients = res.data)
        .catch((err) => console.error("Error fetching clients:", err));
    },
    deleteClient(id) {
      Swal.fire({
        title: this.$t('clients.delete_confirm_title', { id }),
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: this.$t('clients.delete_confirm_button'),
        cancelButtonText: this.$t('clients.delete_cancel_button'),
        confirmButtonColor: "#c1121f",
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`http://127.0.0.1:8000/api/clients/${id}`)
            .then(() => {
              Swal.fire("¡Eliminado!", this.$t('clients.deleted_success'), "success");
              this.fetchClients();
            })
            .catch(() => {
              Swal.fire("Error", this.$t('clients.delete_error'), "error");
            });
        }
      });
    },
    editClient(id) {
      this.$router.push({ name: "EditarCliente", params: { id } });
    },
    newClient() {
      this.$router.push({ name: "NuevoCliente" });
    },
  },
  mounted() {
    this.fetchClients();
  },
};
</script>
