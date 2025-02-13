import mainClient from "./client";

const addConstraint = (constraint) =>
  mainClient.apiClient.post("/api/dashboard/addConstraint", constraint);

const updateConstraint = (constraint) =>
  mainClient.apiClient.post("/api/dashboard/updateConstraint", constraint);

const getContraints = () =>
  mainClient.apiClient.get("/api/gate/constraintList");

const apiCalls = {
  addConstraint,
  getContraints,
  updateConstraint,
};

export default apiCalls;
