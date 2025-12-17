<template>
  <div id="q-app" style="min-height: 100vh; position: relative">
    <div class="q-pa-md row items-start" style="position: relative; z-index: 1">
      <div class="logcard">
        <div style="display: flex; justify-content: space-between">
          <div style="height: 550px; width: 650px">
            <img src="../assets/FINALPOST.png" class="imgs" />
          </div>

          <div class="signin">
            <div class="text-h3 text-secondary text-bold q-mb-sm text-center ">
                LOGIN
            </div>

            <div class="text-dark q-mb-sm text-center" style="font-size: 16px">
                To stay connected with us, please log in using your personal
                information to create an Incident Report.
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
                  src="../assets/UERM Logos.png"
                  class="q-ma-s"
                  style="margin-top: 5px; width: 30%; height: 45%"
                />
            </div>
          </div>
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
        if (!this.validateUser()) {
          this.$q.notify({
            color: "negative",
            position: "top",
            message: "PLEASE ENTER BOTH EMPLOYEE NUMBER AND PASSWORD",
            icon: "report_problem",
            iconColor: "white",
            timeout: 2000,
            progress: true,
          });
          return;
        }

        const logs = {
          EmployeeCode: this.EmployeeCode,
          WebPassword: this.WebPassword,
        };

        const response = await this.$store.dispatch("ApplyStore/Login", logs);

        this.$router.push("/ir-authload");
      } catch (error) {
        console.error("Error Logging in data:", error);
        this.$q.notify({
          color: "negative",
          position: "top",
          message: "INCORRECT EMPLOYEE NUMBER AND PASSWORD",
          icon: "report_problem",
          iconColor: "white",
          timeout: 2000,
          progress: true,
        });
      }
    },

    validateUser() {
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
.q-input {
  margin-bottom: 10px; /* Adjust the value as needed */
}
.logcard {
  padding: 1em;
  width: 1250px; /* Optional: set a max-width for the card */
  height: 580px;
  margin-top: 150px;
  background-color: transparent;
}
.signin {
  border-bottom: 1em solid #ffc619;
  border-top: 1em solid #0f4d91;
  background-color: #e8f0fe;
  padding: 70px;
  width: 500px; /* Optional: set a max-width for the card */
  border-radius: 10%;
  height: 550px;
}
.btnlogin {
  justify-content: center;
  width: 90%;
  margin-top: 5px;
  margin-left: 25px;
  height: 50px;
  font-weight: bold;
  font-size: 18px;
}
.textLogin {
  font-weight: bold;
  font-family: Arial Black;
  display: flex;
  color: #0f4d91;
  font-size: 53px;
  justify-content: center;
}
.textwel {
  font-weight: bold;
  font-family: Arial Black;
  display: flex;
  color: #002b5c;
  font-size: 45px;
  justify-content: center;
}
.texthead {
  font-weight: normal;
  display: flex;
  color: #0f4d91;
  font-size: 15px;
  justify-content: center;
  margin-left: 5px;
  margin-bottom: 15px;
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
.imgs {
  height: 330px;
  width: 600px;
  margin-top: 100px;
  margin-left: 30px;
}
</style>
