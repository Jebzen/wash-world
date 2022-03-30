import React, { useState, useEffect } from "react";
import "./style.scss";
import Navbar from "./components/NavBar";
import WashLocation from "./components/WashLocation";
import WashCam from "./components/WashCam";
import WashProducts from "./components/WashProducts";
import info from "./info";
import axios from "axios";
import WashStart from "./components/WashStart";
import WashClock from "./components/WashClock";

function App() {
    //Locations
    const [locations, setLocations] = useState([]);
    const [location, setLocation] = useState(0);

    useEffect(() => {
        axios.get(info.backendUrl + "/locations").then((result) => {
            //console.log(result.data.response.locations);
            setLocations(result.data.response.locations);
        });
    }, []);

    function onChoice(event) {
        setLocation(locations[event.target.value - 1]);
        setCamLoad(true);
    }

    //Cam
    const [cam, setCam] = useState({});
    const [camLoad, setCamLoad] = useState(false);

    //Product
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({});

    function onProductChange(event) {
        //console.log(event.target.value);
        setProduct(products[event.target.value - 1]);
        document.getElementById("Wash-start").scrollIntoView();
    }

    //Program start
    const [program, setProgram] = useState({});

    //Clock and pop up
    const [time, setTime] = useState(0);
    //let myTimer;

    function stringMinutesToInt(str) {
        let ms = str;
        let a = ms.split(":");

        let seconds = parseInt(a[0] * 60) + parseInt(a[1]);

        return seconds;
    }

    const [startWash, setStartWash] = useState(false);

    function callWash(result) {
        setStartWash(true);
        setProgram(result.data.response);

        setTime(stringMinutesToInt(result.data.response.estimated_duration));

        //clearInterval(myTimer);
        //myTimer = setInterval(myClock, 1000);
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
                {location.id && (
                    <WashCam
                        locationID={location.id}
                        setCam={setCam}
                        cam={cam}
                        setCamLoad={setCamLoad}
                        camLoad={camLoad}
                    />
                )}
                {cam.lpn && (
                    <WashProducts
                        lpn={cam.lpn}
                        locationID={location.id}
                        products={products}
                        setProducts={setProducts}
                        onProductChange={onProductChange}
                    />
                )}
                <div id="Wash-start" className="mb-5">
                    {product.program && (
                        <WashStart
                            product={product}
                            location={location}
                            cam={cam}
                            setProgram={setProgram}
                            callWash={callWash}
                            stringMinutesToInt={stringMinutesToInt}
                        />
                    )}
                </div>
                {startWash && (
                    <>
                        <WashClock countDown={time} />)
                    </>
                )}
            </main>
        </>
    );
}

export default App;
