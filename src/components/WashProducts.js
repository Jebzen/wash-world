import React, { useEffect } from "react";
import info from "../info";
import axios from "axios";

export default function WashProducts(data) {
    return (
        <div className="wash-product shadow">
            <div>
                <h3>{data.product.name}</h3>
                <p>{data.product.description}</p>
            </div>
            <div className="price-section">
                <input
                    type="radio"
                    className="btn-check"
                    id={"btn-" + data.product.productid}
                    name="product-id"
                    value={data.product.program}
                    onChange={data.onProductChange}
                />
                <label
                    className="wash-btn"
                    htmlFor={"btn-" + data.product.productid}
                >
                    {data.product.price} DKK
                </label>
            </div>
        </div>
    );
}
