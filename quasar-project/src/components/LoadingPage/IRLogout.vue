<template>
  <div
    class="flex-center column q-pa-s"
    style="min-height: 100vh; position: relative; z-index: 1"
  >
    <q-spinner-cube
      color="accent"
      style="height: 10%; width: 10%; border: 0.2em solid #0f4d91"
    />
    <div class="q-mt-md loading-textwait">Logging Out, Please wait...</div>
  </div>
  <img
    src="../../assets/B&W1.png"
    alt="Loading Image"
    class="background-image"
  />
</template>

<script>
export default {
  name: "IRLogoutPage",
  mounted() {
    setTimeout(() => {
      this.$router.push("/Login");
    }, 2000); // Redirect after 2 seconds (adjust as needed)
    localStorage.clear();
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
