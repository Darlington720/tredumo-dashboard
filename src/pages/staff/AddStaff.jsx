import React, { useState } from "react";
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

const initialFormState = {
  staff_id: "",
  staff_name: "",
  title: "",
  role: "",
};
const AddStaff = () => {
  const [data, setData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("data", data);
    setLoading(true);
    const res = await staffApi.addStaff(data);
    setLoading(false);

    if (!res.ok) {
      alert("error adding new staff to server");
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
                Add New Staff
              </Card.Title>
              <p className="mb-2"></p>
            </Card.Header>
            <Card.Body className="pt-0">
              <Form className="form-horizontal" onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Control
                    className="mb-3"
                    type="text"
                    name="staff_id"
                    id="inputName"
                    value={data["staff_id"]}
                    onChange={(e) => handleChange("staff_id", e.target.value)}
                    required
                    placeholder="Staff id"
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
                  <Select
                    classNamePrefix="Select-sm"
                    name="title"
                    required
                    value={data["title"]}
                    onChange={(value) => handleChange("title", value)}
                    options={titles}
                    placeholder="Title"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Control
                    className="mb-3"
                    type="text"
                    id="inputName"
                    name="staff_name"
                    required
                    value={data["staff_name"]}
                    onChange={(e) => handleChange("staff_name", e.target.value)}
                    placeholder="Staff Name"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Control
                    className="mb-3"
                    type="text"
                    id="inputName"
                    required
                    value={data["role"]}
                    onChange={(e) => handleChange("role", e.target.value)}
                    placeholder="Role"
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

export default AddStaff;
