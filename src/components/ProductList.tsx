import React from "react";
import { Link } from "react-router-dom";

const products = [
    {
        id: 1,
        image: "/assets/logo1.jpg",
        label: "Wireless Optical Mouse",
        name: "TOAD ONE",
        details: "Adjustable DPI resolution | Type-C",
        price: 649,
        originalPrice: 1499,
        discount: 57,
        emi: "Rs. 216/Month",
    },
    {
        id: 2,
        image: "/assets/logo.png",
        label: "9-in-1 USB-C Hub",
        name: "MPORT ONE",
        details: "HDMI On-Off Button | USB-C Plug",
        price: 1299,
        originalPrice: 2499,
        discount: 48,
        emi: "Rs. 433/Month",
    },
    {
        id: 3,
        image: "/assets/logo.png",
        label: "Multiple device pairing",
        name: "TOAD II",
        details: "Universal compatibility | Modify DPI",
        price: 599,
        originalPrice: 1699,
        discount: 65,
        emi: "Rs. 200/Month",
    },
    {
        id: 4,
        image: "/assets/logo1.jpg",
        label: "Full-Layout Keyboard",
        name: "KEY5 COMBO",
        details: "2.4 GHz Wireless | Adjustable DPI",
        price: 999,
        originalPrice: 1999,
        discount: 50,
        emi: "Rs. 333/Month",
    },
];

export default function ProductList() {
    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div key={product.id} className="flex flex-col bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden group hover:shadow-xl transition">
                        {/* Product Image */}
                        <div className="flex justify-center items-center h-40 bg-white px-4 pt-4">
                            <Link to={`/product/${product.id}`}>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-32 object-contain"
                                />
                            </Link>
                        </div>
                        {/* Product Details */}
                        <div className="flex flex-col flex-1 p-4">
                            <div className="text-lg font-bold text-black">{product.name}</div>
                            <div className="text-[13px] text-gray-600 mb-2">{product.details}</div>
                            {/* Pricing Section */}
                            <div className="flex items-center gap-2">
                                <span className="text-xl font-bold text-black">₹{product.price}</span>
                                <span className="text-gray-400 line-through text-sm mt-1">
                                    ₹{product.originalPrice}
                                </span>
                                <span className="ml-2 bg-[#EB1F27] text-white text-xs px-2 py-0.5 font-semibold rounded-md">
                                    {product.discount}% OFF
                                </span>
                            </div>
                            <div className="text-xs text-gray-500 mt-1 mb-3">or {product.emi} <span className="text-green-600 font-semibold">Buy on EMI</span></div>
                            {/* Add to Cart Button */}
                            <button
                                className="mt-auto w-full  text-white rounded-xl py-2 font-bold text-base bg-yellow-400 hover:text-black transition"
                            >
                                ADD TO CART
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
