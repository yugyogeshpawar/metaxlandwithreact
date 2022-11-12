import React from 'react'

import './css/style2.css'
import { useState } from 'react'


function Register() {

    const [user, setUser] = useState({
        email: "",
        password: "",
        reenterpassword: ""
    });

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const register = e => {
        e.preventDefault();
        const { email, password, reenterpassword } = user
        if (email && password && reenterpassword && (password === reenterpassword)) {
            alert("correct")
        } else {
            alert('incorrect');
        }
        // axios.post("http://localhost:3000/api/register", user)

    }

    return (
        <div>

            <div className="bg-ne-style ">
                <div className="flex overflow-hidden flex-col mx-auto max-w-[2560px] h-screen bg-ne-bgColor">

                    <div className="flex overflow-hidden flex-col flex-1 md:flex-row">
                     
                        <main id="main"
                            className="relative z-0 flex-1 font-sans text-white bg-fixed bg-no-repeat focus:outline-none bg-main overflow-y-auto">
                            <div className="relative h-full bg-ne-style">
                                <div className="absolute top-0 w-full h-full">
                                    <div className="absolute inset-0 bg-dark-purplish">
                                        <div
                                            className="absolute inset-0 bg-center bg-no-repeat bg-cover bg-image1" >
                                        </div>
                                        <div className="absolute inset-0 bg-dark-purplish-darker"></div>
                                    </div>
                                </div>
                                <div className="flex relative items-center h-full">
                                    <div
                                        className="flex justify-center py-6 px-4 mx-auto max-w-7xl md:px-6 lg:px-8">
                                        <div className="px-4 max-w-md">
                                            <h1 className="text-center text-white text-h4">Welcome to the Next
                                                Earth project!</h1>
                                            <h2 className="mt-1.5 text-center text-white uppercase text-h1" onClick={register}>
                                                Register</h2>

                                            <div className="mt-6">
                                                <form name="register" className="formulate-form formulate-form--register" 
                                                >


                                                    <div data-classification="text" data-type="email" className="formulate-input"
                                                        data-has-errors="true">
                                                        <div className="formulate-input-wrapper"><label
                                                            id="formulate--auth-register-1_label"
                                                            htmlFor="formulate--auth-register-1"
                                                            className="formulate-input-label formulate-input-label--before text-white text-field-label">Email
                                                            address</label>

                                                            <div data-type="email"
                                                                className="formulate-input-element formulate-input-element--email">
                                                                <input type="email" placeholder="Email"
                                                                    name="email"
                                                                    onChange={handleChange}
                                                                    value={user.email}
                                                                    className="form-input rounded w-full text-ne-style" />

                                                            </div>

                                                        </div>

                                                        <ul className="formulate-input-errors" style={{ display: "none" }}>
                                                            <li role="status" aria-live="polite"
                                                                className="formulate-input-error text-red-400 text-sm font-bold">
                                                                Email is required.</li>
                                                            <li role="status" aria-live="polite"
                                                                className="formulate-input-error text-red-400 text-sm font-bold">
                                                                Please enter a valid email address.</li>
                                                        </ul>
                                                    </div>
                                                    <div data-classification="text" data-type="password" className="formulate-input"
                                                        data-has-errors="true">
                                                        <div className="formulate-input-wrapper"><label
                                                            id="formulate--auth-register-2_label"
                                                            htmlFor="formulate--auth-register-2"
                                                            className="formulate-input-label formulate-input-label--before text-white text-field-label">Password</label>

                                                            <div data-type="password"
                                                                className="formulate-input-element formulate-input-element--password">
                                                                <input type="password" placeholder="Password"
                                                                    onChange={handleChange}
                                                                    value={user.password}
                                                                    id="formulate--auth-register-2" name="password"

                                                                    className="form-input rounded w-full text-ne-style" />
                                                            </div>
                                                        </div>
                                                        <ul className="formulate-input-errors"
                                                            style={{ display: "none" }}>
                                                            <li role="status" aria-live="polite"
                                                                className="formulate-input-error text-red-400 text-sm font-bold">
                                                                Password is required.</li>
                                                            <li role="status" aria-live="polite"
                                                                className="formulate-input-error text-red-400 text-sm font-bold">
                                                                Your Password is not strong enough. Must be at least 8
                                                                characters with one uppercase letter, one number, and one
                                                                special character (*.!@#$%^&amp;(){ }[]:;&lt;&gt;,.?/~_+-=|\)
                                                            </li>
                                                        </ul>


                                                    </div>
                                                    <div className="text-sm">Passwords must be at least 8 characters with one
                                                        uppercase letter, one number, and one special character.</div>
                                                    <div data-classification="text" data-type="password" className="formulate-input"
                                                        data-has-errors="true">
                                                        <div className="formulate-input-wrapper"><label
                                                            id="formulate--auth-register-3_label"
                                                            htmlFor="formulate--auth-register-3"
                                                            className="formulate-input-label formulate-input-label--before text-white text-field-label">
                                                            Confirm
                                                            password</label>
                                                            <div data-type="password"
                                                                className="formulate-input-element formulate-input-element--password">
                                                                <input type="password" placeholder="Confirm password"
                                                                    id="formulate--auth-register-3"
                                                                    onChange={handleChange}
                                                                    value={user.reenterpassword}
                                                                    name="passwordConfirmation"
                                                                    className="form-input rounded w-full text-ne-style" />

                                                            </div>

                                                        </div>

                                                        <ul className="formulate-input-errors" style={{ display: "none" }}>
                                                            <li role="status" aria-live="polite"
                                                                className="formulate-input-error text-red-400 text-sm font-bold">
                                                                Confirm password is required.</li>
                                                        </ul>



                                                    </div>
                                                    <div data-classification="box" data-type="checkbox"
                                                        className="mt-3 formulate-input" data-has-errors="true">
                                                        <div className="flex">


                                                            <div data-type="checkbox" className="mt-1">
                                                                <input type="checkbox" id="formulate--auth-register-4"
                                                                    name="terms and conditions"


                                                                    className="text-ne-vividGreen border-2 border-white bg-transparent rounded flex h-4.5 w-4.5"
                                                                    value="false" /> <label htmlFor="formulate--auth-register-4"
                                                                        className="formulate-input-element-decorator"></label>

                                                            </div> <label htmlFor="formulate--auth-register-4" className="ml-3">I've
                                                                read and agree with the <span
                                                                    className="text-ne-vividGreen underline cursor-pointer">Terms
                                                                    and Conditions!</span></label>
                                                        </div>
                                                    </div>
                                                    <div  data-type=""
                                                        className="mt-9 formulate-input">
                                                        <div className="formulate-input-wrapper">
                                                            <div data-type=""
                                                                className="formulate-input-element formulate-input-element--submit">
                                                                <button 
                                                                    className="btn bg-primary w-full "> Register </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                                <div className="flex justify-between mt-3"><a
                                                    href="forgot-password.html"
                                                    className="text-white underline">Forgot password?</a><a
                                                        href="login.html"
                                                        className="text-white underline">Login</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </main>
                    </div>
                </div>

            </div>




        </div>
    )
}

export default Register