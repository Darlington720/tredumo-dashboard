import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import staffApi from "../../../api/staffApi";
// import Pageheader from "../../Layouts/Pageheader/Pageheader";
import Pageheader from "../../Components/Layouts/Pageheader/Pageheader";

const titles = [
  { value: "MR", label: "MR" },
  { value: "MS", label: "MS" },
  { value: "PROFFESSOR", label: "PROFFESSOR" },
  { value: "DR", label: "DR" },
  { value: "ASSOC PROF", label: "ASSOCIATE PROFFESSOR" },
];

// const roles = [
//   { value: "DEAN", label: "DEAN" },
//   { value: "HEAD OF DEPARTMENT", label: "HEAD OF DEPARTMENT" },
//   { value: "VICE CHANCELLOR", label: "VICE CHANCELLOR" },
//   { value: "ACADEMIC REGISTRAR", label: "ACADEMIC REGISTRAR" },
//   { value: "ADMINISTRATIVE ASSISTANT", label: "ADMINISTRATIVE ASSISTANT" },
// ];

const initialFormState = {
  staff: { value: "", label: "" },
  role: { value: "", label: "" },
  school: { value: "", label: "" },
  campus: { value: "", label: "" },
};

const campuses = [
  { value: 1, label: "MAIN CAMPUS" },
  { value: 2, label: "KAMPALA CAMPUS" },
];
const AssignStaffRole = () => {
  const [data, setData] = useState(initialFormState);
  const { staff, role, school, campus } = data;
  const [staffMembers, setStaffMembers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);

  const getStaffAssignReqs = async () => {
    const response = await staffApi.getStaffAssignReqs();

    if (!response.ok) {
      return alert("Failed to get the neccessary data");
      console.log("response", res.data);
    }

    console.log(response.data);

    const staff = response.data.result.staff.map((member) => ({
      value: member.staff_id,
      label: member.staff_name,
    }));

    const r = response.data.result.roles.map((role) => ({
      value: role.role_id,
      label: role.role_name,
    }));

    const sch = response.data.result.schools.map((sch) => ({
      value: sch.alias,
      label: sch.school_name,
    }));

    setStaffMembers(staff);
    setSchools(sch);
    setRoles(r);
  };

  useEffect(() => {
    getStaffAssignReqs();
  }, []);

  const handleChange = (name, value) => {
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("data", data);
    setLoading(true);
    const res = await staffApi.assignRoleToStaff(data);
    setLoading(false);

    if (!res.ok) {
      alert("error adding new staff role to server");
      return;
    }

    if (!res.data.success) {
      return toast(res.data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    toast(res.data.message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    setData(initialFormState);
  };

  const allowedRoles = [3, 4, 6];

  return (
    <div>
      {/* <Pageheader titles="Staff" active="Add Staff" /> */}

      {/* <!-- container --> */}

      {/* <!-- row --> */}
      <Row className="row-sm justify-content-center">
        <Col lg={6} xl={6} md={12} sm={12}>
          <Card className="box-shadow-0">
            <Card.Header>
              <Card.Title as="h3" className="mb-1">
                Assign Staff Role
              </Card.Title>
              <p className="mb-2"></p>
            </Card.Header>
            <Card.Body className="pt-0">
              <Form className="form-horizontal" onSubmit={handleSubmit}>
                <Form.Group
                  style={{
                    marginBottom: 10,
                    marginTop: 0,
                  }}
                >
                  {/* <Form.Control
                    className="mb-3"
                    type="text"
                    id="inputName"
                    placeholder="Title"
                  /> */}
                  <label>Staff Name</label>
                  <Select
                    classNamePrefix="Select-sm"
                    name="staff"
                    required
                    value={data["staff"]}
                    onChange={(value) => handleChange("staff", value)}
                    options={staffMembers}
                    placeholder="Staff Name"
                  />
                </Form.Group>
                <Form.Group
                  style={{
                    marginBottom: 10,
                    marginTop: 0,
                  }}
                >
                  {/* <Form.Control
                    className="mb-3"
                    type="text"
                    id="inputName"
                    placeholder="Title"
                  /> */}
                  <label>Role</label>
                  <Select
                    classNamePrefix="Select-sm"
                    name="role"
                    required
                    value={role}
                    onChange={(value) => handleChange("role", value)}
                    options={roles}
                    placeholder="Role"
                  />
                </Form.Group>

                {allowedRoles.includes(role.value) ? null : (
                  <>
                    <label>School</label>
                    <Form.Group
                      style={{
                        marginBottom: 10,
                        marginTop: 0,
                      }}
                    >
                      {/* <Form.Control
                    className="mb-3"
                    type="text"
                    id="inputName"
                    placeholder="Title"
                  /> */}
                      <Select
                        classNamePrefix="Select-sm"
                        name="school"
                        required
                        value={school}
                        onChange={(value) => handleChange("school", value)}
                        options={schools}
                        placeholder="School"
                      />
                    </Form.Group>
                  </>
                )}
                <label>Campus</label>
                <Form.Group
                  style={{
                    marginBottom: 10,
                    marginTop: 0,
                  }}
                >
                  <Select
                    classNamePrefix="Select-sm"
                    name="campus"
                    required
                    value={campus}
                    onChange={(value) => handleChange("campus", value)}
                    options={campuses}
                    placeholder="Campus"
                  />
                </Form.Group>

                <Form.Group className="mb-0 mt-3 justify-content-end">
                  <div>
                    <Button
                      variant="primary"
                      className=""
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Saving" : "Save"}
                    </Button>
                  </div>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <ToastContainer />
    </div>
  );
};

export default AssignStaffRole;
