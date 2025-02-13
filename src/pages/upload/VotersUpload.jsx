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
} from "react-bootstrap";
import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";
import staffApi from "../../../api/staffApi";
import { read, utils } from "xlsx";

import Swal from "sweetalert2";
import votersApi from "../../../api/votersApi";

function FinanceUpload() {
  const pondRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [show5, setShow5] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loadingDates, setLoadingDates] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [jsonData, setJsonData] = useState([]);
  const [lastD_T, setLastD_T] = useState();

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

  useEffect(() => {
    getLastUploadD_T();
  }, []);

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
    // const formData = new FormData();
    // formData.append("excelFile", new Blob(files, { type: "application/json" }));

    // setProgress(0);
    // setShow5(progress);
    // const res = await staffApi.importExcelToDB(formData, (progress) =>
    //   setProgress(progress)
    // );
    // setShow5(false);

    // console.log("response", res.data);

    // if (!res.data.success) {
    //   return Swal.fire({
    //     title: "Error!!!",
    //     text: res.data.message,
    //   });
    // }

    // pondRef.current.removeFiles();
    // setFiles([]);
    // getLastUploadD_T();
    // return Swal.fire({
    //   icon: "success",
    //   title: "Success",
    //   text: res.data.message,
    // });

    for (const file of files) {
      try {
        const arrayBuffer = await readFileAsArrayBuffer(file);
        console.log("ArrayBuffer:", arrayBuffer);

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

        // ready to be processed in the backend
        console.log("The final object", modifiedArray);
        setIsLoading(true);
        const res = await votersApi.uploadVoters(modifiedArray);
        setIsLoading(false);

        if (!res.data.success) {
          return Swal.fire({
            title: "Error!!!",
            text: res.data.message,
          });
        }

        pondRef.current.removeFiles();
        setFiles([]);
        getLastUploadD_T();
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
      <Card
        style={{
          padding: 10,
        }}
      >
        <Form.Label className="mt-3">Upload Voters Files</Form.Label>
        <FilePond
          ref={pondRef}
          className="mt-3 mb-3"
          allowMultiple={true}
          maxFiles={50}
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
              disabled={files.length === 0}
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
