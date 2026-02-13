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
                        Topic
                      </div>

                      <div
                        class="q-mb-sm"
                        style="font-size: 15px; color: #737373"
                      >
                      Short description of the Incident
                      </div>

                      <q-separator class="formseparatorYellow" />

                      <div class="q-mx-xl">
                        <q-input
                          autogrow
                          rounded
                          outlined
                          :model-value="IRQADetailss.subjectTopic || 'None'"
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
                        Number of file: {{  IRQADetailss.totalAttachments }}
                      </div>

                      <div
                        v-if="IRQADetailss.files && IRQADetailss.files.length"
                        class="QAFileDes row flex-start q-mx-xl"
                        style=" border-radius: 25px;"
                      >
                        <div
                          v-for="(file, index) in IRQADetailss.files"
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
      </q-td>
    </template>

    <template v-slot:body-cell-QA="props">
      <q-td :props="props">
        <span class="text-dark text-bold text-center">{{
          props.row.mainFullName
        }}</span>

        <!-- <span
          v-if="props.row.MainFullName !== 'null'"
          :class="{
            'cursor-not-allowed':
              props.row.TransferFullName !== null ||
              props.row.QAStatus === false,
          }"
          @click="
            props.row.TransferFullName === null && props.row.QAStatus !== false
              ? qaTransfer(props.row.IRNo, props.row.SubjectCode)
              : null
          "
          class="text-dark text-bold text-center"
        >
          {{ props.row.MainFullName }}
        </span>

        <br />

        <span
          v-if="props.row.TransferFullName !== null"

        >
          REDIRECTED TO:
          <b style="background: #ffc619">{{ props.row.TransferFullName }}</b>
        </span>

        <q-dialog v-model="setQATraDialogs">
          <q-card>
            <q-card-section class="QAStatus">
              <div class="row items-center justify-between">
                <div class="QASText">CONFIRM TRANSFER</div>
              </div>
            </q-card-section>
            <q-card-section>
              <div>DO YOU WANT TO TRANSFER THE INCIDENT REPORT?</div>
            </q-card-section>
            <q-separator
              style="background-color: #d5d7da; height: 2px; margin: 2px 0"
            ></q-separator>
            <q-card-actions align="right">
              <q-btn
                push
                label="NO"
                color="secondary"
                @click="setQATraDialogs = false"
              />
              <q-btn
                push
                label="YES"
                color="accent"
                class="text-black"
                @click="saveQATra"
              />
            </q-card-actions>
          </q-card>
        </q-dialog> -->
        <!-- ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
        <!-- <q-dialog v-model="setQATrans" persistent>
          <q-card class="QAIC">
            <q-card-section class="QAICHead">
              <div class="row items-center justify-between">
                <div class="QAICText">QA TRANSFER</div>
              </div>
            </q-card-section>
            <q-card-section>
              <q-input outlined v-model="SubjectCode" style="display: none" />
              <q-select
                use-input
                square
                outlined
                v-model="EmpTransfer"
                :options="disQA"
                label="QA INCHARGE"
                emit-value
                map-options
                :option-value="(option) => option.EmployeeCode"
                :option-label="(option) => option.FullName"
                style="margin-bottom: 10px; width: 100%"
              />
            </q-card-section>
            <q-separator
              style="background-color: #d5d7da; height: 2px; margin: 2px 0"
            ></q-separator>
            <q-card-actions align="right">
              <q-btn
                push
                label="CANCEL"
                color="secondary"
                @click="cancelTrans"
              />
              <q-btn
                push
                label="SAVE"
                color="accent"
                class="text-black"
                @click="transfer"
              />
            </q-card-actions>
          </q-card>
        </q-dialog> -->

        <!-- ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
        <!-- <q-dialog
          v-model="transfering"
          persistent
          content-class="non-transparent-dialog"
        >
          <q-card class="centered-card">
            <q-card-section>
              <div class="spinner-container">
                <q-spinner-ios size="100px"></q-spinner-ios>
                <div class="please-wait">Transfering QA. Please wait...</div>
              </div>
            </q-card-section>
          </q-card>
        </q-dialog> -->
      </q-td>
    </template>

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

    <template v-slot:body-cell-riskGrading="props">
      <q-td>
        <q-btn
          v-if="props.row.riskGrading === 0"
          @click="editRiskGrading(props.row.iRNo)"
          class="bg-positive text-black text-bold text-center"
          style="border-radius: 20px; width: 125px"
          icon="analytics"
        >
          <q-tooltip class="bg-info text-white">
            Assign Grade to Incident Report
          </q-tooltip>
        </q-btn>

        <q-dialog persistent v-model="setRiskgradDialogs">
          <q-card class="QARiskG">
            <q-card-section class="q-mb-sm row items-center justify-between">
              <div
                class="text-secondary text-weight-bold"
                style="font-size: 25px; color: #002b5c"
              >
                RISK SCORING
              </div>
              <q-icon
                name="help"
                class="cursor-pointer bg-accent text-black q-pa-xs rounded-borders"
                size="25px"
                @click="displayRiskGrading"
              >
                <q-tooltip class="bg-info text-white">
                  This section explains how risk is scored.
                </q-tooltip>
              </q-icon>
            </q-card-section>

            <q-separator class="formseparatorBlue" />

            <q-dialog v-model="viewRiskGrade" persistent>
              <q-card style="width: 70vw; max-height: 90vh; overflow-y: auto">
                <q-card-section class="row items-center justify-between">
                  <div
                    class="text-secondary text-weight-bold"
                    style="font-size: 25px; color: #002b5c"
                  >
                    Risk Scoring Matrix
                  </div>

                  <q-btn
                    flat
                    icon="close"
                    @click="viewRiskGrade = false"
                    v-close-popup
                    style="
                      color: #166ecc;
                      background-color: rgba(22, 110, 204, 0.1);
                    "
                    ><q-tooltip class="bg-info text-white">
                      Close Scoring
                    </q-tooltip>
                  </q-btn>
                </q-card-section>

                <q-separator class="formseparatorBlue" />

                <q-card-section>
                  <q-img
                    src="../assets/Risk Grading.png"
                    style="max-height: 500px; width: 100%; object-fit: fill"
                    class="rounded-borders"
                  />
                </q-card-section>
              </q-card>
            </q-dialog>

            <q-card-section>
              <div class="q-mt-sm">
                <q-select
                  use-input
                  rounded
                  outlined
                  clearable
                  v-model="RiskGrading"
                  label="Risk Level"
                  :options="riskLevel"
                  emit-value
                  map-options
                  :option-value="(option) => option.value"
                  :option-label="(option) => option.label"
                />
              </div>
            </q-card-section>

            <q-card-actions align="center" class="q-mt-xs column items-center">
              <div class="row q-gutter-xl; justify-center">
                <q-btn
                  flat
                  rounded
                  push
                  label="Cancel"
                  class="buttonCancelDesign text-info"
                  @click="cancelRiskGrade"
                />

                <q-btn
                  flat
                  rounded
                  push
                  label="Save"
                  class="buttonSaveDesign bg-accent text-black"
                  @click="saveRiskGrade"
                />
              </div>
            </q-card-actions>
          </q-card>
        </q-dialog>

        <!-- ////////////////////////////////////////////////////////////////////////// LOADING /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->

        <q-dialog v-model="RiskLoading" persistent maximized>
          <div
            class="fullscreen flex flex-center column q-gutter-md"
            style="background-color: rgba(0, 0, 0, 0.55)"
          >
            <q-spinner-ios size="150px" color="white" />

            <div class="text-center text-subtitle1 text-white">
              Transferring to the selected risk grading category.
              <br />
              <span class="text-italic text-accent">Please wait...</span>
            </div>
          </div>
        </q-dialog>
      </q-td>
    </template>

    <template v-slot:body-cell-isReject="props">
      <q-td>
        <q-btn
          v-if="!loggedInUser.AreaCode"
          @click="updateRejectStatus(props.row.iRNo)"
          class="bg-red text-black text-bold text-center"
          style="border-radius: 20px; width: 115px"
          icon="cancel_presentation"
        >
          <q-tooltip class="bg-info text-white">
            Reject Incident Report
          </q-tooltip>
        </q-btn>

        <q-dialog v-model="setRejectStatus" persistent>
          <q-card class="QARejectStatus">
            <q-card-section class="q-mb-sm row items-center justify-between">
                <div
                  class="text-secondary text-weight-bold"
                  style="font-size: 25px; color: #002b5c"
                >
                  REJECTION REASON
                </div>

                <q-btn
                  flat
                  icon="close"
                  style="
                    color: #003566;
                    background-color: rgba(22, 110, 204, 0.1);
                  "
                  @click="setRejectStatus = false"
                  v-close-popup
                >
                  <q-tooltip class="bg-info text-white"> Close Form </q-tooltip>
                </q-btn>
            </q-card-section>

            <q-separator class="formseparatorBlue" />

            <q-card-section>
              <div>
                <q-input
                  v-model="rejectNote"
                  rounded
                  outlined
                  label="Reason Note"
                  type="textarea"
                  class="q-mt-md"
                  autofocus
                  style="width: 100%"
                />
              </div>
            </q-card-section>

            <q-card-actions
              align="center"
              class="q-mt-sm column items-center "
            >
              <div class="row q-gutter-xxl; justify-center">
                <q-btn
                  flat
                  rounded
                  push
                  label="Cancel"
                  class="buttonCancelDesign text-info"
                  @click="onRejectStatusCancel"
                />

                <q-btn
                  flat
                  rounded
                  push
                  label="Save"
                  class="buttonSaveDesign bg-accent text-black"
                  @click="submitRejectStatus(selectedIrNo)"
                />
              </div>
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-td>
    </template>

    <template v-slot:body-cell-involvedDept="props">
      <q-td>
        <span class="text-dark text-bold text-center">{{
          props.row.department_Involved
        }}</span>
      </q-td>
    </template>

    <template v-slot:body-cell-hrReferral="props">
      <q-td>
        <span
          v-if="props.row.hrReferral === 1"
          class="text-positive text-bold text-center"
          >YES</span
        >
        <span
          v-if="props.row.hrReferral === 2"
          class="text-negative text-bold text-center"
          >NO</span
        >
      </q-td>
    </template>

    <template v-slot:body-cell-rcaStat="props">
      <td>
        <q-btn
          flat
          rounded
          push
          :ripple="{ center: true }"
          :disable="props.row.primaryDept !== null"
          label="Select Department"
          @click="requiredRCA(props.row.iRNo)"
          :class="{
            'bg-positive': props.row.primaryDept === null,
            'bg-dark': props.row.primaryDept !== null,
          }"
          class="text-white text-center shadow-3"
          style="border-radius: 20px; width: 195px"
          ><q-tooltip class="bg-info text-white">
            Identify the department that was involved.
          </q-tooltip>
        </q-btn>

        <!-- <q-btn
          label="NOT REQUIRED"
          style="margin-left: 20px; width: 120px;"
          @click="editCon(props.row.IRNo)"
          class="bg-accent text-black text-bold text-center"
        /> -->

        <q-dialog v-model="setRCAreceived" persistent>
          <q-card class="QADeptIn">
            <q-card-section class="q-mb-sm row justify-center">
              <div
                class="text-secondary text-weight-bold text-center"
                style="font-size: 25px; color: #002b5c"
              >
                DEPARTMENTS INVOLVED
              </div>
            </q-card-section>

            <q-separator class="formseparatorBlue" />

            <q-card-section>
              <div>
                <q-select
                  use-input
                  rounded
                  outlined
                  clearable
                  v-model="PrimaryDept"
                  :options="disDept"
                  @filter="FilterFn"
                  label="Primary (Department/s)"
                  emit-value
                  map-options
                  :option-value="(option) => option.deptCode"
                  :option-label="(option) => option.dept_Desc"
                />
              </div>
            </q-card-section>

            <q-item-section class="QADLay">
              <div class="QADTestlist">
                Other Involved Departments
                <q-btn
                  class="q-ml-auto"
                  flat
                  round
                  dense
                  icon="add"
                  @click="addParty"
                />
              </div>
            </q-item-section>

            <q-item-section>
              <div
                v-for="(party, index) in parties"
                :key="index"
                style="
                  margin-top: 8px;
                  display: flex;
                  align-items: center;
                  margin-left: 15px;
                "
              >
                <q-select
                  use-input
                  rounded
                  outlined
                  clearable
                  v-model="party.DeptCodeInv"
                  :options="disDept"
                  label="Secondary (Department/s)"
                  @filter="FilterFn"
                  emit-value
                  map-options
                  :option-value="(option) => option.deptCode"
                  :option-label="(option) => option.dept_Desc"
                  style="margin-top: 10px; width: 80%"
                />

                <q-btn
                  @click="removeParty(index)"
                  rounded
                  color="negative"
                  icon="remove_circle"
                  class="q-ml-md q-mt-sm"
                  size="sm"
                />
              </div>
            </q-item-section>

            <q-card-actions
              align="center"
              class="q-mt-md column items-center footer-actions"
            >
              <div class="row q-gutter-xxl; justify-center">
                <q-btn
                  flat
                  rounded
                  push
                  label="Cancel"
                  class="buttonCancelDesign text-info"
                  @click="onRCACancel"
                />

                <q-btn
                  flat
                  rounded
                  push
                  label="Save"
                  class="buttonSaveDesign bg-accent text-black"
                  @click="submitRCAEmail"
                />
              </div>
            </q-card-actions>
          </q-card>
        </q-dialog>

        <!-- ////////////////////////////////////////////////////////////////////////// LOADING /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->

        <q-dialog v-model="rdPWait" persistent maximized>
          <div
            class="fullscreen flex flex-center column q-gutter-md"
            style="background-color: rgba(0, 0, 0, 0.85)"
          >
            <q-spinner-ios size="150px" color="white" />

            <div class="text-center text-subtitle1 text-white">
              Notifying the Heads of Involved Departments
              <br />
              <span class="text-italic text-accent">Please wait...</span>
            </div>
          </div>
        </q-dialog>
      </td>
    </template>

    <template v-slot:body-cell-rcadetails="props">
      <q-td>
        <q-btn
          flat
          rounded
          push
          :ripple="{ center: true }"
          :disable="props.row.rCA === '1'"
          v-if="props.row.rCA === '1' && props.row.primaryDept !== null"
          icon="list_alt"
          style="border-radius: 20px; width: 125px"
          class="bg-dark text-white text-bold text-center shadow-5"
        />

        <q-btn
          flat
          rounded
          push
          @click="viewRCADetailsForm(props.row.iRNo)"
          :ripple="{ center: true }"
          v-if="['2', '3', '4'].includes(props.row.rCA)"
          icon="list_alt"
          style="border-radius: 20px; width: 125px"
          class="bg-positive text-white text-bold text-center shadow-5"
        />

        <q-btn
          flat
          rounded
          push
          disable
          :ripple="{ center: true }"
          v-if="props.row.rCA === '5'"
          icon="list_alt"
          style="border-radius: 20px; width: 125px"
          class="bg-dark text-white text-bold text-center shadow-5"
        />

        <q-dialog maximized v-model="setRCADetailsForm" persistent>
          <div class="QADialog">
            <q-card class="contentFormQARCA">
              <q-card-section class="q-mb-xs row items-center justify-between">
                <div>
                  <div
                    class="text-secondary text-weight-bold"
                    style="font-size: 25px; color: #002b5c"
                  >
                    Incident Report: Root Cause Analysis Form
                  </div>
                </div>

                <q-btn
                  flat
                  icon="close"
                  style="
                    color: #003566;
                    background-color: rgba(22, 110, 204, 0.1);
                  "
                  @click="onCancelRCADetailsItem"
                  v-close-popup
                >
                  <q-tooltip class="bg-info text-white"> Close Form </q-tooltip>
                </q-btn>
              </q-card-section>

              <q-card-section
                class="rounded-borders shadow-2"
                style="border: 2px solid #ddd"
              >
                <div class="QADesContent">
                  <div class="QAFixDesign">
                    <div class="QADes1">
                      <div
                        class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                      >
                        Problem Background
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
                        <div class="col-4">
                          <div
                            class="text-weight-bold"
                            style="font-size: 15px; color: #03254b"
                          >
                            Date of the Incident
                          </div>

                          <q-input
                            rounded
                            outlined
                            :model-value="FormatDate(props.row.subjectDate)"
                            disable
                          />
                        </div>

                        <div class="col-4">
                          <div
                            class="text-weight-bold"
                            style="font-size: 15px; color: #03254b"
                          >
                            Time of the Incident
                          </div>

                          <q-input
                            rounded
                            outlined
                            :model-value="FormatTime(props.row.subjectDate)"
                            disable
                          />
                        </div>

                        <div class="col-4">
                          <div
                            class="text-weight-bold"
                            style="font-size: 15px; color: #03254b"
                          >
                            Location of the Incident
                          </div>

                          <q-input
                            rounded
                            outlined
                            :model-value="props.row.subjectLoc"
                            disable
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

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
                          :model-value="props.row.subjectResponse"
                          disable
                          input-class="q-pa-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </q-card-section>

              <q-card-section class="q-mt-md" style="border: 2px solid #ddd">
                <div class="QADes1 column items-center justify-center q-mb-md">
                  <div
                    class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center"
                  >
                    Fishbone / Ishikawa Diagram and 5 Whys Analysis
                  </div>
                  <div
                    class="text-center q-mb-md"
                    style="font-size: 15px; color: #737373"
                  >
                    Identify potential root causes using a Fishbone Diagram,
                    then apply the 5 Whys technique to each cause to determine
                    the true root issue.
                  </div>
                </div>

                <div class="row q-col-gutter-md q-ml-sx q-mr-sx">
                  <div
                    class="col-6 q-px-sx"
                    v-if="
                      IRRCADetailss.RCAProblemStatementLogs?.find(
                        (m) => m.problemCode === 'MANPOWER'
                      )?.description
                    "
                  >
                    <div
                      class="fishboneDesign q-pa-sm bg-white"
                      style="
                        border: 5px solid rgba(211, 47, 47, 0.6);
                        border-radius: 40px;
                      "
                    >
                      <div
                        class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center"
                      >
                        Manpower/s
                      </div>

                      <div
                        class="text-center text-black q-mb-md"
                        style="font-size: 15px"
                      >
                          This refers to the manpowers involved in the process,
                          including skills, training, experience, communication, and accountability.
                      </div>

                      <div class="q-mx-sm">
                        <div
                          class="text-primary text-weight-bold"
                          style="font-size: 15px"
                        >
                          Problem statement
                        </div>

                        <q-input
                          autogrow
                          rounded
                          outlined
                          disable
                          :model-value="
                            IRRCADetailss.RCAProblemStatementLogs?.find(
                              (m) => m.problemCode === 'MANPOWER'
                            )?.description
                          "
                        />
                      </div>

                      <q-separator class="formseparatorYellow" />

                      <div class="q-mx-sm q-mb-sm">
                        <div
                          v-for="(
                            item, index
                          ) in IRRCADetailss.RCAWhyLog?.filter(
                            (m) => m.problemName === 'MANPOWER'
                          )"
                          :key="index"
                          class="q-mb-sm"
                        >
                          <div
                            class="text-primary text-subtitle1 text-weight-bold"
                          >
                            Why?
                          </div>

                          <q-input
                            autogrow
                            rounded
                            disable
                            outlined
                            :model-value="
                              item.description || 'No Data Available'
                            "
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    class="col-6 q-px-sx"
                    v-if="
                      IRRCADetailss.RCAProblemStatementLogs?.find(
                        (m) => m.problemCode === 'METHOD'
                      )?.description
                    "
                  >
                    <div
                      class="fishboneDesign q-pa-sm bg-white"
                      style="
                        border: 5px solid rgba(255, 193, 7, 0.6);
                        border-radius: 40px;
                      "
                    >
                      <div
                        class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center"
                      >
                        Method/s
                      </div>

                      <div
                        class="text-center text-black q-mb-md"
                        style="font-size: 15px"
                      >
                        This refers to the methods and procedures an
                        organization <br/> uses to produce or deliver its product or
                        service.
                      </div>

                      <div class="q-mx-sm">
                        <div
                          class="text-primary text-weight-bold"
                          style="font-size: 15px"
                        >
                          Problem statement
                        </div>

                        <q-input
                          autogrow
                          rounded
                          disable
                          outlined
                          :model-value="
                            IRRCADetailss.RCAProblemStatementLogs?.find(
                              (m) => m.problemCode === 'METHOD'
                            )?.description
                          "
                        />

                        <q-separator class="formseparatorYellow" />

                        <div class="q-mx-sm q-mb-sm">
                          <div
                            v-for="(
                              item, index
                            ) in IRRCADetailss.RCAWhyLog?.filter(
                              (m) => m.problemName === 'METHOD'
                            )"
                            :key="index"
                            class="q-mb-sm"
                          >
                            <div
                              class="text-primary text-subtitle1 text-weight-bold"
                            >
                              Why?
                            </div>

                            <q-input
                              autogrow
                              rounded
                              disable
                              outlined
                              :model-value="
                                item.description || 'No Data Available'
                              "
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    class="col-6 q-px-sx"
                    v-if="
                      IRRCADetailss.RCAProblemStatementLogs?.find(
                        (m) => m.problemCode === 'MACHINE'
                      )?.description
                    "
                  >
                    <div
                      class="fishboneDesign q-pa-sm bg-white"
                      style="
                        border: 5px solid rgba(233, 30, 99, 0.6);
                        border-radius: 40px;
                      "
                    >
                      <div
                        class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center"
                      >
                        Machine/s
                      </div>

                      <div
                        class="text-center text-black q-mb-md"
                        style="font-size: 15px"
                      >
                        This refers to the assets such as machines and
                        equipement <br/> used to create or provide the product or
                        services.
                      </div>

                      <div class="q-mx-sm">
                        <div
                          class="text-primary text-weight-bold"
                          style="font-size: 15px"
                        >
                          Problem statement
                        </div>

                        <q-input
                          autogrow
                          rounded
                          disable
                          outlined
                          :model-value="
                            IRRCADetailss.RCAProblemStatementLogs?.find(
                              (m) => m.problemCode === 'MACHINE'
                            )?.description
                          "
                        />
                      </div>

                      <q-separator class="formseparatorYellow" />

                      <div class="q-mx-sm q-mb-sm">
                        <div
                          v-for="(
                            item, index
                          ) in IRRCADetailss.RCAWhyLog?.filter(
                            (m) => m.problemName === 'MACHINE'
                          )"
                          :key="index"
                          class="q-mb-sm"
                        >
                          <div
                            class="text-primary text-subtitle1 text-weight-bold"
                          >
                            Why?
                          </div>

                          <q-input
                            autogrow
                            rounded
                            disable
                            outlined
                            :model-value="
                              item.description || 'No Data Available'
                            "
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    class="col-6 q-px-sx"
                    v-if="
                      IRRCADetailss.RCAProblemStatementLogs?.find(
                        (m) => m.problemCode === 'MATERIAL'
                      )?.description
                    "
                  >
                    <div
                      class="fishboneDesign q-pa-sm bg-white"
                      style="
                        border: 5px solid rgba(156, 39, 176, 0.6);
                        border-radius: 40px;
                      "
                    >
                      <div
                        class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center"
                      >
                        Material/s
                      </div>

                      <div
                        class="text-center text-black q-mb-md"
                        style="font-size: 15px"
                      >
                        This refers to any physical or non-physical components
                        <br/>of the system, including people, resources, and tools.
                      </div>

                      <div class="q-mx-sm">
                        <div
                          class="text-primary text-weight-bold"
                          style="font-size: 15px"
                        >
                          Problem statement
                        </div>

                        <q-input
                          autogrow
                          rounded
                          disable
                          outlined
                          :model-value="
                            IRRCADetailss.RCAProblemStatementLogs?.find(
                              (m) => m.problemCode === 'MATERIAL'
                            )?.description
                          "
                        />
                      </div>

                      <q-separator class="formseparatorYellow" />

                      <div class="q-mx-sm q-mb-sm">
                        <div
                          v-for="(
                            item, index
                          ) in IRRCADetailss.RCAWhyLog?.filter(
                            (m) => m.problemName === 'MATERIAL'
                          )"
                          :key="index"
                          class="q-mb-sm"
                        >
                          <div
                            class="text-primary text-subtitle1 text-weight-bold"
                          >
                            Why?
                          </div>

                          <q-input
                            autogrow
                            rounded
                            disable
                            outlined
                            :model-value="
                              item.description || 'No Data Available'
                            "
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    class="col-6 q-px-sx"
                    v-if="
                      IRRCADetailss.RCAProblemStatementLogs?.find(
                        (m) => m.problemCode === 'MEASUREMENT'
                      )?.description
                    "
                  >
                    <div
                      class="fishboneDesign q-pa-sm bg-white"
                      style="
                        border: 5px solid rgba(3, 169, 244, 0.6);
                        border-radius: 40px;
                      "
                    >
                      <div
                        class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center"
                      >
                        Measurement/s
                      </div>

                      <div
                        class="text-center text-black q-mb-md q-pa-xs"
                        style="font-size: 15px"
                      >
                        This refers to the tools and methods that organizations
                        <br/>use to effectively measure progress, outcomes, and
                        overall performance.
                      </div>

                      <div class="q-mx-sm">
                        <div
                          class="text-primary text-weight-bold"
                          style="font-size: 15px"
                        >
                          Problem statement
                        </div>

                        <q-input
                          autogrow
                          rounded
                          disable
                          outlined
                          :model-value="
                            IRRCADetailss.RCAProblemStatementLogs?.find(
                              (m) => m.problemCode === 'MEASUREMENT'
                            )?.description
                          "
                        />
                      </div>

                      <q-separator class="formseparatorYellow" />

                      <div class="q-mx-sm q-mb-sm">
                        <div
                          v-for="(
                            item, index
                          ) in IRRCADetailss.RCAWhyLog?.filter(
                            (m) => m.problemName === 'MEASUREMENT'
                          )"
                          :key="index"
                          class="q-mb-sm"
                        >
                          <div
                            class="text-primary text-subtitle1 text-weight-bold"
                          >
                            Why?
                          </div>

                          <q-input
                            autogrow
                            rounded
                            disable
                            outlined
                            :model-value="
                              item.description || 'No Data Available'
                            "
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    class="col-6 q-px-sx"
                    v-if="
                      IRRCADetailss.RCAProblemStatementLogs?.find(
                        (m) => m.problemCode === 'ENVIRONMENT'
                      )?.description
                    "
                  >
                    <div
                      class="fishboneDesign q-pa-sm bg-white"
                      style="
                        border: 5px solid rgba(76, 175, 80, 0.6);
                        border-radius: 40px;
                      "
                    >
                      <div
                        class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center"
                      >
                        Environment/s
                      </div>

                      <div
                        class="text-center text-black q-mb-md q-pa-xs"
                        style="font-size: 15px"
                      >
                        This refers to the external factors that affect the
                        <br/>system including weather, geography, and regulation.
                      </div>

                      <div class="q-mx-sm">
                        <div
                          class="text-primary text-weight-bold"
                          style="font-size: 15px"
                        >
                          Problem statement
                        </div>

                        <q-input
                          autogrow
                          rounded
                          disable
                          outlined
                          :model-value="
                            IRRCADetailss.RCAProblemStatementLogs?.find(
                              (m) => m.problemCode === 'ENVIRONMENT'
                            )?.description
                          "
                        />
                      </div>

                      <q-separator class="formseparatorYellow" />

                      <div class="q-mx-sm q-mb-sm">
                        <div
                          v-for="(
                            item, index
                          ) in IRRCADetailss.RCAWhyLog?.filter(
                            (m) => m.problemName === 'ENVIRONMENT'
                          )"
                          :key="index"
                          class="q-mb-sm"
                        >
                          <div
                            class="text-primary text-subtitle1 text-weight-bold"
                          >
                            Why?
                          </div>

                          <q-input
                            autogrow
                            rounded
                            disable
                            outlined
                            :model-value="
                              item.description || 'No Data Available'
                            "
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </q-card-section>

              <q-card-section class="q-mt-md" style="border: 2px solid #ddd">
                <div
                  v-for="(item, index) in IRRCADetailss.RCAActionableLog"
                  :key="index"
                  class="QADes1 column items-center justify-center q-mb-md"
                >
                  <div class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center">
                    Actionable Root Cause
                  </div>

                  <div class="text-center q-mb-md" style="font-size: 15px; color: #737373">
                    From the results of your Fishbone Diagram and 5 Whys analysis, <br />
                    this represents the most critical underlying cause that requires corrective action
                    to prevent the issue from recurring.
                  </div>

                  <!-- Domain Label -->
                  <q-input
                    rounded
                    outlined
                    disable
                    :model-value="getDomainLabel(item.domain)"
                    label="Domain"
                    class="q-mt-md"
                    style="width: 100%"
                  />

                  <!-- Actionable Text -->
                  <q-input
                    rounded
                    outlined
                    label="Actionable Root Cause"
                    type="textarea"
                    disable
                    :model-value="item.actionable"
                    class="q-mt-md"
                    style="width: 100%"
                  />
                </div>
              </q-card-section>

              <q-card-section class="q-mt-md" style="border: 2px solid #ddd">
                <div class="QADes1 column items-center justify-center q-mb-md">
                  <div
                    class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center"
                  >
                    Solution Identification
                  </div>
                  <div
                    class="text-center"
                    style="font-size: 15px; color: #737373"
                  >
                    Identify effective solutions by proposing corrective actions
                    to immediately address root causes and preventive measures
                    to avoid recurrence, specifying responsibilities and
                    timelines for each.
                  </div>
                </div>

                <q-separator class="formseparatorWhite" />

                <div
                  class="QADes1 shadow-2"
                  style="
                    border: 3px solid #6b7c93;
                    border-radius: 40px;
                    padding: 30px;
                  "
                >
                  <div
                    class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                  >
                    Corrective Action
                  </div>

                  <div class="q-mb-sm" style="font-size: 15px; color: #737373">
                    Specify immediate actions to address identified root causes,
                    including responsible individuals and deadlines for
                    implementation. You may add more fields as needed.
                  </div>

                  <q-separator class="formseparatorYellow" />

                  <div>
                    <div
                      class="row q-col-gutter-md q-mt-xs q-mb-xs items-center"
                      v-for="(item, index) in IRRCADetailss.RCACorrectiveLog"
                      :key="index"
                    >
                      <div class="col-6">
                        <div
                          class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                        >
                          Corrective Action Note
                        </div>
                        <q-input
                          autogrow
                          disable
                          rounded
                          outlined
                          :model-value="
                            item.correctiveAction || 'No Data Available'
                          "
                        />
                      </div>

                      <div class="col-2">
                        <div
                          class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                        >
                          Timeline From
                        </div>
                        <q-input
                          autogrow
                          disable
                          rounded
                          outlined
                          :model-value="
                            FormatDate(item.corTimelineFromDate) ||
                            'No Data Available'
                          "
                        />
                      </div>

                      <div class="col-2">
                        <div
                          class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                        >
                          Timeline To
                        </div>
                        <q-input
                          autogrow
                          disable
                          rounded
                          outlined
                          :model-value="
                            FormatDate(item.corTimelineFromDate) ||
                            'No Data Available'
                          "
                        />
                      </div>

                      <div class="col-2">
                        <div
                          class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                        >
                          Accountable Person/s
                        </div>
                        <q-input
                          autogrow
                          disable
                          rounded
                          outlined
                          :model-value="
                            EmploFullName(item.accountablePer) || 'No Data Available'
                          "
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <!-- <q-separator class="formseparatorWhite" />
                <div
                  class="QADes1 shadow-2"
                  style="
                    border: 3px solid #6b7c93;
                    border-radius: 40px;
                    padding: 30px;
                  "
                >
                  <div
                    class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                  >
                    Preventive Measures
                  </div>

                  <div class="q-mb-sm" style="font-size: 15px; color: #737373">
                    Outline long-term preventive measures, considering changes
                    to policies, procedures, training, and organizational
                    culture. You may add more fields as needed.
                  </div>

                  <q-separator class="formseparatorYellow" />

                  <div>
                    <div
                      class="row q-col-gutter-md q-mt-xs q-mb-xs items-center"
                      v-for="(item, index) in IRRCADetailss.RCAPreventiveLog"
                      :key="index"
                    >
                      <div class="col-6">
                        <div
                          class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                        >
                          Preventive Measure Note
                        </div>
                        <q-input
                          autogrow
                          rounded
                          outlined
                          :model-value="
                            item.preventiveMeasure || 'No Data Available'
                          "
                        />
                      </div>

                      <div class="col-2">
                        <div
                          class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                        >
                          Timeline From
                        </div>
                        <q-input
                          autogrow
                          rounded
                          outlined
                          :model-value="
                            FormatDate(item.preTimelineFromDate) ||
                            'No Data Available'
                          "
                        />
                      </div>

                      <div class="col-2">
                        <div
                          class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                        >
                          Timeline To
                        </div>
                        <q-input
                          autogrow
                          rounded
                          outlined
                          :model-value="
                            FormatDate(item.preTimelineToDate) ||
                            'No Data Available'
                          "
                        />
                      </div>

                      <div class="col-2">
                        <div
                          class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                        >
                          Responsible Person/s
                        </div>
                        <q-input
                          autogrow
                          rounded
                          outlined
                          :model-value="
                            EmploFullName(item.responsiblePer) || 'No Data Available'
                          "
                        />
                      </div>
                    </div>
                  </div>
                </div> -->

                <q-separator class="formseparatorWhite" />

                <div
                  class="QADes1 shadow-2"
                  style="
                    border: 3px solid #6b7c93;
                    border-radius: 40px;
                    padding: 30px;
                  "
                >
                  <div
                    class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                  >
                    Risk
                  </div>

                  <div class="q-mb-sm" style="font-size: 15px; color: #737373">
                    These are the risks associated with or arising from this specific incident that
                    should be recorded in the risk register to support effective risk management.
                  </div>

                  <q-separator class="formseparatorYellow" />

                  <div>
                    <div
                      class="row q-col-gutter-md q-mt-xs q-mb-xs items-center"
                      v-for="(item, index) in IRRCADetailss.RCARisk"
                      :key="index"
                    >
                      <q-input
                        rounded
                        outlined
                        disable
                        :model-value="item.riskItem"
                        style="width: 100%"
                      />
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </q-dialog>
      </q-td>
    </template>

    <template v-slot:body-cell-rcastatus="props">
      <q-td>
        <q-btn
          flat
          rounded
          push
          :ripple="{ center: true }"
          label="In Progress"
          style="border-radius: 20px; width: 195px"
          v-if="props.row.rCA === '1' && props.row.primaryDept !== null"
          class="bg-orange text-black text-bold text-center shadow-5"
        >
          <q-tooltip class="bg-info text-white">
            Waiting for RCA
          </q-tooltip>
        </q-btn>

        <q-btn
          flat
          rounded
          push
          :ripple="{ center: true }"
          label="For Review"
          @click="editRevisionConclusion(props.row.iRNo)"
          style="border-radius: 20px; width: 195px; background-color: #f1c40f"
          v-if="props.row.rCA === '2' && props.row.primaryDept !== null"
          class="text-black text-bold text-center shadow-5"
        />

        <q-btn
          flat
          rounded
          push
          :ripple="{ center: true }"
          label="Declined"
          :disable="props.row.rCA === '3' && props.row.primaryDept !== null"
          style="border-radius: 20px; width: 195px"
          v-if="props.row.rCA === '3' && props.row.primaryDept !== null"
          class="bg-negative text-black text-bold text-center shadow-5"
        >
          <q-tooltip class="bg-info text-white">
            Primary Content Action Items (Declined)
          </q-tooltip>
        </q-btn>

        <q-btn
          flat
          rounded
          push
          :ripple="{ center: true }"
          label="Returned for Review"
          style="border-radius: 20px; width: 195px; background-color: #f1c40f"
          @click="editReviewConclusion(props.row.iRNo)"
          v-if="props.row.rCA === '4' && props.row.primaryDept !== null"
          class="text-black text-bold text-center shadow-5"
        />

        <q-btn
          flat
          rounded
          push
          :ripple="{ center: true }"
          label="Accepted"
          disable
          style="border-radius: 20px; width: 195px"
          v-if="props.row.rCA === '5' && props.row.primaryDept !== null"
          class="bg-dark text-white text-bold text-center shadow-5"
        />

        <!-- ////////////////////////////////////////////////////////////////////////// FOR REVISION /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->

        <q-dialog v-model="setRCARevisionSubDialogs">
          <q-card class="QAConfirmAction">
            <q-card-section class="q-mb-sm row justify-center">
              <div
                class="text-secondary text-weight-bold text-center"
                style="font-size: 25px; color: #002b5c"
              >
                CONFIRM RCA SUBMISSION
              </div>
            </q-card-section>

            <q-separator class="formseparatorBlue" />

            <q-card-section>
              <div class="text-dark text-subtitle1 q-mb-sx text-center">
                Do you receive the Root Cause Analysis (RCA) Form?
              </div>
            </q-card-section>

            <div class="row q-gutter-xxl; justify-center">
              <q-btn
                flat
                rounded
                push
                label="NO"
                class="buttonCancelDesign text-info"
                @click="setRCARevisionSubDialogs = false"
              />

              <q-btn
                flat
                rounded
                push
                label="YES"
                class="buttonSaveDesign bg-accent text-black"
                @click="saveIRCARevision(selectedIrNo)"
              />
            </div>
          </q-card>
        </q-dialog>

        <!-- ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->

        <q-dialog maximized v-model="addConclusionRevision" persistent>
          <div class="QAModuleDiag">
            <q-card class="contentFormQARCA">
              <q-card-section class="q-mb-xs row items-center justify-between">
                <div>
                  <div
                    class="text-secondary text-weight-bold"
                    style="font-size: 25px; color: #002b5c"
                  >
                    Incident Report: Root Cause Analysis (RCA) Remarks
                  </div>
                </div>

                <q-btn
                  flat
                  icon="close"
                  style="
                    color: #003566;
                    background-color: rgba(22, 110, 204, 0.1);
                  "
                  @click="addConclusionRevision = false"
                  v-close-popup
                >
                  <q-tooltip class="bg-info text-white"> Close Form </q-tooltip>
                </q-btn>
              </q-card-section>

              <q-card-section class="q-mt-md" style="border: 2px solid #ddd">
                <div class="QADes1 column items-center justify-center q-mb-md">
                  <div
                    class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center"
                  >
                    Fishbone / Ishikawa Diagram and 5 Whys Analysis
                  </div>
                  <div
                    class="text-center q-mb-md"
                    style="font-size: 15px; color: #737373"
                  >
                    <b>Identify potential root causes using a Fishbone Diagram,
                    then apply the 5 Whys technique to each cause to determine
                    the true root issue.</b>
                  </div>
                </div>

                <div class="row q-col-gutter-md q-ml-sx q-mr-sx">
                  <div
                    class="col-6 q-px-sx"
                    v-if="
                      IRRCADetailss.RCAProblemStatementLogs?.find(
                        (m) => m.problemCode === 'MANPOWER'
                      )?.description
                    "
                  >
                    <div
                      class="fishboneDesign q-pa-sm bg-white"
                      style="
                        border: 5px solid rgba(211, 47, 47, 0.6);
                        border-radius: 40px;
                      "
                    >
                      <div
                        class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center"
                      >
                        Manpower/s
                      </div>

                      <div
                        class="text-center text-black q-mb-md"
                        style="font-size: 15px"
                      >
                        This refers to the manpowers involved in the process, including skills, training, experience, communication, and accountability.
                      </div>

                      <div class="q-mx-sm">
                        <div
                          class="text-primary text-weight-bold"
                          style="font-size: 15px"
                        >
                          Problem statement
                        </div>

                        <q-input
                          autogrow
                          rounded
                          outlined
                          :model-value="
                            IRRCADetailss.RCAProblemStatementLogs?.find(
                              (m) => m.problemCode === 'MANPOWER'
                            )?.description
                          "
                          disable
                        />
                      </div>

                      <q-separator class="formseparatorYellow" />

                      <div class="q-mx-sm q-mb-sm">
                        <div
                          v-for="(
                            item, index
                          ) in IRRCADetailss.RCAWhyLog?.filter(
                            (m) => m.problemName === 'MANPOWER'
                          )"
                          :key="index"
                          class="q-mb-sm"
                        >
                          <div
                            class="text-primary text-subtitle1 text-weight-bold"
                          >
                            Why?
                          </div>

                          <q-input
                            autogrow
                            rounded
                            outlined
                            :model-value="
                              item.description || 'No Data Available'
                            "
                            disable
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    class="col-6 q-px-sx"
                    v-if="
                      IRRCADetailss.RCAProblemStatementLogs?.find(
                        (m) => m.problemCode === 'METHOD'
                      )?.description
                    "
                  >
                    <div
                      class="fishboneDesign q-pa-sm bg-white"
                      style="
                        border: 5px solid rgba(255, 193, 7, 0.6);
                        border-radius: 40px;
                      "
                    >
                      <div
                        class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center"
                      >
                        Method/s
                      </div>

                      <div
                        class="text-center text-black q-mb-md"
                        style="font-size: 15px"
                      >
                        This refers to the methods and procedures an
                        organization uses <br/> to produce or deliver its product or
                        service.
                      </div>

                      <div class="q-mx-sm">
                        <div
                          class="text-primary text-weight-bold"
                          style="font-size: 15px"
                        >
                          Problem statement
                        </div>

                        <q-input
                          autogrow
                          rounded
                          outlined
                          :model-value="
                            IRRCADetailss.RCAProblemStatementLogs?.find(
                              (m) => m.problemCode === 'METHOD'
                            )?.description
                          "
                          disable
                        />

                        <q-separator class="formseparatorYellow" />

                        <div class="q-mx-sm q-mb-sm">
                          <div
                            v-for="(
                              item, index
                            ) in IRRCADetailss.RCAWhyLog?.filter(
                              (m) => m.problemName === 'METHOD'
                            )"
                            :key="index"
                            class="q-mb-sm"
                          >
                            <div
                              class="text-primary text-subtitle1 text-weight-bold"
                            >
                              Why?
                            </div>

                            <q-input
                              autogrow
                              rounded
                              outlined
                              :model-value="
                                item.description || 'No Data Available'
                              "
                              disable
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    class="col-6 q-px-sx"
                    v-if="
                      IRRCADetailss.RCAProblemStatementLogs?.find(
                        (m) => m.problemCode === 'MACHINE'
                      )?.description
                    "
                  >
                    <div
                      class="fishboneDesign q-pa-sm bg-white"
                      style="
                        border: 5px solid rgba(233, 30, 99, 0.6);
                        border-radius: 40px;
                      "
                    >
                      <div
                        class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center"
                      >
                        Machine/s
                      </div>

                      <div
                        class="text-center text-black q-mb-md"
                        style="font-size: 15px"
                      >
                        This refers to the assets such as machines and
                        equipement used <br/> to create or provide the product or
                        services.
                      </div>

                      <div class="q-mx-sm">
                        <div
                          class="text-primary text-weight-bold"
                          style="font-size: 15px"
                        >
                          Problem statement
                        </div>

                        <q-input
                          autogrow
                          rounded
                          outlined
                          :model-value="
                            IRRCADetailss.RCAProblemStatementLogs?.find(
                              (m) => m.problemCode === 'MACHINE'
                            )?.description
                          "
                          disable
                        />
                      </div>

                      <q-separator class="formseparatorYellow" />

                      <div class="q-mx-sm q-mb-sm">
                        <div
                          v-for="(
                            item, index
                          ) in IRRCADetailss.RCAWhyLog?.filter(
                            (m) => m.problemName === 'MACHINE'
                          )"
                          :key="index"
                          class="q-mb-sm"
                        >
                          <div
                            class="text-primary text-subtitle1 text-weight-bold"
                          >
                            Why?
                          </div>

                          <q-input
                            autogrow
                            rounded
                            outlined
                            :model-value="
                              item.description || 'No Data Available'
                            "
                            disable
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    class="col-6 q-px-sx"
                    v-if="
                      IRRCADetailss.RCAProblemStatementLogs?.find(
                        (m) => m.problemCode === 'MATERIAL'
                      )?.description
                    "
                  >
                    <div
                      class="fishboneDesign q-pa-sm bg-white"
                      style="
                        border: 5px solid rgba(156, 39, 176, 0.6);
                        border-radius: 40px;
                      "
                    >
                      <div
                        class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center"
                      >
                        Material/s
                      </div>

                      <div
                        class="text-center text-black q-mb-md"
                        style="font-size: 15px"
                      >
                        This refers to any physical or non-physical components
                        <br/> of the system, including people, resources, and tools.
                      </div>

                      <div class="q-mx-sm">
                        <div
                          class="text-primary text-weight-bold"
                          style="font-size: 15px"
                        >
                          Problem statement
                        </div>

                        <q-input
                          autogrow
                          rounded
                          outlined
                          :model-value="
                            IRRCADetailss.RCAProblemStatementLogs?.find(
                              (m) => m.problemCode === 'MATERIAL'
                            )?.description
                          "
                          disable
                        />
                      </div>

                      <q-separator class="formseparatorYellow" />

                      <div class="q-mx-sm q-mb-sm">
                        <div
                          v-for="(
                            item, index
                          ) in IRRCADetailss.RCAWhyLog?.filter(
                            (m) => m.problemName === 'MATERIAL'
                          )"
                          :key="index"
                          class="q-mb-sm"
                        >
                          <div
                            class="text-primary text-subtitle1 text-weight-bold"
                          >
                            Why?
                          </div>

                          <q-input
                            autogrow
                            rounded
                            outlined
                            :model-value="
                              item.description || 'No Data Available'
                            "
                            disable
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    class="col-6 q-px-sx"
                    v-if="
                      IRRCADetailss.RCAProblemStatementLogs?.find(
                        (m) => m.problemCode === 'MEASUREMENT'
                      )?.description
                    "
                  >
                    <div
                      class="fishboneDesign q-pa-sm bg-white"
                      style="
                        border: 5px solid rgba(3, 169, 244, 0.6);
                        border-radius: 40px;
                      "
                    >
                      <div
                        class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center"
                      >
                        Measurement/s
                      </div>

                      <div
                        class="text-center text-black q-mb-md"
                        style="font-size: 15px"
                      >
                        This refers to the tools and methods that organizations
                        use <br/> to effectively measure progress, outcomes, and
                        overall performance.
                      </div>

                      <div class="q-mx-sm">
                        <div
                          class="text-primary text-weight-bold"
                          style="font-size: 15px"
                        >
                          Problem statement
                        </div>

                        <q-input
                          autogrow
                          rounded
                          outlined
                          :model-value="
                            IRRCADetailss.RCAProblemStatementLogs?.find(
                              (m) => m.problemCode === 'MEASUREMENT'
                            )?.description
                          "
                          disable
                        />
                      </div>

                      <q-separator class="formseparatorYellow" />

                      <div class="q-mx-sm q-mb-sm">
                        <div
                          v-for="(
                            item, index
                          ) in IRRCADetailss.RCAWhyLog?.filter(
                            (m) => m.problemName === 'MEASUREMENT'
                          )"
                          :key="index"
                          class="q-mb-sm"
                        >
                          <div
                            class="text-primary text-subtitle1 text-weight-bold"
                          >
                            Why?
                          </div>

                          <q-input
                            autogrow
                            rounded
                            outlined
                            :model-value="
                              item.description || 'No Data Available'
                            "
                            disable
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    class="col-6 q-px-sx"
                    v-if="
                      IRRCADetailss.RCAProblemStatementLogs?.find(
                        (m) => m.problemCode === 'ENVIRONMENT'
                      )?.description
                    "
                  >
                    <div
                      class="fishboneDesign q-pa-sm bg-white"
                      style="
                        border: 5px solid rgba(76, 175, 80, 0.6);
                        border-radius: 40px;
                      "
                    >
                      <div
                        class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center"
                      >
                        Environment/s
                      </div>

                      <div
                        class="text-center text-black q-mb-md"
                        style="font-size: 15px"
                      >
                        This refers to the external factors that affect the
                        <br/> system including weather, geography, and regulation.
                      </div>

                      <div class="q-mx-sm">
                        <div
                          class="text-primary text-weight-bold"
                          style="font-size: 15px"
                        >
                          Problem statement
                        </div>

                        <q-input
                          autogrow
                          rounded
                          outlined
                          :model-value="
                            IRRCADetailss.RCAProblemStatementLogs?.find(
                              (m) => m.problemCode === 'ENVIRONMENT'
                            )?.description
                          "
                          disable
                        />
                      </div>

                      <q-separator class="formseparatorYellow" />

                      <div class="q-mx-sm q-mb-sm">
                        <div
                          v-for="(
                            item, index
                          ) in IRRCADetailss.RCAWhyLog?.filter(
                            (m) => m.problemName === 'ENVIRONMENT'
                          )"
                          :key="index"
                          class="q-mb-sm"
                        >
                          <div
                            class="text-primary text-subtitle1 text-weight-bold"
                          >
                            Why?
                          </div>

                          <q-input
                            autogrow
                            rounded
                            outlined
                            :model-value="
                              item.description || 'No Data Available'
                            "
                            disable
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </q-card-section>

              <q-card-section class="q-mt-md" style="border: 2px solid #ddd">
                <div
                  v-for="(item, index) in IRRCADetailss.RCAActionableLog"
                  :key="index"
                  class="QADes1 column items-center justify-center q-mb-md"
                >
                  <div class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center">
                    Actionable Root Cause
                  </div>

                  <div class="text-center q-mb-md" style="font-size: 15px; color: #737373">
                    <b>From the results of your Fishbone Diagram and 5 Whys analysis, <br />
                    this represents the most critical underlying cause that requires corrective action
                    to prevent the issue from recurring.</b>
                  </div>

                  <!-- Domain Label -->
                  <q-input
                    rounded
                    outlined
                    disable
                    :model-value="getDomainLabel(item.domain)"
                    label="Domain"
                    class="q-mt-md"
                    style="width: 100%"
                  />

                  <!-- Actionable Text -->
                  <q-input
                    rounded
                    outlined
                    label="Actionable Root Cause"
                    type="textarea"
                    disable
                    :model-value="item.actionable"
                    class="q-mt-md"
                    style="width: 100%"
                  />
                </div>
              </q-card-section>

              <q-card-section class="q-mt-md" style="border: 2px solid #ddd">
                <div class="QADes1 column items-center justify-center q-mb-md">
                  <div
                    class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center"
                  >
                    Solution Identification
                  </div>
                  <div
                    class="text-center"
                    style="font-size: 15px; color: #737373"
                  >
                    <b>Identify effective solutions by proposing corrective actions
                    to immediately address root causes and <br/> preventive measures
                    to avoid recurrence, specifying responsibilities and
                    timelines for each.</b>
                  </div>
                </div>

                <q-separator class="formseparatorWhite" />

                <div
                  class="QADes1 shadow-2"
                  style="
                    border: 3px solid #6b7c93;
                    border-radius: 40px;
                    padding: 30px;
                  "
                >
                  <div
                    class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                  >
                    Corrective Action
                  </div>

                  <div class="q-mb-sm" style="font-size: 15px; color: #737373">
                    Specify immediate actions to address identified root causes,
                    including responsible individuals and deadlines for
                    implementation. You may add more fields as needed.
                  </div>

                  <q-separator class="formseparatorYellow" />

                  <div>
                    <div
                      class="row q-col-gutter-md q-mt-xs q-mb-xs items-center"
                      v-for="(item, index) in IRRCADetailss.RCACorrectiveLog"
                      :key="index"
                    >
                      <div class="col-6">
                        <div
                          class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                        >
                          Corrective Action Note
                        </div>
                        <q-input
                          autogrow
                          rounded
                          outlined
                          :model-value="
                            item.correctiveAction || 'No Data Available'
                          "
                          disable
                        />
                      </div>

                      <div class="col-2">
                        <div
                          class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                        >
                          Timeline From
                        </div>
                        <q-input
                          autogrow
                          rounded
                          outlined
                          :model-value="
                            FormatDate(item.corTimelineFromDate) ||
                            'No Data Available'
                          "
                          disable
                        />
                      </div>

                      <div class="col-2">
                        <div
                          class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                        >
                          Timeline To
                        </div>
                        <q-input
                          autogrow
                          rounded
                          outlined
                          :model-value="
                            FormatDate(item.corTimelineFromDate) ||
                            'No Data Available'
                          "
                          disable
                        />
                      </div>

                      <div class="col-2">
                        <div
                          class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                        >
                          Accountable Person/s
                        </div>
                        <q-input
                          autogrow
                          rounded
                          outlined
                          :model-value="
                            EmploFullName(item.accountablePer) || 'No Data Available'
                          "
                          disable
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <!-- <q-separator class="formseparatorWhite" />

                <div
                  class="QADes1 shadow-2"
                  style="
                    border: 3px solid #6b7c93;
                    border-radius: 40px;
                    padding: 30px;
                  "
                >
                  <div
                    class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                  >
                    Preventive Measures
                  </div>

                  <div class="q-mb-sm" style="font-size: 15px; color: #737373">
                    Outline long-term preventive measures, considering changes
                    to policies, procedures, training, and organizational
                    culture. You may add more fields as needed.
                  </div>

                  <q-separator class="formseparatorYellow" />

                  <div>
                    <div
                      class="row q-col-gutter-md q-mt-xs q-mb-xs items-center"
                      v-for="(item, index) in IRRCADetailss.RCAPreventiveLog"
                      :key="index"
                    >
                      <div class="col-6">
                        <div
                          class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                        >
                          Preventive Measure Note
                        </div>
                        <q-input
                          autogrow
                          rounded
                          outlined
                          :model-value="
                            item.preventiveMeasure || 'No Data Available'
                          "
                        />
                      </div>

                      <div class="col-2">
                        <div
                          class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                        >
                          Timeline From
                        </div>
                        <q-input
                          autogrow
                          rounded
                          outlined
                          :model-value="
                            FormatDate(item.preTimelineFromDate) ||
                            'No Data Available'
                          "
                        />
                      </div>

                      <div class="col-2">
                        <div
                          class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                        >
                          Timeline To
                        </div>
                        <q-input
                          autogrow
                          rounded
                          outlined
                          :model-value="
                            FormatDate(item.preTimelineToDate) ||
                            'No Data Available'
                          "
                        />
                      </div>

                      <div class="col-2">
                        <div
                          class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                        >
                          Responsible Person/s
                        </div>
                        <q-input
                          autogrow
                          rounded
                          outlined
                          :model-value="
                            EmploFullName(item.responsiblePer) || 'No Data Available'
                          "
                        />
                      </div>
                    </div>
                  </div>
                </div> -->

                <q-separator class="formseparatorWhite" />

                <div
                  class="QADes1 shadow-2"
                  style="
                    border: 3px solid #6b7c93;
                    border-radius: 40px;
                    padding: 30px;
                  "
                >
                  <div
                    class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                  >
                    Risk
                  </div>

                  <div class="q-mb-sm" style="font-size: 15px; color: #737373">
                    These are the risks associated with or arising from this specific incident that
                    should be recorded in the risk register to support effective risk management.
                  </div>

                  <q-separator class="formseparatorYellow" />

                  <div>
                    <div
                      class="row q-col-gutter-md q-mt-xs q-mb-xs items-center"
                      v-for="(item, index) in IRRCADetailss.RCARisk"
                      :key="index"
                    >
                      <q-input
                        rounded
                        outlined
                        disable
                        :model-value="item.riskItem"
                        style="width: 100%"
                      />
                    </div>
                  </div>
                </div>
              </q-card-section>

              <q-card-section
                class="q-mt-md rounded-borders shadow-2 flex column items-center justify-center"
                style="border: 2px solid #ddd; text-align: center"
              >
                <div class="text-info text-subtitle1 text-weight-bold q-mb-sm">
                  Root Cause Analysis (RCA) Note
                </div>
                <div style="font-size: 15px; color: #737373">
                  <b>Direction: This section is for confirmation purposes only and should be <br/> completed only upon approval of the incident.
                  A note is not required if the incident is disapproved.</b>
                </div>

                <q-input
                  outlined
                  v-model="IrNo"
                  label="IRNo."
                  style="display: none"
                />
                <q-input
                  v-model="newConclusion"
                  rounded
                  outlined
                  label="Note"
                  type="textarea"
                  class="q-mt-md"
                  autofocus
                  style="width: 100%"
                />
              </q-card-section>

              <q-card-actions
                align="center"
                class="q-mt-md column items-center"
              >
                <div class="row q-gutter-xxl; justify-center">
                  <q-btn
                    flat
                    rounded
                    push
                    label="DISAPPROVED"
                    class="buttonCancelDesign text-info"
                    @click="submitRCADisapprovedRevision(selectedIrNo)"
                    style="width: 195px"
                  />

                  <q-btn
                    flat
                    rounded
                    push
                    label="APPROVED"
                    class="buttonSaveDesign bg-accent text-black"
                    @click="submitRCAApprovedFRS(selectedIrNo)"
                    style="width: 195px"
                  />
                </div>
              </q-card-actions>
            </q-card>
          </div>
        </q-dialog>

        <!-- ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->

        <q-dialog maximized v-model="setRevisionRCAReturn" persistent>
          <div class="QAModuleDiag">
            <q-card class="contentFormQAModule">
              <q-card-section class="q-mb-xs row items-center justify-between">
                <div>
                  <div
                    class="text-secondary text-weight-bold"
                    style="font-size: 25px; color: #002b5c"
                  >
                    Root Cause Analysis (RCA) Revision Content
                  </div>
                </div>

                <q-btn
                  flat
                  icon="close"
                  style="
                    color: #003566;
                    background-color: rgba(22, 110, 204, 0.1);
                  "
                  @click="setActionEditReviewDialog = false"
                  v-close-popup
                >
                  <q-tooltip class="bg-info text-white"> Close Form </q-tooltip>
                </q-btn>
              </q-card-section>

              <q-card-section class="rounded-borders shadow-2">
                <div class="q-mb-xs row items-center justify-between">
                  <div>
                    <div class="text-primary text-subtitle1 text-weight-bold">
                      Instruction:
                    </div>
                    <div
                      class="q-mb-md"
                      style="font-size: 15px; color: #737373"
                    >
                      In this section, identify the content that needs revision
                      by comparing it with the correct version. Then, leave a
                      note to explain the revision<br />
                      or guide the department in completing the necessary
                      information.
                    </div>
                  </div>

                  <div
                    style="
                      border: 2px solid #003566;
                      background-color: #5ea0f1;
                      border-radius: 20px;
                      text-align: left;
                      width: 350px;
                    "
                  >
                    <q-checkbox
                      class="text-bold"
                      v-model="customModel"
                      color="secondary"
                      label="SELECT THE CONTENT YOU WANT TO REVISE"
                      true-value="yes"
                      false-value="no"
                      style="color: #003566"
                    />
                  </div>
                </div>

                <q-card-section class="q-mt-md" style="border: 2px solid #ddd">
                  <div
                    class="QADes1 column items-center justify-center q-mb-md"
                  >
                    <div
                      class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center"
                    >
                      Fishbone / Ishikawa Diagram and 5 Whys Analysis
                    </div>
                    <div
                      class="text-center q-mb-md"
                      style="font-size: 15px; color: #737373"
                    >
                      Identify potential root causes using a Fishbone Diagram,
                      then apply the 5 Whys technique to each cause to determine
                      the true root issue.
                    </div>
                  </div>

                  <div class="row q-col-gutter-md q-ml-sx q-mr-sx">
                    <div
                      class="col-6 q-px-sx"
                      v-if="
                        IRRCADetailss.RCAProblemStatementLogs?.find(
                          (m) => m.problemCode === 'MANPOWER'
                        )?.description
                      "
                    >
                      <div
                        class="fishboneDesign q-pa-sm bg-white"
                        style="
                          border: 5px solid rgba(211, 47, 47, 0.6);
                          border-radius: 40px;
                        "
                      >
                        <div
                          class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center"
                        >
                          Manpower/s
                        </div>

                        <div
                          class="text-center text-black q-mb-md"
                          style="font-size: 15px"
                        >
                          This refers to the manpowers involved in the process, including skills, training, experience, communication, and accountability.
                        </div>

                        <div
                          v-for="(
                            item, index
                          ) in IRRCADetailss.RCAProblemStatementLogs?.filter(
                            (m) => m.problemCode === 'MANPOWER'
                          )"
                          :key="index"
                          class="q-pa-sm bg-white row items-start"
                          style="width: 100%"
                        >
                          <!-- Checkbox -->
                          <div class="col-auto flex items-start q-mt-sm">
                            <q-checkbox
                              :disable="customModel !== 'yes'"
                              style="display: none"
                              v-model="selectedProblemStatement"
                              :val="item.code"
                              @update:model-value="
                                handleSelectProblemStatementRevision(
                                  $event,
                                  item
                                )
                              "
                            />
                          </div>

                          <!-- Text & Input Fields -->
                          <div class="col">
                            <div
                              class="text-primary text-subtitle1 text-weight-bold q-mb-sm"
                            >
                              Problem Statement
                            </div>
                            <q-input
                              autogrow
                              rounded
                              outlined
                              :model-value="
                                item.description || 'No Data Available'
                              "
                              disable
                              class="full-width"
                              :class="
                                selectedProblemStatement.includes(item.code)
                                  ? 'bg-red text-white'
                                  : ''
                              "
                            />

                            <!-- Conditionally render the second input below -->
                            <div
                              v-if="
                                selectedProblemStatement.includes(item.code)
                              "
                            >
                              <q-input
                                v-model="problemStatmentNote[item.code]"
                                label="Quality Assurance (QA) Note"
                                autogrow
                                rounded
                                outlined
                                class="q-mt-md"
                              />
                            </div>
                          </div>
                        </div>

                        <q-separator class="formseparatorYellow" />

                        <div
                          v-for="(
                            item, index
                          ) in IRRCADetailss.RCAWhyLog?.filter(
                            (m) => m.problemName === 'MANPOWER'
                          )"
                          :key="index"
                          class="q-pa-sm row items-start"
                          style="width: 100%"
                        >
                          <div class="col-auto">
                            <q-checkbox
                              v-model="selectedWhy"
                              :val="item.code"
                              @update:model-value="
                                handleSelectWhyRevision($event, item)
                              "
                              :disable="customModel !== 'yes'"
                              style="margin-top: 45px"
                            />
                          </div>

                          <div class="col flex items-start full-width">
                            <div
                              class="text-primary text-subtitle1 text-weight-bold q-mb-sm"
                            >
                              Why?
                            </div>
                            <q-input
                              autogrow
                              rounded
                              outlined
                              :model-value="
                                item.description || 'No Data Available'
                              "
                              disable
                              class="full-width"
                              :class="
                                selectedWhy.includes(item.code)
                                  ? 'bg-red text-white'
                                  : ''
                              "
                            />

                            <!-- Additional input field (shown when checkbox is checked) -->
                            <div
                              v-if="selectedWhy.includes(item.code)"
                              class="full-width"
                            >
                              <q-input
                                v-model="whyNotes[item.code]"
                                label="Quality Assurance (QA) Note"
                                autogrow
                                rounded
                                outlined
                                class="q-mt-md"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      class="col-6 q-px-sx"
                      v-if="
                        IRRCADetailss.RCAProblemStatementLogs?.find(
                          (m) => m.problemCode === 'METHOD'
                        )?.description
                      "
                    >
                      <div
                        class="fishboneDesign q-pa-sm bg-white"
                        style="
                          border: 5px solid rgba(255, 193, 7, 0.6);
                          border-radius: 40px;
                        "
                      >
                        <div
                          class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center"
                        >
                          Method/s
                        </div>

                        <div
                          class="text-center text-black q-mb-md"
                          style="font-size: 15px"
                        >
                          This refers to the methods and procedures an
                          organization uses to produce or deliver its product or
                          service.
                        </div>

                        <div
                          v-for="(
                            item, index
                          ) in IRRCADetailss.RCAProblemStatementLogs?.filter(
                            (m) => m.problemCode === 'METHOD'
                          )"
                          :key="index"
                          class="q-pa-sm bg-white row items-start"
                          style="width: 100%"
                        >
                          <!-- Checkbox -->
                          <div class="col-auto flex items-start q-mt-sm">
                            <q-checkbox
                              :disable="customModel !== 'yes'"
                              style="display: none"
                              v-model="selectedProblemStatement"
                              :val="item.code"
                              @update:model-value="
                                handleSelectProblemStatementRevision(
                                  $event,
                                  item
                                )
                              "
                            />
                          </div>

                          <!-- Text & Input Fields -->
                          <div class="col">
                            <div
                              class="text-primary text-subtitle1 text-weight-bold q-mb-sm"
                            >
                              Problem Statement
                            </div>

                            <q-input
                              autogrow
                              rounded
                              outlined
                              :model-value="
                                item.description || 'No Data Available'
                              "
                              disable
                              class="full-width"
                              :class="
                                selectedProblemStatement.includes(item.code)
                                  ? 'bg-red text-white'
                                  : ''
                              "
                            />

                            <!-- Conditionally render the second input below -->
                            <div
                              v-if="
                                selectedProblemStatement.includes(item.code)
                              "
                            >
                              <q-input
                                v-model="problemStatmentNote[item.code]"
                                label="Quality Assurance (QA) Note"
                                autogrow
                                rounded
                                outlined
                                class="q-mt-md"
                              />
                            </div>
                          </div>
                        </div>

                        <q-separator class="formseparatorYellow" />

                        <div
                          v-for="(
                            item, index
                          ) in IRRCADetailss.RCAWhyLog?.filter(
                            (m) => m.problemName === 'METHOD'
                          )"
                          :key="index"
                          class="q-pa-sm row items-start"
                          style="width: 100%"
                        >
                          <div class="col-auto">
                            <q-checkbox
                              v-model="selectedWhy"
                              :val="item.code"
                              @update:model-value="
                                handleSelectWhyRevision($event, item)
                              "
                              :disable="customModel !== 'yes'"
                              style="margin-top: 45px"
                            />
                          </div>
                          <div class="col flex items-start full-width">
                            <div
                              class="text-primary text-subtitle1 text-weight-bold q-mb-sm"
                            >
                              Why?
                            </div>

                            <q-input
                              autogrow
                              rounded
                              outlined
                              :model-value="
                                item.description || 'No Data Available'
                              "
                              disable
                              class="full-width"
                              :class="
                                selectedWhy.includes(item.code)
                                  ? 'bg-red text-white'
                                  : ''
                              "
                            />

                            <!-- Additional input field (shown when checkbox is checked) -->
                            <div
                              v-if="selectedWhy.includes(item.code)"
                              class="full-width"
                            >
                              <q-input
                                v-model="whyNotes[item.code]"
                                label="Quality Assurance (QA) Note"
                                autogrow
                                rounded
                                outlined
                                class="q-mt-sm full-width"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      class="col-6 q-px-sx"
                      v-if="
                        IRRCADetailss.RCAProblemStatementLogs?.find(
                          (m) => m.problemCode === 'MACHINE'
                        )?.description
                      "
                    >
                      <div
                        class="fishboneDesign q-pa-sm bg-white"
                        style="
                          border: 5px solid rgba(233, 30, 99, 0.6);
                          border-radius: 40px;
                        "
                      >
                        <div
                          class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center"
                        >
                          Machine/s
                        </div>

                        <div
                          class="text-center text-black q-mb-md"
                          style="font-size: 15px"
                        >
                          This refers to the assets such as machines and
                          equipement used to create or provide the product or
                          services.
                        </div>

                        <div
                          v-for="(
                            item, index
                          ) in IRRCADetailss.RCAProblemStatementLogs?.filter(
                            (m) => m.problemCode === 'MACHINE'
                          )"
                          :key="index"
                          class="q-pa-sm bg-white row items-start"
                          style="width: 100%"
                        >
                          <!-- Checkbox -->
                          <div class="col-auto flex items-start q-mt-sm">
                            <q-checkbox
                              :disable="customModel !== 'yes'"
                              style="display: none"
                              v-model="selectedProblemStatement"
                              :val="item.code"
                              @update:model-value="
                                handleSelectProblemStatementRevision(
                                  $event,
                                  item
                                )
                              "
                            />
                          </div>

                          <!-- Text & Input Fields -->
                          <div class="col">
                            <div
                              class="text-primary text-subtitle1 text-weight-bold q-mb-sm"
                            >
                              Problem Statement
                            </div>

                            <q-input
                              autogrow
                              rounded
                              outlined
                              :model-value="
                                item.description || 'No Data Available'
                              "
                              disable
                              class="full-width"
                              :class="
                                selectedProblemStatement.includes(item.code)
                                  ? 'bg-red text-white'
                                  : ''
                              "
                            />

                            <!-- Conditionally render the second input below -->
                            <div
                              v-if="
                                selectedProblemStatement.includes(item.code)
                              "
                            >
                              <q-input
                                v-model="problemStatmentNote[item.code]"
                                label="Quality Assurance (QA) Note"
                                autogrow
                                square
                                outlined
                                class="q-mt-sm"
                              />
                            </div>
                          </div>
                        </div>

                        <q-separator class="formseparatorYellow" />

                        <div
                          v-for="(
                            item, index
                          ) in IRRCADetailss.RCAWhyLog?.filter(
                            (m) => m.problemName === 'MACHINE'
                          )"
                          :key="index"
                          class="q-pa-sm row items-start"
                          style="width: 100%"
                        >
                          <div class="col-auto">
                            <q-checkbox
                              v-model="selectedWhy"
                              :val="item.code"
                              @update:model-value="
                                handleSelectWhyRevision($event, item)
                              "
                              :disable="customModel !== 'yes'"
                              style="margin-top: 45px"
                            />
                          </div>
                          <div class="col flex items-start full-width">
                            <div
                              class="text-primary text-subtitle1 text-weight-bold q-mb-sm"
                            >
                              Why?
                            </div>

                            <q-input
                              autogrow
                              rounded
                              outlined
                              :model-value="
                                item.description || 'No Data Available'
                              "
                              disable
                              class="full-width"
                              :class="
                                selectedWhy.includes(item.code)
                                  ? 'bg-red text-white'
                                  : ''
                              "
                            />

                            <!-- Additional input field (shown when checkbox is checked) -->
                            <div
                              v-if="selectedWhy.includes(item.code)"
                              class="full-width"
                            >
                              <q-input
                                v-model="whyNotes[item.code]"
                                label="Quality Assurance (QA) Note"
                                autogrow
                                rounded
                                outlined
                                class="q-mt-md"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      class="col-6 q-px-sx"
                      v-if="
                        IRRCADetailss.RCAProblemStatementLogs?.find(
                          (m) => m.problemCode === 'MATERIAL'
                        )?.description
                      "
                    >
                      <div
                        class="fishboneDesign q-pa-sm bg-white"
                        style="
                          border: 5px solid rgba(156, 39, 176, 0.6);
                          border-radius: 40px;
                        "
                      >
                        <div
                          class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center"
                        >
                          Material/s
                        </div>

                        <div
                          class="text-center text-black q-mb-md"
                          style="font-size: 15px"
                        >
                          This refers to any physical or non-physical components
                          of the system, including people, resources, and tools.
                        </div>

                        <div
                          v-for="(
                            item, index
                          ) in IRRCADetailss.RCAProblemStatementLogs?.filter(
                            (m) => m.problemCode === 'MATERIAL'
                          )"
                          :key="index"
                          class="q-pa-sm bg-white row items-start"
                          style="width: 100%"
                        >
                          <!-- Checkbox -->
                          <div class="col-auto flex items-start q-mt-sm">
                            <q-checkbox
                              :disable="customModel !== 'yes'"
                              style="display: none"
                              v-model="selectedProblemStatement"
                              :val="item.code"
                              @update:model-value="
                                handleSelectProblemStatementRevision(
                                  $event,
                                  item
                                )
                              "
                            />
                          </div>

                          <!-- Text & Input Fields -->
                          <div class="col">
                            <div
                              class="text-primary text-subtitle1 text-weight-bold q-mb-sm"
                            >
                              Problem Statement
                            </div>
                            <q-input
                              autogrow
                              rounded
                              outlined
                              :model-value="
                                item.description || 'No Data Available'
                              "
                              disable
                              class="full-width"
                              :class="
                                selectedProblemStatement.includes(item.code)
                                  ? 'bg-red text-white'
                                  : ''
                              "
                            />

                            <!-- Conditionally render the second input below -->
                            <div
                              v-if="
                                selectedProblemStatement.includes(item.code)
                              "
                            >
                              <q-input
                                v-model="problemStatmentNote[item.code]"
                                label="Quality Assurance (QA) Note"
                                autogrow
                                rounded
                                outlined
                                class="q-mt-sm"
                              />
                            </div>
                          </div>
                        </div>

                        <q-separator class="formseparatorYellow" />

                        <div
                          v-for="(
                            item, index
                          ) in IRRCADetailss.RCAWhyLog?.filter(
                            (m) => m.problemName === 'MATERIAL'
                          )"
                          :key="index"
                          class="q-pa-sm row items-start"
                          style="width: 100%"
                        >
                          <div class="col-auto">
                            <q-checkbox
                              v-model="selectedWhy"
                              :val="item.code"
                              @update:model-value="
                                handleSelectWhyRevision($event, item)
                              "
                              :disable="customModel !== 'yes'"
                              style="margin-top: 45px"
                            />
                          </div>
                          <div class="col flex items-start full-width">
                            <div
                              class="text-primary text-subtitle1 text-weight-bold q-mb-sm"
                            >
                              Why?
                            </div>

                            <q-input
                              autogrow
                              rounded
                              outlined
                              :model-value="
                                item.description || 'No Data Available'
                              "
                              disable
                              class="full-width"
                              :class="
                                selectedWhy.includes(item.code)
                                  ? 'bg-red text-white'
                                  : ''
                              "
                            />

                            <!-- Additional input field (shown when checkbox is checked) -->
                            <div
                              v-if="selectedWhy.includes(item.code)"
                              class="full-width"
                            >
                              <q-input
                                v-model="whyNotes[item.code]"
                                label="Quality Assurance (QA) Note"
                                autogrow
                                rounded
                                outlined
                                class="q-mt-md"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      class="col-6 q-px-sx"
                      v-if="
                        IRRCADetailss.RCAProblemStatementLogs?.find(
                          (m) => m.problemCode === 'MEASUREMENT'
                        )?.description
                      "
                    >
                      <div
                        class="fishboneDesign q-pa-sm bg-white"
                        style="
                          border: 5px solid rgba(3, 169, 244, 0.6);
                          border-radius: 40px;
                        "
                      >
                        <div
                          class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center"
                        >
                          Measurement/s
                        </div>

                        <div
                          class="text-center text-black q-mb-md"
                          style="font-size: 15px"
                        >
                          This refers to the tools and methods that
                          organizations use to effectively measure progress,
                          outcomes, and overall performance.
                        </div>

                        <div
                          v-for="(
                            item, index
                          ) in IRRCADetailss.RCAProblemStatementLogs?.filter(
                            (m) => m.problemCode === 'MEASUREMENT'
                          )"
                          :key="index"
                          class="q-pa-sm bg-white row items-start"
                          style="width: 100%"
                        >
                          <!-- Checkbox -->
                          <div class="col-auto flex items-start q-mt-sm">
                            <q-checkbox
                              :disable="customModel !== 'yes'"
                              style="display: none"
                              v-model="selectedProblemStatement"
                              :val="item.code"
                              @update:model-value="
                                handleSelectProblemStatementRevision(
                                  $event,
                                  item
                                )
                              "
                            />
                          </div>

                          <!-- Text & Input Fields -->
                          <div class="col">
                            <div
                              class="text-primary text-subtitle1 text-weight-bold q-mb-sm"
                            >
                              Problem Statement
                            </div>

                            <q-input
                              autogrow
                              rounded
                              outlined
                              :model-value="
                                item.description || 'No Data Available'
                              "
                              disable
                              class="full-width"
                              :class="
                                selectedProblemStatement.includes(item.code)
                                  ? 'bg-red text-white'
                                  : ''
                              "
                            />

                            <!-- Conditionally render the second input below -->
                            <div
                              v-if="
                                selectedProblemStatement.includes(item.code)
                              "
                            >
                              <q-input
                                v-model="problemStatmentNote[item.code]"
                                label="Enter details"
                                autogrow
                                square
                                outlined
                                class="q-mt-sm"
                              />
                            </div>
                          </div>
                        </div>

                        <q-separator class="formseparatorYellow" />

                        <div
                          v-for="(
                            item, index
                          ) in IRRCADetailss.RCAWhyLog?.filter(
                            (m) => m.problemName === 'MEASUREMENT'
                          )"
                          :key="index"
                          class="q-pa-sm row items-start"
                          style="width: 100%"
                        >
                          <div class="col-auto">
                            <q-checkbox
                              v-model="selectedWhy"
                              :val="item.code"
                              @update:model-value="
                                handleSelectWhyRevision($event, item)
                              "
                              :disable="customModel !== 'yes'"
                              style="margin-top: 45px"
                            />
                          </div>
                          <div class="col flex items-start full-width">
                            <div
                              class="text-primary text-subtitle1 text-weight-bold q-mb-sm"
                            >
                              Why?
                            </div>
                            <q-input
                              autogrow
                              rounded
                              outlined
                              :model-value="
                                item.description || 'No Data Available'
                              "
                              disable
                              class="full-width"
                              :class="
                                selectedWhy.includes(item.code)
                                  ? 'bg-red text-white'
                                  : ''
                              "
                            />

                            <!-- Additional input field (shown when checkbox is checked) -->
                            <div
                              v-if="selectedWhy.includes(item.code)"
                              class="full-width"
                            >
                              <q-input
                                v-model="whyNotes[item.code]"
                                label="Quality Assurance (QA) Note"
                                autogrow
                                rounded
                                outlined
                                class="q-mt-md"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      class="col-6 q-px-sx"
                      v-if="
                        IRRCADetailss.RCAProblemStatementLogs?.find(
                          (m) => m.problemCode === 'ENVIRONMENT'
                        )?.description
                      "
                    >
                      <div
                        class="fishboneDesign q-pa-sm bg-white"
                        style="
                          border: 5px solid rgba(76, 175, 80, 0.6);
                          border-radius: 40px;
                        "
                      >
                        <div
                          class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center"
                        >
                          Environment/s
                        </div>

                        <div
                          class="text-center text-black q-mb-md"
                          style="font-size: 15px"
                        >
                          This refers to various external factors influencing
                          the system, such as weather conditions, geographic
                          location, and regulatory policies.
                        </div>

                        <div
                          v-for="(
                            item, index
                          ) in IRRCADetailss.RCAProblemStatementLogs?.filter(
                            (m) => m.problemCode === 'ENVIRONMENT'
                          )"
                          :key="index"
                          class="q-pa-sm bg-white row items-start"
                          style="width: 100%"
                        >
                          <!-- Checkbox -->
                          <div class="col-auto flex items-start q-mt-sm">
                            <q-checkbox
                              :disable="customModel !== 'yes'"
                              style="display: none"
                              v-model="selectedProblemStatement"
                              :val="item.code"
                              @update:model-value="
                                handleSelectProblemStatementRevision(
                                  $event,
                                  item
                                )
                              "
                            />
                          </div>

                          <!-- Text & Input Fields -->
                          <div class="col">
                            <div
                              class="text-primary text-subtitle1 text-weight-bold q-mb-sm"
                            >
                              Problem Statement
                            </div>
                            <q-input
                              autogrow
                              rounded
                              outlined
                              :model-value="
                                item.description || 'No Data Available'
                              "
                              disable
                              class="full-width"
                              :class="
                                selectedProblemStatement.includes(item.code)
                                  ? 'bg-red text-white'
                                  : ''
                              "
                            />

                            <!-- Conditionally render the second input below -->
                            <div
                              v-if="
                                selectedProblemStatement.includes(item.code)
                              "
                            >
                              <q-input
                                v-model="problemStatmentNote[item.code]"
                                label="Quality Assurance (QA) Note"
                                autogrow
                                square
                                outlined
                                class="q-mt-md"
                              />
                            </div>
                          </div>
                        </div>

                        <q-separator class="formseparatorYellow" />

                        <div
                          v-for="(
                            item, index
                          ) in IRRCADetailss.RCAWhyLog?.filter(
                            (m) => m.problemName === 'ENVIRONMENT'
                          )"
                          :key="index"
                          class="q-pa-sm row items-start"
                          style="width: 100%"
                        >
                          <div class="col-auto">
                            <q-checkbox
                              v-model="selectedWhy"
                              :val="item.code"
                              @update:model-value="
                                handleSelectWhyRevision($event, item)
                              "
                              :disable="customModel !== 'yes'"
                              style="margin-top: 45px"
                            />
                          </div>
                          <div class="col flex items-start full-width">
                            <div
                              class="text-primary text-subtitle1 text-weight-bold q-mb-sm"
                            >
                              Why?
                            </div>

                            <q-input
                              autogrow
                              rounded
                              outlined
                              :model-value="
                                item.description || 'No Data Available'
                              "
                              disable
                              class="full-width"
                              :class="
                                selectedWhy.includes(item.code)
                                  ? 'bg-red text-white'
                                  : ''
                              "
                            />

                            <!-- Additional input field (shown when checkbox is checked) -->
                            <div
                              v-if="selectedWhy.includes(item.code)"
                              class="full-width"
                            >
                              <q-input
                                v-model="whyNotes[item.code]"
                                label="Quality Assurance (QA) Note"
                                autogrow
                                rounded
                                outlined
                                class="q-mt-md"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </q-card-section>

                <q-card-section class="q-mt-md" style="border: 2px solid #ddd">
                  <div
                    v-for="(item, index) in IRRCADetailss.RCAActionableLog"
                    :key="index"
                    class="QADes1 column items-center justify-center q-mb-md"
                  >
                    <div class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center">
                      Actionable Root Cause
                    </div>

                    <div class="text-center q-mb-md" style="font-size: 15px; color: #737373">
                      From the results of your Fishbone Diagram and 5 Whys analysis, <br />
                      this represents the most critical underlying cause that requires corrective action
                      to prevent the issue from recurring.
                    </div>

                    <!-- Domain Label -->
                    <q-input
                      rounded
                      outlined
                      disable
                      :model-value="getDomainLabel(item.domain)"
                      label="Domain"
                      class="q-mt-md"
                      style="width: 100%"
                    />

                    <!-- Selection Checkbox -->
                    <q-checkbox
                      :model-value="selectedActionable.some(i => i.code === item.code)"
                      :disable="customModel !== 'yes'"
                      @update:model-value="val => handleSelectActionable(val ? [item.code] : [], item)"
                      label="Select Actionable"
                      class="q-mt-sm"
                    />

                    <!-- Actionable Text -->
                    <q-input
                      rounded
                      outlined
                      label="Actionable Root Cause"
                      type="textarea"
                      :disable="!selectedActionable.some(i => i.code === item.code)"
                      :model-value="item.actionable"
                      class="q-mt-md transition-all"
                      :class="{
                        'bg-red text-white': selectedActionable.some(i => i.code === item.code)
                      }"
                      style="width: 100%"
                    />

                    <!-- QA Note (conditional) -->
                    <div
                      v-if="selectedActionable.some(i => i.code === item.code)"
                      class="q-mt-md"
                      style="width: 100%"
                    >
                      <q-input
                        v-model="ActionableNotes[item.code]"
                        label="Quality Assurance (QA) Note"
                        type="textarea"
                        rounded
                        outlined
                        class="q-mt-md"
                      />
                    </div>
                  </div>
                </q-card-section>

                <q-card-section class="q-mt-md" style="border: 2px solid #ddd">
                  <div
                    class="QADes1 column items-center justify-center q-mb-md"
                  >
                    <div
                      class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center"
                    >
                      Solution Identification
                    </div>
                    <div
                      class="text-center"
                      style="font-size: 15px; color: #737373"
                    >
                      Identify effective solutions by proposing corrective
                      actions to immediately address root causes and preventive
                      measures to avoid recurrence, specifying responsibilities
                      and timelines for each.
                    </div>
                  </div>

                  <q-separator class="formseparatorWhite" />

                  <div
                    class="QADes1 shadow-2"
                    style="
                      border: 3px solid #6b7c93;
                      border-radius: 40px;
                      padding: 30px;
                    "
                  >
                    <div
                      class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                    >
                      Corrective Action
                    </div>

                    <div
                      class="q-mb-sm"
                      style="font-size: 15px; color: #737373"
                    >
                      Specify immediate actions to address identified root
                      causes, including responsible individuals and deadlines
                      for implementation. You may add more fields as needed.
                    </div>

                    <q-separator class="formseparatorYellow" />

                    <div
                      class="row q-col-gutter-md q-mt-xs q-mb-xs items-center q-ml-md"
                      v-for="(item, index) in IRRCADetailss.RCACorrectiveLog"
                      :key="index"
                    >
                      <q-checkbox
                        :model-value="selectedCorrective.map((i) => i.code)"
                        :val="item.code"
                        :disable="customModel !== 'yes'"
                        @update:model-value="
                          (val) => handleSelectCorrectiveRevision(val, item)
                        "
                        style="margin-top: 25px"
                      />

                      <div class="col-5">
                        <div
                          class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                        >
                          Corrective Action Note
                        </div>
                        <q-input
                          autogrow
                          rounded
                          outlined
                          :model-value="
                            item.correctiveAction || 'No Data Available'
                          "
                          disable
                          class="full-width"
                          :class="
                            selectedCorrective.some((i) => i.code === item.code)
                              ? 'bg-red text-white'
                              : ''
                          "
                          style=""
                        />

                        <div
                          v-if="
                            selectedCorrective.some((i) => i.code === item.code)
                          "
                        >
                          <q-input
                            v-model="correctiveNotes[item.code]"
                            label="Quality Assurance (QA) Note"
                            autogrow
                            rounded
                            outlined
                            class="q-mt-md"
                          />
                        </div>
                      </div>

                      <div class="col-2">
                        <div
                          class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                        >
                          Timeline From
                        </div>
                        <q-input
                          autogrow
                          rounded
                          outlined
                          :model-value="
                            FormatDate(item.corTimelineFromDate) ||
                            'No Data Available'
                          "
                          disable
                        />
                      </div>

                      <div class="col-2">
                        <div
                          class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                        >
                          Timeline To
                        </div>

                        <q-input
                          autogrow
                          rounded
                          outlined
                          :model-value="
                            FormatDate(item.corTimelineToDate) ||
                            'No Data Available'
                          "
                          disable
                        />
                      </div>
                      <div class="col-2">
                        <div
                          class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                        >
                          Accountable Person/s
                        </div>

                        <q-input
                          autogrow
                          rounded
                          outlined
                          :model-value="
                            EmploFullName(item.accountablePer) || 'No Data Available'
                          "
                          disable
                        />
                      </div>
                    </div>
                  </div>

                  <!-- <q-separator class="formseparatorWhite" />

                  <div
                    class="QADes1 shadow-2"
                    style="
                      border: 3px solid #6b7c93;
                      border-radius: 40px;
                      padding: 30px;
                    "
                  >
                    <div
                      class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                    >
                      Preventive Measures
                    </div>

                    <div
                      class="q-mb-sm"
                      style="font-size: 15px; color: #737373"
                    >
                      Outline long-term preventive measures, considering changes
                      to policies, procedures, training, and organizational
                      culture. You may add more fields as needed.
                    </div>

                    <q-separator class="formseparatorYellow" />

                    <div
                      class="row q-col-gutter-md q-mt-xs q-mb-xs items-center q-ml-md"
                      v-for="(item, index) in IRRCADetailss.RCAPreventiveLog"
                      :key="index"
                    >
                      <q-checkbox
                        :model-value="selectedPreventive.map((i) => i.code)"
                        :val="item.code"
                        :disable="customModel !== 'yes'"
                        @update:model-value="
                          (val) => handleSelectPreventiveRevision(val, item)
                        "
                        style="margin-top: 25px"
                      />

                      <div class="col-5">
                        <div
                          class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                        >
                          Preventive Measure Note
                        </div>

                        <q-input
                          autogrow
                          rounded
                          outlined
                          :model-value="
                            item.preventiveMeasure || 'No Data Available'
                          "
                          disable
                          class="full-width"
                          :class="
                            selectedPreventive.some((i) => i.code === item.code)
                              ? 'bg-red text-white'
                              : ''
                          "
                        />

                        <div
                          v-if="
                            selectedPreventive.some((i) => i.code === item.code)
                          "
                        >
                          <q-input
                            v-model="preventiveNotes[item.code]"
                            label="Quality Assurance (QA) Note"
                            autogrow
                            rounded
                            outlined
                            class="q-mt-md"
                          />
                        </div>
                      </div>

                      <div class="col-2">
                        <div
                          class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                        >
                          Timeline From
                        </div>
                        <q-input
                          autogrow
                          rounded
                          outlined
                          :model-value="
                            FormatDate(item.preTimelineFromDate) ||
                            'No Data Available'
                          "
                          disable
                        />
                      </div>

                      <div class="col-2">
                        <div
                          class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                        >
                          Timeline To
                        </div>

                        <q-input
                          autogrow
                          rounded
                          outlined
                          :model-value="
                            FormatDate(item.preTimelineToDate) ||
                            'No Data Available'
                          "
                          disable
                        />
                      </div>

                      <div class="col-2">
                        <div
                          class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                        >
                          Responsible Person/s
                        </div>

                        <q-input
                          autogrow
                          rounded
                          outlined
                          :model-value="
                            EmploFullName(item.responsiblePer) || 'No Data Available'
                          "
                          disable
                        />
                      </div>
                    </div>
                  </div> -->
                </q-card-section>
              </q-card-section>

              <q-card-actions
                align="center"
                class="q-mt-md column items-center"
              >
                <div class="row q-gutter-xxl; justify-center">
                  <q-btn
                    flat
                    rounded
                    push
                    label="CLOSE"
                    class="buttonCancelDesign text-info"
                    @click="onCancelEditRevisionRCADetails"
                  />

                  <q-btn
                    flat
                    rounded
                    push
                    label="SAVE"
                    class="buttonSaveDesign bg-accent text-black"
                    @click="editReturnRCARevision(selectedIrNo)"
                  />
                </div>
              </q-card-actions>
            </q-card>
          </div>
        </q-dialog>

        <!-- ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->

        <q-dialog v-model="rcaReject" persistent maximized>
          <div
            class="fullscreen flex flex-center column q-gutter-md"
            style="background-color: rgba(0, 0, 0, 0.85)"
          >
            <q-spinner-ios size="150px" color="white" />

            <div class="text-center text-subtitle1 text-white">
              Sending back the rejected RCA.
              <br />
              <span class="text-italic text-accent">Please wait...</span>
            </div>
          </div>
        </q-dialog>

        <!-- ////////////////////////////////////////////////////////////////////////// FOR REVIEW /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->

        <q-dialog v-model="setRCAReviewSubDialogs">
          <q-card class="QAConfirmAction">
            <q-card-section class="q-mb-sm row justify-center">
              <div
                class="text-secondary text-weight-bold text-center"
                style="font-size: 25px; color: #002b5c"
              >
                CONFIRM RCA SUBMISSION
              </div>
            </q-card-section>

            <q-separator class="formseparatorBlue" />

            <q-card-section>
              <div class="text-dark text-subtitle1 q-mb-sx text-center">
                Do you receive the Root Cause Analysis (RCA) Form?
              </div>
            </q-card-section>

            <q-card-section style="display: none;">
              <div>Latest Revision Code: {{ latestRevisionCode }}</div>
            </q-card-section>

            <div class="row q-gutter-xxl; justify-center">
              <q-btn
                flat
                rounded
                push
                label="NO"
                class="buttonCancelDesign text-info"
                @click="setRCAReviewSubDialogs = false"
              />

              <q-btn
                flat
                rounded
                push
                label="YES"
                class="buttonSaveDesign bg-accent text-black"
                @click="saveIRCAReview(selectedIrNo, latestRevisionCode)"
              />
            </div>
          </q-card>
        </q-dialog>

        <!-- ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->

        <q-dialog maximized v-model="setReviewDisplay">
          <div class="QAModuleDiag">
            <q-card class="contentFormQARCA">
              <q-card-section class="q-mb-xs row items-center justify-between">
                <div>
                  <div
                    class="text-secondary text-weight-bold"
                    style="font-size: 25px; color: #002b5c"
                  >
                    Incident Report: Root Cause Analysis (RCA) Remarks
                  </div>
                </div>

                <q-btn
                  flat
                  icon="close"
                  style="
                    color: #003566;
                    background-color: rgba(22, 110, 204, 0.1);
                  "
                  @click="this.setReviewDisplay = false"
                  v-close-popup
                >
                  <q-tooltip class="bg-info text-white"> Close Form </q-tooltip>
                </q-btn>
              </q-card-section>

              <q-card-section class="q-mt-md" style="border: 2px solid #ddd">
                <div class="QADes1 column items-center justify-center q-mb-md">
                  <div
                    class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center"
                  >
                    Fishbone / Ishikawa Diagram and 5 Whys Analysis
                  </div>
                  <div
                    class="text-center q-mb-md"
                    style="font-size: 15px; color: #737373"
                  >
                    Identify potential root causes using a Fishbone Diagram,
                    then apply the 5 Whys technique to each cause to determine
                    the true root issue.
                  </div>
                </div>

                <div class="row q-col-gutter-md q-ml-sx q-mr-sx" v-if="whyReviewLogs.length > 0">
                  <div
                    class="col-6 q-px-sx"
                    v-if="(IRRCAReturnReviewDetailss.RCAWhyReviewLogReturn?.filter(
                      (m) => m.problemName === 'MANPOWER'
                    ) || []).length > 0"
                  >
                    <div
                      class="fishboneDesign q-pa-sm bg-white"
                      style="
                        border: 5px solid rgba(211, 47, 47, 0.6);
                        border-radius: 40px;
                      "
                    >
                      <div
                        class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center"
                      >
                        Manpower/s
                      </div>

                      <div
                        class="text-center text-black q-mb-md"
                        style="font-size: 15px"
                      >
                        This refers to the manpowers involved in the process,
                        including skills, training, experience, communication, and accountability.
                      </div>

                      <q-separator class="formseparatorYellow" />

                      <div class="q-mx-sm q-mb-sm">
                        <div
                          v-for="(
                            item, index
                          ) in IRRCAReturnReviewDetailss.RCAWhyReviewLogReturn?.filter(
                            (m) => m.problemName === 'MANPOWER'
                          )"
                          :key="index"
                          class="q-mb-sm"
                        >
                          <div
                            class="text-primary text-subtitle1 text-weight-bold"
                          >
                            Why?
                          </div>

                          <q-input
                            autogrow
                            rounded
                            outlined
                            :model-value="
                              item.description || 'No Data Available'
                            "
                            disable
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    class="col-6 q-px-sx"
                    v-if="(IRRCAReturnReviewDetailss.RCAWhyReviewLogReturn?.filter(
                      (m) => m.problemName === 'METHOD'
                    ) || []).length > 0"
                  >
                    <div
                      class="fishboneDesign q-pa-sm bg-white"
                      style="
                        border: 5px solid rgba(255, 193, 7, 0.6);
                        border-radius: 40px;
                      "
                    >
                      <div
                        class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center"
                      >
                        Method/s
                      </div>

                      <div
                        class="text-center text-black q-mb-md"
                        style="font-size: 15px"
                      >
                        This refers to the methods and procedures an
                        organization uses <br/> to produce or deliver its product or
                        service.
                      </div>

                      <q-separator class="formseparatorYellow" />

                      <div class="q-mx-sm q-mb-sm">
                        <div
                          v-for="(
                            item, index
                          ) in IRRCAReturnReviewDetailss.RCAWhyReviewLogReturn?.filter(
                            (m) => m.problemName === 'METHOD'
                          )"
                          :key="index"
                          class="q-mb-sm"
                        >
                          <div
                            class="text-primary text-subtitle1 text-weight-bold"
                          >
                            Why?
                          </div>

                          <q-input
                            autogrow
                            rounded
                            outlined
                            :model-value="
                              item.description || 'No Data Available'
                            "
                            disable
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    class="col-6 q-px-sx"
                    v-if="(IRRCAReturnReviewDetailss.RCAWhyReviewLogReturn?.filter(
                      (m) => m.problemName === 'MACHINE'
                    ) || []).length > 0"
                  >
                    <div
                      class="fishboneDesign q-pa-sm bg-white"
                      style="
                        border: 5px solid rgba(233, 30, 99, 0.6);
                        border-radius: 40px;
                      "
                    >
                      <div
                        class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center"
                      >
                        Machine/s
                      </div>

                      <div
                        class="text-center text-black q-mb-md"
                        style="font-size: 15px"
                      >
                        This refers to the assets such as machines and
                        equipement used <br/> to create or provide the product or
                        services.
                      </div>

                      <q-separator class="formseparatorYellow" />

                      <div class="q-mx-sm q-mb-sm">
                        <div
                          v-for="(
                            item, index
                          ) in IRRCAReturnReviewDetailss.RCAWhyReviewLogReturn?.filter(
                            (m) => m.problemName === 'MACHINE'
                          )"
                          :key="index"
                          class="q-mb-sm"
                        >
                          <div
                            class="text-primary text-subtitle1 text-weight-bold"
                          >
                            Why?
                          </div>

                          <q-input
                            autogrow
                            rounded
                            outlined
                            :model-value="
                              item.description || 'No Data Available'
                            "
                            disable
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    class="col-6 q-px-sx"
                    v-if="(IRRCAReturnReviewDetailss.RCAWhyReviewLogReturn?.filter(
                      (m) => m.problemName === 'MATERIAL'
                    ) || []).length > 0"
                  >
                    <div
                      class="fishboneDesign q-pa-sm bg-white"
                      style="
                        border: 5px solid rgba(156, 39, 176, 0.6);
                        border-radius: 40px;
                      "
                    >
                      <div
                        class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center"
                      >
                        Material/s
                      </div>

                      <div
                        class="text-center text-black q-mb-md"
                        style="font-size: 15px"
                      >
                        This refers to any physical or non-physical components
                        <br/> of the system, including people, resources, and tools.
                      </div>

                      <q-separator class="formseparatorYellow" />

                      <div class="q-mx-sm q-mb-sm">
                        <div
                          v-for="(
                            item, index
                          ) in IRRCAReturnReviewDetailss.RCAWhyReviewLogReturn?.filter(
                            (m) => m.problemName === 'MATERIAL'
                          )"
                          :key="index"
                          class="q-mb-sm"
                        >
                          <div
                            class="text-primary text-subtitle1 text-weight-bold"
                          >
                            Why?
                          </div>

                          <q-input
                            autogrow
                            rounded
                            outlined
                            :model-value="
                              item.description || 'No Data Available'
                            "
                            disable
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    class="col-6 q-px-sx"
                    v-if="(IRRCAReturnReviewDetailss.RCAWhyReviewLogReturn?.filter(
                      (m) => m.problemName === 'MEASUREMENT'
                    ) || []).length > 0"
                  >
                    <div
                      class="fishboneDesign q-pa-sm bg-white"
                      style="
                        border: 5px solid rgba(3, 169, 244, 0.6);
                        border-radius: 40px;
                      "
                    >
                      <div
                        class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center"
                      >
                        Measurement/s
                      </div>

                      <div
                        class="text-center text-black q-mb-md"
                        style="font-size: 15px"
                      >
                        This refers to the tools and methods that organizations
                        use <br/> to effectively measure progress, outcomes, and
                        overall performance.
                      </div>

                      <q-separator class="formseparatorYellow" />

                      <div class="q-mx-sm q-mb-sm">
                        <div
                          v-for="(
                            item, index
                          ) in IRRCAReturnReviewDetailss.RCAWhyReviewLogReturn?.filter(
                            (m) => m.problemName === 'MEASUREMENT'
                          )"
                          :key="index"
                          class="q-mb-sm"
                        >
                          <div
                            class="text-primary text-subtitle1 text-weight-bold"
                          >
                            Why?
                          </div>

                          <q-input
                            autogrow
                            rounded
                            outlined
                            :model-value="
                              item.description || 'No Data Available'
                            "
                            disable
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    class="col-6 q-px-sx"
                    v-if="(IRRCAReturnReviewDetailss.RCAWhyReviewLogReturn?.filter(
                      (m) => m.problemName === 'ENVIRONMENT'
                    ) || []).length > 0"
                  >
                    <div
                      class="fishboneDesign q-pa-sm bg-white"
                      style="
                        border: 5px solid rgba(76, 175, 80, 0.6);
                        border-radius: 40px;
                      "
                    >
                      <div
                        class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center"
                      >
                        Environment/s
                      </div>

                      <div
                        class="text-center text-black q-mb-md"
                        style="font-size: 15px"
                      >
                        This refers to the external factors that affect <br/> the
                        system including weather, geography, and regulation.
                      </div>

                      <q-separator class="formseparatorYellow" />

                      <div class="q-mx-sm q-mb-sm">
                        <div
                          v-for="(
                            item, index
                          ) in IRRCAReturnReviewDetailss.RCAWhyReviewLogReturn?.filter(
                            (m) => m.problemName === 'ENVIRONMENT'
                          )"
                          :key="index"
                          class="q-mb-sm"
                        >
                          <div
                            class="text-primary text-subtitle1 text-weight-bold"
                          >
                            Why?
                          </div>

                          <q-input
                            autogrow
                            rounded
                            outlined
                            :model-value="
                              item.description || 'No Data Available'
                            "
                            disable
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="QAFileDes column flex-center" v-else>
                  <div
                    class="text-subtitle1 items-center text-weight-bold text-dark"
                  >
                    <i>~ No Content Available ~</i>
                  </div>
                </div>
              </q-card-section>

              <q-card-section class="q-mt-md" style="border: 2px solid #ddd">
                  <div class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center">
                    Actionable Root Cause
                  </div>

                  <div class="text-center q-mb-md" style="font-size: 15px; color: #737373">
                    From the results of your Fishbone Diagram and 5 Whys analysis, <br />
                    this represents the most critical underlying cause that requires corrective action
                    to prevent the issue from recurring.
                  </div>

                  <div v-if="actionableReviewLogs.length > 0">
                    <q-input
                      rounded
                      outlined
                      disable
                      :model-value="getDomainLabel(actionableReviewLogs[0].domain)"
                      label="Domain"
                      class="q-mt-md"
                      style="width: 100%"
                    />

                    <div v-for="( item, index)
                    in IRRCAReturnReviewDetailss.RCAActionableReviewLogReturn"
                    :key="index">

                      <q-input
                        rounded
                        outlined
                        label="Note"
                        type="textarea"
                        class="q-mt-md"
                        :model-value="item.actionable"
                        autofocus
                        disable
                        style="width: 100%"
                      />
                    </div>
                  </div>

                  <div class="QAFileDes column flex-center" v-else>
                    <div
                      class="text-subtitle1 items-center text-weight-bold text-dark"
                    >
                      <i>~ No Content Available ~</i>
                    </div>
                </div>
              </q-card-section>

              <q-card-section class="q-mt-md" style="border: 2px solid #ddd">
                <div class="QADes1 column items-center justify-center q-mb-md">
                  <div
                    class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center"
                  >
                    Solution Identification
                  </div>
                  <div
                    class="text-center"
                    style="font-size: 15px; color: #737373"
                  >
                    Identify effective solutions by proposing corrective actions
                    to immediately address root causes and preventive measures
                    to avoid recurrence, specifying responsibilities and
                    timelines for each.
                  </div>
                </div>

                <div v-if="corReviewLogs.length > 0">
                  <div
                    class="QADes1 shadow-2"
                    style="
                      border: 3px solid #6b7c93;
                      border-radius: 40px;
                      padding: 30px;
                    ">

                    <div
                      class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                    >
                      Corrective Action
                    </div>

                    <div class="q-mb-sm" style="font-size: 15px; color: #737373">
                      Specify immediate actions to address identified root causes,
                      including responsible individuals and deadlines for
                      implementation. You may add more fields as needed.
                    </div>

                    <q-separator class="formseparatorYellow" />

                    <div>
                      <div
                        class="q-pa-sm"
                        v-for="(
                          item, index
                        ) in IRRCAReturnReviewDetailss.RCACorrectiveReviewLogReturn"
                        :key="index"
                      >
                        <div class="col">
                          <div
                            class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                          >
                            Corrective Action Note
                          </div>

                          <q-input
                            autogrow
                            rounded
                            outlined
                            :model-value="
                              item.correctiveAction || 'No Data Available'
                            "
                            disable
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- <div
                    class="QADes1 shadow-2"
                    style="
                      border: 3px solid #6b7c93;
                      border-radius: 40px;
                      padding: 10px;
                    "
                    v-if="(IRRCAReturnReviewDetailss.RCAPreventiveReviewLogReturn || []).length">

                    <div
                      class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                    >
                      Preventive Measures
                    </div>

                    <div class="q-mb-sm" style="font-size: 15px; color: #737373">
                      Outline long-term preventive measures, considering changes
                      to policies, procedures, training, and organizational
                      culture. You may add more fields as needed.
                    </div>

                    <q-separator class="formseparatorYellow" />

                    <div>
                      <div
                        class="q-pa-md"
                        v-for="(
                          item, index
                        ) in IRRCAReturnReviewDetailss.RCAPreventiveReviewLogReturn"
                        :key="index"
                      >
                        <div class="col">
                          <div
                            class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                          >
                            Preventive Measure Note
                          </div>

                          <q-input
                            autogrow
                            rounded
                            outlined
                            :model-value="
                              item.preventiveMeasure || 'No Data Available'
                            "
                          />
                        </div>
                      </div>
                    </div>
                  </div> -->
                </div>

                <div class="QAFileDes column flex-center" v-else>
                  <div
                    class="text-subtitle1 items-center text-weight-bold text-dark"
                  >
                    <i>~ No Content Available ~</i>
                  </div>
                </div>
              </q-card-section>

              <q-card-section
                class="q-mt-md rounded-borders shadow-2 flex column items-center justify-center"
                style="border: 2px solid #ddd; text-align: center"
              >
                <div class="text-info text-subtitle1 text-weight-bold q-mb-sm">
                  Root Cause Analysis (RCA) Note
                </div>
                <div class="text-body2 text-grey-7 q-mb-sm">
                  <b>Direction:</b> This section highlights the RCA measures
                  implemented by the department to resolve and prevent the
                  incident.
                </div>

                <q-input
                  outlined
                  v-model="RevisionCode"
                  style="display: none"
                />

                <q-input
                  outlined
                  v-model="IrNo"
                  label="IRNo."
                  style="display: none"
                />

                <q-input
                  v-model="newConclusion"
                  rounded
                  outlined
                  label="Note"
                  type="textarea"
                  class="q-mt-md"
                  autofocus
                  style="width: 100%"
                />
              </q-card-section>

              <q-card-actions
                align="center"
                class="q-mt-md column items-center"
              >
                <div class="row q-gutter-xxl; justify-center">
                  <q-btn
                    flat
                    rounded
                    push
                    label="DISAPPROVED"
                    class="buttonCancelDesign text-info"
                    @click="
                      submitRCADisapprovedReview(selectedIrNo, RevisionCode)
                    "
                    style="width: 195px"
                  />

                  <q-btn
                    flat
                    rounded
                    push
                    label="APPROVED"
                    class="buttonSaveDesign bg-accent text-black"
                    @click="submitRCAApprovedFRW(selectedIrNo)"
                    style="width: 195px"
                  />
                </div>
              </q-card-actions>
            </q-card>
          </div>
        </q-dialog>

        <!-- ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->

        <q-dialog maximized v-model="setReviewRCAReturn" persistent>
          <div class="QAModuleDiag">
            <q-card class="contentFormQAModule">
              <q-card-section class="q-mb-xs row items-center justify-between">
                <div>
                  <div
                    class="text-secondary text-weight-bold"
                    style="font-size: 25px; color: #002b5c"
                  >
                    Root Cause Analysis (RCA) Revised Return Content
                  </div>
                </div>

                <q-btn
                  flat
                  icon="close"
                  style="
                    color: #003566;
                    background-color: rgba(22, 110, 204, 0.1);
                  "
                  @click="setActionEditReviewDialog = false"
                  v-close-popup
                >
                  <q-tooltip class="bg-info text-white"> Close Form </q-tooltip>
                </q-btn>
              </q-card-section>

              <q-card-section class="rounded-borders shadow-2">
                <div class="q-mb-xs row items-center justify-between">
                  <div>
                    <div class="text-primary text-subtitle1 text-weight-bold">
                      Instruction:
                    </div>
                    <div
                      class="q-mb-md"
                      style="font-size: 15px; color: #737373"
                    >
                      In this section, identify the content that needs revision
                      by comparing it with the correct version. Then, leave a
                      note to explain the revision<br />
                      or guide the department in completing the necessary
                      information.
                    </div>
                  </div>

                  <div
                    style="
                      border: 2px solid #003566;
                      background-color: #5ea0f1;
                      border-radius: 20px;
                      text-align: left;
                      width: 350px;
                    "
                  >
                    <q-checkbox
                      class="text-bold"
                      v-model="customModelReview"
                      color="secondary"
                      label="SELECT THE CONTENT YOU WANT TO REVISE"
                      true-value="yes"
                      false-value="no"
                      style="color: #003566"
                    />
                  </div>
                </div>

                <q-card-section class="q-mt-md" style="border: 2px solid #ddd">
                  <div
                    class="QADes1 column items-center justify-center q-mb-md"
                  >
                    <div
                      class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center"
                    >
                      Fishbone / Ishikawa Diagram and 5 Whys Analysis
                    </div>
                    <div
                      class="text-center q-mb-md"
                      style="font-size: 15px; color: #737373"
                    >
                      Identify potential root causes using a Fishbone Diagram,
                      then apply the 5 Whys technique to each cause to determine
                      the true root issue.
                    </div>
                  </div>

                  <div class="row q-col-gutter-md q-ml-sx q-mr-sx">
                    <div
                      class="col-6 q-px-sx"
                      v-if="(IRRCAReturnReviewDetailss.RCAWhyReviewLogReturn?.filter(
                        (m) => m.problemName === 'MANPOWER'
                      ) || []).length > 0"
                    >
                      <div
                        class="fishboneDesign q-pa-sm bg-white"
                        style="
                          border: 5px solid rgba(211, 47, 47, 0.6);
                          border-radius: 40px;
                        "
                      >
                        <div
                          class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center"
                        >
                          Manpower/s
                        </div>

                        <div
                          class="text-center text-black q-mb-md"
                          style="font-size: 15px"
                        >
                          This refers to the manpowers involved in the process,
                          including skills, training, experience, communication, and accountability.
                        </div>

                        <q-separator class="formseparatorYellow" />

                        <div
                          v-for="(
                            item, index
                          ) in IRRCAReturnReviewDetailss.RCAWhyReviewLogReturn?.filter(
                            (m) => m.problemName === 'MANPOWER'
                          )"
                          :key="index"
                          class="q-pa-sm row items-start"
                          style="width: 100%"
                        >
                          <div class="col-auto">
                            <q-checkbox
                              v-model="selectedWhyReview"
                              :val="item.code"
                              @update:model-value="
                                handleSelectWhyReview($event, item)
                              "
                              :disable="customModelReview !== 'yes'"
                              style="margin-top: 45px"
                            />
                          </div>

                          <div class="col flex items-start full-width">
                            <div
                              class="text-primary text-subtitle1 text-weight-bold q-mb-sm"
                            >
                              Why?
                            </div>

                            <q-input
                              autogrow
                              rounded
                              outlined
                              :model-value="
                                item.description || 'No Data Available'
                              "
                              disable
                              class="full-width"
                              :class="
                                selectedWhyReview.includes(item.code)
                                  ? 'bg-red text-white'
                                  : ''
                              "
                            />

                            <!-- Additional input field (shown when checkbox is checked) -->
                            <div
                              v-if="selectedWhyReview.includes(item.code)"
                              class="full-width"
                            >
                              <q-input
                                v-model="whyNotesReview[item.code]"
                                label="Quality Assurance (QA) Note"
                                autogrow
                                rounded
                                outlined
                                class="q-mt-md"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      class="col-6 q-px-sx"
                      v-if="(IRRCAReturnReviewDetailss.RCAWhyReviewLogReturn?.filter(
                        (m) => m.problemName === 'METHOD'
                      ) || []).length > 0"
                    >
                      <div
                        class="fishboneDesign q-pa-sm bg-white"
                        style="
                          border: 5px solid rgba(255, 193, 7, 0.6);
                          border-radius: 40px;
                        "
                      >
                        <div
                          class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center"
                        >
                          Method/s
                        </div>

                        <div
                          class="text-center text-black q-mb-md"
                          style="font-size: 15px"
                        >
                          This refers to the methods and procedures an
                          organization uses <br /> to produce or deliver its product or
                          service.
                        </div>

                        <q-separator class="formseparatorYellow" />

                        <div
                          v-for="(
                            item, index
                          ) in IRRCAReturnReviewDetailss.RCAWhyReviewLogReturn?.filter(
                            (m) => m.problemName === 'METHOD'
                          )"
                          :key="index"
                          class="q-pa-sm row items-start"
                          style="width: 100%"
                        >
                          <div class="col-auto">
                            <q-checkbox
                              :model-value="
                                selectedWhyReview.map((i) => i.code)
                              "
                              :val="item.code"
                              :disable="customModelReview !== 'yes'"
                              @update:model-value="
                                (val) => handleSelectWhyReview(val, item)
                              "
                              style="margin-top: 45px"
                            />
                          </div>
                          <div class="col flex items-start full-width">
                            <div
                              class="text-primary text-subtitle1 text-weight-bold q-mb-sm"
                            >
                              Why?
                            </div>

                            <q-input
                              autogrow
                              rounded
                              outlined
                              :model-value="
                                item.description || 'No Data Available'
                              "
                              disable
                              class="full-width"
                              :class="
                                selectedWhyReview.some(
                                  (i) => i.code === item.code
                                )
                                  ? 'bg-red text-white'
                                  : ''
                              "
                            />

                            <!-- Additional input field (shown when checkbox is checked) -->
                            <div
                              v-if="
                                selectedWhyReview.some(
                                  (i) => i.code === item.code
                                )
                              "
                              class="full-width"
                            >
                              <q-input
                                v-model="whyNotesReview[item.code]"
                                label="Quality Assurance (QA) Note"
                                autogrow
                                rounded
                                outlined
                                class="q-mt-sm full-width"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      class="col-6 q-px-sx"
                      v-if="(IRRCAReturnReviewDetailss.RCAWhyReviewLogReturn?.filter(
                        (m) => m.problemName === 'MACHINE'
                      ) || []).length > 0"
                    >
                      <div
                        class="fishboneDesign q-pa-sm bg-white"
                        style="
                          border: 5px solid rgba(233, 30, 99, 0.6);
                          border-radius: 40px;
                        "
                      >
                        <div
                          class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center"
                        >
                          Machine/s
                        </div>

                        <div
                          class="text-center text-black q-mb-md"
                          style="font-size: 15px"
                        >
                          This refers to the assets such as machines and
                          equipement used <br /> to create or provide the product or
                          services.
                        </div>

                        <q-separator class="formseparatorYellow" />

                        <div
                          v-for="(
                            item, index
                          ) in IRRCAReturnReviewDetailss.RCAWhyReviewLogReturn?.filter(
                            (m) => m.problemName === 'MACHINE'
                          )"
                          :key="index"
                          class="q-pa-sm row items-start"
                          style="width: 100%"
                        >
                          <div class="col-auto">
                            <q-checkbox
                              :model-value="
                                selectedWhyReview.map((i) => i.code)
                              "
                              :val="item.code"
                              :disable="customModelReview !== 'yes'"
                              @update:model-value="
                                (val) => handleSelectWhyReview(val, item)
                              "
                              style="margin-top: 45px"
                            />
                          </div>

                          <div class="col flex items-start full-width">
                            <div
                              class="text-primary text-subtitle1 text-weight-bold q-mb-sm"
                            >
                              Why?
                            </div>

                            <q-input
                              autogrow
                              rounded
                              outlined
                              :model-value="
                                item.description || 'No Data Available'
                              "
                              disable
                              class="full-width"
                              :class="
                                selectedWhyReview.some(
                                  (i) => i.code === item.code
                                )
                                  ? 'bg-red text-white'
                                  : ''
                              "
                            />

                            <!-- Additional input field (shown when checkbox is checked) -->
                            <div
                              v-if="
                                selectedWhyReview.some(
                                  (i) => i.code === item.code
                                )
                              "
                              class="full-width"
                            >
                              <q-input
                                v-model="whyNotesReview[item.code]"
                                label="Quality Assurance (QA) Note"
                                autogrow
                                rounded
                                outlined
                                class="q-mt-md full-width"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      class="col-6 q-px-sx"
                      v-if="(IRRCAReturnReviewDetailss.RCAWhyReviewLogReturn?.filter(
                        (m) => m.problemName === 'MATERIAL'
                      ) || []).length > 0"
                    >
                      <div
                        class="fishboneDesign q-pa-sm bg-white"
                        style="
                          border: 5px solid rgba(156, 39, 176, 0.6);
                          border-radius: 40px;
                        "
                      >
                        <div
                          class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center"
                        >
                          Material/s
                        </div>

                        <div
                          class="text-center text-black q-mb-md"
                          style="font-size: 15px"
                        >
                          This refers to any physical or non-physical <br /> components
                          of the system, including people, resources, and tools.
                        </div>

                        <q-separator class="formseparatorYellow" />

                        <div
                          v-for="(
                            item, index
                          ) in IRRCAReturnReviewDetailss.RCAWhyReviewLogReturn?.filter(
                            (m) => m.problemName === 'MATERIAL'
                          )"
                          :key="index"
                          class="q-pa-sm row items-start"
                          style="width: 100%"
                        >
                          <div class="col-auto">
                            <q-checkbox
                              :model-value="
                                selectedWhyReview.map((i) => i.code)
                              "
                              :val="item.code"
                              :disable="customModelReview !== 'yes'"
                              @update:model-value="
                                (val) => handleSelectWhyReview(val, item)
                              "
                              style="margin-top: 45px"
                            />
                          </div>
                          <div class="col flex items-start full-width">
                            <div
                              class="text-primary text-subtitle1 text-weight-bold q-mb-sm"
                            >
                              Why?
                            </div>

                            <q-input
                              autogrow
                              rounded
                              outlined
                              :model-value="
                                item.description || 'No Data Available'
                              "
                              disable
                              class="full-width"
                              :class="
                                selectedWhyReview.some(
                                  (i) => i.code === item.code
                                )
                                  ? 'bg-red text-white'
                                  : ''
                              "
                            />

                            <!-- Additional input field (shown when checkbox is checked) -->
                            <div
                              v-if="
                                selectedWhyReview.some(
                                  (i) => i.code === item.code
                                )
                              "
                              class="full-width"
                            >
                              <q-input
                                v-model="whyNotesReview[item.code]"
                                label="Quality Assurance (QA) Note"
                                autogrow
                                rounded
                                outlined
                                class="q-mt-sm full-width"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      class="col-6 q-px-sx"
                      v-if="(IRRCAReturnReviewDetailss.RCAWhyReviewLogReturn?.filter(
                        (m) => m.problemName === 'MEASUREMENT'
                      ) || []).length > 0"
                    >
                      <div
                        class="fishboneDesign q-pa-sm bg-white"
                        style="
                          border: 5px solid rgba(3, 169, 244, 0.6);
                          border-radius: 40px;
                        "
                      >
                        <div
                          class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center"
                        >
                          Measurement/s
                        </div>

                        <div
                          class="text-center text-black q-mb-md"
                          style="font-size: 15px"
                        >
                          This refers to the tools and methods that
                          organizations use <br/> to effectively measure progress,
                          outcomes, and overall performance.
                        </div>

                        <q-separator class="formseparatorYellow" />

                        <div
                          v-for="(
                            item, index
                          ) in IRRCAReturnReviewDetailss.RCAWhyReviewLogReturn?.filter(
                            (m) => m.problemName === 'MEASUREMENT'
                          )"
                          :key="index"
                          class="q-pa-sm row items-start"
                          style="width: 100%"
                        >
                          <div class="col-auto">
                            <q-checkbox
                              :model-value="
                                selectedWhyReview.map((i) => i.code)
                              "
                              :val="item.code"
                              :disable="customModelReview !== 'yes'"
                              @update:model-value="
                                (val) => handleSelectWhyReview(val, item)
                              "
                              style="margin-top: 45px"
                            />
                          </div>
                          <div class="col flex items-start full-width">
                            <div
                              class="text-primary text-subtitle1 text-weight-bold q-mb-sm"
                            >
                              Why?
                            </div>

                            <q-input
                              autogrow
                              rounded
                              outlined
                              :model-value="
                                item.description || 'No Data Available'
                              "
                              disable
                              class="full-width"
                              :class="
                                selectedWhyReview.some(
                                  (i) => i.code === item.code
                                )
                                  ? 'bg-red text-white'
                                  : ''
                              "
                            />

                            <!-- Additional input field (shown when checkbox is checked) -->
                            <div
                              v-if="
                                selectedWhyReview.some(
                                  (i) => i.code === item.code
                                )
                              "
                              class="full-width"
                            >
                              <q-input
                                v-model="whyNotesReview[item.code]"
                                label="Quality Assurance (QA) Note"
                                autogrow
                                rounded
                                outlined
                                class="q-mt-sm full-width"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      class="col-6 q-px-sx"
                      v-if="(IRRCAReturnReviewDetailss.RCAWhyReviewLogReturn?.filter(
                        (m) => m.problemName === 'ENVIRONMENT'
                      ) || []).length > 0"
                    >
                      <div
                        class="fishboneDesign q-pa-sm bg-white"
                        style="
                          border: 5px solid rgba(76, 175, 80, 0.6);
                          border-radius: 40px;
                        "
                      >
                        <div
                          class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center"
                        >
                          Environment/s
                        </div>

                        <div
                          class="text-center text-black q-mb-md"
                          style="font-size: 15px"
                        >
                          This refers to various external factors influencing
                          the system, <br/> such as weather conditions, geographic
                          location, and regulatory policies.
                        </div>

                        <q-separator class="formseparatorYellow" />

                        <div
                          v-for="(
                            item, index
                          ) in IRRCAReturnReviewDetailss.RCAWhyReviewLogReturn?.filter(
                            (m) => m.problemName === 'ENVIRONMENT'
                          )"
                          :key="index"
                          class="q-pa-sm row items-start"
                          style="width: 100%"
                        >
                          <div class="col-auto">
                            <q-checkbox
                              :model-value="
                                selectedWhyReview.map((i) => i.code)
                              "
                              :val="item.code"
                              :disable="customModelReview !== 'yes'"
                              @update:model-value="
                                (val) => handleSelectWhyReview(val, item)
                              "
                              style="margin-top: 45px"
                            />
                          </div>
                          <div class="col flex items-start full-width">
                            <div
                              class="text-primary text-subtitle1 text-weight-bold q-mb-sm"
                            >
                              Why?
                            </div>

                            <q-input
                              autogrow
                              rounded
                              outlined
                              :model-value="
                                item.description || 'No Data Available'
                              "
                              disable
                              class="full-width"
                              :class="
                                selectedWhyReview.some(
                                  (i) => i.code === item.code
                                )
                                  ? 'bg-red text-white'
                                  : ''
                              "
                            />

                            <!-- Additional input field (shown when checkbox is checked) -->
                            <div
                              v-if="
                                selectedWhyReview.some(
                                  (i) => i.code === item.code
                                )
                              "
                              class="full-width"
                            >
                              <q-input
                                v-model="whyNotesReview[item.code]"
                                label="Quality Assurance (QA) Note"
                                autogrow
                                rounded
                                outlined
                                class="q-mt-sm full-width"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </q-card-section>

                <q-card-section class="q-mt-md" style="border: 2px solid #ddd">
                  <div
                    v-for="(item, index) in IRRCAReturnReviewDetailss.RCAActionableReviewLogReturn"
                    :key="index"
                    class="QADes1 column items-center justify-center q-mb-md"
                  >
                    <div class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center">
                      Actionable Root Cause
                    </div>

                    <div class="text-center q-mb-md" style="font-size: 15px; color: #737373">
                      From the results of your Fishbone Diagram and 5 Whys analysis, <br />
                      this represents the most critical underlying cause that requires corrective action
                      to prevent the issue from recurring.
                    </div>

                    <!-- Domain Label -->
                    <q-input
                      rounded
                      outlined
                      disable
                      :model-value="getDomainLabel(item.domain)"
                      label="Domain"
                      class="q-mt-md"
                      style="width: 100%"
                    />

                    <!-- Selection Checkbox -->
                    <q-checkbox
                      :model-value="selectedActionableReview.some(i => i.code === item.code)"
                      :disable="customModelReview !== 'yes'"
                      @update:model-value="val => handleSelectActionableReview(val ? [item.code] : [], item)"
                      label="Select Actionable"
                      class="q-mt-sm"
                    />

                    <!-- Actionable Text -->
                    <q-input
                      rounded
                      outlined
                      label="Actionable Root Cause"
                      type="textarea"
                      :disable="!selectedActionableReview.some(i => i.code === item.code)"
                      :model-value="item.actionable"
                      class="q-mt-md transition-all"
                      :class="{
                        'bg-red text-white': selectedActionableReview.some(i => i.code === item.code)
                      }"
                      style="width: 100%"
                    />

                    <!-- QA Note (conditional) -->
                    <div
                      v-if="selectedActionableReview.some(i => i.code === item.code)"
                      class="q-mt-md"
                      style="width: 100%"
                    >
                      <q-input
                        v-model="ActionableNotesReview[item.code]"
                        label="Quality Assurance (QA) Note"
                        type="textarea"
                        rounded
                        outlined
                        class="q-mt-md"
                      />
                    </div>
                  </div>
                </q-card-section>

                <q-card-section class="q-mt-md" style="border: 2px solid #ddd">
                  <div
                    class="QADes1 column items-center justify-center q-mb-md"
                  >
                    <div
                      class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center"
                    >
                      Solution Identification
                    </div>
                    <div
                      class="text-center"
                      style="font-size: 15px; color: #737373"
                    >
                      Identify effective solutions by proposing corrective
                      actions to immediately address root causes and preventive
                      measures to avoid recurrence, specifying responsibilities
                      and timelines for each.
                    </div>
                  </div>

                  <q-separator class="formseparatorWhite" />

                  <div
                    class="QADes1 shadow-2"
                    style="
                      border: 3px solid #6b7c93;
                      border-radius: 40px;
                      padding: 20px;
                    "
                    v-if="(IRRCAReturnReviewDetailss.RCACorrectiveReviewLogReturn || []).length">

                    <div
                      class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                    >
                      Corrective Action
                    </div>

                    <div
                      class="q-mb-sm"
                      style="font-size: 15px; color: #737373"
                    >
                      Specify immediate actions to address identified root
                      causes, including responsible individuals and deadlines
                      for implementation. You may add more fields as needed.
                    </div>

                    <q-separator class="formseparatorYellow" />

                    <div
                      class="row q-col-gutter-md q-mt-xs q-mb-xs items-center q-ml-md"
                      v-for="(
                        item, index
                      ) in IRRCAReturnReviewDetailss.RCACorrectiveReviewLogReturn"
                      :key="index"
                    >
                      <q-checkbox
                        :model-value="
                          selectedCorrectiveReview.map((i) => i.code)
                        "
                        :val="item.code"
                        :disable="customModelReview !== 'yes'"
                        @update:model-value="
                          (val) => handleSelectCorrectiveReview(val, item)
                        "
                        style="margin-top: 25px"
                      />

                      <div class="col">
                        <div
                          class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                        >
                          Corrective Action Note
                        </div>
                        <q-input
                          autogrow
                          rounded
                          outlined
                          :model-value="
                            item.correctiveAction || 'No Data Available'
                          "
                          disable
                          class="full-width"
                          :class="
                            selectedCorrectiveReview.some(
                              (i) => i.code === item.code
                            )
                              ? 'bg-red text-white'
                              : ''
                          "
                        />

                        <div
                          v-if="
                            selectedCorrectiveReview.some(
                              (i) => i.code === item.code
                            )
                          "
                        >
                          <q-input
                            v-model="correctiveNotesReview[item.code]"
                            label="Quality Assurance (QA) Note"
                            autogrow
                            rounded
                            outlined
                            class="q-mt-md"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- <q-separator class="formseparatorWhite" />
                  <div
                    class="QADes1 shadow-2"
                    style="
                      border: 3px solid #6b7c93;
                      border-radius: 40px;
                      padding: 30px;
                    "
                    v-if="(IRRCAReturnReviewDetailss.RCAPreventiveReviewLogReturn || []).length">

                    <div
                      class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                    >
                      Preventive Measures
                    </div>

                    <div
                      class="q-mb-sm"
                      style="font-size: 15px; color: #737373"
                    >
                      Outline long-term preventive measures, considering changes
                      to policies, procedures, training, and organizational
                      culture. You may add more fields as needed.
                    </div>

                    <q-separator class="formseparatorYellow" />

                    <div
                      class="row q-col-gutter-md q-mt-xs q-mb-xs items-center q-ml-md"
                      v-for="(
                        item, index
                      ) in IRRCAReturnReviewDetailss.RCAPreventiveReviewLogReturn"
                      :key="index"
                    >
                      <q-checkbox
                        :model-value="
                          selectedPreventiveReview.map((i) => i.code)
                        "
                        :val="item.code"
                        :disable="customModelReview !== 'yes'"
                        @update:model-value="
                          (val) => handleSelectPreventiveReview(val, item)
                        "
                        style="margin-top: 25px"
                      />

                      <div class="col">
                        <div
                          class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                        >
                          Preventive Measure Note
                        </div>

                        <q-input
                          autogrow
                          rounded
                          outlined
                          :model-value="
                            item.preventiveMeasure || 'No Data Available'
                          "
                          disable
                          class="full-width"
                          :class="
                            selectedPreventiveReview.some(
                              (i) => i.code === item.code
                            )
                              ? 'bg-red text-white'
                              : ''
                          "
                        />

                        <div
                          v-if="
                            selectedPreventiveReview.some(
                              (i) => i.code === item.code
                            )
                          "
                        >
                          <q-input
                            v-model="preventiveNotesReview[item.code]"
                            label="Quality Assurance (QA) Note"
                            autogrow
                            rounded
                            outlined
                            class="q-mt-md"
                          />
                        </div>
                      </div>
                    </div>
                  </div> -->
                </q-card-section>
              </q-card-section>

              <q-card-actions
                align="center"
                class="q-mt-md column items-center"
              >
                <div class="row q-gutter-xxl; justify-center">
                  <q-btn
                    flat
                    rounded
                    push
                    label="CLOSE"
                    class="buttonCancelDesign text-info"
                    @click="onCancelEditReviewRCADetails()"
                  />

                  <q-btn
                    flat
                    rounded
                    push
                    label="SAVE"
                    class="buttonSaveDesign bg-accent text-black"
                    @click="editReturnRCAReview(selectedIrNo)"
                  />
                </div>
              </q-card-actions>
            </q-card>
          </div>
        </q-dialog>

        <!-- ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->

        <q-dialog v-model="waitingReturnRevised" persistent maximized>
          <div
            class="fullscreen flex flex-center column q-gutter-md"
            style="background-color: rgba(0, 0, 0, 0.85)"
          >
            <q-spinner-ios size="150px" color="white" />

            <div class="text-center text-subtitle1 text-white">
              Sending back the returned rejected RCA.
              <br />
              <span class="text-italic text-accent">Please wait...</span>
            </div>
          </div>
        </q-dialog>

        <!-- ////////////////////////////////////////////////////////////////////////// APPROVED FOR REVISION /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->

        <q-dialog maximized v-model="setRCAApprovedDetailsFRS" persistent>
          <div class="QAModuleDiag">
            <q-card class="contentFormQARCA">
              <q-card-section class="q-mb-sm row items-center justify-between">
                <div
                  class="text-secondary text-weight-bold"
                  style="font-size: 25px; color: #002b5c"
                >
                  APPROVED ROOT CAUSE ANALYSIS (RCA) INFORMATION FORM
                </div>

                <q-btn
                  flat
                  icon="close"
                  style="
                    color: #003566;
                    background-color: rgba(22, 110, 204, 0.1);
                  "
                  @click="onCancelRCAApprovedFRS()"
                  v-close-popup
                >
                  <q-tooltip class="bg-info text-white"> Close Form </q-tooltip>
                </q-btn>
              </q-card-section>

              <q-card-section
                class="rounded-borders shadow-2"
                style="border: 2px solid #ddd"
              >
                <div class="QADesContent">
                  <div class="QAFixDesign">
                    <div class="QADes1">
                      <div
                        class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                      >
                        Problem Background
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
                        <div class="col-4">
                          <div
                            class="text-weight-bold"
                            style="font-size: 15px; color: #03254b"
                          >
                            Date of the Incident
                          </div>

                          <q-input
                            rounded
                            outlined
                            :model-value="FormatRCADate(props.row.subjectDate)"
                            disable
                          />
                        </div>

                        <div class="col-4">
                          <div
                            class="text-weight-bold"
                            style="font-size: 15px; color: #03254b"
                          >
                            Time of the Incident
                          </div>

                          <q-input
                            rounded
                            outlined
                            :model-value="FormatRCATime(props.row.subjectDate)"
                            disable
                          />
                        </div>

                        <div class="col-4">
                          <div
                            class="text-weight-bold"
                            style="font-size: 15px; color: #03254b"
                          >
                            Location of the Incident
                          </div>

                          <q-input
                            rounded
                            outlined
                            v-model="props.row.subjectLoc"
                            disable
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

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
                          v-model="props.row.subjectResponse"
                          disable
                          input-class="q-pa-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </q-card-section>

              <q-card-section
                class="rounded-borders shadow-2 q-mt-md"
                style="border: 2px solid #ddd"
              >
                <div class="QADes1 column items-center justify-center q-mb-md">
                  <div
                    class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center"
                  >
                    Fishbone / Ishikawa Diagram and 5 Whys Analysis
                  </div>
                  <div
                    class="text-center q-mb-md"
                    style="font-size: 15px; color: #737373"
                  >
                    Identify potential root causes using a Fishbone Diagram,
                    then apply the 5 Whys technique to each cause to determine
                    the true root issue.
                  </div>
                </div>

                <div class="row q-col-gutter-md q-ml-sx q-mr-sx">
                  <div
                    class="col-6 q-px-sx"
                    v-if="(IRRCAApprovedDetailss.RCAProblemStatementApproved?.find(
                      (m) => m.problemCode === 'MANPOWER'
                    )?.description || '').length > 0"
                  >
                    <div
                      class="fishboneDesign q-pa-sm bg-white"
                      style="
                        border: 5px solid rgba(211, 47, 47, 0.6);
                        border-radius: 40px;
                      "
                    >
                      <div
                        class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center"
                      >
                        Manpower/s
                      </div>

                      <div
                        class="text-center text-black q-mb-md"
                        style="font-size: 15px"
                      >
                          This refers to the manpowers involved in the process,
                          including skills, training, experience, communication, and accountability.
                      </div>

                      <div class="q-mx-sm">
                        <div
                          class="text-primary text-weight-bold"
                          style="font-size: 15px"
                        >
                          Problem statement
                        </div>

                        <q-input
                          autogrow
                          rounded
                          outlined
                          :model-value="
                            IRRCAApprovedDetailss.RCAProblemStatementApproved?.find(
                              (m) => m.problemCode === 'MANPOWER'
                            )?.description
                          "
                          disable
                        />
                      </div>

                      <q-separator class="formseparatorYellow" />

                      <div class="q-mx-sm q-mb-sm">
                        <div
                          v-for="(
                            item, index
                          ) in IRRCAApprovedDetailss.RCAWhyApproved?.filter(
                            (m) => m.problemName === 'MANPOWER'
                          )"
                          :key="index"
                          class="q-mb-sm"
                        >
                          <div
                            class="text-primary text-subtitle1 text-weight-bold"
                          >
                            Why?
                          </div>

                          <q-input
                            autogrow
                            rounded
                            outlined
                            :model-value="
                              item.description || 'No Data Available'
                            "
                            disable
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    class="col-6 q-px-sx"
                    v-if="(IRRCAApprovedDetailss.RCAProblemStatementApproved?.find(
                      (m) => m.problemCode === 'METHOD'
                    )?.description || '').length > 0"
                  >
                    <div
                      class="fishboneDesign q-pa-sm bg-white"
                      style="
                        border: 5px solid rgba(255, 193, 7, 0.6);
                        border-radius: 40px;
                      "
                    >
                      <div
                        class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center"
                      >
                        Method/s
                      </div>

                      <div
                        class="text-center text-black q-mb-md"
                        style="font-size: 15px"
                      >
                        This refers to the methods and procedures an
                        organization uses <br/> to produce or deliver its product or
                        service.
                      </div>

                      <div class="q-mx-sm">
                        <div
                          class="text-primary text-weight-bold"
                          style="font-size: 15px"
                        >
                          Problem statement
                        </div>

                        <q-input
                          autogrow
                          rounded
                          outlined
                          :model-value="
                            IRRCAApprovedDetailss.RCAProblemStatementApproved?.find(
                              (m) => m.problemCode === 'METHOD'
                            )?.description
                          "
                          disable
                        />

                        <q-separator class="formseparatorYellow" />

                        <div class="q-mx-sm q-mb-sm">
                          <div
                            v-for="(
                              item, index
                            ) in IRRCAApprovedDetailss.RCAWhyApproved?.filter(
                              (m) => m.problemName === 'METHOD'
                            )"
                            :key="index"
                            class="q-mb-sm"
                          >
                            <div
                              class="text-primary text-subtitle1 text-weight-bold"
                            >
                              Why?
                            </div>

                            <q-input
                              autogrow
                              rounded
                              outlined
                              :model-value="
                                item.description || 'No Data Available'
                              "
                              disable
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    class="col-6 q-px-sx"
                    v-if="(IRRCAApprovedDetailss.RCAProblemStatementApproved?.find(
                      (m) => m.problemCode === 'MACHINE'
                    )?.description || '').length > 0"
                  >
                    <div
                      class="fishboneDesign q-pa-sm bg-white"
                      style="
                        border: 5px solid rgba(233, 30, 99, 0.6);
                        border-radius: 40px;
                      "
                    >
                      <div
                        class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center"
                      >
                        Machine/s
                      </div>

                      <div
                        class="text-center text-black q-mb-md"
                        style="font-size: 15px"
                      >
                        This refers to the assets such as machines and
                        equipement <br/> used to create or provide the product or
                        services.
                      </div>

                      <div class="q-mx-sm">
                        <div
                          class="text-primary text-weight-bold"
                          style="font-size: 15px"
                        >
                          Problem statement
                        </div>

                        <q-input
                          autogrow
                          rounded
                          outlined
                          :model-value="
                            IRRCAApprovedDetailss.RCAProblemStatementApproved?.find(
                              (m) => m.problemCode === 'MACHINE'
                            )?.description
                          "
                          disable
                        />
                      </div>

                      <q-separator class="formseparatorYellow" />

                      <div class="q-mx-sm q-mb-sm">
                        <div
                          v-for="(
                            item, index
                          ) in IRRCAApprovedDetailss.RCAWhyApproved?.filter(
                            (m) => m.problemName === 'MACHINE'
                          )"
                          :key="index"
                          class="q-mb-sm"
                        >
                          <div
                            class="text-primary text-subtitle1 text-weight-bold"
                          >
                            Why?
                          </div>

                          <q-input
                            autogrow
                            rounded
                            outlined
                            :model-value="
                              item.description || 'No Data Available'
                            "
                            disable
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    class="col-6 q-px-sx"
                    v-if="(IRRCAApprovedDetailss.RCAProblemStatementApproved?.find(
                      (m) => m.problemCode === 'MATERIAL'
                    )?.description || '').length > 0"
                  >
                    <div
                      class="fishboneDesign q-pa-sm bg-white"
                      style="
                        border: 5px solid rgba(156, 39, 176, 0.6);
                        border-radius: 40px;
                      "
                    >
                      <div
                        class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center"
                      >
                        Material/s
                      </div>

                      <div
                        class="text-center text-black q-mb-md"
                        style="font-size: 15px"
                      >
                        This refers to any physical or non-physical components
                        <br/> of the system, including people, resources, and tools.
                      </div>

                      <div class="q-mx-sm">
                        <div
                          class="text-primary text-weight-bold"
                          style="font-size: 15px"
                        >
                          Problem statement
                        </div>

                        <q-input
                          autogrow
                          rounded
                          outlined
                          :model-value="
                            IRRCAApprovedDetailss.RCAProblemStatementApproved?.find(
                              (m) => m.problemCode === 'MATERIAL'
                            )?.description
                          "
                          disable
                        />
                      </div>

                      <q-separator class="formseparatorYellow" />

                      <div class="q-mx-sm q-mb-sm">
                        <div
                          v-for="(
                            item, index
                          ) in IRRCAApprovedDetailss.RCAWhyApproved?.filter(
                            (m) => m.problemName === 'MATERIAL'
                          )"
                          :key="index"
                          class="q-mb-sm"
                        >
                          <div
                            class="text-primary text-subtitle1 text-weight-bold"
                          >
                            Why?
                          </div>

                          <q-input
                            autogrow
                            rounded
                            outlined
                            :model-value="
                              item.description || 'No Data Available'
                            "
                            disable
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    class="col-6 q-px-sx"
                    v-if="(IRRCAApprovedDetailss.RCAProblemStatementApproved?.find(
                      (m) => m.problemCode === 'MEASUREMENT'
                    )?.description || '').length > 0"
                  >
                    <div
                      class="fishboneDesign q-pa-sm bg-white"
                      style="
                        border: 5px solid rgba(3, 169, 244, 0.6);
                        border-radius: 40px;
                      "
                    >
                      <div
                        class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center"
                      >
                        Measurement/s
                      </div>

                      <div
                        class="text-center text-black q-mb-md"
                        style="font-size: 15px"
                      >
                        This refers to the tools and methods that organizations
                        use <br/> to effectively measure progress, outcomes, and
                        overall performance.
                      </div>

                      <div class="q-mx-sm">
                        <div
                          class="text-primary text-weight-bold"
                          style="font-size: 15px"
                        >
                          Problem statement
                        </div>

                        <q-input
                          autogrow
                          rounded
                          outlined
                          :model-value="
                            IRRCAApprovedDetailss.RCAProblemStatementApproved?.find(
                              (m) => m.problemCode === 'MEASUREMENT'
                            )?.description
                          "
                          disable
                        />
                      </div>

                      <q-separator class="formseparatorYellow" />

                      <div class="q-mx-sm q-mb-sm">
                        <div
                          v-for="(
                            item, index
                          ) in IRRCAApprovedDetailss.RCAWhyApproved?.filter(
                            (m) => m.problemName === 'MEASUREMENT'
                          )"
                          :key="index"
                          class="q-mb-sm"
                        >
                          <div
                            class="text-primary text-subtitle1 text-weight-bold"
                          >
                            Why?
                          </div>

                          <q-input
                            autogrow
                            rounded
                            outlined
                            :model-value="
                              item.description || 'No Data Available'
                            "
                            disable
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    class="col-6 q-px-sx"
                    v-if="(IRRCAApprovedDetailss.RCAProblemStatementApproved?.find(
                      (m) => m.problemCode === 'ENVIRONMENT'
                    )?.description || '').length > 0"
                  >
                    <div
                      class="fishboneDesign q-pa-sm bg-white"
                      style="
                        border: 5px solid rgba(76, 175, 80, 0.6);
                        border-radius: 40px;
                      "
                    >
                      <div
                        class="text-black text-subtitle1 text-weight-bold q-mb-xs text-center"
                      >
                        Environment/s
                      </div>

                      <div
                        class="text-center text-black q-mb-md"
                        style="font-size: 15px"
                      >
                        This refers to external factors that can affect the
                        system, including weather conditions, geographic
                        location, and regulatory requirements.
                      </div>

                      <div class="q-mx-sm">
                        <div
                          class="text-primary text-weight-bold"
                          style="font-size: 15px"
                        >
                          Problem statement
                        </div>

                        <q-input
                          autogrow
                          rounded
                          outlined
                          :model-value="
                            IRRCAApprovedDetailss.RCAProblemStatementApproved?.find(
                              (m) => m.problemCode === 'ENVIRONMENT'
                            )?.description
                          "
                          disable
                        />
                      </div>

                      <q-separator class="formseparatorYellow" />

                      <div class="q-mx-sm q-mb-sm">
                        <div
                          v-for="(
                            item, index
                          ) in IRRCAApprovedDetailss.RCAWhyApproved?.filter(
                            (m) => m.problemName === 'ENVIRONMENT'
                          )"
                          :key="index"
                          class="q-mb-sm"
                        >
                          <div
                            class="text-primary text-subtitle1 text-weight-bold"
                          >
                            Why?
                          </div>

                          <q-input
                            autogrow
                            rounded
                            outlined
                            :model-value="
                              item.description || 'No Data Available'
                            "
                            disable
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </q-card-section>

              <q-card-section class="q-mt-md" style="border: 2px solid #ddd">
                <div class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center">
                  Actionable Root Cause
                </div>

                <div class="text-center q-mb-md" style="font-size: 15px; color: #737373">
                  From the results of your Fishbone Diagram and 5 Whys analysis, <br />
                  this represents the most critical underlying cause that requires corrective action
                  to prevent the issue from recurring.
                </div>

                <div v-for="( item, index)
                  in IRRCAApprovedDetailss.RCAActionableApproved"
                  :key="index">

                    <q-input
                      rounded
                      outlined
                      disable
                      :model-value="getDomainLabel(item.domain)"
                      label="Domain"
                      class="q-mt-md"
                      style="width: 100%"
                    />

                    <q-input
                      rounded
                      outlined
                      label="Note"
                      type="textarea"
                      class="q-mt-md"
                      :model-value="item.actionable"
                      autofocus
                      disable
                      style="width: 100%"
                    />
                </div>
              </q-card-section>

              <q-card-section class="q-mt-md" style="border: 2px solid #ddd">
                <div class="QADes1 column items-center justify-center q-mb-md">
                  <div
                    class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center"
                  >
                    Solution Identification
                  </div>
                  <div
                    class="text-center"
                    style="font-size: 15px; color: #737373"
                  >
                    Identify effective solutions by proposing corrective actions
                    to immediately address root causes and preventive measures
                    to avoid recurrence, specifying responsibilities and
                    timelines for each.
                  </div>
                </div>

                <q-separator class="formseparatorWhite" />

                <div
                  class="QADes1 shadow-2"
                  style="
                    border: 3px solid #6b7c93;
                    border-radius: 40px;
                    padding: 30px;
                  "
                  v-if="(IRRCAApprovedDetailss.RCACorrectiveApproved || []).length">

                  <div
                    class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                  >
                    Corrective Action
                  </div>

                  <div class="q-mb-sm" style="font-size: 15px; color: #737373">
                    Specify immediate actions to address identified root causes,
                    including responsible individuals and deadlines for
                    implementation. You may add more fields as needed.
                  </div>

                  <q-separator class="formseparatorYellow" />

                  <div>
                    <div
                      class="row q-col-gutter-md q-mt-xs q-mb-xs items-center"
                      v-for="(
                        item, index
                      ) in IRRCAApprovedDetailss.RCACorrectiveApproved"
                      :key="index"
                    >
                      <div class="col-6">
                        <div
                          class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                        >
                          Corrective Action Note
                        </div>
                        <q-input
                          autogrow
                          rounded
                          outlined
                          :model-value="
                            item.correctiveAction || 'No Data Available'
                          "
                          disable
                        />
                      </div>

                      <div class="col-2">
                        <div
                          class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                        >
                          Timeline From
                        </div>
                        <q-input
                          autogrow
                          rounded
                          outlined
                          :model-value="
                            FormatDate(item.corTimelineFromDate) ||
                            'No Data Available'
                          "
                          disable
                        />
                      </div>

                      <div class="col-2">
                        <div
                          class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                        >
                          Timeline To
                        </div>
                        <q-input
                          autogrow
                          rounded
                          outlined
                          :model-value="
                            FormatDate(item.corTimelineFromDate) ||
                            'No Data Available'
                          "
                          disable
                        />
                      </div>

                      <div class="col-2">
                        <div
                          class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                        >
                          Accountable Person/s
                        </div>
                        <q-input
                          autogrow
                          rounded
                          outlined
                          :model-value="
                            EmploFullName(item.accountablePer) || 'No Data Available'
                          "
                          disable
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <!-- <q-separator class="formseparatorWhite" />

                <div
                  class="QADes1 shadow-2"
                  style="
                    border: 3px solid #6b7c93;
                    border-radius: 40px;
                    padding: 30px;
                  "
                  v-if="(IRRCAApprovedDetailss.RCAPreventiveApproved || []).length">

                  <div
                    class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                  >
                    Preventive Measures
                  </div>

                  <div class="q-mb-sm" style="font-size: 15px; color: #737373">
                    Outline long-term preventive measures, considering changes
                    to policies, procedures, training, and organizational
                    culture. You may add more fields as needed.
                  </div>

                  <q-separator class="formseparatorYellow" />

                  <div>
                    <div
                      class="row q-col-gutter-md q-mt-xs q-mb-xs items-center"
                      v-for="(
                        item, index
                      ) in IRRCAApprovedDetailss.RCAPreventiveApproved"
                      :key="index"
                    >
                      <div class="col-6">
                        <div
                          class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                        >
                          Preventive Measure Note
                        </div>
                        <q-input
                          autogrow
                          rounded
                          outlined
                          :model-value="
                            item.preventiveMeasure || 'No Data Available'
                          "
                        />
                      </div>

                      <div class="col-2">
                        <div
                          class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                        >
                          Timeline From
                        </div>
                        <q-input
                          autogrow
                          rounded
                          outlined
                          :model-value="
                            FormatDate(item.preTimelineFromDate) ||
                            'No Data Available'
                          "
                        />
                      </div>

                      <div class="col-2">
                        <div
                          class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                        >
                          Timeline To
                        </div>
                        <q-input
                          autogrow
                          rounded
                          outlined
                          :model-value="
                            FormatDate(item.preTimelineToDate) ||
                            'No Data Available'
                          "
                        />
                      </div>

                      <div class="col-2">
                        <div
                          class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                        >
                          Responsible Person/s
                        </div>
                        <q-input
                          autogrow
                          rounded
                          outlined
                          :model-value="
                            EmploFullName(item.responsiblePer) || 'No Data Available'
                          "
                        />
                      </div>
                    </div>
                  </div>
                </div> -->

                <q-separator class="formseparatorWhite" />

                <div
                  class="QADes1 shadow-2"
                  style="
                    border: 3px solid #6b7c93;
                    border-radius: 40px;
                    padding: 30px;
                  "
                >
                  <div
                    class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                  >
                    Risk
                  </div>

                  <div
                    class="q-mb-sm"
                    style="font-size: 15px; color: #737373"
                  >
                    These are the risks associated with or arising from this specific incident that
                    should be recorded in the risk register to support effective risk management.
                  </div>

                  <q-separator class="formseparatorYellow" />

                  <div>
                    <div
                      class="row q-col-gutter-md q-mt-xs q-mb-xs items-center"
                      v-for="(
                        item, index
                      ) in IRRCAApprovedDetailss.RCARiskApproved"
                    :key="index"
                    >

                      <q-input
                        rounded
                        outlined
                        disable
                        :model-value="item.riskItem"
                      style="width: 100%"
                      />
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </q-dialog>

        <!-- ////////////////////////////////////////////////////////////////////////// APPROVED FOR REVIEW /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->

        <q-dialog maximized v-model="setRCAApprovedDetailsFRW" persistent>
          <div class="QAModuleDiag">
            <q-card class="contentFormQARCA">
              <q-card-section class="q-mb-sm row items-center justify-between">
                <div
                  class="text-secondary text-weight-bold"
                  style="font-size: 25px; color: #002b5c"
                >
                  APPROVED ROOT CAUSE ANALYSIS (RCA) INFORMATION FORM
                </div>

                <q-btn
                  flat
                  icon="close"
                  style="
                    color: #003566;
                    background-color: rgba(22, 110, 204, 0.1);
                  "
                  @click="onCancelRCAApprovedFRW()"
                  v-close-popup
                >
                  <q-tooltip class="bg-info text-white"> Close Form </q-tooltip>
                </q-btn>
              </q-card-section>

              <q-card-section
                class="rounded-borders shadow-2"
                style="border: 2px solid #ddd"
              >
                <div class="QADesContent">
                  <div class="QAFixDesign">
                    <div class="QADes1">
                      <div
                        class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                      >
                        Problem Background
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
                        <div class="col-4">
                          <div
                            class="text-weight-bold"
                            style="font-size: 15px; color: #03254b"
                          >
                            Date of the Incident
                          </div>

                          <q-input
                            rounded
                            outlined
                            :model-value="FormatRCADate(props.row.subjectDate)"
                            disable
                          />
                        </div>

                        <div class="col-4">
                          <div
                            class="text-weight-bold"
                            style="font-size: 15px; color: #03254b"
                          >
                            Time of the Incident
                          </div>

                          <q-input
                            rounded
                            outlined
                            :model-value="FormatRCATime(props.row.subjectDate)"
                            disable
                          />
                        </div>

                        <div class="col-4">
                          <div
                            class="text-weight-bold"
                            style="font-size: 15px; color: #03254b"
                          >
                            Location of the Incident
                          </div>

                          <q-input
                            rounded
                            outlined
                            v-model="props.row.subjectLoc"
                            disable
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

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
                          v-model="props.row.subjectResponse"
                          disable
                          input-class="q-pa-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </q-card-section>

              <q-card-section
                class="rounded-borders shadow-2 q-mt-md"
                style="border: 2px solid #ddd"
              >
                <div class="QADes1 column items-center justify-center q-mb-md">
                  <div
                    class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center"
                  >
                    Fishbone / Ishikawa Diagram and 5 Whys Analysis
                  </div>
                  <div
                    class="text-center q-mb-md"
                    style="font-size: 15px; color: #737373"
                  >
                    Identify potential root causes using a Fishbone Diagram,
                    then apply the 5 Whys technique to each cause to determine
                    the true root issue.
                  </div>
                </div>

                <div class="row q-col-gutter-md q-ml-sx q-mr-sx">
                  <div
                    class="col-6 q-px-sx"
                    v-if="(IRRCAApprovedDetailss.RCAProblemStatementApproved?.find(
                      (m) => m.problemCode === 'MANPOWER'
                    )?.description || '').length > 0"
                  >
                    <div
                      class="fishboneDesign q-pa-sm bg-white"
                      style="
                        border: 5px solid rgba(211, 47, 47, 0.6);
                        border-radius: 40px;
                      "
                    >
                      <div
                        class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center"
                      >
                        Manpower/s
                      </div>

                      <div
                        class="text-center text-black q-mb-md"
                        style="font-size: 15px"
                      >
                          This refers to the manpowers involved in the process,
                          including skills, training, experience, communication, and accountability.
                      </div>

                      <div class="q-mx-sm">
                        <div
                          class="text-primary text-weight-bold"
                          style="font-size: 15px"
                        >
                          Problem statement
                        </div>

                        <q-input
                          autogrow
                          rounded
                          outlined
                          :model-value="
                            IRRCAApprovedDetailss.RCAProblemStatementApproved?.find(
                              (m) => m.problemCode === 'MANPOWER'
                            )?.description
                          "
                          disable
                        />
                      </div>

                      <q-separator class="formseparatorYellow" />

                      <div class="q-mx-sm q-mb-sm">
                        <div
                          v-for="(
                            item, index
                          ) in IRRCAApprovedDetailss.RCAWhyApproved?.filter(
                            (m) => m.problemName === 'MANPOWER'
                          )"
                          :key="index"
                          class="q-mb-sm"
                        >
                          <div
                            class="text-primary text-subtitle1 text-weight-bold"
                          >
                            Why?
                          </div>

                          <q-input
                            autogrow
                            rounded
                            outlined
                            :model-value="
                              item.description || 'No Data Available'
                            "
                            disable
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    class="col-6 q-px-sx"
                    v-if="(IRRCAApprovedDetailss.RCAProblemStatementApproved?.find(
                      (m) => m.problemCode === 'METHOD'
                    )?.description || '').length > 0"
                  >
                    <div
                      class="fishboneDesign q-pa-sm bg-white"
                      style="
                        border: 5px solid rgba(255, 193, 7, 0.6);
                        border-radius: 40px;
                      "
                    >
                      <div
                        class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center"
                      >
                        Method/s
                      </div>

                      <div
                        class="text-center text-black q-mb-md"
                        style="font-size: 15px"
                      >
                        This refers to the methods and procedures an
                        organization uses <br/> to produce or deliver its product or
                        service.
                      </div>

                      <div class="q-mx-sm">
                        <div
                          class="text-primary text-weight-bold"
                          style="font-size: 15px"
                        >
                          Problem statement
                        </div>

                        <q-input
                          autogrow
                          rounded
                          outlined
                          :model-value="
                            IRRCAApprovedDetailss.RCAProblemStatementApproved?.find(
                              (m) => m.problemCode === 'METHOD'
                            )?.description
                          "
                          disable
                        />

                        <q-separator class="formseparatorYellow" />

                        <div class="q-mx-sm q-mb-sm">
                          <div
                            v-for="(
                              item, index
                            ) in IRRCAApprovedDetailss.RCAWhyApproved?.filter(
                              (m) => m.problemName === 'METHOD'
                            )"
                            :key="index"
                            class="q-mb-sm"
                          >
                            <div
                              class="text-primary text-subtitle1 text-weight-bold"
                            >
                              Why?
                            </div>

                            <q-input
                              autogrow
                              rounded
                              outlined
                              :model-value="
                                item.description || 'No Data Available'
                              "
                              disable
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    class="col-6 q-px-sx"
                    v-if="(IRRCAApprovedDetailss.RCAProblemStatementApproved?.find(
                      (m) => m.problemCode === 'MACHINE'
                    )?.description || '').length > 0"
                  >
                    <div
                      class="fishboneDesign q-pa-sm bg-white"
                      style="
                        border: 5px solid rgba(233, 30, 99, 0.6);
                        border-radius: 40px;
                      "
                    >
                      <div
                        class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center"
                      >
                        Machine/s
                      </div>

                      <div
                        class="text-center text-black q-mb-md"
                        style="font-size: 15px"
                      >
                        This refers to the assets such as machines and
                        equipement <br/> used to create or provide the product or
                        services.
                      </div>

                      <div class="q-mx-sm">
                        <div
                          class="text-primary text-weight-bold"
                          style="font-size: 15px"
                        >
                          Problem statement
                        </div>

                        <q-input
                          autogrow
                          rounded
                          outlined
                          :model-value="
                            IRRCAApprovedDetailss.RCAProblemStatementApproved?.find(
                              (m) => m.problemCode === 'MACHINE'
                            )?.description
                          "
                          disable
                        />
                      </div>

                      <q-separator class="formseparatorYellow" />

                      <div class="q-mx-sm q-mb-sm">
                        <div
                          v-for="(
                            item, index
                          ) in IRRCAApprovedDetailss.RCAWhyApproved?.filter(
                            (m) => m.problemName === 'MACHINE'
                          )"
                          :key="index"
                          class="q-mb-sm"
                        >
                          <div
                            class="text-primary text-subtitle1 text-weight-bold"
                          >
                            Why?
                          </div>

                          <q-input
                            autogrow
                            rounded
                            outlined
                            :model-value="
                              item.description || 'No Data Available'
                            "
                            disable
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    class="col-6 q-px-sx"
                    v-if="(IRRCAApprovedDetailss.RCAProblemStatementApproved?.find(
                      (m) => m.problemCode === 'MATERIAL'
                    )?.description || '').length > 0"
                  >
                    <div
                      class="fishboneDesign q-pa-sm bg-white"
                      style="
                        border: 5px solid rgba(156, 39, 176, 0.6);
                        border-radius: 40px;
                      "
                    >
                      <div
                        class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center"
                      >
                        Material/s
                      </div>

                      <div
                        class="text-center text-black q-mb-md"
                        style="font-size: 15px"
                      >
                        This refers to any physical or non-physical components
                        <br/> of the system, including people, resources, and tools.
                      </div>

                      <div class="q-mx-sm">
                        <div
                          class="text-primary text-weight-bold"
                          style="font-size: 15px"
                        >
                          Problem statement
                        </div>

                        <q-input
                          autogrow
                          rounded
                          outlined
                          :model-value="
                            IRRCAApprovedDetailss.RCAProblemStatementApproved?.find(
                              (m) => m.problemCode === 'MATERIAL'
                            )?.description
                          "
                          disable
                        />
                      </div>

                      <q-separator class="formseparatorYellow" />

                      <div class="q-mx-sm q-mb-sm">
                        <div
                          v-for="(
                            item, index
                          ) in IRRCAApprovedDetailss.RCAWhyApproved?.filter(
                            (m) => m.problemName === 'MATERIAL'
                          )"
                          :key="index"
                          class="q-mb-sm"
                        >
                          <div
                            class="text-primary text-subtitle1 text-weight-bold"
                          >
                            Why?
                          </div>

                          <q-input
                            autogrow
                            rounded
                            outlined
                            :model-value="
                              item.description || 'No Data Available'
                            "
                            disable
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    class="col-6 q-px-sx"
                    v-if="(IRRCAApprovedDetailss.RCAProblemStatementApproved?.find(
                      (m) => m.problemCode === 'MEASUREMENT'
                    )?.description || '').length > 0"
                  >
                    <div
                      class="fishboneDesign q-pa-sm bg-white"
                      style="
                        border: 5px solid rgba(3, 169, 244, 0.6);
                        border-radius: 40px;
                      "
                    >
                      <div
                        class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center"
                      >
                        Measurement/s
                      </div>

                      <div
                        class="text-center text-black q-mb-md"
                        style="font-size: 15px"
                      >
                        This refers to the tools and methods that organizations
                        use <br/> to effectively measure progress, outcomes, and
                        overall performance.
                      </div>

                      <div class="q-mx-sm">
                        <div
                          class="text-primary text-weight-bold"
                          style="font-size: 15px"
                        >
                          Problem statement
                        </div>

                        <q-input
                          autogrow
                          rounded
                          outlined
                          :model-value="
                            IRRCAApprovedDetailss.RCAProblemStatementApproved?.find(
                              (m) => m.problemCode === 'MEASUREMENT'
                            )?.description
                          "
                          disable
                        />
                      </div>

                      <q-separator class="formseparatorYellow" />

                      <div class="q-mx-sm q-mb-sm">
                        <div
                          v-for="(
                            item, index
                          ) in IRRCAApprovedDetailss.RCAWhyApproved?.filter(
                            (m) => m.problemName === 'MEASUREMENT'
                          )"
                          :key="index"
                          class="q-mb-sm"
                        >
                          <div
                            class="text-primary text-subtitle1 text-weight-bold"
                          >
                            Why?
                          </div>

                          <q-input
                            autogrow
                            rounded
                            outlined
                            :model-value="
                              item.description || 'No Data Available'
                            "
                            disable
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    class="col-6 q-px-sx"
                    v-if="(IRRCAApprovedDetailss.RCAProblemStatementApproved?.find(
                      (m) => m.problemCode === 'ENVIRONMENT'
                    )?.description || '').length > 0"
                  >
                    <div
                      class="fishboneDesign q-pa-sm bg-white"
                      style="
                        border: 5px solid rgba(76, 175, 80, 0.6);
                        border-radius: 40px;
                      "
                    >
                      <div
                        class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center"
                      >
                        Environment/s
                      </div>

                      <div
                        class="text-center text-black q-mb-md"
                        style="font-size: 15px"
                      >
                        This refers to external factors that can affect the
                        system, <br/> including weather conditions, geographic
                        location, and regulatory requirements.
                      </div>

                      <div class="q-mx-sm">
                        <div
                          class="text-primary text-weight-bold"
                          style="font-size: 15px"
                        >
                          Problem statement
                        </div>

                        <q-input
                          autogrow
                          rounded
                          outlined
                          :model-value="
                            IRRCAApprovedDetailss.RCAProblemStatementApproved?.find(
                              (m) => m.problemCode === 'ENVIRONMENT'
                            )?.description
                          "
                          disable
                        />
                      </div>

                      <q-separator class="formseparatorYellow" />

                      <div class="q-mx-sm q-mb-sm">
                        <div
                          v-for="(
                            item, index
                          ) in IRRCAApprovedDetailss.RCAWhyApproved?.filter(
                            (m) => m.problemName === 'ENVIRONMENT'
                          )"
                          :key="index"
                          class="q-mb-sm"
                        >
                          <div
                            class="text-primary text-subtitle1 text-weight-bold"
                          >
                            Why?
                          </div>

                          <q-input
                            autogrow
                            rounded
                            outlined
                            :model-value="
                              item.description || 'No Data Available'
                            "
                            disable
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </q-card-section>

              <q-card-section class="q-mt-md" style="border: 2px solid #ddd">
                <div class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center">
                  Actionable Root Cause
                </div>

                <div class="text-center q-mb-md" style="font-size: 15px; color: #737373">
                  From the results of your Fishbone Diagram and 5 Whys analysis, <br />
                  this represents the most critical underlying cause that requires corrective action
                  to prevent the issue from recurring.
                </div>

                <div v-for="( item, index)
                  in IRRCAApprovedDetailss.RCAActionableApproved"
                  :key="index">

                    <q-input
                      rounded
                      outlined
                      disable
                      :model-value="getDomainLabel(item.domain)"
                      label="Domain"
                      class="q-mt-md"
                      style="width: 100%"
                    />

                    <q-input
                      rounded
                      outlined
                      label="Note"
                      type="textarea"
                      class="q-mt-md"
                      :model-value="item.actionable"
                      autofocus
                      disable
                      style="width: 100%"
                    />
                </div>
              </q-card-section>

              <q-card-section class="q-mt-md" style="border: 2px solid #ddd">
                <div class="QADes1 column items-center justify-center q-mb-md">
                  <div
                    class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center"
                  >
                    Solution Identification
                  </div>
                  <div
                    class="text-center"
                    style="font-size: 15px; color: #737373"
                  >
                    Identify effective solutions by proposing corrective actions
                    to immediately address root causes and preventive measures
                    to avoid recurrence, specifying responsibilities and
                    timelines for each.
                  </div>
                </div>

                <q-separator class="formseparatorWhite" />

                <div
                  class="QADes1 shadow-2"
                  style="
                    border: 3px solid #6b7c93;
                    border-radius: 40px;
                    padding: 30px;
                  "
                  v-if="(IRRCAApprovedDetailss.RCACorrectiveApproved || []).length">

                  <div
                    class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                  >
                    Corrective Action
                  </div>

                  <div class="q-mb-sm" style="font-size: 15px; color: #737373">
                    Specify immediate actions to address identified root causes,
                    including responsible individuals and deadlines for
                    implementation. You may add more fields as needed.
                  </div>

                  <q-separator class="formseparatorYellow" />

                  <div>
                    <div
                      class="row q-col-gutter-md q-mt-xs q-mb-xs items-center"
                      v-for="(
                        item, index
                      ) in IRRCAApprovedDetailss.RCACorrectiveApproved"
                      :key="index"
                    >
                      <div class="col-6">
                        <div
                          class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                        >
                          Corrective Action Note
                        </div>
                        <q-input
                          autogrow
                          rounded
                          outlined
                          :model-value="
                            item.correctiveAction || 'No Data Available'
                          "
                          disable
                        />
                      </div>

                      <div class="col-2">
                        <div
                          class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                        >
                          Timeline From
                        </div>
                        <q-input
                          autogrow
                          rounded
                          outlined
                          :model-value="
                            FormatDate(item.corTimelineFromDate) ||
                            'No Data Available'
                          "
                          disable
                        />
                      </div>

                      <div class="col-2">
                        <div
                          class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                        >
                          Timeline To
                        </div>
                        <q-input
                          autogrow
                          rounded
                          outlined
                          :model-value="
                            FormatDate(item.corTimelineFromDate) ||
                            'No Data Available'
                          "
                          disable
                        />
                      </div>

                      <div class="col-2">
                        <div
                          class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                        >
                          Accountable Person/s
                        </div>
                        <q-input
                          autogrow
                          rounded
                          outlined
                          :model-value="
                            EmploFullName(item.accountablePer) || 'No Data Available'
                          "
                          disable
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <!-- <q-separator class="formseparatorWhite" />

                <div
                  class="QADes1 shadow-2"
                  style="
                    border: 3px solid #6b7c93;
                    border-radius: 40px;
                    padding: 30px;
                  "
                  v-if="(IRRCAApprovedDetailss.RCAPreventiveApproved || []).length">

                  <div
                    class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                  >
                    Preventive Measures
                  </div>

                  <div class="q-mb-sm" style="font-size: 15px; color: #737373">
                    Outline long-term preventive measures, considering changes
                    to policies, procedures, training, and organizational
                    culture. You may add more fields as needed.
                  </div>

                  <q-separator class="formseparatorYellow" />

                  <div>
                    <div
                      class="row q-col-gutter-md q-mt-xs q-mb-xs items-center"
                      v-for="(
                        item, index
                      ) in IRRCAApprovedDetailss.RCAPreventiveApproved"
                      :key="index"
                    >
                      <div class="col-6">
                        <div
                          class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                        >
                          Preventive Measure Note
                        </div>
                        <q-input
                          autogrow
                          rounded
                          outlined
                          :model-value="
                            item.preventiveMeasure || 'No Data Available'
                          "
                        />
                      </div>

                      <div class="col-2">
                        <div
                          class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                        >
                          Timeline From
                        </div>
                        <q-input
                          autogrow
                          rounded
                          outlined
                          :model-value="
                            FormatDate(item.preTimelineFromDate) ||
                            'No Data Available'
                          "
                        />
                      </div>

                      <div class="col-2">
                        <div
                          class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                        >
                          Timeline To
                        </div>
                        <q-input
                          autogrow
                          rounded
                          outlined
                          :model-value="
                            FormatDate(item.preTimelineToDate) ||
                            'No Data Available'
                          "
                        />
                      </div>

                      <div class="col-2">
                        <div
                          class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                        >
                          Responsible Person/s
                        </div>
                        <q-input
                          autogrow
                          rounded
                          outlined
                          :model-value="
                            EmploFullName(item.responsiblePer) || 'No Data Available'
                          "
                        />
                      </div>
                    </div>
                  </div>
                </div> -->

                <q-separator class="formseparatorWhite" />

                <div
                  class="QADes1 shadow-2"
                  style="
                    border: 3px solid #6b7c93;
                    border-radius: 40px;
                    padding: 30px;
                  "
                >
                  <div
                    class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                  >
                    Risk
                  </div>

                  <div
                    class="q-mb-sm"
                    style="font-size: 15px; color: #737373"
                  >
                    These are the risks associated with or arising from this specific incident that
                    should be recorded in the risk register to support effective risk management.
                  </div>

                  <q-separator class="formseparatorYellow" />

                  <div>
                    <div
                      class="row q-col-gutter-md q-mt-xs q-mb-xs items-center"
                      v-for="(
                        item, index
                      ) in IRRCAApprovedDetailss.RCARiskApproved"
                    :key="index"
                    >

                      <q-input
                        rounded
                        outlined
                        disable
                        :model-value="item.riskItem"
                        style="width: 100%"
                      />
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </q-dialog>

        <!-- ////////////////////////////////////////////////////////////////////////// LOADING /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->

        <q-dialog v-model="waitingforApproved" persistent maximized>
          <div
            class="fullscreen flex flex-center column q-gutter-md"
            style="background-color: rgba(0, 0, 0, 0.85)"
          >
            <q-spinner-ios size="150px" color="white" />

            <div class="text-center text-subtitle1 text-white">
              Preparing for the approved RCA.
              <br />
              <span class="text-italic text-accent">Please wait...</span>
            </div>
          </div>
        </q-dialog>
      </q-td>
    </template>

    <template v-slot:body-cell-actionitems="props">
      <q-td>
        <q-btn
          flat
          rounded
          push
          :disable="
            props.row.qAStatus === false ||
            (
              props.row.combinedActionItems &&
              !props.row.combinedActionItems.split(', ').includes('1')
            ) ||
            loggedInUser.AreaCode !== null
          "

          v-if="
            props.row.rCA === '5' &&
            props.row.combinedActionItems &&
            props.row.combinedActionItems.split(', ').includes('1')
          "
          @click="viewActionDetails(props.row.iRNo)"
          style="border-radius: 20px; width: 195px"
          label="INCOMPLETE"
          class="bg-accent text-black text-bold text-center shadow-3"
        >
        </q-btn>

        <q-btn
          flat
          rounded
          push
          :disable="
            props.row.combinedActionItems &&
            !props.row.combinedActionItems.split(', ').includes('1')
          "
          v-if="
            props.row.combinedActionItems &&
            !props.row.combinedActionItems.split(', ').includes('1')
          "
          class="bg-dark text-white text-bold text-center"
          label="COMPLETE"
          style="border-radius: 20px; width: 195px"
        />

        <!-- //////////////////////////////////////ACTION ITEMS////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->

        <q-dialog maximized v-model="setActionItemDialogs" persistent>
          <div class="QAModuleDiag">
            <q-card class="contentActionFormModule">
              <q-card-section class="q-mb-sm row items-center justify-between">
                <div
                  class="text-secondary text-weight-bold"
                  style="font-size: 25px; color: #002b5c"
                >
                  Completion Form for Root Cause Analysis (RCA) Items
                </div>

                <q-btn
                  flat
                  icon="close"
                  style="
                    color: #003566;
                    background-color: rgba(22, 110, 204, 0.1);
                  "
                  @click="onCloseActionItems()"
                  v-close-popup
                >
                  <q-tooltip class="bg-info text-white"> Close Form </q-tooltip>
                </q-btn>
              </q-card-section>

              <q-card-section>
                <div class="row q-col-gutter-md">
                  <div class="col-12 col-md-3 q-ml-xl">
                    <div class="q-pa-sm" style="border: 2px solid #6b7c93">
                      <div
                        class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                      >
                        Incident Report Details
                      </div>

                      <div
                        class="q-mb-sm"
                        style="font-size: 15px; color: #737373"
                      >
                        This section outlines the action items implemented by
                        the department to address and mitigate the incident.
                      </div>

                      <q-separator class="formseparatorYellow" />

                      <div class="q-pa-sm">
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

                        <div class="col-6 q-mt-md">
                          <div
                            class="text-weight-bold"
                            style="font-size: 15px; color: #03254b"
                          >
                            Primary (Department/s)
                          </div>
                          <q-input
                            rounded
                            outlined
                            :model-value="IRQADetailss.primaryDept"
                            disable
                          />
                        </div>

                        <div class="col-6 q-mt-md">
                          <div
                            class="text-weight-bold"
                            style="font-size: 15px; color: #03254b"
                          >
                            Subject of the Incident
                          </div>

                          <q-input
                            class="text-uppercase"
                            autogrow
                            rounded
                            outlined
                            :model-value="
                              IRQADetailss.subjectName +
                              ' - ' +
                              IRQADetailss.subjectSpecificExam
                            "
                            disable
                            v-if="IRQADetailss.subjectSpecificExam"
                          />

                          <q-input
                            class="text-uppercase"
                            rounded
                            outlined
                            :model-value="IRQADetailss.subjectName"
                            disable
                            v-else
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-12 col-md-8">
                    <div
                      class="bg-white q-pa-sm shadow-2"
                      style="border: 2px solid #ccc; border-radius: 20px"
                    >
                      <div class="row q-col-gutter-xs q-pa-sm">
                        <div class="col-9">
                          <div
                            class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                          >
                            Completion Task
                          </div>

                          <div
                            class="q-mb-sm"
                            style="font-size: 15px; color: #737373"
                          >
                            This section outlines the action items implemented
                            by the department to address and mitigate the
                            incident.
                          </div>
                        </div>

                        <div class="col-3 flex flex-center justify-center">
                          <q-btn
                            flat
                            rounded
                            push
                            v-if="hasPendingActions"
                            label="SAVE"
                            class="bg-accent text-black shadow-3"
                            @click="editDoneStatus"
                            style="width: 195px"
                          />

                          <q-btn
                            flat
                            rounded
                            push
                            v-else
                            label="SAVE"
                            class="bg-accent text-black shadow-3"
                            @click="editIRQA(selectedIrNo)"
                            style="width: 195px"
                          />
                        </div>
                      </div>

                      <q-separator class="formseparatorYellow" />

                      <div>
                        <q-tabs
                          v-model="tab"
                          dense
                          class="my-tabs text-dark q-pa-xs text-bold shadow-2"
                          active-color="primary"
                          indicator-color="transparent"
                          align="justify"
                          narrow-indicator
                          style="
                            border-top-left-radius: 20px;
                            border-top-right-radius: 20px;
                          "
                        >
                          <q-tab
                            icon="design_services"
                            name="action"
                            label="Corrective Action"
                            class="tab-item"
                          ></q-tab>

                          <q-tab
                            icon="policy"
                            name="riskdet"
                            label="Risk"
                            class="tab-item"
                          ></q-tab>
                        </q-tabs>

                        <q-separator></q-separator>

                        <q-tab-panels
                          v-model="tab"
                          animated
                          style="
                            border: 2px solid #ccc;
                            border-bottom-left-radius: 20px;
                            border-bottom-right-radius: 20px;
                          "
                        >
                          <q-tab-panel name="action">
                            <div
                              class="q-pa-sm"
                              v-for="(items, index) in actionCorrectiveDetails"
                              :key="index"
                              style="
                                border: 2px solid #3a4d6e;
                                border-radius: 20px;
                                margin-top: 16px;
                              "
                            >
                              <div class="row justify-between items-start q-mb-md">
                                <!-- LEFT SIDE -->
                                <div class="column items-start">
                                  <div class="q-pa-sm">
                                    <div class="text-primary text-center text-subtitle1 text-weight-bold q-mb-xs">
                                      Corrective Action Status
                                    </div>

                                    <q-btn
                                      rounded
                                      :disable = "items.accomplishStatus === 1"
                                      v-if="items.accomplishStatus === 1"
                                      label="Pending"
                                      class="bg-red text-white text-bold text-center q-pa-xs q-mt-xs"
                                      style="width: 195px"
                                    />

                                    <q-btn
                                      rounded
                                      :disable = "items.accomplishStatus === 0"
                                      v-if="items.accomplishStatus === 0"
                                      label="Completed"
                                      class="bg-positive text-white text-bold text-center q-pa-xs q-mt-xs"
                                      style="width: 195px"
                                    />
                                  </div>
                                </div>

                                <!-- RIGHT SIDE -->
                                <div class="column items-start">
                                  <div class="q-pa-sm">
                                    <div class="text-primary text-center text-subtitle1 text-weight-bold q-mb-xs">
                                      Verification
                                    </div>

                                    <q-btn
                                      flat
                                      rounded
                                      push
                                      v-if="items.actionStatus === 1"
                                      @click="editActionStatus(items.id)"
                                      label="Pending"
                                      style="width: 195px"
                                      class="bg-red text-white text-bold text-center shadow-5"
                                    />

                                    <q-btn
                                      flat
                                      rounded
                                      push
                                      v-if="items.actionStatus === 2"
                                      :disable="items.actionStatus === 2"
                                      label="Done"
                                      style="width: 195px"
                                      class="bg-positive text-white text-bold text-center shadow-5"
                                    />

                                    <!-- Dialog -->
                                    <q-dialog v-model="setActionStatusDialogs" persistent>
                                      <q-card class="CompletionStatus">
                                        <q-card-section class="q-mb-sm row items-center justify-center">
                                          <div class="text-secondary text-weight-bold" style="font-size: 25px; color: #002b5c;">
                                            Confirm Corrective Action Status
                                          </div>
                                        </q-card-section>

                                        <q-separator class="formseparatorBlue" />

                                        <q-card-section>
                                          <div class="text-dark text-subtitle1 q-mb-sx text-center">
                                            Are you sure that the Corrective Action was implemented?
                                          </div>
                                        </q-card-section>

                                        <div class="row q-gutter-xxl justify-center">
                                          <q-btn
                                            flat
                                            rounded
                                            push
                                            label="CANCEL"
                                            class="buttonCancelDesign text-info"
                                            @click="closeActionStatus"
                                          />

                                          <q-btn
                                            flat
                                            rounded
                                            push
                                            label="SAVE"
                                            class="buttonSaveDesign bg-accent text-black"
                                            @click="saveCorActionStatus(items.iRNo)"
                                          />
                                        </div>
                                      </q-card>
                                    </q-dialog>

                                  </div>
                                </div>
                              </div>

                              <q-separator class="formseparatorBlue" />

                              <div
                                class="row q-col-gutter-md items-start q-pa-md"
                              >
                                <div class="col-8">
                                  <div
                                    class="text-weight-bold text-primary q-mb-xs"
                                  >
                                    Action Item Notes
                                  </div>

                                  <q-input
                                    autogrow
                                    rounded
                                    outlined
                                    :model-value="
                                      items.correctiveAction ||
                                      'No Data Available'
                                    "
                                    disable
                                  />
                                </div>

                                <div class="col-4">
                                  <div
                                    class="text-weight-bold text-primary q-mb-xs"
                                  >
                                    Accountable Person
                                  </div>

                                  <q-input
                                    autogrow
                                    rounded
                                    outlined
                                    :model-value="
                                      items.fullName || 'No Data Available'
                                    "
                                    disable
                                  />
                                </div>

                                <div class="col-6">
                                  <div
                                    class="text-weight-bold text-primary q-mb-xs"
                                  >
                                    Timeline From
                                  </div>

                                  <q-input
                                    rounded
                                    outlined
                                    :model-value="
                                      FormatTimelineDateFrom(
                                        items.corTimelineFromDate
                                      ) || 'No Data Available'
                                    "
                                    disable
                                  />
                                </div>

                                <div class="col-6">
                                  <div
                                    class="text-weight-bold text-primary q-mb-xs"
                                  >
                                    Timeline From
                                  </div>

                                  <q-input
                                    rounded
                                    outlined
                                    :model-value="
                                      FormatTimelineDateTo(
                                        items.corTimelineToDate
                                      ) || 'No Data Available'
                                    "
                                    disable
                                  />
                                </div>
                              </div>

                              <div class="q-pa-sm">
                                <q-list
                                  bordered
                                  class="rounded-borders shadow-3"
                                  style="
                                    border-top-left-radius: 30px;
                                    border-top-right-radius: 30px;
                                  "
                                >
                                  <q-expansion-item
                                    style="
                                      border: 2px solid #3a4d6e;
                                      border-top-left-radius: 30px;
                                      border-top-right-radius: 30px;
                                      background-color: #f9fafb;
                                    "
                                    icon="speaker_notes"
                                    label="💬 Comments for Pending Action Items"
                                    caption="Notes, clarifications, and follow-ups for items still pending resolution."
                                    class="text-primary"
                                    caption-class="text-grey-8"
                                    expand-icon="keyboard_arrow_down"
                                    expand-icon-class="text-primary"
                                  >
                                    <q-card-section
                                      align="right"
                                      style="border-top: 2px solid #3a4d6e"
                                    >
                                      <q-btn
                                        flat
                                        rounded
                                        push
                                        :disable="items.actionStatus === 2"
                                        @click="
                                          addPendingRemarks(
                                            selectedIrNo,
                                            items.code
                                          )
                                        "
                                        style="width: 195px"
                                        class="bg-primary text-white text-bold shadow-5"
                                        icon="add_comment"
                                        label="Add Remarks"
                                      />

                                      <q-dialog
                                        v-model="PendingRemarksDia"
                                        persistent
                                      >
                                        <q-card class="QCRCA">
                                          <q-card-section
                                            class="q-mb-sm row items-center justify-center"
                                          >
                                            <div
                                              class="text-secondary text-weight-bold"
                                              style="
                                                font-size: 25px;
                                                color: #002b5c;
                                              "
                                            >
                                              Quality Assurance (QA) Remarks
                                            </div>
                                          </q-card-section>

                                          <q-separator
                                            class="formseparatorBlue"
                                          />

                                          <q-card-section>
                                            <q-input
                                              outlined
                                              v-model="IrNo"
                                              style="display: none"
                                            />
                                            <q-input
                                              outlined
                                              v-model="ActionCode"
                                              style="display: none"
                                            />

                                            <q-input
                                              v-model="PendingRemarks"
                                              filled
                                              label="Notes"
                                              type="textarea"
                                              class="q-mt-md"
                                              auto-focus
                                            />
                                          </q-card-section>

                                          <q-card-actions align="center">
                                            <q-btn
                                              flat
                                              rounded
                                              push
                                              label="CANCEL"
                                              class="buttonCancelDesign text-info"
                                              @click="onClosePendingRem"
                                            />

                                            <q-btn
                                              flat
                                              rounded
                                              push
                                              label="SAVE"
                                              class="buttonSaveDesign bg-accent text-black"
                                              @click="
                                                savePendingRemarks(
                                                  selectedIrNo,
                                                  ActionCode
                                                )
                                              "
                                            />
                                          </q-card-actions>
                                        </q-card>
                                      </q-dialog>
                                    </q-card-section>

                                    <q-card-section
                                      style="border: 2px solid #ddd"
                                    >
                                      <div
                                        v-if="
                                          getFilteredPendingRemarks(items.code)
                                            .length
                                        "
                                      >
                                        <div
                                          class="q-pa-md q-mb-md bg-white rounded-borders shadow-2"
                                          style="border-left: 6px solid #03254b"
                                          v-for="(
                                            pendingDet, index
                                          ) in getFilteredPendingRemarks(
                                            items.code
                                          )"
                                          :key="index"
                                        >
                                          <div
                                            class="text-primary text-weight-bold"
                                          >
                                            📅 Date Created:
                                          </div>
                                          <div class="text-grey q-mb-sm">
                                            {{
                                              FormatTimelineDateFrom(
                                                pendingDet.dateTimeCreated
                                              )
                                            }}
                                          </div>

                                          <q-separator
                                            class="formseparatorYellow"
                                          />

                                          <div
                                            class="text-primary text-weight-bold q-mt-sm"
                                          >
                                            📝 Remarks Notes:
                                          </div>
                                          <div class="text-grey">
                                            {{ pendingDet.pendingRemarks }}
                                          </div>
                                        </div>
                                      </div>

                                      <div v-else>
                                        <div
                                          class="flex items-center justify-center"
                                          style="
                                            font-size: 30px;
                                            color: #a9a9a9;
                                            height: 100px;
                                          "
                                        >
                                          <p class="text-center">
                                            <i>~ No remarks added yet ~</i>
                                          </p>
                                        </div>
                                      </div>
                                    </q-card-section>
                                  </q-expansion-item>
                                </q-list>
                              </div>
                            </div>
                          </q-tab-panel>

                          <q-tab-panel name="riskdet">
                            <div
                              class="q-pa-sm"
                              v-for="(items, index) in actionRiskDetails"
                              :key="index"
                              style="
                                  border: 2px solid #3a4d6e;
                                  border-radius: 20px;
                                  margin-top: 16px;
                              "
                            >
                              <div class="column items-start justify-start">
                                <div class="q-pa-sm">
                                  <div
                                    class="text-primary text-center text-subtitle1 text-weight-bold q-mb-xs"
                                  >
                                    Tag Risk ID
                                  </div>

                                  <q-btn
                                    flat
                                    rounded
                                    push
                                    @click="editRiskID(items.id)"
                                    :disable="items.status === 'Completed'"
                                    label="Add Risk ID"
                                    style="width: 195px"
                                    class="bg-red text-white text-bold text-center shadow-5"
                                  />

                                </div>

                                <q-dialog
                                    v-model="setRiskIDDialogs"
                                    persistent
                                  >
                                    <q-card class="RiskCompletion">
                                      <q-card-section
                                        class="q-mb-sm row items-center justify-center"
                                      >
                                        <div
                                          class="text-secondary text-weight-bold"
                                          style="
                                            font-size: 25px;
                                            color: #002b5c;
                                          "
                                        >
                                          Risk Register
                                        </div>
                                      </q-card-section>

                                      <q-separator class="formseparatorBlue" />

                                      <q-card-section>
                                        <div
                                          class="text-dark text-subtitle1 q-mb-sx text-center"
                                        >
                                          Kindly ensure that the ERM ID and Process ID <br/> are entered in the risk register.
                                        </div>
                                      </q-card-section>

                                      <q-card-section class="q-pa-xs q-mr-xl q-ml-xl">
                                          <q-input rounded outlined v-model="ErmID" label="ERM ID"/>
                                          <q-input class="q-pt-sm" rounded outlined v-model="ProcessID" label="Process ID"/>
                                          <q-input class="q-pt-sm" rounded outlined v-model="ProcessTitle" label="Process Title"/>
                                          <q-select
                                            use-input
                                            rounded
                                            outlined
                                            clearable
                                            class="q-pt-sm"
                                            v-model="PolicyOwner"
                                            :options="disDept"
                                            @filter="FilterFn"
                                            label="Policy Owner"
                                            emit-value
                                            map-options
                                            :option-value="(option) => option.deptCode"
                                            :option-label="(option) => option.dept_Desc"
                                          />
                                      </q-card-section>

                                      <div
                                        class="row q-gutter-xxl; justify-center q-mt-md"
                                      >
                                        <q-btn
                                          flat
                                          rounded
                                          push
                                          label="CANCEL"
                                          class="buttonCancelDesign text-info"
                                          @click="onCloseRiskItems"
                                        />

                                        <q-btn
                                          flat
                                          rounded
                                          push
                                          label="SAVE"
                                          class="buttonSaveDesign bg-accent text-black"
                                          @click="
                                            saveRiskItems(items.iRNo)
                                          "
                                        />
                                      </div>
                                    </q-card>

                                </q-dialog>
                              </div>

                              <q-separator class="formseparatorBlue" />

                              <div
                                class="row q-col-gutter-md items-start q-pa-md"
                              >
                                <div class="col-12">
                                  <div
                                    class="text-weight-bold text-primary q-mb-xs"
                                  >
                                    Risk Item
                                  </div>

                                  <q-input
                                    autogrow
                                    rounded
                                    outlined
                                    :model-value="
                                      items.riskItem ||
                                      'No Data Available'
                                    "
                                    disable
                                  />
                                </div>

                                <div class="col-6">
                                  <div
                                    class="text-weight-bold text-primary q-mb-xs"
                                  >
                                    ERM ID
                                  </div>

                                  <q-input
                                    autogrow
                                    rounded
                                    outlined
                                    :model-value="
                                      items.ermID ||
                                      'No Data Available'
                                    "
                                    disable
                                  />
                                </div>

                                <div class="col-6">
                                  <div
                                    class="text-weight-bold text-primary q-mb-xs"
                                  >
                                    Process Title
                                  </div>

                                  <q-input
                                    autogrow
                                    rounded
                                    outlined
                                    :model-value="
                                      items.processTitle ||
                                      'No Data Available'
                                    "
                                    disable
                                  />
                                </div>

                                <div class="col-6">
                                  <div
                                    class="text-weight-bold text-primary q-mb-xs"
                                  >
                                    Process ID
                                  </div>

                                  <q-input
                                    autogrow
                                    rounded
                                    outlined
                                    :model-value="
                                      items.processID ||
                                      'No Data Available'
                                    "
                                    disable
                                  />
                                </div>

                                <div class="col-6">
                                  <div
                                    class="text-weight-bold text-primary q-mb-xs"
                                  >
                                    Policy Owner
                                  </div>

                                  <q-input
                                    autogrow
                                    rounded
                                    outlined
                                    :model-value="
                                      items.policyOwner ||
                                      'No Data Available'
                                    "
                                    disable
                                  />
                                </div>
                              </div>
                            </div>
                          </q-tab-panel>
                        </q-tab-panels>
                      </div>
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </q-dialog>

        <q-dialog v-model="setQADialogs">
          <q-card class="DoneStatus">
            <q-card-section class="q-mb-sm row items-center justify-center">
              <div
                class="text-secondary text-center text-weight-bold"
                style="font-size: 25px; color: #002b5c"
              >
                Root Cause Analysis (RCA) <br />Completion Items Status
              </div>
            </q-card-section>

            <q-separator class="formseparatorBlue" />

            <q-card-section>
              <q-input
                outlined
                v-model="IrNo"
                label="IRNo."
                style="display: none"
              />
              <div class="text-dark text-subtitle1 q-mb-sx text-center">
                Has the Corrective Action / Preventive Measure been implemented?
              </div>
            </q-card-section>

            <div class="row q-gutter-xxl; justify-center">
              <q-btn
                flat
                rounded
                push
                label="CANCEL"
                class="buttonCancelDesign text-info"
                @click="setQADialogs = false"
              />

              <q-btn
                flat
                rounded
                push
                label="SAVE"
                class="buttonSaveDesign bg-accent text-black"
                @click="saveIRQAStatus(selectedIrNo)"
              />
            </div>
          </q-card>
        </q-dialog>

        <q-dialog v-model="itemWait" persistent maximized>
          <div
            class="fullscreen flex flex-center column q-gutter-md"
            style="background-color: rgba(0, 0, 0, 0.85)"
          >
            <q-spinner-ios size="150px" color="white" />

            <div class="text-center text-subtitle1 text-white">
              Performing the required action.
              <br />
              <span class="text-italic text-accent">Please wait...</span>
            </div>
          </div>
        </q-dialog>

        <!-- ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
      </q-td>
    </template>

    <!-- <template v-slot:body-cell-remarks="props">
      <td>
        <q-btn
          v-if="
            props.row.combinedActionItems &&
            props.row.combinedActionItems.split(', ').includes('1')
          "
          class="bg-negative text-white text-bold text-center"
          @click="PendingRemarksTab(props.row.iRNo)"
          label="pending"
          style="width: 125px"
        />

        <q-btn
          :disable="
            props.row.combinedActionItems &&
            !props.row.combinedActionItems.split(', ').includes('1')
          "
          v-if="
            props.row.combinedActionItems &&
            !props.row.combinedActionItems.split(', ').includes('1')
          "
          class="bg-dark text-white text-bold text-center"
          label="done"
          style="width: 125px"
        />

        <q-dialog full-width full-height v-model="setRemarksDialogs" persistent>
          <q-card class="QAACT">
            <q-card-section class="QAACTHead">
              <div class="row items-center justify-between">
                <div class="QAACText">REMARKS FOR PENDING ACTION ITEMS</div>
                <div>
                  <q-btn
                    @click="addPendingRemarks(selectedIrNo)"
                    color="secondary "
                    icon="post_add"
                    label="Add Remarks"
                    style="
                      background-color: #024089;
                      border: 0.2em solid #f3f4f7;
                      border-radius: 0.5em;
                    "
                  />
                  <q-btn
                    style="margin-left: 25px"
                    round
                    push
                    icon="close"
                    class="bg-accent text-black"
                    @click="cancelPendingRemarks()"
                    v-close-popup
                  />
                </div>
              </div>
            </q-card-section>

            <q-dialog v-model="PendingRemarksDia" persistent>
              <q-card class="QCRCA">
                <q-card-section class="QCRHead">
                  <div class="QCRText">QA REMARKS</div>
                </q-card-section>

                <q-card-section>
                  <q-input
                    outlined
                    v-model="IrNo"
                    label="IRNo."
                    style="display: none"
                  />
                  <q-input
                    v-model="PendingRemarks"
                    filled
                    label="Notes"
                    type="textarea"
                    class="q-mt-md"
                    auto-focus
                  />
                </q-card-section>

                <q-card-actions align="right" class="footer-actions">
                  <q-btn
                    push
                    label="CANCEL"
                    color="secondary"
                    @click="onClosePendingRem"
                  />
                  <q-btn
                    push
                    label="SAVE"
                    color="accent"
                    class="text-black"
                    @click="savePendingRemarks(selectedIrNo)"
                  />
                </q-card-actions>
              </q-card>
            </q-dialog>

            <q-card-section>
              <q-list bordered>
                <q-item
                  v-for="(pendingDet, index) in pendingRemarksDetails"
                  :key="index"
                >
                  <q-item-section class="QAACTABLE" v-if="pendingDet">
                    <div class="QAACTabtext">
                      <div>
                        <div>
                          <b>DATE:</b>
                          {{
                            FormatTimelineDateFrom(pendingDet.dateTimeCreated)
                          }}
                        </div>
                        <div
                          style="
                            background-color: #ffc619;
                            height: 2px;
                            margin: 5px 0;
                          "
                        ></div>
                        <div>
                          <b>REMARKS NOTE:</b><br />
                          {{ pendingDet.pendingRemarks }}
                        </div>
                      </div>
                    </div>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </q-dialog>
      </td>
    </template> -->

    <template v-slot:body-cell-qastatus="props">
      <q-td>
        <q-btn
          flat
          rounded
          push
          :disable="props.row.qAStatus === true"
          v-if="props.row.qAStatus === true"
          class="bg-positive text-white text-bold text-center"
          style="border-radius: 20px; width: 125px"
          >OPEN</q-btn
        >

        <q-btn
          flat
          rounded
          push
          :disable="props.row.qAStatus === false"
          v-if="props.row.qAStatus === false"
          class="bg-negative text-white text-bold text-center"
          style="border-radius: 20px; width: 125px"
          >CLOSED</q-btn
        >
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
    getInc: Function,
    // disDept: Array,
    rcaStats: Array,
    qaStats: Array,
  },
  data() {
    return {
      IRQADetailss: [],
      parties: [],
      IRDialog: false,
      setQADialogs: false,
      setRCAreceived: false,
      addCon: false,
      please: false,
      rdPWait: false,
      isLoadingIRDetails: false,
      iRNo: "",
      PrimaryDept: "",
      QAStatus: null,
      pdfDisplayDialog: false,
      pdfUrl: null,
      maximizedToggle: null,
      subjectFileName: null,
      subjectFile: null,

      setRCAApproved: false,
      viewRiskGrade: false,
      showDatePicker: false,
      actionparties: [
        {
          ActionItem: "",
          TimelineFromDate: new Date().toISOString().substr(0, 10),
          TimelineToDate: "",
        },
      ],
      ActionItem: "",
      acWait: false,

      setQATraDialogs: false,
      setQATrans: false,
      transfering: false,
      EmpTransfer: null,
      SubjectCode: "",

      setRemarksDialogs: false,
      pendingRemarksDetails: [],
      PendingRemarksDia: false,
      PendingRemarks: "",

      // setRCASubDialogs: false,
      addConclusion: false,
      setQARefDialogs: false,
      IrNo: "",
      selectedIrNo: "",
      newConclusion: "",
      DeptCodeInform: null,
      disDept: [],

      setRiskgradDialogs: false,
      RiskGrading: "",
      riskLevel: [
        { label: "VERY LOW RISK", value: "1" },
        { label: "LOW RISK", value: "2" },
        { label: "MODERATE RISK", value: "3" },
        { label: "HIGH RISK", value: "4" },
        { label: "VERY HIGH RISK", value: "5" },
      ],

      expandedItem: null,
      selectedCode: null, // Store selected action item code

      setRCADetailsForm: false,
      IRRCADetailss: [],

      setRCAReturn: false,
      customModel: "no",
      selectedProblemStatement: [],
      selectedWhy: [],
      selectedCorrective: [],
      // selectedPreventive: [],

      problemStatmentNote: [],
      whyNotes: [],
      correctiveNotes: [],
      correctiveTimelineFrom: [],
      correctiveTimelineTo: [],
      // preventiveNotes: [],
      preventiveTimelineFrom: [],
      preventiveTimelineTo: [],

      setRCARevisionSubDialogs: false,
      addConclusionRevision: false,
      setRevisionRCAReturn: false,

      setRCAReviewSubDialogs: false,
      setReviewDisplay: false,
      IRRCAReturnReviewDetailss: [],
      IRRCAFilterReturnReviewDetailss: [],
      IRRCAFilterReturnRWDetailss: [],
      setReviewRCAReturn: false,
      RevisionCode: "",
      customModelReview: "no",

      selectedProblemStatementReview: [],
      selectedWhyReview: [],
      selectedCorrectiveReview: [],
      // selectedPreventiveReview: [],

      problemStatmentNoteReview: [],
      whyNotesReview: [],
      correctiveNotesReview: [],
      preventiveNotesReview: [],

      rcaReject: false,
      waitingReturnRevised: false,

      waitingforApproved: false,
      setApprovedRCA: false,
      setRCAApprovedDetailsFRS: false,
      setRCAApprovedDetailsFRW: false,
      IRRCAApprovedDetailss: [],

      splitterModel: 17,
      tab: "action",
      actionCorrectiveDetails: [],
      actionRiskDetails: [],
      setActionItemDialogs: false,
      setActionStatusDialogs: false,
      itemWait: false,
      setStatusDone: false,
      TimelineFromDate: new Date().toISOString().substr(0, 10),
      TimelineToDate: "",
      showActionDatePicker: false,
      RiskLoading: false,
      disEmployeeName: [],
      setRiskIDDialogs: false,

      domainList: [
        { label: "Manpower", value: "1" },
        { label: "Method", value: "2" },
        { label: "Machine", value: "3" },
        { label: "Material", value: "4" },
        { label: "Measurement", value: "5" },
        { label: "Environment", value: "6" },
      ],
      selectedActionable: [],
      selectedActionableReview: [],
      ActionableNotesReview: [],
      ActionableNotes: [],
      ErmID: "",
      ProcessID: "",
      ProcessTitle: "",
      PolicyOwner: "",

      setRejectStatus: false,
      rejectNote: "",
    };
  },

  computed: {
    ...mapGetters({
      loggedInUser: "ApplyStore/getUser",
      getQACon: "ApplyStore/getQACon",
      departments: "ApplyStore/departments",
      getActionItem: "ApplyStore/getActionItem",
      getRemarks: "ApplyStore/getRemarks",
      getRCA: "ApplyStore/getRCA",
      getReturnReviewRCA: "ApplyStore/getReturnReviewRCA",
      getcorrective: "ApplyStore/getcorrective",
      getRiskData: "ApplyStore/getRiskData",
      getEmployee: "ApplyStore/getEmployee",
    }),

    latestRevisionCode() {
      const details = this.IRRCAFilterReturnReviewDetailss;
      if (!details) return "";

      const whylogs = details.RCAWhyReviewLogReturn || [];
      const corlogs = details.RCACorrectiveReviewLogReturn || [];

      const logs = [...whylogs, ...corlogs];

      if (!logs.length) return "";

      const latest = logs.reduce((a, b) =>
        new Date(b.dateTimeCreated) > new Date(a.dateTimeCreated) ? b : a
      );

      return latest.revisionCode || "";
    },

    whyReviewLogs() {
      return this.IRRCAReturnReviewDetailss?.RCAWhyReviewLogReturn || [];
    },

    actionableReviewLogs(){
      return this.IRRCAReturnReviewDetailss?.RCAActionableReviewLogReturn || [];
    },

    corReviewLogs() {
      return this.IRRCAReturnReviewDetailss?.RCACorrectiveReviewLogReturn || [];
    },

    hasPendingActions() {
      const hasCorrective = this.actionCorrectiveDetails.some(
        (item) => item.actionStatus === 1
      );
      return hasCorrective;
    },

    // hasPendingActions() {
    //   const hasCorrective = this.actionCorrectiveDetails.some(
    //     (item) => item.actionStatus === 1
    //   );
    //   const hasPreventive = this.actionPreventiveDetails.some(
    //     (item) => item.actionStatus === 1
    //   );
    //   const result = hasCorrective && hasPreventive;
    //   return result;
    // },

    unselectedProblemStatements() {
      return this.IRRCADetailss.RCAProblemStatementLogs?.filter(
        (item) =>
          !this.selectedProblemStatement.some((i) => i.code === item.code)
      ).map((item) => ({
        code: item.code,
        iRNo: item.iRNo,
        problemCode: item.problemCode,
        description: item.description,
      }));
    },

    unselectedWhyItems() {
      return this.IRRCADetailss.RCAWhyLog?.filter(
        (item) => !this.selectedWhy.some((i) => i.code === item.code)
      ).map((item) => ({
        code: item.code,
        iRNo: item.iRNo,
        problemCode: item.problemCode,
        problemName: item.problemName,
        description: item.description,
      }));
    },

    unselectedActionableItems() {
      return this.IRRCADetailss.RCAActionableLog?.filter(
        (item) => !this.selectedActionable.some((i) => i.code === item.code)
      ).map((item) => ({
        code: item.code,
        iRNo: item.iRNo,
        actionable: item.actionable,
        domain: item.domain,
      }));
    },

    unselectedCorrectiveItems() {
      return this.IRRCADetailss.RCACorrectiveLog?.filter(
        (item) => !this.selectedCorrective.some((i) => i.code === item.code)
      ).map((item) => ({
        code: item.code,
        iRNo: item.iRNo,
        accountablePer: item.accountablePer,
        correctiveAction: item.correctiveAction,
        corTimelineFromDate: item.corTimelineFromDate,
        corTimelineToDate: item.corTimelineToDate,
      }));
    },

    // unselectedPreventiveItems() {
    //   return this.IRRCADetailss.RCAPreventiveLog?.filter(
    //     (item) => !this.selectedPreventive.some((i) => i.code === item.code)
    //   ).map((item) => ({
    //     code: item.code,
    //     iRNo: item.iRNo,
    //     responsiblePer: item.responsiblePer,
    //     preventiveMeasure: item.preventiveMeasure,
    //     preTimelineFromDate: item.preTimelineFromDate,
    //     preTimelineToDate: item.preTimelineToDate,
    //   }));
    // },

    unselectedProblemStatementsReview() {
      return this.IRRCAReturnReviewDetailss.RCAProblemStatementReviewLogsReturn?.filter(
        (item) =>
          !this.selectedProblemStatementReview.some((i) => i.code === item.code)
      ).map((item) => ({
        code: item.code,
        iRNo: item.iRNo,
        problemCode: item.problemCode,
        description: item.description,
      }));
    },

    unselectedWhyItemsReview() {
      return this.IRRCAReturnReviewDetailss.RCAWhyReviewLogReturn?.filter(
        (item) => !this.selectedWhyReview.some((i) => i.code === item.code)
      ).map((item) => ({
        code: item.code,
        iRNo: item.iRNo,
        problemCode: item.problemCode,
        problemName: item.problemName,
        description: item.description,
      }));
    },

    unselectedActionableItemsReview(){
      return this.IRRCAReturnReviewDetailss.RCAActionableReviewLogReturn?.filter(
        (item) => !this.selectedActionableReview.some((i) => i.code === item.code)
      ).map((item) => ({
        code: item.code,
        iRNo: item.iRNo,
        actionable: item.actionable,
        domain: item.domain,
      }));
    },

    unselectedCorrectiveItemsReview() {
      return this.IRRCAReturnReviewDetailss.RCACorrectiveReviewLogReturn?.filter(
        (item) =>
          !this.selectedCorrectiveReview.some((i) => i.code === item.code)
      ).map((item) => ({
        code: item.code,
        iRNo: item.iRNo,
        accountablePer: item.accountablePer,
        correctiveAction: item.correctiveAction,
        corTimelineFromDate: item.corTimelineFromDate,
        corTimelineToDate: item.corTimelineToDate,
      }));
    },

    // unselectedPreventiveItemsReview() {
    //   return this.IRRCAReturnReviewDetailss.RCAPreventiveReviewLogReturn?.filter(
    //     (item) =>
    //       !this.selectedPreventiveReview.some((i) => i.code === item.code)
    //   ).map((item) => ({
    //     code: item.code,
    //     iRNo: item.iRNo,
    //     responsiblePer: item.responsiblePer,
    //     preventiveMeasure: item.preventiveMeasure,
    //     preTimelineFromDate: item.preTimelineFromDate,
    //     preTimelineToDate: item.preTimelineToDate,
    //   }));
    // },
  },

  created() {
    this.PendingRemarksTab();
    this.getEmployeeList();
  },

  methods: {
    toggleExpansion(index, code) {
      if (this.expandedItem === index) {
        this.expandedItem = null;
        this.selectedCode = null;
      } else {
        this.expandedItem = index;
        this.selectedCode = code; // Store selected code for filtering
      }
    },

    ///////////////////////////////////////IRDETAILS//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

    async viewIReport(IRNo) {
      try {
        this.IRDialog = true;
        this.isLoadingIRDetails = true

        const data = {
          iRNo: IRNo,
        };
        this.selectedIrNo = IRNo;
        const response = await this.$store.dispatch("ApplyStore/disIrp", data);
        this.IRQADetailss = this.getQACon;
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


    EmploFullName(employeeCode) {
      if (!employeeCode || !this.getEmployee) return null;
      const employee = this.getEmployee.find(
        (emp) => String(emp.employeeCode) === String(employeeCode)
      );

      return employee ? employee.fullName : null;
    },

    ///////////////////////////////////////QA INCHARGE//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    qaTransfer(IRNo, SubjectCode) {
      this.setQATraDialogs = true;
      this.IrNo = IRNo;
      this.SubjectCode = SubjectCode;
    },

    saveQATra() {
      this.setQATraDialogs = false;
      this.setQATrans = true;
    },

    async transfer() {
      this.setQATrans = false;
      this.transfering = true;

      try {
        // Constructing payload
        const payload = {
          IRNo: this.IrNo,
          SubjectCode: this.SubjectCode,
          EmpTransfer: this.EmpTransfer,
        };
        // Dispatching the action to add QA transfer
        this.cancelTrans();
        await this.$store.dispatch("ApplyStore/AddqaTrans", payload);

        // Notifying the user of successful transfer
        this.$q.notify({
          color: "green-8",
          position: "top",
          message: "SUCCESS TRANSFERRING OWNERSHIP",
          icon: "check",
          iconColor: "white",
          timeout: 3000,
          progress: true,
        });

        // Delay further execution to allow data processing or UI updates
        setTimeout(() => {
          this.getInc();
          this.transfering = false;
        }, 5000);
      } catch (error) {
        console.error("Error inserting data:", error);
        this.transfering = false;
        this.$q.notify({
          color: "red-5",
          position: "top",
          message: "ERROR TRANSFERRING OWNERSHIP",
          icon: "error",
          iconColor: "white",
          timeout: 3000,
          progress: true,
        });
      }
    },

    cancelTrans() {
      this.setQATrans = false;
      this.EmpTransfer = null;
      this.SubjectCode = "";
      this.IrNo = "";
    },

    ///////////////////////////////////////REQUIRED//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    FilterFn(val, update) {
      if (val === "") {
        update(() => {
          this.disDept = this.departments;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.disDept = this.departments.filter((option) => {
          return option.dept_Desc.toLowerCase().indexOf(needle) > -1;
        });
      });
    },

    requiredRCA(IRNo) {
      this.setRCAreceived = true;
      this.IrNo = IRNo;
    },

    submitRCAEmail() {
      if (!this.validateIR()) {
        this.$q.notify({
          color: "negative",
          position: "center",
          message: "REQUIRED ALL FIELDS",
          icon: "report_problem",
          iconColor: "white",
          timeout: 1000, // Increased timeout to 2000 milliseconds
          progress: true,
        });
        return;
      }

      this.rdPWait = true;
      this.saveRCAEmail();

      setTimeout(() => {
        this.getInc();
        this.rdPWait = false;
      }, 4000);

      this.onRCACancel();

      this.$q.notify({
        color: "green-8",
        position: "top",
        message: "SUCCESS SENDING EMAIL",
        icon: "check",
        iconColor: "white",
        timeout: 5000,
        progress: true,
      });
    },

    async saveRCAEmail() {
      try {
        const addEmail = {
          IRNo: this.IrNo,
          PrimaryDept: this.PrimaryDept,
          DeptCodeInv: this.parties.map((party) => party.DeptCodeInv),
        };
        this.onRCACancel();
        const response = await this.$store.dispatch(
          "ApplyStore/addRCAEmail",
          addEmail
        );
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    },

    addParty() {
      if (this.parties.length < 4) {
        this.parties.push({ DeptCodeInv: "" });
      } else {
        this.$q.notify({
          type: "negative",
          message: "Cannot add more parties",
        });
      }
    },

    removeParty(index) {
      this.parties.splice(index, 1);
    },

    onRCACancel() {
      this.IrNo = "";
      this.PrimaryDept = "";
      this.parties = [];
      this.setRCAreceived = false;
      this.removeParty();
    },

    validateIR() {
      return this.IrNo && this.PrimaryDept && this.parties;
    },

    /////////////////////////////////////////////////////////////////////////////////////RISK GRADING//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    editRiskGrading(IRNo) {
      this.setRiskgradDialogs = true;
      this.IrNo = IRNo; // Ensure consistency with this.IrNo
    },

    displayRiskGrading() {
      this.viewRiskGrade = true;
    },

    cancelRiskGrade() {
      this.setRiskgradDialogs = false;
      this.RiskGrading = "";
    },

    async saveRiskGrade() {
      try {
        this.RiskLoading = true;

        const payload = {
          IRNo: this.IrNo,
          RiskGrading: this.RiskGrading,
        };

        const response = await this.$store.dispatch(
          "ApplyStore/putRiskGrading",
          payload
        );
        this.cancelRiskGrade();

        this.$q.notify({
          color: "green-8",
          position: "top",
          message: "SUCCESS RISK GRADING SUBMITTED",
          icon: "check",
          iconColor: "white",
          timeout: 1000,
          progress: true,
        });

        setTimeout(() => {
          this.getInc();
          this.RiskLoading = false;
        }, 2000);
      } catch (error) {
        console.error("Error updating status:", error);
      }
    },

    ////////////////////////////////////////////////////// FOR REVISION ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    getDomainLabel(value) {
      if (!this.domainList || this.domainList.length === 0) return ''
      const found = this.domainList.find(opt => String(opt.value) === String(value))
      return found ? found.label : 'Unknown Domain'
    },

    editRevisionConclusion(IRNo) {
      this.setRCARevisionSubDialogs = true;
      this.IrNo = IRNo; // Ensure consistency with this.IrNo
      this.selectedIrNo = IRNo;
    },

    async viewRCADetails(IRNo) {
      const data = {
        iRNo: IRNo,
      };
      const response = await this.$store.dispatch(
        "ApplyStore/disRCAdetails",
        data
      );
      this.IRRCADetailss = this.getRCA;
    },

    async saveIRCARevision(selectedIrNo) {
      try {
        this.setRCARevisionSubDialogs = false;
        this.addConclusionRevision = true;
        this.viewRCADetails(selectedIrNo);
      } catch (error) {
        console.error("Error updating status:", error);
      }
    },

    async submitRCADisapprovedRevision(IRNo) {
      try {
        const iRNo = this.selectedIrNo;
        const payload = { IRNo: this.selectedIrNo, CountRCA: "1" };

        const response = await this.$store.dispatch(
          "ApplyStore/putRCASub",
          payload
        );

        this.addConclusionRevision = false;

        setTimeout(() => {
          this.getInc();
        }, 2000);

        this.$q.notify({
          color: "green-8",
          position: "top",
            message: "SUCCESS COUNT DISAPPROVED RCA",
          icon: "check",
          iconColor: "white",
          timeout: 1000,
          progress: true,
        });

        this.viewRCADetails(IRNo);
        this.setRevisionRCAReturn = true;
      } catch (error) {
        console.error("Error creating action items:", error);
      }
    },

    validateRevisionRemarks() {
      return this.newConclusion;
    },

    // cancelDispprovedRcaRevision() {
    //   this.IrNo = "";
    //   this.addConote = "";
    //   this.addConclusionRevision = false;
    // },

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    handleSelectProblemStatementRevision(val, item) {
      if (val.includes(item.code)) {
        if (!this.selectedProblemStatement.some((i) => i.code === item.code)) {
          this.selectedProblemStatement.push(item);
        }

        // Siguraduhin may entry sa problemStatementNotes
        if (!this.problemStatmentNote[item.code]) {
          this.problemStatmentNote[item.code] = "";
        }
      } else {
        this.selectedProblemStatement = this.selectedProblemStatement.filter(
          (i) => i.code !== item.code
        );
        delete this.problemStatmentNote[item.code]; // Remove note if unchecked
      }
    },

    handleSelectWhyRevision(val, item) {
      if (val.includes(item.code)) {
        if (!this.selectedWhy.some((i) => i.code === item.code)) {
          this.selectedWhy.push(item);
        }

        if (!this.whyNotes[item.code]) {
          this.whyNotes[item.code] = "";
        }
      } else {
        this.selectedWhy = this.selectedWhy.filter((i) => i.code !== item.code);
        delete this.whyNotes[item.code];
      }
    },

    handleSelectActionable(val, item) {
      if (val.includes(item.code)) {
        if (!this.selectedActionable.some((i) => i.code === item.code)) {
          this.selectedActionable.push(item);
        }
        if (!this.ActionableNotes[item.code]) {
          this.ActionableNotes[item.code] = "";
        }
      } else {
        this.selectedActionable = this.selectedActionable.filter(
          (i) => i.code !== item.code
        );
        delete this.ActionableNotes[item.code];
      }
    },

    handleSelectCorrectiveRevision(val, item) {
      if (val.includes(item.code)) {
        if (!this.selectedCorrective.some((i) => i.code === item.code)) {
          this.selectedCorrective.push(item);
        }

        if (!this.correctiveNotes[item.code]) {
          this.correctiveNotes[item.code] = "";
        }
      } else {
        this.selectedCorrective = this.selectedCorrective.filter(
          (i) => i.code !== item.code
        );
        delete this.correctiveNotes[item.code];
      }
    },

    // handleSelectPreventiveRevision(val, item) {
    //   if (val.includes(item.code)) {
    //     if (!this.selectedPreventive.some((i) => i.code === item.code)) {
    //       this.selectedPreventive.push(item);
    //     }

    //     if (!this.preventiveNotes[item.code]) {
    //       this.preventiveNotes[item.code] = "";
    //     }
    //   } else {
    //     this.selectedPreventive = this.selectedPreventive.filter(
    //       (i) => i.code !== item.code
    //     );
    //     delete this.preventiveNotes[item.code];
    //   }
    // },

    async editReturnRCARevision() {
      try {
        const mapAndFilter = (items, fields, notes) =>
          items
            .map((item) =>
              Object.fromEntries(
                fields.map((field) => [
                  field,
                  field === "notes"
                    ? notes?.[item.code] ?? ""
                    : item?.[field] || "",
                ])
              )
            )
            .filter((item) => item.iRNo && item.code);

        const data = {
          IRNo: this.selectedIrNo,

          RCAProblemStatement: mapAndFilter(
            this.selectedProblemStatement,
            ["iRNo", "problemCode", "code", "description", "notes"],
            this.problemStatmentNote
          ),

          RCAWhy: mapAndFilter(
            this.selectedWhy,
            [
              "iRNo",
              "problemName",
              "problemCode",
              "code",
              "description",
              "notes",
            ],
            this.whyNotes
          ),

          RCAActionable: mapAndFilter(
            this.selectedActionable,
            ["iRNo", "code", "actionable", "domain", "notes"],
            this.ActionableNotes
          ),

          RCACorrective: mapAndFilter(
            this.selectedCorrective,
            [
              "iRNo",
              "code",
              "accountablePer",
              "correctiveAction",
              "corTimelineFromDate",
              "corTimelineToDate",
              "notes",
            ],
            this.correctiveNotes
          ),

          // RCAPreventive: mapAndFilter(
          //   this.selectedPreventive,
          //   [
          //     "iRNo",
          //     "code",
          //     "responsiblePer",
          //     "preventiveMeasure",
          //     "preTimelineFromDate",
          //     "preTimelineToDate",
          //     "notes",
          //   ],
          //   this.preventiveNotes
          // ),

          RCANotSelProblemStatement: this.unselectedProblemStatements.map(
            ({ code, iRNo, problemCode, description }) => ({
              code,
              iRNo,
              problemCode,
              description,
            })
          ),

          RCANotSelWhyItems: this.unselectedWhyItems.map(
            ({ iRNo, problemName, problemCode, code, description }) => ({
              iRNo,
              problemName,
              problemCode,
              code,
              description,
            })
          ),

          RCANotSelActionableItems: this.unselectedActionableItems.map(
            ({ iRNo, code, actionable, domain }) => ({
              iRNo,
              code,
              actionable,
              domain,
            })
          ),

          RCANotSelCorrective: this.unselectedCorrectiveItems.map(
            ({
              code,
              iRNo,
              accountablePer,
              correctiveAction,
              corTimelineFromDate,
              corTimelineToDate,
            }) => ({
              code,
              iRNo,
              accountablePer,
              correctiveAction,
              corTimelineFromDate,
              corTimelineToDate,
            })
          ),

          // RCANotSelPreventive: this.unselectedPreventiveItems.map(
          //   ({
          //     code,
          //     iRNo,
          //     responsiblePer,
          //     preventiveMeasure,
          //     preTimelineFromDate,
          //     preTimelineToDate,
          //   }) => ({
          //     code,
          //     iRNo,
          //     responsiblePer,
          //     preventiveMeasure,
          //     preTimelineFromDate,
          //     preTimelineToDate,
          //   })
          // ),
        };

        this.setRevisionRCAReturn = false;
        this.rcaReject = true;

        const response = await this.$store.dispatch(
          "ApplyStore/AddDisApprovedRCAReturn",
          data
        );

        this.$q.notify({
          color: "green-8",
          position: "top",
          message: "SUCCESS DISAPPROVED RCA",
          icon: "check",
          iconColor: "white",
          timeout: 1000,
          progress: true,
        });

        setTimeout(() => {
          this.getInc();
          this.rcaReject = false;
        }, 3000);
      } catch (error) {
        console.error("Error creating action items:", error);
      }
    },

    onCancelEditRevisionRCADetails(){
      this.addConclusionRevision = false;
      this.setRevisionRCAReturn = false;
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async getEmployeeList() {
      try {
        await this.$store.dispatch("ApplyStore/disEmployeeList");
        this.disEmployeeName = this.getEmployee;
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    },

    ///////////////////////////////////////////////////////////////////// APPROVED REVISION//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async submitRCAApprovedFRS(IRNo) {
      this.addConclusionRevision = false;
      try {
        const pickFields = (items, fields) =>
          items.map((item) =>
            Object.fromEntries(fields.map((field) => [field, item[field]]))
          );

        const payload = {
          IRNo: IRNo,
          NewConclusion: this.newConclusion || "",

          RCAProblemStatement: pickFields(
            this.IRRCADetailss.RCAProblemStatementLogs,
            ["iRNo", "problemCode", "code", "description"]
          ),

          RCAWhy: pickFields(this.IRRCADetailss.RCAWhyLog, [
            "iRNo",
            "problemName",
            "problemCode",
            "code",
            "description",
          ]),

          RCAActionable: pickFields(this.IRRCADetailss.RCAActionableLog,
            ["iRNo", "code", "actionable", "domain"],
          ),

          RCACorrective: pickFields(this.IRRCADetailss.RCACorrectiveLog, [
            "iRNo",
            "code",
            "accountablePer",
            "correctiveAction",
            "corTimelineFromDate",
            "corTimelineToDate",
          ]),

          // RCAPreventive: pickFields(this.IRRCADetailss.RCAPreventiveLog, [
          //   "iRNo",
          //   "code",
          //   "responsiblePer",
          //   "preventiveMeasure",
          //   "preTimelineFromDate",
          //   "preTimelineToDate",
          // ]),
        };
        this.waitingforApproved = true;

        await this.$store.dispatch("ApplyStore/AddApprovedRCAReturn", payload);
        this.$q.notify({
          color: "green-8",
          position: "top",
          message: "SUCCESS RCA APPROVED",
          icon: "check",
          iconColor: "white",
          timeout: 3000,
          progress: true,
        });

        this.viewRCAApprovedDetailsForm(IRNo);

        setTimeout(() => {
          this.getInc();
          this.waitingforApproved = false;
          this.setRCAApprovedDetailsFRS = true;
        }, 3000);
      } catch (error) {
        console.error("Error during RCA approval:", error.message || error); // Log the error with more detail
      }
    },

    onCancelRCAApprovedFRS() {
      this.setRCAApprovedDetailsFRS = false;
    },

    async viewRCAApprovedDetailsForm(IRNo) {
      const data = {
        iRNo: IRNo,
      };
      const response = await this.$store.dispatch(
        "ApplyStore/disRCAApproveddetails",
        data
      );

      this.IRRCAApprovedDetailss = this.getRCA;
    },

    ////////////////////////////////////////////////////// FOR REVIEW ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    editReviewConclusion(IRNo) {
      this.setRCAReviewSubDialogs = true;
      this.IrNo = IRNo; // Ensure consistency with this.IrNo
      this.selectedIrNo = IRNo;
      this.viewEditFilterReviewRCADetails(IRNo);

    },

    async viewEditFilterReviewRCADetails(IRNo) {
      const data = {
        iRNo: IRNo,
      };

      const iRNo = this.selectedIrNo;
      const response = await this.$store.dispatch(
        "ApplyStore/disFilterQAReviewRCAdetailsreturn",
        data
      );

      this.IRRCAFilterReturnReviewDetailss = this.getReturnReviewRCA;
    },

    async viewEditReviewRCADetails(IRNo, latestRevisionCode) {
      const data = {
        iRNo: IRNo,
        revisionCode: latestRevisionCode,
      };

      const iRNo = this.selectedIrNo;
      const response = await this.$store.dispatch(
        "ApplyStore/disQAReviewRCAdetailsreturn",
        data
      );

      this.IRRCAReturnReviewDetailss = this.getReturnReviewRCA;
    },

    async saveIRCAReview(selectedIrNo, latestRevisionCode) {
      try {
        const payload = { IRNo: this.selectedIrNo, CountRCA: "1" };
        this.RevisionCode = latestRevisionCode;
        const response = await this.$store.dispatch(
          "ApplyStore/putRCASub",
          payload
        );
        setTimeout(() => {
          this.getInc();
        }, 2000);
        this.$q.notify({
          color: "green-8",
          position: "top",
          message: "RECEIVED RCA CONTENT",
          icon: "check",
          iconColor: "white",
          timeout: 1000,
          progress: true,
        });
        this.setRCAReviewSubDialogs = false;
        this.setReviewDisplay = true;
        this.viewEditReviewRCADetails(selectedIrNo, latestRevisionCode);
      } catch (error) {
        console.error("Error updating status:", error);
      }
    },

    async submitRCADisapprovedReview(IRNo, RevisionCode) {
      try {
        const data = {
          IRNo: this.selectedIrNo,
          NewConclusion: this.newConclusion,
        };
        const iRNo = this.selectedIrNo;
        this.setReviewDisplay = false;
        this.setReviewRCAReturn = true;
        this.cancelDispprovedRcaReview();
        const response = await this.$store.dispatch(
          "ApplyStore/addRCADispproved",
          data
        );
        this.viewEditReviewRCADetails(iRNo, RevisionCode);
      } catch (error) {
        console.error("Error creating action items:", error);
      }
    },

    cancelDispprovedRcaReview() {
      this.IrNo = "";
      this.newConclusion = "";
    },

    validateReviewRemarks() {
      return this.newConclusion;
    },

    handleSelectProblemStatementReview(val, item) {
      if (val.includes(item.code)) {
        if (
          !this.selectedProblemStatementReview.some((i) => i.code === item.code)
        ) {
          this.selectedProblemStatementReview.push(item);
        }

        // Siguraduhin may entry sa problemStatementNotes
        if (!this.problemStatmentNoteReview[item.code]) {
          this.problemStatmentNoteReview[item.code] = "";
        }
      } else {
        this.selectedProblemStatementReview =
          this.selectedProblemStatementReview.filter(
            (i) => i.code !== item.code
          );
        delete this.problemStatmentNoteReview[item.code]; // Remove note if unchecked
      }
    },

    handleSelectWhyReview(val, item) {
      if (val.includes(item.code)) {
        if (!this.selectedWhyReview.some((i) => i.code === item.code)) {
          this.selectedWhyReview.push(item);
        }

        if (!this.whyNotesReview[item.code]) {
          this.whyNotesReview[item.code] = "";
        }
      } else {
        this.selectedWhyReview = this.selectedWhyReview.filter(
          (i) => i.code !== item.code
        );
        delete this.whyNotesReview[item.code];
      }
    },

    handleSelectActionableReview(val, item){
      if (val.includes(item.code)){
        if (!this.selectedActionableReview.some((i) => i.code === item.code)) {
          this.selectedActionableReview.push(item);
        }
        if (!this.ActionableNotesReview[item.code]) {
          this.ActionableNotesReview[item.code] = "";
        }
      }else {
        this.selectedActionableReview = this.selectedActionableReview.filter( (i) => i.code !== item.code );
        delete this.ActionableNotesReview[item.code];
      }
    },

    handleSelectCorrectiveReview(val, item) {
      if (val.includes(item.code)) {
        if (!this.selectedCorrectiveReview.some((i) => i.code === item.code)) {
          this.selectedCorrectiveReview.push(item);
        }

        if (!this.correctiveNotesReview[item.code]) {
          this.correctiveNotesReview[item.code] = "";
        }
      } else {
        this.selectedCorrectiveReview = this.selectedCorrectiveReview.filter(
          (i) => i.code !== item.code
        );
        delete this.correctiveNotesReview[item.code];
      }
    },

    // handleSelectPreventiveReview(val, item) {
    //   if (val.includes(item.code)) {
    //     if (!this.selectedPreventiveReview.some((i) => i.code === item.code)) {
    //       this.selectedPreventiveReview.push(item);
    //     }

    //     if (!this.preventiveNotesReview[item.code]) {
    //       this.preventiveNotesReview[item.code] = "";
    //     }
    //   } else {
    //     this.selectedPreventiveReview = this.selectedPreventiveReview.filter(
    //       (i) => i.code !== item.code
    //     );
    //     delete this.preventiveNotesReview[item.code];
    //   }
    // },

    async editReturnRCAReview(selectedIrNo) {
      this.waitingReturnRevised = true;
      try {
        const mapAndFilter = (items, fields, notes) =>
          items
            .map((item) =>
              Object.fromEntries(
                fields.map((field) => [
                  field,
                  field === "notes"
                    ? notes?.[item.code] ?? ""
                    : item?.[field] || "",
                ])
              )
            )
            .filter((item) => item.iRNo && item.code);

        const data = {
          IRNo: this.selectedIrNo,
          RCAProblemStatement: mapAndFilter(
            this.selectedProblemStatementReview,
            [
              "iRNo",
              "problemCode",
              "code",
              "revisionCode",
              "description",
              "notes",
            ],
            this.problemStatmentNoteReview
          ),

          RCAWhy: mapAndFilter(
            this.selectedWhyReview,
            [
              "iRNo",
              "problemName",
              "problemCode",
              "code",
              "revisionCode",
              "description",
              "notes",
            ],
            this.whyNotesReview
          ),

          RCAActionable: mapAndFilter(
            this.selectedActionableReview,
            ["iRNo", "code", "actionable", "domain", "notes"],
            this.ActionableNotesReview
          ),

          RCACorrective: mapAndFilter(
            this.selectedCorrectiveReview,
            [
              "iRNo",
              "code",
              "revisionCode",
              "accountablePer",
              "correctiveAction",
              "corTimelineFromDate",
              "corTimelineToDate",
              "notes",
            ],
            this.correctiveNotesReview
          ),

          // RCAPreventive: mapAndFilter(
          //   this.selectedPreventiveReview,
          //   [
          //     "iRNo",
          //     "code",
          //     "revisionCode",
          //     "responsiblePer",
          //     "preventiveMeasure",
          //     "preTimelineFromDate",
          //     "preTimelineToDate",
          //     "notes",
          //   ],
          //   this.preventiveNotesReview
          // ),

          RCANotSelProblemStatement: this.unselectedProblemStatementsReview.map(
            ({ code, iRNo, problemCode, description }) => ({
              code,
              iRNo,
              problemCode,
              description,
            })
          ),

          RCANotSelWhyItems: this.unselectedWhyItemsReview.map(
            ({ iRNo, problemName, problemCode, code, description }) => ({
              iRNo,
              problemName,
              problemCode,
              code,
              description,
            })
          ),

          RCANotSelActionableItems: this.unselectedActionableItemsReview.map(
            ({ iRNo, code, actionable, domain }) => ({
              iRNo,
              code,
              actionable,
              domain,
            })
          ),

          RCANotSelCorrective: this.unselectedCorrectiveItemsReview.map(
            ({
              code,
              iRNo,
              accountablePer,
              correctiveAction,
              corTimelineFromDate,
              corTimelineToDate,
            }) => ({
              code,
              iRNo,
              accountablePer,
              correctiveAction,
              corTimelineFromDate,
              corTimelineToDate,
            })
          ),

          // RCANotSelPreventive: this.unselectedPreventiveItemsReview.map(
          //   ({
          //     code,
          //     iRNo,
          //     responsiblePer,
          //     preventiveMeasure,
          //     preTimelineFromDate,
          //     preTimelineToDate,
          //   }) => ({
          //     code,
          //     iRNo,
          //     responsiblePer,
          //     preventiveMeasure,
          //     preTimelineFromDate,
          //     preTimelineToDate,
          //   })
          // ),
        };

        this.onCancelEditReviewRCADetails();
        const response = await this.$store.dispatch(
          "ApplyStore/AddDisApprovedRCAReturn",
          data
        );

        this.$q.notify({
          color: "green-8",
          position: "top",
          message: "RETURN DISAPPROVED RCA HAS BEEN SUCCESSFULLY SUBMITTED",
          icon: "check",
          iconColor: "white",
          timeout: 1000,
          progress: true,
        });

        setTimeout(() => {
          this.getInc();
          this.waitingReturnRevised = false;
        }, 3000);
      } catch (error) {
        console.error("Error creating action items:", error);
      }
    },

    onCancelEditReviewRCADetails() {
      this.setReviewRCAReturn = false;
    },

    ///////////////////////////////////////////////////////////////////// APPROVED REVIEW//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async submitRCAApprovedFRW(IRNo) {
      this.setReviewDisplay = false;
      try {
        const pickFields = (items, fields) => {
          if (!Array.isArray(items)) {
            console.warn("pickFields: 'items' is not an array:", items);
            return [];
          }

          if (!Array.isArray(fields)) {
            console.warn("pickFields: 'fields' is not an array:", fields);
            return [];
          }

          return items.map(item =>
            Object.fromEntries(
              fields.map(field => [field, item?.[field]])
            )
          );
        };

        const payload = {
          IRNo: IRNo,
          NewConclusion: this.newConclusion || "",

          RCAProblemStatement: pickFields(
            this.IRRCAReturnReviewDetailss.RCAProblemStatementReviewLogsReturn,
            ["iRNo", "problemCode", "code", "description"]
          ),

          RCAWhy: pickFields(
            this.IRRCAReturnReviewDetailss.RCAWhyReviewLogReturn,
            ["iRNo", "problemName", "problemCode", "code", "description"]
          ),

          RCAActionable: pickFields(
            this.IRRCAReturnReviewDetailss.RCAActionableReviewLogReturn,
            ["iRNo", "code", "actionable", "domain"]
          ),

          RCACorrective: pickFields(
            this.IRRCAReturnReviewDetailss.RCACorrectiveReviewLogReturn,
            [
              "iRNo",
              "code",
              "accountablePer",
              "correctiveAction",
              "corTimelineFromDate",
              "corTimelineToDate",
            ]
          ),
        };
        this.waitingforApproved = true;

        await this.$store.dispatch("ApplyStore/AddApprovedRCAReturn", payload);
        this.$q.notify({
          color: "green-8",
          position: "top",
          message: "SUCCESS RCA APPROVED",
          icon: "check",
          iconColor: "white",
          timeout: 3000,
          progress: true,
        });

        this.viewRCAApprovedDetailsForm(IRNo);

        setTimeout(() => {
          this.getInc();
          this.waitingforApproved = false;
          this.setRCAApprovedDetailsFRW = true;
        }, 3000);
      } catch (error) {
        console.error("Error during RCA approval:", error.message || error); // Log the error with more detail
      }
    },

    onCancelRCAApprovedFRW() {
      this.setRCAApprovedDetailsFRW = false;
    },

    ///////////////////////////////////////ACTION ITEMS/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    truncateWords(text, limit) {
      if (!text) return "";
      const words = text.split(" ");
      return words.length > limit
        ? words.slice(0, limit).join(" ") + "..."
        : text;
    },

    FormatTimelineDateFrom(TimelineFromDate) {
      const date = new Date(TimelineFromDate);
      const options = { year: "numeric", month: "long", day: "2-digit" };
      const formattedDate = date
        .toLocaleDateString("en-US", options)
        .toUpperCase()
        .replace(/\s/g, " ");
      return formattedDate;
    },

    FormatTimelineDateTo(TimelineToDate) {
      const date = new Date(TimelineToDate);
      const options = { year: "numeric", month: "long", day: "2-digit" };
      const formattedDate = date
        .toLocaleDateString("en-US", options)
        .toUpperCase()
        .replace(/\s/g, " ");
      return formattedDate;
    },

    async viewActionItem(IRNo) {
      this.loading = true; // show loading
      try {
        const acttab = {
          iRNo: IRNo,
        };
        this.selectedIrNo = IRNo;

        const response = await this.$store.dispatch(
          "ApplyStore/discorrectiveItem",
          acttab
        );
        const returnResponse = await this.$store.dispatch(
          "ApplyStore/disriskItem",
          acttab
        );

        this.actionCorrectiveDetails = this.getcorrective || {};
        this.actionRiskDetails = this.getRiskData || {};
      } catch (error) {
        console.error("Error inserting data:", error);
      } finally {
        this.loading = false; // hide loading no matter what
      }
    },

    async viewActionDetails(IRNo) {
      this.setActionItemDialogs = true;
      this.viewActionItem(IRNo);
      this.viewIReportDetails(IRNo);
      this.selectedIrNo = IRNo;
    },

    async viewIReportDetails(IRNo) {
      try {
        const data = {
          iRNo: IRNo,
        };
        this.selectedIrNo = IRNo;
        const response = await this.$store.dispatch("ApplyStore/disIrp", data);
        this.IRQADetailss = this.getQACon;
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    },

    editActionStatus(Id) {
      this.setActionStatusDialogs = true;
      this.Id = Id;
    },

    editRiskID(Id){
      this.setRiskIDDialogs = true;
      this.Id = Id;
    },

    closeActionStatus() {
      this.setActionStatusDialogs = false;
    },

    async saveCorActionStatus(IRNo) {
      try {
        const payload = {
          Id: this.Id,
          ActionStatus: 2,
        };

        this.setActionStatusDialogs = false;
        this.itemWait = true;
        await this.$store.dispatch("ApplyStore/putActionStatusCor", payload);
        this.closeActionStatus();
        setTimeout(() => {
          this.viewActionItem(IRNo);
          this.itemWait = false;
        }, 1000);
        this.$q.notify({
          color: "green-8",
          position: "top",
          message: "SUCCESS EDITING ACTION ITEMS",
          icon: "check",
          iconColor: "white",
          timeout: 2000,
          progress: true,
        });
      } catch (error) {
        console.error("Error updating data:", error);
      }
    },

    async saveRiskItems(IRNo) {
      try {

        const payload = {
          Id: this.Id,
          ErmID: this.ErmID,
          ProcessID: this.ProcessID,
          ProcessTitle: this.ProcessTitle,
          PolicyOwner: this.PolicyOwner
        };

        this.itemWait = true;
        await this.$store.dispatch("ApplyStore/putActionRisk", payload);
        this.onCloseRiskItems();
        setTimeout(() => {
          this.viewActionItem(IRNo);
          this.itemWait = false;
        }, 1000);
        this.$q.notify({
          color: "green-8",
          position: "top",
          message: "SUCCESS EDITING ACTION ITEMS",
          icon: "check",
          iconColor: "white",
          timeout: 2000,
          progress: true,
        });
      } catch (error) {
        console.error("Error updating data:", error);
      }
    },

    onCloseActionItems() {
      this.setActionItemDialogs = false;
      this.actionitemDetails = [];
    },

    onCloseRiskItems() {
      this.setRiskIDDialogs = false;
      this.ErmID = "";
      this.ProcessID = "";
    },

    ///////////////////////////////////////ACTION PENDING ITEMS/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    editDoneStatus() {
      this.setActionItemDialogs = false;
      this.itemWait = true;
      setTimeout(() => {
        this.getInc();
        this.itemWait = false;
      }, 3000);
    },

    ///////////////////////////////////////ACTION DONE ITEMS/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    editIRQA(IRNo) {
      this.setQADialogs = true;
      this.IrNo = IRNo;
      this.selectedIrNo = IRNo;
    },

    async saveIRQAStatus(IRNo) {
      try {
        this.setQADialogs = false;
        const payload = { IRNo: IRNo, QAStatus: false };
        const response = await this.$store.dispatch(
          "ApplyStore/putqaIR",
          payload
        );
        this.setActionItemDialogs = false;
        this.itemWait = true;
        setTimeout(() => {
          this.getInc();
          this.itemWait = false;
        }, 2000);
        this.$q.notify({
          color: "green-8",
          position: "top",
          message: "SUCCESS CLOSING STATUS",
          icon: "check",
          iconColor: "white",
          timeout: 1000,
          progress: true,
        });
      } catch (error) {
        console.error("Error updating status:", error);
        // Optionally, you can show an error message to the user
      }
    },

    /////////////////////////////////////////////////////////////////////// PENDING REMARKS///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async PendingRemarksTab() {
      try {
        await this.$store.dispatch("ApplyStore/disPendingRemarks");
        this.pendingRemarksDetails = this.getRemarks;
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    },

    cancelPendingRemarks() {
      this.IrNo = "";
      this.setRemarksDialogs = false;
    },

    addPendingRemarks(selectedIrNo, code) {
      this.ActionCode = code;
      this.PendingRemarksDia = true;
      this.IrNo = selectedIrNo;
    },

    onClosePendingRem() {
      this.PendingRemarks = "";
      this.PendingRemarksDia = false;
    },

    validatePendingRemarks() {
      return this.PendingRemarks;
    },

    async savePendingRemarks(IRNo, ActionCode) {
      try {
        if (!this.validatePendingRemarks()) {
          this.$q.notify({
            type: "negative",
            message: "Notes are required",
            position: "top",
            timeout: 1000,
            progress: true,
          });
          return;
        }

        const data = {
          PendingRemarks: this.PendingRemarks,
          IRNo: this.IrNo,
          Code: this.ActionCode,
        };

        this.itemWait = true;
        this.onClosePendingRem();
        await this.$store.dispatch("ApplyStore/AddPendingRemarks", data);
        setTimeout(() => {
          this.PendingRemarksTab();
          this.itemWait = false;
        }, 1000);
        this.$q.notify({
          color: "green-8",
          position: "top",
          message: "SUCCESS CREATING PENDING NOTES",
          icon: "check",
          iconColor: "white",
          timeout: 2000,
          progress: true,
        });
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    },

    getFilteredPendingRemarks(code) {
      if (!code || !Array.isArray(this.pendingRemarksDetails)) {
        return [];
      }

      return this.pendingRemarksDetails.filter((item) => item.code === code);
    },

    /////////////////////////////////////////////////////////////////////// RCA DETAILS ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    onCancelRCADetailsItem() {
      this.setRCADetailsForm = false;
    },

    async viewRCADetailsForm(IRNo) {
      this.setRCADetailsForm = true;
      const data = {
        iRNo: IRNo,
      };
      const response = await this.$store.dispatch(
        "ApplyStore/disRCAdetails",
        data
      );
      this.IRRCADetailss = this.getRCA;
    },

    FormatRCADate(SubjectDate) {
      const date = new Date(SubjectDate);
      const options = { year: "numeric", month: "long", day: "2-digit" };
      const formattedDate = date
        .toLocaleDateString("en-US", options)
        .toUpperCase()
        .replace(/\s/g, " ");
      return formattedDate;
    },

    FormatRCATime(SubjectTime) {
      const date = new Date(SubjectTime);
      let hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";

      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      const formattedTime = `${hours}:${minutes} ${ampm}`;

      return formattedTime;
    },

    /////////////////////////////////////////////////////////////////////// QA STATUS DETAILS ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    updateRejectStatus(IRNo){
      this.setRejectStatus = true;
      this.selectedIrNo = IRNo;
    },

    onRejectStatusCancel(){
      this.rejectNote = "";
    },

    async submitRejectStatus(selectedIrNo){
      this.setRejectStatus = false;
      try {
        const data = {
          IRNo: this.selectedIrNo,
          RejectNote: this.rejectNote,
        }
        this.onRejectStatusCancel();
        await this.$store.dispatch("ApplyStore/AddRejectStatus", data);
        setTimeout(() => {
          this.getInc();
        }, 1000);
        this.$q.notify({
          color: "green-8",
          position: "top",
          message: "SUCCESS REJECTING IR",
          icon: "check",
          iconColor: "white",
          timeout: 2000,
          progress: true,
        });
      } catch (error) {
        console.error("Error rejecting data:", error);
      }
    }
  },
};
</script>
