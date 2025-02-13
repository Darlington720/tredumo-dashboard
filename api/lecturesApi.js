import mainClient from "./client";

const getLectureInfo = (data) =>
  mainClient.apiClient.post(`/api/lecture/lectureinfo`, data);

const apiCalls = {
  getLectureInfo,
};

export default apiCalls;
