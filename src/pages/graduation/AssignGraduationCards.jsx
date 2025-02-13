import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import Pageheader from "../../Layouts/Pageheader/Pageheader";
import { Toast } from "primereact/toast";
import { Dropdown } from "primereact/dropdown";
import { AutoComplete } from "primereact/autocomplete";
import { CountryService } from "./service/CountryService";
import graduationApi from "../../../api/graduationApi";
import { useContext } from "react";
import StateContext from "../../context/context";
import { useRef } from "react";

const initialFormState = {
  staff_id: "",
  staff_name: "",
  title: "",
  role: "",
};
const AssignGraduationCards = () => {
  const toast = useRef(null);
  const stateContext = useContext(StateContext);
  const [data, setData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [studentLoading, setStudentLoading] = useState(false);
  const [graduationCards, setGraduationCards] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [students, setStudents] = useState([]);

  const items = Array.from({ length: 100000 }).map((_, i) => ({
    label: `Item #${i}`,
    value: i,
  }));
  const [countries, setCountries] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState(null);

  const getGraduationCards = async (acc_yr) => {
    setLoading(true);
    const res = await graduationApi.getGraduationCards(acc_yr);
    setLoading(false);

    if (!res.ok) {
      console.log("error", res.data);
      return alert("Unexpected Error");
    }

    // console.log("response", res.data)
    const modifiedData = res.data.result.map((card) => ({
      value: card,
      label: card.card_no,
    }));

    setGraduationCards(modifiedData);
  };

  const search = async (event) => {
    // Timeout to emulate a network connection
    setStudentLoading(true);
    const response = await graduationApi.getStudentAutoComplete(
      event.query.toLowerCase()
    );
    setStudentLoading(false);

    if (!response.ok) {
      console.log("student error", response.data);
      return alert("Failed to get Student");
    }

    // console.log("suggestions", response.data.suggestions);
    setStudents(response.data.suggestions);

    // setTimeout(() => {
    //   let _filteredCountries;

    //   if (!event.query.trim().length) {
    //     _filteredCountries = [...countries];
    //   } else {
    //     _filteredCountries = countries.filter((country) => {
    //       return country.name
    //         .toLowerCase()
    //         .startsWith(event.query.toLowerCase());
    //     });
    //   }

    //   setFilteredCountries(_filteredCountries);
    // }, 250);
  };

  useEffect(() => {
    CountryService.getCountries().then((data) => setCountries(data));
    getGraduationCards(2023);
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    const data = {
      card_no: selectedItem.card_no,
      stu_no: selectedStudent.stdno,
      assigned_by: stateContext.user.stu_no,
    };
    console.log("this is what am saving", {
      card_no: selectedItem.card_no,
      stu_no: selectedStudent.stdno,
      assigned_by: stateContext.user.stu_no,
    });

    setSaveLoading(true);
    const response = await graduationApi.saveGraduationCard(data);

    if (!response.ok) {
      setSaveLoading(false);
      if (response.data.message) {
        return alert(response.data.message);
      } else {
        console.log(response.data);
        return alert("Failed to save the graduation card");
      }
    }

    getGraduationCards(2023);
    setSaveLoading(false);
    if (response.data.success) {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: response.data.message,
        life: 3000,
      });
    }

    setSelectedItem(null);
    setSelectedStudent(null);
  };

  return (
    <div>
      {/* <Pageheader titles="Staff" active="Add Staff" /> */}

      {/* <!-- container --> */}

      {/* <!-- row --> */}
      <Toast ref={toast} />
      <Row className="row-sm justify-content-center">
        <Col lg={6} xl={6} md={12} sm={12}>
          <Card className="box-shadow-0 ">
            <Card.Header>
              <Card.Title as="h4" className="mb-1">
                Assign Graduation Cards
              </Card.Title>
              <p className="mb-2">
                Assigned cards are automatically disabled, and you can check
                their status in the
                <Link to="/gradcardanalysis"> graduation reports.</Link>
              </p>
            </Card.Header>
            <Card.Body className="pt-0">
              <Form onSubmit={handleSave}>
                <div className="">
                  <Form.Group>
                    <Form.Label className="mb-2">Card Number</Form.Label>
                    <Dropdown
                      value={selectedItem}
                      required
                      onChange={(e) => setSelectedItem(e.value)}
                      optionDisabled={(option) => {
                        // console.log("the option", option);
                        if (option.value.stu_no) {
                          return true;
                        }
                      }}
                      options={graduationCards}
                      filter
                      virtualScrollerOptions={{ itemSize: 38 }}
                      placeholder="Choose Card Number"
                      style={{
                        width: "100%",
                      }}
                      className="mb-3"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="mb-2">Student</Form.Label>

                    <AutoComplete
                      field={(value) => {
                        // console.log("my value", value);
                        return `${value.name} - ${value.program_level}`;
                      }}
                      value={selectedStudent}
                      required
                      suggestions={students}
                      completeMethod={search}
                      onChange={(e) => {
                        // console.log("the value", e.value);
                        setSelectedStudent(e.value);
                      }}
                      className="p-autocomplete"
                    />
                  </Form.Group>
                </div>
                <Button type="submit" variant="primary" className="mt-3 mb-0">
                  {saveLoading ? (
                    <Spinner
                      animation="border"
                      size="sm"
                      className=""
                      role="status"
                      aria-hidden="true"
                    >
                      <span className="sr-only">Loading...</span>
                    </Spinner>
                  ) : (
                    "Save"
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AssignGraduationCards;
