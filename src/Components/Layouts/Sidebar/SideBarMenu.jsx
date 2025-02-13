// const isProd = process.env.NODE_ENV == 'production'

export const MENUITEMS = [
  {
    // menutitle: "MAIN",
    Items: [
      {
        path: `${import.meta.env.BASE_URL}indexpage`,
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="side-menu__icon"
            viewBox="0 0 24 24"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path
              d="M5 5h4v6H5zm10 8h4v6h-4zM5 17h4v2H5zM15 5h4v2h-4z"
              opacity=".3"
            />
            <path d="M3 13h8V3H3v10zm2-8h4v6H5V5zm8 16h8V11h-8v10zm2-8h4v6h-4v-6zM13 3v6h8V3h-8zm6 4h-4V5h4v2zM3 21h8v-6H3v6zm2-4h4v2H5v-2z" />
          </svg>
        ),
        badge: "badge bg-success text-light",
        type: "link",
        active: false,
        selected: false,
        title: "Dashboard",
      },
      // {
      //   path: `${import.meta.env.BASE_URL}assessments`,
      //   icon: (
      //     <svg
      //       xmlns="http://www.w3.org/2000/svg"
      //       className="side-menu__icon"
      //       viewBox="0 0 24 24"
      //     >
      //       <path d="M0 0h24v24H0V0z" fill="none" />
      //       <path
      //         d="M5 5h4v6H5zm10 8h4v6h-4zM5 17h4v2H5zM15 5h4v2h-4z"
      //         opacity=".3"
      //       />
      //       <path d="M3 13h8V3H3v10zm2-8h4v6H5V5zm8 16h8V11h-8v10zm2-8h4v6h-4v-6zM13 3v6h8V3h-8zm6 4h-4V5h4v2zM3 21h8v-6H3v6zm2-4h4v2H5v-2z" />
      //     </svg>
      //   ),
      //   badge: "badge bg-success text-light",
      //   type: "link",
      //   active: false,
      //   selected: false,
      //   title: "Assesments",
      // },
      {
        path: `${import.meta.env.BASE_URL}constraints`,
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="side-menu__icon"
            viewBox="0 0 24 24"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path
              d="M5 5h4v6H5zm10 8h4v6h-4zM5 17h4v2H5zM15 5h4v2h-4z"
              opacity=".3"
            />
            <path d="M3 13h8V3H3v10zm2-8h4v6H5V5zm8 16h8V11h-8v10zm2-8h4v6h-4v-6zM13 3v6h8V3h-8zm6 4h-4V5h4v2zM3 21h8v-6H3v6zm2-4h4v2H5v-2z" />
          </svg>
        ),
        badge: "badge bg-success text-light",
        type: "link",
        active: false,
        selected: false,
        title: "Constraints",
        access_ids: [3, 4],
      },

      {
        title: "Lectures",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="side-menu__icon"
            viewBox="0 0 24 24"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path
              d="M19 5H5v14h14V5zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"
              opacity=".3"
            />
            <path d="M3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2zm2 0h14v14H5V5zm2 5h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z" />
          </svg>
        ),
        type: "sub",
        active: false,
        children: [
          {
            path: `${import.meta.env.BASE_URL}lectures`,
            type: "link",
            active: false,
            selected: false,
            title: "Lectures",
          },

          {
            path: `${import.meta.env.BASE_URL}classtt`,
            type: "link",
            active: false,
            selected: false,
            title: "Lecture Timetable",
          },
          {
            path: `${import.meta.env.BASE_URL}addexamtt`,
            type: "link",
            active: false,
            selected: false,
            title: "Add Exam Timetable",
          },
          {
            path: `${import.meta.env.BASE_URL}addclasstt`,
            type: "link",
            active: false,
            selected: false,
            title: "Add Class Timetable",
          },
        ],
        access_ids: [3, 4],
      },

      // {
      //   title: "Timetable",
      //   icon: (
      //     <svg
      //       xmlns="http://www.w3.org/2000/svg"
      //       className="side-menu__icon"
      //       viewBox="0 0 24 24"
      //     >
      //       <path d="M0 0h24v24H0V0z" fill="none" />
      //       <path
      //         d="M19 5H5v14h14V5zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"
      //         opacity=".3"
      //       />
      //       <path d="M3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2zm2 0h14v14H5V5zm2 5h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z" />
      //     </svg>
      //   ),
      //   type: "sub",
      //   active: false,
      //   children: [
      //     {
      //       path: `${import.meta.env.BASE_URL}examtt`,
      //       type: "link",
      //       active: false,
      //       selected: false,
      //       title: "Exam Timetable",
      //     },
      //     {
      //       path: `${import.meta.env.BASE_URL}classtt`,
      //       type: "link",
      //       active: false,
      //       selected: false,
      //       title: "Class Timetable",
      //     },
      //     {
      //       path: `${import.meta.env.BASE_URL}addexamtt`,
      //       type: "link",
      //       active: false,
      //       selected: false,
      //       title: "Add Exam Timetable",
      //     },
      //     {
      //       path: `${import.meta.env.BASE_URL}addclasstt`,
      //       type: "link",
      //       active: false,
      //       selected: false,
      //       title: "Add Class Timetable",
      //     },
      //   ],
      // },
      {
        title: "Staff",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="side-menu__icon"
            viewBox="0 0 24 24"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path
              d="M19 5H5v14h14V5zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"
              opacity=".3"
            />
            <path d="M3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2zm2 0h14v14H5V5zm2 5h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z" />
          </svg>
        ),
        type: "sub",
        active: false,
        access_ids: [3, 4],
        children: [
          {
            path: `${import.meta.env.BASE_URL}staff`,
            type: "link",
            active: false,
            selected: false,
            title: "Staff",
          },
          {
            path: `${import.meta.env.BASE_URL}addstaff`,
            type: "link",
            active: false,
            selected: false,
            title: "Add Staff",
          },
          {
            path: `${import.meta.env.BASE_URL}staffentrance`,
            type: "link",
            active: false,
            selected: false,
            title: "Staff Entrance",
          },
          {
            path: `${import.meta.env.BASE_URL}assignstaffrole`,
            type: "link",
            active: false,
            selected: false,
            title: "Assign Staff Role",
          },

          // {
          //   path: `${import.meta.env.BASE_URL}classtt`,
          //   type: "link",
          //   active: false,
          //   selected: false,
          //   title: "Class Timetable",
          // },
          // {
          //   path: `${import.meta.env.BASE_URL}addexamtt`,
          //   type: "link",
          //   active: false,
          //   selected: false,
          //   title: "Add Exam Timetable",
          // },
          // {
          //   path: `${import.meta.env.BASE_URL}addclasstt`,
          //   type: "link",
          //   active: false,
          //   selected: false,
          //   title: "Add Class Timetable",
          // },
        ],
      },
      {
        title: "Examinations",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="side-menu__icon"
            viewBox="0 0 24 24"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path
              d="M19 5H5v14h14V5zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"
              opacity=".3"
            />
            <path d="M3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2zm2 0h14v14H5V5zm2 5h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z" />
          </svg>
        ),
        type: "sub",
        active: false,
        access_ids: [3, 4, 6],
        children: [
          {
            path: `${import.meta.env.BASE_URL}examsdashboard`,
            type: "link",
            active: false,
            selected: false,
            title: "Exams Dashboard",
          },
          {
            path: `${import.meta.env.BASE_URL}examstimetable`,
            type: "link",
            active: false,
            selected: false,
            title: "Exams Timetable",
          },
          {
            path: `${import.meta.env.BASE_URL}addexamtimetable`,
            type: "link",
            active: false,
            selected: false,
            title: "Add Exam Timetable",
          },

          {
            path: `${import.meta.env.BASE_URL}assigninvigilators`,
            type: "link",
            active: false,
            selected: false,
            title: "Assign Invigilators",
          },
          {
            path: `${import.meta.env.BASE_URL}inv_report`,
            type: "link",
            active: false,
            selected: false,
            title: "Invigilator Reports",
          },
          {
            path: `${import.meta.env.BASE_URL}exam_rooms`,
            type: "link",
            active: false,
            selected: false,
            title: "Examination rooms",
          },
          {
            path: `${import.meta.env.BASE_URL}examsreport`,
            type: "link",
            active: false,
            selected: false,
            title: "Exams Report",
          },
          {
            path: `${import.meta.env.BASE_URL}malpractice`,
            type: "link",
            active: false,
            selected: false,
            title: "Malpractice",
          },
        ],
      },

      {
        title: "Upload",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="side-menu__icon"
            viewBox="0 0 24 24"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path
              d="M19 5H5v14h14V5zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"
              opacity=".3"
            />
            <path d="M3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2zm2 0h14v14H5V5zm2 5h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z" />
          </svg>
        ),
        type: "sub",
        active: false,
        // access_ids: [3, 4, 6],
        children: [
          {
            path: `${import.meta.env.BASE_URL}financeupload`,
            type: "link",
            active: false,
            selected: false,
            title: "Finance Upload",
          },
          {
            path: `${import.meta.env.BASE_URL}votersUpload`,
            type: "link",
            active: false,
            selected: false,
            title: "Voters Upload",
          },
        ],
        access_ids: [3, 4],
      },
      {
        title: "Graduation",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="side-menu__icon"
            viewBox="0 0 24 24"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path
              d="M19 5H5v14h14V5zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"
              opacity=".3"
            />
            <path d="M3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2zm2 0h14v14H5V5zm2 5h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z" />
          </svg>
        ),
        type: "sub",
        active: false,
        // access_ids: [3, 4, 6],
        children: [
          {
            path: `${import.meta.env.BASE_URL}assigngradcards`,
            type: "link",
            active: false,
            selected: false,
            title: "Assign Graduation Cards",
          },
          {
            path: `${import.meta.env.BASE_URL}gradcardanalysis`,
            type: "link",
            active: false,
            selected: false,
            title: "Graduation Card Reports",
          },
        ],
        access_ids: [3, 4, 10],
      },
      {
        title: "Elections",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="side-menu__icon"
            viewBox="0 0 24 24"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path
              d="M19 5H5v14h14V5zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"
              opacity=".3"
            />
            <path d="M3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2zm2 0h14v14H5V5zm2 5h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z" />
          </svg>
        ),
        type: "sub",
        active: false,
        // access_ids: [3, 4, 6],
        children: [
          {
            path: `${import.meta.env.BASE_URL}recordvoters`,
            type: "link",
            active: false,
            selected: false,
            title: "Record Voters",
          },
          {
            path: `${import.meta.env.BASE_URL}elections`,
            type: "link",
            active: false,
            selected: false,
            title: "Elections",
          },
        ],
        access_ids: [9],
      },
      {
        title: "Elections",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="side-menu__icon"
            viewBox="0 0 24 24"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path
              d="M19 5H5v14h14V5zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"
              opacity=".3"
            />
            <path d="M3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2zm2 0h14v14H5V5zm2 5h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z" />
          </svg>
        ),
        type: "sub",
        active: false,
        // access_ids: [3, 4, 6],
        children: [
          {
            path: `${import.meta.env.BASE_URL}elections`,
            type: "link",
            active: false,
            selected: false,
            title: "Elections",
          },
          {
            path: `${import.meta.env.BASE_URL}voteassigning`,
            type: "link",
            active: false,
            selected: false,
            title: "Vote Assigning",
          },
        ],
        access_ids: [11],
      },
      {
        title: "Elections",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="side-menu__icon"
            viewBox="0 0 24 24"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path
              d="M19 5H5v14h14V5zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"
              opacity=".3"
            />
            <path d="M3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2zm2 0h14v14H5V5zm2 5h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z" />
          </svg>
        ),
        type: "sub",
        active: false,
        // access_ids: [3, 4, 6],
        children: [
          {
            path: `${import.meta.env.BASE_URL}recordvoters`,
            type: "link",
            active: false,
            selected: false,
            title: "Record Voters",
          },
          {
            path: `${import.meta.env.BASE_URL}elections`,
            type: "link",
            active: false,
            selected: false,
            title: "Elections",
          },
          // {
          //   path: `${import.meta.env.BASE_URL}voteallocation`,
          //   type: "link",
          //   active: false,
          //   selected: false,
          //   title: "Vote Allocation",
          // },
          {
            path: `${import.meta.env.BASE_URL}voteassigning`,
            type: "link",
            active: false,
            selected: false,
            title: "Vote Assigning",
          },
          {
            path: `${import.meta.env.BASE_URL}votingexemption`,
            type: "link",
            active: false,
            selected: false,
            title: "Voting Exemption",
          },
        ],
        access_ids: [3, 4, 5, 8],
      },
      {
        title: "Exemptions",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="side-menu__icon"
            viewBox="0 0 24 24"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path
              d="M19 5H5v14h14V5zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"
              opacity=".3"
            />
            <path d="M3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2zm2 0h14v14H5V5zm2 5h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z" />
          </svg>
        ),
        type: "sub",
        active: false,
        children: [
          {
            path: `${import.meta.env.BASE_URL}votingexemption`,
            type: "link",
            active: false,
            selected: false,
            title: "Voting Exemption",
          },
        ],
        access_ids: [3, 4, 5],
      },
      {
        title: "Reports",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="side-menu__icon"
            viewBox="0 0 24 24"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path
              d="M19 5H5v14h14V5zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"
              opacity=".3"
            />
            <path d="M3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2zm2 0h14v14H5V5zm2 5h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z" />
          </svg>
        ),
        type: "sub",
        active: false,
        // access_ids: [3, 4, 6],
        children: [
          {
            path: `${import.meta.env.BASE_URL}lectureReports`,
            type: "link",
            active: false,
            selected: false,
            title: "Lecture Reports",
          },
          {
            path: `${import.meta.env.BASE_URL}examsreport`,
            type: "link",
            active: false,
            selected: false,
            title: "Examination Reports",
          },
          {
            path: `${import.meta.env.BASE_URL}staffAttReports`,
            type: "link",
            active: false,
            selected: false,
            title: "Staff Attendance Reports",
          },
        ],
        access_ids: [3, 4],
      },
      {
        path: `${import.meta.env.BASE_URL}logout`,
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="side-menu__icon"
            viewBox="0 0 24 24"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path
              d="M5 5h4v6H5zm10 8h4v6h-4zM5 17h4v2H5zM15 5h4v2h-4z"
              opacity=".3"
            />
            <path d="M3 13h8V3H3v10zm2-8h4v6H5V5zm8 16h8V11h-8v10zm2-8h4v6h-4v-6zM13 3v6h8V3h-8zm6 4h-4V5h4v2zM3 21h8v-6H3v6zm2-4h4v2H5v-2z" />
          </svg>
        ),
        badge: "badge bg-success text-light",
        type: "link",
        active: false,
        selected: false,
        title: "Log Out",
      },
    ],
  },

  // {
  //     menutitle: "COMPONENTS",
  //     Items: [
  //         { path: `${import.meta.env.BASE_URL}widgets`, icon: (<svg xmlns="http://www.w3.org/2000/svg" className="side-menu__icon" viewBox="0 0 24 24" ><path d="M0 0h24v24H0V0z" fill="none" /><path d="M5 5h4v4H5zm10 10h4v4h-4zM5 15h4v4H5zM16.66 4.52l-2.83 2.82 2.83 2.83 2.83-2.83z" opacity=".3" /><path d="M16.66 1.69L11 7.34 16.66 13l5.66-5.66-5.66-5.65zm-2.83 5.65l2.83-2.83 2.83 2.83-2.83 2.83-2.83-2.83zM3 3v8h8V3H3zm6 6H5V5h4v4zM3 21h8v-8H3v8zm2-6h4v4H5v-4zm8-2v8h8v-8h-8zm6 6h-4v-4h4v4z" /></svg>), badge: "badge bg-warning text-dark", type: 'link', active: false, selected: false, title: 'Widgets' },
  //     ]
  // }
];
