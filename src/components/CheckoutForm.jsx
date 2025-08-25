import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, Input, Button, Row, Col, Card, Divider, message } from "antd";

export default function CheckoutForm({ cartItems, totalAmount, onSubmit, loading }) {
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      fullName: "", address: "", city: "", postalCode: "", country: "",
      email: "", phoneNumber: "", age: "",
      paymentMethod: "Card",
    },
  });

  return (
    <div className="py-10 min-h-screen" style={{ background: "#f6f7fa" }}>
      <Form
        layout="vertical"
        onFinish={handleSubmit(onSubmit)}
        style={{
          maxWidth: 700, margin: "0 auto", background: "#fff", padding: 24,
          borderRadius: 18, boxShadow: "0 2px 32px #e6e6e6"
        }}
      >
        <h2 className="mb-6 font-bold text-3xl text-center" style={{ color: "#222" }}>Checkout</h2>
        
        <Card bordered={false} style={{ marginBottom: 24, borderRadius: 12, boxShadow: "0 0 6px #f0f0f0" }}>
          <Divider orientation="left" style={{ fontWeight: 600, fontSize: 18, margin: 0 }}>Customer & Contact</Divider>
          <Row gutter={16}>
            <Col span={12}>
              <Controller name="fullName" control={control}
                rules={{ required: "Full name is required" }}
                render={({ field }) => (
                  <Form.Item label="Full Name" validateStatus={errors.fullName ? "error" : ""} help={errors.fullName?.message}>
                    <Input {...field} placeholder="Your Name" />
                  </Form.Item>
                )}/>
            </Col>
            <Col span={12}>
              <Controller name="age" control={control}
                render={({ field }) => (
                  <Form.Item label="Age (Optional)">
                    <Input {...field} placeholder="Age" />
                  </Form.Item>
                )}/>
            </Col>
            <Col span={12}>
              <Controller name="email" control={control}
                rules={{ required: "Email is required" }}
                render={({ field }) => (
                  <Form.Item label="Email" validateStatus={errors.email ? "error" : ""} help={errors.email?.message}>
                    <Input {...field} placeholder="email@domain.com" />
                  </Form.Item>
                )}/>
            </Col>
            <Col span={12}>
              <Controller name="phoneNumber" control={control}
                rules={{ required: "Phone is required" }}
                render={({ field }) => (
                  <Form.Item label="Phone Number" validateStatus={errors.phoneNumber ? "error" : ""} help={errors.phoneNumber?.message}>
                    <Input {...field} placeholder="Phone Number" />
                  </Form.Item>
                )}/>
            </Col>
          </Row>
        </Card>

        <Card bordered={false} style={{ marginBottom: 24, borderRadius: 12, boxShadow: "0 0 6px #f0f0f0" }}>
          <Divider orientation="left" style={{ fontWeight: 600, fontSize: 18, margin: 0 }}>Shipping Address</Divider>
          <Row gutter={16}>
            <Col span={24}>
              <Controller name="address" control={control}
                rules={{ required: "Address required" }}
                render={({ field }) => (
                  <Form.Item label="Address" validateStatus={errors.address ? "error" : ""} help={errors.address?.message}>
                    <Input {...field} placeholder="Street Address" />
                  </Form.Item>
                )}/>
            </Col>
            <Col span={12}>
              <Controller name="city" control={control}
                rules={{ required: "City required" }}
                render={({ field }) => (
                  <Form.Item label="City" validateStatus={errors.city ? "error" : ""} help={errors.city?.message}>
                    <Input {...field} placeholder="City" />
                  </Form.Item>
                )}/>
            </Col>
            <Col span={12}>
              <Controller name="postalCode" control={control}
                rules={{ required: "Postal code required" }}
                render={({ field }) => (
                  <Form.Item label="Postal Code" validateStatus={errors.postalCode ? "error" : ""} help={errors.postalCode?.message}>
                    <Input {...field} placeholder="Postal/Zip" />
                  </Form.Item>
                )}/>
            </Col>
            <Col span={12}>
              <Controller name="country" control={control}
                rules={{ required: "Country required" }}
                render={({ field }) => (
                  <Form.Item label="Country" validateStatus={errors.country ? "error" : ""} help={errors.country?.message}>
                    <Input {...field} placeholder="Country" />
                  </Form.Item>
                )}/>
            </Col>
          </Row>
        </Card>

        <Card bordered={false} style={{ marginBottom: 24, borderRadius: 12, boxShadow: "0 0 6px #f0f0f0" }}>
          <Divider orientation="left" style={{ fontWeight: 600, fontSize: 18, margin: 0 }}>Payment Method</Divider>
          <Row gutter={16}>
            <Col span={24}>
              <Controller name="paymentMethod" control={control}
                rules={{ required: "Payment method required" }}
                render={({ field }) => (
                  <Form.Item label="Payment Method" validateStatus={errors.paymentMethod ? "error" : ""} help={errors.paymentMethod?.message}>
                    <Input {...field} placeholder="E.g. Card, Cash On Delivery" />
                  </Form.Item>
                )}/>
            </Col>
          </Row>
        </Card>

        <Card bordered={false} style={{ borderRadius: 12, boxShadow: "0 0 6px #f0f0f0" }}>
          <Divider orientation="left" style={{ fontWeight: 600, fontSize: 18, margin: 0 }}>Order Summary</Divider>
          <ul style={{ paddingLeft: 0, margin: "20px 0" }}>
            {cartItems.map(({ id, name, qty, price }) => (
              <li key={id || name} style={{ display: "flex", justifyContent: "space-between" }}>
                <span>{name} x {qty}</span>
                <span>₹{(qty * price).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div style={{ fontWeight: "bold", fontSize: 20, display: "flex", justifyContent: "space-between" }}>
            <span>Total:</span>
            <span>₹{totalAmount.toFixed(2)}</span>
          </div>
        </Card>

        <div style={{ marginTop: 32 }}>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={isSubmitting || loading}
            style={{
              width: "100%",
              background: "#FFD600",
              color: "#222",
              fontWeight: 700,
              border: "none",
              borderRadius: 8,
              boxShadow: "0 2px 12px #ffe066"
            }}>
            Place Order
          </Button>
        </div>
      </Form>
    </div>
  );
}
