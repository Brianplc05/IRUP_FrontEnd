<template>
  <q-layout view="lHh Lpr lFf">
    <q-header style="height: auto; background-color: #003566">
      <q-toolbar class="container q-pa-xs">
        <div class="dis1">
          <q-avatar size="80px" @click="showMenu = true">
            <img v-if="loggedInUser" :src="avatarUrl + loggedInUser.EmployeeCode" />
          </q-avatar>
          <div class="labelhead text-weight-bold" v-if="loggedInUser">
            WELCOME, {{ loggedInUser.FirstName }}
          </div>

          <!-- Q-Menu for the prompt -->
          <q-menu v-model="showMenu">
            <q-card class="custom-card justify-center">
              <div style="margin: 15px">
                <!-- Account Details -->
                <div class="text-primary text-weight-bold q-mb-sm" style="font-size: 20px; color: #002b5c">
                  ACCOUNT DETAILS
                </div>
                <q-separator style="background-color: #f0f2f5; height: 2px; margin: 10px 0 15px 0" />

                <div class="row items-center q-gutter-sm" v-for="(field, index) in accountFields" :key="index">
                  <div class="row items-center">
                    <div class="text-caption q-pa-xs" style="font-size: 15px; color: #737373">
                      <strong>{{ field.label }}: </strong>
                    </div>
                  </div>
                  <div class="text-caption" style="font-size: 15px">
                    <span v-if="loggedInUser" class="text-weight-medium">{{ field.value }}</span>
                  </div>
                </div>
              </div>

              <q-card-actions align="center" class="custom-card-actions">
                <q-btn
                  flat
                  rounded
                  push
                  icon="description"
                  label="View Report List"
                  @click="openReportForm(loggedInUser.EmployeeCode)"
                  class="buttonLogoutDesign1 bg-accent text-black"
                  style="font-weight: bold; width: 60%"
                ></q-btn>

                <q-btn
                  flat
                  rounded
                  push
                  icon="logout"
                  label="LOGOUT"
                  @click="logout"
                  class="buttonLogoutDesign bg-negative text-white"
                  style="font-weight: bold; width: 60%"
                ></q-btn>
              </q-card-actions>
            </q-card>
          </q-menu>
        </div>

        <div class="dis2">
          <q-img src="../assets/IRLogo.png" class="custom-image"></q-img>
          <q-img src="../assets/UERM Logos.png" class="image"></q-img>
        </div>
      </q-toolbar>
    </q-header>

    <q-list>
      <q-item-label> </q-item-label>
    </q-list>

    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- Move Q-Dialog outside the menu -->
    <q-dialog maximized v-model="reportForm" persistent>
      <div class="IRFORM">
        <q-card class="contentForm">
          <q-card-section class="q-mb-sm row items-center justify-between">
            <div class="text-primary text-weight-bold" style="font-size: 25px; color: #002b5c">
              INCIDENT REPORT LIST
            </div>

            <q-btn
              flat
              icon="close"
              style="color: #003566; background-color: rgba(22, 110, 204, 0.1)"
              @click="reportForm = false"
            />
          </q-card-section>

          <!-- Your report list content here -->
          <q-card-section class="q-pa-sm" style="border: 2px solid #e0e0e0">
            <div class="row items-end justify-end q-mb-md q-mt-md">
            <q-space />

            <q-input
              v-model="searchReport"
              label="SEARCH "
              dense
              outlined
              rounded
              class="q-ml-md"
            >
              <template v-slot:append>
                <q-icon name="search" color="info"/>
              </template>
            </q-input>
            </div>

            <div>
              <q-scroll-area style="height: 670px;">
                <q-markup-table class="custom-q-table">
                  <thead>
                    <tr>
                      <th
                        v-for="column in disReportColumns"
                        :key="column.name"
                        class="custom-header"
                      >
                        {{ column.label }}
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr v-for="row in filterDisReport" :key="row.id">
                      <td
                        v-for="column in disReportColumns"
                        :key="column.name"
                        class="custom-cell"
                      >
                        <!-- SUBJECT -->
                        <template v-if="column.field === 'subjectName'">
                          <span class="text-bold text-center text-uppercase">
                            {{ row.subjectName }}
                            <span v-if="row.subjectSpecificExam">
                              - {{ row.subjectSpecificExam }}
                            </span>
                          </span>
                        </template>

                        <!-- VIEW BUTTON -->
                        <template v-else-if="column.field === 'id'">
                          <q-btn
                            flat
                            rounded
                            push
                            @click="viewIReport(row)"
                            :ripple="{ center: true }"
                            icon="description"
                            class="buttonYellowDesign bg-accent text-black shadow-3"
                            style="border-radius: 20px; width: 125px"
                          >
                            <q-tooltip class="bg-info text-white">
                              View Report Details
                            </q-tooltip>
                          </q-btn>

                          <q-dialog maximized v-model="IRDialog" persistent>
                            <div class="QADialog">
                              <q-card class="contentFormQA">
                                  <q-card-section class="q-mb-sm row items-center justify-between">
                                    <div
                                      class="text-secondary text-weight-bold"
                                      style="font-size: 25px; color: #002b5c"
                                    >
                                      INCIDENT REPORT INFORMATION
                                    </div>

                                    <q-btn
                                      flat
                                      icon="close"
                                      style="
                                        color: #003566;
                                        background-color: rgba(22, 110, 204, 0.1);
                                      "
                                      @click="IRDialog = false"
                                      v-close-popup
                                    >
                                      <q-tooltip class="bg-info text-white"> Close Form </q-tooltip>
                                    </q-btn>
                                  </q-card-section>

                                  <q-card-section style="border: 2px solid #6b7c93">
                                    <div class="row q-col-gutter-md q-mx-lg">
                                      <div class="col-6">
                                        <div
                                          class="text-weight-bold"
                                          style="font-size: 15px; color: #03254b"
                                        >
                                          Incident Report Number
                                        </div>

                                        <q-input
                                          rounded
                                          outlined
                                          :model-value="IRQADetailss.iRNo"
                                          disable
                                        />
                                      </div>
                                      <div class="col-6">
                                        <div
                                          class="text-weight-bold"
                                          style="font-size: 15px; color: #03254b"
                                        >
                                          Date Report Created
                                        </div>

                                        <q-input
                                          rounded
                                          outlined
                                          :model-value="FormatDateIR(IRQADetailss.dateTimeCreated)"
                                          disable
                                        />
                                      </div>
                                    </div>

                                    <q-separator class="formseparatorWhite" />

                                    <div class="QADesContent">
                                      <div class="QAFixDesign">
                                        <div class="QADes1">
                                          <div
                                            class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                                          >
                                            General Information
                                          </div>
                                          <div
                                            class="q-mb-sm"
                                            style="font-size: 15px; color: #737373"
                                          >
                                            This section contains essential details regarding the
                                            incident, including the date, time, location,
                                            individuals involved, and the nature of the incident.
                                          </div>
                                          <q-separator class="formseparatorYellow" />

                                          <div class="row q-col-gutter-md q-mx-lg">
                                            <div class="col-6">
                                              <div
                                                class="text-weight-bold"
                                                style="font-size: 15px; color: #03254b"
                                              >
                                                Primary (Department/s)
                                              </div>

                                              <span v-if="!IRQADetailss.primaryDept">
                                                <q-input
                                                  rounded
                                                  outlined
                                                  label="Not Assigned"
                                                  disable
                                                />
                                              </span>
                                              <span v-else
                                                ><q-input
                                                  rounded
                                                  outlined
                                                  :model-value="IRQADetailss.primaryDept"
                                                  disable
                                                />
                                              </span>
                                            </div>

                                            <div class="col-6">
                                              <div
                                                class="text-weight-bold"
                                                style="font-size: 15px; color: #03254b"
                                              >
                                                Secondary (Department/s)
                                              </div>

                                              <span v-if="!IRQADetailss.deptCodeInvDescriptions">
                                                <q-input
                                                  rounded
                                                  outlined
                                                  label="Not Assigned"
                                                  disable
                                                />
                                              </span>
                                              <span v-else>
                                                <q-input
                                                  rounded
                                                  outlined
                                                  autogrow
                                                  :model-value="
                                                    IRQADetailss.deptCodeInvDescriptions
                                                  "
                                                  disable
                                                />
                                              </span>
                                            </div>
                                          </div>

                                          <div class="row q-col-gutter-md q-mx-lg q-mt-xs">
                                            <div class="col-6">
                                              <div
                                                class="text-weight-bold"
                                                style="font-size: 15px; color: #03254b"
                                              >
                                                Subject of the Incident
                                              </div>

                                              <span v-if="IRQADetailss.subjectSpecificExam">
                                                <q-input
                                                  autogrow
                                                  rounded
                                                  outlined
                                                  :model-value="
                                                    IRQADetailss.subjectName +
                                                    ' - ' +
                                                    IRQADetailss.subjectSpecificExam
                                                  "
                                                  disable
                                                />
                                              </span>
                                              <span
                                                v-else-if="
                                                  IRQADetailss.subjectSpecificExam === null
                                                "
                                              >
                                                <q-input
                                                  rounded
                                                  outlined
                                                  :model-value="IRQADetailss.subjectName"
                                                  disable
                                                />
                                              </span>
                                            </div>

                                            <div class="col-6">
                                              <div
                                                class="text-weight-bold"
                                                style="font-size: 15px; color: #03254b"
                                              >
                                                Location of the Incident
                                              </div>

                                              <q-input
                                                rounded
                                                outlined
                                                :model-value="IRQADetailss.subjectLoc"
                                                disable
                                              />
                                            </div>
                                          </div>

                                          <div class="row q-col-gutter-md q-mx-lg q-mt-xs">
                                            <div class="col-6">
                                              <div
                                                class="text-weight-bold"
                                                style="font-size: 15px; color: #03254b"
                                              >
                                                Date of the Incident
                                              </div>

                                              <q-input
                                                rounded
                                                outlined
                                                :model-value="FormatDate(IRQADetailss.subjectDate)"
                                                disable
                                              />
                                            </div>

                                            <div class="col-6">
                                              <div
                                                class="text-weight-bold"
                                                style="font-size: 15px; color: #03254b"
                                              >
                                                Time of the Incident
                                              </div>

                                              <q-input
                                                rounded
                                                outlined
                                                :model-value="FormatTime(IRQADetailss.subjectTime)"
                                                disable
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <q-separator class="formseparatorWhite" />

                                    <div class="QADesContent">
                                      <div class="QAFixDesign">
                                        <div class="QADes1">
                                          <div
                                            class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                                          >
                                            Attached File
                                          </div>

                                          <div
                                            class="q-mb-sm"
                                            style="font-size: 15px; color: #737373"
                                          >
                                            The attached files support the accurate review and
                                            proper documentation of this incident report.
                                          </div>

                                          <q-separator class="formseparatorYellow" />

                                          <div
                                            v-if="
                                              IRQADetailss.subjectFile &&
                                              IRQADetailss.subjectFile.length
                                            "
                                            class="QAFileDes column flex-center"
                                          >
                                            <div
                                              style="
                                                display: flex;
                                                align-items: center;
                                                gap: 8px;
                                                background: #e3f2fd;
                                                padding: 8px;
                                                border-radius: 4px;
                                              "
                                              @click.stop="
                                                viewPDF(
                                                  IRQADetailss.subjectFile,
                                                  IRQADetailss.subjectFileName
                                                )
                                              "
                                            >
                                              <q-icon
                                                name="description"
                                                class="text-h3"
                                                color="red"
                                              ></q-icon>

                                              <div class="text-dark text-left text-subtitle1">
                                                {{ IRQADetailss.subjectFileName }}
                                              </div>
                                            </div>

                                            <q-dialog v-model="pdfDisplayDialog">
                                              <q-card style="width: 90vw; max-width: 1100px">
                                                <div class="bg-info text-white">
                                                  <div class="IRND">UPLOADED PDF FILES</div>
                                                  <q-btn
                                                    icon="close"
                                                    flat
                                                    round
                                                    dense
                                                    @click="pdfDisplayDialog = false"
                                                    class="absolute-top-right"
                                                  />
                                                </div>
                                                <q-card-section>
                                                  <iframe
                                                    v-if="pdfUrl"
                                                    :src="pdfUrl"
                                                    width="100%"
                                                    height="600px"
                                                    style="border: none"
                                                  ></iframe>
                                                </q-card-section>
                                              </q-card>
                                            </q-dialog>
                                          </div>

                                          <div class="QAFileDes column flex-center" v-else>
                                            <div
                                              class="text-subtitle1 items-center text-weight-bold text-dark"
                                            >
                                              <i>~ NO FILE ATTACHED ~</i>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <q-separator class="formseparatorWhite" />

                                    <div class="QADesContent">
                                      <div class="QAFixDesign">
                                        <div class="QADes1">
                                          <div
                                            class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                                          >
                                            Narrative Description of the Incident
                                          </div>
                                          <div
                                            class="q-mb-sm"
                                            style="font-size: 15px; color: #737373"
                                          >
                                            Provided detailed of how the incident transpired,
                                            including the sequence of events, contributing factors,
                                            and individuals involved.
                                          </div>
                                          <q-separator class="formseparatorYellow" />
                                          <div class="q-mx-xl">
                                            <q-input
                                              autogrow
                                              rounded
                                              outlined
                                              :model-value="IRQADetailss.subjectNote"
                                              disable
                                              input-class="q-pa-md"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <q-separator class="formseparatorWhite" />

                                    <div class="QADesContent">
                                      <div class="QAFixDesign">
                                        <div class="QADes1">
                                          <div
                                            class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                                          >
                                            Possible Causes of the Incident
                                          </div>
                                          <div
                                            class="q-mb-sm"
                                            style="font-size: 15px; color: #737373"
                                          >
                                            Possible reason on the perspective of the Informant.
                                          </div>
                                          <q-separator class="formseparatorYellow" />
                                          <div class="q-mx-xl">
                                            <q-input
                                              autogrow
                                              rounded
                                              outlined
                                              :model-value="IRQADetailss.subjectCause"
                                              disable
                                              input-class="q-pa-md"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <q-separator class="formseparatorWhite" />

                                    <div class="QADesContent">
                                      <div class="QAFixDesign">
                                        <div class="QADes1">
                                          <div
                                            class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                                          >
                                            Immediate Response
                                          </div>
                                          <div
                                            class="q-mb-sm"
                                            style="font-size: 15px; color: #737373"
                                          >
                                            Action taken by the concerned department or by the
                                            Informant to ease the incident.
                                          </div>
                                          <q-separator class="formseparatorYellow" />
                                          <div class="q-mx-xl">
                                            <q-input
                                              autogrow
                                              rounded
                                              outlined
                                              :model-value="IRQADetailss.subjectResponse"
                                              disable
                                              input-class="q-pa-md"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </q-card-section>
                                </q-card>
                              </div>
                          </q-dialog>
                        </template>


                        <!-- QA STATUS -->
                        <template v-else-if="column.field === 'qAStatus'">
                          <!-- REJECTED -->
                          <span
                            v-if="row.isReject === false"
                            class="text-bold text-white text-center text-uppercase q-pa-sm"
                            style="background-color: #e67206;"
                          >
                            REJECTED
                          </span>

                          <!-- IN PROGRESS -->
                          <span
                            v-else-if="row.qAStatus === true"
                            class="text-bold text-white text-center text-uppercase q-pa-sm"
                            style="background-color: #098b28;"
                          >
                            IN PROGRESS
                          </span>

                          <!-- CLOSED -->
                          <span
                            v-else
                            class="text-bold text-white text-center text-uppercase q-pa-sm"
                            style="background-color: #fe0000;"
                          >
                            CLOSED
                          </span>
                        </template>

                        <!-- DEFAULT -->
                        <template v-else>
                          {{ row[column.field] }}
                        </template>
                      </td>
                    </tr>
                  </tbody>
                </q-markup-table>
              </q-scroll-area>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </q-dialog>
  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      showMenu: false,
      reportForm: false,
      avatarUrl: process.env.IMAGE_REST_API_URL,
      disReportList: [],
      disReportColumns: [
        {
          name: "subject",
          label: "SUBJECT OF THE INCIDENT",
          align: "left",
          field: "subjectName",
        },
        {
          name: "viewIR",
          label: "INCIDENT REPORT DETAILS",
          align: "left",
          field: "id",
        },
        {
          name: "qastatus",
          label: "INCIDENT REPORT STATUS",
          align: "left",
          field: "qAStatus",
        },
      ],
      searchReport: "",
      IRDialog: false,
      IRQADetailss: [],
      pdfDisplayDialog: false,
    };
  },

  computed: {
    ...mapGetters({
      loggedInUser: "ApplyStore/getUser",
      getList: "ApplyStore/getList",
      getQACon: "ApplyStore/getQACon",
    }),

    accountFields() {
      if (!this.loggedInUser) return [];
      return [
        { label: "Employee Number", value: this.loggedInUser.EmployeeCode },
        { label: "Full Name", value: this.loggedInUser.FullName },
        { label: "Department", value: this.loggedInUser.Department_Description }
      ];
    },

    filterDisReport() {
      const { disReportList, searchReport } = this;
      if (!searchReport || typeof searchReport !== "string") {
        return disReportList;
      }
      const query = searchReport.toLowerCase();
      return disReportList.filter(item =>
        Object.values(item).some(val =>
          typeof val === "string" && val.toLowerCase().includes(query)
        )
      );
    },
  },

  methods: {
    ...mapActions("ApplyStore", ["logoutAction", "googlelogoutAction"]),

    async logout() {
      try {
        const UERMEmail = this.loggedInUser.UERMEmail;
        if (UERMEmail) {
          await this.googlelogoutAction();
          this.$router.push("/google-authlogout");
        } else {
          await this.logoutAction();
          this.$router.push("/LogoutPage");
        }
      } catch (error) {
        console.error("Error logging out:", error);
      }
    },

    async openReportForm(EmployeeCode) {
      this.showMenu = false; // close menu first

      // Wait for DOM update before opening dialog (optional)
      await this.$nextTick();
      this.reportForm = true;

      try {
        const data = {
          userCode: EmployeeCode,
        };
        await this.$store.dispatch("ApplyStore/displayReportList", data);
        this.disReportList = this.getList;
      } catch (error) {
        console.error("Error dispatching addIReport:", error);
      }
    },

    //////////////////////////////////////////////////////////////////////////////////////////////////////

    FormatDateIR(dateTimeCreated) {
      const date = new Date(dateTimeCreated);
      const options = { year: "numeric", month: "long", day: "2-digit" };
      const formattedDate = date
        .toLocaleDateString("en-US", options)
        .toUpperCase()
        .replace(/\s/g, " ");
      return formattedDate;
    },

    FormatDate(SubjectDate) {
      const date = new Date(SubjectDate);
      const options = { year: "numeric", month: "long", day: "2-digit" };
      const formattedDate = date
        .toLocaleDateString("en-US", options)
        .toUpperCase()
        .replace(/\s/g, " ");
      return formattedDate;
    },

    FormatTime(SubjectTime) {
      const date = new Date(SubjectTime);
      let hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";

      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      const formattedTime = `${hours}:${minutes} ${ampm}`;

      return formattedTime;
    },

    viewPDF(subjectFile, subjectFileName) {
      this.pdfUrl = "data:application/pdf;base64," + subjectFile;
      this.pdfDisplayDialog = true;
    },

    async viewIReport(row) {
      try {
        this.IRDialog = true;
        const data = {
          iRNo: row.iRNo,
        };
        const response = await this.$store.dispatch("ApplyStore/disIrp", data);
        this.IRQADetailss = this.getQACon;
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    },


  }
};
</script>

