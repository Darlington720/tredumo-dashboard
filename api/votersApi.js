import mainClient from "./client";

const uploadVoters = (data) =>
  mainClient.apiClient.post("/api/upload/votersUpload", data);

const getElectionStatistics = (campus) =>
  mainClient.apiClient.get(`/api/voting/election_statistics/${campus}`);

const getElectionCategories = (data) =>
  mainClient.apiClient.post(`/api/voting/election_categories`, data);

const loadElectionContestants = (data) =>
  mainClient.apiClient.post("/api/voting/election_contestants", data);

const saveVoteAllocations = (data) =>
  mainClient.apiClient.post("/api/voting/vote_allocations", data);

const saveVoteExemptions = (data) =>
  mainClient.apiClient.post("/api/voting/save_vote_exemptions", data);

const getExemptedStudents = (campus) =>
  mainClient.apiClient.get(`/api/voting/exempted_students`);

const apiCalls = {
  uploadVoters,
  getElectionStatistics,
  getElectionCategories,
  loadElectionContestants,
  saveVoteAllocations,
  saveVoteExemptions,
  getExemptedStudents,
};

export default apiCalls;
