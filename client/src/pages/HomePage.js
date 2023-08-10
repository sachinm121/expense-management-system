import React, {useState, useEffect} from "react";
import {Form, Input, Modal, Select, Table, message} from "antd";
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';
import Layout from "../components/Layout/Layout";
import axios from 'axios';
import Spinner from '../components/Spinner';

const HomePage = () => {
  const [showModel, setshowModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);
  const [filter, setFilter] = useState("7");
  const [editable, setEditable] = useState(null);
  
  ///table data
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "date",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "date",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "date",
    },
    {
      title: "Refrence",
      dataIndex: "refrence",
      key: "date",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div>
            <EditOutlined onClick={() => {
              setEditable(record);
              setshowModel(true);
            }}/>
            <DeleteOutlined className="mx-2"/>
        </div>
      )
    },
  ];

  

  

  //useEffect Hook 
  useEffect(() => {
    // get all transaction 
    const getAllTransactions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        setLoading(true);
        const response = await axios.post("/transactions/get-transaction", {userid:user._id,
          filter
        });
        setLoading(false);
        setAllTransaction(response.data);
        console.log(response.data)
      } catch (error) {
        console.log(error);
        message.error("Fetch Issue With Transaction");
      }
    }
    getAllTransactions();
  },[filter]);

  //form handling
  const handleSubmit = async(values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"))
      setLoading(true);
      if(editable){
        await axios.post("/transactions/edit-transaction", {
          payload: {
            ...values, 
            userid:user._id,
          },
          transactionId: editable._id,
      })
        setLoading(false);
        message.success("Transaction Updated Successfully");
      }
      else{
        await axios.post("/transactions/add-transaction", {...values, userid:user._id})
        setLoading(false);
        message.success("Transaction Added Successfully");
      }
      setshowModel(false);
      setEditable(null);
    } catch (error) {
      setLoading(false);
      message.error("Failed to add transaction");
    }
  }

  return (
    <Layout>
      {loading && <Spinner /> }
      <div className="filters">
        <div>
          <h6>Select Filter</h6>
          <Select value={filter} onChange={(values) => setFilter(values)}>
            <Select.Option value="7">Last 1 Week</Select.Option>
            <Select.Option value="30">Last 1 Month</Select.Option>
            <Select.Option value="365">Last 1 Year</Select.Option>
          </Select>
        </div>
        <div>
          <button className="btn btn-primary" onClick={()=> setshowModel(true)}>
            Add New
          </button>
        </div>
      </div>
      <div className="content">
        <Table columns={columns} dataSource={allTransaction} rowKey="id" />
      </div>
      <Modal title= {editable ? 'Edit transaction' : 'Add transaction'}
        open={showModel} 
        onCancel = {() => setshowModel(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={handleSubmit} initialValues={editable}>
          <Form.Item label="Amount" name="amount">
              <Input type="text" />
          </Form.Item>

          <Form.Item label="Type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Category" name="category">
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="tip">Tip</Select.Option>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="movie">Movie</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="fee">Fee</Select.Option>
              <Select.Option value="tax">TAX</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Date" name="date">
            <Input type="date" />
          </Form.Item>
          <Form.Item label="Refrence" name="refrence">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input type="text" />
          </Form.Item>

          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              {" "}
              SAVE
              </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;


