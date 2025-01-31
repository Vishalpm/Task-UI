import React, { useEffect, useState, useContext } from 'react'
import { Dropdown, Collapse, initMDB } from "mdb-ui-kit";
import AuthContext from '../context/AuthProvider';
import { useLocation } from 'react-router-dom';
import useLoading from "./hooks/useLoading";
import ReactLoading from "react-loading";
import { addProjectToUserApi, showAllUserApi} from '../api/project';



const ShowAddUserModel = ({ closeUserModel }) => {
    const { auth } = useContext(AuthContext);
    const [errMsg, setErrMsg] = useState('');
    const [projectUsers, setProjectUsers] = useState([]);
    const [checkedState, setCheckedState] = useState([]);
    const { loading, startLoading, stopLoading } = useLoading(false);

    window.onclick = function (event) {
        if (event.target.id === "modal-2") {
            closeUserModel();
        }
    }


    const location = useLocation();

    const path = location.pathname.split('/');
    const projectId = path[2];

    useEffect(() => {
        initMDB({ Dropdown, Collapse });
        async function showAllUser() {
            try {
                startLoading();
                const response = await showAllUserApi(
                    {
                        projectId,
                        auth
                    },
                );

                // console.log(response.data.Users);
                setProjectUsers(response.data?.Users);
                setErrMsg("");
                stopLoading();
            } catch (err) {
                if (!err?.response) {
                    setErrMsg('No server response');
                }
                else if (err.response?.status === 400) {
                    setErrMsg('No available any users!');
                } else if (err.response?.status === 401) {
                    setErrMsg('Unautherized');
                }
                else {
                    setErrMsg('You are not login, Login first...');
                }
            }
        }

        showAllUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setCheckedState(new Array(projectUsers.length).fill(false));
    }, [projectUsers])



    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
    }

    const handleAddUserSubmit = async () => {
        try {
            const addUsers = checkedState
                .map((item, index) => {
                    if (item) {
                        return projectUsers[index]?._id;
                    }
                })
                .filter((item) => {
                    if (item) {
                        return true;
                    }
                })

            console.log(addUsers);

            const response = await addProjectToUserApi(
                {
                    projectId,
                    pauload: {addUsers},
                    auth
                },
            );

            console.log(response.data?.message);
            alert(response.data?.message);
            setErrMsg("");
            closeUserModel();
        }
        catch (err) {
            if (!err?.response) {
                setErrMsg('No server response');
            }
            else if (err.response?.status === 400) {
                setErrMsg('No any user exixts...');
                // navigate(from, { replace: true });
            } else if (err.response?.status === 401) {
                setErrMsg('Unautherized');
            }
            else {
                setErrMsg('You are not login, Login first...');
            }
        }
    }

    return (
        <>
            <div className='modal-wrapper' id="modal-2"></div>
            <div className='modal-container'>
                
                <div class="todo">
                    <div class="head">
                        <h3>Available User</h3>
                    </div>
                    <ul class="user-list">
                        {projectUsers.length ?
                            projectUsers
                                .map((user, index) => (
                                    <li id={user?._id}>
                                        <input
                                            id={index}
                                            className=""
                                            name="task"
                                            type="checkbox"
                                            checked={checkedState[index]}
                                            onChange={() => handleOnChange(index)}
                                        />
                                        <label htmlFor={user?._id}>
                                            <span className="">{user?.name}</span>
                                        </label>
                                    </li>
                                ))
                            :
                            <div>{errMsg}</div>
                        }

                    </ul>
                </div>

                <button className='btn btn-primary btn-lg btn-block' onClick={handleAddUserSubmit}>Add User</button>
            </div>
        </>
    )
}

export default ShowAddUserModel
