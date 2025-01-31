import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthProvider";
import Project from "./Project";
import "./style/project.css";
import useLoading from "./hooks/useLoading";
import ReactLoading from "react-loading";
import { showAssignedProjectApi } from "../api/project";


const Meeting = () => {
  const { auth } = useContext(AuthContext);
  const [errMsg, setErrMsg] = useState("");
  const [projects, setProjects] = useState([]);
  const { loading, startLoading, stopLoading } = useLoading(false);

  useEffect(() => {
    // document.addEventListener('DOMContentLoaded', function () {
    var listView = document.querySelector(".list-view");
    var gridView = document.querySelector(".grid-view");
    var projectsList = document.querySelector(".project-boxes");
    listView.addEventListener("click", function () {
      gridView.classList.remove("active");
      listView.classList.add("active");
      projectsList.classList.remove("jsGridView");
      projectsList.classList.add("jsListView");
    });
    gridView.addEventListener("click", function () {
      gridView.classList.add("active");
      listView.classList.remove("active");
      projectsList.classList.remove("jsListView");
      projectsList.classList.add("jsGridView");
    });

    async function getAllProject() {
      try {
        startLoading();
        const response = await showAssignedProjectApi({auth});

        
        if (response?.data?.Projects) {
          setProjects(response.data.Projects);
        } else {
          setErrMsg(response?.data?.message);
        }
        stopLoading();
      } catch (err) {
        if (!err?.response) {
          setErrMsg("No server response");
        } else if (err.response?.status === 400) {
          setErrMsg("You have not any current project yet...");
        } else if (err.response?.status === 401) {
          setErrMsg("Unautherized");
        } else if (err.response?.status === 403) {
          setErrMsg("User is not logged In");
        } else {
          setErrMsg("Login failed");
        }

        // errRef.current.focus();
      }
    }

    getAllProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading && (
        <ReactLoading
          type="spin"
          color="lightGreen"
          height={"5%"}
          width={"5%"}
        />
      )}
      {!loading && (
        <div className="projects-section">
          <div className="projects-section-header">
            <p>Projects</p>
            <p className="time">
              {auth?.role === "admin" ? (
                <a href="/projects/create" className="item item-p">
                  {/* <img classNameName="feather feather-star" src="svg/star.svg" alt="" /> */}
                  <span>Create New </span>
                </a>
              ) : (
                ""
              )}
            </p>
          </div>
          <div className="projects-section-line">
            <div className="projects-status">
              <div className="item-status">
                <span className="status-number">{projects.length}</span>
                <span className="status-type">In Progress</span>
              </div>
              <div className="item-status">
                <span className="status-number">{projects.length}</span>
                <span className="status-type">Upcoming</span>
              </div>
              <div className="item-status">
                <span className="status-number">{projects.length}</span>
                <span className="status-type">Total Projects</span>
              </div>
            </div>
            <div className="view-actions">
              <button className="view-btn list-view" title="List View">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  strokeLinecap="round"
                  stroke-linejoin="round"
                  className="feather feather-list"
                >
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" />
                  <line x1="3" y1="12" x2="3.01" y2="12" />
                  <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
              </button>
              <button className="view-btn grid-view active" title="Grid View">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  strokeLinecap="round"
                  stroke-linejoin="round"
                  className="feather feather-grid"
                >
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
              </button>
            </div>
          </div>
          <div className="project-boxes jsGridView">
            {projects.length > 0 ? (
              projects?.map((item) => <Project item={item} />)
            ) : (
              <div className="empty-project">{errMsg}</div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Meeting;
