<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-space />
        <q-btn
          v-if="isUserLoggedIn"
          push
          class="bg-negative text-white"
          icon="logout"
          label="LOGOUT"
          @click="logout"
        />
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
              <div class="column items-center">
                <q-avatar size="120px">
                  <img :src="avatarUrl + loggedInUser.EmployeeCode" />
                </q-avatar>
              </div>
              <p class="item-label" v-if="loggedInUser">
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
        <img
          src="../assets/UERM Logos.png"
          class="q-ma-s"
          style="width: 45%; height: 40%"
        />
        <img
          src="../assets/IRLogo.png"
          class="q-ma-s"
          style="width: 25%; height: 40%; margin-top: 5%"
        />
      </footer>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>

  <footer class="footer"></footer>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import EssentialLink from "../components/EssentialLink.vue";

export default {
  name: "MainLayout",

  data() {
    return {
      FullName: "",
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

  methods: {
    ...mapActions("ApplyStore", ["logoutAction"]),

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
  background-color: #ececec;
  color: #003566;
  border: 1px solid #c9c9c9;
}
.custom-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5%;
  background-color: #003566;
  border: 0.2em solid #f6fbff;
}

.item-label {
  font-weight: bold;
  font-family: Arial Black;
  color: #ffc619;
  font-size: 20px;
  margin-top: 10px;
  text-align: center;
}
.item-label1 {
  font-style: bold;
  font-family: "Roboto", sans-serif;
  color: #ffc619;
  font-size: 12px;
  margin-top: 10px;
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
  border-bottom: 15px solid #ffc619;
  padding: 10px;
  text-align: center;
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
