<template>
  <q-table :rows="items" :columns="columns" row-key="IRNo">
    <template v-slot:body-cell-viewIR="props">
      <q-td>
        <q-btn
          flat
          rounded
          push
          @click="viewIReport(props.row.iRNo)"
          :ripple="{ center: true }"
          icon="description"
          class="bg-accent text-black text-bold text-center shadow-5"
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
                        :model-value="IRDirectorDetailss.iRNo"
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
                        :model-value="FormatDateIR(IRDirectorDetailss.dateTimeCreated)"
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

                            <span v-if="!IRDirectorDetailss.primaryDept">
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
                                :model-value="IRDirectorDetailss.primaryDept"
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

                            <span v-if="!IRDirectorDetailss.deptCodeInvDescriptions">
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
                                :model-value="
                                  IRDirectorDetailss.deptCodeInvDescriptions
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

                            <span v-if="IRDirectorDetailss.subjectSpecificExam">
                              <q-input
                                rounded
                                outlined
                                :model-value="
                                  IRDirectorDetailss.subjectName +
                                  ' - ' +
                                  IRDirectorDetailss.subjectSpecificExam
                                "
                                disable
                              />
                            </span>
                            <span
                              v-else-if="
                                IRDirectorDetailss.subjectSpecificExam === null
                              "
                            >
                              <q-input
                                rounded
                                outlined
                                :model-value="IRDirectorDetailss.subjectName"
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
                              :model-value="IRDirectorDetailss.subjectLoc"
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
                              :model-value="FormatDate(IRDirectorDetailss.subjectDate)"
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
                              :model-value="FormatTime(IRDirectorDetailss.subjectTime)"
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
                            IRDirectorDetailss.subjectFile &&
                            IRDirectorDetailss.subjectFile.length
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
                                IRDirectorDetailss.subjectFile,
                                IRDirectorDetailss.subjectFileName
                              )
                            "
                          >
                            <q-icon
                              name="description"
                              class="text-h3"
                              color="red"
                            ></q-icon>

                            <div class="text-dark text-left text-subtitle1">
                              {{ IRDirectorDetailss.subjectFileName }}
                            </div>
                          </div>
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
                            :model-value="IRDirectorDetailss.subjectNote"
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
                            :model-value="IRDirectorDetailss.subjectCause"
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
                            :model-value="IRDirectorDetailss.subjectResponse"
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
      </q-td>
    </template>

    <!-- <template v-slot:body-cell-QA="props">
      <q-td :props="props">
        <span class="text-bold text-center text-uppercase">
          {{ props.row.mainFullName }}
        </span>
        <br />
        <span
          v-if="props.row.transferFullName !== null"
          class="text-bold text-center text-uppercase"
        >
          REDIRECTED TO:
          <b style="background: #ffc619">{{ props.row.TransferFullName }}</b>
        </span>
      </q-td>
    </template> -->

    <template v-slot:body-cell-subject="props">
      <q-td :props="props">
        <span
          v-if="!props.row.subjectSpecificExam"
          class="text-bold text-center text-uppercase"
        >
          {{ props.row.subjectName }}
        </span>
        <span
          v-if="props.row.subjectSpecificExam"
          class="text-bold text-center text-uppercase"
        >
          {{ props.row.subjectName }} - {{ props.row.subjectSpecificExam }}
        </span>
      </q-td>
    </template>

    <template v-slot:body-cell-hrRef="props">
      <q-td>
        <q-btn
          :disable="props.row.hrReferral !== null"
          @click="HRRecommendation(props.row.iRNo)"
          icon="healing"
          class="bg-positive text-white text-bold text-center"
          style="border-radius: 20px; width: 125px"
        >
        </q-btn>

        <q-dialog v-model="setHRRecom" persistent>
          <q-card class="IRCON">
            <q-card-section class="q-mb-sm row items-center justify-between">
              <div
                class="text-secondary text-weight-bold"
                style="font-size: 25px; color: #002b5c"
              >
                RECOMMENDATION
              </div>
              <q-btn
                flat
                icon="close"
                style="color: #166ecc; background-color: rgba(22, 110, 204, 0.1)"
                @click="setHRRecom = false"
                v-close-popup
              />
            </q-card-section>

            <q-separator class="formseparatorBlue" />

            <q-card-actions
              align="center"
              class="q-mt-md column items-center justify-center"
              style="text-align: center;"
            >
              <div class="q-mb-sm q-pa-sm" style="font-size: 18px; color: #000000">
                Is this incident report (IR) something that should be referred to HR?
              </div>

              <div class="row q-gutter-xxl justify-center">
                <q-btn
                  flat
                  rounded
                  push
                  label="NO"
                  class="buttonCancelDesign text-info"
                  @click="submitHRRecommendation(2)"
                />

                <q-btn
                  flat
                  rounded
                  push
                  label="YES"
                  class="buttonSaveDesign bg-accent text-black"
                  @click="submitHRRecommendation(1)"
                />
              </div>
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-dialog
          v-model="waitplease"
          persistent
          content-class="non-transparent-dialog"
        >
          <q-card class="centered-card">
            <q-card-section>
              <div class="spinner-container">
                <q-spinner-facebook size="100px"></q-spinner-facebook>
                <div class="please-wait">Doing something. Please wait...</div>
              </div>
            </q-card-section>
          </q-card>
        </q-dialog>
      </q-td>
    </template>
  </q-table>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    items: Array,
    columns: Array,
    getDirectors: Function,
  },

  data() {
    return {
      IRDirectorDetailss: [],
      IRDialog: false,

      setHRRecom: false,
      HRRec: null,
      QAReferral: null,
      waitplease: false,

      pdfDisplayDialog: false,
      pdfUrl: null,
      maximizedToggle: null,
      subjectFileName: null,
      iRNo: "",
    };
  },

  computed: {
    ...mapGetters({ getDirector: "ApplyStore/getDirector" }),
  },

  methods: {
    ///////////////////////////////////////IRDETAILS//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    FormatDate(SubjectDate) {
      const date = new Date(SubjectDate);
      const options = { year: "numeric", month: "long", day: "2-digit" };
      const formattedDate = date
        .toLocaleDateString("en-US", options)
        .toUpperCase()
        .replace(/\s/g, " ");
      return formattedDate;
    },

    FormatDateIR(DateTimeCreated) {
      const date = new Date(DateTimeCreated);
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

    async viewIReport(IRNo) {
      try {
        this.IRDialog = true;
        const data = {
          iRNo: IRNo,
        };
        const response = await this.$store.dispatch(
          "ApplyStore/disDirectorIrp",
          data
        );
        this.IRDirectorDetailss = this.getDirector;
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    },

    viewPDF(subjectFile) {
      this.pdfUrl = "data:application/pdf;base64," + subjectFile;
      this.pdfDisplayDialog = true;
    },
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    HRRecommendation(IRNo) {
      this.setHRRecom = true;
      this.IrNo = IRNo; // Ensure consistency with this.IrNo
    },

    onCancelHRRecom() {
      this.setHRRecom = false;
    },

    async submitHRRecommendation(HRRec) {
      try {
        const HRData = {
          IRNo: this.IrNo,
          HRRec: HRRec
        };
        this.waitplease = true;
        this.onCancelHRRecom();
        await this.$store.dispatch(
          "ApplyStore/addHRRecommendation",
          HRData
        );

        setTimeout(() => {
          this.getDirectors();
          this.waitplease = false;
        }, 2000);
        // Success notification
        this.$q.notify({
          color: "green-8",
          position: "top",
          message: "SUCCESS GIVING RECOMMENDATION",
          icon: "check",
          iconColor: "white",
          timeout: 3000,
          progress: true,
        });
      } catch (error) {
        console.error("Error creating action items:", error);
      }
    },
  },
};
</script>
