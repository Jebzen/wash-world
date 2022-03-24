import React, { useState, useEffect } from "react";
import "./style.scss";
import Navbar from "./components/NavBar";
import WashLocation from "./components/WashLocation";
import info from "./info";
import axios from "axios";

function App() {
    //Locations
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        axios.get(info.backendUrl + "/locations").then((result) => {
            //console.log(result.data.response.locations);
            setLocations(result.data.response.locations);
        });
    }, []);

    function onChoice(event) {
        console.log(event.target);
    }

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
            </main>
        </>
    );
}

export default App;
