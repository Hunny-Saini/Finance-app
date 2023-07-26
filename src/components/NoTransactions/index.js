import React from 'react';
import transactionsImg from "./../../assets/transactions.svg";
import "./styles.css"

function NoTransactions() {
  return (
    <div className='no-container'>
        <img className='no-img' src={transactionsImg} alt='no-transaction'/>
        <p className='no-text'>You Have No Transactions Currently</p>
    </div>
  )
}

export default NoTransactions;