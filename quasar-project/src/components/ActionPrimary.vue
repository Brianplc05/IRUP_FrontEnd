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
      <q-td :props="props">
        <span
          v-if="props.row.riskGrading === 1"
          class="text-bold text-center text-uppercase q-pa-sm"
          style="background-color: #c6e0b3;"
        >
          VERY LOW RISK
        </span>

        <span
          v-if="props.row.riskGrading === 2"
          class="text-bold text-center text-uppercase q-pa-sm"
          style="background-color: #92d14f;"
        >
          LOW RISK
        </span>
      </q-td>
    </template>

    <template v-slot:body-cell-actionitem="props">
      <q-td>
        <q-btn
          flat
          rounded
          push
          :disable="[2, 3, 4, 5].includes(props.row.actionSubStatus)"
          v-if="props.row.actionSubStatus === 1"
          @click="editActionItem(props.row.iRNo)"
          :ripple="{ center: true }"
          icon="lightbulb"
          class="bg-positive text-black text-center shadow-5"
          style="border-radius: 20px; width: 125px"
        >
          <q-tooltip class="bg-info text-white">
            Creating Action Items for the Incident Report
          </q-tooltip>
        </q-btn>

        <q-btn
          flat
          rounded
          push
          :disable="[2, 3, 4, 5].includes(props.row.actionSubStatus)"
          v-if="[2, 3, 4, 5].includes(props.row.actionSubStatus)"
          :ripple="{ center: true }"
          icon="lightbulb"
          class="bg-dark text-white text-center shadow-5"
          style="border-radius: 20px; width: 125px"
        />

        <q-dialog maximized v-model="setActionItems" persistent>
          <div class="QADialog">
            <q-card class="contentFormAction">
              <q-card-section class="q-mb-xs row items-center justify-between">
                <div>
                  <div
                    class="text-secondary text-weight-bold"
                    style="font-size: 25px; color: #002b5c"
                  >
                    Incident Report: Action Item Creation
                  </div>
                  <div style="font-size: 18px; color: #333333" class="text-bold">
                    Instruction: Identify and list the immediate corrective actions that can be implemented to address the incident.
                  </div>
                </div>

                <q-btn
                  flat
                  icon="close"
                  style="
                    color: #003566;
                    background-color: rgba(22, 110, 204, 0.1);
                  "
                  @click="setActionItems = false"
                  v-close-popup
                >
                  <q-tooltip class="bg-info text-white"> Close Form </q-tooltip>
                </q-btn>
              </q-card-section>

              <q-item-section style="padding: 20px; border: 2px solid #6b7c93">
                <q-item-section
                  class="q-mb-xs rounded-borders"
                  style="
                    background-color: rgba(22, 110, 204, 0.1);
                    border: 2px solid #166ecc;
                  "
                >
                  <q-input
                    outlined
                    v-model="IrNo"
                    label="IRNo."
                    style="display: none"
                  />
                  <div class="QARTGTestlist">
                    <span class="text-primary text-weight-bold">
                      Add actions
                    </span>

                    <q-btn
                      class="text-primary q-ml-auto"
                      flat
                      round
                      dense
                      icon="add"
                      @click="addActionItem"
                    />
                  </div>
                </q-item-section>

                <div
                  v-for="(party, index) in actionparties"
                  :key="index"
                  style="
                    margin-top: 5px;
                    margin-bottom: 5px;
                    display: flex;
                    align-items: center;
                    padding: 5px;
                  "
                >
                  <q-input
                    v-model="party.ActionItem"
                    label="Action"
                    rounded
                    outlined
                    autogrow
                    style="width: 70%"
                  />

                  <q-input
                    v-model="party.TimelineFromDate"
                    rounded
                    outlined
                    label="Timeline From"
                    style="width: 20%; margin-left: 15px; margin-right: 10px"
                    @click="showActionDatePickerFrom = true"
                  >
                    <template v-slot:append>
                      <q-icon
                        name="event"
                        class="cursor-pointer"
                        @click="showActionDatePickerFrom = true"
                      />
                    </template>

                    <q-dialog v-model="showActionDatePickerFrom">
                      <q-card>
                        <q-card-section>
                          <q-date
                            v-model="party.TimelineFromDate"
                            @input="updateSubjectDateFrom"
                            :options="dateAfterOrSubjectDate"
                          />
                        </q-card-section>
                      </q-card>
                    </q-dialog>
                  </q-input>

                  <q-input
                    v-model="party.TimelineToDate"
                    rounded
                    outlined
                    label="Timeline To"
                    style="width: 20%; margin-left: 5px; margin-right: 5px"
                    @click="showActionDatePickerTo = true"
                  >
                    <template v-slot:append>
                      <q-icon
                        name="event"
                        class="cursor-pointer"
                        @click="showActionDatePickerTo = true"
                      />
                    </template>

                    <q-dialog v-model="showActionDatePickerTo">
                      <q-card>
                        <q-card-section>
                          <q-date
                            landscape
                            v-model="party.TimelineToDate"
                            @input="updateSubjectDateTo"
                            :options="dateAfterOrSubjectDate"
                          />
                        </q-card-section>
                      </q-card>
                    </q-dialog>
                  </q-input>

                  <q-btn
                    rounded
                    outlined
                    @click="removeActionItem(index)"
                    color="negative"
                    icon="remove_circle"
                    class="q-ml-md"
                    style="margin-right: 15px"
                    size="sm"
                  />
                </div>
              </q-item-section>

              <q-card-actions align="center" class="q-mt-xs column items-center">
                <div class="row q-gutter-xl; justify-center">
                  <q-btn
                    flat
                    rounded
                    push
                    label="Cancel"
                    class="buttonCancelDesign text-info"
                    @click="onCancelItemAction"
                    style="width: 195px"
                  />

                  <q-btn
                    flat
                    rounded
                    push
                    label="Save"
                    class="buttonSaveDesign bg-accent text-black"
                    @click="submitActionItemDataEmail()"
                    style="width: 195px"
                  />
                </div>
              </q-card-actions>
            </q-card>
          </div>
        </q-dialog>

        <!-- ////////////////////////////////////////////////////////////////////////// LOADING /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->

        <q-dialog v-model="ActionLoadingItem" persistent maximized>
          <div
            class="fullscreen flex flex-center column q-gutter-md"
            style="background-color: rgba(0, 0, 0, 0.85)"
          >
            <q-spinner-ios size="150px" color="white" />

            <div class="text-center text-subtitle1 text-white">
              Submitting the Action Items
              <br />
              <span class="text-italic text-accent">Please wait...</span>
            </div>
          </div>
        </q-dialog>
      </q-td>
    </template>

    <template v-slot:body-cell-actiondetails="props">
      <q-td>
        <q-btn
          flat
          rounded
          push
          :ripple="{ center: true }"
          label="SUBMITTED"
          style="border-radius: 20px; width: 195px"
          v-if="props.row.actionSubStatus === 2"
          @click="viewActionItemVLDetails(props.row.iRNo)"
          class="bg-orange text-black text-bold text-center shadow-5"
        />

        <q-btn
          flat
          rounded
          push
          :ripple="{ center: true }"
          label="RETURNED DECLINED"
          style="border-radius: 20px; width: 195px"
          v-if="props.row.actionSubStatus === 3"
          @click="viewActionItemVLDetails(props.row.iRNo)"
          class="bg-accent text-black text-bold text-center shadow-5"
        />

        <q-btn
          flat
          rounded
          push
          :ripple="{ center: true }"
          label="SUBMITTED FOR REVISED"
          style="border-radius: 20px; width: 195px"
          v-if="props.row.actionSubStatus === 4"
          @click="viewActionItemVLDetails(props.row.iRNo)"
          class="bg-accent text-black text-bold text-center shadow-5"
        />

        <q-btn
          flat
          rounded
          push
          v-if="props.row.actionSubStatus === 5"
          @click="viewApprovedAction(props.row.iRNo)"
          :ripple="{ center: true }"
          label="APPROVED"
          style="border-radius: 20px; width: 195px"
          class="bg-positive text-black text-bold text-center shadow-5"
        />

        <q-dialog maximized v-model="setActionItemDialogs" persistent>
          <div class="QADialogAction">
            <q-card class="contentFormAction">
              <q-card-section class="q-mb-sm row items-center justify-between">
                <div
                  class="text-secondary text-weight-bold"
                  style="font-size: 25px; color: #002b5c"
                >
                  ACTION ITEM INFORMATION FORM
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
                <div class="row q-col-gutter-lg q-ma-xs">
                  <div
                    class="col-9 bg-white rounded-borders q-pa-smd"
                    style="border: 2px solid #6b7c93; border-radius: 40px"
                  >
                    <div>
                      <div
                        class="text-info text-subtitle1 text-weight-bold q-mb-sm"
                      >
                        Problem Background
                      </div>

                      <div class="text-body2 text-grey-7 q-mb-sm">
                        This section contains essential details regarding
                        the incident, including the date, time, location,
                        individuals involved, and the nature of the
                        incident.
                      </div>

                      <q-separator class="formseparatorYellow q-mr-md" />

                      <div class="row q-col-gutter-xs q-pa-md">
                        <div class="col-4">
                              <div
                                class="text-weight-bold text-primary q-mb-xs"
                              >
                                Date of the Incident
                              </div>
                              <q-input
                                rounded
                                outlined
                                :model-value="
                                  FormatActionDate(props.row.subjectDate)
                                "
                                disable
                              />
                            </div>

                            <div class="col-4">
                              <div
                                class="text-weight-bold text-primary q-mb-xs"
                              >
                                Time of the Incident
                              </div>
                              <q-input
                                rounded
                                outlined
                                :model-value="
                                  FormatActionTime(props.row.subjectDate)
                                "
                                disable
                              />
                            </div>

                            <div class="col-4">
                              <div
                                class="text-weight-bold text-primary q-mb-xs"
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

                    <div class="q-pt-md">
                      <div
                        class="text-info text-subtitle1 text-weight-bold q-mb-sm"
                      >
                        Immediate Response
                      </div>

                      <div class="text-body2 text-grey-7 q-mb-sm">
                        Action taken by the concerned department or by the
                        Informant to ease the incident.
                      </div>

                      <q-separator class="formseparatorYellow q-mr-md" />

                      <div class="q-pa-sm">
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

                    <div class="q-pt-md">
                      <div
                        class="text-info text-subtitle1 text-weight-bold q-mb-sm"
                      >
                        Action Item Details
                      </div>

                      <div class="text-body2 text-grey-7 q-mb-sm">
                        This section outlines the action items implemented
                        by the department to address and mitigate the
                        incident.
                      </div>

                      <q-separator class="formseparatorYellow q-mr-md" />

                      <div class="row q-col-gutter-xs q-pa-md">
                        <div
                          class="col-12"
                          v-for="(item, index) in actionitemDetails"
                          :key="index"
                        >
                          <div
                            class="q-pa-md q-mb-md rounded-borders"
                            style="border: 1px solid #d0d7e2"
                          >
                            <!-- Action Item Notes -->
                            <div class="text-weight-bold text-primary q-mb-xs">
                              Action Item Notes
                            </div>

                            <q-input
                              autogrow
                              rounded
                              outlined
                              :model-value="item.actionItem || 'No Data Available'"
                              disable
                              input-class="q-pa-md"
                              class="q-mb-md"
                            />

                            <!-- Timeline -->
                            <div class="row q-col-gutter-md">
                              <div class="col-6">
                                <div class="text-weight-bold text-primary q-mb-xs">
                                  Timeline From
                                </div>
                                <q-input
                                  rounded
                                  outlined
                                  :model-value="
                                    FormatActionDate(item.timelineFromDate) || 'No Data Available'
                                  "
                                  disable
                                />
                              </div>

                              <div class="col-6">
                                <div class="text-weight-bold text-primary q-mb-xs">
                                  Timeline To
                                </div>
                                <q-input
                                  rounded
                                  outlined
                                  :model-value="
                                    FormatActionDate(item.timelineToDate) || 'No Data Available'
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

                  <div class="col-3">
                    <q-item-section
                      class="q-pa-xs"
                      style="border: 2px solid #6b7c93"
                    >
                      <div class="QADes1">
                        <div
                          class="text-info text-subtitle1 text-weight-bold q-mb-sm"
                        >
                          Content Action Status
                        </div>

                        <div class="text-body2 text-grey-7 q-mb-sm">
                          Update the status of each action to ensure timely
                          completion and accountability.
                        </div>
                        <q-separator class="formseparatorYellow" />

                        <div
                          v-for="(item, index) in filteredForRevisionItems"
                          :key="index"
                          :style="{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            backgroundColor: ' #e3f2fd',
                            border: '2px solid #003566',
                            padding: '10px',
                            margin: '5px',
                            borderRadius: '10px',
                            opacity: item.disabled ? '0.5' : '1',
                            pointerEvents: item.disabled ? 'none' : 'auto',
                          }"
                          @click="!item.disabled && handleActionClick(item)"
                        >
                          <q-icon
                            name="assignment_add"
                            size="3.5em"
                            class="q-mr-md text-primary"
                          />
                          <div class="column">
                            <div
                              class="text-subtitle1 text-weight-medium text-primary"
                            >
                              {{ item.actionStatus }}
                            </div>
                            <div class="text-caption text-dark">
                              {{ item.revisionActionCode }}
                            </div>
                            <div class="text-caption text-dark">
                              {{ FormatDateIR(item.dateTimeCreated) }}
                            </div>
                          </div>
                        </div>

                        <q-dialog
                          maximized
                          v-model="setActionReviseForm"
                          persistent
                        >
                          <div class="QADialogAction">
                            <q-card class="contentFormAction">
                              <q-card-section
                                class="q-mb-sm row items-center justify-between"
                              >
                                <div>
                                  <div
                                    class="text-secondary text-weight-bold"
                                    style="font-size: 25px; color: #002b5c"
                                  >
                                    Revised Action Item
                                  </div>
                                  <div style="font-size: 18px; color: #333333">
                                    <b>Instruction: </b> In the “Revised Action Item” field, input the corrected action based on QA recommendations.<br/>
                                    This revision will supersede your previous entry and apply only to the specific action item being edited.
                                  </div>
                                </div>

                                <q-btn
                                  flat
                                  icon="close"
                                  style="
                                    color: #003566;
                                    background-color: rgba(22, 110, 204, 0.1);
                                  "
                                  @click="this.setActionReviseForm = false"
                                  v-close-popup
                                >
                                  <q-tooltip class="bg-info text-white">
                                    Close Form
                                  </q-tooltip>
                                </q-btn>
                              </q-card-section>

                              <q-card-section
                                style="
                                  border: 2px solid #6b7c93;
                                  border-radius: 20px;
                                "
                              >
                                <div class="QADes1">
                                  <div class="q-mt-md">
                                    <div
                                      class="q-pa-md q-mb-md"
                                      v-for="item in IRACTReturnDetailss"
                                      :key="item.code"
                                      style="border: 1px solid #ddd"
                                    >
                                      <!-- QA Section -->
                                      <div
                                        class="q-pa-md q-mb-xs"
                                        style="
                                          background-color: #f0f9ff;
                                          border-radius: 8px;
                                          border: 1px solid #2196f3;
                                        "
                                      >
                                        <div class="row items-center q-mb-sm">
                                          <div
                                            class="q-badge bg-blue text-white q-mr-sm"
                                          >
                                            QA
                                          </div>
                                          <div
                                            class="text-primary text-subtitle1 text-weight-bold"
                                          >
                                            Quality Assurance Comment &
                                            Suggestion
                                          </div>
                                        </div>

                                        <div class="row q-col-gutter-xs">
                                          <div class="col-8">
                                            <div
                                              class="text-body2 text-grey-7 q-mb-xs"
                                            >
                                              <b>Note :</b>
                                              {{ item.actionNote }}
                                            </div>
                                          </div>
                                          <div class="col-2">
                                            <div
                                              class="text-body2 text-grey-7 q-mb-xs"
                                            >
                                              <b>Timeline From :</b>
                                              {{
                                                FormatDate(item.timelineFromQA)
                                              }}
                                            </div>
                                          </div>
                                          <div class="col-2">
                                            <div
                                              class="text-body2 text-grey-7 q-mb-xs"
                                            >
                                              <b>Timeline To :</b>
                                              {{
                                                FormatDate(item.timelineToQA)
                                              }}
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <!-- Input Section -->
                                      <q-card-section
                                        class="row q-col-gutter-sm"
                                      >
                                        <div class="col-8">
                                          <q-input
                                            autogrow
                                            rounded
                                            outlined
                                            label="Revised Action Item"
                                            v-model="RevisedAction[item.code]"
                                          />
                                        </div>

                                        <!-- Timeline From -->
                                        <div class="col-2">
                                          <q-input
                                            rounded
                                            outlined
                                            label="Timeline From"
                                            v-model="
                                              RevisedTimelineFromDate[item.code]
                                            "
                                          >
                                            <template v-slot:append>
                                              <q-icon
                                                name="event"
                                                class="cursor-pointer"
                                                @click="
                                                  showActionFromDatePicker[
                                                    item.code
                                                  ] = true
                                                "
                                              />
                                            </template>

                                            <q-dialog
                                              v-model="
                                                showActionFromDatePicker[
                                                  item.code
                                                ]
                                              "
                                            >
                                              <q-card>
                                                <q-card-section>
                                                  <q-date
                                                    v-model="
                                                      RevisedTimelineFromDate[
                                                        item.code
                                                      ]
                                                    "
                                                    @update:model-value="
                                                      (val) =>
                                                        updateTimelineFrom(
                                                          item.code,
                                                          val
                                                        )
                                                    "
                                                    :options="dateAfterOrSubjectDate"
                                                  />
                                                </q-card-section>
                                              </q-card>
                                            </q-dialog>
                                          </q-input>
                                        </div>

                                        <!-- Timeline To -->
                                        <div class="col-2">
                                          <q-input
                                            rounded
                                            outlined
                                            label="Timeline To"
                                            v-model="
                                              RevisedTimelineToDate[item.code]
                                            "
                                          >
                                            <template v-slot:append>
                                              <q-icon
                                                name="event"
                                                class="cursor-pointer"
                                                @click="
                                                  showActionToDatePicker[
                                                    item.code
                                                  ] = true
                                                "
                                              />
                                            </template>

                                            <q-dialog
                                              v-model="
                                                showActionToDatePicker[
                                                  item.code
                                                ]
                                              "
                                            >
                                              <q-card>
                                                <q-card-section>
                                                  <q-date
                                                    landscape
                                                    v-model="
                                                      RevisedTimelineToDate[
                                                        item.code
                                                      ]
                                                    "
                                                    @update:model-value="
                                                      (val) =>
                                                        updateTimelineTo(
                                                          item.code,
                                                          val
                                                        )
                                                    "
                                                    :options="dateAfterOrSubjectDate"
                                                  />
                                                </q-card-section>
                                              </q-card>
                                            </q-dialog>
                                          </q-input>
                                        </div>
                                      </q-card-section>

                                      <!-- Rejected Content Section -->
                                      <div
                                        class="q-pa-md"
                                        style="
                                          background-color: #fff3f3;
                                          border-radius: 8px;
                                          border: 1px solid #e53935;
                                        "
                                      >
                                        <div class="row items-center q-mb-sm">
                                          <div
                                            class="q-badge bg-red text-white q-mr-sm"
                                          >
                                            Rejected
                                          </div>
                                          <div
                                            class="text-negative text-subtitle1 text-weight-bold"
                                          >
                                            Rejected Created Content
                                          </div>
                                        </div>

                                        <div class="row q-col-gutter-xs">
                                          <div class="col-8">
                                            <div
                                              class="text-body2 text-grey-7 q-mb-xs"
                                            >
                                              <b>Action Note :</b>
                                              {{ item.actionItem }}
                                            </div>
                                          </div>
                                          <div class="col-2">
                                            <div
                                              class="text-body2 text-grey-7 q-mb-xs"
                                            >
                                              <b>Timeline From :</b>
                                              {{
                                                FormatActionDate(
                                                  item.timelineFromDate
                                                )
                                              }}
                                            </div>
                                          </div>
                                          <div class="col-2">
                                            <div
                                              class="text-body2 text-grey-7 q-mb-xs"
                                            >
                                              <b>Timeline To :</b>
                                              {{
                                                FormatActionDate(
                                                  item.timelineToDate
                                                )
                                              }}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </q-card-section>

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
                                    @click="cancelReturnAction"
                                  />

                                  <q-btn
                                    flat
                                    rounded
                                    push
                                    label="Save"
                                    class="buttonSaveDesign bg-accent text-black"
                                    @click="
                                      submiteditReturnAction(selectedIrNo)
                                    "
                                  />
                                </div>
                              </q-card-actions>
                            </q-card>
                          </div>
                        </q-dialog>
                      </div>
                    </q-item-section>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </q-dialog>

        <!-- ////////////////////////////////////////////////////////////////////////// LOADING /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->

        <q-dialog v-model="actionLoading" persistent maximized>
          <div
            class="fullscreen flex flex-center column q-gutter-md"
            style="background-color: rgba(0, 0, 0, 0.85)"
          >
            <q-spinner-ios size="150px" color="white" />

            <div class="text-center text-subtitle1 text-white">
              Sending Back Rejected Action Items.
              <br />
              <span class="text-italic text-accent">Please wait...</span>
            </div>
          </div>
        </q-dialog>

        <!-- ////////////////////////////////////////////////////////////////////////// APPROVED /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->

        <q-dialog maximized v-model="setActionApprovedDetails" persistent>
          <div class="QADialogAction">
            <q-card class="contentFormAction">
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
                            :model-value="
                              FormatActionDate(props.row.subjectDate)
                            "
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
                            :model-value="
                              FormatActionTime(props.row.subjectDate)
                            "
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
                          :model-value="props.row.subjectResponse"
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
                        Action Item Details
                      </div>
                      <div
                        class="q-mb-sm"
                        style="font-size: 15px; color: #737373"
                      >
                        This section outlines the action items implemented by
                        the department to address and mitigate the incident.
                      </div>

                      <q-separator class="formseparatorYellow" />

                      <div class="q-mx-sm">
                        <div
                          class="q-pa-sm"
                          v-for="(item, index) in IRAPActionDetailss"
                          :key="index"
                        >
                          <div class="row q-col-gutter-sm">
                            <div class="col-8 q-pa-md" style="border: 2px solid #ddd;">
                              <div>
                                <div
                                  class="text-weight-bold"
                                  style="font-size: 15px; color: #03254b;"
                                >
                                  Action Item Notes
                                </div>

                                <q-input
                                  autogrow
                                  rounded
                                  outlined
                                  disable
                                  :model-value="item.actionItem ? item.actionItem : 'No Data Available'"
                                />
                              </div>

                              <div class="row q-col-gutter-sm q-pt-sm">
                                <div class="col-6">
                                  <div
                                    class="text-weight-bold"
                                    style="font-size: 15px; color: #03254b;"
                                  >
                                    Timeline From:
                                  </div>

                                  <q-input
                                    rounded
                                    outlined
                                    disable
                                    :model-value="
                                      item.timelineFromDate
                                        ? FormatActionDate(item.timelineFromDate)
                                        : 'No Data Available'
                                    "
                                  />
                                </div>

                                <div class="col-6">
                                  <div
                                    class="text-weight-bold"
                                    style="font-size: 15px; color: #03254b;"
                                  >
                                    Timeline To:
                                  </div>

                                  <q-input
                                    rounded
                                    outlined
                                    disable
                                    :model-value="
                                      item.timelineToDate
                                        ? FormatActionDate(item.timelineToDate)
                                        : 'No Data Available'
                                    "
                                  />
                                </div>
                              </div>
                            </div>

                            <div class="col-2 text-center q-pa-sm" style="border: 2px solid #ddd">
                              <div class="q-pt-xs">
                                <div class="text-weight-bold" style="font-size: 15px; color: #03254b">
                                  Action Item Status
                                </div>

                                <q-btn
                                  rounded
                                  v-if="item.accomplishStatus === 1"
                                  @click="updateActAccomStatus(item.id, item.iRNo)"
                                  label="Pending"
                                  class="status-btn bg-red text-white text-bold q-mt-sm q-pa-sm"
                                  style="width: 200px"
                                />

                                <q-dialog v-model="setActAccomStatus" persistent>
                                  <q-card class="PrimaryAccomStatus">
                                    <q-card-section class="q-mb-sm row items-center justify-between">
                                        <div
                                          class="text-secondary text-weight-bold"
                                          style="font-size: 25px; color: #002b5c"
                                        >
                                          ACCOMPLISHMENT UPDATE
                                        </div>

                                        <q-btn
                                          flat
                                          icon="close"
                                          style="
                                            color: #003566;
                                            background-color: rgba(22, 110, 204, 0.1);
                                          "
                                          @click="setActAccomStatus = false"
                                          v-close-popup
                                        >
                                          <q-tooltip class="bg-info text-white"> Close Form </q-tooltip>
                                        </q-btn>
                                    </q-card-section>

                                    <q-separator class="formseparatorBlue" />

                                    <q-card-section>
                                      <div>
                                        <q-input
                                          v-model="DateActAccomplish"
                                          rounded
                                          outlined
                                          clearable
                                          label="DATE OF THE ACCOMPLISHMENT"
                                          @click="showActAccomDatePicker = true"
                                        >
                                          <template v-slot:append>
                                            <q-icon
                                              name="event"
                                              class="cursor-pointer"
                                              @click="showActAccomDatePicker = true"
                                            />
                                          </template>
                                        </q-input>
                                        <q-dialog v-model="showActAccomDatePicker">
                                          <q-card>
                                            <q-card-section>
                                              <q-date
                                                v-model="DateActAccomplish"
                                                @input="updateSubjectDate"
                                                :options="dateAfterOrSubjectDate"
                                              />
                                            </q-card-section>
                                          </q-card>
                                        </q-dialog>
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
                                          @click="onActAccomStatusCancel"
                                        />

                                        <q-btn
                                          flat
                                          rounded
                                          push
                                          label="Save"
                                          class="buttonSaveDesign bg-accent text-black"
                                          @click="submitActAccomStatus(selectedId, selectedIRNo)"
                                        />
                                      </div>
                                    </q-card-actions>
                                  </q-card>
                                </q-dialog>

                                <!-- ////////////////////////////////////////////////////////////////////////// LOADING /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->

                                <q-dialog v-model="accomplishActLoading" persistent maximized>
                                  <div
                                    class="fullscreen flex flex-center column q-gutter-md"
                                    style="background-color: rgba(0, 0, 0, 0.85)"
                                  >
                                    <q-spinner-ios size="150px" color="white" />

                                    <div class="text-center text-subtitle1 text-white">
                                      Action Item Completion Status
                                      <br />
                                      <span class="text-italic text-accent">Please wait...</span>
                                    </div>
                                  </div>
                                </q-dialog>

                                <q-btn
                                  rounded
                                  v-if="item.accomplishStatus === 0"
                                  label="Completed"
                                  class="status-btn bg-positive text-white text-bold q-mt-sm q-pa-sm"
                                  style="width: 200px"
                                />
                              </div>

                              <div class="row q-col-gutter-sm q-pt-md">
                                <div class="col-12">
                                  <div class="text-weight-bold text-center" style="font-size: 15px; color: #03254b">
                                    Date Accomplished
                                  </div>

                                  <q-input
                                    rounded
                                    outlined
                                    disable
                                    input-class="text-center"
                                    :model-value="item.accomplishDate ? FormatActionDate(item.accomplishDate) : 'No Data Available'"
                                  />
                                </div>
                              </div>
                            </div>

                            <div class="col-2 q-pa-sm flex flex-center" style="border: 2px solid #ddd">
                              <div class="text-center">
                                <div class="text-weight-bold text-primary" style="font-size: 15px">
                                  Action Verification
                                </div>

                                <q-btn
                                  flat
                                  rounded
                                  v-if="item.itemsActionStatus === 1"
                                  disable
                                  label="Pending"
                                  class="bg-red text-white text-bold q-pa-sm q-mt-sm"
                                  style="width: 180px"
                                />

                                <q-btn
                                  flat
                                  rounded
                                  v-if="item.itemsActionStatus === 2"
                                  disable
                                  label="Completed"
                                  class="bg-positive text-white text-bold q-pa-sm q-mt-sm"
                                  style="width: 180px"
                                />
                              </div>
                            </div>

                          </div>
                        </div>
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
    getPrimaryDeptACT: Function,
  },
  data() {
    return {
      IRDialog: false,
      IRQADetailss: [],
      QAStatus: null,

      pdfDisplayDialog: false,
      pdfUrl: null,
      maximizedToggle: null,
      subjectFile: null,

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
      showActionDatePickerFrom: false,
      showActionDatePickerTo: false,

      setActionItemDialogs: false,
      setActionStatusDialogs: false,
      itemWait: false,
      setQADialogs: false,

      actionitemDetails: [],
      actionitemFilterDetails: [],
      IRACTReturnDetailss: [],
      setActionReviseForm: false,

      RevisedAction: {},
      RevisedTimelineFromDate: {},
      RevisedTimelineToDate: {},
      showActionFromDatePicker: {},
      showActionToDatePicker: {},

      setActionApprovedDetails: false,
      IRAPActionDetailss: [],
      actionLoading: false,

      ActionLoadingItem: false,

      setActAccomStatus: false,
      selectedId: "",
      selectedIRNo: "",
      DateActAccomplish: "",
      showActAccomDatePicker: false,
      accomplishActLoading: false
    };
  },

  computed: {
    ...mapGetters({
      getQACon: "ApplyStore/getQACon",
      getActionItem: "ApplyStore/getActionItem",
      getReturnAction: "ApplyStore/getReturnAction",
      getAPAction: "ApplyStore/getAPAction",
    }),

    filteredActionItems() {
      const result = [];

      for (const [revisionActionCode, items] of Object.entries(
        this.actionitemFilterDetails
      )) {
        const hasactionReview = items.some(
          (item) => item.actionStatus === "For Review"
        );
        const foractionRevisionItems = items.filter(
          (item) => item.actionStatus === "For Revision"
        );

        foractionRevisionItems.forEach((item) => {
          result.push({
            ...item,
            disabled: hasactionReview, // flag to control UI
          });
        });
      }

      return result;
    },

    filteredForRevisionItems() {
      const result = [];

      for (const [revisionActionCode, items] of Object.entries(
        this.actionitemFilterDetails
      )) {
        const hasReviewAction = items.some(
          (item) => item.actionStatus === "For Review"
        );
        const forRevisionActionItems = items.filter(
          (item) => item.actionStatus === "For Revision"
        );

        forRevisionActionItems.forEach((item) => {
          result.push({
            ...item,
            disabled: hasReviewAction,
          });
        });
      }
      return result;
    },
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

    ///////////////////////////////////////ACTION ITEMS/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    updateSubjectDateFrom(date) {
      this.SubjectDate = date.toISOString().split("T")[0];
      this.showActionDatePickerFrom = false;
    },

    updateSubjectDateTo(date) {
      this.SubjectDate = date.toISOString().split("T")[0];
      this.showActionDatePickerTo = false;
    },

    dateAfterOrSubjectDate (date) {
      if (!this.IRQADetailss?.subjectDate) return true

      const subjectDate = new Date(this.IRQADetailss.subjectDate)
      const allowedDate = new Date(date)

      // normalize dates (remove time)
      subjectDate.setHours(0, 0, 0, 0)
      allowedDate.setHours(0, 0, 0, 0)

      return allowedDate >= subjectDate
    },

    editActionItem(IRNo) {
      this.setActionItems = true;
      this.IrNo = IRNo;
      this.selectedIrNo = IRNo;
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
    },

    validateActionItem() {
      return this.actionparties.every(
        (party) => party.ActionItem && party.TimelineToDate
      );
    },

    ///////////////////////////////////////////////////ACTION DETAILS//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async submitActionItemDataEmail() {
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

      this.setActionItems = false;
      this.ActionLoadingItem = true;

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

        await this.$store.dispatch("ApplyStore/addActionItemVL", payload);
          this.$q.notify({
          color: "green-8",
          position: "top",
          message: "SUCCESS CREATING ACTION ITEM",
          icon: "check",
          iconColor: "white",
          timeout: 3000,
          progress: true,
        });

        setTimeout( async () => {
          this.ActionLoadingItem = false;
          this.getPrimaryDeptACT();
          await this.viewActionDetailsForm(this.selectedIrNo);
          this.setActionItemDialogs = true;
        }, 6000);

      } catch (error) {
        console.error("Error creating action items:", error);
      }
    },

    FormatActionDate(SubjectDate) {
      const date = new Date(SubjectDate);
      const options = { year: "numeric", month: "long", day: "2-digit" };
      const formattedDate = date
        .toLocaleDateString("en-US", options)
        .toUpperCase()
        .replace(/\s/g, " ");
      return formattedDate;
    },

    FormatActionTime(SubjectTime) {
      const date = new Date(SubjectTime);
      let hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";

      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      const formattedTime = `${hours}:${minutes} ${ampm}`;

      return formattedTime;
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
      this.actionitemDetails = [];
    },

    async viewActionItemVLDetails(IRNo) {
      this.setActionItemDialogs = true;
      this.viewActionDetailsForm(IRNo);
    },

    async viewActionDetailsForm(IRNo) {
      try {
        const data = { iRNo: IRNo };
        this.selectedIrNo = IRNo;

        const response = await this.$store.dispatch(
          "ApplyStore/disActionItem",
          data
        );
        const filterResponse = await this.$store.dispatch(
          "ApplyStore/disFilterActionDetails",
          data
        );

        this.actionitemDetails = this.getActionItem;
        this.actionitemFilterDetails = this.getReturnAction || {};
      } catch (error) {
        console.error("Error fetching RCA details:", error);
      }
    },

    handleActionClick(item) {
      this.viewRevisionActionForm(this.selectedIrNo, item.revisionActionCode);
    },

    async viewRevisionActionForm(selectedIrNo, revisionActionCode) {
      try {
        this.setActionReviseForm = true;
        const data = {
          iRNo: selectedIrNo,
          revisionActionCode: revisionActionCode,
        };

        const returnResponse = await this.$store.dispatch(
          "ApplyStore/disReturnActionItemdetails",
          data
        );

        this.IRACTReturnDetailss = this.getReturnAction || {};
      } catch (error) {
        console.error("Error fetching RCA details:", error);
      }
    },

    updateTimelineFrom(code, date) {
      this.RevisedTimelineFromDate[code] = date;
      this.showActionFromDatePicker[code] = false;
    },

    updateTimelineTo(code, date) {
      this.RevisedTimelineToDate[code] = date;
      this.showActionToDatePicker[code] = false;
    },

    async submiteditReturnAction(selectedIrNo) {
      try {
        this.actionLoading = true;
        this.setActionReviseForm = false;
        this.setActionItemDialogs = false;
        const data = {
          iRNo: selectedIrNo,
          actionContentItems: this.IRACTReturnDetailss.map((item) => ({
          iRNo: item.iRNo,
          code: item.code,
          revisionActionCode: item.revisionActionCode,
          actionItem: this.RevisedAction[item.code],
          timelineFromDate: this.RevisedTimelineFromDate[item.code],
          timelineToDate: this.RevisedTimelineToDate[item.code],
          })).filter((item) => item.iRNo && item.code),
        };

        const returnActionResponse = await this.$store.dispatch(
          "ApplyStore/addReturnActionitems",
          data
        );

        this.$q.notify({
          color: "green-8",
          position: "top",
          message: "SUCCESS SUBMITTING ACTION ITEMS",
          icon: "check",
          iconColor: "white",
          timeout: 1000,
          progress: true,
        });

        // ⏳ Give time for loading to show
        setTimeout(async () => {
          this.getPrimaryDeptACT();
          await this.viewActionDetailsForm(selectedIrNo);
          this.actionLoading = false;
        }, 6000);

      } catch (error) {
        console.error("Error submitting RCA review:", error);
        this.actionLoading = false; // make sure it stops on error too!
      }
    },

    cancelReturnAction() {
      this.RevisedAction = {};
      this.RevisedTimelineFromDate = {};
      this.RevisedTimelineToDate = {};
    },

    async viewApprovedActionItemVL(IRNo) {
      const data = {
        iRNo: IRNo,
      };
      const returnResponse = await this.$store.dispatch(
        "ApplyStore/disActionApproved",
        data
      );
      this.IRAPActionDetailss = this.getAPAction || {};
    },

    async viewApprovedAction(IRNo) {
      this.setActionApprovedDetails = true;
      this.viewApprovedActionItemVL(IRNo);
    },

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    updateActAccomStatus(Id, IRNo){
      this.setActAccomStatus = true;
      this.selectedId = Id;
      this.selectedIRNo = IRNo;
    },

    updateSubjectDate(date) {
      this.DateActAccomplish = date.toISOString().split("T")[0];
      this.showActAccomDatePicker = false;
    },

    onActAccomStatusCancel(){
      this.DateActAccomplish = "";
    },

    async submitActAccomStatus(selectedId, selectedIRNo){
      this.setActAccomStatus = false;
      this.accomplishActLoading = true;
      try {
        const data = {
          Id: this.selectedId,
          AccomplishDate: this.DateActAccomplish,
        };

        this.onActAccomStatusCancel();
        await this.$store.dispatch("ApplyStore/AccomplishActDate", data);

        this.$q.notify({
            color: "green-8",
            position: "top",
            message: "SUCCESSFULLY SUBMITTED THE DATE OF ACCOMPLISHEMENT ",
            icon: "check",
            iconColor: "white",
            timeout: 3000,
            progress: true,
        });

        setTimeout(async () => {
          this.getPrimaryDeptACT();
          await this.viewApprovedActionItemVL(selectedIRNo);
          this.accomplishActLoading = false;
        }, 6000);

      } catch (error) {
          console.error("Error submitting RCA review:", error);
      }
    }

  },
};
</script>
