import React, { useState, useEffect } from "react";
import axios from "axios";
import info from "../info";

export default function WashStart(props) {
    const [start, setStart] = useState(false);

    //Fuldend bilvask
    function StartWash() {
        //console.log("Starting wash...");
        //console.log(props.location, props.cam, props.product);
        setStart(true);
    }

    useEffect(() => {
        if (start) {
            axios
                .post(
                    info.backendUrl +
                        "/" +
                        props.location.id +
                        "/start/" +
                        props.product.program
                )
                .then((result) => {
                    props.callWash(result);
                    setStart(false);
                });
        }
    }, [start]);

    return (
        <>
            <h2 className="mt-5">Bekræft bilvask</h2>
            <div className="row">
                <div className="col">
                    <table className="table table-borderless mb-0">
                        <tbody>
                            <tr>
                                <th>Adresse:</th>
                                <td>{props.location.name}</td>
                            </tr>
                            <tr>
                                <th>Bil:</th>
                                <td>{props.cam.lpn}</td>
                            </tr>
                            <tr>
                                <th>Pakke:</th>
                                <td>{props.product.name}</td>
                            </tr>
                            <tr>
                                <th>Pris:</th>
                                <td>{props.product.price} DKK</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-auto">
                    <div className="d-flex justify-content-end h-100">
                        <div className="wash-btn mt-auto" onClick={StartWash}>
                            Start bilvask
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
