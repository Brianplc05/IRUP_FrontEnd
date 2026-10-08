<template>
  <q-layout>
    <q-page-container>
      <q-page class="loading-page">
        <!-- Illustration -->
        <img src="../../assets/LOGIN-IR.png" alt="Loading" class="loading-image" />

        <!-- Loading Text -->
        <div class="loading-content">
          <div class="loading-title">Please wait...</div>

          <div class="loading-subtitle">We're loading your data.</div>

          <!-- Progress Bar -->
          <div class="loading-progress">
            <div class="loading-progress-bar"></div>
          </div>

          <div class="loading-message">This won't take long...</div>

          <!-- Animated Dots -->
          <div class="loading-dots">
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
import { mapGetters } from "vuex";

export default {
  name: "IRLOGIN",

  computed: {
    ...mapGetters({ getUser: "ApplyStore/getUser" }),
  },

  mounted() {
    this.authenticateUser();
  },

  methods: {
    authenticateUser() {
      setTimeout(() => {
        if (this.getUser) {
          this.$router.push("/Main");
        } else {
          this.$router.push("/IRLogin");
        }
      }, 3000);
    },
  },
};
</script>

<style scoped>
/* //////////////// LOGIN //////////////// */

.loading-page {
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
.loading-image {
  width: min(650px, 80vw);
  max-height: 420px;
  object-fit: contain;
  display: block;
}

/* Content */
.loading-content {
  width: min(500px, 80vw);
  text-align: center;
  margin-top: -10px;
}

/* Main title */
.loading-title {
  font-family: 'Poppins', sans-serif;
  font-size: 42px;
  font-weight: 700;
  line-height: 1.1;
  color: #012561;
}

/* Subtitle */
.loading-subtitle {
  margin-top: 8px;

  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  font-weight: 400;
  color: #52627a;
}

/* Progress container */
.loading-progress {
  width: 100%;
  height: 14px;

  margin: 24px auto 0;

  background: #e8edf5;
  border-radius: 20px;
  overflow: hidden;
}

/* Orange progress */
.loading-progress-bar {
  width: 65%;
  height: 100%;

  background: #ffaa00;
  border-radius: 20px;

  animation: loadingProgress 2s ease-in-out infinite;
}

/* Bottom message */
.loading-message {
  margin-top: 18px;

  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  color: #52627a;
}

/* Dots */
.loading-dots {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  margin-top: 14px;
}

.loading-dots span {
  width: 9px;
  height: 9px;

  border-radius: 50%;
  background: #aec9d1;

  animation: dotAnimation 1.4s infinite ease-in-out;
}

.loading-dots span:nth-child(1) {
  animation-delay: 0s;
}

.loading-dots span:nth-child(2) {
  background: #ffaa00;
  animation-delay: 0.2s;
}

.loading-dots span:nth-child(3) {
  animation-delay: 0.4s;
}

/* Progress animation */
@keyframes loadingProgress {
  0% {
    width: 25%;
  }

  50% {
    width: 75%;
  }

  100% {
    width: 25%;
  }
}

/* Dot animation */
@keyframes dotAnimation {
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

/* Responsive */
@media (max-width: 600px) {
  .loading-image {
    width: 90vw;
  }

  .loading-title {
    font-size: 32px;
  }

  .loading-subtitle {
    font-size: 15px;
  }

  .loading-message {
    font-size: 14px;
  }

  .loading-progress {
    height: 11px;
  }
}
</style>
