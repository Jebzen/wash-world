import "./WashClock.css";
import React, { useEffect } from "react";

export default function WashClock(props) {
    // Credit: Mateusz Rybczonec

    const FULL_DASH_ARRAY = 283;
    const WARNING_THRESHOLD = 30;
    const ALERT_THRESHOLD = 15;

    const COLOR_CODES = {
        info: {
            color: "green",
        },
        warning: {
            color: "orange",
            threshold: WARNING_THRESHOLD,
        },
        alert: {
            color: "red",
            threshold: ALERT_THRESHOLD,
        },
    };

    let TIME_LIMIT = props.countDown;
    let timePassed = 0;
    let timeLeft = TIME_LIMIT;
    let timerInterval = null;
    let remainingPathColor = COLOR_CODES.info.color;

    useEffect(() => {
        startTimer();
    }, [props.countDown]);

    function onTimesUp() {
        clearInterval(timerInterval);
        props.washFinished();
    }

    function startTimer() {
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            if (TIME_LIMIT < 0 || timeLeft < 0) {
                clearInterval(timerInterval);
            }

            timePassed = timePassed += 1;
            timeLeft = TIME_LIMIT - timePassed;

            let baseTimerLabel = document.getElementById("base-timer-label");
            if (baseTimerLabel) {
                baseTimerLabel.innerHTML = formatTime(timeLeft);
            }
            setCircleDasharray();
            setRemainingPathColor(timeLeft);

            if (timeLeft === 0) {
                onTimesUp();
            }
        }, 1000);
    }

    function formatTime(time) {
        if (time > 0) {
            const minutes = Math.floor(time / 60);
            let seconds = time % 60;

            if (seconds < 10) {
                seconds = `0${seconds}`;
            }

            return `${minutes}:${seconds}`;
        } else if (time === 0) {
            return "<small>Bilvask afsluttet</small>";
        } else {
            return false;
        }
    }

    function setRemainingPathColor(timeLeft) {
        const { alert, warning, info } = COLOR_CODES;
        if (timeLeft <= alert.threshold) {
            document
                .getElementById("base-timer-path-remaining")
                .classList.remove(info.color);
            document
                .getElementById("base-timer-path-remaining")
                .classList.remove(warning.color);
            document
                .getElementById("base-timer-path-remaining")
                .classList.add(alert.color);
        } else if (timeLeft <= warning.threshold) {
            document
                .getElementById("base-timer-path-remaining")
                .classList.remove(alert.color);
            document
                .getElementById("base-timer-path-remaining")
                .classList.remove(info.color);
            document
                .getElementById("base-timer-path-remaining")
                .classList.add(warning.color);
        } else if (timeLeft <= 0) {
            document
                .getElementById("base-timer-path-remaining")
                .classList.remove(alert.color);
            document
                .getElementById("base-timer-path-remaining")
                .classList.remove(warning.color);
            document
                .getElementById("base-timer-path-remaining")
                .classList.add(info.color);
        } else {
            document
                .getElementById("base-timer-path-remaining")
                .classList.remove(alert.color);
            document
                .getElementById("base-timer-path-remaining")
                .classList.remove(warning.color);
            document
                .getElementById("base-timer-path-remaining")
                .classList.add(info.color);
        }
    }

    function calculateTimeFraction() {
        const rawTimeFraction = timeLeft / TIME_LIMIT;
        if (rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction) < 0) {
            return 0;
        }
        return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
    }

    function setCircleDasharray() {
        const circleDasharray =
            (calculateTimeFraction() * FULL_DASH_ARRAY).toFixed(0) + " 283";
        document
            .getElementById("base-timer-path-remaining")
            .setAttribute("stroke-dasharray", circleDasharray);
    }

    return (
        <div className="wash-body">
            <div className="clock-body">
                <div id="app">
                    <div className="base-timer">
                        <svg
                            className="base-timer__svg"
                            viewBox="0 0 100 100"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g className="base-timer__circle">
                                <circle
                                    className="base-timer__path-elapsed"
                                    cx="50"
                                    cy="50"
                                    r="45"
                                ></circle>
                                <path
                                    id="base-timer-path-remaining"
                                    strokeDasharray="283"
                                    className={
                                        "base-timer__path-remaining " +
                                        remainingPathColor
                                    }
                                    d="
                                        M 50, 50
                                        m -45, 0
                                        a 45,45 0 1,0 90,0
                                        a 45,45 0 1,0 -90,0
                                        "
                                ></path>
                            </g>
                        </svg>
                        <span
                            id="base-timer-label"
                            className="base-timer__label"
                        >
                            ...
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
