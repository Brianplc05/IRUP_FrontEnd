<template>
  <q-layout>
    <q-page-container>
      <q-page class="logout-page">
        <!-- Illustration -->
        <img src="../../assets/LOGOUT-IR.png" alt="Logging out" class="logout-image" />

        <!-- Logout Content -->
        <div class="logout-content">
          <div class="logout-title">Logging out...</div>

          <div class="logout-subtitle">We're safely signing you out.</div>

          <!-- Progress Bar -->
          <div class="logout-progress">
            <div class="logout-progress-bar"></div>
          </div>

          <div class="logout-message">Please wait a moment...</div>

          <!-- Animated Dots -->
          <div class="logout-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "LogoutPage",

  mounted() {
    setTimeout(() => {
      this.$router.push("/IRLogin");
    }, 2000); // Redirect after 2 seconds (adjust as needed)
    localStorage.clear();
  },
};
</script>


<style>
/* //////////////// LOGOUT //////////////// */
.logout-page {
  min-height: 100vh;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: #ffffff;
  overflow: hidden;
}

/* Illustration */
.logout-image {
  width: min(600px, 80vw);
  max-height: 380px;
  object-fit: contain;
  display: block;
}

/* Content */
.logout-content {
  width: min(500px, 80vw);
  text-align: center;
  margin-top: -5px;
}

/* Title */
.logout-title {
  font-family: 'Poppins', sans-serif;
  font-size: 42px;
  font-weight: 700;
  line-height: 1.1;
  color: #012561;
}

/* Subtitle */
.logout-subtitle {
  margin-top: 8px;

  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  font-weight: 400;
  color: #52627a;
}

/* Progress */
.logout-progress {
  width: 100%;
  height: 14px;

  margin: 24px auto 0;

  background: #e8edf5;
  border-radius: 20px;
  overflow: hidden;
}

/* Orange Progress */
.logout-progress-bar {
  width: 60%;
  height: 100%;

  background: #ffaa00;
  border-radius: 20px;

  animation: logoutProgress 1.8s ease-in-out infinite;
}

/* Message */
.logout-message {
  margin-top: 18px;

  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  color: #52627a;
}

/* Dots */
.logout-dots {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  margin-top: 14px;
}

.logout-dots span {
  width: 9px;
  height: 9px;

  border-radius: 50%;
  background: #aec9d1;

  animation: logoutDots 1.4s infinite ease-in-out;
}

.logout-dots span:nth-child(1) {
  animation-delay: 0s;
}

.logout-dots span:nth-child(2) {
  background: #ffaa00;
  animation-delay: 0.2s;
}

.logout-dots span:nth-child(3) {
  animation-delay: 0.4s;
}

/* Progress Animation */
@keyframes logoutProgress {
  0% {
    width: 20%;
  }

  50% {
    width: 85%;
  }

  100% {
    width: 20%;
  }
}

/* Dots Animation */
@keyframes logoutDots {
  0%,
  80%,
  100% {
    transform: scale(0.7);
    opacity: 0.5;
  }

  40% {
    transform: scale(1.2);
    opacity: 1;
  }
}


@media (max-width: 600px) {
  .logout-image {
    width: 90vw;
  }

  .logout-title {
    font-size: 32px;
  }

  .logout-subtitle {
    font-size: 15px;
  }

  .logout-message {
    font-size: 14px;
  }

  .logout-progress {
    height: 11px;
  }
}
</style>
