import mainClient from "./client";

const getStaffByDate = (data) =>
  mainClient.apiClient.post(`/api/dashboard/staffbydate`, data);

const getAllStaffMembers = () => mainClient.apiClient.get(`/staff`);

const addStaff = (data) =>
  mainClient.apiClient.post(`/api/lecturer/addStaff`, data);

const importExcelToDB = (data) =>
  mainClient.apiClient3.post("/api/upload/importExceltodb", data);

const login = (loginDetails) =>
  mainClient.apiClient.post("/api/auth/login", loginDetails);

const getStaffAssignReqs = () =>
  mainClient.apiClient.get(`/api/lecturer/staff_assignment_reqs`);

const assignRoleToStaff = (data) =>
  mainClient.apiClient.post("/api/lecturer/assignStaffRole", data);

const lastUploadDate = () =>
  mainClient.apiClient.get(`/api/upload/lastUploadDateForFees`);

const getExamTTReqs = () =>
  mainClient.apiClient.get(`/api/timetable/requirements/exam_tt`);

const getAssignInvReqs = () =>
  mainClient.apiClient.get(`/api/timetable/requirements/assign_inv`);

const getExamsInRoom = (data) =>
  mainClient.apiClient.post("/api/timetable/examsInRoom", data);

const getStudentsInCU = (id) =>
  mainClient.apiClient.get(`/api/dashboard/students_in_exam/${id}`);

const addInvigilators = (data) =>
  mainClient.apiClient.post("/api/dashboard/addInvigilator", data);

const addExamTT = (data) =>
  mainClient.apiClient.post("/api/timetable/addExamTimetable", data);

const getModules = (stdno, study_yr, sem, progcode) =>
  mainClient.apiClient2.post("/bridge", {
    action: "portal",
    method: "load_modules",
    data: [
      {
        stdno,
        study_yr,
        sem,
        progcode,
        // progvsn: "V2020",
        page: 1,
        start: 0,
        limit: 25,
      },
    ],
    type: "rpc",
    tid: 25,
  });

const addNewModule = (data) =>
  mainClient.apiClient.post("/api/timetable/save_new_module", data);

const examReportReqs = () =>
  mainClient.apiClient.get(`/api/exams/exam_report_reqs`);

const apiCalls = {
  getStaffByDate,
  getAllStaffMembers,
  addStaff,
  login,
  getStaffAssignReqs,
  assignRoleToStaff,
  importExcelToDB,
  lastUploadDate,
  getExamTTReqs,
  addExamTT,
  getAssignInvReqs,
  getExamsInRoom,
  addInvigilators,
  getModules,
  addNewModule,
  examReportReqs,
  getStudentsInCU,
};

export default apiCalls;
