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

    function sortArray(a, b) {
        if (a.status !== "available") {
            return 1;
        }
        if (b.status !== "available") {
            return 1;
        }
        return 0;
    }

    //Cam
    const [cam, setCam] = useState({});
    const [camLoad, setCamLoad] = useState(false);

    //Product
    const [products, setProducts] = useState([]);
    const [productID, setProgram] = useState(0);

    //Get products
    //data.lpn
    //BV99122
    useEffect(() => {
        axios.get(info.backendUrl + "/products/BV99122").then((result) => {
            console.log(result.data.response.products);
            setProducts(result.data.response.products);
        });
    }, [locationID]);

    function onProductChange(event) {
        console.log(event.target.value);
        setProgram(event.target.value);
    }

    return (
        <>
            <Navbar />
            <main className="container">
                <div>
                    <h2 className="mt-5">Vælg bilvask</h2>
                    <div className="d-grid wash-location-list">
                        {locations.sort(sortArray).map((location) => {
                            return (
                                <WashLocation
                                    key={location.id}
                                    location={location}
                                    onChoice={onChoice}
                                />
                            );
                        })}
                    </div>
                </div>

                
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
                    <>
                        <h2>Vælg pakke</h2>
                    </>
                )}
                <div className="wash-product-list mb-5">
                    {cam.lpn &&
                        products.map((product) => {
                            return (
                                <>
                                    <WashProducts
                                        product={product}
                                        onProductChange={onProductChange}
                                    />
                                </>
                            );
                        })}
                </div>
            </main>
        </>
    );
}

export default App;
