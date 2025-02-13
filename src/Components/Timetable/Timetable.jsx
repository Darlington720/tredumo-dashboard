import React from "react";
import styles from "./Indexpage.module.scss";

const Indexpage = () => (
  <div className={styles.Indexpage}>
    <div className="main-container container-fluid">
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <div>
            <h2 className="main-content-title tx-24 mg-b-1 mg-b-lg-1">
              Timetable
            </h2>
          </div>
        </div>
      </div>
    </div>
  </div>
);

Indexpage.defaultProps = {};

export default Indexpage;
