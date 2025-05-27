<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="h3 text-danger">
        <font-awesome-icon icon="users" class="me-2" />
        {{ $t("users.title") }}
      </h1>
      <button @click="newUser" class="btn btn-danger d-flex align-items-center">
        <font-awesome-icon icon="plus" class="me-2" />
        {{ $t("users.new") }}
      </button>
    </div>

    <div class="table-responsive shadow-sm rounded bg-white">
      <table class="table table-striped align-middle mb-0">
        <thead class="table-dark text-white">
          <tr>
            <th>#</th>
            <th>{{ $t("users.name") }}</th>
            <th>{{ $t("users.email") }}</th>
            <th>{{ $t("users.role") }}</th>
            <th class="text-center">{{ $t("users.actions") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="user.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td class="text-center">
              <button
                @click="editUser(user.id)"
                class="btn btn-sm btn-warning me-2"
              >
                <font-awesome-icon icon="pencil" />
              </button>
              <button
                @click="deleteUser(user.id)"
                class="btn btn-sm btn-danger"
              >
                <font-awesome-icon icon="trash" />
              </button>
            </td>
          </tr>
          <tr v-if="users.length === 0">
            <td colspan="5" class="text-center py-4 text-muted">
              {{ $t("users.noUsers") }}
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
  name: "UsersList",
  data() {
    return {
      users: [],
    };
  },
  methods: {
    fetchUsers() {
      axios
        .get("http://127.0.0.1:8000/api/users")
        .then((response) => {
          this.users = response.data;
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    },
    deleteUser(id) {
      Swal.fire({
        title: `¿Deseas eliminar el usuario con ID ${id}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#c1121f",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`http://127.0.0.1:8000/api/users/${id}`)
            .then((response) => {
              Swal.fire(
                "¡Eliminado!",
                "El usuario ha sido eliminado.",
                "success"
              );
              this.users = response.data;
            })
            .catch((error) => {
              console.error("Error deleting user:", error);
              Swal.fire("Error", "No se pudo eliminar el usuario.", "error");
            });
        }
      });
    },
    editUser(id) {
      this.$router.push({ name: "EditarUsuario", params: { id: `${id}` } });
    },
    newUser() {
      this.$router.push({ name: "NuevoUsuario" });
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>
