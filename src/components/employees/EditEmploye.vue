<template>
  <div class="container text-start">
    <h1 class="text-danger fw-bold">Editar Empleado</h1>
    <div class="card">
      <div class="card-header fw-bold">Datos del Empleado</div>
      <div class="card-body">
        <form @submit.prevent="updateEmployee">
          <!-- Usuario -->
          <div class="mb-3">
            <label for="user_id" class="form-label">Usuario Asociado:</label>
            <select id="user_id" v-model="employee.user_id" class="form-select" required>
              <option v-for="user in users" :key="user.id" :value="user.id">
                {{ user.name }} ({{ user.email }})
              </option>
            </select>
          </div>

          <!-- Posición -->
          <div class="mb-3">
            <label for="position" class="form-label">Cargo:</label>
            <input type="text" id="position" v-model="employee.position" class="form-control" required />
          </div>

          <!-- Número de Identificación -->
          <div class="mb-3">
            <label for="identification_number" class="form-label">Número de Identificación:</label>
            <input type="text" id="identification_number" v-model="employee.identification_number" class="form-control" required />
          </div>

          <!-- Salario -->
          <div class="mb-3">
            <label for="salary" class="form-label">Salario:</label>
            <input type="number" id="salary" v-model="employee.salary" class="form-control" required min="0" />
          </div>

          <!-- Fecha de Contratación -->
          <div class="mb-3">
            <label for="hire_date" class="form-label">Fecha de Contratación:</label>
            <input type="date" id="hire_date" v-model="employee.hire_date" class="form-control" required />
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

export default {
  name: "EditarEmpleado",
  data() {
    return {
      employee: {
        id: null,
        user_id: "",
        position: "",
        identification_number: "",
        salary: 0,
        hire_date: "",
      },
      users: [], // Lista de usuarios para el select
    };
  },
  methods: {
    cancel() {
      this.$router.push({ name: "Employes" });
    },
    async updateEmployee() {
      try {
        const response = await axios.put(`http://127.0.0.1:8000/api/employees/${this.employee.id}`, this.employee);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Empleado actualizado correctamente",
          showConfirmButton: false,
          timer: 2000,
        });
        this.$router.push({ name: "Employes" });
      } catch (error) {
        console.error("Error al actualizar empleado:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response?.data?.msg || "No se pudo actualizar el empleado.",
        });
      }
    },
    async fetchUsers() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/users");
        this.users = response.data;
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
      }
    },
    async fetchEmployee() {
      const id = this.$route.params.id;
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/employees/${id}`);
        this.employee = { ...response.data };
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo cargar el empleado.",
        });
      }
    },
  },
  mounted() {
    this.fetchEmployee();
    this.fetchUsers();
  },
};
</script>