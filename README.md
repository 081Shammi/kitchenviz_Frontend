# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { Form, Input, Button, DatePicker, Select, Checkbox, Card, Divider, Row, Col, message, Radio, TimePicker } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';

const { Option } = Select;

const RequestQuoteForm = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      nature: '',
      eventName: '',
      date: null,
      location: '',
      noOfPeople: '',
      catering: null,
      theme: '',
      receptionist: false,
      multilingualHostess: false,
      travelHostess: false,
      salesHostess: false,
      email: '',
      fullName: '',
      phone: '',
      company: '',
      businessSector: '',
      address: '',
      city: '',
      country: '',
      staffQuantity: '',
      needOutfit: null,
      needStaffBriefing: null,
      needHeadStaff: null,
      eventCity: '',
      eventCountry: '',
      workingHoursFrom: null,
      workingHoursTo: null,
    },
  });

  const onSubmit = async (data) => {
    message.success('Form submitted!');
    console.log('Form Data:', data);
    reset();
  };

  const sectionStyle = {
    marginBottom: '40px',
  };

  const sectionHeaderStyle = {
    color: '#4863A0',
    fontWeight: 700,
    fontSize: '24px',
    marginBottom: '24px',
    marginTop: '0px',
    position: 'relative',
    paddingBottom: '12px',
  };

  const sectionHeaderWithLine = {
    ...sectionHeaderStyle,
    borderBottom: '3px solid #FFD700',
    paddingBottom: '12px',
  };

  const formItemLabelStyle = `
    .custom-form .ant-form-item-label > label {
      color: #4863A0 !important;
      font-weight: 600 !important;
      font-size: 15px !important;
    }
    .custom-form .ant-form-item-required::before {
      color: #FFD700 !important;
    }
    .custom-form .ant-input {
      border-color: #e0e0e0 !important;
      border-radius: 8px !important;
    }
    .custom-form .ant-input:hover {
      border-color: #4863A0 !important;
    }
    .custom-form .ant-input:focus {
      border-color: #4863A0 !important;
      box-shadow: 0 0 0 2px rgba(72, 99, 160, 0.1) !important;
    }
    .custom-form .ant-input-affix-wrapper {
      border-color: #e0e0e0 !important;
      border-radius: 8px !important;
    }
    .custom-form .ant-input-affix-wrapper:hover {
      border-color: #4863A0 !important;
    }
    .custom-form .ant-input-affix-wrapper-focused {
      border-color: #4863A0 !important;
      box-shadow: 0 0 0 2px rgba(72, 99, 160, 0.1) !important;
    }
    .custom-form .ant-select .ant-select-selector {
      border-color: #e0e0e0 !important;
      border-radius: 8px !important;
    }
    .custom-form .ant-select:hover .ant-select-selector {
      border-color: #4863A0 !important;
    }
    .custom-form .ant-select-focused .ant-select-selector {
      border-color: #4863A0 !important;
      box-shadow: 0 0 0 2px rgba(72, 99, 160, 0.1) !important;
    }
    .custom-form .ant-picker {
      border-color: #e0e0e0 !important;
      border-radius: 8px !important;
    }
    .custom-form .ant-picker:hover {
      border-color: #4863A0 !important;
    }
    .custom-form .ant-picker-focused {
      border-color: #4863A0 !important;
      box-shadow: 0 0 0 2px rgba(72, 99, 160, 0.1) !important;
    }
    .custom-form .ant-radio-wrapper {
      color: #4863A0 !important;
      font-weight: 500 !important;
    }
    .custom-form .ant-radio-checked .ant-radio-inner {
      border-color: #4863A0 !important;
      background-color: #4863A0 !important;
    }
    .custom-form .ant-radio:hover .ant-radio-inner {
      border-color: #4863A0 !important;
    }
    .custom-form .ant-checkbox-wrapper {
      color: #4863A0 !important;
      font-weight: 500 !important;
    }
    .custom-form .ant-checkbox-checked .ant-checkbox-inner {
      background-color: #4863A0 !important;
      border-color: #4863A0 !important;
    }
    .custom-form .ant-checkbox:hover .ant-checkbox-inner {
      border-color: #4863A0 !important;
    }
    .primary-button {
      background: linear-gradient(135deg, #4863A0 0%, #5a7bc8 100%) !important;
      border: none !important;
      height: 48px !important;
      font-size: 16px !important;
      font-weight: 600 !important;
      border-radius: 12px !important;
      box-shadow: 0 4px 15px rgba(72, 99, 160, 0.3) !important;
      transition: all 0.3s ease !important;
    }
    .primary-button:hover {
      transform: translateY(-2px) !important;
      box-shadow: 0 6px 20px rgba(72, 99, 160, 0.4) !important;
    }
    .back-button {
      background: linear-gradient(135deg, #4863A0 0%, #5a7bc8 100%) !important;
      border: none !important;
      color: white !important;
      font-weight: 600 !important;
      border-radius: 25px !important;
      padding: 12px 24px !important;
      box-shadow: 0 4px 15px rgba(72, 99, 160, 0.3) !important;
      transition: all 0.3s ease !important;
      display: flex !important;
      align-items: center !important;
      gap: 8px !important;
    }
    .back-button:hover {
      transform: translateY(-2px) !important;
      box-shadow: 0 6px 20px rgba(72, 99, 160, 0.4) !important;
      color: white !important;
    }
    .custom-card {
      background: linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%) !important;
      border: 1px solid rgba(72, 99, 160, 0.1) !important;
      border-radius: 16px !important;
      box-shadow: 0 4px 20px rgba(72, 99, 160, 0.08) !important;
      transition: all 0.3s ease !important;
    }
    .custom-card:hover {
      box-shadow: 0 6px 25px rgba(72, 99, 160, 0.12) !important;
      transform: translateY(-2px) !important;
    }
    .ant-divider-horizontal.ant-divider-with-text::before,
    .ant-divider-horizontal.ant-divider-with-text::after {
      border-color: rgba(72, 99, 160, 0.2) !important;
    }
    .ant-divider-inner-text {
      color: #4863A0 !important;
      font-weight: 600 !important;
      font-size: 18px !important;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: formItemLabelStyle }} />
      
      <div style={{ 
        background: 'linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%)',
        minHeight: '100vh',
        padding: '20px'
      }}>
        <motion.div
          className="flex items-center justify-start"
          style={{ marginTop: 24, marginBottom: 24 }}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <button
            type="button"
            className="back-button"
            onClick={() => navigate(-1)}
          >
            <ArrowLeftOutlined style={{ fontSize: '16px' }} />
            Back
          </button>
        </motion.div>

        <motion.div
          style={{ textAlign: 'center', marginBottom: '48px' }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <h1 style={{ 
            color: '#4863A0',
            fontSize: '42px',
            fontWeight: '800',
            margin: '0 0 16px 0',
            background: 'linear-gradient(135deg, #4863A0 0%, #5a7bc8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 2px 10px rgba(72, 99, 160, 0.1)'
          }}>
            Request a Quote
          </h1>
          <motion.div
            style={{
              width: '80px',
              height: '4px',
              background: 'linear-gradient(90deg, #4863A0 0%, #FFD700 100%)',
              margin: '0 auto 20px auto',
              borderRadius: '2px'
            }}
            initial={{ width: 0 }}
            animate={{ width: '80px' }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p style={{ 
            color: '#4863A0',
            fontSize: '18px',
            fontWeight: '500',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Fill out the form below to get a personalized quote for your event needs. We're here to make your event exceptional!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.4 }}
        >
          <Form
            layout="vertical"
            onFinish={handleSubmit(onSubmit)}
            className="custom-form"
            style={{ 
              maxWidth: 800, 
              margin: 'auto', 
              background: '#ffffff', 
              borderRadius: 20, 
              padding: '48px 40px',
              boxShadow: '0 10px 40px rgba(72, 99, 160, 0.1)',
              border: '1px solid rgba(72, 99, 160, 0.1)'
            }}
            autoComplete="off"
          >
            {/* Your Event Section */}
            <div style={sectionStyle}>
              <h3 style={sectionHeaderWithLine}>📅 Your Event</h3>
              <div className="custom-card" style={{ padding: '32px' }}>
                <Row gutter={20}>
                  <Col xs={24} md={12}>
                    <Form.Item label="Nature of the event" required validateStatus={errors.nature && 'error'} help={errors.nature && "Please enter event nature"}>
                      <Controller
                        name="nature"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => <Input {...field} placeholder="Eg: Conference, Seminar" />}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item label="Name of the event" required validateStatus={errors.eventName && 'error'} help={errors.eventName && "Please enter event name"}>
                      <Controller
                        name="eventName"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => <Input {...field} placeholder="Eg: Annual Meetup" />}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={20}>
                  <Col xs={24} md={12}>
                    <Form.Item label="Date of the event" required validateStatus={errors.date && 'error'} help={errors.date && "Please pick a date"}>
                      <Controller
                        name="date"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => <DatePicker {...field} style={{ width: '100%' }} placeholder="Select event date" />}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={20}>
                  <Col xs={24} md={12}>
                    <Form.Item label="Physical location" required validateStatus={errors.location && 'error'} help={errors.location && "Please enter location"}>
                      <Controller
                        name="location"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => <Input {...field} placeholder="Eg: Hotel Grand, City" />}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item label="City" required validateStatus={errors.eventCity && 'error'} help={errors.eventCity && "Please enter city"}>
                      <Controller
                        name="eventCity"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => <Input {...field} placeholder="Enter city" />}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={20}>
                  <Col xs={24} md={12}>
                    <Form.Item label="Country" required validateStatus={errors.eventCountry && 'error'} help={errors.eventCountry && "Please enter country"}>
                      <Controller
                        name="eventCountry"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => <Input {...field} placeholder="Enter country" />}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item label="No. of People" required validateStatus={errors.noOfPeople && 'error'} help={errors.noOfPeople && "Please enter no. of people"}>
                      <Controller
                        name="noOfPeople"
                        control={control}
                        rules={{
                          required: true,
                          pattern: { value: /^\d+$/, message: 'Enter a number' }
                        }}
                        render={({ field }) => <Input {...field} placeholder="Eg: 150" />}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                
                <h4 style={{ 
                  color: '#4863A0', 
                  fontWeight: 600, 
                  fontSize: '18px', 
                  marginTop: '32px', 
                  marginBottom: '16px',
                  borderBottom: '2px solid #FFD700',
                  paddingBottom: '8px',
                  display: 'inline-block'
                }}>
                  ⏰ Working Hours
                </h4>
                <Row gutter={20}>
                  <Col xs={24} md={12}>
                    <Form.Item label="From" required validateStatus={errors.workingHoursFrom && 'error'} help={errors.workingHoursFrom && "Please select start time"}>
                      <Controller
                        name="workingHoursFrom"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => <TimePicker {...field} style={{ width: '100%' }} format="HH:mm" placeholder="Start time" />}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item label="To" required validateStatus={errors.workingHoursTo && 'error'} help={errors.workingHoursTo && "Please select end time"}>
                      <Controller
                        name="workingHoursTo"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => <TimePicker {...field} style={{ width: '100%' }} format="HH:mm" placeholder="End time" />}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            </div>

            {/* Your Needs Section */}
            <div style={sectionStyle}>
              <h3 style={sectionHeaderWithLine}>🎯 Your Needs</h3>
              <div className="custom-card" style={{ padding: '32px' }}>
                <Row gutter={20}>
                  <Col xs={24}>
                    <Form.Item label="Quantity of staff desired" required validateStatus={errors.staffQuantity && 'error'} help={errors.staffQuantity && "Please enter quantity"}>
                      <Controller
                        name="staffQuantity"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => <Input.TextArea {...field} placeholder="Enter number and any specific details about staffing needs" autoSize={{ minRows: 3 }} />}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={20}>
                  <Col xs={24} md={8}>
                    <Form.Item label="Do you need an outfit?" required validateStatus={errors.needOutfit && 'error'} help={errors.needOutfit && "Required"}>
                      <Controller
                        name="needOutfit"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Radio.Group {...field}>
                            <Radio value={true}>Yes</Radio>
                            <Radio value={false}>No</Radio>
                          </Radio.Group>
                        )}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item label="Do you need a staff briefing?" required validateStatus={errors.needStaffBriefing && 'error'} help={errors.needStaffBriefing && "Required"}>
                      <Controller
                        name="needStaffBriefing"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Radio.Group {...field}>
                            <Radio value={true}>Yes</Radio>
                            <Radio value={false}>No</Radio>
                          </Radio.Group>
                        )}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item label="Do you need a head staff?" required validateStatus={errors.needHeadStaff && 'error'} help={errors.needHeadStaff && "Required"}>
                      <Controller
                        name="needHeadStaff"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Radio.Group {...field}>
                            <Radio value={true}>Yes</Radio>
                            <Radio value={false}>No</Radio>
                          </Radio.Group>
                        )}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            </div>

            {/* Your Required Section */}
            <div style={sectionStyle}>
              <h3 style={sectionHeaderWithLine}>✅ Services Required</h3>
              <div className="custom-card" style={{ padding: '32px' }}>
                <Form.Item label="Select the services you need (check all that apply)">
                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12}>
                      <Controller
                        name="receptionist"
                        control={control}
                        render={({ field }) => (
                          <Checkbox {...field} checked={field.value}>
                            🏢 Receptionist
                          </Checkbox>
                        )}
                      />
                    </Col>
                    <Col xs={24} sm={12}>
                      <Controller
                        name="multilingualHostess"
                        control={control}
                        render={({ field }) => (
                          <Checkbox {...field} checked={field.value}>
                            🗣️ Multilingual Hostess
                          </Checkbox>
                        )}
                      />
                    </Col>
                    <Col xs={24} sm={12}>
                      <Controller
                        name="travelHostess"
                        control={control}
                        render={({ field }) => (
                          <Checkbox {...field} checked={field.value}>
                            ✈️ Travel Hostess
                          </Checkbox>
                        )}
                      />
                    </Col>
                    <Col xs={24} sm={12}>
                      <Controller
                        name="salesHostess"
                        control={control}
                        render={({ field }) => (
                          <Checkbox {...field} checked={field.value}>
                            📈 Sales Hostess
                          </Checkbox>
                        )}
                      />
                    </Col>
                  </Row>
                </Form.Item>
              </div>
            </div>

            {/* Contact Information */}
            <div style={sectionStyle}>
              <h3 style={sectionHeaderWithLine}>📞 Contact Information</h3>
              <div className="custom-card" style={{ padding: '32px' }}>
                <Row gutter={20}>
                  <Col xs={24} md={12}>
                    <Form.Item label="Full Name" required validateStatus={errors.fullName && 'error'} help={errors.fullName && "Enter your name"}>
                      <Controller
                        name="fullName"
                        control={control}
                        rules={{ required: true, minLength: 2 }}
                        render={({ field }) => <Input {...field} placeholder="Enter your full name" />}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item label="Company Name">
                      <Controller
                        name="company"
                        control={control}
                        render={({ field }) => <Input {...field} placeholder="Your company (optional)" />}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={20}>
                  <Col xs={24} md={12}>
                    <Form.Item label="Business Sector">
                      <Controller
                        name="businessSector"
                        control={control}
                        render={({ field }) => <Input {...field} placeholder="Eg: IT, Hospitality, Education" />}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item label="Address" required validateStatus={errors.address && 'error'} help={errors.address && "Enter your address"}>
                      <Controller
                        name="address"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => <Input {...field} placeholder="Street, Building, etc." />}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={20}>
                  <Col xs={24} md={12}>
                    <Form.Item label="City" required validateStatus={errors.city && 'error'} help={errors.city && "Enter your city"}>
                      <Controller
                        name="city"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => <Input {...field} placeholder="Enter your city" />}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item label="Country" required validateStatus={errors.country && 'error'} help={errors.country && "Enter your country"}>
                      <Controller
                        name="country"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => <Input {...field} placeholder="Enter your country" />}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={20}>
                  <Col xs={24} md={12}>
                    <Form.Item label="Email Address" required validateStatus={errors.email && 'error'} help={errors.email && "Enter a valid email"}>
                      <Controller
                        name="email"
                        control={control}
                        rules={{ required: true, pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } }}
                        render={({ field }) => <Input {...field} placeholder="Enter your email address" />}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item label="Phone Number" required validateStatus={errors.phone && 'error'} help={errors.phone && "Enter phone number"}>
                      <Controller
                        name="phone"
                        control={control}
                        rules={{ required: true, minLength: 8 }}
                        render={({ field }) => <Input {...field} placeholder="Enter your phone number" />}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            </div>

            <Form.Item style={{ marginTop: 40, marginBottom: 0 }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={isSubmitting}
                block
                className="primary-button"
                onClick={() => {
                  const values = control._formValues;
                  console.log('Current form payload:', values);
                }}
              >
                🚀 GET QUOTE
              </Button>
            </Form.Item>
          </Form>
        </motion.div>
      </div>
    </>
  );
};

export default RequestQuoteForm;
