<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="q-ma-xs">
        <q-btn
          flat
          dense
          round
          color="white"
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-space />

        <!-- Date and Time -->
        <div class="text-white text-weight-bold text-right q-mr-md">
          <div>{{ topLine }}</div>
          <div>{{ bottomLine }}</div>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="custom-drawer"
    >
      <q-list v-if="isUserLoggedIn">
        <q-item class="custom-item q-ma-md q-pa-xs shadow-7">
          <q-card-section class="custom-item" style="border: 2px solid #e0e0e0;">
            <q-avatar size="100px">
              <img
                :src="avatarUrl + loggedInUser.EmployeeCode"
                style="border: 3px solid #ffc412;"
              />
            </q-avatar>

            <span class="item-lab q-pt-md" v-if="loggedInUser">
              {{ loggedInUser.FullName }}
            </span>

            <span class="item-label1 text-center" v-if="loggedInUser">
              {{ formatDepartment(loggedInUser.Department_Description) }}
            </span>
          </q-card-section>
        </q-item>
      </q-list>

      <q-card-section class="q-pa-md q-ma-md q-gutter-xs text-white">
        <q-item-label class="text-primary menuLabel text-bold">MAIN MENU</q-item-label>

        <q-separator size="3px" class="q-ma-sm"></q-separator>

        <EssentialLink
          v-for="item in getAccessModule"
          :key="item.title"
          :label="item.label"
          :title="item.title"
          :link="item.link"
          :icon="item.icon"
          :isSelected="selectedLink === item.link"
          @select="navigateTo(item.link)"
        />
      </q-card-section>

      <footer class="footer q-pa-sm">
        <div class="footer-content">
          <q-btn
            v-if="isUserLoggedIn"
            flat
            rounded
            push
            icon="exit_to_app"
            label="LOGOUT"
            @click="logout"
            class="logout-btn bg-accent text-primary q-pa-xs"
          />
        </div>
      </footer>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import EssentialLink from "../components/EssentialLink.vue";

export default {
  name: "MainLayout",

  data() {
    return {
      FullName: "",
      topLine: "",
      bottomLine: "",
      leftDrawerOpen: false,
      selectedLink: null,
      showTable: true,
      // list: this.getList(),
      // hrList: this.getHR(),
      avatarUrl: process.env.IMAGE_REST_API_URL,
    };
  },

  components: {
    EssentialLink,
  },

  created() {
    const savedModules = localStorage.getItem("accessModules");
    if (savedModules) {
      // Commit the saved modules to the Vuex state
      this.$store.commit("ApplyStore/SET_MODULES", JSON.parse(savedModules));
    }

    // Initialize authentication
    this.$store.dispatch("ApplyStore/initAuth").catch((error) => {
      console.error("Error initializing authentication:", error);
    });

    const savedLink = localStorage.getItem("selectedLink");
    if (savedLink) {
      this.selectedLink = savedLink;
      this.$router.push(savedLink.replace("#", ""));
    }
  },

  computed: {
    ...mapGetters({
      loggedInUser: "ApplyStore/getUser",
      getAccessModule: "ApplyStore/getAccessModule",
    }),

    isUserLoggedIn() {
      return !!this.loggedInUser && !!this.loggedInUser.FullName;
    },
  },

  mounted() {
    this.updateDateTime()
    this.interval = setInterval(this.updateDateTime, 1000)
  },

  beforeUnmount() {
    clearInterval(this.interval)
  },


  methods: {
    ...mapActions("ApplyStore", ["logoutAction"]),

    formatDepartment(department) {
      if (!department) {
        return "";
      }

      return department
        .toLowerCase()
        .replace(/\b\w/g, char => char.toUpperCase());
    },

    updateDateTime() {
      const now = new Date()
      const weekday = now
        .toLocaleDateString("en-US", { weekday: "short" })
        .toUpperCase()
      const time = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })
      const [timePart, ampm] = time.split(" ")
      const date = now
        .toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
        .toUpperCase()

      this.topLine = `${weekday} | ${timePart} | ${ampm}`
      this.bottomLine = date
    },

    async logout() {
      try {
        await this.logoutAction();
        localStorage.removeItem("accessModules"); // Clear the saved modules on logout
        this.$router.push("/IRLogout");
      } catch (error) {
        console.error("Error logging out:", error);
      }
    },

    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },

    navigateTo(link) {
      this.selectedLink = link;
      localStorage.setItem("selectedLink", link); // Save the selected link to local storage
      this.showTable = false;
      this.$router.push(link.replace("#", ""));
    },
  },
};
</script>

<style>
.custom-drawer {
  background-color: #f9fafc;
}

.custom-item {
  border: 3px solid #003566;
  background: linear-gradient(135deg, #003566, #0f4d91);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.item-lab {
  font-size: 18px;
  color: #f9fafc;
  font-weight: bold;
}

.item-label1 {
  color: #d9d9d9;
}

.menuLabel{
  font-size: 15px;
}

/* /...................................FOOTER.............................................../ */

.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #fff; /* optional, to separate from page background */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 10;
  border-top: 3px solid #003566;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px; /* adds spacing between button and image */
}

.logout-btn {
  border-radius: 10px;
  width: 250px;
  font-weight: bold;
  border: 2px solid #ffc412;
  font-size: 15px;
}

.footer-logo {
  width: 100px;
  height: auto;
}

</style>
