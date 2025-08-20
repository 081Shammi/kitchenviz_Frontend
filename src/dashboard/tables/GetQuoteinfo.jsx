import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import { Table, Tag, Spin, Button } from "antd";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function GetQuoteinfo() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const API = `${API_BASE_URL}api/event-requests`;

  useEffect(() => {
    axios
      .get(API)
      .then((response) => {
        const data = Array.isArray(response.data)
          ? response.data
          : [response.data];
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  // Calculate sliced data for current page
  const paginatedData = users.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // On page change handler
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Export with nice formatting & proper column names
  const exportToExcel = () => {
    const formattedData = users.map((item, index) => ({
      "Sl. No.": index + 1,
      "Nature of Event": item.natureOfEvent || "",
      "Name of Event": item.nameOfEvent || "",
      "Date of Event": item.dateOfEvent
        ? new Date(item.dateOfEvent).toLocaleDateString()
        : "",
      "Physical Location": item.physicalLocation || "",
      City: item.city || "",
      Country: item.country || "",
      "Number of People": item.numberOfPeople || "",
      "Start Time": item.startTime || "",
      "End Time": item.endTime || "",
      "Staff Quantity": item.staffQuantity || "",
      "Need Outfit": item.needOutfit ? "Yes" : "No",
      "Need Briefing": item.needBriefing ? "Yes" : "No",
      "Need Head Staff": item.needHeadStaff ? "Yes" : "No",
      "Roles Required": Array.isArray(item.rolesRequired)
        ? item.rolesRequired.join(", ")
        : "",
      "Full Name": item.fullName || "",
      "Company Name": item.companyName || "",
      "Business Sector": item.businessSector || "",
      Address: item.address || "",
      "Contact City": item.contactCity || "",
      "Contact Country": item.contactCountry || "",
      Email: item.email || "",
      "Phone Number": item.phoneNumber || "",
      "Created At": item.createdAt
        ? new Date(item.createdAt).toLocaleString()
        : "",
    }));

    // Create worksheet with formattedData
    const worksheet = XLSX.utils.json_to_sheet(formattedData, { origin: "A1" });

    // Make header row bold
    Object.keys(formattedData[0] || {}).forEach((col, idx) => {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: idx });
      if (!worksheet[cellAddress]) return;
      worksheet[cellAddress].s = {
        font: { bold: true },
      };
    });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Event Requests");

    // Enable styles by using XLSX-style writing
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
      cellStyles: true,
    });

    saveAs(
      new Blob([excelBuffer], { type: "application/octet-stream" }),
      `EventRequests_${new Date().toISOString().split("T")[0]}.xlsx`
    );
  };

  const columns = [
    { title: "Sl. No.", render: (t, r, i) => i + 1, width: 80 },
    { title: "Nature of Event", dataIndex: "natureOfEvent", width: 150 },
    { title: "Name of Event", dataIndex: "nameOfEvent", width: 200 },
    {
      title: "Date of Event",
      dataIndex: "dateOfEvent",
      render: (date) => new Date(date).toLocaleDateString(),
      width: 150,
    },
    { title: "Physical Location", dataIndex: "physicalLocation", width: 200 },
    { title: "City", dataIndex: "city", width: 150 },
    { title: "Country", dataIndex: "country", width: 150 },
    { title: "Number of People", dataIndex: "numberOfPeople", width: 150 },
    { title: "Start Time", dataIndex: "startTime", width: 100 },
    { title: "End Time", dataIndex: "endTime", width: 100 },
    { title: "Staff Quantity", dataIndex: "staffQuantity", width: 120 },
    {
      title: "Need Outfit",
      dataIndex: "needOutfit",
      render: (val) => (val ? "Yes" : "No"),
      width: 120,
    },
    {
      title: "Need Briefing",
      dataIndex: "needBriefing",
      render: (val) => (val ? "Yes" : "No"),
      width: 120,
    },
    {
      title: "Need Head Staff",
      dataIndex: "needHeadStaff",
      render: (val) => (val ? "Yes" : "No"),
      width: 130,
    },
    {
      title: "Roles Required",
      dataIndex: "rolesRequired",
      render: (roles) =>
        Array.isArray(roles)
          ? roles.map((role) => (
              <Tag color="blue" key={role}>
                {role}
              </Tag>
            ))
          : null,
      width: 300,
    },
    { title: "Full Name", dataIndex: "fullName", width: 200 },
    { title: "Company Name", dataIndex: "companyName", width: 200 },
    { title: "Business Sector", dataIndex: "businessSector", width: 200 },
    { title: "Address", dataIndex: "address", width: 200 },
    { title: "Contact City", dataIndex: "contactCity", width: 150 },
    { title: "Contact Country", dataIndex: "contactCountry", width: 150 },
    { title: "Email", dataIndex: "email", width: 220 },
    { title: "Phone Number", dataIndex: "phoneNumber", width: 150 },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (date) => new Date(date).toLocaleString(),
      width: 200,
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "2rem",
          marginBottom: "24px",
        }}
      >
        Event Requests
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 16,
        }}
      >
        <Button type="primary" className="export-btn" onClick={exportToExcel}>
          Export to Excel
        </Button>
      </div>

      {loading ? (
        <Spin size="large" />
      ) : (
        <Table
          dataSource={paginatedData}
          columns={columns}
          rowKey="_id"
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: users.length,
            onChange: handlePageChange,
          }}
          scroll={{ x: 4000 }} // horizontal scroll only
          bordered
        />
      )}
    </div>
  );
}
