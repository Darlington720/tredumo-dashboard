import mainClient from "./client";

const getClassTTReqs = (campus_id) =>
  mainClient.apiClient.get(`/api/timetable/reqs/class_tt`);

const getLectureTimetable = (data) =>
  mainClient.apiClient.post(`/api/timetable/lecture_timetable`, data);

const saveLectureTimetable = (data) =>
  mainClient.apiClient.post(`/api/timetable/addClassTimetable`, data);

const updateLectureTimetable = (data) =>
  mainClient.apiClient.post(`/api/timetable/edit_lecture_tt`, data);

const deleteCuFromTT = (data) =>
  mainClient.apiClient.delete(`/api/timetable/delete_tt_cu/${data}`);

const apiCalls = {
  getClassTTReqs,
  getLectureTimetable,
  saveLectureTimetable,
  updateLectureTimetable,
  deleteCuFromTT,
};

export default apiCalls;
