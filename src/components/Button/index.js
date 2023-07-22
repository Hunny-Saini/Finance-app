import React from "react";
import "./styles.css";

function Button({ text, onClick, outline }) {
  return (
    <div className={outline ? "btn btn-outline":"btn" }onClick={onClick}>
      {text}
    </div>
  );
}

export default Button;
