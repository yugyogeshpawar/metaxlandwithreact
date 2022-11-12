import React from 'react'
import './css/style1.css'
import { useState,useEffect } from 'react'




function Leftmenus() {

    const [state1, setState1] = useState("mini-sidebar");
    const [state2, setState2] = useState("hidden");

    // const handleSidebarChange = state1 => {
    //     if (state1 == "mini-sidebar") {
    //         setState1("")
    //     } else {
    //         setState1("mini-sidebar")
    //     }
    // }

    const handleChange2 = () => {
        if (state2 == "hidden") {
            setState2("")
        } else {
            setState2('hidden')
        }
      }





    return (
        <>


            {/* <div className="header"> 
                    <div className="header-left">
                        <a href="Home" className="logo logo-small">
                            <img src="../UserProfile/images/logo/logo.png" alt="Logo" width="30" height="30"/>
                        </a></div><a id="toggle_btn"><i className="fas fa-align-left"></i></a><a className="mobile_btn" id="mobile_btn">
                        <i className="fas fa-align-left"></i>
                    </a><ul className="nav user-menu">
                        <li className="nav-item dropdown">
                            <a className="dropdown-toggle user-link  nav-link" data-toggle="dropdown">
                                <span className="user-img">
                                    <img className="rounded-circle" src="assets/img/logo.png" width="40" alt="Admin" />
                                </span></a><div className="dropdown-menu dropdown-menu-right"><a className="dropdown-item" href="Logout">Logout</a></div></li></ul></div> */}

            <div className={`absolute top-0 left-0 z-10 ${state1}`}
                onMouseOver={() => setState1('')}
                onMouseLeave={() => setState1('mini-sidebar')}
            >



                <div className="sidebar" id="sidebar">
                    <div className="sidebar-logo">
                        <a href="Home">
                            <img src="../UserProfile/images/logo/logo1.png" className="img-fluid" alt="" />
                        </a>
                    </div>
                    <div className="slimScrollDiv"
                        style={{
                            position: "relative",
                            overflow: "hidden",
                            width: "100%",
                            height: "639px"
                        }}
                    ><div className="sidebar - inner slimscroll"
                        style={{
                            overflow: "hidden",

                            height: "639px"
                        }}>
                            <div id="sidebar-menu" className="sidebar-menu">
                                <ul>
                                    <li className="active">
                                        <a href="Home">
                                            <i className="fas fa-columns">
                                            </i> <span>Buy Land</span>
                                        </a>
                                    </li>
                                    <li className="submenu"  >
                                        <a href="#" className=''><i className="fas fa-user"></i> <span> User </span> <span className="menu-arrow"></span></a>
                                        <ul >v
                                            <li><a href="ActiveUserList"> Login </a></li>

                                            <li><a href="BlockedUserList"> Sign Up </a></li>

                                        </ul>
                                    </li>

                                    <li className="submenu">
                                        <a href="#"><i className="fas fa-wallet"></i> <span> Marketplace </span>
                                            <span className="menu-arrow"></span>
                                        </a>
                                        <ul style={{ display: "none" }}>
                                            <li><a href="InvestmentSummary"> Investment Summary </a></li>
                                        </ul>
                                    </li>

                                    <li className="submenu">
                                        <a href="#"><i className="fas fa-vector-square"></i> <span> Units </span>
                                            <span className="menu-arrow"></span>
                                        </a>
                                        <ul style={{ display: "none" }}>
                                            <li><a href="OpenLevel"> Open Level </a></li>
                                            <li><a href="PoolAchiver"> Pool Achiver</a></li>
                                            <li><a href="RoyalityAchiver"> Royality Achiver</a></li>
                                            <li><a href="SendRoyality"> Send Royality</a></li>
                                        </ul>
                                    </li>


                                    <li className="submenu">

                                        <a href="#"><i className="fas fa-layer-group"></i> <span> Dao Votes</span>
                                        </a>

                                    </li>
                                    <li className="submenu">
                                        <a href="#"><i className=" fas fa-trophy"></i> <span> Leaderboard </span>
                                        </a>

                                    </li>

                                    <li className="submenu">
                                        <a href="#"><i className="fas fa-cog"></i> <span> Launchpad </span> </a>
                                    </li>


                                    <li className="relative top-10">
                                        <a href="Logout"><i className="fas fa-sign-out-alt"></i> <span> Logout</span></a>
                                    </li>

                                </ul>
                            </div>
                        </div><div className="slimScrollBar"
                            style={{
                                background: "rgb(204, 204, 204)",
                                width: "7px", position: "absolute",
                                top: "0px", opacity: "0.4",
                                display: "none",
                                borderRadius: "7px",
                                zIndex: "99",
                                right: "1px",
                                height: "639px"
                            }}>
                        </div>
                        <div className="slimScrollRail"
                            style={{
                                width: "7px",
                                height: "100%",
                                position: "absolute",
                                top: "0px",
                                display: "none",
                                borderRadius: "7px",
                                background: "rgb(51, 51, 51)",
                                opacity: "0.2",
                                zIndex: "90",
                                right: "1px"
                            }}>
                        </div></div>
                </div>
            </div>
        </>

    )
}

export default Leftmenus