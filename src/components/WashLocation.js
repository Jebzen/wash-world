import React from "react";

export default function WashLocation(prop) {
    return (
        <div>
            <input
                type="radio"
                className="btn-check"
                id={"card-" + prop.location.id}
                name="location-id"
                disabled={prop.location.status !== "available" ? "on" : ""}
                onChange={prop.onChoice}
                value={prop.location.id}
            />
            <label
                className={"wash-location-card " + prop.location.status}
                htmlFor={"card-" + prop.location.id}
            >
                {prop.location.name}
                {prop.location.status === "available" && (
                    <i className="bi bi-arrow-right"></i>
                )}
            </label>
        </div>
    );
}
