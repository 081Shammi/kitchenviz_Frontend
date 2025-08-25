import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import { Spin, message } from "antd";

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const getImageUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    if (url.startsWith("assets/")) return `${API_BASE_URL}${url}`;
    return `${API_BASE_URL}${url}`;
  };

  useEffect(() => {
    fetchOrder();
    // eslint-disable-next-line
  }, [id]);

  const fetchOrder = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}order/${id}`);
      setOrder(res.data);
    } catch {
      message.error("Failed to fetch order details");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (status) => {
    if (order[`is${capitalize(status)}`]) return; // Prevent duplicate updates
    setUpdating(true);
    try {
      await axios.patch(`${API_BASE_URL}order/updateShippingStatus/${order._id}`, { status });
      message.success(`Order marked as ${status.replace(/([A-Z])/g, " $1").trim()}`);
      await fetchOrder();
    } catch {
      message.error("Failed to update order status");
    } finally {
      setUpdating(false);
    }
  };

  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  if (loading) return <Spin size="large" className="m-auto mt-20" />;
  if (!order) return <div className="text-center mt-20">Order not found</div>;

  return (
    <div className="max-w-5xl mx-auto py-8 px-2 md:px-6 flex flex-col md:flex-row gap-6">
      {/* Left side: Order info */}
      <div className="flex-1 flex flex-col gap-5 min-w-[300px]">
        <div className="bg-white rounded shadow p-4">
          <div className="text-lg font-bold text-green-700 mb-2">
            Order {order._id && order._id.slice(-8)}
          </div>
          <div className="mb-2">
            <span className="font-semibold text-gray-700">Shipping</span>
            <div><b>Name:</b> {order.shippingAddress?.fullName}</div>
            <div>
              <b>Address:</b> {order.shippingAddress?.address}, {order.shippingAddress?.city}, {order.shippingAddress?.postalCode},{" "}
              {order.shippingAddress?.country}
            </div>
          </div>
          <div className="mb-2">
            <span className="font-semibold text-gray-700">Contact</span>
            <div><b>Email:</b> {order.contactDetails?.email}</div>
            <div><b>Phone:</b> {order.contactDetails?.phoneNumber}</div>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Payment</span>
            <div><b>Method:</b> {order.paymentMethod}</div>
            <div>
              <b>Status:</b>{" "}
              {order.isPaid ? (
                <span className="text-green-700">Paid</span>
              ) : (
                <span className="text-red-500">Unpaid</span>
              )}
            </div>
          </div>
        </div>

        {/* Conditionally render shipping status checkboxes only if NOT rejected */}
        {!order.isOrderRejected && (
          <div className="bg-white rounded shadow p-4">
            <div className="font-semibold text-gray-700 mb-2">Shipping Status</div>
            <label className="flex items-center gap-2 mb-1 cursor-pointer">
              <input
                type="checkbox"
                checked={order.isDispatched}
                disabled={updating}
                onChange={() => handleStatusChange("dispatched")}
                className="accent-green-600"
              />
              <span className={order.isDispatched ? "text-green-700 font-bold" : ""}>
                Dispatched
              </span>
            </label>
            <label className="flex items-center gap-2 mb-1 cursor-pointer">
              <input
                type="checkbox"
                checked={order.isOutForDelivery}
                disabled={updating || !order.isDispatched}
                onChange={() => handleStatusChange("outForDelivery")}
                className="accent-blue-600"
              />
              <span className={order.isOutForDelivery ? "text-blue-700 font-bold" : ""}>
                Out For Delivery
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={order.isDelivered}
                disabled={updating || !order.isOutForDelivery}
                onChange={() => handleStatusChange("delivered")}
                className="accent-emerald-600"
              />
              <span className={order.isDelivered ? "text-emerald-700 font-bold" : ""}>
                Delivered
              </span>
            </label>
          </div>
        )}

        {/* Show Rejected warning if order is rejected */}
        {order.isOrderRejected && (
          <div className="bg-red-50 rounded shadow p-4 text-red-600 font-semibold text-center">
            This order has been rejected.
          </div>
        )}
      </div>

      {/* Right side: Order summary and items */}
      <div className="flex-1 flex flex-col gap-5">
        <div className="bg-white rounded shadow p-4">
          <div className="text-lg font-bold mb-2">Order Summary</div>
          <div className="flex justify-between">
            <span>Items</span>
            <span>₹{order.itemsPrice?.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>₹{order.shippingPrice?.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg border-t mt-2 pt-2">
            <span>Order Total</span>
            <span>₹{order.totalPrice?.toLocaleString("en-IN")}</span>
          </div>
        </div>

        <div className="bg-white rounded shadow p-4 overflow-auto max-h-[48vh]">
          <div className="text-lg font-bold mb-2">Items</div>
          <table className="min-w-full border-separate border-spacing-y-2">
            <thead>
              <tr>
                <th className="text-left font-semibold">Product</th>
                <th className="text-right font-semibold">Qty</th>
                <th className="text-right font-semibold">Price</th>
              </tr>
            </thead>
            <tbody>
              {order.orderItems.map((item) => (
                <tr key={item._id}>
                  <td className="flex items-center gap-2">
                    {item.productImages?.[0]?.image_url?.thumbnail?.high_res && (
                      <img
                        src={getImageUrl(item.productImages[0].image_url.thumbnail.high_res)}
                        alt={item.name}
                        className="w-12 h-12 rounded object-cover border"
                      />
                    )}
                    <span className="whitespace-nowrap">{item.name}</span>
                  </td>
                  <td className="text-right">{item.quantity}</td>
                  <td className="text-right">₹{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
