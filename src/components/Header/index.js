import React from 'react';
import "./styles.css";

function Header() {

  function handleLogout(){
    alert("Logout!!");
  }

  return (
    <div className='navbar'>
      <p className='logo'>Financely.</p>
      <p className='link' onClick={handleLogout}>Logout</p>
    </div>
  )
}

export default Header;