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
          style="border-radius: 20px; width: 125px"
          class="bg-accent text-black text-bold text-center shadow-5"
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
          v-if="props.row.riskGrading === 3"
          class="text-bold text-center text-uppercase q-pa-sm"
          style="background-color: #ffff01;"
        >
          MODERATE RISK
        </span>

        <span
          v-if="props.row.riskGrading === 4"
          class="text-bold text-center text-uppercase q-pa-sm"
          style="background-color: #febf02;"
        >
          HIGH RISK
        </span>

        <span
          v-if="props.row.riskGrading === 5"
          class="text-bold text-center text-uppercase q-pa-sm"
          style="background-color: #fe0000;"
        >
          VERY HIGH RISK
        </span>
      </q-td>
    </template>

    <template v-slot:body-cell-rcaform="props">
      <q-td>
        <q-btn
          flat
          rounded
          push
          :disable="['2', '3', '4', '5'].includes(props.row.rCA)"
          v-if="props.row.rCA === '1'"
          @click="viewRCAForm(props.row.iRNo)"
          :ripple="{ center: true }"
          icon="list_alt"
          style="border-radius: 20px; width: 125px"
          class="bg-positive text-black text-bold text-center shadow-5"
        />

        <q-btn
          flat
          rounded
          push
          :disable="['2', '3', '4', '5'].includes(props.row.rCA)"
          v-if="['2', '3', '4', '5'].includes(props.row.rCA)"
          :ripple="{ center: true }"
          icon="list_alt"
          style="border-radius: 20px; width: 125px"
          class="bg-dark text-white text-bold text-center shadow-5"
        />

        <q-dialog maximized v-model="setRCAForm" persistent>
          <div class="QADialog">
            <q-card class="contentFormAction">
              <q-card-section class="q-mb-xs row items-center justify-between">
                <div>
                  <div
                    class="text-secondary text-weight-bold"
                    style="font-size: 25px; color: #002b5c"
                  >
                    Incident Report: Root Cause Analysis Creation
                  </div>
                  <div style="font-size: 18px; color: #333333">
                    <b>Instruction:</b> In this section, provide a brief
                    description of the problem or incident that requires
                    analysis.
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
                            :model-value="FormatDate(IRQADetailss.subjectDate)"
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
                            :model-value="FormatTime(IRQADetailss.subjectDate)"
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
                            :model-value="IRQADetailss.subjectLoc"
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
                          :model-value="IRQADetailss.subjectResponse"
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
                    class="text-center q-mb-md text-bold"
                    style="font-size: 15px; color: #737373"
                  >
                    Identify potential root causes using a Fishbone Diagram,
                    then apply the 5 Whys technique to each cause to determine
                    the true root issue.
                  </div>
                </div>

                <!-- //////////////MP&MH////////////////// -->
                <div class="row q-col-gutter-xl q-ml-sm q-mr-sm">
                  <div class="col-6 q-px-sx">
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
                          including skills, <br/> training, experience, communication, and accountability.
                      </div>

                      <div class="q-mx-xl">
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
                          v-model="ManProbStatement"
                          label="Problem statement"
                        />
                      </div>

                      <q-item-section
                        class="q-mt-md rounded-borders bg-warning"
                        style="
                          background-color: rgba(22, 110, 204, 0.1);
                          border: 2px solid #ccc;
                        "
                      >
                        <div
                          class="row justify-between items-center text-black text-subtitle1 text-weight-bold q-mx-md"
                        >
                          Add Why?
                          <q-btn
                            class="q-ml-sm"
                            flat
                            round
                            dense
                            icon="add"
                            @click="addManpower"
                          />
                        </div>
                      </q-item-section>

                      <div class="q-mx-xl">
                        <div
                          class="text-center text-black q-ma-md"
                          style="font-size: 15px"
                        >
                          How does equipment used in the process impact the
                          problem?
                        </div>
                        <div
                          v-for="(item, index) in manparties"
                          :key="index"
                          style="display: flex; align-items: center"
                        >
                          <q-input
                            class="q-ma-sm"
                            autogrow
                            rounded
                            outlined
                            v-model="item.Manwhy"
                            label="Why?"
                            style="width: 100%"
                          />

                          <q-btn
                            @click="removeManpower(index)"
                            color="negative"
                            icon="remove_circle"
                            class="q-ml-md"
                            size="sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-6 q-px-sx">
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
                        organization <br> uses to produce or deliver its product or
                        service.
                      </div>

                      <div class="q-mx-xl">
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
                          v-model="MethodStatement"
                          label="Problem statement"
                        />
                      </div>

                      <q-item-section
                        class="q-mt-md rounded-borders bg-warning"
                        style="
                          background-color: rgba(22, 110, 204, 0.1);
                          border: 2px solid #ccc;
                        "
                      >
                        <div
                          class="row justify-between items-center text-black text-subtitle1 text-weight-bold q-mx-md"
                        >
                          Add Why?
                          <q-btn
                            class="q-ml-sm"
                            flat
                            round
                            dense
                            icon="add"
                            @click="addMethod"
                          />
                        </div>
                      </q-item-section>

                      <div class="q-mx-xl">
                        <div
                          class="text-center text-black q-ma-md"
                          style="font-size: 15px"
                        >
                          How does the way the work is performed impact the
                          problem?
                        </div>
                        <div
                          v-for="(item, index) in methodparties"
                          :key="index"
                          style="display: flex; align-items: center"
                        >
                          <q-input
                            class="q-ma-sm"
                            autogrow
                            rounded
                            outlined
                            v-model="item.Methodwhy"
                            label="Why?"
                            style="width: 100%"
                          />

                          <q-btn
                            @click="removeMethod(index)"
                            color="negative"
                            icon="remove_circle"
                            class="q-ml-md"
                            size="sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-6 q-px-sx">
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
                        equipement <br> used to create or provide the product or
                        services
                      </div>

                      <div class="q-mx-xl">
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
                          v-model="MachineStatement"
                          label="Problem statement"
                        />
                      </div>

                      <q-item-section
                        class="q-mt-md rounded-borders bg-warning"
                        style="
                          background-color: rgba(22, 110, 204, 0.1);
                          border: 2px solid #ccc;
                        "
                      >
                        <div
                          class="row justify-between items-center text-black text-subtitle1 text-weight-bold q-mx-md"
                        >
                          Add Why?
                          <q-btn
                            class="q-ml-sm"
                            flat
                            round
                            dense
                            icon="add"
                            @click="addMachine"
                          />
                        </div>
                      </q-item-section>

                      <div class="q-mx-xl">
                        <div
                          class="text-center text-black q-ma-md"
                          style="font-size: 15px"
                        >
                          How does equipment used in the process impact the
                          problem?
                        </div>
                        <div
                          v-for="(item, index) in machineparties"
                          :key="index"
                          style="display: flex; align-items: center"
                        >
                          <q-input
                            class="q-ma-sm"
                            autogrow
                            rounded
                            outlined
                            v-model="item.Machinewhy"
                            label="Why?"
                            style="width: 100%"
                          />

                          <q-btn
                            @click="removeMachine(index)"
                            color="negative"
                            icon="remove_circle"
                            class="q-ml-md"
                            size="sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-6 q-px-sx">
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
                        <br> of the system, including people, resources, and tools.
                      </div>

                      <div class="q-mx-xl">
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
                          v-model="MaterialStatement"
                          label="Problem statement"
                        />
                      </div>

                      <q-item-section
                        class="q-mt-md rounded-borders bg-warning"
                        style="
                          background-color: rgba(22, 110, 204, 0.1);
                          border: 2px solid #ccc;
                        "
                      >
                        <div
                          class="row justify-between items-center text-black text-subtitle1 text-weight-bold q-mx-md"
                        >
                          Add Why?
                          <q-btn
                            class="q-ml-sm"
                            flat
                            round
                            dense
                            icon="add"
                            @click="addMaterial"
                          />
                        </div>
                      </q-item-section>

                      <div class="q-mx-xl">
                        <div
                          class="text-center text-black q-ma-md"
                          style="font-size: 15px"
                        >
                          How do quality and type of materials used impact the
                          problem?
                        </div>
                        <div
                          v-for="(item, index) in materialparties"
                          :key="index"
                          style="display: flex; align-items: center"
                        >
                          <q-input
                            class="q-ma-sm"
                            autogrow
                            rounded
                            outlined
                            v-model="item.Materialwhy"
                            label="Why?"
                            style="width: 100%"
                          />

                          <q-btn
                            @click="removeMaterial(index)"
                            color="negative"
                            icon="remove_circle"
                            class="q-ml-md"
                            size="sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-6 q-px-sx">
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
                        <br> use to effectively measure progress, outcomes, and
                        overall performance.
                      </div>

                      <div class="q-mx-xl">
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
                          v-model="MeasurementStatement"
                          label="Problem statement"
                        />
                      </div>

                      <q-item-section
                        class="q-mt-md rounded-borders bg-warning"
                        style="
                          background-color: rgba(22, 110, 204, 0.1);
                          border: 2px solid #ccc;
                        "
                      >
                        <div
                          class="row justify-between items-center text-black text-subtitle1 text-weight-bold q-mx-md"
                        >
                          Add Why?
                          <q-btn
                            class="q-ml-sm"
                            flat
                            round
                            dense
                            icon="add"
                            @click="addMeasurement"
                          />
                        </div>
                      </q-item-section>

                      <div class="q-mx-xl">
                        <div
                          class="text-center text-black q-ma-md"
                          style="font-size: 15px"
                        >
                          How do the metrics measuring activity progress impact the problem?
                        </div>
                        <div
                          v-for="(item, index) in measurementparties"
                          :key="index"
                          style="display: flex; align-items: center"
                        >
                          <q-input
                            class="q-ma-sm"
                            autogrow
                            rounded
                            outlined
                            v-model="item.Measurementwhy"
                            label="Why?"
                            style="width: 100%"
                          />

                          <q-btn
                            @click="removeMeasurement(index)"
                            color="negative"
                            icon="remove_circle"
                            class="q-ml-md"
                            size="sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-6 q-px-sx">
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
                         <br> system including weather, geography, and regulation.
                      </div>

                      <div class="q-mx-xl">
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
                          v-model="EnvironmentStatement"
                          label="Problem statement"
                        />
                      </div>

                      <q-item-section
                        class="q-mt-md rounded-borders bg-warning"
                        style="
                          background-color: rgba(22, 110, 204, 0.1);
                          border: 2px solid #ccc;
                        "
                      >
                        <div
                          class="row justify-between items-center text-black text-subtitle1 text-weight-bold q-mx-md"
                        >
                          Add Why?
                          <q-btn
                            class="q-ml-sm"
                            flat
                            round
                            dense
                            icon="add"
                            @click="addEnvironment"
                          />
                        </div>
                      </q-item-section>

                      <div class="q-mx-xl">
                        <div
                          class="text-center text-black q-ma-md"
                          style="font-size: 15px"
                        >
                          How does the activity’s environment affect or
                          contribute to the identified problem?
                        </div>
                        <div
                          v-for="(item, index) in environmentparties"
                          :key="index"
                          style="display: flex; align-items: center"
                        >
                          <q-input
                            class="q-ma-sm"
                            autogrow
                            rounded
                            outlined
                            v-model="item.Environmentwhy"
                            label="Why?"
                            style="width: 100%"
                          />

                          <q-btn
                            @click="removeEnvironment(index)"
                            color="negative"
                            icon="remove_circle"
                            class="q-ml-md"
                            size="sm"
                          />
                        </div>
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
                    Actionable Root Cause
                  </div>
                  <div
                    class="text-center"
                    style="font-size: 15px; color: #737373"
                  >
                    <b>Instuction : From the results of your Fishbone Diagram and 5 Whys analysis,
                      identify the most critical underlying cause that requires corrective action to ensure the issue does not reoccur. </b>
                  </div>

                  <q-select rounded outlined  class="q-mt-md" v-model="domainActionable" :options="domain" label="Domain" style="width: 100%"></q-select>

                  <q-input
                    v-model="actionableRoot"
                    rounded
                    outlined
                    label="Summary Analysis"
                    type="textarea"
                    class="q-mt-md"
                    autofocus
                    style="width: 100%"
                  />
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
                    Solution Identification
                  </div>
                  <div
                    class="text-center text-bold"
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
                  class="QADes1"
                  style="
                    border: 2px solid #6b7c93;
                    border-radius: 40px;
                    padding: 30px;
                  "
                >
                  <div
                    class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                  >
                    Corrective Action
                  </div>

                  <div class="q-mb-sm text-bold" style="font-size: 15px; color: #737373">
                    Specify immediate actions to address identified root causes,
                    including responsible individuals and deadlines for
                    implementation. You may add more fields as needed.
                  </div>

                  <q-item-section
                    class="q-mt-md rounded-borders bg-warning"
                    style="
                      background-color: rgba(22, 110, 204, 0.1);
                      border: 2px solid #ccc;
                    "
                  >
                    <div
                      class="row justify-between items-center text-primary text-subtitle1 text-weight-bold q-mx-md"
                    >
                      Add Corrective Actions
                      <q-btn
                        class="q-ml-sm"
                        flat
                        round
                        dense
                        icon="add"
                        @click="addCorrectiveItem"
                      />
                    </div>
                  </q-item-section>

                  <div class="q-mx-xl">
                    <div
                      class="row q-col-gutter-md q-mt-xs q-mb-xs items-center"
                      v-for="(partycorrective, index) in correctiveparties"
                      :key="index"
                    >
                      <!-- Corrective Action -->
                      <div class="col-4">
                        <q-input
                          autogrow
                          rounded
                          outlined
                          v-model="partycorrective.CorrectiveAction"
                          label="Corrective Action:"
                        />
                      </div>

                      <!-- Timeline From -->
                      <div class="col-2">
                        <q-input
                          v-model="partycorrective.CorTimelineFromDate"
                          rounded
                          outlined
                          clearable
                          label="Timeline From:"
                          @click="showcorDatePickerfrom = true"
                        >
                          <template v-slot:append>
                            <q-icon
                              name="event"
                              class="cursor-pointer"
                              @click="showcorDatePickerfrom = true"
                            />
                          </template>
                        </q-input>

                        <q-dialog v-model="showcorDatePickerfrom">
                          <q-card>
                            <q-card-section>
                              <q-date
                                v-model="partycorrective.CorTimelineFromDate"
                                @input="updateSubjectDate"
                                :options="dateAfterOrSubjectDate"
                              />
                            </q-card-section>
                          </q-card>
                        </q-dialog>
                      </div>

                      <!-- Timeline To -->
                      <div class="col-2">
                        <q-input
                          v-model="partycorrective.CorTimelineToDate"
                          rounded
                          outlined
                          clearable
                          label="Timeline To:"
                          @click="showcorDatePickerto = true"
                        >
                          <template v-slot:append>
                            <q-icon
                              name="event"
                              class="cursor-pointer"
                              @click="showcorDatePickerto = true"
                            />
                          </template>
                        </q-input>

                        <q-dialog v-model="showcorDatePickerto">
                          <q-card>
                            <q-card-section>
                              <q-date
                                v-model="partycorrective.CorTimelineToDate"
                                @input="updateSubjectDate"
                                :options="dateAfterOrSubjectDate"
                              />
                            </q-card-section>
                          </q-card>
                        </q-dialog>
                      </div>

                      <!-- Accountable Person -->
                      <div class="col-3">
                        <q-select
                          use-input
                          rounded
                          outlined
                          clearable
                          v-model="partycorrective.AccountablePer"
                          :options="disEmployeeName"
                          @filter="FilterFn"
                          label="Accountable Person/s"
                          emit-value
                          map-options
                          :option-value="(option) => option.employeeCode"
                          :option-label="(option) => option.fullName"
                        >
                          <template v-slot:no-option>
                            <q-item>
                              <q-item-section class="text-grey"
                                >No results</q-item-section
                              >
                            </q-item>
                          </template>
                        </q-select>
                      </div>

                      <!-- Remove Button -->
                      <div class="col-auto">
                        <q-btn
                          @click="removeCorrectiveItem(index)"
                          color="negative"
                          icon="remove_circle"
                          class="q-ml-sm"
                          size="sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <!-- <q-separator class="formseparatorWhite" />

                <div
                  class="QADes1"
                  style="
                    border: 2px solid #6b7c93;
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

                  <q-item-section
                    class="q-mt-md rounded-borders bg-warning"
                    style="
                      background-color: rgba(22, 110, 204, 0.1);
                      border: 2px solid #ccc;
                    "
                  >
                    <div
                      class="row justify-between items-center text-primary text-subtitle1 text-weight-bold q-mx-md"
                    >
                      Add Preventive Measures
                      <q-btn
                        class="q-ml-sm"
                        flat
                        round
                        dense
                        icon="add"
                        @click="addPreventiveItem"
                      />
                    </div>
                  </q-item-section>

                  <div class="q-mx-xl">
                    <div
                      class="row q-col-gutter-md q-mt-xs q-mb-xs items-center"
                      v-for="(partypreventive, index) in partypreventive"
                      :key="index"
                    >
                      <div class="col-4">
                        <q-input
                          autogrow
                          rounded
                          outlined
                          v-model="partypreventive.PreventiveMeasure"
                          label="Preventive Measure:"
                        />
                      </div>

                      <div class="col-2">
                        <q-input
                          v-model="partypreventive.PreTimelineFromDate"
                          rounded
                          outlined
                          clearable
                          label="Timeline From:"
                          @click="showpreDatePickerfrom = true"
                        >
                          <template v-slot:append>
                            <q-icon
                              name="event"
                              class="cursor-pointer"
                              @click="showpreDatePickerfrom = true"
                            />
                          </template>
                        </q-input>

                        <q-dialog v-model="showpreDatePickerfrom">
                          <q-card>
                            <q-card-section>
                              <q-date
                                v-model="partypreventive.PreTimelineFromDate"
                                @input="updateSubjectDate"
                                :options="dateAfterOrToday"
                              />
                            </q-card-section>
                          </q-card>
                        </q-dialog>
                      </div>

                      <div class="col-2">
                        <q-input
                          v-model="partypreventive.PreTimelineToDate"
                          rounded
                          outlined
                          clearable
                          label="Timeline To:"
                          @click="showpreDatePickerto = true"
                        >
                          <template v-slot:append>
                            <q-icon
                              name="event"
                              class="cursor-pointer"
                              @click="showpreDatePickerto = true"
                            />
                          </template>
                        </q-input>

                        <q-dialog v-model="showpreDatePickerto">
                          <q-card>
                            <q-card-section>
                              <q-date
                                v-model="partypreventive.PreTimelineToDate"
                                @input="updateSubjectDate"
                                :options="dateAfterOrToday"
                              />
                            </q-card-section>
                          </q-card>
                        </q-dialog>
                      </div>

                      <div class="col-3">
                        <q-select
                          use-input
                          rounded
                          outlined
                          clearable
                          v-model="partypreventive.ResponsiblePer"
                          :options="disEmployeeName"
                          @filter="FilterFn"
                          label="Responsible Person/s:"
                          emit-value
                          map-options
                          :option-value="(option) => option.employeeCode"
                          :option-label="(option) => option.fullName"
                        >
                          <template v-slot:no-option>
                            <q-item>
                              <q-item-section class="text-grey">
                                No results
                              </q-item-section>
                            </q-item>
                          </template>
                        </q-select>
                      </div>

                      <div class="col-auto">
                        <q-btn
                          @click="removePreventiveItem(index)"
                          color="negative"
                          icon="remove_circle"
                          class="q-ml-md"
                          size="sm"
                        />
                      </div>
                    </div>
                  </div>
                </div> -->

                <q-separator class="formseparatorWhite" />

                <div
                  class="QADes1"
                  style="
                    border: 2px solid #6b7c93;
                    border-radius: 40px;
                    padding: 30px;
                  "
                >
                  <div
                    class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                  >
                    Risk
                  </div>

                  <div class="q-mb-sm text-bold" style="font-size: 15px; color: #737373">
                    Instruction: Identify the risks associated with or arising from this specific
                    incident that should be recorded in the risk register to support effective risk management.
                    <br/> Each risk should be stated using the format: <span class="text-red">Risk of [event/scenario] due to [cause] leading to [consequence].</span>
                  </div>

                  <q-item-section
                    class="q-mt-md rounded-borders bg-warning"
                    style="
                      background-color: rgba(22, 110, 204, 0.1);
                      border: 2px solid #ccc;
                    "
                  >
                    <div
                      class="row justify-between items-center text-primary text-subtitle1 text-weight-bold q-mx-md"
                    >
                      Add Risk Items
                      <q-btn
                        class="q-ml-sm"
                        flat
                        round
                        dense
                        icon="add"
                        @click="addRiskItem"
                      />
                    </div>
                  </q-item-section>

                  <div
                      class="row q-col-gutter-md q-mt-xs q-mb-xs q-ml-md items-center"
                      v-for="(partyrisk, index) in riskparties"
                      :key="index"
                  >
                    <div class="col-11">
                        <q-input
                          autogrow
                          rounded
                          outlined
                          v-model="partyrisk.RiskItems"
                          label="Risk Items:"
                        />
                    </div>

                    <div class="col-auto">
                        <q-btn
                          @click="removeRiskItem(index)"
                          color="negative"
                          icon="remove_circle"
                          class="q-ml-md"
                          size="sm"
                        />
                      </div>
                    </div>
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
                    @click="onCancelRCAItem"
                    style="width: 195px"
                  />

                  <q-btn
                    flat
                    rounded
                    push
                    label="Save"
                    class="buttonSaveDesign bg-accent text-black"
                    @click="submitRCAItemData()"
                    style="width: 195px"
                  />
                </div>
              </q-card-actions>
            </q-card>
          </div>
        </q-dialog>

        <q-dialog v-model="waitingRCA" persistent maximized>
          <div
            class="fullscreen flex flex-center column q-gutter-md"
            style="background-color: rgba(0, 0, 0, 0.85)"
          >
            <q-spinner-ios size="150px" color="white" />

            <div class="text-center text-subtitle1 text-white">
              Preparing RCA documents.
              <br />
              <span class="text-italic text-accent">Please wait...</span>
            </div>
          </div>
        </q-dialog>
      </q-td>
    </template>

    <template v-slot:body-cell-rcadetails="props">
      <q-td>
        <q-btn
          flat
          rounded
          push
          :ripple="{ center: true }"
          label="SUBMITTED"
          style="border-radius: 20px; width: 195px"
          v-if="props.row.rCA === '2'"
          @click="viewRCAConfirmDetails(props.row.iRNo)"
          class="bg-orange text-black text-bold text-center shadow-5"
        />

        <q-btn
          flat
          rounded
          push
          :ripple="{ center: true }"
          label="RETURNED DECLINED"
          style="border-radius: 20px; width: 195px"
          v-if="props.row.rCA === '3'"
          @click="viewRCAConfirmDetails(props.row.iRNo)"
          class="bg-accent text-black text-bold text-center shadow-5"
        />

        <q-btn
          flat
          rounded
          push
          :ripple="{ center: true }"
          label="SUBMITTED FOR REVISED"
          style="border-radius: 20px; width: 195px"
          v-if="props.row.rCA === '4'"
          @click="viewRCAConfirmDetails(props.row.iRNo)"
          class="bg-accent text-black text-bold text-center shadow-5"
        />

        <q-btn
          flat
          rounded
          push
          v-if="props.row.rCA === '5'"
          @click="viewRCAApprovedDetails(props.row.iRNo)"
          :ripple="{ center: true }"
          label="APPROVED"
          style="border-radius: 20px; width: 195px"
          class="bg-positive text-black text-bold text-center shadow-5"
        />

        <q-dialog maximized v-model="setRCADetailsForm" persistent>
          <div class="QADialog">
            <q-card class="contentFormRCA">
              <q-card-section class="q-mb-sm row items-center justify-between">
                <div
                  class="text-secondary text-weight-bold"
                  style="font-size: 25px; color: #002b5c"
                >
                  ROOT CAUSE ANALYSIS (RCA) INFORMATION FORM
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

              <q-separator class="formseparatorWhite" />

              <q-card-section>
                <div class="row q-col-gutter-lg q-mx-xs">
                  <div
                    class="col-9 q-pa-lg bg-white rounded-borders shadow-2"
                    style="border: 3px solid #6b7c93; border-radius: 40px"
                  >
                    <q-card-section style="border: 2px solid #ddd">
                      <div class="QADesContent q-mb-md">
                        <div class="QAFixDesign">
                          <div class="QADes1">
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
                            <q-separator class="formseparatorYellow" />

                            <div
                              class="row q-col-gutter-xs"
                              style="margin: 20px"
                            >
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
                                    FormatRCATime(props.row.subjectDate)
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
                                    FormatRCADate(props.row.subjectDate)
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
                        </div>
                      </div>

                      <div class="QADesContent q-mb-md">
                        <div class="QAFixDesign">
                          <div class="QADes1">
                            <div
                              class="text-info text-subtitle1 text-weight-bold q-mb-sm"
                            >
                              Immediate Response
                            </div>
                            <div class="text-body2 text-grey-7 q-mb-sm">
                              Action taken by the concerned department or by the
                              Informant to ease the incident.
                            </div>
                            <q-separator class="formseparatorYellow" />
                            <div class="q-mt-md">
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

                    <q-card-section
                      class="q-mt-md"
                      style="border: 2px solid #ddd"
                    >
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
                          Identify potential root causes using a Fishbone
                          Diagram, then apply the 5 Whys technique to each cause
                          to determine the true root issue.
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
                              including skills, <br/> training, experience, communication, and accountability.
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
                              organization uses to produce or deliver its
                              product or service.
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
                              equipement used to create or provide the product
                              or services.
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
                              This refers to any physical or non-physical
                              components of the system, including people,
                              resources, and tools.
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
                              This refers to the tools and methods that
                              organizations use to effectively measure progress,
                              outcomes, and overall performance.
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
                              This refers to the external factors that affect
                              the system including weather, geography, and
                              regulation.
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

                    <q-card-section
                      class="q-mt-md"
                      style="border: 2px solid #ddd"
                    >
                      <div
                        class="QADes1 column items-center justify-center q-mb-md"
                        v-for="(
                              item, index
                            ) in IRRCADetailss.RCAActionableLog"
                            :key="index"
                      >
                        <div
                          class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center"
                        >
                          Actionable Root Cause
                        </div>
                        <div
                          class="text-center q-mb-md"
                          style="font-size: 15px; color: #737373"
                        >
                          From the results of your Fishbone Diagram and 5 Whys analysis,<br/>
                          this represents the most critical underlying cause that requires corrective action to prevent the issue from recurring.
                        </div>

                          <q-input
                            rounded
                            outlined
                            disable
                            :model-value="getDomainLabel(item.domain)"
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

                    <q-card-section
                      class="q-mt-md"
                      style="border: 2px solid #ddd"
                    >
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
                          actions to immediately address root causes and
                          preventive measures to avoid recurrence, specifying
                          responsibilities and timelines for each.
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
                          causes, including responsible individuals and
                          deadlines for implementation. You may add more fields
                          as needed.
                        </div>

                        <q-separator class="formseparatorYellow" />

                        <div>
                          <div
                            class="row q-col-gutter-md q-mt-xs q-mb-xs items-center"
                            v-for="(
                              item, index
                            ) in IRRCADetailss.RCACorrectiveLog"
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

                            <div class="col-">
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

                        <div
                          class="q-mb-sm"
                          style="font-size: 15px; color: #737373"
                        >
                          Outline long-term preventive measures, considering
                          changes to policies, procedures, training, and
                          organizational culture. You may add more fields as
                          needed.
                        </div>

                        <q-separator class="formseparatorYellow" />

                        <div>
                          <div
                            class="row q-col-gutter-md q-mt-xs q-mb-xs items-center"
                            v-for="(
                              item, index
                            ) in IRRCADetailss.RCAPreventiveLog"
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
                            ) in IRRCADetailss.RCARisk"
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
                  </div>

                  <div class="col-3">
                    <q-item-section
                      class="q-pa-xs"
                      style="border: 3px solid #6b7c93"
                    >
                      <div class="QADes1">
                        <div
                          class="text-info text-subtitle1 text-weight-bold q-mb-sm"
                        >
                          Content Root Cause Analysis (RCA) Status
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
                            margin: '10px',
                            borderRadius: '10px',
                            opacity: item.disabled ? '0.5' : '1',
                            pointerEvents: item.disabled ? 'none' : 'auto',
                          }"
                          @click="!item.disabled && handleClick(item)"
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
                              {{ item.status }}
                            </div>
                            <div class="text-caption text-dark">
                              {{ item.revisionCode }}
                            </div>
                            <div class="text-caption text-dark">
                              {{ FormatDate(item.dateTimeCreated) }}
                            </div>
                          </div>
                        </div>

                        <q-dialog maximized v-model="setReviseForm" persistent>
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
                                    Revise Root Cause Analysis (RCA) Details
                                  </div>

                                  <div style="font-size: 18px; color: #333333">
                                    <b>Instruction:</b> This section describes
                                    the items identified through the Root Cause
                                    Analysis and implemented by the department
                                    to address and mitigate the incident.
                                  </div>
                                </div>

                                <q-btn
                                  flat
                                  icon="close"
                                  style="
                                    color: #003566;
                                    background-color: rgba(22, 110, 204, 0.1);
                                  "
                                  @click="this.setReviseForm = false"
                                  v-close-popup
                                >
                                  <q-tooltip class="bg-info text-white">
                                    Close Form
                                  </q-tooltip>
                                </q-btn>
                              </q-card-section>

                              <q-card-section
                                class="rounded-borders shadow-2 q-mt-md q-mb-md"
                                style="border: 2px solid #ddd"
                              >
                                <div
                                  class="QADes1 column items-center justify-center q-mb-md"
                                >
                                  <div
                                    class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center"
                                  >
                                    Fishbone / Ishikawa Diagram and 5 Whys
                                    Analysis
                                  </div>
                                  <div
                                    class="text-center q-mb-md"
                                    style="font-size: 15px; color: #737373"
                                  >
                                    Identify potential root causes using a
                                    Fishbone Diagram, then apply the 5 Whys
                                    technique to each cause to determine the
                                    true root issue.
                                  </div>
                                </div>

                                <q-card-section class="row q-col-gutter-xl q-ml-sm q-mr-sm q-mb-md" v-if="whyLogs.length > 0">
                                  <div
                                    class="col-6 q-px-sx"
                                    v-if="whyLogs.filter(m => m.problemName === 'MANPOWER').length"
                                  >
                                    <div
                                      class="fishboneDesign q-pa-md bg-white"
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
                                        including skills, <br/> training, experience, communication, and accountability.
                                      </div>

                                      <div
                                        class="q-mx-sm q-pa-sm q-mb-md"
                                        style="border: 2px solid #8d92a8; border-radius: 20px;"
                                        v-for="(item, index) in whyLogs.filter(
                                          (m) => m.problemName === 'MANPOWER'
                                        ) || []"
                                        :key="index"
                                      >
                                        <!-- QA Section -->
                                        <div
                                          class="q-pa-sm q-mb-xs"
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
                                              Quality Assurance Comment &
                                              Suggestion
                                            </div>
                                          </div>

                                          <div class="row q-col-gutter-xs">
                                            <div class="col">
                                              <div
                                                class="text-body2 text-grey-7 q-mb-xs"
                                              >
                                                <b>Note :</b>
                                                {{ item.whyNote }}
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                        <!-- Input Section -->
                                        <q-card-section
                                          class="row q-col-gutter-sm"
                                        >
                                          <div class="col">
                                            <q-input
                                              autogrow
                                              rounded
                                              outlined
                                              label="Input Revised Content"
                                              v-model="ReturnWhy[item.code]"
                                            />
                                          </div>
                                        </q-card-section>

                                        <!-- Rejected Content Section -->
                                        <div
                                          class="q-pa-sm"
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
                                              Rejected Created Content
                                            </div>
                                          </div>

                                          <div class="row q-col-gutter-xs">
                                            <div class="col-8">
                                              <div
                                                class="text-body2 text-grey-7 q-mb-xs"
                                              >
                                                <b>Why Note :</b>
                                                {{ item.description }}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div
                                    class="col-6 q-px-sx"
                                    v-if="whyLogs.filter(m => m.problemName === 'METHOD').length"
                                  >
                                    <div
                                      class="fishboneDesign q-pa-md bg-white"
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
                                        This refers to the methods and
                                        procedures an organization uses <br/> to
                                        produce or deliver its product or
                                        service.
                                      </div>

                                      <div
                                        class="q-mx-md q-pa-sm q-mb-md"
                                        style="border: 2px solid #8d92a8; border-radius: 20px;"
                                        v-for="(item, index) in whyLogs.filter(
                                          (m) => m.problemName === 'METHOD'
                                        ) || []"
                                        :key="index"
                                      >
                                        <!-- QA Section -->
                                        <div
                                          class="q-pa-sm q-mb-xs"
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
                                              Quality Assurance Comment &
                                              Suggestion
                                            </div>
                                          </div>

                                          <div class="row q-col-gutter-xs">
                                            <div class="col">
                                              <div
                                                class="text-body2 text-grey-7 q-mb-xs"
                                              >
                                                <b>Note :</b>
                                                {{ item.whyNote }}
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                        <!-- Input Section -->
                                        <q-card-section
                                          class="row q-col-gutter-sm"
                                        >
                                          <div class="col">
                                            <q-input
                                              autogrow
                                              rounded
                                              outlined
                                              label="Input Revised Content"
                                              v-model="ReturnWhy[item.code]"
                                            />
                                          </div>
                                        </q-card-section>

                                        <!-- Rejected Content Section -->
                                        <div
                                          class="q-pa-sm"
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
                                              Rejected Created Content
                                            </div>
                                          </div>

                                          <div class="row q-col-gutter-xs">
                                            <div class="col-8">
                                              <div
                                                class="text-body2 text-grey-7 q-mb-xs"
                                              >
                                                <b>Why Note :</b>
                                                {{ item.description }}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div
                                    class="col-6 q-px-sx"
                                    v-if="whyLogs.filter(m => m.problemName === 'MACHINE').length"
                                  >
                                    <div
                                      class="fishboneDesign q-pa-md bg-white"
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
                                        This refers to the assets such as
                                        machines and equipement <br/> used to create
                                        or provide the product or services.
                                      </div>

                                      <div
                                        class="q-mx-md q-pa-sm q-mb-md"
                                        style="border: 2px solid #8d92a8; border-radius: 20px;"
                                        v-for="(item, index) in whyLogs.filter(
                                          (m) => m.problemName === 'MACHINE'
                                        ) || []"
                                        :key="index"
                                      >
                                        <!-- QA Section -->
                                        <div
                                          class="q-pa-sm q-mb-xs"
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
                                              Quality Assurance Comment &
                                              Suggestion
                                            </div>
                                          </div>

                                          <div class="row q-col-gutter-xs">
                                            <div class="col">
                                              <div
                                                class="text-body2 text-grey-7 q-mb-xs"
                                              >
                                                <b>Note :</b>
                                                {{ item.whyNote }}
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                        <!-- Input Section -->
                                        <q-card-section
                                          class="row q-col-gutter-sm"
                                        >
                                          <div class="col">
                                            <q-input
                                              autogrow
                                              rounded
                                              outlined
                                              label="Input Revised Content"
                                              v-model="ReturnWhy[item.code]"
                                            />
                                          </div>
                                        </q-card-section>

                                        <!-- Rejected Content Section -->
                                        <div
                                          class="q-pa-sm"
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
                                              Rejected Created Content
                                            </div>
                                          </div>

                                          <div class="row q-col-gutter-xs">
                                            <div class="col-8">
                                              <div
                                                class="text-body2 text-grey-7 q-mb-xs"
                                              >
                                                <b>Why Note :</b>
                                                {{ item.description }}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div
                                    class="col-6 q-px-sx"
                                    v-if="whyLogs.filter(m => m.problemName === 'MATERIAL').length"
                                  >
                                    <div
                                      class="fishboneDesign q-pa-md bg-white"
                                      style="
                                        border: 5px solid
                                          rgba(156, 39, 176, 0.6);
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
                                        This refers to any physical or
                                        non-physical components <br/> of the system,
                                        including people, resources, and tools.
                                      </div>

                                      <div
                                        class="q-mx-md q-pa-sm q-mb-md"
                                        style="border: 2px solid #8d92a8; border-radius: 20px;"
                                        v-for="(item, index) in whyLogs.filter(
                                          (m) => m.problemName === 'MATERIAL'
                                        ) || []"
                                        :key="index"
                                      >
                                        <!-- QA Section -->
                                        <div
                                          class="q-pa-sm q-mb-xs"
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
                                              Quality Assurance Comment &
                                              Suggestion
                                            </div>
                                          </div>

                                          <div class="row q-col-gutter-xs">
                                            <div class="col">
                                              <div
                                                class="text-body2 text-grey-7 q-mb-xs"
                                              >
                                                <b>Note :</b>
                                                {{ item.whyNote }}
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                        <!-- Input Section -->
                                        <q-card-section
                                          class="row q-col-gutter-sm"
                                        >
                                          <div class="col">
                                            <q-input
                                              autogrow
                                              rounded
                                              outlined
                                              label="Input Revised Content"
                                              v-model="ReturnWhy[item.code]"
                                            />
                                          </div>
                                        </q-card-section>

                                        <!-- Rejected Content Section -->
                                        <div
                                          class="q-pa-sm"
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
                                              Rejected Created Content
                                            </div>
                                          </div>

                                          <div class="row q-col-gutter-xs">
                                            <div class="col-8">
                                              <div
                                                class="text-body2 text-grey-7 q-mb-xs"
                                              >
                                                <b>Why Note :</b>
                                                {{ item.description }}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div
                                    class="col-6 q-px-sx"
                                    v-if="whyLogs.filter(m => m.problemName === 'MEASUREMENT').length"
                                  >
                                    <div
                                      class="fishboneDesign q-pa-md bg-white"
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
                                        This refers to the tools and methods
                                        that organizations <br/> use to effectively
                                        measure progress, outcomes, and overall
                                        performance.
                                      </div>

                                      <div
                                        class="q-mx-md q-pa-sm q-mb-md"
                                        style="border: 2px solid #8d92a8; border-radius: 20px;"
                                        v-for="(item, index) in whyLogs.filter(
                                          (m) => m.problemName === 'MEASUREMENT'
                                        ) || []"
                                        :key="index"
                                      >
                                        <!-- QA Section -->
                                        <div
                                          class="q-pa-sm q-mb-xs"
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
                                              Quality Assurance Comment &
                                              Suggestion
                                            </div>
                                          </div>

                                          <div class="row q-col-gutter-xs">
                                            <div class="col">
                                              <div
                                                class="text-body2 text-grey-7 q-mb-xs"
                                              >
                                                <b>Note :</b>
                                                {{ item.whyNote }}
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                        <!-- Input Section -->
                                        <q-card-section
                                          class="row q-col-gutter-sm"
                                        >
                                          <div class="col">
                                            <q-input
                                              autogrow
                                              rounded
                                              outlined
                                              label="Input Revised Content"
                                              v-model="ReturnWhy[item.code]"
                                            />
                                          </div>
                                        </q-card-section>

                                        <!-- Rejected Content Section -->
                                        <div
                                          class="q-pa-sm"
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
                                              Rejected Created Content
                                            </div>
                                          </div>

                                          <div class="row q-col-gutter-xs">
                                            <div class="col-8">
                                              <div
                                                class="text-body2 text-grey-7 q-mb-xs"
                                              >
                                                <b>Why Note :</b>
                                                {{ item.description }}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div
                                    class="col-6 q-px-sx"
                                    v-if="whyLogs.filter(m => m.problemName === 'ENVIRONMENT').length"
                                  >
                                    <div
                                      class="fishboneDesign q-pa-md bg-white"
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
                                        This refers to the external factors that
                                        <br/> affect the system including weather,
                                        geography, and regulation.
                                      </div>

                                      <div
                                        class="q-mx-md q-pa-sm q-mb-md"
                                        style="border: 2px solid #8d92a8; border-radius: 20px;"
                                        v-for="(item, index) in whyLogs.filter(
                                          (m) => m.problemName === 'ENVIRONMENT'
                                        ) || []"
                                        :key="index"
                                      >
                                        <!-- QA Section -->
                                        <div
                                          class="q-pa-sm q-mb-xs"
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
                                              Quality Assurance Comment &
                                              Suggestion
                                            </div>
                                          </div>

                                          <div class="row q-col-gutter-xs">
                                            <div class="col">
                                              <div
                                                class="text-body2 text-grey-7 q-mb-xs"
                                              >
                                                <b>Note :</b>
                                                {{ item.whyNote }}
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                        <!-- Input Section -->
                                        <q-card-section
                                          class="row q-col-gutter-sm"
                                        >
                                          <div class="col">
                                            <q-input
                                              autogrow
                                              rounded
                                              outlined
                                              label="Input Revised Content"
                                              v-model="ReturnWhy[item.code]"
                                            />
                                          </div>
                                        </q-card-section>

                                        <!-- Rejected Content Section -->
                                        <div
                                          class="q-pa-sm"
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
                                              Rejected Created Content
                                            </div>
                                          </div>

                                          <div class="row q-col-gutter-xs">
                                            <div class="col-8">
                                              <div
                                                class="text-body2 text-grey-7 q-mb-xs"
                                              >
                                                <b>Why Note :</b>
                                                {{ item.description }}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </q-card-section>

                                <q-card-section class="QAFileDes column flex-center"  v-else>
                                  <div
                                    class="text-subtitle1 items-center text-weight-bold text-dark"
                                  >
                                    <i>~ No Content Available ~</i>
                                  </div>
                                </q-card-section>
                              </q-card-section>

                              <q-card-section
                                class="rounded-borders shadow-2 q-mt-md q-mb-md"
                                style="border: 2px solid #ddd"
                                v-if="actionableLogs.length > 0"
                              >
                                <div v-if="actionableLogs && actionableLogs.length">

                                <div class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center">
                                  Actionable Root Cause
                                </div>

                                <div class="text-center q-mb-md" style="font-size: 15px; color: #737373">
                                  From the results of your Fishbone Diagram and 5 Whys analysis, <br />
                                  this represents the most critical underlying cause that requires corrective action
                                  to prevent the issue from recurring.
                                </div>

                                  <q-input
                                    rounded
                                    outlined
                                    disable
                                    :model-value="getDomainLabel(actionableLogs[0].domain)"
                                    label="Domain"
                                    class="q-mt-md"
                                    style="width: 100%"
                                  />

                                  <div class="q-mx-sm">
                                    <div
                                      class="col q-ma-sm q-pa-sm"
                                      v-for="(item, index) in actionableLogs ||
                                      []"
                                      :key="index"
                                      style="border: 2px solid white"
                                    >
                                      <!-- QA Section -->
                                      <div
                                        class="q-pa-sm q-mb-xs"
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
                                            Quality Assurance Comment &
                                            Suggestion
                                          </div>
                                        </div>

                                        <div class="row q-col-gutter-xs">
                                          <div class="col">
                                            <div
                                              class="text-body2 text-grey-7 q-mb-xs"
                                            >
                                              <b>Note :</b>
                                              {{ item.actionableQANote }}
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <!-- Input Section -->
                                      <q-card-section
                                        class="row q-col-gutter-sm"
                                      >
                                        <div class="col">
                                          <q-input
                                            type="textarea"
                                            rounded
                                            outlined
                                            label="Input Revised Content"
                                            v-model="
                                              ReturnActionable[item.code]
                                            "
                                          />
                                        </div>
                                      </q-card-section>

                                      <!-- Rejected Content Section -->
                                      <div
                                        class="q-pa-sm"
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
                                            Rejected Created Content
                                          </div>
                                        </div>

                                        <div class="row q-col-gutter-xs">
                                          <div class="col-8">
                                            <div
                                              class="text-body2 text-grey-7 q-mb-xs"
                                            >
                                              <b>Actionable Note :</b>
                                              {{ item.actionable }}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                </div>
                              </q-card-section>

                              <q-card-section
                                class="rounded-borders shadow-2 q-mt-md"
                                style="border: 2px solid #ddd"
                              >
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
                                    Identify effective solutions by proposing
                                    corrective actions to immediately address
                                    root causes and preventive measures to avoid
                                    recurrence, specifying responsibilities and
                                    timelines for each.
                                  </div>
                                </div>

                                <q-card-section v-if="corpreReviewLogs.length > 0">
                                <div
                                  class="QADes1"
                                  style="
                                    border: 2px solid #6b7c93;
                                    border-radius: 40px;
                                    padding: 20px;
                                  "
                                  v-if="correctiveLogs && correctiveLogs.length">

                                  <div
                                    class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                                  >
                                    Corrective Action
                                  </div>

                                  <div
                                    class="q-mb-sm"
                                    style="font-size: 15px; color: #737373"
                                  >
                                    Specify immediate actions to address
                                    identified root causes, including
                                    responsible individuals and deadlines for
                                    implementation. You may add more fields as
                                    needed.
                                  </div>

                                  <q-separator class="formseparatorYellow" />

                                  <div class="q-mx-md q-pa-sm">
                                    <div
                                      class="col q-ma-sm q-pa-sm q-pa-md q-mb-md"
                                      v-for="(item, index) in correctiveLogs ||
                                      []"
                                      :key="index"
                                      style="border: 2px solid #8d92a8; border-radius: 20px;"
                                    >
                                      <!-- QA Section -->
                                      <div
                                        class="q-pa-sm q-mb-xs"
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
                                            Quality Assurance Comment &
                                            Suggestion
                                          </div>
                                        </div>

                                        <div class="row q-col-gutter-xs">
                                          <div class="col">
                                            <div
                                              class="text-body2 text-grey-7 q-mb-xs"
                                            >
                                              <b>Note :</b>
                                              {{ item.correctiveNote }}
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <!-- Input Section -->
                                      <q-card-section
                                        class="row q-col-gutter-sm"
                                      >
                                        <div class="col">
                                          <q-input
                                            autogrow
                                            rounded
                                            outlined
                                            label="Input Revised Content"
                                            v-model="
                                              ReturnCorrective[item.code]
                                            "
                                          />
                                        </div>
                                      </q-card-section>

                                      <!-- Rejected Content Section -->
                                      <div
                                        class="q-pa-sm"
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
                                            Rejected Created Content
                                          </div>
                                        </div>

                                        <div class="row q-col-gutter-xs">
                                          <div class="col-8">
                                            <div
                                              class="text-body2 text-grey-7 q-mb-xs"
                                            >
                                              <b>Why Note :</b>
                                              {{ item.correctiveAction }}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <q-separator class="formseparatorWhite" />

                                <!-- <div
                                  class="QADes1"
                                  style="
                                    border: 2px solid #6b7c93;
                                    border-radius: 40px;
                                    padding: 20px;
                                  "
                                  v-if="preventiveLogs && preventiveLogs.length">

                                  <div
                                    class="text-primary text-subtitle1 text-weight-bold q-mb-sx"
                                  >
                                    Preventive Measures
                                  </div>

                                  <div
                                    class="q-mb-sm"
                                    style="font-size: 15px; color: #737373"
                                  >
                                    Outline long-term preventive measures,
                                    considering changes to policies, procedures,
                                    training, and organizational culture. You
                                    may add more fields as needed.
                                  </div>

                                  <q-separator class="formseparatorYellow" />

                                  <div class="q-mx-md">
                                    <div
                                      class="col q-ma-md q-pa-sm"
                                      v-for="(item, index) in preventiveLogs ||
                                      []"
                                      :key="index"
                                      style="border: 2px solid white"
                                    >

                                      <div
                                        class="q-pa-sm q-mb-xs"
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
                                            Quality Assurance Comment &
                                            Suggestion
                                          </div>
                                        </div>

                                        <div class="row q-col-gutter-xs">
                                          <div class="col">
                                            <div
                                              class="text-body2 text-grey-7 q-mb-xs"
                                            >
                                              <b>Note :</b>
                                              {{ item.preventiveNote }}
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <q-card-section
                                        class="row q-col-gutter-sm"
                                      >
                                        <div class="col">
                                          <q-input
                                            autogrow
                                            rounded
                                            outlined
                                            label="Input Revised Content"
                                            v-model="
                                              ReturnPreventive[item.code]
                                            "
                                          />
                                        </div>
                                      </q-card-section>

                                      <div
                                        class="q-pa-sm"
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
                                            Rejected Created Content
                                          </div>
                                        </div>

                                        <div class="row q-col-gutter-xs">
                                          <div class="col-8">
                                            <div
                                              class="text-body2 text-grey-7 q-mb-xs"
                                            >
                                              <b>Why Note :</b>
                                              {{ item.preventiveMeasure }}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div> -->
                                </q-card-section>

                                <q-card-section class="QAFileDes column flex-center"  v-else>
                                  <div
                                    class="text-subtitle1 items-center text-weight-bold text-dark"
                                  >
                                    <i>~ No Content Available ~</i>
                                  </div>
                                </q-card-section>
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
                                    @click="this.setReviseForm = false"
                                    style="width: 195px"
                                  />

                                  <q-btn
                                    flat
                                    rounded
                                    push
                                    label="Save"
                                    class="buttonSaveDesign bg-accent text-black"
                                    @click="submiteditReturnRCA(selectedIrNo)"
                                    style="width: 195px"
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

        <q-dialog v-model="waitingSubReject" persistent maximized>
          <div
            class="fullscreen flex flex-center column q-gutter-md"
            style="background-color: rgba(0, 0, 0, 0.85)"
          >
            <q-spinner-ios size="150px" color="white" />

            <div class="text-center text-subtitle1 text-white">
              Sending Back Rejected RCA.
              <br />
              <span class="text-italic text-accent">Please wait...</span>
            </div>
          </div>
        </q-dialog>

        <!-- ///////////////////////////////////////////////////////////////////// APPROVED ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->

        <q-dialog maximized v-model="setRCAApprovedDetails" persistent>
          <div class="QADialog">
            <q-card class="contentFormRCApproved">
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
                  @click="onCancelRCAApproved()"
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
                        including skills, <br/> training, experience, communication, and accountability.
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
                        use <br/>  to effectively measure progress, outcomes, and
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

              <q-card-section
                class="q-mt-md"
                style="border: 2px solid #ddd"
              >
                <div
                  class="QADes1 column items-center justify-center q-mb-md"
                  v-for="(
                    item, index
                  ) in IRRCAApprovedDetailss.RCAActionableApproved"
                    :key="index"
                >
                  <div
                    class="text-primary text-subtitle1 text-weight-bold q-mb-xs text-center"
                  >
                    Actionable Root Cause
                  </div>

                    <div
                      class="text-center q-mb-md"
                      style="font-size: 15px; color: #737373"
                    >
                      From the results of your Fishbone Diagram and 5 Whys analysis,<br/>
                      this represents the most critical underlying cause that requires corrective action to prevent the issue from recurring.
                    </div>

                    <q-input
                      rounded
                      outlined
                      disable
                      :model-value="getDomainLabel(item.domain)"
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
                  class="QADes1"
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

                  <div class="q-mx-sm">
                    <div
                      class="q-pa-md"
                      v-for="(item, index) in IRRCAApprovedDetailss.RCACorrectiveApproved"
                      :key="index">

                      <div class="row q-col-gutter-sm">
                        <div class="col-8 q-pa-md" style="border: 2px solid #ddd;">
                          <div>
                            <div
                              class="text-weight-bold"
                              style="font-size: 15px; color: #03254b;"
                            >
                              Corrective Action Note
                            </div>

                            <q-input
                              autogrow
                              rounded
                              outlined
                              :model-value="item.correctiveAction || 'No Data Available'"
                              disable
                            />
                          </div>

                          <div class="row q-col-gutter-sm q-pt-sm">
                            <div class="col-4">
                              <div
                                class="text-weight-bold"
                                style="font-size: 15px; color: #03254b;"
                              >
                                Accountable Person/s
                              </div>

                              <q-input
                                autogrow
                                rounded
                                outlined
                                class="q-pr-sm"
                                :model-value="EmploFullName(item.accountablePer) || 'No Data Available'"
                                disable
                              />
                            </div>

                            <div class="col-4">
                              <div
                                class="text-weight-bold"
                                style="font-size: 15px; color: #03254b;"
                              >
                                Timeline From:
                              </div>

                              <q-input
                                autogrow
                                rounded
                                outlined
                                class="q-pr-sm"
                                :model-value="FormatDate(item.corTimelineFromDate) || 'No Data Available'"
                                disable
                              />
                            </div>

                            <div class="col-4">
                              <div
                                class="text-weight-bold"
                                style="font-size: 15px; color: #03254b;"
                              >
                                Timeline To:
                              </div>

                              <q-input
                                autogrow
                                rounded
                                outlined
                                class="q-pr-sm"
                                :model-value="FormatDate(item.corTimelineToDate) || 'No Data Available'"
                                disable
                              />
                            </div>
                          </div>
                        </div>

                        <div class="col-2 text-center q-pa-sm" style="border: 2px solid #ddd">
                          <div class="q-pt-xs">
                            <div class="text-weight-bold" style="font-size: 15px; color: #03254b">
                              Corrective Action Status
                            </div>

                            <q-btn
                              rounded
                              v-if="item.accomplishStatus === 1"
                              @click="updateAccomStatus(item.id, item.iRNo)"
                              label="Pending"
                              class="status-btn bg-red text-white text-bold q-mt-sm q-pa-sm"
                              style="width: 200px"
                            />

                            <q-dialog v-model="setAccomStatus" persistent>
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
                                      @click="setAccomStatus = false"
                                      v-close-popup
                                    >
                                      <q-tooltip class="bg-info text-white"> Close Form </q-tooltip>
                                    </q-btn>
                                </q-card-section>

                                <q-separator class="formseparatorBlue" />

                                <q-card-section>
                                  <div>
                                    <q-input
                                      v-model="DateAccomplish"
                                      rounded
                                      outlined
                                      clearable
                                      label="DATE OF THE ACCOMPLISHMENT"
                                      @click="showAccomDatePicker = true"
                                    >
                                      <template v-slot:append>
                                        <q-icon
                                          name="event"
                                          class="cursor-pointer"
                                          @click="showAccomDatePicker = true"
                                        />
                                      </template>
                                    </q-input>
                                    <q-dialog v-model="showAccomDatePicker">
                                      <q-card>
                                        <q-card-section>
                                          <q-date
                                            v-model="DateAccomplish"
                                            @input="updateSubjectDate"
                                            :options="dateBeforeOrToday"
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
                                      @click="onAccomStatusCancel"
                                    />

                                    <q-btn
                                      flat
                                      rounded
                                      push
                                      label="Save"
                                      class="buttonSaveDesign bg-accent text-black"
                                      @click="submitAccomStatus(selectedId, selectedIRNo)"
                                    />
                                  </div>
                                </q-card-actions>
                              </q-card>
                            </q-dialog>

                            <!-- ////////////////////////////////////////////////////////////////////////// LOADING /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->

                            <q-dialog v-model="accomplishLoading" persistent maximized>
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
                                Corrective Action Date
                              </div>

                              <q-input
                                autogrow
                                rounded
                                outlined
                                input-class="text-center"
                                :model-value="item.accomplishDate ? FormatDate(item.accomplishDate) : 'No Data Available'"
                                disable
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
                              v-if="item.actionStatus === 1"
                              disable
                              label="Pending"
                              class="bg-red text-white text-bold q-pa-sm q-mt-sm"
                              style="width: 180px"
                            />

                            <q-btn
                              flat
                              rounded
                              v-if="item.actionStatus === 2"
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
    getPrimaryDeptRCA: Function,
  },
  data() {
    return {
      IrNo: "",
      iRNo: "",
      selectedIrNo: "",

      IRDialog: false,
      IRQADetailss: [],
      QAStatus: null,

      pdfDisplayDialog: false,
      pdfUrl: null,
      maximizedToggle: null,
      subjectFile: null,

      setRCAForm: false,
      ManProbStatement: "",
      manparties: Array.from({ length: 3 }, () => ({
        Manwhy: "",
      })),
      MethodStatement: "",
      methodparties: Array.from({ length: 3 }, () => ({ Methodwhy: "" })),
      MachineStatement: "",
      machineparties: Array.from({ length: 3 }, () => ({ Machinewhy: "" })),
      MaterialStatement: "",
      materialparties: Array.from({ length: 3 }, () => ({ Materialwhy: "" })),
      MeasurementStatement: "",
      measurementparties: Array.from({ length: 3 }, () => ({
        Measurementwhy: "",
      })),
      EnvironmentStatement: "",
      environmentparties: Array.from({ length: 3 }, () => ({
        Environmentwhy: "",
      })),
      correctiveparties: [
        {
          CorrectiveAction: "",
          CorTimelineFromDate: "",
          CorTimelineToDate: "",
          AccountablePer: "",
        },
      ],
      preventiveparties: [
        {
          PreventiveMeasure: "",
          PreTimelineFromDate: "",
          PreTimelineToDate: "",
          ResponsiblePer: "",
        },
      ],
      riskparties: [
        {
          RiskItems: ""
        },
      ],
      actionableRoot: '',
      domainActionable: '',
      domain: [
        { label: "Manpower", value: "1" },
        { label: "Method", value: "2" },
        { label: "Machine", value: "3" },
        { label: "Material", value: "4" },
        { label: "Measurement", value: "5" },
        { label: "Environment", value: "6" },
      ],

      showcorDatePickerfrom: false,
      showcorDatePickerto: false,
      showpreDatePickerfrom: false,
      showpreDatePickerto: false,
      setRCADetailsForm: false,
      waitingRCA: false,
      IRRCADetailss: [],
      IRRCAReturnDetailss: [],
      IRRCAFilterReturnDetailss: [],
      IRRCAReturnReviewDetailss: [],
      IRRCAApprovedDetailss: [],
      setReviseForm: false,
      domainList: [
        { label: "Manpower", value: "1" },
        { label: "Method", value: "2" },
        { label: "Machine", value: "3" },
        { label: "Material", value: "4" },
        { label: "Measurement", value: "5" },
        { label: "Environment", value: "6" },
      ],

      ReturnProbStatement: {},
      ReturnWhy: {},
      ReturnActionable: {},
      ReturnCorrective: {},
      // ReturnPreventive: {},
      setReviewForm: false,
      waitingSubReject: false,

      setRCAApprovedDetails: false,
      disEmployeeName: [],

      setAccomStatus: false,
      showAccomDatePicker: false,
      DateAccomplish: "",
      selectedId: "",
      selectedIRNo: "",
      accomplishLoading: false,
    };
  },
  computed: {
    ...mapGetters({
      getQACon: "ApplyStore/getQACon",
      getRCA: "ApplyStore/getRCA",
      getReturnRCA: "ApplyStore/getReturnRCA",
      getReturnReviewRCA: "ApplyStore/getReturnReviewRCA",
      getEmployee: "ApplyStore/getEmployee",
    }),

    problemStatementLogs() {
      return this.IRRCAReturnDetailss?.RCAProblemStatementLogsReturn || [];
    },

    whyLogs() {
      return this.IRRCAReturnDetailss?.RCAWhyLogReturn || [];
    },

    actionableLogs(){
      return this.IRRCAReturnDetailss?.RCAActionableLogReturn || [];
    },

    correctiveLogs() {
      return this.IRRCAReturnDetailss?.RCACorrectiveLogReturn || [];
    },

    // preventiveLogs() {
    //   return this.IRRCAReturnDetailss?.RCAPreventiveLogReturn || [];
    // },

    corpreReviewLogs() {
      const corrective = this.IRRCAReturnDetailss?.RCACorrectiveLogReturn || [];
      const preventive = this.IRRCAReturnDetailss?.RCAPreventiveLogReturn || [];
      return [...corrective, ...preventive];
    },


    filteredForRevisionItems() {
      const result = [];

      for (const [revisionCode, items] of Object.entries(
        this.IRRCAFilterReturnDetailss
      )) {
        const hasReview = items.some((item) => item.status === "For Review");
        const forRevisionItems = items.filter(
          (item) => item.status === "For Revision"
        );

        forRevisionItems.forEach((item) => {
          result.push({
            ...item,
            disabled: hasReview,
          });
        });
      }

      return result;
    },
  },

  created() {
    this.getEmployeeList();
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

    EmploFullName(employeeCode) {
      if (!employeeCode || !this.getEmployee) return null;
      const employee = this.getEmployee.find(
        (emp) => String(emp.employeeCode) === String(employeeCode)
      );

      return employee ? employee.fullName : null;
    },

    async viewIReport(IRNo) {
      try {
        this.IRDialog = true;
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

    ///////////////////////////////////////////////////////////////////// RCA FORM //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    updateSubjectDate(date) {
      this.DateAccomplish = date.toISOString().split("T")[0];
      this.showAccomDatePicker = false;
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


    async viewRCAForm(IRNo) {
      try {
        this.setRCAForm = true;
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

    ///////////////////////////////////////////////////////////////////// WHY //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    addManpower() {
      if (this.manparties.length < 5) {
        this.manparties.push({ Manwhy: "" });
      }
    },

    removeManpower(index) {
      this.manparties.splice(index, 1);
    },

    addMethod() {
      if (this.methodparties.length < 5) {
        this.methodparties.push({ Methodwhy: "" });
      }
    },

    removeMethod(index) {
      this.methodparties.splice(index, 1);
    },

    addMachine() {
      if (this.machineparties.length < 5) {
        this.machineparties.push({ Machinewhy: "" });
      }
    },

    removeMachine(index) {
      this.machineparties.splice(index, 1);
    },

    addMaterial() {
      if (this.materialparties.length < 5) {
        this.materialparties.push({ Materialwhy: "" });
      }
    },

    removeMaterial(index) {
      this.materialparties.splice(index, 1);
    },

    addMeasurement() {
      if (this.measurementparties.length < 5) {
        this.measurementparties.push({ Measurementwhy: "" });
      }
    },

    removeMeasurement(index) {
      this.measurementparties.splice(index, 1);
    },

    addEnvironment() {
      if (this.environmentparties.length < 5) {
        this.environmentparties.push({ Environmentwhy: "" });
      }
    },

    removeEnvironment(index) {
      this.environmentparties.splice(index, 1);
    },

    ///////////////////////////////////////////////////////////////////// CORRECTIVE & PREVENTIVE //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    addCorrectiveItem() {
      this.correctiveparties.push({
        CorrectiveAction: "",
        CorTimelineFromDate: "",
        CorTimelineToDate: "",
        AccountablePer: "",
      });
    },

    removeCorrectiveItem(index) {
      this.correctiveparties.splice(index, 1);
    },

    ///////////////////////////////////////////////////////////////////// RESPONSIBLE & ACCOUNTABLE PERSON/S //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // addPreventiveItem() {
    //   this.preventiveparties.push({
    //     PreventiveMeasure: "",
    //     PreTimelineFromDate: "",
    //     PreTimelineToDate: "",
    //     ResponsiblePer: "",
    //   });
    // },

    // removePreventiveItem(index) {
    //   this.preventiveparties.splice(index, 1);
    // },

    ///////////////////////////////////////////////////////////////////// RESPONSIBLE & ACCOUNTABLE PERSON/S //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    addRiskItem() {
      this.riskparties.push({
        RiskItems: ""
      });
    },

    removeRiskItem(index) {
      this.riskparties.splice(index, 1);
    },

    ///////////////////////////////////////////////////////////////////// INSERT RCA //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    onCancelRCAItem() {
      this.IrNo = "";
      this.ManProbStatement = "";
      this.MethodStatement = "";
      this.MachineStatement = "";
      this.MaterialStatement = "";
      this.MeasurementStatement = "";
      this.EnvironmentStatement = "";
      this.actionableRoot = "";
      this.domainActionable = "";

      // Reset arrays with default structure to preserve inputs
      this.manparties = [{ Manwhy: "" }];
      this.methodparties = [{ Methodwhy: "" }];
      this.machineparties = [{ Machinewhy: "" }];
      this.materialparties = [{ Materialwhy: "" }];
      this.measurementparties = [{ Measurementwhy: "" }];
      this.environmentparties = [{ Environmentwhy: "" }];

      this.correctiveparties = [
        {
          CorrectiveAction: "",
          CorTimelineFromDate: "",
          CorTimelineToDate: "",
          AccountablePer: "",
        },
      ];

      // this.preventiveparties = [
      //   {
      //     PreventiveMeasure: "",
      //     PreTimelineFromDate: "",
      //     PreTimelineToDate: "",
      //     ResponsiblePer: "",
      //   },
      // ];

      this.riskparties = [
        {
          RiskItems: ""
        }
      ];
    },

    async submitRCAItemData() {
      this.waitingRCA = true;
      this.setRCAForm = false;
      this.IRQADetailss = [];
      try {
        const payload = {
          IRNo: this.selectedIrNo,
          ManProbStatement: this.ManProbStatement,
          Manwhy: this.manparties.map((party) => party.Manwhy),

          MethodStatement: this.MethodStatement,
          Methodwhy: this.methodparties.map((party) => party.Methodwhy),

          MachineStatement: this.MachineStatement,
          Machinewhy: this.machineparties.map((party) => party.Machinewhy),

          MaterialStatement: this.MaterialStatement,
          Materialwhy: this.materialparties.map((party) => party.Materialwhy),

          MeasurementStatement: this.MeasurementStatement,
          Measurementwhy: this.measurementparties.map(
            (party) => party.Measurementwhy
          ),

          EnvironmentStatement: this.EnvironmentStatement,
          Environmentwhy: this.environmentparties.map(
            (party) => party.Environmentwhy
          ),

          CorrectiveAction: this.correctiveparties.map(
            (party) => party.CorrectiveAction
          ),
          CorTimelineFromDate: this.correctiveparties.map(
            (party) => party.CorTimelineFromDate
          ),
          CorTimelineToDate: this.correctiveparties.map(
            (party) => party.CorTimelineToDate
          ),
          AccountablePer: this.correctiveparties.map(
            (party) => party.AccountablePer
          ),

          // PreventiveMeasure: this.preventiveparties.map(
          //   (party) => party.PreventiveMeasure
          // ),
          // PreTimelineFromDate: this.preventiveparties.map(
          //   (party) => party.PreTimelineFromDate
          // ),
          // PreTimelineToDate: this.preventiveparties.map(
          //   (party) => party.PreTimelineToDate
          // ),
          // ResponsiblePer: this.preventiveparties.map(
          //   (party) => party.ResponsiblePer
          // ),

          actionableRoot: this.actionableRoot,
          domainActionable: this.domainActionable.value,
          RiskItems: this.riskparties.map( (party) => party.RiskItems ),
        };
        this.onCancelRCAItem();
        await this.$store.dispatch("ApplyStore/addRCAItem", payload);
        this.$q.notify({
          color: "green-8",
          position: "top",
          message: "SUCCESS RCA",
          icon: "check",
          iconColor: "white",
          timeout: 3000,
          progress: true,
        });

        setTimeout( async () => {
          this.getPrimaryDeptRCA();
          this.waitingRCA = false;
          await this.viewRCADetailsForm(this.selectedIrNo); // Fixed reference to selectedIrNo
          this.setRCADetailsForm = true;
        }, 6000);

      } catch (error) {
        console.error("Error creating action items:", error);
      }
    },

    FilterFn(val, update) {
      if (val === "") {
        update(() => {
          this.disEmployeeName = this.getEmployee;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.disEmployeeName = this.getEmployee.filter((option) => {
          return option.fullName.toLowerCase().indexOf(needle) > -1;
        });
      });
    },

    async getEmployeeList() {
      try {
        await this.$store.dispatch("ApplyStore/disEmployeeList");
        this.disEmployeeName = this.getEmployee;
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    },

    ///////////////////////////////////////////////////////////////////// DISPLAY RCA //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    viewRCAConfirmDetails(IRNo) {
      this.setRCADetailsForm = true;
      this.viewRCADetailsForm(IRNo);
    },

    onCancelRCADetailsItem() {
      this.setRCADetailsForm = false;
    },

    getDomainLabel(value) {
      const found = this.domainList.find(opt => opt.value === String(value))
      return found ? found.label : ''
    },

    async viewRCADetailsForm(IRNo) {
      try {
        const data = { iRNo: IRNo };
        this.selectedIrNo = IRNo;

        const response = await this.$store.dispatch(
          "ApplyStore/disRCAdetails",
          data
        );
        const returnResponse = await this.$store.dispatch(
          "ApplyStore/disFilterRCAdetailsreturn",
          data
        );
        this.IRRCAFilterReturnDetailss = this.getReturnRCA;
        this.IRRCADetailss = this.getRCA;
      } catch (error) {
        console.error("Error fetching RCA details:", error);
      }
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

    async viewRevisionRCADetailsForm(selectedIrNo, revisionCode) {
      try {
        this.setReviseForm = true;
        const data = { iRNo: selectedIrNo, revisionCode: revisionCode };
        const returnResponse = await this.$store.dispatch(
          "ApplyStore/disRCAdetailsreturn",
          data
        );
        this.IRRCAReturnDetailss = this.getReturnRCA || {};
      } catch (error) {
        console.error("Error fetching RCA details:", error);
      }
    },

    // async viewReviewRCADetailsForm(selectedIrNo, status, revisionCode) {
    //   try {
    //     this.setReviewForm = true;
    //     const data = {
    //       iRNo: selectedIrNo,
    //       status: status,
    //       revisionCode: revisionCode,
    //     };
    //     const returnResponse = await this.$store.dispatch(
    //       "ApplyStore/disReviewRCAdetailsreturn",
    //       data
    //     );
    //     console.log(this.getReturnReviewRCA);
    //     this.IRRCAReturnReviewDetailss = this.getReturnReviewRCA || {};
    //   } catch (error) {
    //     console.error("Error fetching RCA details:", error);
    //   }
    // },

    // async viewResolvedRCADetailsForm() {
    //   try {
    //     this.setReviewForm = true;
    //     const data = { iRNo: this.selectedIrNo };
    //     console.log(data);
    //   } catch (error) {
    //     console.error("Error fetching RCA details:", error);
    //   }
    // },

    handleClick(item) {
      this.viewRevisionRCADetailsForm(this.selectedIrNo, item.revisionCode);
    },

    async submiteditReturnRCA(selectedIrNo) {
      try {
        this.waitingSubReject = true;
        this.setRCADetailsForm = false;
        this.setReviseForm = false;

        const data = {
          iRNo: selectedIrNo,
          RCAProblemStatementLogs: this.problemStatementLogs
            .map((item) => ({
              iRNo: selectedIrNo,
              code: item.code,
              problemCode: item.problemCode,
              revisionCode: item.revisionCode,
              description: this.ReturnProbStatement[item.code],
            })).filter((item) => item.iRNo && item.code),

          RCAWhyLog: this.whyLogs
            .map((item) => ({
              iRNo: selectedIrNo,
              problemCode: item.problemCode,
              problemName: item.problemName,
              code: item.code,
              revisionCode: item.revisionCode,
              description: this.ReturnWhy[item.code],
            })).filter((item) => item.iRNo && item.code),

          RCAActionableLog: this.actionableLogs.map((item) => ({
            iRNo: selectedIrNo,
            code: item.code,
            revisionCode: item.revisionCode,
            domain: item.domain,
            actionable: this.ReturnActionable[item.code],
          })).filter((item) => item.iRNo && item.code),

          RCACorrectiveLog: this.correctiveLogs
            .map((item) => ({
              iRNo: selectedIrNo,
              code: item.code,
              revisionCode: item.revisionCode,
              accountablePer: item.accountablePer,
              corTimelineFromDate: item.corTimelineFromDate,
              corTimelineToDate: item.corTimelineToDate,
              correctiveAction: this.ReturnCorrective[item.code],
            })).filter((item) => item.iRNo && item.code),

          // RCAPreventiveLog: this.preventiveLogs
          //   .map((item) => ({
          //     iRNo: selectedIrNo,
          //     code: item.code,
          //     revisionCode: item.revisionCode,
          //     responsiblePer: item.responsiblePer,
          //     preTimelineFromDate: item.preTimelineFromDate,
          //     preTimelineToDate: item.preTimelineToDate,
          //     preventiveMeasure: this.ReturnPreventive[item.code],
          //   })).filter((item) => item.iRNo && item.code),
          };

          const returnRCAResponse = await this.$store.dispatch("ApplyStore/addrcaReviewItem", data);

          this.$q.notify({
            color: "green-8",
            position: "top",
            message: "SUCCESS SUBMITTING REJECT RCA",
            icon: "check",
            iconColor: "white",
            timeout: 1000,
            progress: true,
          });

        setTimeout(async () => {
          this.getPrimaryDeptRCA();
          await this.viewRCADetailsForm(selectedIrNo);
          this.waitingSubReject = false;
        }, 6000);

      } catch (error) {
          console.error("Error submitting RCA review:", error);
      }
    },

    async viewRCAApprovedDetails(IRNo) {
      this.setRCAApprovedDetails = true;
      const data = {
        iRNo: IRNo,
      };
      const response = await this.$store.dispatch(
        "ApplyStore/disRCAApproveddetails",
        data
      );
      this.IRRCAApprovedDetailss = this.getRCA;
    },

    onCancelRCAApproved() {
      this.IRRCAApprovedDetailss = [];
      this.setRCAApprovedDetails = false;
    },

    updateAccomStatus(Id, IRNo){
      this.setAccomStatus = true;
      this.selectedId = Id;
      this.selectedIRNo = IRNo;
    },

    onAccomStatusCancel(){
      this.DateAccomplish = "";
    },

    async submitAccomStatus(selectedId, selectedIRNo){
      this.setAccomStatus = false;
      this.accomplishLoading = true;
      try {
        const data = {
          Id: this.selectedId,
          AccomplishDate: this.DateAccomplish,
        };

        this.onAccomStatusCancel();
        await this.$store.dispatch("ApplyStore/AccomplishDate", data);

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
          this.getPrimaryDeptRCA();
          await this.viewRCAApprovedDetails(selectedIRNo);
          this.accomplishLoading = false;
        }, 6000);

      } catch (error) {
          console.error("Error submitting RCA review:", error);
      }
    }
  },
};
</script>
