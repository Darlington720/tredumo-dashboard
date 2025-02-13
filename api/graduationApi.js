import mainClient from "./client";

const getGraduationCards = (acc_yr) =>
  mainClient.apiClient.get(`/api/graduation/graduation_cards/${acc_yr}`);

const getStudentAutoComplete = (query) =>
  mainClient.apiClient.get(`/api/graduation/student_autocomplete/${query}`);

const saveGraduationCard = (data) =>
  mainClient.apiClient.post("/api/graduation/save_student_card", data);

const getGraduationCardsReport = (acc_yr) =>
  mainClient.apiClient.get(`/api/graduation/graduation_card_report/${acc_yr}`);

const apiCalls = {
  getGraduationCards,
  getStudentAutoComplete,
  saveGraduationCard,
  getGraduationCardsReport,
};

export default apiCalls;
