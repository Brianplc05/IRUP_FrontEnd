const ApiUrl = process.env.BACKEND_REST_API_URL;
const AccessApiUrl = process.env.ACCESS_RIGHT_API_URL;
import { jwtDecode } from "./jwtDecode";
import axios from "axios";

export default {
  ///////// GOOGLE LOGIN //////////////

  async googleLogin({ commit }, payload) {
    try {
      const response = await axios.post(
        `${ApiUrl}/googlelogin/GoogleLogin`,
        payload
      );
      const decodedgoogleUser = jwtDecode(response.data.token);
      localStorage.setItem("authToken", response.data.token); // Store the authentication token in localStorage
      localStorage.setItem("user", JSON.stringify(decodedgoogleUser)); // Store user information in localStorage
      commit("SET_GOOGLEUSER", decodedgoogleUser);
      return decodedgoogleUser;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  },

  initAuth({ commit }) {
    const authToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");
    if (authToken && storedUser) {
      const decodedgoogleUser = JSON.parse(storedUser);
      commit("SET_GOOGLEUSER", decodedgoogleUser);
    }
  },

  async googlelogoutAction({ commit }) {
    try {
      // Remove the authentication token from localStorage
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      commit("SET_GOOGLEUSER", null);
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  },

  ////////////////////////////////////////////

  ///////// LOGIN //////////////

  async Login({ commit }, logs) {
    try {
      const response = await axios.post(`${ApiUrl}/login/Login`, logs);
      const decodedUser = jwtDecode(response.data.token);
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("user", JSON.stringify(decodedUser));
      commit("SET_USER", decodedUser);
      return decodedUser;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  },

  initAuth({ commit }) {
    const authToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");
    if (authToken && storedUser) {
      const decodedUser = JSON.parse(storedUser);
      commit("SET_USER", decodedUser);
    }
  },

  async logoutAction({ commit }) {
    try {
      // Remove the authentication token from localStorage
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      commit("SET_USER", null);
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  },

  ////////////////////////////////////////////

  /////////////////ACCESS RIGHT///////////////

  async getAccessRight({ commit, state }, employeeCode) {
    try {
      const listModules = state.getListModule; // Assuming this returns an array of module names
      const appName = encodeURIComponent("Online Incident Report");
      const code = encodeURIComponent(employeeCode);

      let getAccessModule = [];

      // Loop through all modules
      for (let i = 0; i < listModules.length; i++) {
        const moduleName = encodeURIComponent(listModules[i].title);
        const queryParams = `appName=${appName}&moduleName=${moduleName}&code=${code}`;
        const responseAccessRight = await axios.get(
          `${AccessApiUrl}?${queryParams}`
        );
        if (responseAccessRight.data[0].isAccess) {
          getAccessModule.push(listModules[i]);
        }
      }

      const defaultModule = state.getListDefaultModule;
      const combinedModules = [...defaultModule, ...getAccessModule];
      commit("SET_MODULES", combinedModules);

      // Save the combined modules to localStorage
      localStorage.setItem("accessModules", JSON.stringify(combinedModules));
    } catch (error) {
      console.error("Failed to Access Module:", error);
      throw error;
    }
  },

  ////////////////////////////////////////////

  ///////// IRFORM //////////////
  async disEmDept({ commit }) {
    try {
      const response = await axios.get(`${ApiUrl}/forms/EmpdeptForm`);
      commit("GET_EmpDept", response.data);
    } catch (error) {
      console.error("Failed to Employee & Departments:", error);
      throw error;
    }
  },

  async disSubName({ commit }) {
    try {
      const response = await axios.get(`${ApiUrl}/forms/SubNameForm`);
      commit("GET_SubName", response.data.recordsets[0]);
    } catch (error) {
      console.error("Failed to display Incident:", error);
      throw error;
    }
  },

  async disSubCategory({ commit }) {
    try {
      const response = await axios.get(`${ApiUrl}/forms/SubCategoryForm`);
      commit("GET_SubCategory", response.data.recordsets[0]);
    } catch (error) {
      console.error("Failed to display Sub Category:", error);
      throw error;
    }
  },

  async disDivision({ commit }) {
    try {
      const response = await axios.get(`${ApiUrl}/forms/DivisionForm`);
      commit("GET_Division", response.data.recordsets[0]);
    } catch (error) {
      console.error("Failed to display Division:", error);
      throw error;
    }
  },

  async addIReport({ commit }, formData) {
    try {
      const response = await axios.post(
        `${ApiUrl}/forms/AddIncident`,
        formData
      );
      commit("ADD_IRFORM", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  ////////////////////////////////////////////

  ///////// DASHBOARD //////////////

  async disDashboard({ commit }) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`${ApiUrl}/forms/DisplayDashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit("GET_DASH", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  ////////////////////////////////////////////

  /////////  DIRECTOR TABLE  //////////////////

  async disDirector({ commit }) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`${ApiUrl}/forms/DisplayDirectorForm`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit("GET_DIRECTOR", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async disDirectorIrp({ commit }, data) {
    try {
      const response = await axios.get(`${ApiUrl}/forms/DisplayDirectorIRP`, {
        params: data,
      });
      commit("GET_DIRECTIR", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async addLostRecommendation({ commit }, lostRecom) {
    try {
      const response = await axios.put(
        `${ApiUrl}/forms/AddRecommendationDirector`,
        lostRecom
      );
      commit("ADD_QAFORM", response.data);
    } catch (error) {
      console.error("ERROR", error.response.data);
      throw error;
    }
  },

  ////////////////////////////////////////////

  /////////  ASSISTANTQA TABLE  //////////////////
  async disAssistantQA({ commit }) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${ApiUrl}/forms/DisplayAssistantQASub`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_ASSISTANTQA", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async disAQA({ commit }, data) {
    try {
      const response = await axios.get(`${ApiUrl}/forms/DisplayAQA`, {
        params: data,
      });
      commit("GET_ASSISTANTQAFORM", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async disSubjectCode({ commit }) {
    try {
      const response = await axios.get(`${ApiUrl}/forms/DisplaySubjectCode`);
      commit("GET_ASSISTANTSUBCODE", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async disDivisionCode({ commit }) {
    try {
      const response = await axios.get(`${ApiUrl}/forms/DisplayDivisionCode`);
      commit("GET_ASSISTANTDIVCODE", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async putChangeCode({ commit }, data) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        `${ApiUrl}/forms/PutSubjectCode`,
        {
          params: data,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_ASSISTANTQA", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async putChangeDivision({ commit }, data) {
    try {
      const response = await axios.put(`${ApiUrl}/forms/PutDivisionCode`, {
        params: data,
      });
      commit("GET_ASSISTANTQA", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  ////////////////////////////////////////////

  ///////// REPORT TABLE //////////////

  async disCountSubject({ commit }) {
    try {
      const response = await axios.get(`${ApiUrl}/forms/DisplayCountSubject`);
      commit("GET_CountSub", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async disMatchDepartment({ commit }) {
    try {
      const response = await axios.get(
        `${ApiUrl}/forms/DisplayMatchDepartment`
      );
      commit("GET_CountSub", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async disTotalAction({ commit }) {
    try {
      const response = await axios.get(
        `${ApiUrl}/forms/DisplayTotalActionItem`
      );
      commit("GET_CountSub", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  ////////////////////////////////////////////

  //////////////QATABLE/////////////////
  async disIncQA({ commit }) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`${ApiUrl}/forms/DisplayQAForm`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit("GET_QAFORM", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async disQAs({ commit }) {
    try {
      const response = await axios.get(`${ApiUrl}/forms/DisplayQA`);
      commit("GET_QA", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async disIrp({ commit }, data) {
    try {
      const response = await axios.get(`${ApiUrl}/forms/DisplayIRP`, {
        params: data,
      });
      commit("GET_QAIR", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async AddqaTrans({ commit }, payload) {
    try {
      const response = await axios.post(
        `${ApiUrl}/forms/AddQATransfer`,
        payload
      );
      commit("GET_FORM", response.data);
    } catch (error) {
      console.error("Error updating status:", error.response); // Log the full error response
      throw error;
    }
  },

  async addRCAApproved({ commit }, ApprovedRca) {
    try {
      const response = await axios.post(
        `${ApiUrl}/forms/AddApprovedRCA`,
        ApprovedRca
      );
      commit("ADD_QAFORM", response.data);
    } catch (error) {
      console.error("ERROR", error.response.data);
      throw error;
    }
  },

  async addRCADispproved({ commit }, DispprovedRca) {
    try {
      const response = await axios.post(
        `${ApiUrl}/forms/AddDisApprovedRCA`,
        DispprovedRca
      );
      commit("ADD_QAFORM", response.data);
    } catch (error) {
      console.error("ERROR", error.response.data);
      throw error;
    }
  },

  async disActionItem({ commit }, acttab) {
    try {
      const response = await axios.get(`${ApiUrl}/forms/DisplayActionItem`, {
        params: acttab,
      });
      commit("GET_ACTION", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async putActionStatus({ commit }, payload) {
    try {
      const response = await axios.put(
        `${ApiUrl}/forms/putActionItemStatus`,
        payload
      );
      commit("GET_ACTION", response.data);
    } catch (error) {
      console.error("Error updating status:", error);
      throw error;
    }
  },

  async putQAStatus({ commit }, payload) {
    try {
      const response = await axios.put(`${ApiUrl}/forms/putQADStatus`, payload);
      commit("GET_ACTION", response.data);
    } catch (error) {
      console.error("Error updating status:", error);
      throw error;
    }
  },

  async disPendingRemarks({ commit }, data) {
    try {
      const response = await axios.get(
        `${ApiUrl}/forms//DisplayPendingRemarks`,
        {
          params: data,
        }
      );
      commit("GET_PENREMARKS", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async AddPendingRemarks({ commit }, data) {
    try {
      const response = await axios.post(
        `${ApiUrl}/forms/AddPendingRemarks`,
        data
      );
      commit("GET_FORM", response.data.recordset);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async addEmail({ commit }, addEmail) {
    try {
      const response = await axios.post(
        `${ApiUrl}/forms/AddQADeptEmail`,
        addEmail
      );
      commit("ADD_QAFORM", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async AddCon({ commit }, data) {
    try {
      const response = await axios.post(`${ApiUrl}/forms/AddConclusion`, data);
      commit("GET_FORM", response.data.recordset);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async AddRECon({ commit }, data) {
    try {
      const response = await axios.post(
        `${ApiUrl}/forms/AddREConclusion`,
        data
      );
      commit("GET_FORM", response.data.recordset);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async AddqaRef({ commit }, payload) {
    try {
      const response = await axios.put(
        `${ApiUrl}/forms/AddQARefferal`,
        payload
      );
      commit("GET_FORM", response.data);
    } catch (error) {
      console.error("Error updating status:", error.response); // Log the full error response
      throw error;
    }
  },

  async putRCASub({ commit }, payload) {
    try {
      const response = await axios.put(`${ApiUrl}/forms/PutRCASub`, payload);
      commit("GET_FORM", response.data);
    } catch (error) {
      console.error("Error updating status:", error.response); // Log the full error response
      throw error;
    }
  },

  async putqaIR({ commit }, payload) {
    try {
      const response = await axios.put(`${ApiUrl}/forms/putQADStatus`, payload);
      commit("GET_FORM", response.data);
    } catch (error) {
      console.error("Error updating status:", error.response); // Log the full error response
      throw error;
    }
  },

  async departments({ commit }) {
    try {
      const response = await axios.get(`${ApiUrl}/forms/DepartmentForm`);
      commit("SET_DEPARTMENTS", response.data);
    } catch (error) {
      console.error("Failed to fetch departments:", error);
      throw error;
    }
  },

  //////////////////////////////////////

  ///////// HRTABLE //////////////
  async disInc({ commit }) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`${ApiUrl}/forms/DisplayForm`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit("GET_FORM", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async puthrIR({ commit }, payload) {
    try {
      const response = await axios.put(`${ApiUrl}/forms/puthrStatus`, payload);
      commit("GET_FORM", response.data);
    } catch (error) {
      console.error("Error updating status:", error.response); // Log the full error response
      throw error;
    }
  },

  async disIrpHR({ commit }, data) {
    try {
      const response = await axios.get(`${ApiUrl}/forms/DisplayHRIRP`, {
        params: data,
      });
      commit("GET_QAFORM", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async AddfinLia({ commit }, payload) {
    try {
      const response = await axios.put(
        `${ApiUrl}/forms/AddFinancialLiability`,
        payload
      );
      commit("GET_FORM", response.data);
    } catch (error) {
      console.error("Error updating status:", error.response); // Log the full error response
      throw error;
    }
  },

  async putDisAct({ commit }, payload) {
    try {
      const response = await axios.put(`${ApiUrl}/forms/puthrAct`, payload);
      commit("GET_FORM", response.data);
    } catch (error) {
      console.error("Error updating status:", error.response); // Log the full error response
      throw error;
    }
  },

  async AddNew({ commit }, data) {
    try {
      const response = await axios.post(`${ApiUrl}/forms/AddNote`, data);
      commit("GET_FORM", response.data.recordset);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async AddNoteNew({ commit }, data) {
    try {
      const response = await axios.post(`${ApiUrl}/forms/AddHRNote`, data);
      commit("GET_FORM", response.data.recordset);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async putDem({ commit }, payload) {
    try {
      const response = await axios.put(`${ApiUrl}/forms/InsertDem`, payload);
      commit("GET_FORM", response.data);
    } catch (error) {
      console.error("Error updating status:", error);
      throw error;
    }
  },

  async Employees({ commit }) {
    try {
      const response = await axios.get(`${ApiUrl}/forms/DisEmploForm`);
      commit("SET_EMPLOYEES", response.data);
    } catch (error) {
      console.error("Failed to fetch departments:", error);
      throw error;
    }
  },

  async EmplDem({ commit }, data) {
    try {
      const response = await axios.post(`${ApiUrl}/forms/AddEmplo`, data);
      commit("EMPLOYEE_FORM", response.data.recordset);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async DeptDem({ commit }, data) {
    try {
      const response = await axios.post(`${ApiUrl}/forms/AddDept`, data);
      commit("DEPT_FORM", response.data.recordset);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async codedis({ commit }) {
    try {
      const response = await axios.get(`${ApiUrl}/forms/CodeDisForm`);
      commit("GET_FORM", response.data);
    } catch (error) {
      console.error("Failed to fetch departments:", error);
      throw error;
    }
  },

  async speOfdis({ commit }) {
    try {
      const response = await axios.get(`${ApiUrl}/forms/SpecificOfForm`);
      commit("GET_FORM", response.data);
    } catch (error) {
      console.error("Failed to fetch departments:", error);
      throw error;
    }
  },
  ////////////////////////////////////////////

  ////HRDEMERIT/////

  async disTab({ commit }) {
    try {
      const response = await axios.get(`${ApiUrl}/forms/DisplayTab`);
      commit("GET_FORM", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async disEmpTab({ commit }) {
    try {
      const response = await axios.get(`${ApiUrl}/forms/DisplayEmpTab`);
      commit("GET_FORM", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async disDepTab({ commit }) {
    try {
      const response = await axios.get(`${ApiUrl}/forms/DisplayDepTab`);
      commit("GET_FORM", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  ////////////////////////////////////////

  async disEmployeeDem({ commit }) {
    try {
      const response = await axios.get(`${ApiUrl}/forms/DisplayEmployees`);
      commit("GET_EMPLOYEES", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async disDemerit({ commit }, data) {
    try {
      const response = await axios.get(`${ApiUrl}/forms/DisplayEmpTab`, {
        params: data,
      });
      commit("DEMERIT_FORM", response.data); // Assuming response.data is an array of records
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  ////////////////////////////////////////

  ////////////////////////AUDIT//////////////////////////////
  async disTab({ commit }) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`${ApiUrl}/forms/DisplayTab`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit("GET_FORM", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async disSubjectTab({ commit }) {
    try {
      const response = await axios.get(`${ApiUrl}/forms/DisplaySubjectTab`);
      commit("GET_SUBJECTFORM", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async addSubjectDetails({ commit }, riskdata) {
    try {
      const response = await axios.post(
        `${ApiUrl}/forms/AddSubjectDetails`,
        riskdata
      );
      commit("AUDIT_FORM", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async disDomainCode({ commit }) {
    try {
      const response = await axios.get(`${ApiUrl}/forms/DomainCodeForm`);

      commit("GET_RISKFORM", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async disRiskTab({ commit }) {
    try {
      const response = await axios.get(`${ApiUrl}/forms/DisplayRiskTab`);
      commit("GET_RISKFORM", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async addRiskDictionary({ commit }, riskdic) {
    try {
      const response = await axios.post(`${ApiUrl}/forms/AddRiskDic`, riskdic);
      commit("GET_RISKFORM", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async AddAud({ commit }, data) {
    try {
      const response = await axios.post(`${ApiUrl}/forms/AddAudit`, data);
      commit("ADD_FORM", response.data.recordset);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async putEdNote({ commit }, payload) {
    try {
      const response = await axios.put(`${ApiUrl}/forms/EditNote`, payload);
      commit("AUDIT_FORM", response.data);
    } catch (error) {
      console.error("Error updating status:", error);
      throw error;
    }
  },

  async putNote({ commit }, data) {
    try {
      const response = await axios.put(`${ApiUrl}/forms/DeletedNote`, data);
      commit("AUDIT_FORM", response.data);
    } catch (error) {
      console.error("Error updating status:", error);
      throw error;
    }
  },

  async disNote({ commit }, data) {
    try {
      const response = await axios.get(`${ApiUrl}/forms/DisplayNote`, {
        params: data,
      });
      commit("AUDIT_FORM", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async putauditIR({ commit }, payload) {
    try {
      const response = await axios.put(`${ApiUrl}/forms/Putaudit`, payload);
      commit("GET_FORM", response.data);
    } catch (error) {
      console.error("Error updating status:", error.response); // Log the full error response
      throw error;
    }
  },

  ////////////////////////////////////////
};
