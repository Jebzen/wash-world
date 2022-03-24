import React, { useState, useEffect } from "react";
import "./style.scss";
import Navbar from "./components/NavBar";
import WashLocation from "./components/WashLocation";
import WashCam from "./components/WashCam";
import WashProducts from "./components/WashProducts";
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

    //Product
    const [products, setProducts] = useState([]);
    const [productID, setProductID] = useState(0);

    function onProductChange(event) {
        //console.log(event.target.value);
        setProductID(event.target.value);
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
                {locationID !== 0 && (
                    <WashCam
                        locationID={locationID}
                        setCam={setCam}
                        cam={cam}
                        setCamLoad={setCamLoad}
                        camLoad={camLoad}
                    />
                )}
                {cam.lpn && (
                    <WashProducts
                        lpn={cam.lpn}
                        locationID={locationID}
                        products={products}
                        setProducts={setProducts}
                        onProductChange={onProductChange}
                    />
                )}
            </main>
        </>
    );
}

export default App;
