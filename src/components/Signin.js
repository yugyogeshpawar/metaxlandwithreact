import React from 'react'
import './css/style2.css'

function SignIn() {
    return (
        <div>
         
            <div className="bg-ne-style">
                <div className="flex overflow-hidden flex-col mx-auto max-w-[2560px] h-screen bg-ne-bgColor">

                    <div className="flex overflow-hidden flex-col flex-1 md:flex-row">
                     
                     
                        <main id="main"
                            className="relative z-0 flex-1 font-sans text-white bg-fixed bg-no-repeat focus:outline-none bg-main overflow-y-auto">
                            <div className="relative h-full bg-ne-style">
                                <div className="absolute top-0 w-full h-full">
                                    <div className="absolute inset-0 bg-dark-purplish">
                                        <div className="absolute inset-0 bg-center bg-no-repeat bg-cover bg-image1" ></div>
                                        <div className="absolute inset-0 bg-dark-purplish-darker"></div>
                                    </div>
                                </div>
                                <div className="flex relative justify-center items-center py-6 px-4 h-full md:px-6 lg:px-8">
                                    <div className="w-full md:max-w-4xl">
                                        <h1 className="text-center text-white text-h4">Welcome to the Meta x Land project!</h1>
                                        <h2 className="mt-1.5 text-center text-white uppercase text-h1">login</h2>

                                        <div className="grid mt-10 divide-y-2 divide-amber-50 md:grid-cols-2 md:divide-y-0 md:divide-x-2">
                                            <div className="pb-8 md:py-0 md:px-8">








                                                <form name="login" className="formulate-form formulate-form--login">


                                                    <div data-classification="text" data-type="email" className="formulate-input" >
                                                        <div className="formulate-input-wrapper"><label id="formulate--auth-login-1_label"
                                                            htmlFor="formulate--auth-login-1"
                                                            className="formulate-input-label formulate-input-label--before text-white text-field-label">Email
                                                            address</label>

                                                            <div data-type="email" className="formulate-input-element formulate-input-element--email">
                                                                <input type="email" placeholder="Email" id="formulate--auth-login-1" name="email"
                                                                    className="form-input rounded w-full text-ne-style"/>

                                                            </div>

                                                        </div>
                                                        <ul className="formulate-input-errors" style={{display: "none"}}>
                                                            <li role="status" aria-live="polite"
                                                                className="formulate-input-error text-red-400 text-sm font-bold">Email is required.</li>
                                                            <li role="status" aria-live="polite"
                                                                className="formulate-input-error text-red-400 text-sm font-bold">Please enter a valid email
                                                                address.</li>
                                                        </ul>


                                                    </div>










                                                    <div data-classification="text" data-type="password" className="formulate-input"
                                                        data-has-errors="true">
                                                        <div className="formulate-input-wrapper"><label id="formulate--auth-login-2_label"
                                                            htmlFor="formulate--auth-login-2"
                                                            className="formulate-input-label formulate-input-label--before text-white text-field-label">Password</label>

                                                            <div data-type="password" className="formulate-input-element formulate-input-element--password">
                                                                <input type="password" placeholder="Password" id="formulate--auth-login-2"
                                                                    name="password" className="form-input rounded w-full text-ne-style"/>

                                                            </div>

                                                        </div>

                                                        <ul className="formulate-input-errors" style={{display: "none"}}>
                                                            <li role="status" aria-live="polite"
                                                                className="formulate-input-error text-red-400 text-sm font-bold">Password is required.</li>
                                                        </ul>


                                                    </div>
                                                    <div data-classification="button" data-type="submit" className="mt-9 formulate-input">
                                                        <div className="formulate-input-wrapper">


                                                            <div data-type="submit" className="formulate-input-element formulate-input-element--submit">
                                                                <button type="submit" id="formulate--auth-login-3" className="btn bg-primary w-full  bgImage"
                                                                   
                                                                    >
                                                                    Log in </button>

                                                            </div>

                                                        </div>


                                                    </div>
                                                </form>





                                                <div className="flex justify-between mt-3"><a href="forgot-password.html"
                                                    className="text-white underline">Forgot password?</a><a href="register.html"
                                                        className="text-white underline">Sign up</a></div>
                                            </div>
                                            <div className="flex justify-center items-center pt-8 md:px-8 md:pt-0">
                                                <div className="px-8"><button className="btn btn-ui bg-secondary">Log in with Wallet</button>
                                                    <div>


                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-center"></div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
               
            </div>
        </div>
    )
}

export default SignIn