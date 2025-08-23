import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, Input, Button, Row, Col, Card, Divider } from "antd";

export default function CheckoutForm({ cartItems, totalAmount, onSubmit }) {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      fullName: "", email: "", phone: "",
      address1: "", city: "", state: "", zip: "", country: "",
      cardName: "", cardNumber: "", cardMonth: "", cardYear: "", cardCVV: ""
    }
  });

  return (
    <div className="py-10 min-h-screen" style={{ background: "#f6f7fa" }}>
      <Form
        layout="vertical"
        onFinish={handleSubmit(onSubmit)}
        style={{ maxWidth: 700, margin: "0 auto", background: "#fff", padding: 24, borderRadius: 18, boxShadow: "0 2px 32px #e6e6e6" }}
      >
        <h2 className="mb-6 font-bold text-3xl text-center" style={{ color: "#222" }}>Checkout</h2>
        
        {/* Customer Info */}
        <Card bordered={false} style={{ marginBottom: 24, borderRadius: 12, boxShadow: "0 0 6px #f0f0f0" }}>
          <Divider orientation="left" style={{ color: "#FFD600", fontWeight: 600, fontSize: 18, margin: 0 }}>Customer Information</Divider>
          <Row gutter={16}>
            <Col span={24}>
              <Controller
                name="fullName" control={control}
                rules={{ required: "Full name is required" }}
                render={({ field }) => (
                  <Form.Item label="Full Name" validateStatus={errors.fullName ? "error" : ""} help={errors.fullName?.message}>
                    <Input {...field} placeholder="Your Name" />
                  </Form.Item>
                )}
              />
            </Col>
            <Col span={12}>
              <Controller
                name="email" control={control}
                rules={{ required: "Email is required" }}
                render={({ field }) => (
                  <Form.Item label="Email" validateStatus={errors.email ? "error" : ""} help={errors.email?.message}>
                    <Input {...field} placeholder="email@domain.com" />
                  </Form.Item>
                )}
              />
            </Col>
            <Col span={12}>
              <Controller
                name="phone" control={control}
                render={({ field }) => (
                  <Form.Item label="Phone (Optional)">
                    <Input {...field} placeholder="Phone Number" />
                  </Form.Item>
                )}
              />
            </Col>
          </Row>
        </Card>

        {/* Shipping Address */}
        <Card bordered={false} style={{ marginBottom: 24, borderRadius: 12, boxShadow: "0 0 6px #f0f0f0" }}>
          <Divider orientation="left" style={{ color: "#FFD600", fontWeight: 600, fontSize: 18, margin: 0 }}>Shipping Address</Divider>
          <Row gutter={16}>
            <Col span={24}>
              <Controller
                name="address1" control={control}
                rules={{ required: "Address is required" }}
                render={({ field }) => (
                  <Form.Item label="Address Line 1" validateStatus={errors.address1 ? "error" : ""} help={errors.address1?.message}>
                    <Input {...field} placeholder="Street Address" />
                  </Form.Item>
                )}
              />
            </Col>
            <Col span={12}>
              <Controller
                name="city" control={control}
                rules={{ required: "City is required" }}
                render={({ field }) => (
                  <Form.Item label="City" validateStatus={errors.city ? "error" : ""} help={errors.city?.message}>
                    <Input {...field} placeholder="City" />
                  </Form.Item>
                )}
              />
            </Col>
            <Col span={12}>
              <Controller
                name="state" control={control}
                rules={{ required: "State is required" }}
                render={({ field }) => (
                  <Form.Item label="State/Region" validateStatus={errors.state ? "error" : ""} help={errors.state?.message}>
                    <Input {...field} placeholder="State" />
                  </Form.Item>
                )}
              />
            </Col>
            <Col span={12}>
              <Controller
                name="zip" control={control}
                rules={{ required: "Zip code is required" }}
                render={({ field }) => (
                  <Form.Item label="Zip / Postal Code" validateStatus={errors.zip ? "error" : ""} help={errors.zip?.message}>
                    <Input {...field} placeholder="Zip Code" />
                  </Form.Item>
                )}
              />
            </Col>
            <Col span={12}>
              <Controller
                name="country" control={control}
                rules={{ required: "Country is required" }}
                render={({ field }) => (
                  <Form.Item label="Country" validateStatus={errors.country ? "error" : ""} help={errors.country?.message}>
                    <Input {...field} placeholder="Country" />
                  </Form.Item>
                )}
              />
            </Col>
          </Row>
        </Card>

        {/* Payment Info */}
        <Card bordered={false} style={{ marginBottom: 24, borderRadius: 12, boxShadow: "0 0 6px #f0f0f0" }}>
          <Divider orientation="left" style={{ color: "#FFD600", fontWeight: 600, fontSize: 18, margin: 0 }}>Payment Details</Divider>
          <Row gutter={16}>
            <Col span={24}>
              <Controller
                name="cardName" control={control}
                rules={{ required: "Cardholder name is required" }}
                render={({ field }) => (
                  <Form.Item label="Cardholder Name" validateStatus={errors.cardName ? "error" : ""} help={errors.cardName?.message}>
                    <Input {...field} placeholder="Name on Card" />
                  </Form.Item>
                )}
              />
            </Col>
            <Col span={16}>
              <Controller
                name="cardNumber" control={control}
                rules={{ required: "Card number is required" }}
                render={({ field }) => (
                  <Form.Item label="Card Number" validateStatus={errors.cardNumber ? "error" : ""} help={errors.cardNumber?.message}>
                    <Input {...field} placeholder="Card Number" maxLength={16} />
                  </Form.Item>
                )}
              />
            </Col>
            <Col span={4}>
              <Controller
                name="cardMonth" control={control}
                rules={{ required: "Expiry month required" }}
                render={({ field }) => (
                  <Form.Item label="MM" validateStatus={errors.cardMonth ? "error" : ""} help={errors.cardMonth?.message}>
                    <Input {...field} placeholder="MM" maxLength={2} />
                  </Form.Item>
                )}
              />
            </Col>
            <Col span={4}>
              <Controller
                name="cardYear" control={control}
                rules={{ required: "Expiry year required" }}
                render={({ field }) => (
                  <Form.Item label="YY" validateStatus={errors.cardYear ? "error" : ""} help={errors.cardYear?.message}>
                    <Input {...field} placeholder="YY" maxLength={2} />
                  </Form.Item>
                )}
              />
            </Col>
            <Col span={6}>
              <Controller
                name="cardCVV" control={control}
                rules={{ required: "CVV is required" }}
                render={({ field }) => (
                  <Form.Item label="CVV" validateStatus={errors.cardCVV ? "error" : ""} help={errors.cardCVV?.message}>
                    <Input {...field} placeholder="CVV" maxLength={3} />
                  </Form.Item>
                )}
              />
            </Col>
          </Row>
        </Card>

        {/* Order Summary */}
        <Card bordered={false} style={{ borderRadius: 12, boxShadow: "0 0 6px #f0f0f0" }}>
          <Divider orientation="left" style={{ color: "#FFD600", fontWeight: 600, fontSize: 18, margin: 0 }}>Order Summary</Divider>
          <ul style={{ paddingLeft: 0, margin: "20px 0" }}>
            {cartItems.map(({ id, name, qty, price }) => (
              <li key={id} className="flex justify-between mb-1" style={{ display: "flex", justifyContent: "space-between" }}>
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
