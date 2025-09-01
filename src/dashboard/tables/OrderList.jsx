import React, { useState, useEffect } from "react";
import { Table, Button, Popconfirm, Spin } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config";
import { toast } from "react-toastify";

export default function OrderListing() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(1);
  const pageSize = 10;
  const API = `${API_BASE_URL}order/admin`;
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    setLoading(true);
    try {
      const res = await axios.get(API);
      setOrders(res.data);
    } catch (error) {
      toast.error("Failed to fetch orders");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const paginatedData = orders.slice((current - 1) * pageSize, current * pageSize);

  const handleAccept = async (id) => {
    try {
      await axios.patch(`${API_BASE_URL}order/updateStatus/${id}`, { status: "accept" });
      toast.success("Order accepted");
      fetchOrders();
    } catch (error) {
      toast.error("Failed to accept order");
      console.error(error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.patch(`${API_BASE_URL}order/updateStatus/${id}`, { status: "reject" });
      toast.success("Order rejected");
      fetchOrders();
    } catch (error) {
      toast.error("Failed to reject order");
      console.error(error);
    }
  };

  const handlePageChange = (page) => {
    setCurrent(page);
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "_id",
      key: "_id",
      width: 120,
      render: (id) => id.slice(-6).toUpperCase(),
    },
    {
      title: "Customer",
      dataIndex: ["shippingAddress", "fullName"],
      key: "customerName",
      width: 150,
      render: (text, record) => record.shippingAddress?.fullName || "N/A",
    },
    {
      title: "Age",
      dataIndex: ["contactDetails", "age"],
      key: "age",
      width: 150,
      render: (text, record) => record.contactDetails?.age || "N/A",
    },
    
    {
      title: "Email",
      dataIndex: ["contactDetails", "email"],
      key: "email",
      width: 180,
      render: (text, record) => record.contactDetails?.email || "N/A",
    },
    {
      title: "Items",
      dataIndex: "orderItems",
      key: "orderItems",
      width: 290,
      render: (items) => (
        <ul style={{ maxHeight: 80, overflowY: "auto", paddingLeft: 16, margin: 0 }}>
          {items.map((item) => (
            <li key={item._id}>
              {item.name} × {item.quantity}
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "Total (₹)",
      dataIndex: "totalPrice",
      key: "totalPrice",
      width: 110,
      render: (amount) => amount.toLocaleString('en-IN'),
    },
    {
      title: "Payment",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      width: 100,
    },
    {
      title: "Status",
      key: "status",
      width: 120,
      render: (_, record) => {
        let status = "Pending";
        let color = "#666";
        if (record.isOrderAccepted) {
          status = "Accepted";
          color = "green";
        } else if (record.isOrderRejected) {
          status = "Rejected";
          color = "red";
        }
        return <span style={{ color, fontWeight: "bold" }}>{status}</span>;
      }
    },
    {
      title: "Actions",
      key: "actions",
      fixed: "right",
      width: 260,
      render: (_, record) => {
        if (record.isOrderAccepted) {
          return (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <span className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
                Accepted
              </span>
              <Button
                size="small"
                onClick={() => navigate(`/dashboard/orders/${record._id}`)}
                style={{
                  backgroundColor: "#f8fafc",
                  color: "#0366d6",
                  fontWeight: 600
                }}
              >
                View Details
              </Button>
            </div>
          );
        }
        if (record.isOrderRejected) {
          return (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <span className="inline-block px-4 py-1 rounded-full bg-red-100 text-red-700 font-semibold">
                Rejected
              </span>
              <Button
                size="small"
                onClick={() => navigate(`/dashboard/orders/${record._id}`)}
                style={{
                  backgroundColor: "#f8fafc",
                  color: "#0366d6",
                  fontWeight: 600
                }}
              >
                View Details
              </Button>
            </div>
          );
        }
        return (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <Button
              type="primary"
              size="small"
              onClick={() => handleAccept(record._id)}
            >
              Accept
            </Button>
            <Popconfirm
              title="Are you sure to reject this order?"
              onConfirm={() => handleReject(record._id)}
              okText="Yes"
              cancelText="No"
            >
              <Button danger size="small">
                Reject
              </Button>
            </Popconfirm>
            <Button
              size="small"
              onClick={() => navigate(`/dashboard/orders/${record._id}`)}
              style={{
                backgroundColor: "#f8fafc",
                color: "#0366d6",
                fontWeight: 600
              }}
            >
              View Details
            </Button>
          </div>
        );
      },
    }
  ];

  return (
    <div className="px-2 py-4 sm:px-6 lg:px-8">
      <h2 className="text-xl sm:text-2xl font-bold text-center mb-4">Orders</h2>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Spin size="large" />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={paginatedData}
            rowKey={(record) => record._id}
            pagination={{
              current,
              pageSize,
              total: orders.length,
              onChange: handlePageChange,
              showSizeChanger: false,
            }}
            scroll={{ x: 900 }}
            bordered
            className="min-w-[600px]"
          />
        )}
      </div>
    </div>
  );
}
