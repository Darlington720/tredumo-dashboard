import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  Form,
  Button,
  Col,
  Alert,
  ProgressBar,
  Modal,
  Spinner,
  Row,
} from "react-bootstrap";
import { FilePond } from "react-filepond";
import Select from "react-select";
import "filepond/dist/filepond.min.css";
import staffApi from "../../../api/staffApi";
import Swal from "sweetalert2";
import { read, utils } from "xlsx";
import socket from "../../../api/socketIOClient";
import dashboardApi from "../../../api/dashboardApi";

const sem = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
];

function FinanceUpload() {
  const pondRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [show5, setShow5] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loadingDates, setLoadingDates] = useState();
  const [lastD_T, setLastD_T] = useState();
  const [selectedSem, setSelectedSem] = useState("");
  const [selectedAccYr, setSelectedAccYr] = useState("");
  const [acc_yrs, setAccYrs] = useState();
  // get last upload date and time
  const getLastUploadD_T = async () => {
    setLoadingDates(true);
    const res = await staffApi.lastUploadDate();
    setLoadingDates(false);
    if (!res.ok) {
      return console.log(
        "Error in fetching the last upload date and time",
        res.data.data
      );
    }

    setLastD_T(res.data.data.upload_date);

    // console.log(res.data);
  };

  const getAccYrs = async () => {
    const res = await dashboardApi.getAccYrs();

    if (!res.ok) {
      return alert("Failed to fetch acc_yrs");
    }

    console.log(res.data);
    setAccYrs(
      res.data.map((yr) => ({
        value: yr.id,
        label: yr.acc_yr,
      }))
    );
  };

  useEffect(() => {
    getLastUploadD_T();
    getAccYrs();
  }, []);

  // const handleUpload = async () => {
  //   const formData = new FormData();
  //   formData.append("excelFile", new Blob(files, { type: "application/json" }));
  //   setProgress(0);
  //   setShow5(progress);
  //   const res = await staffApi.importExcelToDB(formData, (progress) =>
  //     setProgress(progress)
  //   );
  //   setShow5(false);

  //   console.log("response", res.data);

  //   if (!res.data.success) {
  //     return Swal.fire({
  //       title: "Error!!!",
  //       text: res.data.message,
  //     });
  //   }

  //   pondRef.current.removeFiles();
  //   setFiles([]);
  //   getLastUploadD_T();
  //   return Swal.fire({
  //     icon: "success",
  //     title: "Success",
  //     text: res.data.message,
  //   });
  // };

  const readFileAsArrayBuffer = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        // e.target.result contains the ArrayBuffer
        const arrayBuffer = e.target.result;
        resolve(arrayBuffer);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsArrayBuffer(file);
    });
  };

  const handleUpload = async () => {
    for (const file of files) {
      try {
        const arrayBuffer = await readFileAsArrayBuffer(file);
        // console.log("ArrayBuffer:", arrayBuffer);

        const wb = read(arrayBuffer); // parse the array buffer
        // console.log("the workbook", wb);
        // for (let i = 0; i < wb.SheetNames.length; i++) {
        const ws = wb.Sheets[wb.SheetNames[0]]; // get the first worksheet
        const data = utils.sheet_to_json(ws); // generate objects

        const modifiedArray = data.map((obj) => {
          const newObj = {};
          for (const key in obj) {
            let filteredKey = key.replace(/"/g, "");
            newObj[filteredKey] = obj[key].replace(/"/g, "");
          }
          return newObj;
        });

        const dataToBeSent = {
          acc_yr_id: selectedAccYr.value,
          sem: selectedSem.value,
          students: modifiedArray,
        };

        console.log("modified array", dataToBeSent);

        // ready to be processed in the backend
        // console.log("The final object", modifiedArray);
        setIsLoading(true);
        const res = await staffApi.importExcelToDB(dataToBeSent);
        setIsLoading(false);

        // console.log("response", res);
        if (!res.ok) {
          console.log("errror", res.problem);
          return alert("Failed to upload file");
        }
        if (!res.data.success) {
          return Swal.fire({
            title: "Error!!!",
            text: res.data.message,
          });
        }

        pondRef.current.removeFiles();
        setFiles([]);
        getLastUploadD_T();
        // console.log("response", res.data);

        socket.emit("update_elligible_voters_from_upload", {
          elligible_voters:
            res.data.result.elligibleVoters + res.data.result.exemptedStudents,
        });
        return Swal.fire({
          icon: "success",
          title: "Success",
          text: res.data.message,
        });
      } catch (error) {
        console.error("Error reading file:", error);
      }
    }
  };

  return (
    <div>
      <Form
      // onSubmit={handleSubmit}
      >
        <Row
          className="row-sm center"
          style={{
            // backgroundColor: "red",
            marginBottom: 20,
          }}
        >
          <Col lg={2}>
            <label className="lb">Acc Yr</label>

            <Select
              classNamePrefix="Select-sm"
              required
              value={selectedAccYr}
              onChange={(value) => setSelectedAccYr(value)}
              options={acc_yrs}
              placeholder="Select acc yr"
            />
          </Col>
          <Col lg={2}>
            <label className="lb">Sem</label>
            <Select
              classNamePrefix="Select-sm"
              required
              value={selectedSem}
              onChange={(value) => setSelectedSem(value)}
              options={sem}
              placeholder="Select sem"
            />
          </Col>
        </Row>
      </Form>
      <Card
        style={{
          padding: 10,
        }}
      >
        <Form.Label className="mt-3">Upload Excel files here</Form.Label>
        <FilePond
          ref={pondRef}
          className="mt-3 mb-3"
          allowMultiple={true}
          maxFiles={1}
          acceptedFileTypes={["csv"]}
          name="excelFile"
          onupdatefiles={(files) => {
            // console.log("Files", files);
            setFiles(files.map((f) => f.file));
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Col sm={6} md={2} className="mg-t-10 mg-sm-t-0 justify-center">
            <Button
              variant="primary"
              className="btn-block"
              disabled={
                files.length === 0 ||
                !selectedAccYr ||
                !selectedSem ||
                isLoading
              }
              onClick={handleUpload}
            >
              {isLoading ? (
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
                "Upload"
              )}
            </Button>
          </Col>
        </div>
      </Card>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Alert
          variant="primary"
          style={{
            padding: 5,
            alignSelf: "center",
          }}
        >
          Last Update Date:
          {loadingDates ? (
            <Spinner animation="grow" className="" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          ) : (
            new Date(lastD_T).toLocaleString()
          )}
        </Alert>
      </div>

      <Modal show={show5} backdrop="static" centered>
        <Modal.Body className="text-center p-2 pb-0">
          <h4 style={{ textAlign: "center" }}>Progress (%)</h4>
          <ProgressBar
            className="h-8"
            variant="primary"
            now={progress * 100}
            label={`${(progress * 100).toFixed(2)}%`}
          />
          <div
            style={{
              margin: 10,
            }}
          >
            <h6>Please wait...</h6>
            {/* <Button
              className="me-2"
              variant="primary"
              onClick={() => setShow5(false)}
            >
              Save Changes
            </Button> */}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default FinanceUpload;
