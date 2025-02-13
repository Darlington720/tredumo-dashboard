import mainClient from "./client";

const getDashboardData = (campus_id) =>
  mainClient.apiClient.get(`/api/dashboard/main_dashboard/${campus_id}`);

const getStaffGateAttendance = (month, year) =>
  mainClient.apiClient.get(
    `/api/dashboard/staff_gate_attendance/${month}/${year}`
  );

const getLectureReport = (data) =>
  mainClient.apiClient.post(`/api/dashboard/lecture_report`, data);

const load_assigned_rooms = (data) =>
  mainClient.apiClient.post(`/api/dashboard/assigned_rooms`, data);

const getAccYrs = () => mainClient.apiClient.get(`/acc_yrs`);

const apiCalls = {
  getDashboardData,
  getStaffGateAttendance,
  getLectureReport,
  getAccYrs,
  load_assigned_rooms,
};

export default apiCalls;
