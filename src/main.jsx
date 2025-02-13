import React, { Fragment, lazy, useState } from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { Route, Routes, MemoryRouter } from "react-router-dom";
import StateContext from "./context/context";
import "./index.scss";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Loader from "./Components/Layouts/Loader/Loader";
// import Loader from './Components/Authentication';
const SignIn = lazy(() => import("./Components/Authentication/SignIn"));
// const Indexpage = lazy(() => import("./Components/indexpage/Indexpage"));
// const Constraints = lazy(() => import("./Components/Constraints/Constraints"));
const Timetable = lazy(() => import("./Components/Timetable/Timetable"));

const Examtt = lazy(() => import("./Components/Timetable/Examtt"));
const Classtt = lazy(() => import("./Components/Timetable/Classtt"));
const Profile = lazy(() => import("./Components/profile/Profile"));
const Logout = lazy(() => import("./Components/logout/Logout"));
const SignUp = lazy(() => import("./Components/Authentication/SignUp"));

const AddExamtt = lazy(() => import("./Components/Timetable/AddExamtt"));
const AddClasstt = lazy(() => import("./Components/Timetable/AddClasstt"));
const Lectures = lazy(() => import("./pages/lectures/Lectures"));
const MissedLectures = lazy(() =>
  import("./pages/missed_lectures/MissedLectures")
);
const NotStartedLectures = lazy(() =>
  import("./pages/not_started/NotStartedLectures")
);

const StaffEntrance = lazy(() => import("./pages/staff/StaffEntrance"));
const AddStaff = lazy(() => import("./pages/staff/AddStaff"));
const Staff = lazy(() => import("./pages/staff/Staff"));
const AssignStaffRole = lazy(() => import("./pages/staff/AssignStaffRole"));
const FinanceUpload = lazy(() => import("./pages/upload/FinanceUpload"));
const VotersUpload = lazy(() => import("./pages/upload/VotersUpload"));

const AssignInvigilators = lazy(() =>
  import("./pages/exams/AssignInvigilators")
);
const ExamsTimetable = lazy(() => import("./pages/exams/ExamsTimetable"));
const AddExamTimeTable = lazy(() => import("./pages/exams/AddExamTimeTable"));
const ExamsDashboard = lazy(() => import("./pages/exams/ExamsDashboard"));
const ExamsReport = lazy(() => import("./pages/exams/ExamsReport"));
const InvigilatorsReport = lazy(() =>
  import("./pages/exams/InvigilatorsReport")
);
const ExamRooms = lazy(() => import("./pages/exams/ExamRooms"));
const Malpractice = lazy(() => import("./pages/exams/Malpractice"));
// const LectureReport = lazy(() =>
//   import("./pages/reports/lectures/LectureReport")
// );
// const StaffAtt = lazy(() => import("./pages/reports/attendance/StaffAtt"));

// import Malpractice from "./pages/exams/Malpractice";
import LectureReport from "./pages/reports/lectures/LectureReport";
import StaffAtt from "./pages/reports/attendance/StaffAtt";
import VoteAllocation from "./pages/elections/VoteAllocation";
import RecordVoters from "./pages/elections/RecordVoters";

// import AssignInvigilators from "./pages/exams/AssignInvigilators";
// import ExamsTimetable from "./pages/exams/ExamsTimetable";
// import AddExamTimeTable from "./pages/exams/AddExamTimeTable";
// import ExamsDashboard from "./pages/exams/ExamsDashboard";
// import ExamsReport from "./pages/exams/ExamsReport";

// import StaffEntrance from "./pages/staff/StaffEntrance";
// import AddStaff from "./pages/staff/AddStaff";
// import Staff from "./pages/staff/Staff";
// import AssignStaffRole from "./pages/staff/AssignStaffRole";
// import FinanceUpload from "./pages/upload/FinanceUpload";

// import AddExamtt from "./Components/Timetable/AddExamtt";
// import AddClasstt from "./Components/Timetable/AddClasstt";
// import Lectures from "./pages/lectures/Lectures";
// import MissedLectures from "./pages/missed_lectures/MissedLectures";
// import NotStartedLectures from "./pages/not_started/NotStartedLectures";

// import SignIn from "./Components/Authentication/SignIn";
import Indexpage from "./Components/indexpage/Indexpage";
// import Assessments from "./Components/Assessments/Assessments";
import Constraints from "./Components/Constraints/Constraints";
import VoteAssigning from "./pages/elections/VoteAssigning";
import UniversityElections from "./pages/elections/UniversityElections";
import VotingExemption from "./pages/elections/VotingExemption";
// import InvigilatorsReport from "./pages/exams/InvigilatorsReport";
// import Timetable from "./Components/Timetable/Timetable";
// import Examtt from "./Components/Timetable/Examtt";
// import Classtt from "./Components/Timetable/Classtt";
// import Profile from "./Components/profile/Profile";
// import Logout from "./Components/logout/Logout";
// import FirebaseAuth from "./Components/Authentication/FirebaseAuth";
// import SignUp from "./Components/Authentication/SignUp";
// import RegUnder from "./Components/Registration/indexpage";
// import RegPHD from "./Components/Registration/indexpage1";
// import RegPOST from "./Components/Registration/indexpage2";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";

// const Indexpage = lazy(() => import('./Components/indexpage/Indexpage'));

//Widgets
// const Widgets = lazy(() => import('./Components/Widgets/Widgets'));

// const AdmissionForms = lazy(() => import('./Components/admissionForms/AdmissionForms'));

