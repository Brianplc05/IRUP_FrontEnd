<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="q-ma-xs">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-space />

        <!-- Date and Time -->
        <div class="text-accent text-weight-bold text-right q-mr-md">
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
      <q-list v-if="isUserLoggedIn" class="custom-list">
        <q-item class="custom-item">
          <q-item-section>
            <q-item-label>
              <div class="column items-center q-mt-x">
                <q-avatar size="120px">
                  <img
                    :src="avatarUrl + loggedInUser.EmployeeCode"
                    style="border: 2px solid #6b7c93"
                  />
                </q-avatar>
              </div>
              <p class="item-lab" v-if="loggedInUser">
                {{ loggedInUser.FullName }}
              </p>
              <p class="item-label1" v-if="loggedInUser">
                {{ loggedInUser.Department_Description }}
              </p>
            </q-item-label>
          </q-item-section>
        </q-item>

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
        <!-- <q-expansion-item class="custom-expansion-item">
      <template v-slot:header>
        <div class="icon-above-text">
          <q-icon name="dvr" size="35px" />
          <div>HR MODULE</div>
        </div>
      </template>
      <EssentialLink
        v-for="hrItem in hrList"
        :key="hrItem.title"
        :title="hrItem.title"
        :link="hrItem.link"
        :icon="hrItem.icon"
        :isSelected="selectedLink === hrItem.link"
        @select="navigateTo(hrItem.link)"
      />
    </q-expansion-item> -->
      </q-list>

      <footer class="footer">
        <div class="footer-content">
          <q-btn
            v-if="isUserLoggedIn"
            flat
            rounded
            push
            icon="logout"
            label="LOGOUT"
            @click="logout"
            class="buttonLogoutDesign bg-negative text-white"
            style="font-weight: bold; width: 200%"
          />

          <img
            src="../assets/FINALPOST.png"
            alt="Footer Logo"
            class="footer-logo"
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

    // getList() {
    //   return [
    //     {
    //       title: "DASHBOARD",
    //       icon: "dashboard",
    //       link: "#/Dashboard",
    //     },
    //     {
    //       title: "REPORT MODULE",
    //       icon: "summarize",
    //       link: "#/ReportTable",
    //     },
    //     {
    //       title: "ASSISTANT QA MODULE",
    //       icon: "inventory",
    //       link: "#/AssistantQATable",
    //     },
    //     {
    //       title: "QA MODULE",
    //       icon: "assignment",
    //       link: "#/QATable",
    //     },
    //     {
    //       title: "DIRECTOR MODULE",
    //       icon: "article",
    //       link: "#/DirectorTable",
    //     },
    //     {
    //       title: "AUDIT MODULE",
    //       icon: "assessment",
    //       link: "#/AuditTable",
    //     },
    //     {
    //       title: "HR ADMIN REPORT",
    //       icon: "chrome_reader_mode",
    //       link: "#/HRTable",
    //     },
    //   ];
    // },

    // getHR() {
    //   return [
    //     // {
    //     //   title: 'EMPLOYEE OFFENSES',
    //     //   icon: 'summarize',
    //     //   link: '#/EmployeeTab',
    //     // },
    //   ];
    // },

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
  background-color: #003566;
  color: #fff;
}
.custom-item {
  display: flex;
  flex-direction: column;
  border-radius: 10%;
  align-items: center;
  margin: 5%;
  height: auto;
  background-color: #fff;
  border: 0.3em solid #ffc412;
}

.item-lab {
  font-weight: bold;
  color: #003566;
  font-size: 20px;
  margin-top: 20px;
  text-align: center;
}

.item-label1 {
  font-weight: bold;
  color: #333333;
  font-size: 13px;
  text-align: center;
}

.essential-link {
  color: inherit; /* Ensure link color matches theme */
  text-decoration: none; /* Remove default underline */
  font-size: 15px;
}
/* /...................................ICON.............................................../ */
.icon-above-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-left: 93px;
  margin-right: 54px;
}

.icon-above-text .q-icon {
  font-size: 32px; /* Adjust the icon size as needed */
}

/* /...................................FOOTER.............................................../ */

.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 16px;
  background-color: #003566; /* optional, to separate from page background */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 10;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px; /* adds spacing between button and image */
}

.logout-btn {
  border-radius: 20px;
  width: 250px;
  font-weight: bold;
}

.footer-logo {
  width: 100px;
  height: auto;
  margin-top: 6px;
}

</style>