<style>
.container {
  height: auto;
  display: flex;
  justify-content: space-between;
}
.dis1 {
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Align items to the start */
  width: 50%;
  height: 90px;
  cursor: pointer;
  border: 0.5em solid #003566;
}

.labelhead {
  color: #ffc619;
  font-size: 25px;
  margin-left: 15px;
}
/* .clickable-avatar {
  cursor: pointer;
} */
.custom-card {
  width: 480px;
  height: 300px;
  display: flex;
  flex-direction: column;
  border: 1px solid #c3c3c4;
}
.custom-card-actions {
  border-top: 2px solid #f0f2f5;
  margin-top: auto;
}
.col1 {
  margin-top: 10px;
  display: flex;
  color: #0f4d91;
  justify-content: space-between;
}

/* .itemlabelProfile {
  font-weight: bold;
  color: #0c0c0c;
  font-size: 16px;
  margin-top: 5px;
  margin-left: 10px;
  text-align: center;
} */

.itemlabelProfile {
  margin: 0;
  padding: 0;
  font-size: 14px;
}

.item-label {
  font-weight: bold;
  color: #0c0c0c;
  font-size: 16px;
  margin-top: 5px;
  margin-left: 10px;
  text-align: center;
}

.button1 {
  width: 300px;
  font-size: 15px;
  margin: 5px;
  box-shadow: #000000;
  border-radius: 20px;
}

