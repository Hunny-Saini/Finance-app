import React from "react";
import "./styles.css";

function Input({ label, state, setState, placeholder }) {
  return (
    <div className="input-wrapper">
      <p className="input-label">{label}</p>
      <input
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder={placeholder}
        className="custom-input"
      />
    </div>
  );
}

export default Input;
