import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../config";
import axios from "axios";
import { Table, Tag, Spin, Button, Modal } from "antd";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const Recruitmentinfo = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const API = `${API_BASE_URL}api/staff-requests`;

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

  const getImageUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    if (url.startsWith("assets/")) {
      return `${API_BASE_URL}${url}`;
    }
    return `${API_BASE_URL}${url}`;
  };

  const handleImageClick = (imageUrl, altText) => {
    setSelectedImage({ url: imageUrl, alt: altText });
    setImageModalVisible(true);
  };

  const handleModalClose = () => {
    setImageModalVisible(false);
    setSelectedImage(null);
  };
  // Calculate sliced data for current page
  const paginatedData = users.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // On page change handler
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const exportToExcel = () => {
    const header = [
      "Sl. No.",
      "First Name",
      "Last Name",
      "Address",
      "City",
      "Country",
      "Place of Birth",
      "DOB",
      "Status",
      "Telephone",
      "Cell Phone",
      "Email",
      "Weight(In kg)",
      "Height(In cm)",
      "Shoe Size(UK)",
      "Blazer Size",
      "Trouser Size",
      "Student",
      "School",
      "Degree",
      "Languages",
      "Hostess Experience",
      "Group Responsible",
      "Agency",
      "Experience Areas",
      "Work Type",
      "Holiday Work",
      "Availability",
      "Profile Photo",
      "Created At",
    ];

    const data = users.map((u, i) => [
      i + 1,
      u.firstName || "",
      u.lastName || "",
      u.address || "",
      u.city || "",
      u.country || "",
      u.placeOfBirth || "",
      u.dob ? new Date(u.dob).toLocaleDateString() : "",
      u.status || "",
      u.telephone || "",
      u.cellPhone || "",
      u.email || "",
      u.weight || "",
      u.height || "",
      u.shoeSize || "",
      u.blazerSize || "",
      u.trouserSize || "",
      u.student || "",
      u.school || "",
      u.degree || "",
      Array.isArray(u.languages)
        ? u.languages.map((l) => `${l.name} (${l.proficiency})`).join(", ")
        : "",
      u.hostessExperience || "",
      u.groupResponsible || "",
      u.agency || "",
      Array.isArray(u.experienceAreas) ? u.experienceAreas.join(", ") : "",
      u.workType || "",
      u.holidayWork || "",
      (() => {
        const av = u.availability || {};
        const labels = [];
        if (av.fullDay) labels.push("Full Day");
        if (av.partTime) labels.push("Part Time");
        if (av.both) labels.push("Both");
        return labels.join(", ") || "None";
      })(),
      Array.isArray(u.profilePhoto) && u.profilePhoto.length > 0
        ? u.profilePhoto.map((p) => p.name?.original || "Photo").join(", ")
        : "No Photo",
      u.createdAt ? new Date(u.createdAt).toLocaleString() : "",
    ]);

    const worksheet = XLSX.utils.aoa_to_sheet([header, ...data]);
    header.forEach((h, idx) => {
      const cellAddr = XLSX.utils.encode_cell({ r: 0, c: idx });
      if (worksheet[cellAddr]) {
        worksheet[cellAddr].s = { font: { bold: true } };
      }
    });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Recruitment Info");

    const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    saveAs(
      new Blob([buffer], { type: "application/octet-stream" }),
      `RecruitmentInfo_${new Date().toISOString().split("T")[0]}.xlsx`
    );
  };

  const columns = [
    {
      title: "Sl. No.",
      key: "slno",
      width: 80,
      render: (_, __, index) => index + 1,
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      width: 150,
    },
    { title: "Last Name", dataIndex: "lastName", key: "lastName", width: 150 },
    { title: "Address", dataIndex: "address", key: "address", width: 200 },
    { title: "City", dataIndex: "city", key: "city", width: 150 },
    { title: "Country", dataIndex: "country", key: "country", width: 150 },
    {
      title: "Place of Birth",
      dataIndex: "placeOfBirth",
      key: "placeOfBirth",
      width: 150,
    },
    {
      title: "DOB",
      dataIndex: "dob",
      key: "dob",
      width: 160,
      render: (date) => new Date(date).toLocaleDateString(),
    },
    { title: "Status", dataIndex: "status", key: "status", width: 100 },
    {
      title: "Telephone",
      dataIndex: "telephone",
      key: "telephone",
      width: 150,
    },
    {
      title: "Cell Phone",
      dataIndex: "cellPhone",
      key: "cellPhone",
      width: 150,
    },
    { title: "Email", dataIndex: "email", key: "email", width: 220 },
    { title: "Weight (In kg)", dataIndex: "weight", key: "weight", width: 130 },
    { title: "Height (In cm)", dataIndex: "height", key: "height", width: 130 },
    {
      title: "Shoe Size(UK)",
      dataIndex: "shoeSize",
      key: "shoeSize",
      width: 130,
    },
    {
      title: "Blazer Size",
      dataIndex: "blazerSize",
      key: "blazerSize",
      width: 120,
    },
    {
      title: "Trouser Size",
      dataIndex: "trouserSize",
      key: "trouserSize",
      width: 120,
    },
    { title: "Student", dataIndex: "student", key: "student", width: 100 },
    { title: "School", dataIndex: "school", key: "school", width: 150 },
    { title: "Degree", dataIndex: "degree", key: "degree", width: 150 },
    {
      title: "Languages",
      dataIndex: "languages",
      key: "languages",
      width: 250,
      render: (langs) =>
        langs.map(({ name, proficiency, _id }) => (
          <Tag color="purple" key={_id}>
            {name} ({proficiency})
          </Tag>
        )),
    },
    {
      title: "Hostess Experience",
      dataIndex: "hostessExperience",
      key: "hostessExperience",
      width: 150,
    },
    {
      title: "Group Responsible",
      dataIndex: "groupResponsible",
      key: "groupResponsible",
      width: 150,
    },
    { title: "Agency", dataIndex: "agency", key: "agency", width: 150 },
    {
      title: "Experience Areas",
      dataIndex: "experienceAreas",
      key: "experienceAreas",
      width: 300,
      render: (areas) =>
        areas.map((area) => (
          <Tag color="green" key={area}>
            {area}
          </Tag>
        )),
    },
    { title: "Work Type", dataIndex: "workType", key: "workType", width: 120 },
    {
      title: "Holiday Work",
      dataIndex: "holidayWork",
      key: "holidayWork",
      width: 120,
    },
    {
      title: "Availability",
      dataIndex: "availability",
      key: "availability",
      width: 180,
      render: (availability) => {
        const labels = [];
        if (availability.fullDay) labels.push("Full Day");
        if (availability.partTime) labels.push("Part Time");
        if (availability.both) labels.push("Both");
        return labels.join(", ") || "None";
      },
    },
    {
      title: "Profile Photo",
      dataIndex: "profilePhoto",
      key: "profilePhoto",
      width: 120,
      render: (photos) => {
        if (Array.isArray(photos) && photos.length > 0) {
          return (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {photos.map((media, i) => {
                if (
                  media.image_url &&
                  media.image_url.thumbnail &&
                  media.image_url.thumbnail.high_res
                ) {
                  const thumbnailUrl = getImageUrl(
                    media.image_url.thumbnail.low_res ||
                      media.image_url.thumbnail.high_res
                  );
                  const fullUrl = getImageUrl(media.image_url.full.high_res);
                  const altText = media.name?.original || "Profile Photo";

                  return (
                    <div key={i} style={{ textAlign: "center" }}>
                      <div
                        onClick={() => handleImageClick(fullUrl, altText)}
                        style={{
                          cursor: "pointer",
                          display: "inline-block",
                        }}
                        title="Click to view full image"
                      >
                        <img
                          src={thumbnailUrl}
                          alt={altText}
                          style={{
                            width: 48,
                            height: 48,
                            objectFit: "cover",
                            borderRadius: 6,
                            border: "1px solid #e5e7eb",
                            transition: "transform 0.2s, box-shadow 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.transform = "scale(1.05)";
                            e.target.style.boxShadow =
                              "0 4px 12px rgba(0,0,0,0.15)";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform = "scale(1)";
                            e.target.style.boxShadow = "none";
                          }}
                          onError={(e) => {
                            console.error(
                              "Failed to load image:",
                              thumbnailUrl
                            );
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </div>
                      <Button
                        type="link"
                        size="small"
                        onClick={() => handleImageClick(fullUrl, altText)}
                        style={{
                          padding: 0,
                          marginTop: 4,
                          fontWeight: 500,
                          color: "#3182ce",
                          fontSize: 12,
                          display: "block",
                        }}
                      >
                        View
                      </Button>
                    </div>
                  );
                }

                if (media.doc_url) {
                  return (
                    <a
                      key={i}
                      href={getImageUrl(media.doc_url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#6366f1",
                        fontWeight: 500,
                        fontSize: 12,
                      }}
                    >
                      PDF
                    </a>
                  );
                }

                if (
                  media.video_url &&
                  (media.video_url.video?.high_res ||
                    media.video_url.video?.low_res)
                ) {
                  return (
                    <span
                      key={i}
                      style={{
                        color: "#06b6d4",
                        fontWeight: 500,
                        fontSize: 12,
                      }}
                    >
                      Video
                    </span>
                  );
                }

                return (
                  <span key={i} style={{ fontSize: 12 }}>
                    Media
                  </span>
                );
              })}
            </div>
          );
        }
        return <span style={{ color: "#64748b", fontSize: 12 }}>No Photo</span>;
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 180,
      render: (date) => new Date(date).toLocaleString(),
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
        Recruitment Information
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

      <Modal
        title="Profile Photo"
        open={imageModalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={600}
        centered
        styles={{
          body: {
            padding: 20,
            textAlign: "center",
            backgroundColor: "#f8f9fa",
          },
        }}
      >
        {selectedImage && (
          <div>
            <img
              src={selectedImage.url}
              alt={selectedImage.alt}
              style={{
                maxWidth: "100%",
                maxHeight: "70vh",
                objectFit: "contain",
                borderRadius: 8,
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
              onError={(e) => {
                e.currentTarget.src =
                  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=";
              }}
            />
            <p
              style={{
                marginTop: 16,
                color: "#666",
                fontSize: 14,
                fontStyle: "italic",
              }}
            >
              {selectedImage.alt}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Recruitmentinfo;
