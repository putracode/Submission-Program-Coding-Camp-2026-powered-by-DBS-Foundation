import React from "react";

const ActionButton = ({ title, onClick, icon }) => (
    <button className="action" type="button" title={title} onClick={onClick}>
        {icon}
    </button>
);

export default ActionButton;
