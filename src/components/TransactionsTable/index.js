import React, { useState } from "react";
import "./styles.css";
import { Radio, Select, Table } from "antd";
import searchImg from "./../../assets/search.svg";
import Button from "../Button";
import { parse, unparse } from "papaparse";
import { toast } from "react-toastify";

function TransactionsTable({ transactions, addTransaction, fetchTransactions }) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortkey, setSortKey] = useState("");
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
    },
  ];

  let filteredTransactions = transactions.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      item.type.includes(typeFilter)
  );

  let sortedTransactions = filteredTransactions.sort((a, b) => {
    if (sortkey === "date") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortkey === "amount") {
      return a.amount - b.amount;
    } else {
      return 0;
    }
  });

  function exportCSV() {
    // console.log(transactions);
    var csv = unparse({
      fields: ["name", "type", "date", "amount", "tag"],
      data: transactions,
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transations.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function importFromCSV(event) {
      event.preventDefault();
    try {
      parse(event.target.files[0], {
        header: true,
        complete: async function (results) {
          for(const transation of results.data){
            const newTransaction = {
                ...transation,
                amount: parseFloat(transation.amount),
            };
            await addTransaction(newTransaction);
          }
        },
      });
        toast.success("All Transactions Added");
        fetchTransactions();
        event.target.file = null;
    } catch (e) {
        toast.error(e.message);
    }
  }

  return (
    <div style={{ width: "90%", margin: "1rem auto" }}>
      <div className="search-section">
        <div className="seacrh-bar">
          <img src={searchImg} alt="icon" width={"16"} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search By Name"
          />
        </div>
        <Select
          className="select-input"
          onChange={(value) => setTypeFilter(value)}
          value={typeFilter}
          defaultValue="All"
          style={{
            width: 120,
          }}
          options={[
            {
              value: "",
              label: "All",
            },
            {
              label: "Income",
              value: "income",
            },
            {
              label: "Expense",
              value: "expense",
            },
          ]}
        />
      </div>
      <div className="table-conatiner">
        <div className="sorting-section">
          <h2>My Transactions</h2>
          <Radio.Group
            defaultValue=""
            onChange={(e) => setSortKey(e.target.value)}
            value={sortkey}
          >
            <Radio.Button value="">No Sort</Radio.Button>
            <Radio.Button value="date">Sort by Date</Radio.Button>
            <Radio.Button value="amount">Sort by Amount</Radio.Button>
          </Radio.Group>
          <div className="import-btn">
            <Button text={"Export to CSV"} outline={true} onClick={exportCSV} />
            <label for="file-csv" className="btn">
              Import to CSV
            </label>
            <input
              id="file-csv"
              type="file"
              accept=".csv"
              required
              onChange={importFromCSV}
              style={{ display: "none" }}
            />
          </div>
        </div>
        <Table dataSource={sortedTransactions} columns={columns} />
      </div>
    </div>
  );
}

export default TransactionsTable;
