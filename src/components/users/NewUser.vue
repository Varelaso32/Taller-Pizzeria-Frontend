<template>
  <div class="container text-start">
    <h1 class="text-danger fw-bold">{{ $t("newUser.title") }}</h1>
    <div class="card">
      <div class="card-header fw-bold">{{ $t("newUser.header") }}</div>
      <div class="card-body">
        <form @submit.prevent="saveUser">
          <!-- Nombre -->
          <div class="mb-3">
            <label for="name" class="form-label">{{
              $t("newUser.name")
            }}</label>
            <div class="input-group">
              <span class="input-group-text">
                <font-awesome-icon icon="user" />
              </span>
              <input
                type="text"
                id="name"
                v-model="user.name"
                class="form-control"
                required
              />
            </div>
          </div>

          <!-- Correo -->
          <div class="mb-3">
            <label for="email" class="form-label">{{
              $t("newUser.email")
            }}</label>
            <div class="input-group">
              <span class="input-group-text">
                <font-awesome-icon icon="envelope" />
              </span>
              <input
                type="email"
                id="email"
                v-model="user.email"
                class="form-control"
                required
              />
            </div>
          </div>

          <!-- Contraseña -->
          <div class="mb-3">
            <label for="password" class="form-label">{{
              $t("newUser.password")
            }}</label>
            <div class="input-group">
              <span class="input-group-text">
                <font-awesome-icon icon="lock" />
              </span>
              <input
                type="password"
                id="password"
                v-model="user.password"
                class="form-control"
                required
              />
            </div>
          </div>

          <!-- Rol -->
          <div class="mb-3">
            <label for="role" class="form-label">{{
              $t("newUser.role")
            }}</label>
            <div class="input-group">
              <span class="input-group-text">
                <font-awesome-icon icon="user-tag" />
              </span>
              <select
                id="role"
                v-model="user.role"
                class="form-select"
                required
              >
                <option value="cliente">{{ $t("roles.client") }}</option>
                <option value="empleado">{{ $t("roles.employee") }}</option>
              </select>
            </div>
          </div>

          <!-- Botones -->
          <button
            type="submit"
            class="btn text-white"
            style="background-color: #c1121f"
          >
            {{ $t("buttons.save") }}
          </button>
          <button type="button" class="btn btn-secondary ms-2" @click="cancel">
            {{ $t("buttons.cancel") }}
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
  name: "NuevoUsuario",
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      user: {
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
    async saveUser() {
      try {
        const res = await axios.post(
          "http://127.0.0.1:8000/api/users",
          this.user
        );
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Usuario creado correctamente",
          showConfirmButton: false,
          timer: 2000,
        });
        this.$router.push({ name: "Users" });
      } catch (error) {
        console.error("Error al crear usuario:", error);
        let msg = "No se pudo crear el usuario.";
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
};
</script>
