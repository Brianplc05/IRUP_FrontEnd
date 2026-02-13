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
        />

        <q-dialog maximized v-model="IRDialog" persistent>
          <div class="QAModuleDiag">
            <q-card class="contentFormQAModule">
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

              <q-card-section
                v-if="isLoadingIRDetails"
                class="column flex-center q-pa-xl"
                style="height: 400px"
              >
                <q-spinner size="60px" color="primary" />
                <div class="q-mt-md text-primary text-weight-medium">
                  Loading incident details...
                </div>
              </q-card-section>

              <q-card-section style="border: 2px solid #6b7c93" v-else>
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
                      :model-value="IRAQADetailss.iRNo"
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
                      :model-value="FormatDateIR(IRAQADetailss.dateTimeCreated)"
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

                      <div class="row q-col-gutter-md q-mx-lg q-mt-xs">
                        <div class="col-6">
                          <div
                            class="text-weight-bold"
                            style="font-size: 15px; color: #03254b"
                          >
                            Incident Brief Description
                          </div>

                          <span>
                            <q-input
                              rounded
                              outlined
                              autogrow
                              :model-value="IRAQADetailss.subjectBriefDes"
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
                            :model-value="IRAQADetailss.subjectLoc"
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
                            :model-value="FormatDate(IRAQADetailss.subjectDate)"
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
                            :model-value="FormatTime(IRAQADetailss.subjectTime)"
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
                        class="text-red text-subtitle2 text-weight-bold q-mb-sx  q-mx-xl"
                      >
                        Number of file: {{  IRAQADetailss.totalAttachments }}
                      </div>

                      <div
                        v-if="IRAQADetailss.files && IRAQADetailss.files.length"
                        class="QAFileDes row flex-start q-mx-xl"
                        style=" border-radius: 25px;"
                      >
                        <div
                          v-for="(file, index) in IRAQADetailss.files"
                          :key="index"
                          style="
                            display: flex;
                            align-items: start;
                            gap: 5px;
                            background: #e3f2fd;
                            padding: 8px;
                            border-radius: 4px;
                            margin-bottom: 5px;
                            cursor: pointer;
                          "
                          @click.stop="viewPDF(file.subjectFile, file.subjectFileName)"
                        >
                          <div
                            style="
                              display: flex;
                              align-items: center;
                              gap: 10px;
                              background-color: #f5f5f5;
                              padding: 8px 12px;
                              border-radius: 6px;
                              border: 1px solid #dcdcdc;
                              width: fit-content;
                            "
                          >
                            <q-icon
                              name="description"
                              size="24px"
                              color="grey-7"
                            ></q-icon>

                            <div class="text-dark text-subtitle2">
                              {{ file.subjectFileName }}
                            </div>
                          </div>
                        </div>

                        <q-dialog v-model="pdfDisplayDialog">
                          <q-card style="width: 90vw; max-width: 1100px">
                            <div class="bg-info text-white">
                              <div class="text-h6 q-mx-md">UPLOADED PDF FILES</div>
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

                      <div class="QAFileDes column flex-center q-mx-xl" v-else style=" border-radius: 25px;">
                        <div
                          class="text-subtitle1 items-center text-weight-bold text-dark">
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
                          :model-value="IRAQADetailss.subjectNote"
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
                          :model-value="IRAQADetailss.subjectCause"
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
                          :model-value="IRAQADetailss.subjectResponse"
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

    <template v-slot:body-cell-division="props">
      <q-td :props="props">
        <span class="text-bold text-center text-uppercase">
          {{ props.row.division }}
        </span>
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
    getAssistantQAs: Function,
  },

  data() {
    return {
      IRAQADetailss: [],
      disAllDivCode: [],
      IRDialog: false,
      isLoadingIRDetails: false,
      IrNo: "",
      pdfDisplayDialog: false,
      pdfUrl: null,
      maximizedToggle: null,
      subjectFileName: null,
      subjectFile: null,
    };
  },

  computed: {
    ...mapGetters({
      getAssistantQAForm: "ApplyStore/getAssistantQAForm",
      getAssistantDivision: "ApplyStore/getAssistantDivision",
    }),

    filteredDivCodeOptions() {
      return this.disAllDivCode.filter(
        (item) => item.divisionCode != this.DivisionCode
      );
    },
  },

  created() {
    this.getDivisioncode();
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
        this.isLoadingIRDetails = true

        const data = {
          iRNo: IRNo,
        };
        this.selectedIrNo = IRNo;
        const response = await this.$store.dispatch("ApplyStore/disAQA", data);
        this.IRAQADetailss = this.getAssistantQAForm;
      } catch (error) {
        console.error("Error inserting data:", error);
      } finally {
        // Stop loading regardless of success or error
        this.isLoadingIRDetails = false
      }
    },

    viewPDF(subjectFile, subjectFileName) {
      const cleanBase64 = subjectFile.replace(
        /^data:application\/pdf;base64,/,
        ""
      );

      const byteCharacters = atob(cleanBase64);
      const byteNumbers = new Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });

      this.pdfUrl = URL.createObjectURL(blob);
      this.pdfDisplayDialog = true;
    },

    closepdf() {
      this.pdfDisplayDialog = false;
      this.subjectFile = null;
    },

    async getDivisioncode() {
      try {
        await this.$store.dispatch("ApplyStore/disDivisionCode");
        this.disAllDivCode = this.getAssistantDivision;
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    },
  },
};
</script>
