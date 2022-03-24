import React, { useEffect } from "react";
import info from "../info";
import axios from "axios";

export default function WashProducts(data) {
    //data.lpn
    //BV99122
    useEffect(() => {
        axios.get(info.backendUrl + "/products/BV99122").then((result) => {
            //console.log(result.data.response.products);
            data.setProducts(result.data.response.products);
        });
    }, data.locationID);

    return (
        <>
            <h2>Vælg pakke</h2>
            <div className="wash-product-list">
                {data.products.map((product) => {
                    return (
                        <div className="wash-product shadow">
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
                                    value={product.productid}
                                    onChange={data.onProductChange}
                                />
                                <label
                                    className="wash-btn"
                                    htmlFor={"btn-" + product.productid}
                                >
                                    {product.price} DKK
                                </label>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