.buttonLogoutDesign {
  border-color: #e53935;
  font-size: 15px;
  margin: 5px;
  box-shadow: #000000;
  border-radius: 20px;
  font-weight: bold;
  width: 130px;
  border: 2px solid #e53935;
}

.buttonLogoutDesign1 {
  border-color: #ffc412;
  font-size: 15px;
  margin: 5px;
  box-shadow: #000000;
  border-radius: 20px;
  font-weight: bold;
  width: 130px;
  border: 2px solid #ffc412;
}


/* --------------------------------------------------------------------------------------------- */
.dis2 {
  width: 225px;
  height: 90px;
  padding: 0 10px; /* Optional: Add padding for spacing */
}
.custom-image {
  width: 85px; /* Set the width as needed */
  height: auto; /* Maintain aspect ratio */
  margin-top: 5px;
}
.image {
  width: 105px; /* Set the width as needed */
  height: auto; /* Maintain aspect ratio */
  margin-left: 12px;
  background-color: aliceblue;
}

/* --------------------------------------------------------------------------------------------- */
.IRFORM {
  background-image: url("../assets/BGCORE.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #f4f7fc;
  padding-top: 40px;
  padding-bottom: 60px;
  min-height: 100vh;
}

/* ///////////////////////////////////////TABLE////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

.q-table-scroll-wrapper {
  max-height: 480px; /* Limit height */
  overflow-y: auto; /* Enable vertical scrolling */
  overflow-x: hidden;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* Customizing the scrollbar */
.q-table-scroll-wrapper::-webkit-scrollbar {
  width: 10px; /* Width of the scrollbar */
}

.q-table-scroll-wrapper::-webkit-scrollbar-track {
  background: #f4f4f4; /* Background of the scrollbar track */
}

.q-table-scroll-wrapper::-webkit-scrollbar-thumb {
  background: #0f4d91; /* Scrollbar color */
  border-radius: 10px; /* Rounded corners for the scrollbar */
}

.q-table-scroll-wrapper::-webkit-scrollbar-thumb:hover {
  background: #083d73; /* Darker blue on hover */
}

.my-custom-scroll .q-table__middle {
  max-height: 480px;
  overflow-y: auto;
}

/* Retain the table styles */
.q-table td,
.q-table th {
  padding: 8px;
  border: 0.5px solid #ccc;
  text-align: center;
  max-width: 300px; /* Set a maximum width for cells */
  word-wrap: break-word; /* Enable word wrapping */
  white-space: normal; /* Allow the text to wrap to the next line */
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

.buttonYellowDesign {
  font-size: 15px;
  box-shadow: #000000;
  border-radius: 20px;
  font-weight: bold;
  border: 2px solid #ffc412;
}

.buttonRedDesign {
  font-size: 15px;
  box-shadow: #000000;
  border-radius: 20px;
  font-weight: bold;
  border: 2px solid red;
}

.custom-item-section {
  border: 1px solid #ffffff; /* Border style */
  border-radius: 1px; /* Border radius */
}
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

.ReportDialog {
  background-image: url("../assets/BGCORE.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #f4f7fc;
  padding-top: 20px;
  padding-bottom: 40px;
  min-height: 100vh;
}
.contentFormReport {
  border: 2px solid #f0f2f5;
  margin-left: auto;
  margin-right: auto;
  border-radius: 25px;
  padding: 20px;
  background-color: #ffffff;
  width: 1500px;
  height: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.contentFormQARCA {
  border: 2px solid #f0f2f5;
  margin-left: auto;
  margin-right: auto;
  border-radius: 25px;
  padding: 20px;
  background-color: #ffffff;
  width: 1500px;
  height: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.sepBanFootIncident {
  background-color: #6b7c93;
  height: 2px;
  margin-top: 10px;
  margin-bottom: 15px;
}

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
</style>
