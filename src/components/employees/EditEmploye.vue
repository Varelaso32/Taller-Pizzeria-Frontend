<template>
  <div class="container text-start">
    <h1 class="text-danger fw-bold">{{ $t("employees.edit_employee") }}</h1>
    <div class="card">
      <div class="card-header fw-bold">{{ $t("employees.form_title") }}</div>
      <div class="card-body">
        <form @submit.prevent="updateEmployee">
          <!-- Usuario -->
          <div class="mb-3">
            <label for="user_id" class="form-label">{{ $t("employees.user_associated") }}:</label>
            <select id="user_id" v-model="employee.user_id" class="form-select" required>
              <option value="" disabled>{{ $t("employees.select_user") }}</option>
              <option v-for="user in users" :key="user.id" :value="user.id">
                {{ user.name }} ({{ user.email }})
              </option>
            </select>
          </div>

          <!-- Posición -->
          <div class="mb-3">
            <label for="position" class="form-label">{{ $t("employees.position") }}:</label>
            <select id="position" v-model="employee.position" class="form-select" required>
              <option value="" disabled>{{ $t("employees.select_position") }}</option>
              <option value="cajero">{{ $t("employees.positions.cashier") }}</option>
              <option value="administrador">{{ $t("employees.positions.admin") }}</option>
              <option value="cocinero">{{ $t("employees.positions.cook") }}</option>
              <option value="mensajero">{{ $t("employees.positions.messenger") }}</option>
            </select>
          </div>

          <!-- Número de Identificación -->
          <div class="mb-3">
            <label for="identification_number" class="form-label">{{ $t("employees.identification_number") }}:</label>
            <input type="text" id="identification_number" v-model="employee.identification_number" class="form-control" required />
          </div>

          <!-- Salario -->
          <div class="mb-3">
            <label for="salary" class="form-label">{{ $t("employees.salary") }}:</label>
            <input type="number" id="salary" v-model="employee.salary" class="form-control" required min="0" />
          </div>

          <!-- Fecha de Contratación -->
          <div class="mb-3">
            <label for="hire_date" class="form-label">{{ $t("employees.hire_date") }}:</label>
            <input type="date" id="hire_date" v-model="employee.hire_date" class="form-control" required />
          </div>

          <!-- Botones -->
          <button type="submit" class="btn text-white" style="background-color: #c1121f">
            {{ $t("buttons.update") }}
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

export default {
  name: "EditarEmpleado",
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
    async fetchEmployee() {
      try {
        const id = this.$route.params.id;
        const res = await axios.get(`http://127.0.0.1:8000/api/employees/${id}`);
        this.employee = res.data;
      } catch (error) {
        console.error("Error loading employee:", error);
      }
    },
    async fetchUsers() {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/users");
        this.users = res.data;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    async updateEmployee() {
      try {
        const id = this.$route.params.id;
        await axios.put(`http://127.0.0.1:8000/api/employees/${id}`, this.employee);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: this.$t("alerts.userUpdated"),
          showConfirmButton: false,
          timer: 2000,
        });
        this.$router.push({ name: "Employes" });
      } catch (error) {
        let msg = this.$t("alerts.userUpdateError");
        if (error.response?.data?.msg) msg = error.response.data.msg;
        Swal.fire({
          icon: "error",
          title: this.$t("alerts.error"),
          text: msg,
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
