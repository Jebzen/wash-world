import React, { useState, useEffect } from "react";
import "./style.scss";
import Navbar from "./components/NavBar";
import WashLocation from "./components/WashLocation";
import WashCam from "./components/WashCam";
import info from "./info";
import axios from "axios";

function App() {
    //Locations
    const [locations, setLocations] = useState([]);
    const [locationID, setLocationID] = useState(0);

    useEffect(() => {
        axios.get(info.backendUrl + "/locations").then((result) => {
            //console.log(result.data.response.locations);
            setLocations(result.data.response.locations);
        });
    }, []);

    function onChoice(event) {
        setLocationID(event.target.value);
        setCamLoad(true);
    }

    //Cam
    const [cam, setCam] = useState({});
    const [camLoad, setCamLoad] = useState(false);
    console.log(cam);

    return (
        <>
            <Navbar />
            <main className="container">
                {locations.length > 0 && (
                    <WashLocation
                        locations={locations}
                        setLocations={setLocations}
                        onChoice={onChoice}
                    />
                )}
                {locationID !== 0 && (
                    <WashCam
                        locationID={locationID}
                        setCam={setCam}
                        cam={cam}
                        setCamLoad={setCamLoad}
                        camLoad={camLoad}
                    />
                )}
                {cam.lpn && <p>Cam chosen!</p>}
            </main>
        </>
    );
}

export default App;
