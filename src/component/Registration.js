import React, { useEffect, useRef } from 'react'
import axios from '../api/axios';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { registerUrlApi } from '../api/user';

const Registration = () => {
    const nameRef = useRef();
    const isAdminLoginRef = useRef();
    const [isAdminLogin, setIsAdminLogin] = useState(false);
    const [role, setRole] = useState("user");

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phoneNumber: ''
    });

    useEffect(() => {
        if (isAdminLogin) {
            setRole("admin");
        }
    }, [isAdminLogin]);


    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        if (errMsg) {
            alert(errMsg);
        }
    }, [errMsg]);


    useEffect(() => {
        nameRef.current.focus();
    }, [])


    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/login";

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await registerUrlApi({ 
                payload: { ...formData, role: role }
            });
            // Set the response data in state
            if (response.status === 201) {
                alert("You are registerd successfully!!")
                navigate(from, { replace: true })// Set the success message in state
            }
        } catch (err) {
            if (err.response?.status === 400) {
                setErrMsg('Invalid Details');
            }

            else if (err.response?.status === 401) {
                setErrMsg('Unautherized');
            }
            else if (err.response?.status === 409) {
                setErrMsg('User Already exists!');
            }
            else if (!err?.response) {
                setErrMsg('No server response');
            }
            else {
                setErrMsg('Login failed');
            }

            // errRef.current.focus();
            // console.log(errMsg);
        }
    };

    return (
        <>
            <section class="vh-100 bg-image reg-style-1"
            >
                <div class="mask d-flex align-items-center h-100 gradient-custom-3">
                    <div class="container h-100">
                        <div class="row d-flex justify-content-center align-items-center h-100">
                            <div class="col-12 col-md-9 col-lg-7 col-xl-6">
                                <div class="card reg-style-2">
                                    <div class="card-body p-5">
                                        <h2 class="text-uppercase text-center mb-5">Create an account</h2>

                                        <form onSubmit={handleSubmit}>

                                            <div class="form-outline mb-4">
                                                <label
                                                    className="form-label">
                                                    Name
                                                </label>
                                                <input
                                                    id="form3Example1cg"
                                                    ref={nameRef}
                                                    className="form-control form-control-lg"
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>

                                            <div class="form-outline mb-4">

                                                <label
                                                    htmlFor="form3Example3cg"
                                                    className="form-label">
                                                    Email
                                                </label>
                                                <input
                                                    id="form3Example3cg"
                                                    className="form-control form-control-lg"
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>

                                            <div class="form-outline mb-4">
                                                <label
                                                    htmlFor="form3Example4cg"
                                                    className="form-label">
                                                    Password
                                                </label>
                                                <input
                                                    id="form3Example4cg"
                                                    class="form-control form-control-lg"
                                                    type="password"
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>

                                            <div class="form-outline mb-4">
                                                <label
                                                    htmlFor="form3Example4cdg"
                                                    className="form-label">
                                                    Phone Number
                                                </label>
                                                <input
                                                    id="form3Example4cdg"
                                                    class="form-control form-control-lg"
                                                    type="text"
                                                    name="phoneNumber"
                                                    value={formData.phoneNumber}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>

                                            <div class="form-outline mb-4">
                                                <input
                                                    type="checkbox"
                                                    class="form-check-input"
                                                    id="exampleCheck1"
                                                    checked={isAdminLogin}
                                                    ref={isAdminLoginRef}
                                                    onChange={(e) => setIsAdminLogin(e.target.checked ? true : false)}
                                                    value={isAdminLogin}
                                                />
                                                <label
                                                    class="form-check-label"
                                                    for="exampleCheck1">
                                                    &ensp;Register as a admin
                                                </label>
                                            </div>

                                            {/* <div class="form-check d-flex justify-content-center mb-5">
                                                <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" />
                                                <label class="form-check-label" for="form2Example3g">
                                                    I agree all statements in <a href="#!" class="text-body"><u>Terms of service</u></a>
                                                </label>
                                            </div> */}

                                            <div class="d-flex justify-content-center">
                                                <button type="submit"
                                                    class="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                                            </div>

                                            <p class="text-center text-muted mt-5 mb-0">Have already an account? <a href="/login"
                                                class="fw-bold text-body"><u>Login here</u></a></p>

                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Registration
