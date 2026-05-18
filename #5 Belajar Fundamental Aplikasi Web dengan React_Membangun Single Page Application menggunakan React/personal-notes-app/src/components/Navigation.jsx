import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
    return (
        <div className="navigation">
            <ul>
                <li>
                    <h1>
                        <Link to="/">CatatanKu</Link>
                    </h1>
                </li>
                <li>
                    <Link to="/archives">Arsip</Link>
                </li>
            </ul>
        </div>
    );
};

export default Navigation;
