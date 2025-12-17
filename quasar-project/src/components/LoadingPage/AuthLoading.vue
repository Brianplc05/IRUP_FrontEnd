<template>
  <div
    class="flex-center column q-pa-s"
    style="min-height: 100vh; position: relative; z-index: 1"
  >
    <q-spinner-cube
      color="accent"
      style="height: 10%; width: 10%; border: 0.2em solid #0f4d91"
    />
    <div class="q-mt-md loading-textwait">Authenticating, Please wait...</div>
  </div>
  <img
    src="../../assets/B&W1.png"
    alt="Loading Image"
    class="background-image"
  />
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "AuthLoading",

  computed: {
    ...mapGetters({ getUser: "ApplyStore/getUser" }),
  },

  mounted() {
    this.authenticateUser();
  },

  methods: {
    async authenticateUser() {
      if (!this.getUser) {
        console.error("User is not logged in, redirecting to login.");
        this.$router.push("/Login");
        return;
      }
      try {
        // Dispatch the action only if getUser exists
        await this.$store.dispatch(
          "ApplyStore/getAccessRight",
          this.getUser.EmployeeCode
        );
        this.$router.push("/Dashboard");
      } catch (error) {
        console.error("Authentication failed:", error);
        this.$router.push("/Login");
      }
    },
  },
};
</script>

<style scoped>
.loading-textwait {
  color: #0f4d91; /* Adjust if needed */
  font-size: 28px;
  font-weight: bold;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  text-align: center; /* Center text alignment */
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%; /* Adjusted height to cover the whole screen */
  z-index: 0;
  object-fit: cover;
  opacity: 0.7; /* Added opacity for better text visibility */
}
</style>
