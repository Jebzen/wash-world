import React, { useEffect } from "react";
import info from "../info";
import axios from "axios";

export default function WashProducts(data) {
    //data.lpn
    //BV99122
    //Hardcoded BV99122 fordi BV99123 gav forkerte oplysninger?
    useEffect(() => {
        axios.get(info.backendUrl + "/products/" + data.lpn).then((result) => {
            //console.log(result.data.response.products);
            data.setProducts(result.data.response.products);
        });
    }, [data.locationID, data.lpn]);

    //Guld of premium plus hardcoded ud fordi de gave fejl i post
    return (
        <>
            <h2>Vælg pakke</h2>
            <div className="wash-product-list mb-5" id="product-list">
                {data.products.map((product, index) => {
                    let Pricetag = product.price + " DKK";
                    if (index == 1 || index == 3) {
                        Pricetag = "Ikke tilgængelig";
                    }
                    return (
                        <div
                            key={product.productid}
                            className="wash-product shadow"
                        >
                            <div>
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                            </div>
                            <div className="price-section">
                                <input
                                    type="radio"
                                    className="btn-check"
                                    id={"btn-" + product.productid}
                                    name="product-id"
                                    value={product.program}
                                    onChange={data.onProductChange}
                                    disabled={
                                        index == 3 || index == 1 ? "on" : ""
                                    }
                                />
                                <label
                                    className={
                                        index == 3 || index == 1
                                            ? "wash-btn disabled"
                                            : "wash-btn"
                                    }
                                    htmlFor={"btn-" + product.productid}
                                >
                                    {Pricetag}
                                </label>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
