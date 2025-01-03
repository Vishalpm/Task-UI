import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { deleteTaskApi } from "../api/task";

const AllTask = (props) => {
    const { auth } = useContext(AuthContext);
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();

    const handleUpdateTask = () => {
        const task = {
            description: props.description,
            completed: props?.status ? true : false,
            taskId: props.taskId,
        };

        if (props.taskId) {
            navigate(`${"/update-task"}/${props.taskId}`, { state: { task } });
        } else {
            alert("Task id not found!");
        }
    };

    const handleDeleteTask = async () => {
        try {
            const response = await deleteTaskApi({
                taskId: props?.taskId,
                auth,
            });

            if (response?.data?.title === "Successfull") {
                props.setIsDeletedData(response);
                alert(response?.data?.message);
            }
        } catch (err) {
            if (!err?.response) {
                setErrMsg("No server response");
            } else if (err.response?.status === 400) {
                setErrMsg("You have not any current task yet...");
            } else if (err.response?.status === 401) {
                setErrMsg("Unauthorized");
            } else if (err.response?.status === 403) {
                setErrMsg("User is not logged in");
            } else {
                setErrMsg("Login failed");
            }
        }
    };

    const handleDeleteRequest = () => {
        if (window.confirm("Are you sure to delete the task!!!") === true) {
            handleDeleteTask();
        }
    };

    const handleCheckboxChange = (e) => {
        const updatedStatus = e.target.checked;
        // Handle the checkbox state change logic (e.g., updating the task status).
        console.log("Checkbox status updated:", updatedStatus);
    };

    return (
        <>
            {errMsg && <p>{errMsg}</p>}
            <div className="task">
                <input
                    className="task-item"
                    name="task"
                    type="checkbox"
                    checked={props.status}
                    onChange={handleCheckboxChange} // Added onChange handler
                />
                <label htmlFor={props?.taskId}>
                    <span className="label-text">{props?.description}</span>
                </label>
                <span id={props?.taskId}>
                    <span
                        className="tag"
                        onClick={handleUpdateTask}
                    >
                        <img
                            className="feather feather-edit"
                            src="svg/edit.svg"
                            alt=""
                        />
                    </span>
                    <span
                        className="tag tag-delete"
                        onClick={handleDeleteRequest}
                    >
                        <img
                            className="feather feather-trash delete"
                            src="svg/trash.svg"
                            alt=""
                        />
                    </span>
                </span>
            </div>
        </>
    );
};

export default AllTask;
