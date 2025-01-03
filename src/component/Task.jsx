import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthProvider";
import AllTask from "./AllTask";
import { Dropdown, Collapse, initMDB } from "mdb-ui-kit";
import { showAllTaskpi } from "../api/task";

const Task = () => {
    const { auth } = useContext(AuthContext);
    const [allTaskData, setAllTaskData] = useState([]);
    const [isDeletedData, setIsDeletedData] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [dataFetched, setDataFetched] = useState(false);

    useEffect(() => {
        const getAllData = async () => {
            try {
                // Initialize MDB only if not already initialized
                if (!Dropdown || !Collapse) {
                    initMDB({ Dropdown, Collapse });
                }

                if (!dataFetched || isDeletedData) {
                    const response = await showAllTaskpi({ auth });

                    if (response?.data?.Task) {
                        setAllTaskData(response.data.Task);
                        setErrMsg(""); // Clear any previous error messages
                    } else {
                        setAllTaskData([]);
                        setErrMsg("You have not any current task yet...");
                    }

                    setDataFetched(true);
                    setIsDeletedData(false); // Reset deletion state
                }
            } catch (err) {
                if (!err?.response) {
                    setErrMsg("No server response");
                } else if (err.response?.status === 400) {
                    setErrMsg("You have not any current task yet...");
                } else if (err.response?.status === 401) {
                    setErrMsg("Unauthorized");
                } else if (err.response?.status === 403) {
                    setErrMsg("User is not logged In");
                } else {
                    setErrMsg("Fetching tasks failed");
                }
            }
        };

        getAllData();
    }, [auth, dataFetched, isDeletedData]);

    return (
        <>
            <div className="page-content">
                <div className="header">My Tasks</div>

                <div className="content-categories">
                    <div className="label-wrapper">
                        <input
                            className="nav-item"
                            name="nav"
                            type="radio"
                            id="opt-1"
                            defaultChecked // Use defaultChecked for initial value
                        />
                        <label className="category" htmlFor="opt-1">
                            All
                        </label>
                    </div>
                    <div className="label-wrapper">
                        <input
                            className="nav-item"
                            name="nav"
                            type="radio"
                            id="opt-2"
                            onChange={() => console.log("Filter: Completed tasks")} // Add handler
                        />
                        <label className="category" htmlFor="opt-2">
                            Completed
                        </label>
                    </div>
                </div>

                <div className="tasks-wrapper">
                    {allTaskData.length > 0 ? (
                        allTaskData.map((item, index) => (
                            <AllTask
                                key={index}
                                taskId={item?._id}
                                description={item.description}
                                status={item.completed}
                                isDeletedData={isDeletedData}
                                setIsDeletedData={setIsDeletedData}
                            />
                        ))
                    ) : (
                        <div>{errMsg || "Loading tasks..."}</div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Task;
