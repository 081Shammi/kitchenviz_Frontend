import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PolicyPage from "./PolicyPage";

const returnPolicyContent = `
  <p>
    At Kitchen Viz, we are committed to delivering premium-quality kitchen appliances that blend style with functionality.
    We take great care in ensuring every product is securely packaged and thoroughly tested before shipping.
    However, we understand that unforeseen issues may occasionally arise.
    Our Return and Exchange Policy is designed to be transparent, fair, and simple for our valued customers.
  </p>
  <h3 class="text-lg font-semibold mt-6">1. Return Policy – Physical Damage During Shipping</h3>
  <p>
    Returns are accepted only in the case of physical damage that has occurred during shipping.
    If your product arrives physically damaged, you must report the damage within 7 hours of delivery.
  </p>
  <p>
    To initiate a return, please email a clear photograph of the damaged product along with your order details to our customer service team at
    <a href="mailto:kitchenvission@gmail.com" class="text-indigo-600 underline">kitchenvission@gmail.com</a>.
  </p>
  <p>
    Once we receive your email and verify the damage, we will arrange for a replacement within 7 working days at no additional cost.
    Products must be unused and returned in the original packaging along with all accessories and manuals.
  </p>
  <p>
    We do not accept returns for damages that occur after delivery or due to customer mishandling.
  </p>
`;

// export default function ReturnPolicy() {
//   return (
//     <>
//       <Header />
//       <main className="bg-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-3xl mx-auto">
//           <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900">
//             Return Policy – Physical Damage During Shipping
//           </h1>
//           <article
//             className="prose prose-indigo prose-lg text-gray-700"
//             dangerouslySetInnerHTML={{ __html: returnPolicyContent }}
//           />
//         </div>
//       </main>
//       <Footer />
//     </>
//   );
// }
export default function ReturnPolicy() {
  return (
    <PolicyPage title="Return Policy – Physical Damage During Shipping" content={returnPolicyContent} />
  );
}