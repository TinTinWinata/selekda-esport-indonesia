import axios from "axios";
import React, { createRef, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Select from "react-select";
import Navbar from "../../components/navbar";
import { useLoading } from "../../hooks/loadingContext";
import { useUserAuth } from "../../hooks/userAuthContext";
import "./home.css";

export default function Home() {
    let speed = 5; //Second
    let n = 0;
    let redActive = "red";
    let redUnactive = "#470000";
    let flag = false;

    const navigate = useNavigate();
    const selectRef = createRef();
    const { getConf } = useUserAuth();
    const [image, setImage] = useState([]);
    const { setLoading } = useLoading();
    const [option, setOption] = useState([]);

    const [state, setState] = useState(0);

    function handleSubmitSearch(e) {
        e.preventDefault();
        const temp = selectRef.current.getValue();
        const val = temp[0].value;
        navigate("/user/" + val);
    }

    useEffect(() => {
        axios.get("/api/all-user", getConf()).then((resp) => {
            const allUser = resp.data;
            allUser.map((e) => {
                const option = {
                    value: e.id,
                    label: e.name,
                };
                setOption((prev) => [...prev, option]);
            });
        });
    }, []);

    useEffect(() => {
        setLoading(true);
        axios
            .get("/api/random-banner/4", getConf())
            .then((resp) => {
                setLoading(false);
                setImage(resp.data);
            })
            .catch((err) => {});
    }, []);

    useEffect(() => {
        showSlide(state);
    }, [state]);

    function showSlide(n, isFade = true) {
        flag = true;
        let imageList = $(".image");
        let dot = $(".dot-circle");

        dot.css("background-color", redUnactive);
        // All Slide Display None
        imageList.hide();

        // Show only n index
        if (isFade) imageList.eq(n).fadeIn(500);
        else imageList.eq(n).fadeIn();

        dot.eq(n).css("background-color", redActive);
    }

    function setSlide(n, isFade = true) {
        let imageList = $(".image");
        let dot = $(".dot-circle");

        dot.css("background-color", redUnactive);
        // All Slide Display None
        imageList.hide();

        // Show only n index
        if (isFade) imageList.eq(n).fadeIn(500);
        else imageList.eq(n).fadeIn();

        dot.eq(n).css("background-color", redActive);
    }

    return (
        <>
            <div className="first">
                <div className="dot">
                    <div
                        className="dot-circle"
                        onClick={() => setState(0)}
                    ></div>
                    <div
                        className="dot-circle"
                        onClick={() => setState(1)}
                    ></div>
                    <div
                        className="dot-circle"
                        onClick={() => setState(2)}
                    ></div>
                    <div
                        className="dot-circle"
                        onClick={() => setState(3)}
                    ></div>
                </div>

                {image.map((e, idx) => {
                    return (
                        <div
                            key={idx}
                            className={idx == 0 ? "image active" : "image"}
                        >
                            <img src={e.imageUrl} alt="" />
                        </div>
                    );
                })}
            </div>

            <div className="short-text smooch">
                <h1>SELEKDA ESPORT INDONESIA</h1>
                <p>
                    Sharpen your skills where there's nowhere to hide. Unlike
                    the grand scale of the Other esport renas maps are specially
                    designed for all ethnic players.
                </p>
            </div>

            <div className="showcase-center">
                <div className="showcase-container">
                    <div className="showcase">
                        <p className="smooch">ASEAN SKILL Competition 3rd</p>
                        <img src="../assets/landing/win_1.jpg" alt="" />
                    </div>
                    <div className="showcase active-showcase">
                        <p className="smooch">Jakarta Fair 1st</p>
                        <img src="../assets/landing/win.jpeg" alt="" />
                    </div>
                    <div className="showcase">
                        <p className="smooch">VCT 2022 5rd</p>
                        <img src="../assets/landing/win_2.jpg" alt="" />
                    </div>
                </div>
            </div>

            <div className="top-squad smooch">
                <h1>Top Squad</h1>
                <div className="center">
                    <div className="liquid">
                        <div className="flex">
                            <div className="squad-image">
                                <h1>Team Liquid</h1>
                                <img
                                    src="../assets/landing/liquid.jpg"
                                    alt=""
                                />
                            </div>
                            <div className="squad-content">
                                <h2>Main Roster:</h2>
                                <div className="squad-content-h3">
                                    <h3>- nayr</h3>
                                    <h3>- TinTin</h3>
                                    <h3>- God</h3>
                                    <h3>- s1mple</h3>
                                    <h3>- jw</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="center">
                    <div className="fnatic">
                        <div className="flex">
                            <div className="squad-image">
                                <h1>Team Fnatic</h1>
                                <img
                                    src="../assets/landing/fnatic.jpg"
                                    alt=""
                                />
                            </div>
                            <div className="squad-content">
                                <h2>Main Roster:</h2>
                                <div className="squad-content-h3">
                                    <h3>- mbe</h3>
                                    <h3>- lookzy</h3>
                                    <h3>- mindfrk</h3>
                                    <h3>- awaw</h3>
                                    <h3>- shao</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="search">
                <div className="flex smooch">
                    <img
                        id="achievement"
                        src="../assets//landing/achievement.png"
                        alt=""
                    />
                    <div className="search-content">
                        <h1 className="">Search Other User</h1>
                        <form onSubmit={handleSubmitSearch}>
                            <Select
                                className="mb-3 text-lg text-black rounded"
                                options={option}
                                ref={selectRef}
                            ></Select>
                            <button type="submit">Search Now</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
