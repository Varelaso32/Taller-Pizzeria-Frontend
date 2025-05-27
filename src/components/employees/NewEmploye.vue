<template>
  <div class="container text-start">
    <h1 class="text-danger fw-bold">Nuevo Empleado</h1>
    <div class="card">
      <div class="card-header fw-bold">Datos del Empleado</div>
      <div class="card-body">
        <form @submit.prevent="saveEmployee">
          <!-- Usuario (select) -->
          <div class="mb-3">
            <label for="user_id" class="form-label">Usuario:</label>
            <div class="input-group">
              <span class="input-group-text">
                <font-awesome-icon icon="user" />
              </span>
              <select
                id="user_id"
                v-model="employee.user_id"
                class="form-select"
                required
              >
                <option value="" disabled>Seleccione un usuario</option>
                <option
                  v-for="user in users"
                  :key="user.id"
                  :value="user.id"
                >
                  {{ user.name }} ({{ user.email }})
                </option>
              </select>
            </div>
          </div>

          <!-- Cargo -->
          <div class="mb-3">
            <label for="position" class="form-label">Cargo:</label>
            <input
              type="text"
              id="position"
              v-model="employee.position"
              class="form-control"
              required
            />
          </div>

          <!-- Número de Identificación -->
          <div class="mb-3">
            <label for="identification_number" class="form-label">
              Número de Identificación:
            </label>
            <input
              type="text"
              id="identification_number"
              v-model="employee.identification_number"
              class="form-control"
              required
            />
          </div>

          <!-- Salario -->
          <div class="mb-3">
            <label for="salary" class="form-label">Salario:</label>
            <input
              type="number"
              id="salary"
              v-model="employee.salary"
              class="form-control"
              required
              min="0"
            />
          </div>

          <!-- Fecha de Contratación -->
          <div class="mb-3">
            <label for="hire_date" class="form-label">
              Fecha de Contratación:
            </label>
            <input
              type="date"
              id="hire_date"
              v-model="employee.hire_date"
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
  name: "NuevoEmpleado",
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      employee: {
        user_id: "",
        position: "",
        identification_number: "",
        salary: 0,
        hire_date: "",
      },
      users: [],
    };
  },
  methods: {
    cancel() {
      this.$router.push({ name: "Employes" });
    },
    async saveEmployee() {
      try {
        const res = await axios.post(
          "http://127.0.0.1:8000/api/employees",
          this.employee
        );
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Empleado creado correctamente",
          showConfirmButton: false,
          timer: 2000,
        });
        this.$router.push({ name: "Employes" });
      } catch (error) {
        console.error("Error al crear empleado:", error);
        let msg = "No se pudo crear el empleado.";
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
    async fetchUsers() {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/users");
        this.users = res.data;
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>
