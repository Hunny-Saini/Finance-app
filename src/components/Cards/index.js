import { Card, Row } from 'antd';
import React from 'react';
import "./styles.css";
import Button from '../Button';

function Cards({income, expense, totalBalance,showExpenseModal,showIncomeModal, resetTransaction}) {
  return (
    <div>
        <Row className='my-row'>
            <Card className='my-card' title="Current Balance" >
                <p>₹{totalBalance}</p>
                <Button text={"Reset Balance"} onClick={resetTransaction} />
            </Card>
            <Card className='my-card' title="Total Income" onClick={showIncomeModal}>
                <p>₹{income}</p>
                <Button text={"Add Income"} />
            </Card>
            <Card className='my-card' title="Total Expenses" >
                <p>₹{expense}</p>
                <Button text={"Add Expense"} onClick={showExpenseModal}/>
            </Card>
        </Row>
    </div>
  )
}

export default Cards;