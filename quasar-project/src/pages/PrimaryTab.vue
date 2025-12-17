<template>
  <div id="q-app" style="position: relative; z-index: 1">
    <div style="height: 100%; width: 100%" class="q-pa-lg">
      <div
        class="row items-center justify-between q-mb-md bg-white q-pa-sm rounded-borders shadow-1"
        style="border-radius: 10px"
      >
        <div>
          <div class="text-primary text-weight-bold" style="font-size: 30px">
            PRIMARY DEPARTMENT MODULE
          </div>
          <div style="font-size: 18px; color: #333333">
            Incident Report Details
          </div>
        </div>
      </div>

      <q-card-section
        class="row q-mb-sm bg-white q-pa-md rounded-borders shadow-1"
        style="border-radius: 10px"
      >
        <div
          v-if="acloading"
          class="fixed-full flex flex-center column q-gutter-md"
          style="background-color: rgba(255, 255, 255, 0.7); z-index: 9999"
        >
          <q-spinner-ball size="150px" color="primary" />
          <div class="text-subtitle1 text-primary">Please wait...</div>
        </div>

        <q-card-section class="column fit full-width">
          <q-toolbar class="bg-transparent q-pa-sx">
            <q-tabs
              v-model="Primarytab"
              shrink
              stretch
              class="bg-grey-1 q-mb-md text-dark q-pa-sm shadow-2"
              style="width: 850px; margin: auto"
              active-color="black"
              indicator-color="transparent"
            >
              <q-tab
                name="actions"
                stack
                :class="['tab-equal', getTabClass('actions')]"
                style="width: 450px"
              >
                <template v-slot:default>
                  <div class="column items-center q-pa-sm q-mr-md">
                    <div>Very Low & Low Risk Incident Reports</div>
                    <div style="font-size: 12px;" class="text-primary">( Corrective Action Required ) </div>
                  </div>
                  <q-badge color="primary" class="q-ml-xl" floating>
                    {{ actionItemsCount }}
                  </q-badge>
                </template>
              </q-tab>

              <q-tab
                  name="rca"
                  stack
                  :class="['tab-equal', getTabClass('rca')]"
                  style="width: 450px"
                >
                  <template v-slot:default>
                    <div class="column items-center q-pa-sm q-mr-md">
                      <div>Moderate, High & Very High Risk Incident Reports</div>
                      <div style="font-size: 12px;" class="text-primary">( RCA & Corrective Action Required ) </div>
                    </div>
                    <q-badge color="primary" class="q-ml-xl" floating>
                      {{ rcaItemsCount }}
                    </q-badge>
                  </template>
                </q-tab>
            </q-tabs>
          </q-toolbar>

          <q-tab-panels
            v-model="Primarytab"
            animated
            class="q-mt-sm tab-panels-bordered rounded-borders bg-warning shadow-4"
          >
            <q-tab-panel name="actions">
              <div class="row items-center justify-between q-mb-md">
                <q-btn-dropdown
                  rounded
                  label="Filter Risk Score"
                  menu-anchor="top right"
                  style="width: 25ch"
                  class="bg-info text-white"
                >
                  <q-list>
                    <q-item
                      v-for="option in actionFilter"
                      :key="option.value"
                      clickable
                      @click="selectAction(option)"
                    >
                      <q-item-section>{{ option.label }}</q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>

                <q-input v-model="searchQueryAction" label="SEARCH " dense outlined rounded>
                  <template v-slot:append>
                    <q-icon name="search" color="info" />
                  </template>
                </q-input>
              </div>

              <ActionPrimaryTab
                v-show="showACTable"
                :rows="filteredPrimaryACT"
                :pagination="{ rowsPerPage: 8 }"
                row-key="IRNo"
                :columns="disACTColumns"
                :acloading="acloading"
                :getPrimaryDeptACT="getPrimaryDeptACT"
              />
            </q-tab-panel>

            <q-tab-panel name="rca">
              <div class="row items-center justify-between q-mb-md">
                <q-btn-dropdown
                  rounded
                  label="Filter Risk Score"
                  menu-anchor="top right"
                  style="width: 25ch"
                  class="bg-info text-white"
                >
                  <q-list>
                    <q-item
                      v-for="option in rcaFilter"
                      :key="option.value"
                      clickable
                      @click="selectRCA(option)"
                    >
                      <q-item-section>{{ option.label }}</q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>

                <q-input v-model="searchQueryRCA" label="SEARCH " dense outlined rounded>
                  <template v-slot:append>
                    <q-icon name="search" color="info" />
                  </template>
                </q-input>
              </div>

              <RCAPrimaryTab
                :rows="filteredPrimaryRCA"
                :pagination="{ rowsPerPage: 8 }"
                row-key="IRNo"
                :columns="disRCAColumns"
                :getPrimaryDeptRCA="getPrimaryDeptRCA"
              />
            </q-tab-panel>
          </q-tab-panels>
        </q-card-section>
      </q-card-section>
    </div>
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
import RCAPrimaryTable from "src/components/RCAPrimary.vue";
import ActionPrimaryTable from "src/components/ActionPrimary.vue";

