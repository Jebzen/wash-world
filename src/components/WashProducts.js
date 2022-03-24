import React, { useEffect } from "react";
import info from "../info";
import axios from "axios";

export default function WashProducts(data) {
    useEffect(() => {
        axios.get(info.backendUrl + "/products/" + data.lpn).then((result) => {
            console.log(result.data.response);
        });
    }, data.locationID);

    return (
        <div>
            <h2>Choose product</h2>
        </div>
    );
}