// const ChangePassword = lazy(() => import('./Components/changePassword/ChangePassword'));

// const Profile = lazy(() => import('./Components/profile/Profile'));

// const Logout = lazy(() => import('./Components/logout/Logout'));

const AssignGraduationCards = lazy(() =>
  import("./pages/graduation/AssignGraduationCards")
);
const GraduationCardReports = lazy(() =>
  import("./pages/graduation/GraduationCardReports")
);

const c = [
  { id: 1, name: "MAIN CAMPUS" },
  { id: 2, name: "KAMPALA CAMPUS" },
];
const generalRoles = [3, 4];

const _user = {
  id: 24,
  userfull_name: "Jude Lubega",
  username: "NUA213",
  email: "JudeLubega@gmail.com",
  gendar: null,
  phoneNo: null,
  DOB: null,
  Address: null,
  user_image: "NUA213",
  role: "Vice Chancellor",
  stu_no: "NUA213",
  stu_status: 0,
  is_class_rep: 0,
  for_wc: null,
  token: null,
  access_id: "2000101759",
  access_pwd: "5c1d0343f6b41d29fc5be4e2a0db4630",
  assignedRole: {
    staff_role_id: 3,
    staff_id: "NUA213",
    role: "3",
    for_wc_sch: "SCI",
    campus_id: 1,
    role_id: 3,
    role_name: "VICE CHANCELLOR",
  },
  imageUrl: "http://199.241.139.118:9000/assets/NUA213",
  active_auth:
    "428a196e57d848bd12df32cc7bcd6306e2e93503001f710798816f3489906765328113c385e9399e2c82fd9f9963ebeea40de28bd8d2c771d161b8c0400b9a04",
};

const Main = () => {
  const [user, setUser] = useState(_user);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [campus, setCampus] = useState(c[0]);
  const [realTime, setRealTime] = useState(false);
  const [data, setData] = useState();
  const [generalRoleIds, setGeneralRoles] = useState(generalRoles);
  const [activeElection, setActiveElection] = useState();

  return (
    <Fragment>
      <MemoryRouter>
        <StateContext.Provider
          value={{
            data,
            setData,
            isLoggedIn,
            setIsLoggedIn,
            campus,
            setCampus,
            realTime,
            setRealTime,
            user,
            setUser,
            generalRoleIds,
            setGeneralRoles,
            activeElection,
            setActiveElection,
          }}
        >
          <React.Suspense fallback={<Loader />}>
            <Routes>
              {/* Components Routes */}
              <Route path="" element={<SignIn />}>
                <Route index element={<SignIn />} />
                <Route path="admissionsignin" element={<SignIn />} />
                <Route path="admissionsignup" element={<SignUp />} />
              </Route>

              <Route path="" element={<App />}>
                <Route index element={<Indexpage />} />
                {/* Main */}
                <Route path="indexpage" element={<Indexpage />} />
                {/* <Route path="reg-under" element={<RegUnder />} />
              <Route path="reg-phd" element={<RegPHD />} />
              <Route path="reg-post" element={<RegPOST />} /> */}
                {/* Widgets */}
                {/* <Route path="widgets" element={<Widgets />} /> */}
                {/* <Route path="assessments" element={<Assessments />} /> */}
                <Route path="constraints" element={<Constraints />} />

                <Route path="profile" element={<Profile />} />
                <Route path="logout" element={<Logout />} />
                <Route path="timetable" element={<Timetable />} />
                <Route path="examtt" element={<Examtt />} />
                <Route path="classtt" element={<Classtt />} />
                <Route path="addexamtt" element={<AddExamtt />} />
                <Route path="addclasstt" element={<AddClasstt />} />
                <Route path="lectures" element={<Lectures />} />
                <Route path="missed-lectures" element={<MissedLectures />} />
                <Route path="notstarted" element={<NotStartedLectures />} />
                <Route path="staff" element={<Staff />} />
                <Route path="staffentrance" element={<StaffEntrance />} />
                <Route path="addstaff" element={<AddStaff />} />
                <Route path="assignstaffrole" element={<AssignStaffRole />} />
                <Route path="financeupload" element={<FinanceUpload />} />
                <Route
                  path="assigninvigilators"
                  element={<AssignInvigilators />}
                />
                <Route path="examstimetable" element={<ExamsTimetable />} />
                <Route path="addexamtimetable" element={<AddExamTimeTable />} />
                <Route path="examsdashboard" element={<ExamsDashboard />} />
                <Route path="examsreport" element={<ExamsReport />} />
                <Route path="inv_report" element={<InvigilatorsReport />} />
                <Route path="exam_rooms" element={<ExamRooms />} />
                <Route path="malpractice" element={<Malpractice />} />
                <Route path="lectureReports" element={<LectureReport />} />
                <Route path="staffAttReports" element={<StaffAtt />} />
                <Route
                  path="assigngradcards"
                  element={<AssignGraduationCards />}
                />
                <Route
                  path="gradcardanalysis"
                  element={<GraduationCardReports />}
                />
                <Route path="votersUpload" element={<VotersUpload />} />
                <Route path="recordvoters" element={<RecordVoters />} />
                <Route path="voteallocation" element={<VoteAllocation />} />
                <Route path="voteassigning" element={<VoteAssigning />} />
                <Route path="elections" element={<UniversityElections />} />
                <Route path="votingexemption" element={<VotingExemption />} />
              </Route>
            </Routes>
          </React.Suspense>
        </StateContext.Provider>
      </MemoryRouter>
    </Fragment>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
