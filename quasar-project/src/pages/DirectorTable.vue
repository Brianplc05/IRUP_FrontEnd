<template>
  <div
    id="q-app"
    style="min-height: 100vh; position: relative; z-index: 1;"
  >
      <div
        class="row items-center justify-between q-ma-lg q-mb-md bg-white q-pa-sm rounded-borders shadow-1"
        style="border-radius: 10px"
      >
        <div>
          <div class="text-primary text-weight-bold" style="font-size: 30px">
            DIRECTORS & VPS MODULE
          </div>
          <div style="font-size: 18px; color: #333333">
            Incident Report Details
          </div>
        </div>
      </div>

      <q-card-section
        class="row q-mb-sm bg-white q-ma-lg q-pa-md rounded-borders shadow-1"
        style="border-radius: 10px"
      >
        <div
          v-if="loading"
          class="fixed-full flex flex-center column q-gutter-md"
          style="background-color: rgba(255, 255, 255, 0.7); z-index: 9999"
        >
          <q-spinner-ball size="150px" color="primary" />
          <div class="text-subtitle1 text-primary">Please wait...</div>
        </div>

        <q-card-section class="column fit full-width">

          <div class="row items-end justify-end q-gutter-md q-pa-sm">
            <q-input
              v-model="searchContent"
              label="SEARCH "
              dense
              outlined
              rounded
            >
              <template v-slot:append>
                <q-icon name="search" color="info" />
              </template>
            </q-input>
          </div>

            <DirectorTable
            v-show="showTable"
            :rows="filteredDisAll"
            :pagination="{ rowsPerPage: 11 }"
            :columns="disColumns"
            row-key="IRNo"
            :loading="loading"
            :getDirectors="getDirectors"
            />
        </q-card-section>
      </q-card-section>
  </div>
  <img
    src="../assets/OMBRE-GRAY.jpg"
    style="
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
    "
  />
</template>

<script>
import { mapGetters } from "vuex";
import DirectorTab from "../components/DirectorTab.vue";

export default {
  data() {
    return {
      loading: true,
      showTable: false,
      selectedStatus: null,
      searchContent: "",
      disAllDirector: [],
      disColumns: [
        {
          name: "viewIR",
          label: "INCIDENT REPORT DETAILS",
          align: "left",
          field: "id",
        },
        { name: "IRNo", label: "IR NUMBER", align: "left", field: "iRNo" },
        {
          name: "departmentNumber",
          label: "INCIDENT RESPONDER (DEPARTMENT)",
          align: "left",
          field: "department_Description",
        },
        {
          name: "subject",
          label: "SUBJECT OF THE INCIDENT",
          align: "left",
          field: "subjectName",
        },
        // { name: "QA", label: "QA IN CHARGE", align: "left", field: "id" },
        { name: "hrRef", label: "HR REFFERAL", align: "left", field: "id" },
      ],
    };
  },

  computed: {
    ...mapGetters({
      getDirector: "ApplyStore/getDirector",
      getGoogleUser: "ApplyStore/getGoogleUser",
      loggedInUser: "ApplyStore/getUser",
    }),

    filteredDisAll() {
      const { disAllDirector, searchContent } = this;
      let filteredData = [...disAllDirector];
      if (searchContent && typeof searchContent === "string") {
        const query = searchContent.toLowerCase();
        filteredData = filteredData.filter((item) =>
          Object.values(item).some(
            (val) =>
              typeof val === "string" && val.toLowerCase().includes(query)
          )
        );
      }
      return filteredData;
    },
  },

  mounted() {
    setTimeout(() => {
      this.showTable = true;
      this.disAllDirector;
      this.loading = false;
    }, 2000); // Simulating 2 seconds of loading time
  },

  created() {
    this.getDirectors();
  },

  components: {
    DirectorTable: DirectorTab,
  },

  methods: {
    async getDirectors() {
      try {
        await this.$store.dispatch("ApplyStore/disDirector");
        this.disAllDirector = this.getDirector;
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    },

    search() {},

    async selectStatus(option) {
      this.selectedStatus = option;
    },
  },
};
</script>

<style>
/* ///////////////////////////////////////QAHEADER////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

.my-card {
  height: 500px;
  width: 100%;
  margin-bottom: 25px;
}
.filtertab {
  background-color: #0f4d91;
  font-weight: bold;
  border: 0.1em solid #f3f4f7;
  box-shadow: 0 4px 8px rgba(243, 238, 238, 0.1);
  font-style: Arial Black;
}
.IRQHText {
  font-weight: bold;
  font-style: roboto;
  font-family: Arial Black;
  display: flex;
  color: #ffc619;
  font-size: 35px;
  justify-content: center;
}

.spinner {
  display: flex;
  justify-content: center;
  align-content: center;
  margin-top: 100px;
  margin-left: 45%;
}
/* ///////////////////////////////////////TABLE////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

.table-with-border {
  border-bottom: 2em solid hsl(220, 22%, 81%);
  border-collapse: collapse;
  margin-top: 25px;
}
.q-table-container {
  border-radius: 5px;
  overflow: hidden;
}
.q-table td,
.q-table th {
  padding: 8px;
  border: 0.5px solid #ccc;
  text-align: center;
}
.q-table th {
  background-color: #0f4d91;
  color: #fff;
}
.q-table tbody tr:nth-child(odd) {
  background-color: #f4f4f4;
  padding: 8px;
}
.q-table button {
  height: 30px; /* Set your desired height */
  width: 80px; /* Set your desired width */
  border-radius: 5px;
  margin: 0;
  padding: 0;
}

