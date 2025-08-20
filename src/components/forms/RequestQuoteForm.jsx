/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Checkbox,
  Card,
  Divider,
  Row,
  Col,
  message,
  Radio,
  TimePicker,
} from "antd";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { API_BASE_URL } from "../../config";

const RequestQuoteForm = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      nature: "",
      eventName: "",
      date: null,
      location: "",
      eventCity: "",
      eventCountry: "",
      noOfPeople: "",
      workingHoursFrom: null,
      workingHoursTo: null,
      staffQuantity: "",
      needOutfit: null,
      needStaffBriefing: null,
      needHeadStaff: null,
      receptionist: false,
      multilingualHostess: false,
      travelHostess: false,
      salesHostess: false,
      fullName: "",
      company: "",
      businessSector: "",
      address: "",
      city: "",
      country: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (formValues) => {
    try {
      console.log("Form submission started with values:", formValues);

      const payload = {
        natureOfEvent: formValues.nature,
        nameOfEvent: formValues.eventName,
        dateOfEvent: formValues.date
          ? dayjs(formValues.date).format("YYYY-MM-DD")
          : null,
        physicalLocation: formValues.location,
        city: formValues.eventCity,
        country: formValues.eventCountry,
        numberOfPeople: Number(formValues.noOfPeople),
        startTime: formValues.workingHoursFrom
          ? dayjs(formValues.workingHoursFrom).format("HH:mm")
          : null,
        endTime: formValues.workingHoursTo
          ? dayjs(formValues.workingHoursTo).format("HH:mm")
          : null,
        staffQuantity: formValues.staffQuantity,
        needOutfit: formValues.needOutfit,
        needBriefing: formValues.needStaffBriefing,
        needHeadStaff: formValues.needHeadStaff,
        rolesRequired: [
          formValues.receptionist ? "Receptionist" : null,
          formValues.multilingualHostess ? "Multilingual Hostess" : null,
          formValues.travelHostess ? "Travel Hostess" : null,
          formValues.salesHostess ? "Sales Hostess" : null,
        ].filter(Boolean),
        fullName: formValues.fullName,
        companyName: formValues.company,
        businessSector: formValues.businessSector,
        address: formValues.address,
        contactCity: formValues.city,
        contactCountry: formValues.country,
        email: formValues.email,
        phoneNumber: formValues.phone,
      };

      console.log("Sending payload:", payload);

      const res = await fetch(`${API_BASE_URL}api/event-requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("Response status:", res.status);
      console.log("Response ok:", res.ok);

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Error response:", errorText);
        throw new Error(
          `HTTP error! status: ${res.status}, message: ${errorText}`
        );
      }

      const responseData = await res.json();
      message.success("Quote request submitted successfully!");
      console.log("API Response:", responseData);
      reset();
    } catch (error) {
      console.error("Error submitting request:", error);
      message.error(`Failed to submit quote request: ${error.message}`);
    }
  };

  // Add this function to handle form validation errors
  const onError = (errors) => {
    console.log("Form validation errors:", errors);
    message.error("Please fill in all required fields correctly");
  };

  return (
    <div
      style={{
        height: "100vh",
        overflowY: "auto",
        background: "#000",
        color: "#fff",
        margin: 0,
        padding: 0,
      }}
    >
      <style>{`
      body, html, #root {
           margin: 0;
           padding: 0;
           background: #000 !important;
         }

        .ant-form-item-label > label {
          color: #fff !important;
        }
        .ant-checkbox-wrapper {
          color: #fff !important;
        }
        .ant-checkbox + span {
          color: #fff !important;
        }
        .ant-radio-wrapper {
          color: #fff !important;
        }
        .ant-radio + span {
          color: #fff !important;
        }
      `}</style>

      {/* Back Button */}
      <motion.div
        style={{ marginTop: 24, marginBottom: 16 }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <button
          type="button"
          onClick={() => navigate(-1)}
          style={{
            minWidth: 100,
            fontSize: 16,
            padding: "8px 20px",
            borderRadius: "999px",
            color: "#fff",
            background: "transparent",
            border: "1px solid #fff",
            cursor: "pointer",
          }}
        >
          <span style={{ marginRight: 6 }}>&#8592;</span> Back
        </button>
      </motion.div>

      <motion.h1
        className="text-2xl font-bold text-center my-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        style={{ color: "#fff" }}
      >
        Request a <span style={{ color: "#FFD700" }}>Quote</span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
      >
        <Form
          layout="vertical"
          onFinish={handleSubmit(onSubmit, onError)}
          style={{
            maxWidth: 700,
            margin: "32px auto",
            padding: 24,
            borderRadius: 16,
          }}
        >
          {/* Your Event */}
          <Card
            style={{ marginBottom: 24, background: "#000", border: "none" }}
          >
            <Divider
              style={{
                color: "#FFD700",
                borderColor: "#FFD700",
                fontWeight: 700,
              }}
              orientation="left"
            >
              <span style={{ color: "#fff" }}>Your Event</span>
            </Divider>
            <Row gutter={[16, 0]}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Nature of the event"
                  required
                  validateStatus={errors.nature ? "error" : ""}
                  help={
                    errors.nature?.message ||
                    (errors.nature && "Please enter event nature")
                  }
                >
                  <Controller
                    name="nature"
                    control={control}
                    rules={{ required: "Please enter the nature of the event" }}
                    render={({ field }) => (
                      <Input {...field} placeholder="Eg: Conference" />
                    )}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Name of the event"
                  required
                  validateStatus={errors.eventName ? "error" : ""}
                  help={
                    errors.eventName?.message ||
                    (errors.eventName && "Please enter event name")
                  }
                >
                  <Controller
                    name="eventName"
                    control={control}
                    rules={{ required: "Please enter the event name" }}
                    render={({ field }) => (
                      <Input {...field} placeholder="Eg: Annual Meetup" />
                    )}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 0]}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Date of the event"
                  required
                  validateStatus={errors.date ? "error" : ""}
                  help={
                    errors.date?.message ||
                    (errors.date && "Please pick a date")
                  }
                >
                  <Controller
                    name="date"
                    control={control}
                    rules={{ required: "Please select the event date" }}
                    render={({ field }) => (
                      <DatePicker {...field} style={{ width: "100%" }} />
                    )}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 0]}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Physical location"
                  required
                  validateStatus={errors.location ? "error" : ""}
                  help={
                    errors.location?.message ||
                    (errors.location && "Please enter location")
                  }
                >
                  <Controller
                    name="location"
                    control={control}
                    rules={{ required: "Please enter the location" }}
                    render={({ field }) => (
                      <Input {...field} placeholder="Eg: Hotel Grand, NY" />
                    )}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="City"
                  required
                  validateStatus={errors.eventCity ? "error" : ""}
                  help={
                    errors.eventCity?.message ||
                    (errors.eventCity && "Please enter city")
                  }
                >
                  <Controller
                    name="eventCity"
                    control={control}
                    rules={{ required: "Please enter the city" }}
                    render={({ field }) => (
                      <Input {...field} placeholder="City" />
                    )}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 0]}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Country"
                  required
                  validateStatus={errors.eventCountry ? "error" : ""}
                  help={
                    errors.eventCountry?.message ||
                    (errors.eventCountry && "Please enter country")
                  }
                >
                  <Controller
                    name="eventCountry"
                    control={control}
                    rules={{ required: "Please enter the country" }}
                    render={({ field }) => (
                      <Input {...field} placeholder="Country" />
                    )}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 0]}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="No. of People"
                  required
                  validateStatus={errors.noOfPeople ? "error" : ""}
                  help={
                    errors.noOfPeople?.message ||
                    (errors.noOfPeople && "Please enter number of people")
                  }
                >
                  <Controller
                    name="noOfPeople"
                    control={control}
                    rules={{
                      required: "Please enter the number of people",
                      pattern: {
                        value: /^\d+$/,
                        message: "Please enter a valid number",
                      },
                    }}
                    render={({ field }) => (
                      <Input {...field} placeholder="Eg: 150" />
                    )}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Divider orientation="left" style={{ color: "#fff" }}>
              Working hours
            </Divider>
            <Row gutter={[16, 0]}>
              <Col xs={24} md={6}>
                <Form.Item
                  label="From"
                  required
                  validateStatus={errors.workingHoursFrom ? "error" : ""}
                  help={
                    errors.workingHoursFrom?.message ||
                    (errors.workingHoursFrom && "Please select start time")
                  }
                >
                  <Controller
                    name="workingHoursFrom"
                    control={control}
                    rules={{ required: "Please select start time" }}
                    render={({ field }) => (
                      <TimePicker
                        {...field}
                        style={{ width: "100%" }}
                        format="HH:mm"
                      />
                    )}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={6}>
                <Form.Item
                  label="To"
                  required
                  validateStatus={errors.workingHoursTo ? "error" : ""}
                  help={
                    errors.workingHoursTo?.message ||
                    (errors.workingHoursTo && "Please select end time")
                  }
                >
                  <Controller
                    name="workingHoursTo"
                    control={control}
                    rules={{ required: "Please select end time" }}
                    render={({ field }) => (
                      <TimePicker
                        {...field}
                        style={{ width: "100%" }}
                        format="HH:mm"
                      />
                    )}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          {/* Your Needs */}
          <Card
            style={{ marginBottom: 24, background: "#000", border: "none" }}
          >
            <Divider
              style={{
                color: "#FFD700",
                borderColor: "#FFD700",
                fontWeight: 700,
              }}
              orientation="left"
            >
              <span style={{ color: "#fff" }}>Your Needs</span>
            </Divider>
            <Form.Item
              label="Quantity of staff desired"
              required
              validateStatus={errors.staffQuantity ? "error" : ""}
              help={
                errors.staffQuantity?.message ||
                (errors.staffQuantity && "Please enter quantity")
              }
            >
              <Controller
                name="staffQuantity"
                control={control}
                rules={{ required: "Please enter staff quantity" }}
                render={({ field }) => (
                  <Input.TextArea
                    {...field}
                    placeholder="Enter number and any details"
                    autoSize
                  />
                )}
              />
            </Form.Item>
            <Row gutter={[16, 0]}>
              <Col xs={24} md={6}>
                <Form.Item
                  label="Need outfit?"
                  validateStatus={errors.needOutfit ? "error" : ""}
                  help={errors.needOutfit?.message}
                >
                  <Controller
                    name="needOutfit"
                    control={control}
                    rules={{
                      validate: (value) =>
                        value === true ||
                        value === false ||
                        "Please select if you need outfit",
                    }}
                    render={({ field }) => (
                      <Radio.Group
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                      >
                        <Radio value={true}>Yes</Radio>
                        <Radio value={false}>No</Radio>
                      </Radio.Group>
                    )}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={6}>
                <Form.Item
                  label="Need briefing?"
                  validateStatus={errors.needStaffBriefing ? "error" : ""}
                  help={errors.needStaffBriefing?.message}
                >
                  <Controller
                    name="needStaffBriefing"
                    control={control}
                    rules={{
                      validate: (value) =>
                        value === true ||
                        value === false ||
                        "Please select if you need briefing",
                    }}
                    render={({ field }) => (
                      <Radio.Group
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                      >
                        <Radio value={true}>Yes</Radio>
                        <Radio value={false}>No</Radio>
                      </Radio.Group>
                    )}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={6}>
                <Form.Item
                  label="Need head staff?"
                  validateStatus={errors.needHeadStaff ? "error" : ""}
                  help={errors.needHeadStaff?.message}
                >
                  <Controller
                    name="needHeadStaff"
                    control={control}
                    rules={{
                      validate: (value) =>
                        value === true ||
                        value === false ||
                        "Please select if you need head staff",
                    }}
                    render={({ field }) => (
                      <Radio.Group
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                      >
                        <Radio value={true}>Yes</Radio>
                        <Radio value={false}>No</Radio>
                      </Radio.Group>
                    )}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          {/* Roles Required */}
          <Card
            style={{ marginBottom: 24, background: "#000", border: "none" }}
          >
            <Divider
              style={{
                color: "#FFD700",
                borderColor: "#FFD700",
                fontWeight: 700,
              }}
              orientation="left"
            >
              <span style={{ color: "#fff" }}>Roles Required</span>
            </Divider>
            <Row gutter={[16, 8]}>
              {[
                { key: "receptionist", label: "Receptionist" },
                { key: "multilingualHostess", label: "Multilingual Hostess" },
                { key: "travelHostess", label: "Travel Hostess" },
                { key: "salesHostess", label: "Sales Hostess" },
              ].map((role) => (
                <Col xs={24} sm={6} key={role.key}>
                  <Controller
                    name={role.key}
                    control={control}
                    render={({ field }) => (
                      <Checkbox {...field} checked={field.value}>
                        {role.label}
                      </Checkbox>
                    )}
                  />
                </Col>
              ))}
            </Row>
          </Card>

          {/* Contact Information */}
          <Card
            style={{ marginBottom: 24, background: "#000", border: "none" }}
          >
            <Divider
              style={{
                color: "#FFD700",
                borderColor: "#FFD700",
                fontWeight: 700,
              }}
              orientation="left"
            >
              <span style={{ color: "#fff" }}>Contact Information</span>
            </Divider>
            <Row gutter={[16, 0]}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Full Name"
                  required
                  validateStatus={errors.fullName ? "error" : ""}
                  help={
                    errors.fullName?.message ||
                    (errors.fullName && "Please enter your name")
                  }
                >
                  <Controller
                    name="fullName"
                    control={control}
                    rules={{ required: "Please enter your full name" }}
                    render={({ field }) => (
                      <Input {...field} placeholder="Your name" />
                    )}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="Company">
                  <Controller
                    name="company"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} placeholder="Your company" />
                    )}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 0]}>
              <Col xs={24} md={12}>
                <Form.Item label="Business Sector">
                  <Controller
                    name="businessSector"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} placeholder="Eg: IT, Hospitality" />
                    )}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Address"
                  required
                  validateStatus={errors.address ? "error" : ""}
                  help={
                    errors.address?.message ||
                    (errors.address && "Please enter your address")
                  }
                >
                  <Controller
                    name="address"
                    control={control}
                    rules={{ required: "Please enter your address" }}
                    render={({ field }) => (
                      <Input {...field} placeholder="Street, Building" />
                    )}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 0]}>
              <Col xs={24} md={8}>
                <Form.Item
                  label="City"
                  required
                  validateStatus={errors.city ? "error" : ""}
                  help={
                    errors.city?.message ||
                    (errors.city && "Please enter your city")
                  }
                >
                  <Controller
                    name="city"
                    control={control}
                    rules={{ required: "Please enter your city" }}
                    render={({ field }) => (
                      <Input {...field} placeholder="City" />
                    )}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item
                  label="Country"
                  required
                  validateStatus={errors.country ? "error" : ""}
                  help={
                    errors.country?.message ||
                    (errors.country && "Please enter your country")
                  }
                >
                  <Controller
                    name="country"
                    control={control}
                    rules={{ required: "Please enter your country" }}
                    render={({ field }) => (
                      <Input {...field} placeholder="Country" />
                    )}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 0]}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Email"
                  required
                  validateStatus={errors.email ? "error" : ""}
                  help={
                    errors.email?.message ||
                    (errors.email && "Please enter a valid email")
                  }
                >
                  <Controller
                    name="email"
                    control={control}
                    rules={{
                      required: "Please enter your email",
                      pattern: {
                        value: /^\S+@\S+\.\S+$/i,
                        message: "Please enter a valid email address",
                      },
                    }}
                    render={({ field }) => (
                      <Input {...field} placeholder="Email" />
                    )}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Phone Number"
                  required
                  validateStatus={errors.phone ? "error" : ""}
                  help={
                    errors.phone?.message ||
                    (errors.phone && "Please enter your phone number")
                  }
                >
                  <Controller
                    name="phone"
                    control={control}
                    rules={{ required: "Please enter your phone number" }}
                    render={({ field }) => (
                      <Input {...field} placeholder="Phone number" />
                    )}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          {/* Submit */}
          <Form.Item style={{ marginTop: 24 }}>
            {/* <Button
              type="primary"
              htmlType="submit"
              loading={isSubmitting}
              block
              style={{
                background: "#13294B",
                color: "#fff",
                fontWeight: 700,
                fontSize: 18,
                letterSpacing: 1,
                boxShadow: "0 0 12px 2px #13294B",
                border: "none",
                height: "50px",
              }}
            >
              Get Quote
            </Button> */}
            <Button
              type="primary"
              htmlType="submit"
              loading={isSubmitting}
              block
              style={{
                background: "#13294B",
                color: "#fff",
                fontWeight: 700,
                fontSize: 18,
                letterSpacing: 1,
                boxShadow: "0 0 12px 2px #13294B",
                border: "none",
                height: "50px",
              }}
              className="submit-btn"
            >
              Get Quote
            </Button>
            <style>{`
             .submit-btn:hover {
              background: #2546a3 !important;
             }
           `}</style>
          </Form.Item>
        </Form>
      </motion.div>
    </div>
  );
};

export default RequestQuoteForm;
