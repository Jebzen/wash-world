import React, { useEffect } from "react";
import info from "../info";
import axios from "axios";

export default function WashCam(data) {
    useEffect(() => {
        axios
            .get(info.backendUrl + "/cam/" + data.locationID)
            .then((result) => {
                //console.log(result.data.response);
                data.setCam(result.data.response);
                data.setCamLoad(false);
            });
    }, data.locationID);

    //Washworld function
    function getRandomLPN(lpn) {
        const chars = lpn.slice(0, 2);
        const numbers = lpn.slice(2) - Math.round(Math.random() * 1);
        return chars + numbers;
    }

    return (
        <div className="wash-cam">
            {data.cam && (
                <div className="wash-label">
                    {data.camLoad && (
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    )}
                    {data.cam.lpn &&
                        !data.camLoad &&
                        getRandomLPN(data.cam.lpn)}
                </div>
            )}
            {data.cam && <p>{data.cam.description}</p>}
        </div>
    );
}