export default {
  data() {
    return {
      acloading: true,
      showACTable: false,
      Primarytab: "actions",
      searchQueryAction: "",
      selectedAction: null,
      searchQueryRCA: "",
      selectedRCA: null,
      disAllPrimaryDeptRCA: [],
      disRCAColumns: [
        {
          name: "viewIR",
          label: "INCIDENT REPORT DETAILS",
          align: "left",
          field: "id",
        },
        { name: "IRNo", label: "IR NUMBER", align: "left", field: "iRNo" },
        {
          name: "subject",
          label: "SUBJECT OF THE INCIDENT",
          align: "left",
          field: "subjectName",
        },
        { name: "riskGrading", label: "RISK GRADING", align: "left", field: "id" },
        { name: "rcaform", label: "RCA FORM", align: "left", field: "id" },
        {
          name: "rcadetails",
          label: "ROOT CAUSE ANALYSIS (RCA) DETAILS STATUS",
          align: "left",
          field: "id",
        },
      ],
      actionFilter: [
        { label: "VERY LOW RISK", value: 1 },
        { label: "LOW RISK", value: 2 },
      ],

      disAllPrimaryDeptACT: [],
      disACTColumns: [
        {
          name: "viewIR",
          label: "INCIDENT REPORT DETAILS",
          align: "left",
          field: "id",
        },
        { name: "IRNo", label: "IR NUMBER", align: "left", field: "iRNo" },
        {
          name: "subject",
          label: "SUBJECT OF THE INCIDENT",
          align: "left",
          field: "subjectName",
        },
        { name: "riskGrading", label: "RISK GRADING", align: "left", field: "id" },
        {
          name: "actionitem",
          label: "ACTION ITEM FORM",
          align: "left",
          field: "id",
        },
        {
          name: "actiondetails",
          label: "ACTION ITEM COMPLETIONS DETAILS STATUS",
          align: "left",
          field: "id",
        },
      ],

      rcaFilter: [
        { label: "MODERATE RISK", value: 3 },
        { label: "HIGH RISK", value: 4 },
        { label: "VERY HIGH RISK", value: 5 },
      ],
    };
  },

  computed: {
    ...mapGetters({
      getPrimary: "ApplyStore/getPrimary",
    }),

    actionItemsCount() {
      const count = this.disAllPrimaryDeptACT.filter(
        (item) => item.qAStatus
      ).length;
      return count;
    },

    rcaItemsCount() {
      const count = this.disAllPrimaryDeptRCA.filter(
        (item) => item.qAStatus
      ).length;
      return count;
    },

    filteredPrimaryACT() {
      const { disAllPrimaryDeptACT, selectedAction, searchQueryAction } = this;
      let filteredData = [...disAllPrimaryDeptACT];

      if (selectedAction && typeof selectedAction === "object"){
        const { value: actionValue } = selectedAction;
        filteredData = filteredData.filter(
        (item) => item.riskGrading === actionValue)
      }

      if (searchQueryAction && typeof searchQueryAction === "string") {
        const query = searchQueryAction.toLowerCase();
        filteredData = filteredData.filter((item) =>
          Object.values(item).some(
            (val) =>
              typeof val === "string" && val.toLowerCase().includes(query)
          )
        );
      }
      return filteredData;
    },

    filteredPrimaryRCA() {
      const { disAllPrimaryDeptRCA, selectedRCA, searchQueryRCA } = this;
      let filteredData = [...disAllPrimaryDeptRCA];

      if (selectedRCA && typeof selectedRCA === "object"){
        const { value: rcaValue } = selectedRCA;
        filteredData = filteredData.filter(
        (item) => item.riskGrading === rcaValue)
      }

      if (searchQueryRCA && typeof searchQueryRCA === "string") {
        const query = searchQueryRCA.toLowerCase();
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
      this.showACTable = true;
      this.disAllPrimaryDeptACT;
      this.acloading = false;
    }, 2000);
  },

  created() {
    this.getPrimaryDeptACT();
    this.getPrimaryDeptRCA();
  },

  components: {
    RCAPrimaryTab: RCAPrimaryTable,
    ActionPrimaryTab: ActionPrimaryTable,
  },

  methods: {

    async selectAction(option) {
      this.selectedAction = option;
    },

    async selectRCA(option) {
      this.selectedRCA = option;
    },

    async getPrimaryDeptACT() {
      try {
        await this.$store.dispatch("ApplyStore/disPrimaryACT");

        this.disAllPrimaryDeptACT = this.getPrimary;
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    },

    async getPrimaryDeptRCA() {
      try {
        await this.$store.dispatch("ApplyStore/disPrimaryRCA");
        this.disAllPrimaryDeptRCA = this.getPrimary;
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    },

    getTabClass(tabName) {
      return this.Primarytab === tabName ? `${tabName}-active` : "";
    },
  },
};
</script>

<style>
.my-card {
  height: 500px;
  width: 100%;
  margin-bottom: 25px;
}
.IRPrimarytab {
  font-weight: bold;
  font-style: roboto;
  font-family: Arial Black;
  color: #ffc619;
  font-size: 25px;
  width: 30%;
  margin-right: 10px;
  background-color: #083d73;
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

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

.custom-item-section {
  border: 1px solid #ffffff; /* Border style */
  border-radius: 1px; /* Border radius */
}
/* .QADialog {
  background-color: #ffffff;
  max-height: 100%;
  border: 0.2em solid #f3f4f7;
} */
.QADesign {
  width: 70%;
  margin: 5px;
  font-size: 15px;
  background-color: #ffffff;
}
.QADesign2 {
  width: 25%;
  margin: 5px;
  font-size: 15px;
  background-color: #ffffff;
}
.QAFixDesign {
  width: 99.5%;
  margin: 5px;
  font-size: 15px;
  background-color: #ffffff;
}
.QAIRND {
  font-weight: bold;
  display: flex;
  color: #ffc619;
  font-size: 20px;
  justify-content: center;
}
.QAIR {
  height: 85px;
  border: 0.2em solid #f3f4f7;
  background-color: #003566;
  border: 0.6em solid #d5d7da;
}

.QADes {
  padding: 8px;
  margin-top: 5px;
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
.QADes1 {
  padding: 8px;
  margin: 5px;
  font-size: 15px;
  border: 0.1em solid #ffffff;
}
.QAText {
  font-weight: bold;
  font-style: roboto;
  display: flex;
  color: #ffc619;
  font-size: 30px;
  justify-content: center;
}
.QATitlelist {
  height: 40%;
  width: 100%;
  padding: 8px;
  border: 0.1em solid #cacaca;
  background-color: #003566;
}
.QACTTitlelist {
  height: 40%;
  width: 100%;
  padding: 8px;
  border: 0.1em solid #f3f4f7;
  background-color: #f3f4f7;
}

.QAlist {
  height: 30%;
  width: 100%;
  margin-top: 15px;
  border: 0.1em solid #cacaca;
  background-color: #003566;
}
.QATextlist {
  font-weight: bold;
  display: flex;
  color: #ffc619;
  font-size: 22px;
  justify-content: center;
}
.QACTTextlist {
  font-weight: bold;
  display: flex;
  color: #003566;
  font-size: 22px;
  justify-content: center;
}

.QAaaTitlelist {
  height: 40%;
  width: 100%;
  padding: 8px;
  border: 0.1em solid #cacaca;
  background-color: #003566;
}

/* ///////////////////////////////////////ACTION ITEM DETAILS////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

.QCRTG {
  background-color: #ffffff;
  height: 460px; /* You can adjust the units based on your preference, 'vw' for viewport width */
  border: 0.2em solid #f3f4f7;
}
.QARTG {
  height: 75px;
  border: 0.2em solid #f3f4f7;
  background-color: #003566;
  border: 0.6em solid #d5d7da;
}
.QARTGText {
  font-weight: bold;
  font-style: roboto;
  display: flex;
  color: #ffc619;
  font-size: 25px;
}
.QARTGTestlist {
  font-weight: bold;
  display: flex;
  color: #003566;
  font-size: 20px;
  justify-content: center;
  margin-left: 10px;
}
.QARTGLay {
  height: 35px;
  width: 100%;
  margin-top: 10px;
  border: 0.1em solid #cacaca;
  background-color: #003566;
}
.acfooter-actions {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: white; /* or any color to match the card */
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  border-top: 0.2em solid #d5d7da;
}

/* ///////////////////////////////////////ACTION ITEMS////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

.QAACT {
  background-color: #ffffff;
  border: 0.2em solid #f3f4f7;
}
.QAACTHead {
  height: 75px;
  border: 0.2em solid #f3f4f7;
  background-color: #003566;
  border: 0.6em solid #d5d7da;
}
.QAACText {
  font-weight: bold;
  font-style: roboto;
  display: flex;
  color: #ffc619;
  font-size: 25px;
  justify-content: center;
}

.QAACTABLE {
  background-color: #f3f4f7;
  border-top-left-radius: 60px; /* Border radius */
  border-left: 2em solid #003566;
  padding: 20px; /* Optional padding */
  font-size: 5px;
  font-style: Arial Black;
  width: 50%;
}
.QAACTabtext {
  font-size: 15px;
}

.QAACStatus {
  height: 75px;
  border: 0.2em solid #f3f4f7;
  background-color: #003566;
  border: 0.6em solid #d5d7da;
}
.QAACSText {
  font-weight: bold;
  font-style: roboto;
  display: flex;
  color: #ffc619;
  font-size: 25px;
  justify-content: center;
}
.QAaaTitlelist {
  height: 40%;
  width: 100%;
  padding: 8px;
  border: 0.1em solid #cacaca;
  background-color: #003566;
}
.QATextlist {
  font-weight: bold;
  display: flex;
  color: #ffc619;
  font-size: 22px;
  justify-content: center;
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

.borderDesign {
  margin-top: 15px;
}
/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

.non-transparent-dialog {
  background-color: white; /* Change to the desired background color */
}

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

.actions-active {
  background-color: #ffc619; /* mint green */
  font-weight: bold;
  color: black;
}

.rca-active {
  background-color: #ffc619; /* mint green */
  font-weight: bold;
  color: black;
}

.tab-panels-bordered {
  border-top: 5px solid #003566;
  border-radius: 0 0 8px 8px;
  padding-top: 12px;
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

.QADialogAction {
  background-image: url("../assets/BGCORE.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #f4f7fc;
  padding-top: 20px;
  padding-bottom: 40px;
  min-height: 100vh;
}
.contentFormAction {
  border: 2px solid #f0f2f5;
  margin-left: auto;
  margin-right: auto;
  border-radius: 25px;
  padding: 20px;
  background-color: #ffffff;
  width: 1700px;
  height: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.contentFormRCA {
  border: 2px solid #f0f2f5;
  margin-left: auto;
  margin-right: auto;
  border-radius: 25px;
  padding: 20px;
  background-color: #ffffff;
  width: 1800px;
  height: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.contentFormRCApproved {
  border: 2px solid #f0f2f5;
  margin-left: auto;
  margin-right: auto;
  border-radius: 25px;
  padding: 20px;
  background-color: #ffffff;
  width: 1800px;
  height: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}


.sepBanFootIncident {
  background-color: #6b7c93;
  height: 2px;
  margin-top: 10px;
  margin-bottom: 15px;
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

.fishboneDesign {
  border: 2px solid #ccc;
  border-radius: 20px;
}

/* ///////////////////////////////////////ACCOMPLISHMENT STATUS////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

.PrimaryAccomStatus {
  height: 260px;
  width: 500px;
}


</style>