/* ///////////////////////////////////////IRDETAILS////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

.QADialog {
  background-image: url("../assets/BGCORE.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #f4f7fc;
  padding-top: 20px;
  padding-bottom: 40px;
  min-height: 100vh;
}
.contentFormQA {
  border: 2px solid #f0f2f5;
  margin-left: auto;
  margin-right: auto;
  border-radius: 25px;
  padding: 20px;
  background-color: #ffffff;
  width: 1100px;
  height: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.formseparatorYellow {
  background-color: #ffc619;
  height: 2px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.formseparatorBlue {
  background-color: #6b7c93;
  height: 2px;
  margin-top: 5px;
  margin-bottom: 5px;
}

.formseparatorWhite {
  background-color: #fff;
  height: 2px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.QADes {
  font-size: 15px;
  border: 0.1em solid #ffffff;
}

.QAFileDes {
  padding: 8px;
  margin-top: 5px;
  font-size: 15px;
  border: 0.1em solid #003566;
  background-color: #e3f2fd;
}

.IRCON {
  background-color: #ffffff;
  height: 250px;
  width: 550px;
}

.buttonCancelDesign {
  color: #166ecc;
  background-color: rgba(22, 110, 204, 0.1);
  font-size: 15px;
  font-weight: bold;
  margin: 5px;
  box-shadow: #000000;
  border-radius: 20px;
  width: 130px;
  border: 2px solid #166ecc;
}

.buttonSaveDesign {
  border-color: #ffc412;
  font-size: 15px;
  margin: 5px;
  box-shadow: #000000;
  border-radius: 20px;
  font-weight: bold;
  width: 130px;
  border: 2px solid #ffc412;
}

/* .custom-item-section {
  border: 1px solid #d5d7da;
  border-radius: 1px;
  padding: 5px;
}
.DirectorDialog {
  background-color: #ffffff;
  max-height: 100%;
  border: 0.2em solid #f3f4f7;
}
.DirectorIR {
  height: 80px;
  border: 0.2em solid #f3f4f7;
  background-color: #003566;
  border: 0.6em solid #d5d7da;
}
.DirectorText {
  font-weight: bold;
  font-style: roboto;
  display: flex;
  color: #ffc619;
  font-size: 25px;
  justify-content: center;
}
.Directorlist {
  height: 15%;
  width: 100%;
  border: 0.1em solid #cacaca;
  background-color: #003566;
}
.DirectorDes {
  padding: 8px;
  margin-top: 5px;
  width: 98%;
  font-size: 15px;
  border: 0.1em solid #ffffff;
}
.DirectorTextlist {
  font-weight: bold;
  display: flex;
  color: #ffc619;
  font-size: 20px;
  justify-content: center;
}

.DirectorTitlelist {
  height: 40%;
  width: 100%;
  padding: 8px;
  border: 0.1em solid #cacaca;
  background-color: #003566;
}
.DirectorTextlist {
  font-weight: bold;
  display: flex;
  color: #ffc619;
  font-size: 22px;
  justify-content: center;
}
.DirectorDesContent {
  border: 0.1em solid #cacaca;
  margin-top: 5px;
}
.DirectorDesign {
  width: 70%;
  margin: 5px;
  font-size: 15px;
  background-color: #ffffff;
}
.DirectorDesign2 {
  width: 25%;
  margin: 5px;
  font-size: 15px;
  background-color: #ffffff;
}
.DirectorFixDesign {
  width: 99.5%;
  margin: 5px;
  font-size: 15px;
  background-color: #ffffff;
}
.DirectorFileDes {
  padding: 8px;
  margin-top: 5px;
  font-size: 15px;
  border: 0.1em solid #003566;
  background-color: #e3f2fd;
}
.DirectorFixDesign {
  width: 99.5%;
  margin: 5px;
  font-size: 15px;
  background-color: #ffffff;
}
.DirectorIRND {
  font-weight: bold;
  display: flex;
  color: #ffc619;
  font-size: 20px;
  justify-content: center;
}
.DirectorDes1 {
  padding: 8px;
  margin: 5px;
  font-size: 15px;
  border: 0.1em solid #ffffff;
}
.DirectorText {
  font-weight: bold;
  font-style: roboto;
  display: flex;
  color: #ffc619;
  font-size: 30px;
  justify-content: center;
}
.DirectorVGT {
  font-weight: bold;
  display: flex;
  color: #ffc619;
  font-size: 20px;
  justify-content: center;
}
.Directorlist {
  height: 30%;
  width: 100%;
  margin-top: 15px;
  border: 0.1em solid #cacaca;
  background-color: #003566;
} */

/* ///////////////////////////////////////lOST RECOMMENDATION////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

.DirectorRECOM {
  background-color: #ffffff;
  height: 200px; /* You can adjust the units based on your preference, 'vw' for viewport width */
  width: 30%;
  border: 0.2em solid #f3f4f7;
}
.DirectorREC {
  height: 70px;
  border: 0.2em solid #f3f4f7;
  background-color: #003566;
  border: 0.6em solid #d5d7da;
}
.DirectorRECText {
  font-weight: bold;
  font-style: roboto;
  display: flex;
  color: #ffc619;
  font-size: 25px;
  justify-content: center;
}
.Directorfooter-actions {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: white; /* or any color to match the card */
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  border-top: 0.2em solid #d5d7da;
}

/* ///////////////////////////////////////LOADING////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

.centered-card {
  width: 450px;
  height: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #003566;
  border: 0.6em solid #d5d7da;
}

.spinner-container {
  display: flex;
  flex-direction: column;
  color: #dfe8f0;
  align-items: center;
}

.please-wait {
  margin-top: 10px;
  font-style: roboto;
  font-weight: bold;
  font-size: 20px;
  color: #ffc619;
  display: flex;
}
</style>
