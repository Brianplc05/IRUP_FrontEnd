<template>
  <q-layout>
    <q-page-container>
      <q-page class="login-page">

        <!-- BACKGROUND -->
        <img
          src="../assets/BUILDING.png"
          class="background-image"
        />

        <!-- CONTENT -->
        <div class="row full-width login-container">

          <!-- LEFT SIDE -->
          <div class="col-6 flex flex-center left-panel">
            <img
              src="../assets/FINALPOST.png"
              class="imgs"
            />
          </div>

          <!-- RIGHT SIDE -->
          <div class="col-6 col-md-6 col-sm-12 col-xs-12 right-panel">
            <q-card-section class="login-card">

              <div class="login-content">

                <!-- LOGIN TITLE -->
                <div class="text-h3 text-secondary text-bold text-center login-title">
                  LOGIN
                </div>

                <!-- DESCRIPTION -->
                <div class="text-dark text-center login-description">
                  To stay connected with us, please log in using your personal
                  information to create an Incident Report.
                </div>

                <!-- LOGIN FORM -->
                <q-form
                  class="login-form"
                  @submit.prevent="login"
                >

                  <!-- EMPLOYEE NUMBER -->
                  <q-input
                    outlined
                    v-model.trim="EmployeeCode"
                    label="Employee Number"
                    class="login-input"
                  >
                    <template v-slot:prepend>
                      <q-icon name="person" />
                    </template>
                  </q-input>

                  <!-- PASSWORD -->
                  <q-input
                    outlined
                    v-model="WebPassword"
                    label="Password"
                    :type="showPassword ? 'text' : 'password'"
                    class="login-input"
                  >
                    <template v-slot:prepend>
                      <q-icon name="lock" />
                    </template>

                    <template v-slot:append>
                      <q-icon
                        v-if="!showPassword"
                        name="visibility"
                        class="cursor-pointer"
                        @click="showPassword = true"
                      />

                      <q-icon
                        v-else
                        name="visibility_off"
                        class="cursor-pointer"
                        @click="showPassword = false"
                      />
                    </template>
                  </q-input>

                  <!-- LOGIN BUTTON -->
                  <q-btn
                    label="LOGIN"
                    color="accent"
                    icon="login"
                    unelevated
                    rounded
                    type="submit"
                    class="full-width login-button text-subtitle1 text-black text-bold"
                  />

                </q-form>

                <!-- UERM LOGO -->
                <div class="uerm-logo-wrapper">
                  <img
                    src="../assets/UERM Logos.png"
                    alt="UERM Logo"
                    class="uerm-logo"
                  />
                </div>

              </div>

            </q-card-section>
          </div>

        </div>

      </q-page>
    </q-page-container>
  </q-layout>
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
    async login () {
      try {
        // trim para kahit may spaces lang
        const emp = this.EmployeeCode?.trim()
        const pass = this.WebPassword?.trim()

        // 🔴 EARLY VALIDATION (undefined / empty / null)
        if (!emp || !pass) {
          this.$q.notify({
            color: "negative",
            position: "top",
            message: "PLEASE ENTER BOTH EMPLOYEE NUMBER AND PASSWORD",
            icon: "report_problem",
            timeout: 2000
          })
          return
        }

        const logs = {
          EmployeeCode: emp,
          WebPassword: pass
        }

        const response = await this.$store.dispatch("ApplyStore/Login", logs)

        this.$router.push("/ir-authload");

      } catch (error) {

        this.$q.notify({
          color: "negative",
          position: "top",
          message:
            "INCORRECT EMPLOYEE NUMBER & PASSWORD",
          icon: "report_problem",
          timeout: 2000
        })
      }
    },
    validateUser() {
      return this.EmployeeCode && this.WebPassword;
    },
  },
};
</script>

<style scoped>

.login-page {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

.login-container {
  position: relative;
  min-height: 100vh;
  z-index: 1;
}

.left-panel {
  min-height: 100vh;
  border: 1px solid #003566;
  padding: 40px;
}


/* FINAL POST IMAGE */

.imgs {
  width: 650px;
  height: 350px;
  max-width: 90%;
  object-fit: contain;
}

/* =========================================================
  RIGHT LOGIN PANEL
========================================================= */

.right-panel {
  min-height: 100vh;
  max-width: 550px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ffffff 0%, #f2f2f2 100%);
  border-top: 13px solid #003566;
  border-bottom: 13px solid #ffc412;
  box-shadow: 0 12px 35px rgba(0, 53, 102, 0.12);
}


/* =========================================================
  LOGIN CARD
========================================================= */

.login-card {
  width: 100%;
  max-width: 500px;
  padding: 45px 40px;
  background: linear-gradient(135deg, #ffffff 0%, #f2f2f2 100%);
  border-radius: 18px;
}


/* =========================================================
  LOGIN CONTENT
========================================================== */

.login-content {
  width: 100%;
}


/* =========================================================
   LOGIN TITLE
   ========================================================= */

.login-title {
  margin-bottom: 12px;
  color: #003566;
  letter-spacing: 1px;
}


/* =========================================================
   DESCRIPTION
   ========================================================= */

.login-description {
  max-width: 400px;
  margin: 0 auto 30px;
  font-size: 16px;
  line-height: 1.6;
  color: #555;
}


/* =========================================================
   LOGIN FORM
   ========================================================= */

.login-form {
  width: 100%;
}


/* =========================================================
   INPUTS
   ========================================================= */

.login-input {
  margin-bottom: 16px;
}


/* =========================================================
   LOGIN BUTTON
   ========================================================= */

.login-button {
  min-height: 50px;

  margin-top: 12px;

  border-radius: 10px;

  letter-spacing: 0.5px;
}


/* =========================================================
   UERM LOGO
   ========================================================= */

.uerm-logo-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 35px;
}


.uerm-logo {
  width: 150px;
  max-width: 60%;
  height: auto;

  object-fit: contain;
}


/* =========================================================
   TABLET
   ========================================================= */

@media (max-width: 1024px) {

  .login-card {
    padding: 40px 30px;
  }

  .login-title {
    font-size: 2.5rem;
  }

}


/* =========================================================
   MOBILE
   ========================================================= */

@media (max-width: 600px) {

  .right-panel {
    min-height: 100vh;
    max-width: 100%;

    padding: 20px;
  }

  .login-card {
    padding: 30px 22px;

    border-radius: 14px;
  }

  .login-title {
    font-size: 2rem;
  }

  .login-description {
    font-size: 14px;
    line-height: 1.5;
  }

  .uerm-logo {
    width: 130px;
  }

}

@media (max-width: 1023px) {

  .left-panel {
    display: none !important;
  }

  .right-panel {
    width: 100%;
  }

  .login-content {
    max-width: 500px;
  }

}

@media (max-width: 600px) {

  .right-panel {
    padding: 30px 20px !important;
  }

  .text-h3 {
    font-size: 2rem;
  }

  .login-description {
    font-size: 14px;
  }

  .uerm-logo {
    width: 40%;
  }

}

</style>
