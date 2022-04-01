import React from "react";

export default function WashLocation(data) {
    function sortArray(a, b) {
        if (a.status !== "available") {
            return 1;
        }
        if (b.status !== "available") {
            return 1;
        }
        return 0;
    }

    return (
        <div>
            <h2 className="mt-5">Vælg bilvask</h2>
            <div className="d-grid wash-location-list">
                {data.locations.map((location) => {
                    return (
                        <div key={location.id}>
                            <input
                                type="radio"
                                className="btn-check"
                                id={"card-" + location.id}
                                name="location-id"
                                disabled={
                                    location.status !== "available" ? "on" : ""
                                }
                                onChange={data.onChoice}
                                value={location.id}
                            />
                            <label
                                className={
                                    "wash-location-card " + location.status
                                }
                                htmlFor={"card-" + location.id}
                            >
                                {location.name}
                                {location.status === "available" && (
                                    <i className="bi bi-arrow-right"></i>
                                )}
                            </label>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
