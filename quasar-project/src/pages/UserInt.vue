<template>
  <div style="position: relative; z-index: 1">
    <div style="height: 100%; width: 100%">
      <div
        class="rowContent row justify-center q-pa-xl"
        style="border: 2px solid #003566"
      >
        <div
          class="text-primary text-weight-bold"
          style="font-size: 60px; color: #020101"
        >
          INCIDENT REPORT
        </div>

        <div class="text2">
          <p>
            Welcome to the Incident Report Management System! <br />This
            platform empowers everyone at the Medical Center to contribute to a
            safer, more efficient environment by reporting incidents openly and
            without fear of retaliation. Your reports are essential for
            identifying opportunities to improve our systems and processes,
            ensuring better outcomes for all. Together, we can create a culture
            of accountability, collaboration, and continuous improvement.
            Sensitive information shall be handled with utmost confidentiality
            in accordance with laws.
          </p>
        </div>

        <q-btn
          flat
          rounded
          push
          label="CREATE REPORT"
          @click="basic = true"
          class="buttonSaveDesign bg-accent q-pa-sm"
          style="font-weight: bold; width: 40%"
        />
      </div>
    </div>

    <!-- ////////////////////////////////////////////////////CREATE INCIDENT ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->

    <q-dialog v-model="basic">
      <q-card class="TOG">
        <q-card-section class="q-mb-sm row items-center justify-between">
          <div
            class="text-primary text-weight-bold"
            style="font-size: 25px; color: #002b5c"
          >
            INCIDENT REPORT FORM
          </div>
          <q-btn
            flat
            icon="close"
            style="color: #166ecc; background-color: rgba(22, 110, 204, 0.1)"
            @click="IRDialog = false"
            v-close-popup
          />
        </q-card-section>

        <q-separator class="sepDesign" />

        <div class="q-pa-sm q-mx-xl">
          <p style="text-align: justify; font-size: 17px">
            By submitting this incident report, the informant acknowledges that
            the information provided is accurate and complete to the best of
            their knowledge.
          </p>
        </div>

        <q-separator class="sepDesign" />

        <q-card-actions align="right">
          <q-btn
            flat
            rounded
            push
            label="Accept"
            @click="Formaccept"
            class="buttonSaveDesign bg-accent"
            style="font-weight: bold; width: 30%"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- ////////////////////////////////////////////////////FORM///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
    <q-dialog maximized v-model="form" persistent>
      <div class="IRFORM">
        <q-card class="contentForm">
          <q-card-section class="q-mb-sm row items-center justify-between">
            <div
              class="text-primary text-weight-bold"
              style="font-size: 25px; color: #002b5c"
            >
              INCIDENT REPORT FORM
            </div>

            <q-btn
              flat
              icon="close"
              style="color: #003566; background-color: rgba(22, 110, 204, 0.1)"
              @click="clearIRForm"
              v-close-popup
            />
          </q-card-section>

          <q-separator class="sepBanFoot" />

          <q-card-section style="display: none">
            <div class="text-subtitle2 text-weight-bold q-mb-sm">
              INFORMANT DETAILS
            </div>
            <div class="row q-col-gutter-md">
              <div class="col-6">
                <q-input
                  square
                  outlined
                  v-model="employeeCode"
                  label="Employee Number"
                />
              </div>
              <div class="col-6">
                <q-input
                  square
                  outlined
                  v-model="deptCode"
                  label="Department Number"
                />
              </div>
            </div>
          </q-card-section>

          <q-card-section>
            <div class="text-subtitle1 text-primary text-weight-bold q-mb-sm">
              General Information
            </div>

            <div class="q-mb-sm" style="font-size: 15px; color: #737373">
              <b>This section contains essential details regarding the incident,
              including the date, time, location, individuals involved, and the
              nature of the incident.
              </b>
            </div>

            <q-separator class="sepDesign" />

            <div class="row q-col-gutter-md q-mx-lg">
              <div class="col-6">
                <q-select
                  use-input
                  rounded
                  outlined
                  clearable
                  v-model="SubjectCode"
                  :options="disSubName"
                  @filter="FilterSubName"
                  label="REPORTABLE INCIDENT"
                  emit-value
                  map-options
                  :option-value="(option) => option"
                  :option-label="(option) => option.subjectName"
                />

                <q-select
                  v-if="shouldShowSpecificExamples"
                  use-input
                  rounded
                  outlined
                  clearable
                  label="PARTICULAR INCIDENT"
                  v-model="SubjectChilCode"
                  :options="filteredRiskChildren"
                  emit-value
                  map-options
                  :option-value="(option) => option"
                  :option-label="(option) => option.subjectSpecificExam"
                  class="q-mt-sm"
                />

                <q-input
                  rounded
                  outlined
                  v-model="SubjectLoc"
                  label="Incident Location"
                  class="text-uppercase q-mt-sm"
                />

                <q-select
                  use-input
                  rounded
                  outlined
                  clearable
                  class="q-mt-sm"
                  label="AREA"
                  v-model="DivisionCode"
                  :options="disDivision"
                  emit-value
                  map-options
                  :option-value="(option) => option.divisionCode"
                  :option-label="(option) => option.division"
                />

                <q-item
                  style="border: 0.2em solid #003566; margin-top: 15px"
                  v-if="
                    SubjectCode && this.SubjectCode.subjectCode !== 'others'
                  "
                >
                  <q-item-section>
                    <q-item-label>
                      <b>Description :</b> {{ selectedDescription }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </div>

              <div class="col-6">
                <q-input
                  v-model="SubjectDate"
                  rounded
                  outlined
                  clearable
                  label="DATE OF THE INCIDENT"
                  @click="showDatePicker = true"
                >
                  <template v-slot:append>
                    <q-icon
                      name="event"
                      class="cursor-pointer"
                      @click="showDatePicker = true"
                    />
                  </template>
                </q-input>
                <q-dialog v-model="showDatePicker">
                  <q-card>
                    <q-card-section>
                      <q-date
                        v-model="SubjectDate"
                        @input="updateSubjectDate"
                        :options="dateBeforeOrToday"
                      />
                    </q-card-section>
                  </q-card>
                </q-dialog>


                <q-input
                  v-model="SubjectTime"
                  rounded
                  outlined
                  clearable
                  class="q-mt-sm"
                  label="TIME OF THE INCIDENT"
                  @click="showTimePicker = true"
                >
                  <template v-slot:append>
                    <q-icon
                      name="schedule"
                      class="cursor-pointer"
                      @click="showTimePicker = true"
                    />
                  </template>
                </q-input>
                <q-dialog v-model="showTimePicker">
                  <q-card>
                    <q-card-section class="q-pa-sm">
                      <q-time
                        v-model="SubjectTime"
                        now-btn
                      ></q-time>
                    </q-card-section>
                  </q-card>
                </q-dialog>

                <q-input
                  v-if="
                    SubjectCode && this.SubjectCode.subjectCode === 'others'
                  "
                  v-model="SubjectBriefDes"
                  label="BRIEF DESCRIPTION OF THE INCIDENT"
                  use-input
                  rounded
                  outlined
                  autogrow
                  class="q-mt-sm"
                />
              </div>
            </div>
          </q-card-section>

          <q-card-section>
            <div class="text-subtitle1 text-primary text-weight-bold q-mb-sm">
              Upload Files
            </div>
            <div class="q-mb-sm" style="font-size: 15px; color: #737373">
              <b>Kindly upload all the necessary files relevant to this report to
              ensure proper documentation and facilitate accurate review of the
              incident.</b>
            </div>

            <q-separator class="sepDesign" />

            <div class="row q-col-gutter-md q-mx-xl">
              <!-- QFile sa kaliwa -->
              <div class="col">
                <q-file
                  rounded
                  outlined
                  bottom-slots
                  counter
                  v-model="SubjectFile"
                  :label="SubjectFile ? SubjectFile.name : 'UPLOAD FILE'"
                  accept="application/pdf"
                  @update:model-value="validateFile"
                  class="full-width"
                >
                  <template v-slot:prepend>
                    <q-icon name="picture_as_pdf" color="primary" />
                  </template>

                  <template v-slot:append>
                    <q-icon
                      name="close"
                      @click.stop.prevent="clearFile"
                      class="cursor-pointer"
                    />
                  </template>

                  <template v-slot:hint>
                    <p v-if="errorMessage" class="text-negative">
                      {{ errorMessage }}
                    </p>
                    <p class="text-positive" v-else>10 MB FILE ONLY</p>
                  </template>
                </q-file>
              </div>

              <!-- Icon sa kanan -->
              <div style="margin-top: 10px">
                <q-icon
                  v-if="SubjectFile"
                  name="visibility"
                  @click.stop="viewPDF"
                  class="cursor-pointer text-h4"
                  color="primary"
                />
                <q-icon
                  v-else
                  name="disabled_visible"
                  class="cursor-pointer text-h4"
                  color="primary"
                />
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
          </q-card-section>

          <q-card-section>
            <div class="text-subtitle1 text-primary text-weight-bold q-mb-sm">
              Narrative Description of the Incident
            </div>
            <div class="q-mb-sm" style="font-size: 15px; color: #737373">
              <b>Narrate exactly how the incident happened (e.g. sequence of
              events, factors leading to the incident, other persons involved,
              etc.). Be specific as possible. Statement may be made in English
              or Filipino.
              </b>
            </div>
            <q-separator class="sepDesign" />

            <div class="row q-col-gutter-md q-mx-xl">
              <div class="col">
                <q-input
                  autogrow
                  rounded
                  outlined
                  v-model="SubjectNote"
                  label="NOTE"
                />
              </div>
            </div>
          </q-card-section>

          <q-card-section>
            <div class="text-subtitle1 text-primary text-weight-bold q-mb-sm">
              Possible Causes of the Incident
            </div>
            <div class="q-mb-sm" style="font-size: 15px; color: #737373">
              <b>Possible reason on the perspective of the Informant.</b>
            </div>
            <q-separator class="sepDesign" />

            <div class="row q-col-gutter-md q-mx-xl">
              <div class="col">
                <q-input
                  autogrow
                  rounded
                  outlined
                  v-model="SubjectCause"
                  label="NOTE"
                />
              </div>
            </div>
          </q-card-section>

          <q-card-section style="margin-bottom: 30px">
            <div class="text-subtitle1 text-primary text-weight-bold q-mb-sm">
              Immediate Response
            </div>
            <div class="q-mb-sm" style="font-size: 15px; color: #737373">
              <b>Action taken by the concerned department or by the Informant to
              ease the incident.</b>
            </div>
            <q-separator class="sepDesign" />

            <div class="row q-col-gutter-md q-mx-xl">
              <div class="col">
                <q-input
                  autogrow
                  rounded
                  outlined
                  v-model="SubjectResponse"
                  label="NOTE"
                />
              </div>
            </div>
          </q-card-section>

          <q-separator class="sepBanFoot" />

          <q-card-actions align="right">
            <q-btn
              flat
              rounded
              push
              @click="handleFormSubmit"
              label="SAVE"
              class="buttonSaveDesign bg-accent text-black"
              style="font-weight: bold; width: 18%"
            ></q-btn>
          </q-card-actions>
        </q-card>
      </div>
      <!-- ////////////////////////////////////////////////////FORM///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->

      <q-dialog v-model="confirm" persistent>
        <q-card class="IRCON">
          <q-card-section class="q-mb-sm row items-center justify-between">
            <div
              class="text-secondary text-weight-bold"
              style="font-size: 25px; color: #002b5c"
            >
              CONFIRM
            </div>
            <q-btn
              flat
              icon="close"
              style="color: #166ecc; background-color: rgba(22, 110, 204, 0.1)"
              @click="confirm = false"
              v-close-popup
            />
          </q-card-section>

          <q-separator class="sepDesign" />

          <q-card-actions align="center" class="q-mt-md column items-center">
            <div class="q-mb-sm" style="font-size: 17px; color: #000000">
              Would you like to save this Incident Report?
            </div>

            <div class="row q-gutter-xxl; justify-center">
              <q-btn
                flat
                rounded
                push
                label="NO"
                class="buttonCancelDesign text-info"
                @click="confirm = false"
              />

              <q-btn
                flat
                rounded
                push
                label="YES"
                class="buttonSaveDesign bg-accent text-black"
                @click="SubmitForm"
              />
            </div>
          </q-card-actions>
        </q-card>
      </q-dialog>

      <!-- ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->

      <!-- <q-dialog
        v-model="showLoading"
        persistent
        content-class="non-transparent-dialog"
      >
        <q-card class="centered-card">
          <q-card-section>
            <div class="spinner-container">
              <q-spinner-ios size="100px"></q-spinner-ios>
              <div class="please-wait">
                SAVING INCIDENT REPORT, PLEASE WAIT...
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog> -->

      <q-dialog v-model="showLoading" persistent maximized>
        <div
          class="fullscreen flex flex-center column q-gutter-md"
          style="background-color: rgba(0, 0, 0, 0.85)"
        >
          <q-spinner-ios size="150px" color="white" />

          <div class="text-center text-subtitle1 text-white">
            Incident report has been successfully saved.
            <br />
            <span class="text-italic text-accent">Please wait...</span>
          </div>
        </div>
      </q-dialog>

      <!-- //////////////////////////////////////////////////////PRINT/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->

      <q-dialog v-model="print" persistent>
        <q-card class="IRCON">
          <q-card-section class="q-mb-sm row items-center justify-between">
            <div
              class="text-secondary text-weight-bold"
              style="font-size: 25px; color: #002b5c"
            >
              PRINT
            </div>
            <q-btn
              flat
              icon="close"
              style="color: #166ecc; background-color: rgba(22, 110, 204, 0.1)"
              @click="printClose"
              v-close-popup
            />
          </q-card-section>
          <q-separator class="sepDesign" />
          <q-card-actions align="center" class="q-mt-md column items-center">
            <div class="q-mb-sm" style="font-size: 17px; color: #000000">
              Would you like to print this Incident Report?
            </div>
            <div class="row q-gutter-xxl; justify-center">
              <q-btn
                flat
                rounded
                push
                label="NO"
                class="buttonCancelDesign text-info"
                @click="printClose"
              />

              <q-btn
                flat
                rounded
                push
                label="YES"
                class="buttonSaveDesign bg-accent text-black"
                @click="downloadPDF"
              /></div
          ></q-card-actions>
        </q-card>
      </q-dialog>

      <!-- ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->

      <q-dialog
        v-model="pdfdialog"
        persistent
        :maximized="maximizedToggle"
        transition-show="slide-up"
        transition-hide="slide-down"
        @show="generatePDF"
        full-width
        full-height
        class="no-scroll-dialog"
      >
        <q-card class="bg-white text-primary no-scroll-content">
          <q-bar style="background-color: rgba(22, 110, 204, 0.1)">
            <q-space></q-space>
            <q-btn
              dense
              flat
              icon="minimize"
              @click="maximizedToggle = false"
              :disable="!maximizedToggle"
            >
              <q-tooltip v-if="maximizedToggle" class="bg-info text-white"
                >Minimize</q-tooltip
              >
            </q-btn>
            <q-btn
              dense
              flat
              icon="crop_square"
              @click="maximizedToggle = true"
              :disable="maximizedToggle"
            >
              <q-tooltip v-if="!maximizedToggle" class="bg-info text-white"
                >Maximize</q-tooltip
              >
            </q-btn>
            <q-btn dense flat icon="close" @click="onReset" v-close-popup>
              <q-tooltip class="bg-info text-white">Close</q-tooltip>
            </q-btn>
          </q-bar>

          <q-card-section class="q-mb-sm row items-center justify-between">
            <div
              class="text-secondary text-weight-bold"
              style="font-size: 25px; color: #002b5c"
            >
              PDF INCIDENT REPORT FORM
            </div>
            <q-btn
              flat
              rounded
              label="Download"
              icon="download"
              class="buttonPDFSaveDesign bg-accent text-black"
              @click="downloadPDForm"
            />
          </q-card-section>

          <q-separator class="sepBanFoot" />

          <q-spinner-ios
            class="spinner"
            v-if="loading"
            size="160px"
            color="accent"
            style="margin-left: 43.5%; margin-top: 9%"
          ></q-spinner-ios>
          <q-card-section
            v-show="!loading"
            class="q-pa-md q-gutter-sm flex-center"
            style="width: 100%; height: 100%"
            id="iframeContainer"
          ></q-card-section>
        </q-card>
      </q-dialog>

      <!-- ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
    </q-dialog>

    <footer class="footer"></footer>
  </div>
  <img
    src="../assets/BGCORE2.png"
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
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default {
  data() {
    return {
      basic: false,
      form: false,
      showDatePicker: false,
      showTimePicker: false,
      confirm: false,
      showLoading: false,
      print: false,
      pdfdialog: false,
      maximizedToggle: false,
      loading: false,
      // disEmpDep: [],
      disSubName: [],
      // disSubCategory: [],
      disDivision: [],
      SubjectCatCode: " ",
      SubjectBriefDes: " ",
      DivisionCode: " ",
      SubCategory: null,
      SubjectCode: null,
      SubjectLoc: " ",
      SubjectDomain: " ",
      SubjectDate: this.getToday(),
      SubjectTime: "",
      SubjectNote: " ",
      SubjectCause: " ",
      SubjectResponse: " ",
      SubjectFile: null,
      errorMessage: null,
      IRNo: [],
      disAllRiskChild: [],
      SubjectChilCode: " ",
      datamatch: null,
      pdfDisplayDialog: false,
      pdfUrl: null,
      maxFileSize: 10 * 1024 * 1024, // 10MB in bytes
    };
  },

  computed: {
    ...mapGetters({
      // getForm: "ApplyStore/getForm",
      getGoogleUser: "ApplyStore/getGoogleUser",
      loggedInUser: "ApplyStore/getUser",
      getIRForm: "ApplyStore/getIRForm",
      subjectname: "ApplyStore/subjectname",
      getRiskChild: "ApplyStore/getRiskChild",
      subjectcategory: "ApplyStore/subjectcategory",
      division: "ApplyStore/division",
    }),

    // filteredSubjects() {
    //   if (!this.SubCategory) return this.disSubName;
    //   return (this.disSubName || []).filter(
    //     (subject) => subject.subjectDomain === this.SubCategory
    //   );
    // },

    shouldShowSpecificExamples() {
      return (
        this.SubjectCode &&
        this.SubjectCode.subjectCode !== "others" &&
        this.disAllRiskChild.some(
          (child) => child.subjectCode === this.SubjectCode.subjectCode
        )
      );
    },

    filteredRiskChildren() {
      return this.disAllRiskChild.filter(
        (child) => child.subjectCode === this.SubjectCode?.subjectCode
      );
    },

    selectedDescription() {
      return this.SubjectCode ? this.SubjectCode.subjectReptDescription : "";
    },

    employeeCode() {
      return this.loggedInUser.EmployeeCode || this.getGoogleUser.EmployeeCode;
    },

    deptCode() {
      return this.loggedInUser.DeptCode || this.getGoogleUser.DeptCode;
    },
  },

  // watch: {
  //   SubjectCode(newVal) {
  //     if (newVal) {
  //       const matchedItem = this.disSubCategory.find(
  //         (item) => item.domainCode === newVal.subjectDomain
  //       );
  //       return (this.SubCategory = matchedItem.domainCode);
  //     } else {
  //       this.SubCategory = "";
  //       this.SubjectBriefDes = "";
  //     }
  //   },

  //   SubCategory(newVal) {
  //     if (!newVal) {
  //       this.DivisionCode = "";
  //       this.SubjectBriefDes = "";
  //       this.SubjectCode = "";
  //     }
  //   },
  // },

  watch: {
    SubjectCode(newVal) {
      if (newVal) {
        const matchedItems = this.disSubName.filter(
          (item) => item.subjectCode === newVal.subjectCode
        );
        return (this.SubjectChilCode = matchedItems[0].subjectCode);
      } else {
        this.DivisionCode = "";
        this.SubjectBriefDes = "";
        this.SubjectCode = "";
        this.SubjectChilCode = "";
      }
    },

    SubjectFile(newValue) {
      if (newValue) {
        this.pdfUrl = URL.createObjectURL(newValue);
      } else {
        this.pdfUrl = null;
      }
    },
  },

  created() {
    pdfMake.fonts = {
      Roboto: {
        normal: "Roboto-Regular.ttf",
        bold: "Roboto-Medium.ttf",
        italics: "Roboto-Italic.ttf",
        bolditalics: "Roboto-MediumItalic.ttf",
      },
    };

    // this.getED();
    this.getSN();
    // this.getSC();
    this.getRC();
    this.getDisivion();
    this.$store.dispatch("ApplyStore/initAuth");
  },

  methods: {
    ///////////////////////////////////////////////////////////////////////////////THE PROCESS////////////////////////////////////////////////////////////////////////////////////////////

    handleFormSubmit() {
      try {
        if (!this.validateForm()) {
          this.$q.notify({
            color: "negative",
            position: "top",
            message: "REQUIRED ALL FIELDS",
            icon: "report_problem",
            iconColor: "white",
            timeout: 1000,
            progress: true,
          });
          return;
        }
        this.confirm = true;
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    },

    SubmitForm() {
      try {
        this.showLoading = true;
        this.addInc();
        this.confirm = false;
        setTimeout(() => {
          this.showLoading = false;
          this.clearForm(); // Clear the form after 1 second
          this.print = true;
        }, 8000);
        this.$q.notify({
          color: "positive",
          position: "top",
          message: "SUCCESSFULLY SENT THE REPORT TO THE QUALITY OFFICER",
          icon: "report_problem",
          iconColor: "white",
          timeout: 3000,
          progress: true,
        });
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    },

    async downloadPDF() {
      try {
        await this.generatePDF();
        this.print = false;
        this.pdfdialog = true;
      } catch (error) {
        console.error(error);
      }
    },

    downloadPDForm() {
      const pdfDef = this.getPdfDefinition();
      const pdfDocGenerator = pdfMake.createPdf(pdfDef);
      pdfDocGenerator.download("Incident_Report.pdf");
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // async getED() {
    //   try {
    //     await this.$store.dispatch("ApplyStore/disEmDept");
    //     this.disEmpDep = this.getForm;
    //   } catch (error) {
    //     console.error("Error Displaying Data:", error);
    //   }
    // },

    async getSN() {
      try {
        await this.$store.dispatch("ApplyStore/disSubName");
        this.disSubName = this.subjectname;
      } catch (error) {
        console.error("Error Displaying Data:", error);
      }
    },

    // async getSC() {
    //   try {
    //     await this.$store.dispatch("ApplyStore/disSubCategory");
    //     console.log(this.subjectcategory)
    //     this.disSubCategory = this.subjectcategory;
    //   } catch (error) {
    //     console.error("Error Displaying Data:", error);
    //   }
    // },

    async getDisivion() {
      try {
        await this.$store.dispatch("ApplyStore/disDivision");
        this.disDivision = this.division;
      } catch (error) {
        console.error("Error Displaying Data:", error);
      }
    },

    async getRC() {
      try {
        await this.$store.dispatch("ApplyStore/disRiskChildTab");
        this.disAllRiskChild = this.getRiskChild;
      } catch (error) {
        console.error("Error Displaying data:", error);
      }
    },

    // FilterCategory(val, update) {
    //   if (val === "") {
    //     update(() => {
    //       this.disSubCategory = this.subjectcategory;
    //     });
    //     return;
    //   }

    //   update(() => {
    //     const needle = val.toLowerCase();
    //     this.disSubCategory = this.subjectcategory.filter((option) => {
    //       return option.RiskDomain.toLowerCase().indexOf(needle) > -1;
    //     });
    //   });
    // },

    // FilterSubIncident(val, update) {
    //   if (val === "") {
    //     update(() => {
    //       this.disSubName = this.subjectname;
    //     });
    //     return;
    //   }

    //   update(() => {
    //     const needle = val.toLowerCase();
    //     this.disSubName = this.subjectname.filter((option) => {
    //       return option.SubjectName.toLowerCase().indexOf(needle) > -1;
    //     });
    //   });
    // },

    validateFile(file) {
      if (!file) return;

      if (file.type !== "application/pdf") {
        this.errorMessage = "Please upload a valid PDF file.";
        this.SubjectFile = null;
        this.pdfUrl = null;
      } else if (file.size > this.maxFileSize) {
        this.errorMessage = "File size exceeds 10MB limit.";
        this.SubjectFile = null;
        this.pdfUrl = null;
      } else {
        this.errorMessage = null;
        this.pdfUrl = URL.createObjectURL(file);
      }
    },

    viewPDF() {
      if (this.SubjectFile) {
        this.pdfDisplayDialog = true;
      }
    },

    clearFile() {
      this.SubjectFile = null;
      this.errorMessage = null;
      this.pdfUrl = null;
    },

    FilterSubName(val, update) {
      if (val === "") {
        update(() => {
          this.disSubName = this.subjectname;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.disSubName = this.subjectname.filter((option) => {
          return option.subjectName.toLowerCase().indexOf(needle) > -1;
        });
      });
    },

    getToday() {
      const today = new Date();
      return today.toISOString().split("T")[0]; // format: YYYY-MM-DD
    },


    // getCurrentTime12h() {
    //   const now = new Date();
    //   let h = now.getHours();
    //   const m = now.getMinutes().toString().padStart(2, "0");
    //   const ampm = h >= 12 ? "PM" : "AM";
    //   h = h % 12 || 12;
    //   return `${h}:${m} ${ampm}`;
    // },

    // onTimePicked(time) {
    //   this.SubjectTime = time;
    //   this.showTimePicker = false;
    // },

    updateSubjectDate(date) {
      // No need to format — q-date already gives YYYY-MM-DD
      this.SubjectDate = date;
      this.showDatePicker = false;
    },

    dateBeforeOrToday(date) {
      const today = new Date();
      const selectedDate = new Date(date);

      return (
        selectedDate.getFullYear() < today.getFullYear() ||
        (selectedDate.getFullYear() === today.getFullYear() &&
          (selectedDate.getMonth() < today.getMonth() ||
            (selectedDate.getMonth() === today.getMonth() &&
              selectedDate.getDate() <= today.getDate())))
      );
    },

    printClose() {
      this.form = false;
      this.print = false;
    },

    Formaccept() {
      this.basic = false;
      this.form = true;
    },

    clearIRForm() {
      this.form = false;
      this.clearForm();
    },

    async addInc() {
      try {
        const formData = {
          EmployeeCode: this.employeeCode,
          DeptCode: this.deptCode,
          DivisionCode: this.DivisionCode,
          SubjectCode: this.SubjectCode.subjectCode,
          SubjectChilCode: this.SubjectChilCode.subjectChilCode,
          SubjectDate: this.SubjectDate,
          SubjectTime: this.SubjectTime,
          SubjectLoc: this.SubjectLoc,
          SubjectNote: this.SubjectNote,
          SubjectCause: this.SubjectCause,
          SubjectResponse: this.SubjectResponse,
          SubjectFile: this.SubjectFile,
        };

        // Conditionally add SubjectBriefDes if SubjectCode is "others"
        if (this.SubjectCode.subjectCode === "others") {
          formData.SubjectBriefDes = this.SubjectBriefDes;
          formData.SubjectCode = this.SubjectCode.subjectCode;
        }
        const response = await this.$store.dispatch(
          "ApplyStore/addIReport",
          formData
        );


      } catch (error) {
        console.error("Error inserting data:", error);
      }
    },

    validateForm() {
      return (
        this.SubjectLoc !== " " &&
        this.SubjectDate !== " " &&
        this.SubjectTime !== " " &&
        this.SubjectNote !== " " &&
        this.SubjectCause !== " " &&
        this.SubjectResponse !== " "
      );
    },

    clearForm() {
      this.SubjectCode = "";
      this.SubjectBriefDes = "";
      this.SubjectSpecificExam = null;
      this.SubCategory = "";
      this.SubjectDate = "";
      this.SubjectTime = "";
      this.SubjectLoc = "";
      this.SubjectNote = "";
      this.SubjectCause = " ";
      this.SubjectResponse = " ";
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

    generatePDF() {
      this.loading = true;
      const pdfDef = this.getPdfDefinition();
      const pdfDocGenerator = pdfMake.createPdf(pdfDef);
      pdfDocGenerator.getDataUrl((dataUrl) => {
        const targetElement = document.querySelector("#iframeContainer");
        if (targetElement) {
          const iframe = document.createElement("iframe");
          iframe.src = dataUrl;
          iframe.height = "100%";
          iframe.width = "100%";
          iframe.style.cssText = "z-index: 1; position: relative;";
          targetElement.innerHTML = "";
          targetElement.appendChild(iframe);

          // Hide loading indicator after 2000 milliseconds
          setTimeout(() => {
            this.loading = false; // Clear loading state after 2000 milliseconds
          }, 4000);
        }
      });
    },

    getPdfDefinition() {
    if (!this.getIRForm) {
      console.warn("getIRForm is not loaded yet");
      return;
    }

    const {
      iRNo,
      subjectName,
      subjectSpecificExam,
      subjectLoc,
      subjectDate,
      subjectTime,
      subjectNote,
      subjectCause,
      subjectResponse
    } = this.getIRForm;

    const SubjectDateFormatted = this.FormatDate(subjectDate);
    const SubjectTimeFormatted = this.FormatTime(subjectTime);

      return {
        info: {
          title: "INCIDENT REPORT FORM", // Set the PDF title
        },
        content: [
          {
            text: `IRNo.: ${iRNo}`,
            alignment: "right",
            style: "s1",
          },
          {
            text: [
              "UNIVERSITY OF THE EAST\n",
              "RAMON MAGSAYSAY MEMORIAL MEDICAL CENTER",
            ],
            style: "header",
            alignment: "center",
          },
          {
            text: "#64 Aurora Boulevard, Brgy. Dona Imelda, Quezon City, 1113 Philippines\n",
            bold: false,
            alignment: "center",
            style: "s2",
          },
          {
            text: "INCIDENT REPORT FORM",
            bold: true,
            alignment: "center",
            style: "s3",
          },
          {
            text: "Instructions:",
            bold: true,
          },
          {
            text: [
              "Incident reports shall undergo analysis. By submitting this incident report, the informant acknowledges that the information provided is accurate and complete to the best of their knowledge.",
            ],
            style: "s4",
          },
          {
            style: "tableExample",
            table: {
              widths: ["*"],
              body: [["GENERAL INFORMATION"]],
            },
          },
          {
            style: "table1",
            table: {
              widths: ["*"],
              body: [
                [
                  {
                    text: `Subject of the incident: ${subjectName}${
                      subjectSpecificExam ? ` - ${subjectSpecificExam}` : ""
                    }`,
                  },
                ],
              ],
            },
          },
          {
            style: "table1",
            table: {
              widths: ["*"],
              body: [[{ text: `Location of the incident: ${subjectLoc}` }]],
            },
          },
          {
            style: "table1",
            table: {
              widths: ["*", "*"],
              body: [
                [
                  `Date of the incident: ${SubjectDateFormatted}`,
                  {
                    text: `Time of the incident: ${SubjectTimeFormatted}`,
                    noWrap: true,
                  },
                ],
              ],
            },
          },
          {
            style: "tableExample",
            table: {
              widths: ["*"],
              body: [["NARRATIVE DESCRIPTION OF THE INCIDENT"]],
            },
          },
          {
            style: "s5",
            table: {
              widths: ["*"],
              body: [
                [
                  "Narrate exactly how the incident happened (e.g. sequence of events, factors leading to the incident, other persons involved, etc.). Be specific as possible. Statement may be made in English or Filipino",
                ],
              ],
            },
          },
          {
            table: {
              widths: ["*"],
              body: [
                [
                  {
                    text: "",
                    style: "s1",
                    fillColor: "#FFFFFF",
                    border: [1, 1, 1, 0],
                  },
                ],
                [
                  {
                    text: `${subjectNote}`,
                    style: "s6",
                    fillColor: "#FFFFFF",
                    border: [1, 0, 1, 0],
                  },
                ],
                [
                  {
                    text: "",
                    style: "s1",
                    fillColor: "#FFFFFF",
                    border: [1, 0, 1, 1],
                  },
                ],
              ],
            },
          },
          {
            style: "tableExample",
            table: {
              widths: ["*"],
              body: [["POSSIBLE CAUSES OF THE INCIDENT"]],
            },
          },
          {
            style: "s5",
            table: {
              widths: ["*"],
              body: [["Possible reason on the perspective of the Informant"]],
            },
          },
          {
            table: {
              widths: ["*"],
              body: [
                [
                  {
                    text: "",
                    style: "s1",
                    fillColor: "#FFFFFF",
                    border: [1, 1, 1, 0],
                  },
                ],
                [
                  {
                    text: `${subjectCause}`,
                    style: "s6",
                    fillColor: "#FFFFFF",
                    border: [1, 0, 1, 0],
                  },
                ],
                [
                  {
                    text: "",
                    style: "s1",
                    fillColor: "#FFFFFF",
                    border: [1, 0, 1, 1],
                  },
                ],
              ],
            },
          },
          {
            style: "tableExample",
            table: {
              widths: ["*"],
              body: [["IMMEDIATE RESPONSE"]],
            },
          },
          {
            style: "s5",
            table: {
              widths: ["*"],
              body: [
                [
                  "Action taken by the concerned department or by the Informant to ease the incident.",
                ],
              ],
            },
          },
          {
            table: {
              widths: ["*"],
              body: [
                [
                  {
                    text: "",
                    style: "s1",
                    fillColor: "#FFFFFF",
                    border: [1, 1, 1, 0],
                  },
                ],
                [
                  {
                    text: `${subjectResponse}`,
                    style: "s6",
                    fillColor: "#FFFFFF",
                    border: [1, 0, 1, 0],
                  },
                ],
                [
                  {
                    text: "",
                    style: "s1",
                    fillColor: "#FFFFFF",
                    border: [1, 0, 1, 1],
                  },
                ],
              ],
            },
          },
        ],

        styles: {
          header: {
            fontSize: 18,
            bold: true,
            alignment: "center",
          },
          s1: {
            fontSize: 8,
            bold: true,
            alignment: "right",
          },
          s2: {
            fontSize: 10,
            margin: [0, 0, 0, 20],
          },
          s3: {
            fontSize: 18,
            bold: true,
            alignment: "center",
            margin: [5, 0, 0, 0],
          },
          s4: {
            fontSize: 8,
            margin: [0, 0, 0, 10],
          },
          s5: {
            fontSize: 7,
            italics: true,
            alignment: "center",
            fillColor: "#CCCCCC",
          },
          s6: {
            fontSize: 10,
            bold: true,
            alignment: "left",
          },
          tableExample: {
            bold: true,
            fontSize: 11,
            alignment: "center",
            fillColor: "#CCCCCC",
          },
          table1: {
            bold: true,
            fontSize: 10,
            alignment: "left",
          },
        },
      };
    },

    onReset() {
      this.form = false;
      this.pdfdialog = false;
      this.maximizedToggle = false;
    },

    mounted() {
      this.generatePDF(); // Call the method to generate and display the PDF when the component is mounted
    },
  },
};
</script>

<style>
/* .box {
  height: 100%;
  width: 50%;
  background-color: #ffc619;
  align-content: center;
  margin-left: 25%;
  margin-top: 100px;
} */

.rowContent {
  border: 2px solid #f0f2f5;
  margin: 5%;
  margin-left: 20%;
  margin-right: 20%;
  background-color: #fff;
}

/* .text1 {
  margin-top: 80px;
  font-weight: bold;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  color: #020101;
  font-size: 70px;
  justify-content: center;
} */

.text2 {
  font-weight: normal;
  color: #020101;
  font-size: 18px;
  text-align: center;
  padding: 30px;
  margin: 30px;
}

.btn2 {
  height: 50px;
  width: 30%;
  font-size: 15px;
  margin-top: 5px;
  margin-bottom: 10%;
  text-align: center;
  border-radius: 30px;
  border-color: #ffc107;
}

.footer {
  background-color: #ffc619;
  padding: 10px;
  text-align: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  border-top: 1px solid rgb(245, 245, 245);
}

.q-dialog__backdrop {
  backdrop-filter: blur(5px); /* Adjust the blur intensity as needed */
  background-color: rgba(0, 0, 0, 0.2); /* Optional: subtle dimming */
}

/* <!-- /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// --> */

/* .IRIMG {
  width: 490px;
  height: 280px;
  margin-top: 50px;
  margin-right: 5px;
}
.IRBTN {
  margin-top: 360px;
  height: 50px;
  width: 400px;
  font-size: 20px;
  font-weight: bold;
  background-color: #ffc619;
  font-family: Arial Black;
  position: fixed;
} */

/* <!-- /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// --> */

.TOG {
  background-color: #ffffff;
  height: 300px;
  width: 550px;
}

.sepBanFoot {
  background-color: #6b7c93;
  height: 2px;
  margin-top: 10px;
  margin-bottom: 15px;
}

.sepDesign {
  background-color: #f0f2f5;
  height: 2px;
  margin-top: 10px;
  margin-bottom: 15px;
}

.buttonSave {
  width: 30%;
  font-weight: bold;
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

.buttonPDFSaveDesign {
  border-color: #ffc412;
  font-size: 15px;
  margin: 5px;
  box-shadow: #000000;
  border-radius: 20px;
  font-weight: bold;
  width: 200px;
  border: 2px solid #ffc412;
}
/* ////////////////////////////////////////////////IRFORM///////////////////////////////////////////////////// */

/* .IRFORM {
  background-image: url("../assets/BGCORE.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 650px;
  width: 100%;
  border: 0.2em solid #f3f4f7;
}

.formContent {
  display: flex;
  flex-direction: column;
  border: 2px solid #f0f2f5;
  margin-left: 5px;
  margin-right: 5px;
  border-radius: 25px;
  padding: 20px;
  background-color: #fafafa;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
} */

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

.contentForm {
  border: 2px solid #f0f2f5;
  margin-left: auto;
  margin-right: auto;
  border-radius: 25px;
  padding: 25px;
  background-color: #ffffff;
  width: 1100px;
  height: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.q-icon {
  min-width: 24px;
}

.IRHEAD {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  width: 100%;
  border: 0.2em solid #f3f4f7;
  background-color: #003566;
}
.text-h6 {
  font-weight: bold;
  font-family: Arial Black;
  display: flex;
  color: #ffc619;
  font-size: 30px;
}
/* ......................................INFORMANT CONTENT ..................................... */
.IRID {
  font-weight: bold;
  /* display: flex; */
  color: #ffc619;
  font-size: 20px;
  justify-content: center;
  display: none;
}
.IRIDC {
  /* display: flex; */
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  height: 80px;
  display: none;
}
/* ......................................GENERAL CONTENT ..................................... */
.IRGI {
  font-weight: bold;
  display: flex;
  padding: 10px;
  color: #ffc619;
  font-size: 20px;
  justify-content: center;
}
.IRGC {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  padding: 5px;
}
.IRGCC {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
}
/* ......................................NOTE CONTENT ..................................... */
.IRND {
  font-weight: bold;
  display: flex;
  color: #fff;
  font-size: 20px;
  justify-content: left;
  margin-left: 15px;
}
.IRNDC {
  margin-left: 25px;
  margin-top: 15px;
  width: 97%;
  margin-bottom: 15px;
}
.IRNDCUPLOAD {
  margin-left: 15px;
  margin-top: 15px;
  width: 97.5%;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
/* ......................................SAVE CONTENT ..................................... */
.IRCON {
  background-color: #ffffff;
  height: 220px;
  width: 450px;
}

.IRCONText {
  font-weight: bold;
  font-style: roboto;
  display: flex;
  color: #ffc619;
  font-size: 25px;
  justify-content: center;
}
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.downbtn {
  padding: 5px;
  width: 15%;
  color: #003566;
  font-weight: bold;
}
.no-scroll-dialog .q-dialog__inner {
  overflow: hidden !important;
}

.no-scroll-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden !important;
}

.q-card-section {
  flex: 1;
  overflow: auto;
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

.backgroundOverlay {
  background: rgba(0, 0, 0, 0.6); /* ✅ dark semi-transparent */
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  box-sizing: border-box;
}

/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

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

/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

.custom-time-picker .q-time__content {
  display: none;
}

.custom-time-picker .q-time__header {
  justify-content: center;
  padding: 16px 0;
}

.q-mr-sm {
  margin-right: 15px;
}

.q-ml-sm {
  margin-left: 15px;
}

.q-mx-sm {
  margin-left: 15px;
  margin-right: 15px;
}

.full-screen-overlay {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75); /* 🔥 dark background */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  text-align: center;
  box-sizing: border-box;
}

.spinner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.text-message {
  font-size: 20px;
  color: #ffffff;
  margin-top: 40px;
  font-weight: 500;
}

.sub-message {
  font-style: italic;
  color: #ffc107; /* optional accent color */
}
</style>
