<template>
  <div
    id="q-app"
    style="
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      position: relative;
    "
  >
    <div class="q-pa-md row items-start" style="position: relative; z-index: 1">
      <div class="logcards">
        <div class="text-h3 text-secondary text-bold q-mb-sm text-center ">
          WELCOME
        </div>

        <div class="text-dark q-mb-sm text-center" style="font-size: 16px; margin-top: 15px">
          This site is for admin members to report every progress of
          information that has been obtained.
        </div>

        <q-card-section>
          <q-form class="q-gutter-xs q-mb-sm custom-border1" @submit.prevent="login">
            <q-input
              rounded
              outlined
              v-model.trim="EmployeeCode"
              label="Employee Number"
            >
              <template v-slot:prepend>
                <q-icon name="person"></q-icon>
              </template>
            </q-input>

            <q-input
              rounded
              outlined
              v-model="WebPassword"
              label="Password"
              :type="showPassword ? 'text' : 'password'"
            >
              <template v-slot:prepend>
                <q-icon name="lock"></q-icon>
              </template>
              <template v-slot:append>
                <q-icon
                  name="visibility"
                  v-if="!showPassword"
                  @click="showPassword = true"
                ></q-icon>
                <q-icon
                  name="visibility_off"
                  v-else
                  @click="showPassword = false"
                ></q-icon>
              </template>
            </q-input>

            <q-btn
              label="LOGIN"
              color="accent"
              icon="login"
              unelevated
              rounded
              type="submit"
              class="full-width q-py-sm q-mt-md text-subtitle1 text-black text-bold"
            />
          </q-form>
        </q-card-section>

        <div class="text-center">
          <img
            src="../assets/FINALPOST.png"
            class="custom-image"
            style="margin-top: 10px; width: 35%; height: 40%"
          />
        </div>
      </div>
    </div>
    <img
      src="../assets/BUILDING.png"
      style="
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
      "
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      EmployeeCode: "",
      WebPassword: "",
      showPassword: false,
    };
  },

  computed: {
    ...mapGetters({ getUser: "ApplyStore/getUser" }),
  },

  methods: {
    async login() {
      try {
        const logs = {
          EmployeeCode: this.EmployeeCode,
          WebPassword: this.WebPassword,
        };
        if (!this.validateNOTE()) {
          // Changed 'validateLOGIN' to 'validateNOTE'
          this.$q.notify({
            color: "negative",
            position: "top",
            message: "PLEASE ENTER BOTH EMPLOYEE NUMBER AND PASSWORD",
            icon: "report_problem",
            iconColor: "white",
            timeout: 2000, // Increased timeout to 2000 milliseconds
            progress: true,
          });
          return;
        }
        const response = await this.$store.dispatch("ApplyStore/Login", logs);
        // Redirect to HRADMIN page after successful login
        this.$router.push("/auth-loading");
      } catch (error) {
        console.error("Error Logging in data:", error);
        this.$q.notify({
          color: "negative",
          position: "top",
          message: "INCORRECT EMPLOYEE NUMBER & PASSWORD",
          icon: "report_problem",
          iconColor: "white",
          timeout: 2000,
          progress: true,
        });
        // Call onreset after the notification is displayed
      }
    },

    validateNOTE() {
      return this.EmployeeCode && this.WebPassword;
    },
  },
};
</script>

<style>
.q-pa-md {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.custom-image {
  width: 180px;
  height: 180px; /* To maintain aspect ratio */
  margin-left: 2px;
}
.q-input {
  margin-bottom: 10px; /* Adjust the value as needed */
}
.logcards {
  border-bottom: 1em solid #ffc619;
  border-top: 1em solid #0f4d91;
  background-color: #e8f0fe;
  padding: 55px;
  width: 450px; /* Optional: set a max-width for the card */
  height: 550px;
  border-radius: 10%;
}
.textwel {
  font-weight: bold;
  font-family: Arial Black;
  display: flex;
  color: #002b5c;
  font-size: 45px;
  justify-content: center;
}
.textdash {
  font-weight: normal;
  display: flex;
  color: #002b5c;
  font-size: 15px;
  justify-content: center;
  margin-left: 5px;
  margin-bottom: 8px;
}
</style>
