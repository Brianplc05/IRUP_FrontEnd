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
          color="accent"
          icon="description"
          class="bg-accent text-black text-bold text-center shadow-5"
          style="border-radius: 20px; width: 125px"
          ><q-tooltip class="bg-info text-white">
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

    <template v-slot:body-cell-subject="props">
      <q-td :props="props">
        <span
          v-if="!props.row.subjectSpecificExam"
          class="text-uppercase text-bold text-center"
        >
          {{ props.row.subjectName }}
        </span>
        <span
          v-if="props.row.subjectSpecificExam"
          class="text-uppercase text-bold text-center"
        >
          {{ props.row.subjectName }} - {{ props.row.subjectSpecificExam }}
        </span>
      </q-td>
    </template>

    <template v-slot:body-cell-deptInvolved="props">
      <td>
        <q-btn
          flat
          rounded
          push
          :ripple="{ center: true }"
          :disable="props.row.primaryDept !== null"
          label="Select Department"
          @click="selectdepartment(props.row.iRNo)"
          :class="{
            'bg-positive': props.row.primaryDept === null,
            'bg-dark': props.row.primaryDept !== null,
          }"
          class="text-white text-center shadow-5"
          style="border-radius: 20px; width: 195px"
        >
          <q-tooltip class="bg-info text-white">
            Identify the department that was involved.
          </q-tooltip>
        </q-btn>

        <q-dialog v-model="setActionreceived" persistent>
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
                  @click="onActionCancel"
                />

                <q-btn
                  flat
                  rounded
                  push
                  label="Save"
                  class="buttonSaveDesign bg-accent text-black"
                  @click="submitActionEmail"
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

    <template v-slot:body-cell-actionitem="props">

      <q-td>
        <q-btn
          flat
          rounded
          push
          :ripple="{ center: true }"
          label="In Progress"
          style="border-radius: 20px; width: 195px"
          v-if="
            props.row.actionSubStatus === 1 && props.row.primaryDept !== null
          "
          class="bg-orange text-black text-bold text-center shadow-5"
        >
          <q-tooltip class="bg-info text-white">
            Waiting for Action Items
          </q-tooltip>
        </q-btn>

        <q-btn
          flat
          rounded
          push
          :ripple="{ center: true }"
          label="Submitted for Review"
          @click="editReviewAction(props.row.iRNo)"
          style="border-radius: 20px; width: 195px; background-color: #f1c40f"
          v-if="
            props.row.actionSubStatus === 2 && props.row.primaryDept !== null
          "
          class=" text-black text-bold text-center shadow-5"
        />

        <q-btn
          flat
          rounded
          push
          :ripple="{ center: true }"
          label="Declined"
          style="border-radius: 20px; width: 195px"
          :disable="props.row.actionSubStatus === 3 && props.row.primaryDept !== null"
          v-if="
            props.row.actionSubStatus === 3 && props.row.primaryDept !== null
          "
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
          @click="editRevisionAction(props.row.iRNo)"
          style="border-radius: 20px; width: 195px; background-color: #f1c40f"
          v-if="
            props.row.actionSubStatus === 4 && props.row.primaryDept !== null
          "
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
          v-if="
            props.row.actionSubStatus === 5 && props.row.primaryDept !== null
          "
          class="bg-dark text-white text-bold text-center shadow-5"
        />

        <!-- ////////////////////////////////////////////////////////////////////////// FOR REVIEW /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->

        <q-dialog maximized v-model="setActionReviewDialog" persistent>
          <div class="QAModuleDiag">
            <q-card class="contentFormQAModule">
              <q-card-section class="q-mb-xs row items-center justify-between">
                <div>
                  <div
                    class="text-secondary text-weight-bold"
                    style="font-size: 25px; color: #002b5c"
                  >
                    Incident Report: Action Item Remarks
                  </div>
                </div>

                <q-btn
                  flat
                  icon="close"
                  style="
                    color: #003566;
                    background-color: rgba(22, 110, 204, 0.1);
                  "
                  @click="cancelDispprovedActionReview()"
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
                        class="text-primary text-subtitle1 text-weight-bold q-mb-sm"
                      >
                        Action Item Details
                      </div>
                      <div class="text-body2 text-grey-7 q-mb-sm">
                        This section outlines the action items implemented by
                        the department to address and mitigate the incident.
                      </div>
                      <q-separator class="formseparatorYellow" />

                      <div class="q-mt-md" style="margin: 20px">
                        <div
                          class="q-pa-sm q-mb-md"
                          v-for="(item, index) in ActionQADetails"
                          :key="index"
                        >
                          <div class="row q-col-gutter-md">
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
                                  item.actionItem || 'No Data Available'
                                "
                                disable
                              />
                            </div>

                            <div class="col-2">
                              <div
                                class="text-weight-bold text-primary q-mb-xs"
                              >
                                Timeline From
                              </div>
                              <q-input
                                rounded
                                outlined
                                :model-value="
                                  FormatDateIR(item.timelineFromDate) ||
                                  'No Data Available'
                                "
                                disable
                              />
                            </div>

                            <div class="col-2">
                              <div
                                class="text-weight-bold text-primary q-mb-xs"
                              >
                                Timeline To
                              </div>
                              <q-input
                                rounded
                                outlined
                                :model-value="
                                  FormatDateIR(item.timelineToDate) ||
                                  'No Data Available'
                                "
                                disable
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </q-card-section>

              <q-card-section
                class="q-mt-md rounded-borders shadow-2 flex column items-center justify-center"
                style="border: 2px solid #ddd; text-align: center"
              >
                <div class="text-primary text-subtitle1 text-weight-bold q-mb-sm">
                  Action Item Note
                </div>
                <div class="text-body2 text-grey-7 q-mb-sm">
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
                    @click="submitActionDisapproved(selectedIrNo)"
                    style="width: 195px"
                  />

                  <q-btn
                    flat
                    rounded
                    push
                    label="APPROVED"
                    class="buttonSaveDesign bg-accent text-black"
                    @click="submitActionReviewApproved(selectedIrNo)"
                    style="width: 195px"
                  />
                </div>
              </q-card-actions>
            </q-card>
          </div>
        </q-dialog>

        <!-- ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->

        <q-dialog maximized v-model="setActionEditReviewDialog" persistent>
          <div class="QAModuleDiag">
            <q-card class="contentFormQAModule">
              <q-card-section class="q-mb-xs row items-center justify-between">
                <div>
                  <div
                    class="text-secondary text-weight-bold"
                    style="font-size: 25px; color: #002b5c"
                  >
                    Action Item Revision Content
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

              <q-card-section class="rounded-borders shadow-2" style="border: 2px solid #03254b;">
                <div class="q-mb-xs row items-center justify-between">
                  <div>
                    <div style="font-size: 18px; color: #333333" >
                      <b>Instruction: </b> Review the proposed action items from the primary
                      department and identify the action that requires correction or <br />
                      adjustment, including any updates to the proposed completion timeline.
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
                      v-model="selectAction"
                      color="secondary"
                      label="SELECT THE CONTENT YOU WANT TO REVISE"
                      true-value="yes"
                      false-value="no"
                      style="color: #003566"
                    />
                  </div>
                </div>

                <q-separator class="formseparatorYellow" />

                <div class="q-ma-md">
                  <div
                    v-for="(item, index) in ActionQADetails"
                    :key="index"
                    class="q-pa-md q-mb-md"
                    style="border: 1px solid #ddd"
                  >
                    <div class="row q-col-gutter-md q-pl-xl">
                      <q-checkbox
                        :model-value="selectedActionItems.map((i) => i.code)"
                        :val="item.code"
                        :disable="selectAction !== 'yes'"
                        @update:model-value="
                          (val) => handleSelectActionItems(val, item)
                        "
                      />

                      <div class="col-7">
                        <q-input
                          autogrow
                          rounded
                          outlined
                          :model-value="item.actionItem || 'No Data Available'"
                          readonly
                          :class="isSelected(item) ? 'bg-red text-white' : ''"
                        />
                      </div>

                      <div class="col-2">
                        <q-input
                          rounded
                          outlined
                          :model-value="
                            FormatDateIR(item.timelineFromDate) ||
                            'No Data Available'
                          "
                          readonly
                          :class="isSelected(item) ? 'bg-red text-white' : ''"
                        />
                      </div>

                      <div class="col-2">
                        <q-input
                          rounded
                          outlined
                          :model-value="
                            FormatDateIR(item.timelineToDate) ||
                            'No Data Available'
                          "
                          readonly
                          :class="isSelected(item) ? 'bg-red text-white' : ''"
                        />
                      </div>
                    </div>

                    <div
                      class="row q-col-gutter-md q-ma-md"
                      v-if="isSelected(item)"
                    >
                      <div class="col-6">
                        <q-input
                          v-model="ActionItemsNote[item.code]"
                          label="Quality Assurance Note"
                          autogrow
                          rounded
                          outlined
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="TimelineFromAction[item.code]"
                          rounded
                          outlined
                          clearable
                          label="Date of the Completion (From)"
                          @click="showDateFromPicker[item.code] = true"
                        >
                          <template v-slot:append>
                            <q-icon
                              name="event"
                              class="cursor-pointer"
                              @click="showDateFromPicker[item.code] = true"
                            />
                          </template>
                        </q-input>
                        <q-dialog v-model="showDateFromPicker[item.code]">
                          <q-card>
                            <q-card-section>
                              <q-date
                                v-model="TimelineFromAction[item.code]"
                                @input="
                                  (date) => updateTimelineFrom(date, item.code)
                                "
                                :options="dateBeforeOrToday"
                              />
                            </q-card-section>
                          </q-card>
                        </q-dialog>
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="TimelineToAction[item.code]"
                          rounded
                          outlined
                          clearable
                          label="Date of the Completion (To)"
                          @click="showDateToPicker[item.code] = true"
                        >
                          <template v-slot:append>
                            <q-icon
                              name="event"
                              class="cursor-pointer"
                              @click="showDateToPicker[item.code] = true"
                            />
                          </template>
                        </q-input>
                        <q-dialog v-model="showDateToPicker[item.code]">
                          <q-card>
                            <q-card-section>
                              <q-date
                                v-model="TimelineToAction[item.code]"
                                @input="
                                  (date) => updateTimelineTo(date, item.code)
                                "
                                :options="dateBeforeOrToday"
                              />
                            </q-card-section>
                          </q-card>
                        </q-dialog>
                      </div>
                    </div>
                  </div>
                </div>
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
                    @click="setActionEditReviewDialog = false"
                  />

                  <q-btn
                    flat
                    rounded
                    push
                    label="SAVE"
                    class="buttonSaveDesign bg-accent text-black"
                    @click="editActionReview(selectedIrNo)"
                  />
                </div>
              </q-card-actions>
            </q-card>
          </div>
        </q-dialog>

        <!-- ////////////////////////////////////////////////////////////////////////// APPROVED FOR REVIEW  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->

        <q-dialog maximized v-model="setActionReviewApprovedDetails" persistent>
          <div class="QAModuleDiag">
            <q-card class="contentFormQAModule">
              <q-card-section class="q-mb-sm row items-center justify-between">
                <div
                  class="text-secondary text-weight-bold"
                  style="font-size: 25px; color: #002b5c"
                >
                  APPROVED ACTION ITEM INFORMATION FORM
                </div>

                <q-btn
                  flat
                  icon="close"
                  style="
                    color: #003566;
                    background-color: rgba(22, 110, 204, 0.1);
                  "
                  @click="cancelApprovedAction()"
                  v-close-popup
                >
                  <q-tooltip class="bg-info text-white"> Close Form </q-tooltip>
                </q-btn>
              </q-card-section>

              <q-card-section style="border: 2px solid #6b7c93">
                <div class="QADes1">
                  <div
                    class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                  >
                    Action Item Details
                  </div>

                  <div class="q-mb-sm" style="font-size: 15px; color: #737373">
                    This section outlines the action items implemented by the
                    department to address and mitigate the incident.
                  </div>

                  <q-separator class="formseparatorYellow" />

                  <div class="q-mx-xl">
                    <div
                      class="q-pa-md"
                      v-for="(item, index) in IRReturnACAPDetailss"
                      :key="index"
                    >
                      <div class="row q-col-gutter-md">
                        <div class="col-8">
                          <div
                            class="text-weight-bold"
                            style="font-size: 15px; color: #03254b"
                          >
                            Action Item Notes
                          </div>
                          <q-input
                            autogrow
                            rounded
                            outlined
                            :model-value="
                              item.actionItem || 'No Data Available'
                            "
                            disable
                          />
                        </div>

                        <div class="col-2">
                          <div
                            class="text-weight-bold"
                            style="font-size: 15px; color: #03254b"
                          >
                            Timeline From
                          </div>

                          <q-input
                            rounded
                            outlined
                            :model-value="
                              FormatDate(item.timelineFromDate) ||
                              'No Data Available'
                            "
                            disable
                          />
                        </div>

                        <div class="col-2">
                          <div
                            class="text-weight-bold"
                            style="font-size: 15px; color: #03254b"
                          >
                            Timeline To
                          </div>

                          <q-input
                            rounded
                            outlined
                            :model-value="
                              FormatDate(item.timelineToDate) ||
                              'No Data Available'
                            "
                            disable
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </q-dialog>

        <!-- ////////////////////////////////////////////////////////////////////////// FOR REVISION /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->

        <q-dialog v-model="setActionRevisionDialog" persistent>
          <q-card class="QAConfirmAction">
            <q-card-section class="q-mb-sm row justify-center">
              <div
                class="text-secondary text-weight-bold text-center"
                style="font-size: 25px; color: #002b5c"
              >
                CONFIRM ACTION ITEM SUBMISSION
              </div>
            </q-card-section>

            <q-separator class="formseparatorBlue" />

            <q-card-section>
              <div class="text-dark text-subtitle1 q-mb-sx text-center">
                Did you receive the revised action items from the primary
                department?
              </div>
            </q-card-section>

            <q-card-section style="display: none">
              <div>Latest Revision Code: {{ latestRevisionActionCode }}</div>
            </q-card-section>

            <div class="row q-gutter-xxl; justify-center">
              <q-btn
                flat
                rounded
                push
                label="NO"
                class="buttonCancelDesign text-info"
                @click="setActionRevisionDialog = false"
              />

              <q-btn
                flat
                rounded
                push
                label="YES"
                class="buttonSaveDesign bg-accent text-black"
                @click="
                  saveActionRevision(selectedIrNo, latestRevisionActionCode)
                "
              />
            </div>
          </q-card>
        </q-dialog>

        <!-- ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->

        <q-dialog maximized v-model="setActionReturnRevisionDialog" persistent>
          <div class="QAModuleDiag">
            <q-card class="contentFormQAModule">
              <q-card-section class="q-mb-xs row items-center justify-between">
                <div>
                  <div
                    class="text-secondary text-weight-bold"
                    style="font-size: 25px; color: #002b5c"
                  >
                    Incident Report: Remarks for Returned Action Items
                  </div>
                </div>

                <q-btn
                  flat
                  icon="close"
                  style="
                    color: #003566;
                    background-color: rgba(22, 110, 204, 0.1);
                  "
                  @click="closeForRevision()"
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
                        class="text-primary text-subtitle1 text-weight-bold q-mb-sm"
                      >
                        Action Item Details
                      </div>
                      <div class="text-body2 text-grey-7 q-mb-sm">
                        This section outlines the action items implemented by
                        the department to address and mitigate the incident.
                      </div>
                      <q-separator class="formseparatorYellow" />

                      <div class="q-mt-md" style="margin: 20px">
                        <div
                          class="q-pa-sm q-mb-md"
                          v-for="(item, index) in IRActionReturnReviewDetailss"
                          :key="index"
                        >
                          <div class="row q-col-gutter-md">
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
                                  item.actionItem || 'No Data Available'
                                "
                                disable
                              />
                            </div>

                            <div class="col-2">
                              <div
                                class="text-weight-bold text-primary q-mb-xs"
                              >
                                Timeline From
                              </div>
                              <q-input
                                rounded
                                outlined
                                :model-value="
                                  FormatDateIR(item.timelineFromDate) ||
                                  'No Data Available'
                                "
                                disable
                              />
                            </div>

                            <div class="col-2">
                              <div
                                class="text-weight-bold text-primary q-mb-xs"
                              >
                                Timeline To
                              </div>
                              <q-input
                                rounded
                                outlined
                                :model-value="
                                  FormatDateIR(item.timelineToDate) ||
                                  'No Data Available'
                                "
                                disable
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </q-card-section>

              <q-card-section
                class="q-mt-md rounded-borders shadow-2 flex column items-center justify-center"
                style="border: 2px solid #ddd; text-align: center"
              >
                <div class="text-primary text-subtitle1 text-weight-bold q-mb-sm">
                  Action Item Note
                </div>
                <div class="text-body2 text-grey-7 q-mb-sm">
                  <b>Direction:</b> This section outlines the action items
                  implemented by the department to address and mitigate the
                  incident.
                </div>

                <q-input
                  outlined
                  v-model="RevisionActionCode"
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
                      submitReviseActionDisapproved(
                        selectedIrNo,
                        RevisionActionCode
                      )
                    "
                  />

                  <q-btn
                    flat
                    rounded
                    push
                    label="APPROVED"
                    class="buttonSaveDesign bg-accent text-black"
                    @click="submitActionRevisionApproved(selectedIrNo)"
                  />
                </div>
              </q-card-actions>
            </q-card>
          </div>
        </q-dialog>

        <!-- ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->

        <q-dialog maximized v-model="setActionEditRevisionDialog" persistent>
          <div class="QAModuleDiag">
            <q-card class="contentFormQAModule">
              <q-card-section class="q-mb-xs row items-center justify-between">
                <div>
                  <div
                    class="text-secondary text-weight-bold"
                    style="font-size: 25px; color: #002b5c"
                  >
                    Revised Action Item Content
                  </div>
                </div>

                <q-btn
                  flat
                  icon="close"
                  style="
                    color: #003566;
                    background-color: rgba(22, 110, 204, 0.1);
                  "
                  @click="closeForRevision()"
                  v-close-popup
                >
                  <q-tooltip class="bg-info text-white"> Close Form </q-tooltip>
                </q-btn>
              </q-card-section>

              <q-card-section class="rounded-borders shadow-2" style="border: 2px solid #03254b;">
                <div class="q-mb-xs row items-center justify-between">
                    <div>
                    <div style="font-size: 18px; color: #333333">
                      <b>Instruction: </b> Review the proposed action items from the primary
                      department and identify the action that requires correction or <br />
                      adjustment, including any updates to the proposed completion timeline.
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
                      v-model="selectReviseAction"
                      color="secondary"
                      label="SELECT THE CONTENT YOU WANT TO REVISE"
                      true-value="yes"
                      false-value="no"
                      style="color: #003566"
                    />
                  </div>
                </div>

                <q-separator class="formseparatorYellow" />

                <div class="q-ma-md">
                  <div
                    v-for="(item, index) in IRActionReturnReviewDetailss"
                    :key="index"
                    class="q-pa-md q-mb-md"
                    style="border: 1px solid #ddd"
                  >
                    <div class="row q-col-gutter-md q-pl-xl">
                      <q-checkbox
                        :model-value="
                          returnSelectedActionItems.map((i) => i.code)
                        "
                        :val="item.code"
                        :disable="selectReviseAction !== 'yes'"
                        @update:model-value="
                          (val) => handleSelectReviseActionItems(val, item)
                        "
                      />

                      <div class="col-7">
                        <q-input
                          autogrow
                          rounded
                          outlined
                          :model-value="item.actionItem || 'No Data Available'"
                          readonly
                          :class="
                            isSelectedRevise(item) ? 'bg-red text-white' : ''
                          "
                        />
                      </div>

                      <div class="col-2">
                        <q-input
                          rounded
                          outlined
                          :model-value="
                            FormatDateIR(item.timelineFromDate) ||
                            'No Data Available'
                          "
                          readonly
                          :class="
                            isSelectedRevise(item) ? 'bg-red text-white' : ''
                          "
                        />
                      </div>

                      <div class="col-2">
                        <q-input
                          rounded
                          outlined
                          :model-value="
                            FormatDateIR(item.timelineToDate) ||
                            'No Data Available'
                          "
                          readonly
                          :class="
                            isSelectedRevise(item) ? 'bg-red text-white' : ''
                          "
                        />
                      </div>
                    </div>

                    <div
                      class="row q-col-gutter-md q-ma-md"
                      v-if="isSelectedRevise(item)"
                    >
                      <div class="col-6">
                        <q-input
                          v-model="ReturnActionItemsNote[item.code]"
                          label="Quality Assurance Note"
                          autogrow
                          rounded
                          outlined
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="ReturnTimelineFromAction[item.code]"
                          rounded
                          outlined
                          clearable
                          label="Date of the Completion (From)"
                          @click="ReturnshowDateFromPicker[item.code] = true"
                        >
                          <template v-slot:append>
                            <q-icon
                              name="event"
                              class="cursor-pointer"
                              @click="
                                ReturnshowDateFromPicker[item.code] = true
                              "
                            />
                          </template>
                        </q-input>
                        <q-dialog v-model="ReturnshowDateFromPicker[item.code]">
                          <q-card>
                            <q-card-section>
                              <q-date
                                v-model="ReturnTimelineFromAction[item.code]"
                                @input="
                                  (date) =>
                                    updateReviseTimelineFrom(date, item.code)
                                "
                                :options="dateBeforeOrToday"
                              />
                            </q-card-section>
                          </q-card>
                        </q-dialog>
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="ReturnTimelineToAction[item.code]"
                          rounded
                          outlined
                          clearable
                          label="Date of the Completion (To)"
                          @click="ReturnshowDateToPicker[item.code] = true"
                        >
                          <template v-slot:append>
                            <q-icon
                              name="event"
                              class="cursor-pointer"
                              @click="ReturnshowDateToPicker[item.code] = true"
                            />
                          </template>
                        </q-input>
                        <q-dialog v-model="ReturnshowDateToPicker[item.code]">
                          <q-card>
                            <q-card-section>
                              <q-date
                                v-model="ReturnTimelineToAction[item.code]"
                                @input="
                                  (date) =>
                                    updateReviseTimelineTo(date, item.code)
                                "
                                :options="dateBeforeOrToday"
                              />
                            </q-card-section>
                          </q-card>
                        </q-dialog>
                      </div>
                    </div>
                  </div>
                </div>
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
                    @click="closeForRevision()"
                  />

                  <q-btn
                    flat
                    rounded
                    push
                    label="SAVE"
                    class="buttonSaveDesign bg-accent text-black"
                    @click="editActionRevise(selectedIrNo)"
                  />
                </div>
              </q-card-actions>
            </q-card>
          </div>
        </q-dialog>

        <!-- ////////////////////////////////////////////////////////////////////////// APPROVED FOR REVISION /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->

        <q-dialog
          maximized
          v-model="setActionRevisionApprovedDetails"
          persistent
        >
          <div class="QAModuleDiag">
            <q-card class="contentFormQAModule">
              <q-card-section class="q-mb-sm row items-center justify-between">
                <div
                  class="text-secondary text-weight-bold"
                  style="font-size: 25px; color: #002b5c"
                >
                  APPROVED ACTION ITEM INFORMATION FORM
                </div>

                <q-btn
                  flat
                  icon="close"
                  style="
                    color: #003566;
                    background-color: rgba(22, 110, 204, 0.1);
                  "
                  @click="onCancelRevisionActionApproved()"
                  v-close-popup
                >
                  <q-tooltip class="bg-info text-white"> Close Form </q-tooltip>
                </q-btn>
              </q-card-section>

              <q-card-section style="border: 2px solid #6b7c93">
                <div class="QADes1">
                  <div
                    class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                  >
                    Action Item Details
                  </div>

                  <div class="q-mb-sm" style="font-size: 15px; color: #737373">
                    This section outlines the action items implemented by the
                    department to address and mitigate the incident.
                  </div>

                  <q-separator class="formseparatorYellow" />

                  <div class="q-mx-xl">
                    <div
                      class="q-pa-md"
                      v-for="(item, index) in IRReturnACAPDetailss"
                      :key="index"
                    >
                      <div class="row q-col-gutter-md">
                        <div class="col-8">
                          <div
                            class="text-weight-bold"
                            style="font-size: 15px; color: #03254b"
                          >
                            Action Item Notes
                          </div>

                          <q-input
                            autogrow
                            rounded
                            outlined
                            :model-value="
                              item.actionItem || 'No Data Available'
                            "
                            disable
                          />
                        </div>

                        <div class="col-2">
                          <div
                            class="text-weight-bold"
                            style="font-size: 15px; color: #03254b"
                          >
                            Timeline From
                          </div>

                          <q-input
                            rounded
                            outlined
                            :model-value="
                              FormatDate(item.timelineFromDate) ||
                              'No Data Available'
                            "
                            disable
                          />
                        </div>

                        <div class="col-2">
                          <div
                            class="text-weight-bold"
                            style="font-size: 15px; color: #03254b"
                          >
                            Timeline To
                          </div>

                          <q-input
                            rounded
                            outlined
                            :model-value="
                              FormatDate(item.timelineToDate) ||
                              'No Data Available'
                            "
                            disable
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>

          <q-card class="QCRCA">
            <q-card-section class="QARCA">
              <div class="row items-center justify-between">
                <div class="QARText">APPROVED ACTION ITEM</div>
                <q-btn
                  style="margin-left: 25px"
                  round
                  push
                  icon="close"
                  class="bg-accent text-black"
                  @click="onCancelRevisionActionApproved()"
                  v-close-popup
                />
              </div>
            </q-card-section>

            <div
              style="
                margin: 16px;
                border: 2px solid #003566;
                height: fit-content;
              "
            >
              <div class="QAaaTitlelist">
                <div class="QATextlist">ACTION ITEM DETAILS CONTENT</div>
              </div>

              <div
                class="col"
                style="
                  border: 2px solid #000;
                  text-align: left;
                  background-color: #fff;
                  padding: 15px;
                "
              >
                <div
                  class="q-pa-md"
                  v-for="(item, index) in IRReturnACAPDetailss"
                  :key="index"
                  style="
                    border: 1px solid #000;
                    border-radius: 5px;
                    padding: 10px;
                    margin: 20px;
                  "
                >
                  <div class="row q-col-gutter-md">
                    <div class="col-8">
                      <strong>Action Items:</strong>
                      <q-input
                        autogrow
                        square
                        outlined
                        :model-value="item.actionItem || 'No Data Available'"
                        readonly
                      />
                    </div>

                    <div class="col-2">
                      <strong>Timeline From:</strong>
                      <q-input
                        square
                        outlined
                        :model-value="
                          FormatDateIR(item.timelineFromDate) ||
                          'No Data Available'
                        "
                        readonly
                      />
                    </div>

                    <div class="col-2">
                      <strong>Timeline To:</strong>
                      <q-input
                        square
                        outlined
                        :model-value="
                          FormatDateIR(item.timelineToDate) ||
                          'No Data Available'
                        "
                        readonly
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </q-card>
        </q-dialog>

        <!-- ////////////////////////////////////////////////////////////////////////// LOADING DETAILS /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->

        <q-dialog v-model="RejectedAction" persistent maximized>
          <div
            class="fullscreen flex flex-center column q-gutter-md"
            style="background-color: rgba(0, 0, 0, 0.85)"
          >
            <q-spinner-ios size="150px" color="white" />

            <div class="text-center text-subtitle1 text-white">
              Returning Rejected Action Items.
              <br />
              <span class="text-italic text-accent">Please wait...</span>
            </div>
          </div>
        </q-dialog>

        <q-dialog v-model="RevisionAPAction" persistent maximized>
          <div
            class="fullscreen flex flex-center column q-gutter-md"
            style="background-color: rgba(0, 0, 0, 0.85)"
          >
            <q-spinner-ios size="150px" color="white" />

            <div class="text-center text-subtitle1 text-white">
              Approved Action Item Information
              <br />
              <span class="text-italic text-accent">Please wait...</span>
            </div>
          </div>
        </q-dialog>
      </q-td>
    </template>

    <template v-slot:body-cell-actionitemscompletion="props">
      <q-td>
        <q-btn
          flat
          rounded
          push
          :disable="
            props.row.qAStatus === false ||
            (props.row.combinedIRActionItems &&
              !props.row.combinedIRActionItems.split(', ').includes('1'))
          "
          v-if="
            props.row.actionSubStatus === 5 &&
            props.row.combinedIRActionItems &&
            props.row.combinedIRActionItems.split(', ').includes('1')
          "
          @click="viewActionItemsforVL(props.row.iRNo)"
          style="border-radius: 20px; width: 195px"
          label="INCOMPLETE"
          class="bg-accent text-black text-bold text-center shadow-5"
        >
        </q-btn>

        <q-btn
          flat
          rounded
          push
          :disable="
            props.row.combinedIRActionItems &&
            !props.row.combinedIRActionItems.split(', ').includes('1')
          "
          v-if="
            props.row.combinedIRActionItems &&
            !props.row.combinedIRActionItems.split(', ').includes('1')
          "
          class="bg-dark text-white text-bold text-center shadow-5"
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
                  Completion Form for Action Items
                </div>

                <q-btn
                  flat
                  icon="close"
                  style="
                    color: #003566;
                    background-color: rgba(22, 110, 204, 0.1);
                  "
                  @click="onCloseActionItemsVL()"
                  v-close-popup
                >
                  <q-tooltip class="bg-info text-white"> Close Form </q-tooltip>
                </q-btn>
              </q-card-section>

              <q-card-section>
                <div class="row q-col-gutter-sm">
                  <div class="col-12 col-sm-3 q-ml-xl">
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
                            autogrow
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

                  <div class="col-12 col-sm-8">
                    <div
                      class="bg-white q-pa-sm"
                      style="border: 2px solid #6b7c93; border-radius: 20px"
                    >
                      <div class="row q-col-gutter-xs q-pa-md">
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
                      <div
                        class="q-pa-md shadow-2"
                        v-for="(actionitems, index) in actionitemDetails"
                        :key="index"
                        style="
                          border: 2px solid #ccc;
                          border-radius: 20px;
                          margin-top: 16px;
                        "
                      >
                        <div class="row justify-between items-start q-mb-sm">
                          <!-- LEFT SIDE -->
                          <div class="column items-start">
                            <div class="q-pa-sm">
                              <div class="text-primary text-center text-subtitle1 text-weight-bold q-mb-xs">
                                Action Item Status
                              </div>

                              <q-btn
                                rounded
                                :disable = "actionitems.accomplishStatus === 1"
                                v-if="actionitems.accomplishStatus === 1"
                                label="Pending"
                                class="bg-red text-white text-bold text-center q-pa-xs q-mt-xs"
                                style="width: 195px"
                              />

                              <q-btn
                                rounded
                                :disable = "actionitems.accomplishStatus === 0"
                                v-if="actionitems.accomplishStatus === 0"
                                label="Completed"
                                class="bg-positive text-white text-bold text-center q-pa-xs q-mt-xs"
                                style="width: 195px"
                              />
                            </div>
                          </div>

                          <!-- RIGHT SIDE -->
                          <div class="column items-start">
                            <div class="q-pa-sm">
                              <div
                                class="text-primary text-center text-subtitle1 text-weight-bold q-mb-xs"
                              >
                                Verification
                              </div>

                              <q-btn
                                flat
                                rounded
                                push
                                v-if="actionitems.itemsActionStatus === 1"
                                @click="editActionStatus(actionitems.id)"
                                label="Pending"
                                style="width: 195px"
                                class="bg-red text-white text-bold text-center shadow-5"
                              />

                              <q-btn
                                flat
                                rounded
                                push
                                v-if="actionitems.itemsActionStatus === 2"
                                :disable="actionitems.itemsActionStatus === 2"
                                label="Done"
                                style="width: 195px"
                                class="bg-positive text-white text-bold text-center shadow-5"
                              />

                              <q-dialog
                                v-model="setActionStatusDialogs"
                                persistent
                              >
                                <q-card class="QARiskGPOP">
                                  <q-card-section
                                    class="q-mb-sm row items-center justify-center"
                                  >
                                    <div
                                      class="text-secondary text-weight-bold"
                                      style="font-size: 25px; color: #002b5c"
                                    >
                                      CONFIRM ACTION STATUS
                                    </div>
                                  </q-card-section>

                                  <q-separator class="formseparatorBlue" />

                                  <q-card-actions
                                    align="center"
                                    class="q-mt-md column items-center"
                                  >
                                    <div
                                      class="q-mb-sm q-mt-sm"
                                      style="font-size: 17px; color: #000000"
                                    >
                                      Are you sure that the corrective/ preventive
                                      was implemented?
                                    </div>


                                    <div class="row q-gutter-xxl; justify-center q-mt-md">
                                      <q-btn
                                        flat
                                        rounded
                                        push
                                        label="NO"
                                        class="buttonCancelDesign text-info"
                                        @click="closeActionStatus"
                                      />

                                      <q-btn
                                        flat
                                        rounded
                                        push
                                        label="YES"
                                        class="buttonSaveDesign bg-accent text-black"
                                        @click="
                                          saveActionStatus(actionitems.iRNo)
                                        "
                                      />
                                    </div>
                                  </q-card-actions>
                                </q-card>
                              </q-dialog>
                            </div>
                          </div>
                        </div>

                        <q-separator class="formseparatorBlue" />

                        <div class="row q-col-gutter-md items-start q-pa-md">
                          <div class="col-8">
                            <div class="text-weight-bold text-primary q-mb-xs">
                              Action Item Notes
                            </div>
                            <q-input
                              autogrow
                              rounded
                              outlined
                              :model-value="
                                actionitems.actionItem || 'No Data Available'
                              "
                              disable
                            />
                          </div>

                          <div class="col-2">
                            <div class="text-weight-bold text-primary q-mb-xs">
                              Timeline From
                            </div>
                            <q-input
                              autogrow
                              rounded
                              outlined
                              :model-value="
                                FormatTimelineDateFrom(
                                  actionitems.timelineFromDate
                                ) || 'No Data Available'
                              "
                              disable
                            />
                          </div>

                          <div class="col-2">
                            <div class="text-weight-bold text-primary q-mb-xs">
                              Timeline To
                            </div>
                            <q-input
                              autogrow
                              rounded
                              outlined
                              :model-value="
                                FormatTimelineDateTo(
                                  actionitems.timelineToDate
                                ) || 'No Data Available'
                              "
                              disable
                            />
                          </div>
                        </div>

                        <div class="q-pa-md">
                          <q-list bordered class="rounded-borders shadow-4">
                            <q-expansion-item
                              expand-icon-toggle
                              expand-separator
                              icon="comment"
                              label="Comments for Pending Action Items"
                              caption="This section provides comments, clarifications, or follow-up notes related to action items that are still awaiting completion or resolution."
                              header-class="bg-warning text-primary text-bold"
                            >
                              <q-card>
                                <q-card-section
                                  style="border: 2px solid #f3f4f7"
                                  align="right"
                                >
                                  <q-btn
                                    flat
                                    rounded
                                    push
                                    :disable="actionitems.itemsActionStatus === 2"
                                    @click="
                                      addPendingRemarks(
                                        selectedIrNo,
                                        actionitems.code
                                      )
                                    "
                                    style="width: 195px"
                                    class="bg-primary text-white text-bold text-center shadow-5"
                                    label="ADD REMARKS"
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

                                      <q-separator class="formseparatorBlue" />

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

                                <q-card-section style="border: 2px solid #fff">
                                  <div
                                    v-if="
                                      getFilteredPendingRemarks(
                                        actionitems.code
                                      ).length
                                    "
                                  >
                                    <div
                                      class="rounded-borders shadow-2 q-pa-md q-ma-md"
                                      style="
                                        border-bottom: 5px solid #03254b;
                                        border-radius: 50px;
                                      "
                                      v-for="(
                                        pendingDet, index
                                      ) in getFilteredPendingRemarks(
                                        actionitems.code
                                      )"
                                      :key="index"
                                    >
                                      <div
                                        class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                                      >
                                        Date Created:
                                      </div>

                                      <div
                                        class="q-mb-sm"
                                        style="font-size: 15px; color: #737373"
                                      >
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
                                        class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                                      >
                                        Remarks Notes:
                                      </div>

                                      <div
                                        class="q-mb-sm"
                                        style="font-size: 15px; color: #737373"
                                      >
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
                                        <i>~ NO FILE ATTACHED ~</i>
                                      </p>
                                    </div>
                                  </div>
                                </q-card-section>
                              </q-card>
                            </q-expansion-item>
                          </q-list>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </q-dialog>

        <q-dialog v-model="setQADialogs" persistent>
          <q-card class="QARiskGVER">
            <q-card-section class="q-mb-sm row items-center justify-center">
              <div
                class="text-secondary text-weight-bold"
                style="font-size: 25px; color: #002b5c"
              >
                CONFIRM ACTION ITEM STATUS
              </div>
            </q-card-section>

            <q-separator class="formseparatorBlue" />

            <q-card-actions align="center" class="q-mt-md column items-center">
              <q-input
                outlined
                v-model="IrNo"
                label="IRNo."
                style="display: none"
              />
              <div
                class="q-mb-sm q-mt-sm"
                style="font-size: 17px; color: #000000"
              >
                Was the corrective action or preventive action implemented?
              </div>

              <div class="row q-gutter-xxl; justify-center q-mt-sm">
                <q-btn
                  flat
                  rounded
                  push
                  label="CLOSE"
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
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-dialog v-model="itemWait" persistent maximized>
          <div
            class="fullscreen flex flex-center column q-gutter-md"
            style="background-color: rgba(0, 0, 0, 0.85)"
          >
            <q-spinner-ios size="150px" color="white" />

            <div class="text-center text-subtitle1 text-white">
              Processing request.
              <br />
              <span class="text-italic text-accent">Please wait...</span>
            </div>
          </div>
        </q-dialog>
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
          class="bg-positive text-white text-bold text-center shadow-3"
          style="border-radius: 20px; width: 125px"
          >OPEN</q-btn
        >
        <q-btn
        flat
          rounded
          push
          :disable="props.row.qAStatus === false"
          v-if="props.row.qAStatus === false"
          class="bg-negative text-white text-bold text-center shadow-3"
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
  },
  data() {
    return {
      IrNo: "",
      iRNo: "",
      selectedIrNo: "",

      IRDialog: false,
      IRQADetailss: [],
      QAStatus: null,

      setActionItems: false,
      showDatePicker: false,
      isLoadingIRDetails: false,
      actionparties: [
        {
          ActionItem: "",
          TimelineFromDate: new Date().toISOString().substr(0, 10),
          TimelineToDate: "",
        },
      ],
      ActionItem: "",
      TimelineFromDate: new Date().toISOString().substr(0, 10),
      TimelineToDate: "",
      showActionDatePicker: false,
      acWait: false,

      setActionItemDialogs: false,
      actionitemDetails: [],
      setActionStatusDialogs: false,
      itemWait: false,
      setQADialogs: false,

      setRemarksDialogs: false,
      pendingRemarksDetails: [],
      PendingRemarksDia: false,
      PendingRemarks: "",

      pdfDisplayDialog: false,
      pdfUrl: null,
      maximizedToggle: null,
      subjectFile: null,
      ApprovedAction: false,

      expandedItem: null,
      selectedCode: null, // Store selected action item code

      setActionreceived: false,
      disDept: [],
      parties: [],
      PrimaryDept: " ",
      rdPWait: null,

      setActionReviewDialog: false,
      ActionQADetails: [],
      newConclusion: "",

      setActionEditReviewDialog: false,
      selectAction: "no",
      selectedActionItems: [],
      ActionItemsNote: {},
      TimelineFromAction: {},
      TimelineToAction: {},
      showDateFromPicker: {},
      showDateToPicker: {},
      RejectedAction: false,

      setActionRevisionDialog: false,
      ActionReturnQADetails: [],
      setActionReturnRevisionDialog: false,
      RevisionActionCode: "",

      IRActionReturnReviewDetailss: [],
      selectReviseAction: "no",
      setActionEditRevisionDialog: false,
      returnSelectedActionItems: [],
      ReturnActionItemsNote: {},
      ReturnTimelineFromAction: {},
      ReturnTimelineToAction: {},
      ReturnshowDateFromPicker: {},
      ReturnshowDateToPicker: {},
      setActionReviewApprovedDetails: false,
      setActionRevisionApprovedDetails: false,
      RevisionAPAction: false,
      IRReturnACAPDetailss: [],
    };
  },

  computed: {
    ...mapGetters({
      getQACon: "ApplyStore/getQACon",
      getActionItem: "ApplyStore/getActionItem",
      getRemarks: "ApplyStore/getRemarks",
      departments: "ApplyStore/departments",
      getQAAction: "ApplyStore/getQAAction",
      getReturnReviewAction: "ApplyStore/getReturnReviewAction",
      getReturnAction: "ApplyStore/getReturnAction",
      getAPAction: "ApplyStore/getAPAction",
    }),

    hasPendingActions() {
      return this.actionitemDetails.some(
        (item) => item.itemsActionStatus === 1
      );
    },

    // filteredPendingRemarks() {
    //   if (!this.selectedCode || !Array.isArray(this.pendingRemarksDetails)) {
    //     return [];
    //   }

    //   return this.pendingRemarksDetails.filter(
    //     (item) => item.code === this.selectedCode
    //   );
    // },

    unselectedActionItems() {
      return this.ActionQADetails.filter(
        (item) => !this.selectedActionItems.some((i) => i.code === item.code)
      ).map((item) => ({
        code: item.code,
        iRNo: item.iRNo,
        actionItem: item.actionItem,
        timelineFromDate: item.timelineFromDate,
        timelineToDate: item.timelineToDate,
      }));
    },

    unselectedReviseActionItems() {
      return this.IRActionReturnReviewDetailss.filter(
        (item) =>
          !this.returnSelectedActionItems.some((i) => i.code === item.code)
      ).map((item) => ({
        code: item.code,
        iRNo: item.iRNo,
        actionItem: item.actionItem,
        timelineFromDate: item.timelineFromDate,
        timelineToDate: item.timelineToDate,
      }));
    },

    latestRevisionActionCode() {
      const logs = this.ActionReturnQADetails;
      if (!logs || logs.length === 0) return null;

      const latestLog = logs.reduce((latest, current) => {
        return new Date(current.dateTimeCreated) >
          new Date(latest.dateTimeCreated)
          ? current
          : latest;
      });

      return latestLog?.revisionActionCode || null;
    },
  },

  created() {
    this.PendingRemarksTab();
    this.getDepartmentEmail();
  },

  methods: {
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

    closepdf() {
      this.pdfDisplayDialog = false;
      this.subjectFile = null;
    },

    /////////////////////////////////////// SELECT DEPARTMENT ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    selectdepartment(IRNo) {
      this.setActionreceived = true;
      this.IrNo = IRNo;
    },

    async getDepartmentEmail(){
      try {
        await this.$store.dispatch("ApplyStore/departmentsEmail");
        this.disDept = this.departments;
      } catch (error) {
        console.error("Error Displaying data:", error);
      }
    },

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

    submitActionEmail() {
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
      this.saveActionEmail();

      setTimeout(() => {
        this.getInc();
        this.rdPWait = false;
      }, 4000);
      this.onActionCancel();
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

    async saveActionEmail() {
      try {
        const qaEmail = {
          IRNo: this.IrNo,
          PrimaryDept: this.PrimaryDept,
          DeptCodeInv: this.parties.map((party) => party.DeptCodeInv),
        };
        this.onActionCancel();
        const response = await this.$store.dispatch(
          "ApplyStore/addActionEmail",
          qaEmail
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

    onActionCancel() {
      this.IrNo = "";
      this.PrimaryDept = "";
      this.parties = [];
      this.setActionreceived = false;
      this.removeParty();
    },

    validateIR() {
      return this.IrNo && this.PrimaryDept && this.parties;
    },

    /////////////////////////////////////// FOR REVIEW  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async viewActionDetails(IRNo) {
      try {
        const data = {
          iRNo: IRNo,
        };
        this.selectedIrNo = IRNo;

        await this.$store.dispatch("ApplyStore/disActionDet", data);
        this.ActionQADetails = this.getQAAction;
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    },

    editReviewAction(IRNo) {
      this.setActionReviewDialog = true;
      this.viewActionDetails(IRNo);
    },

    async submitActionDisapproved(IRNo) {
      try {
        const iRNo = this.selectedIrNo;
        const payload = { IRNo: this.selectedIrNo, CountActionItem: "1" };
        const response = await this.$store.dispatch(
          "ApplyStore/putCountAction",
          payload
        );

        setTimeout(() => {
          this.getInc();
        }, 2000);

        this.$q.notify({
          color: "green-8",
          position: "top",
          message: "SUCCESS COUNT DISAPPROVED ACTION",
          icon: "check",
          iconColor: "white",
          timeout: 1000,
          progress: true,
        });


        this.viewActionDetails(IRNo);
        this.setActionEditReviewDialog = true;
      } catch (error) {
        console.error("Error creating action items:", error);
      }
    },

    getToday() {
      const today = new Date();
      return today.toISOString().split("T")[0];
    },

    isSelected(item) {
      return this.selectedActionItems.some((i) => i.code === item.code);
    },

    handleSelectActionItems(val, item) {
      const { code } = item;

      if (val.includes(code)) {
        if (!this.selectedActionItems.some((i) => i.code === code)) {
          this.selectedActionItems.push(item);
        }
        this.initializeItemData(code);
      } else {
        this.selectedActionItems = this.selectedActionItems.filter(
          (i) => i.code !== code
        );
        this.clearItemData(code);
      }
    },

    initializeItemData(code) {
      // Direct assignment, no need for Vue.set
      if (!this.ActionItemsNote[code]) this.ActionItemsNote[code] = "";
      if (!this.TimelineFromAction[code])
        this.TimelineFromAction[code] = this.getToday();
      if (!this.TimelineToAction[code])
        this.TimelineToAction[code] = this.getToday();
      if (!this.showDateFromPicker[code]) this.showDateFromPicker[code] = false;
      if (!this.showDateToPicker[code]) this.showDateToPicker[code] = false;
    },

    clearItemData(code) {
      // Direct deletion, no need for Vue.delete
      delete this.ActionItemsNote[code];
      delete this.TimelineFromAction[code];
      delete this.TimelineToAction[code];
      delete this.showDateFromPicker[code];
      delete this.showDateToPicker[code];
    },

    updateTimelineFrom(date, code) {
      this.TimelineFromAction[code] = date;
      this.showDatePicker[code] = false;
    },

    updateTimelineTo(date, code) {
      this.TimelineToAction[code] = date;
      this.showDateToPicker[code] = false;
    },

    dateBeforeOrToday(date) {
      const today = new Date();
      const selectedDate = new Date(date);
      return (
        selectedDate.getFullYear() > today.getFullYear() ||
        (selectedDate.getFullYear() === today.getFullYear() &&
          (selectedDate.getMonth() > today.getMonth() ||
            (selectedDate.getMonth() === today.getMonth() &&
              selectedDate.getDate() >= today.getDate())))
      );
    },

    async editActionReview(selectedIrNo) {
      try {
        const mapAndFilter = (items) =>
          items
            .map((item) => ({
              iRNo: selectedIrNo, // using the method parameter
              code: item.code,
              actionItem: item.actionItem || "",
              timelineFromDate: item.timelineFromDate || "",
              timelineToDate: item.timelineToDate || "",
              actionNote: this.ActionItemsNote[item.code] || "",
              timelineFromQA: this.TimelineFromAction[item.code] || "",
              timelineToQA: this.TimelineToAction[item.code] || "",
            }))
            .filter((item) => item.iRNo && item.code); // ensure required fields exist

        const data = {
          IRNo: selectedIrNo,
          QASelectedActionItem: mapAndFilter(this.selectedActionItems),
          QANotSelActionItem: this.unselectedActionItems.map(
            ({ code, iRNo, actionItem, timelineFromDate, timelineToDate }) => ({
              code,
              iRNo,
              actionItem,
              timelineFromDate,
              timelineToDate,
            })
          ),
        };

        this.setActionEditReviewDialog = false;
        this.RejectedAction = true;
        const response = await this.$store.dispatch(
          "ApplyStore/addDisApprovedAction",
          data
        );

        this.$q.notify({
          color: "green-8",
          position: "top",
          message: "SUCCESS DISAPPROVED ACTION",
          icon: "check",
          iconColor: "white",
          timeout: 1000,
          progress: true,
        });

        setTimeout(() => {
          this.getInc();
          this.RejectedAction = false;
          this.setActionReviewDialog = false;
        }, 3000);
      } catch (error) {
        console.error("Error creating action items:", error);
      }
    },

    /////////////////////////////////////// APPROVED FOR REVIEW  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async submitActionReviewApproved(IRNo) {
      try {
        this.RevisionAPAction = true;
        this.setActionReviewApprovedDetails = false;
        const pickFields = (items, fields) =>
          items.map((item) =>
            Object.fromEntries(fields.map((field) => [field, item[field]]))
          );

        const payload = {
          IRNo: IRNo,
          newConclusion: this.newConclusion || "",
          APActionContent: pickFields(this.ActionQADetails, [
            "iRNo",
            "code",
            "actionItem",
            "timelineFromDate",
            "timelineToDate",
          ]),
        };

        await this.$store.dispatch("ApplyStore/AddApprovedAction", payload);

        this.$q.notify({
          color: "green-8",
          position: "top",
          message: "SUCCESS ACTION ITEMS APPROVED",
          icon: "check",
          iconColor: "white",
          timeout: 3000,
          progress: true,
        });

        setTimeout(async () => {
          this.getInc();
          await this.viewRevisionActionApprovedDetails(IRNo);
          this.RevisionAPAction = false;
          this.setActionReviewApprovedDetails = true;
        }, 2000);
      } catch (error) {
        console.error(
          "Error during Action Items approval:",
          error.message || error
        ); // Log the error with more detail
      }
    },

    cancelApprovedAction() {
      this.setActionReviewApprovedDetails = false;
      this.setActionReviewDialog = false;
    },

    /////////////////////////////////////// FOR REVISION  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    closeForRevision() {
      this.setActionRevisionDialog = false;
      this.setActionReturnRevisionDialog = false;
    },

    editRevisionAction(IRNo) {
      this.setActionRevisionDialog = true;
      this.viewReturnActionDetails(IRNo);
    },

    async viewReturnActionDetails(IRNo) {
      try {
        const data = {
          iRNo: IRNo,
        };
        this.selectedIrNo = IRNo;

        await this.$store.dispatch("ApplyStore/disActionReturnDet", data);
        this.ActionReturnQADetails = this.getActionItem;
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    },

    async saveActionRevision(selectedIrNo, latestRevisionActionCode) {
      try {
        this.selectedIrNo;
        this.RevisionActionCode = latestRevisionActionCode;
        this.setActionRevisionDialog = false;
        this.setActionReturnRevisionDialog = true;
        this.viewEditReviewActionDetails(
          selectedIrNo,
          latestRevisionActionCode
        );
      } catch (error) {
        console.error("Error updating status:", error);
      }
    },

    async viewEditReviewActionDetails(IRNo, latestRevisionActionCode) {
      const data = {
        iRNo: IRNo,
        revisionActionCode: latestRevisionActionCode,
      };

      const iRNo = this.selectedIrNo;
      const response = await this.$store.dispatch(
        "ApplyStore/disQARevisionActiondetails",
        data
      );
      this.IRActionReturnReviewDetailss = this.getReturnReviewAction;
    },

    cancelDispprovedActionRevision() {
      this.IrNo = "";
      this.newConclusion = "";
      this.setActionReviewDialog = false;
    },

    async submitReviseActionDisapproved(IRNo, RevisionActionCode) {
      try {
        const payload = { IRNo: this.selectedIrNo, CountActionItem: "1" };
        const iRNo = this.selectedIrNo;

        const response = await this.$store.dispatch(
          "ApplyStore/putCountAction",
          payload
        );

        setTimeout(() => {
          this.getInc();
        }, 2000);

        this.$q.notify({
          color: "green-8",
          position: "top",
          message: "SUCCESS COUNT DISAPPROVED ACTION",
          icon: "check",
          iconColor: "white",
          timeout: 1000,
          progress: true,
        });

        this.viewEditReviewActionDetails(IRNo, RevisionActionCode);
        this.setActionEditRevisionDialog = true;
      } catch (error) {
        console.error("Error creating action items:", error);
      }
    },

    getTodayDate() {
      const today = new Date();
      return today.toISOString().split("T")[0];
    },

    isSelectedRevise(item) {
      return this.returnSelectedActionItems.some((i) => i.code === item.code);
    },

    handleSelectReviseActionItems(val, item) {
      const { code } = item;

      if (val.includes(code)) {
        if (!this.returnSelectedActionItems.some((i) => i.code === code)) {
          this.returnSelectedActionItems.push(item);
        }
        this.initializeItemReviseData(code);
      } else {
        this.returnSelectedActionItems = this.returnSelectedActionItems.filter(
          (i) => i.code !== code
        );
        this.clearReviseItemData(code);
      }
    },

    initializeItemReviseData(code) {
      // Direct assignment, no need for Vue.set
      if (!this.ReturnActionItemsNote[code])
        this.ReturnActionItemsNote[code] = "";
      if (!this.ReturnTimelineFromAction[code])
        this.ReturnTimelineFromAction[code] = this.getToday();
      if (!this.ReturnTimelineToAction[code])
        this.ReturnTimelineToAction[code] = this.getToday();
      if (!this.ReturnshowDateFromPicker[code])
        this.ReturnshowDateFromPicker[code] = false;
      if (!this.ReturnshowDateToPicker[code])
        this.ReturnshowDateToPicker[code] = false;
    },

    clearReviseItemData(code) {
      // Direct deletion, no need for Vue.delete
      delete this.ReturnActionItemsNote[code];
      delete this.ReturnTimelineFromAction[code];
      delete this.ReturnTimelineToAction[code];
      delete this.ReturnshowDateFromPicker[code];
      delete this.ReturnshowDateToPicker[code];
    },

    updateReviseTimelineFrom(date, code) {
      this.ReturnTimelineFromAction[code] = date;
      this.ReturnshowDateFromPicker[code] = false;
    },

    updateReviseTimelineTo(date, code) {
      this.ReturnTimelineToAction[code] = date;
      this.ReturnshowDateToPicker[code] = false;
    },

    async editActionRevise(selectedIrNo) {
      try {
        this.RejectedAction = true;
        this.setActionReturnRevisionDialog = false;
        this.setActionEditRevisionDialog = false;

        const mapAndFilter = (items) =>
          items
            .map((item) => ({
              iRNo: selectedIrNo, // using the method parameter
              code: item.code,
              actionItem: item.actionItem || "",
              timelineFromDate: item.timelineFromDate || "",
              timelineToDate: item.timelineToDate || "",
              actionNote: this.ReturnActionItemsNote[item.code] || "",
              timelineFromQA: this.ReturnTimelineFromAction[item.code] || "",
              timelineToQA: this.ReturnTimelineToAction[item.code] || "",
            }))
            .filter((item) => item.iRNo && item.code); // ensure required fields exist

        const data = {
          IRNo: selectedIrNo,
          ReturnSelectedActionItem: mapAndFilter(
            this.returnSelectedActionItems
          ),
          ReturnNotSelActionItem: this.unselectedReviseActionItems.map(
            ({ code, iRNo, actionItem, timelineFromDate, timelineToDate }) => ({
              code,
              iRNo,
              actionItem,
              timelineFromDate,
              timelineToDate,
            })
          ),
        };

        const response = await this.$store.dispatch(
          "ApplyStore/addDisApprovedReturnAction",
          data
        );

        this.$q.notify({
          color: "green-8",
          position: "top",
          message: "SUCCESS DISAPPROVED ACTION",
          icon: "check",
          iconColor: "white",
          timeout: 1000,
          progress: true,
        });

        setTimeout(() => {
          this.getInc();
          this.RejectedAction = false;
        }, 2000);
      } catch (error) {
        console.error("Error creating action items:", error);
      }
    },

    /////////////////////////////////////// APPROVED FOR REVISION  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async submitActionRevisionApproved(IRNo) {
      try {
        this.RevisionAPAction = true;
        this.setActionRevisionApprovedDetails = false;
        const pickFields = (items, fields) =>
          items.map((item) =>
            Object.fromEntries(fields.map((field) => [field, item[field]]))
          );

        const payload = {
          IRNo: IRNo,
          newConclusion: this.newConclusion || "",
          APReturnActionContent: pickFields(this.IRActionReturnReviewDetailss, [
            "iRNo",
            "code",
            "actionItem",
            "timelineFromDate",
            "timelineToDate",
          ]),
        };

        await this.$store.dispatch(
          "ApplyStore/AddApprovedActionReturn",
          payload
        );

        this.$q.notify({
          color: "green-8",
          position: "top",
          message: "SUCCESS ACTION ITEMS APPROVED",
          icon: "check",
          iconColor: "white",
          timeout: 3000,
          progress: true,
        });

        setTimeout(async () => {
          this.getInc();
          await this.viewRevisionActionApprovedDetails(IRNo);
          this.RevisionAPAction = false;
          this.setActionRevisionApprovedDetails = true;
        }, 2000);
      } catch (error) {
        console.error(
          "Error during Action Items approval:",
          error.message || error
        ); // Log the error with more detail
      }
    },

    onCancelRevisionActionApproved() {
      this.setActionRevisionApprovedDetails = false;
      this.setActionReturnRevisionDialog = false;
      this.setActionRevisionDialog = false;
    },

    async viewRevisionActionApprovedDetails(IRNo) {
      const data = {
        iRNo: IRNo,
      };
      const response = await this.$store.dispatch(
        "ApplyStore/disActionApprovedReturn",
        data
      );
      this.IRReturnACAPDetailss = this.getReturnAction;
    },

    ///////////////////////////////////////ACTION ITEMS/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    updateSubjectDate(date) {
      this.SubjectDate = date.toISOString().split("T")[0];
      this.showActionDatePicker = false;
    },

    dateAfterOrToday(date) {
      const today = new Date();
      const selectedDate = new Date(date);
      return (
        selectedDate.getFullYear() > today.getFullYear() ||
        (selectedDate.getFullYear() === today.getFullYear() &&
          (selectedDate.getMonth() > today.getMonth() ||
            (selectedDate.getMonth() === today.getMonth() &&
              selectedDate.getDate() >= today.getDate())))
      );
    },

    editActionItem(IRNo) {
      (this.setActionItems = true), (this.IrNo = IRNo);
    },

    addActionItem() {
      this.actionparties.push({
        ActionItem: "",
        TimelineFromDate: new Date().toISOString().substr(0, 10),
        TimelineToDate: "",
      });
    },

    removeActionItem(index) {
      this.actionparties.splice(index, 1);
    },

    onCancelItemAction() {
      this.IrNo = "";
      this.actionparties = [];
      this.setActionItems = false;
    },

    validateActionItem() {
      return this.actionparties.every(
        (party) => party.ActionItem && party.TimelineToDate
      );
    },

    async saveActionItemEmail(IRNo) {
      try {
        if (!this.validateActionItem()) {
          this.$q.notify({
            color: "negative",
            position: "center",
            message: "REQUIRED ALL FIELDS",
            icon: "report_problem",
            iconColor: "white",
            timeout: 2000,
            progress: true,
          });
          return;
        }
        // Submit approved RCA email
        this.acWait = true;
        await this.submitActionItemDataEmail(IRNo);

        // Reset form and get updated incidents
        setTimeout(() => {
          this.getInc();
          this.acWait = false;
        }, 2000);

        // Success notification
        this.$q.notify({
          color: "green-8",
          position: "top",
          message: "SUCCESS ACTION ITEMS",
          icon: "check",
          iconColor: "white",
          timeout: 3000,
          progress: true,
        });
      } catch (error) {
        console.error("Error creating action items:", error);
      }
    },

    async submitActionItemDataEmail(IRNo) {
      try {
        const payload = {
          IRNo: this.IrNo,
          ActionItem: this.actionparties.map((party) => party.ActionItem),
          TimelineFromDate: this.actionparties.map(
            (party) => party.TimelineFromDate
          ),
          TimelineToDate: this.actionparties.map(
            (party) => party.TimelineToDate
          ),
        };
        this.onCancelItemAction();
        await this.$store.dispatch("ApplyStore/addActionItemVL", payload);
      } catch (error) {
        console.error("Error creating action items:", error);
      }
    },

    ///////////////////////////////////////////////////ACTION ITEMS//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    truncateWords(text, limit) {
      if (!text) return "";
      const words = text.split(" ");
      return words.length > limit
        ? words.slice(0, limit).join(" ") + "..."
        : text;
    },

    toggleExpansion(index, code) {
      if (this.expandedItem === index) {
        this.expandedItem = null;
        this.selectedCode = null;
      } else {
        this.expandedItem = index;
        this.selectedCode = code; // Store selected code for filtering
      }
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

    onCloseActionItemsVL() {
      this.setActionItemDialogs = false;
      this.IRReturnACAPDetailss = [];
    },

    async viewActionItemsforVL(IRNo) {
      this.setActionItemDialogs = true;
      this.viewActionItemVLDetails(IRNo);
      this.viewIReportAction(IRNo);
      this.selectedIrNo = IRNo;
    },

    async viewIReportAction(IRNo) {
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

    ///////////////////////////////////////ACTION DONE ITEMS/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    editIRQA(IRNo) {
      this.setQADialogs = true;
      this.IrNo = IRNo;
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

    ///////////////////////////////////////ACTION PENDING ITEMS/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    editDoneStatus() {
      this.setActionItemDialogs = false;
      this.itemWait = true;
      setTimeout(() => {
        this.getInc();
        this.itemWait = false;
      }, 3000);
    },

    ///////////////////////////////////////////////////ACTION ITEMS VERIFICATION //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async viewActionItemVLDetails(IRNo) {
      try {
        const acttab = {
          iRNo: IRNo,
        };
        await this.$store.dispatch("ApplyStore/disActionApproved", acttab);
        this.actionitemDetails = this.getAPAction;
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    },

    editActionStatus(Id) {
      this.setActionStatusDialogs = true;
      this.Id = Id;
    },

    closeActionStatus() {
      this.setActionStatusDialogs = false;
    },

    async saveActionStatus(IRNo) {
      try {
        this.itemWait = true;
        this.setActionStatusDialogs = false;

        const payload = {
          Id: this.Id,
          ActionStatus: 2,
        };

        await this.$store.dispatch("ApplyStore/putActionVLStatus", payload);
        this.closeActionStatus();

        setTimeout(() => {
          this.viewActionItemVLDetails(IRNo);
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

    getFilteredPendingRemarks(code) {
      if (!code || !Array.isArray(this.pendingRemarksDetails)) {
        return [];
      }

      return this.pendingRemarksDetails.filter((item) => item.code === code);
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

    async savePendingRemarks(IRNo) {
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
          this.PendingRemarksTab(IRNo);
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
  },
};
</script>
