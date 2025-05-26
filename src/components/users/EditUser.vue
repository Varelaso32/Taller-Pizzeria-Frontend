<template>
  <div class="container text-start">
    <h1 class="text-danger fw-bold">Editar Usuario</h1>
    <div class="card">
      <div class="card-header fw-bold">Datos del Usuario</div>
      <div class="card-body">
        <form @submit.prevent="updateUser">
          <!-- Nombre -->
          <div class="mb-3">
            <label for="name" class="form-label">Nombre:</label>
            <div class="input-group">
              <span class="input-group-text">
                <font-awesome-icon icon="user" />
              </span>
              <input type="text" id="name" v-model="user.name" class="form-control" required />
            </div>
          </div>

          <!-- Correo -->
          <div class="mb-3">
            <label for="email" class="form-label">Correo Electrónico:</label>
            <div class="input-group">
              <span class="input-group-text">
                <font-awesome-icon icon="envelope" />
              </span>
              <input type="email" id="email" v-model="user.email" class="form-control" required />
            </div>
          </div>

          <!-- Contraseña -->
          <div class="mb-3">
            <label for="password" class="form-label">Nueva Contraseña (opcional):</label>
            <div class="input-group">
              <span class="input-group-text">
                <font-awesome-icon icon="lock" />
              </span>
              <input type="password" id="password" v-model="user.password" class="form-control" />
            </div>
          </div>

          <!-- Rol -->
          <div class="mb-3">
            <label for="role" class="form-label">Rol:</label>
            <div class="input-group">
              <span class="input-group-text">
                <font-awesome-icon icon="user-tag" />
              </span>
              <select id="role" v-model="user.role" class="form-select" required>
                <option value="cliente">Cliente</option>
                <option value="empleado">Empleado</option>
              </select>
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
  name: "EditarUsuario",
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      user: {
        id: null,
        name: "",
        email: "",
        password: "",
        role: "cliente",
      },
    };
  },
  methods: {
    cancel() {
      this.$router.push({ name: "Users" });
    },
    async updateUser() {
      const payload = { ...this.user };
      if (!payload.password) delete payload.password;

      try {
        const res = await axios.put(`http://127.0.0.1:8000/api/users/${this.user.id}`, payload);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Usuario actualizado correctamente",
          showConfirmButton: false,
          timer: 2000,
        });
        this.$router.push({ name: "Users" });
      } catch (error) {
        console.error("Error al actualizar usuario:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response?.data?.msg || "No se pudo actualizar el usuario.",
        });
      }
    },
  },
  mounted() {
    const id = this.$route.params.id;
    axios
      .get(`http://127.0.0.1:8000/api/users/${id}`)
      .then((response) => {
        this.user = { ...response.data, password: "" };
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo cargar el usuario.",
        });
      });
  },
};
</script>