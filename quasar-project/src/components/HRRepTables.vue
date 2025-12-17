<template>
  <q-table :rows="items" :columns="columns" row-key="IRNo">
    <template v-slot:body-cell-viewIR="props">
        <q-td>
          <q-btn
            push
            @click="viewIReport(props.row.iRNo)"
            :ripple="{ center: true }"
            color="accent"
            icon="description"
            class="text-black text-bold text-center shadow-5"
          />

          <q-dialog maximized v-model="IRDialog" persistent>
            <div class="HRVDia">
              <q-card class="contentFormHR">
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

                  <div class="HRDesContent">
                    <div class="HRFixDesign">
                      <div class="HRDes1">
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

                  <div class="HRDesContent">
                    <div class="HRFixDesign">
                      <div class="HRDes1">
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
                          class="HRFileDes column flex-center"
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

                        <div class="HRFileDes column flex-center" v-else>
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

                  <div class="HRDesContent">
                    <div class="HRFixDesign">
                      <div class="HRDes1">
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

                  <div class="HRDesContent">
                    <div class="HRFixDesign">
                      <div class="HRDes1">
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

                  <div class="HRDesContent">
                    <div class="HRFixDesign">
                      <div class="HRDes1">
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
  },

  data() {
    return {
      IRDialog: false,
      IRQADetailss: [],
      pdfDisplayDialog: false,
      pdfUrl: null,
      maximizedToggle: null,
      subjectFileName: null,
      subjectFile: null,
    }
  },

  computed: {
    ...mapGetters({
      getHR: "ApplyStore/getHR",
    }),
  },

  methods: {
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
        this.selectedIrNo = IRNo;
        const response = await this.$store.dispatch(
          "ApplyStore/disIrpHR",
          data
        );

        this.IRQADetailss = this.getHR;
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    },

    viewPDF(subjectFile) {
      this.pdfUrl = "data:application/pdf;base64," + subjectFile;
      this.pdfDisplayDialog = true;
    },

    closepdf() {
      this.pdfDisplayDialog = false;
      this.subjectFile = null;
    },
  },
}
</script>
