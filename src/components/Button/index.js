import React from "react";
import "./styles.css";

function Button({ text, onClick, outline, disabled }) {
  return (
    <div className={outline ? "btn btn-outline":"btn" }onClick={onClick} disabled={disabled}>
      {text}
    </div>
  );
}

export default Button;
