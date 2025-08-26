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

  // const columns = [
  //   {
  //     title: "Order ID",
  //     dataIndex: "_id",
  //     key: "_id",
  //     width: 220,
  //     render: (id) => id.slice(-6).toUpperCase(), // Shortened ID for display
  //   },
  //   {
  //     title: "Customer Name",
  //     dataIndex: "customerName",
  //     key: "customerName",
  //     width: 180,
  //   },
  //   {
  //     title: "Items",
  //     dataIndex: "items",
  //     key: "items",
  //     width: 340,
  //     render: (items) => (
  //       <ul style={{ maxHeight: 80, overflowY: "auto", paddingLeft: 16 }}>
  //         {items.map((item) => (
  //           <li key={item.productId}>
  //             {item.name} x {item.qty}
  //           </li>
  //         ))}
  //       </ul>
  //     ),
  //   },
  //   {
  //     title: "Total Amount (₹)",
  //     dataIndex: "totalAmount",
  //     key: "totalAmount",
  //     width: 140,
  //     render: (amount) => amount.toFixed(2),
  //   },
  //   {
  //     title: "Status",
  //     dataIndex: "status",
  //     key: "status",
  //     width: 120,
  //     render: (status) => {
  //       let color = "gray";
  //       if (status === "Accepted") color = "green";
  //       else if (status === "Rejected") color = "red";
  //       return <span style={{ color, fontWeight: "bold" }}>{status}</span>;
  //     },
  //   },
  //   {
  //     title: "Actions",
  //     key: "actions",
  //     width: 200,
  //     fixed: "right",
  //     render: (_, record) => (
  //       <div className="flex space-x-2">
  //         <Button
  //           type="primary"
  //           size="small"
  //           disabled={record.status === "Accepted"}
  //           onClick={() => handleAccept(record._id)}
  //         >
  //           Accept
  //         </Button>
  //         <Popconfirm
  //           title="Are you sure to reject this order?"
  //           onConfirm={() => handleReject(record._id)}
  //           okText="Yes"
  //           cancelText="No"
  //           disabled={record.status === "Rejected"}
  //         >
  //           <Button
  //             danger
  //             size="small"
  //             disabled={record.status === "Rejected"}
  //           >
  //             Reject
  //           </Button>
  //         </Popconfirm>
  //       </div>
  //     ),
  //   },
  // ];
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
      width: 130,
      render: (text, record) => record.shippingAddress?.fullName || "N/A",
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
      width: 260, // Adjust width as needed for 3 buttons
      render: (_, record) => {
        // Accepted
        if (record.isOrderAccepted) {
          return (
            <div className="flex items-center gap-2">
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
        // Rejected
        if (record.isOrderRejected) {
          return (
            <div className="flex items-center gap-2">
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
        // Pending: Accept, Reject, View Details
        return (
          <div className="flex items-center gap-2">
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
    <div style={{ padding: 20 }}>
      <h2 style={{ marginBottom: 20 }}>Orders</h2>
      {loading ? (
        <Spin size="large" style={{ display: "block", margin: "auto" }} />
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
          }}
          scroll={{ x: 1000 }}
          bordered
        />
      )}
    </div>
  );
}
