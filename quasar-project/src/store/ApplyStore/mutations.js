export default {
  /////// ACCESS RIGHT ///////

  SET_MODULES(state, getAccessModule) {
    state.getAccessModule = getAccessModule;
  },

  ///////////////////////////////////////

  ///////// GOOGLE //////////////
  SET_GOOGLEUSER(state, getGoogleUser) {
    state.getGoogleUser = getGoogleUser;
  },
  ////////////////////////////////////////////

  ////////////////////////////////////////////

  GET_IRLIST(state, getList){
    state.getList = getList;
  },

  GET_EmpDept(state, getForm) {
    state.getForm = getForm;
  },

  GET_SubName(state, subjectname) {
    state.subjectname = subjectname;
  },

  GET_SubCategory(state, subjectcategory) {
    state.subjectcategory = subjectcategory;
  },

  GET_Division(state, division) {
    state.division = division;
  },

  SET_USER(state, getUser) {
    state.getUser = getUser;
  },

  RESET_ACCESS_MODULE(state) {
    state.getAccessModule = [];
  },

  ///////// DASHBOARD //////////////
  GET_DASH(state, getDash) {
    state.getDash = getDash;
  },
  ////////////////////////////////////////////

  ///////// DIRECTOR TABLE //////////////
  GET_DIRECTOR(state, getDirector) {
    state.getDirector = getDirector;
  },

  GET_DIRECTIR(state, getDirector) {
    state.getDirector = getDirector;
  },

  ////////////////////////////////////////////

  ///////// REPORT TABLE //////////////
  GET_CountSub(state, getCountSubs) {
    state.getCountSubs = getCountSubs;
  },
  ////////////////////////////////////////////

  ///////// IRFORM //////////////
  ADD_IRFORM(state, getIRForm) {
    state.getIRForm = getIRForm;
  },

  ////////////////////////////////////////////

  ///////// ASSISTANTQA TABLE //////////////
  GET_ASSISTANTQA(state, getAssistantQA) {
    state.getAssistantQA = getAssistantQA;
  },

  GET_ASSISTANTQAFORM(state, getAssistantQAForm) {
    state.getAssistantQAForm = getAssistantQAForm;
  },

  GET_ASSISTANTSUBCODE(state, getAssistantSubCode) {
    state.getAssistantSubCode = getAssistantSubCode;
  },

  GET_ASSISTANTDIVCODE(state, getAssistantDivision) {
    state.getAssistantDivision = getAssistantDivision;
  },
  ////////////////////////////////////////////

  ///////// QATABLE //////////////
  GET_QAFORM(state, getQAForm) {
    state.getQAForm = getQAForm;
  },

  GET_HEADFORM(state, getHead){
    state.getHead = getHead;
  },

  GET_UNIFORM(state, getRiskUni){
    state.getRiskUni = getRiskUni;
  },

  GET_QAIR(state, getQACon) {
    state.getQACon = getQACon;
  },

  GET_QA(state, getQA) {
    state.getQA = getQA;
  },

  GET_QAACTION(state, getQAAction) {
    state.getQAAction = getQAAction;
  },

  ADD_QAACTION(state, getQAAction) {
    state.getQAAction = getQAAction;
  },

  SET_DEPARTMENTS(state, data) {
    state.departments = data; //
  },

  SET_DEPTLIST(state, deptList) {
    state.deptList = deptList; //
  },

  GET_CORRECTIVE(state, getcorrective) {
    state.getcorrective = getcorrective;
  },

  GET_RISK(state, getRiskData) {
    state.getRiskData = getRiskData;
  },

  GET_PENREMARKS(state, getRemarks) {
    state.getRemarks = getRemarks;
  },

  ////////////////////////////////////////////

  GET_EMFORM(state, getQAForm) {
    state.getQAForm = getQAForm;
  },

  ADD_QAFORM(state, getQAForm) {
    state.getQAForm = getQAForm;
  },
  ////////////////////////////////////////////

  ///////// PRIMARYTABLE //////////////
  GET_PRIM(state, getPrimary) {
    state.getPrimary = getPrimary;
  },

  GET_EMPLOYEE(state, getEmployee) {
    state.getEmployee = getEmployee;
  },

  GET_ACTION(state, getActionItem) {
    state.getActionItem = getActionItem;
  },

  GET_REVACTION(state, getReturnReviewAction) {
    state.getReturnReviewAction = getReturnReviewAction;
  },

  GET_RETURNACTION(state, getReturnAction) {
    state.getReturnAction = getReturnAction;
  },

  GET_APACTION(state, getAPAction) {
    state.getAPAction = getAPAction;
  },

  GET_RCA(state, getRCA) {
    state.getRCA = getRCA;
  },

  GET_RETURNRCA(state, getReturnRCA) {
    state.getReturnRCA = getReturnRCA;
  },

  GET_RETURNREVIEWRCA(state, getReturnReviewRCA) {
    state.getReturnReviewRCA = getReturnReviewRCA;
  },
  ///////////////////////////////////

  ///////// SECONDARYTABLE //////////////
  GET_SEC(state, getSecondary) {
    state.getSecondary = getSecondary;
  },
  ///////////////////////////////////

  ///////// HRTABLE //////////////
  GET_HRFORM(state, getHR) {
    state.getHR = getHR;
  },

  GET_FORM(state, getForm) {
    state.getForm = getForm;
  },

  GET_DIV(state, getDiv) {
    state.getDiv = getDiv;
  },

  GET_AREA(state, getArea){
    state.getArea = getArea;
  },

  GET_ACCESS(state, getAccess){
    state.getAccess = getAccess;
  },
  ////////////////////////////////////////////

  ////HRDEMERIT/////
  EMPLOYEE_FORM(state, getForm) {
    state.getForm = getForm;
  },

  DEPT_FORM(state, getForm) {
    state.getForm = getForm;
  },
  ////////////////////////////////////////

  GET_EMPLOYEES(state, getForm) {
    state.getForm = getForm;
  },

  DEMERIT_FORM(state, demerit) {
    state.demerit = demerit;
  },
  ////////////////////////////////////////

  /////////////Audit///////////////////////
  AUDIT_FORM(state, getAudit) {
    state.getAudit = getAudit;
  },

  GET_SUBJECTFORM(state, getSubject) {
    state.getSubject = getSubject;
  },

  GET_RISKCHILDFORM(state, getRiskChild) {
    state.getRiskChild = getRiskChild;
  },

  GET_ALLRISKFORM(state, getAllRisk) {
    state.getAllRisk = getAllRisk;
  },

  GET_RISKFORM(state, getRisk) {
    state.getRisk = getRisk;
  },

  UPDATE_NOTE(state, updatedNote) {
    state.getAudit,
      state.getAudit.map((getAudit) =>
        getAudit.Id === updatedNote.Id ? updatedNote : getAudit
      );
  },
};
