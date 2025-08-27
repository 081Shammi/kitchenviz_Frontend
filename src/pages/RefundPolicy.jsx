import PolicyPage from "./PolicyPage";

const refundPolicyContent = `
  <p>We want you to have a smooth and worry-free shopping experience. If you are not completely satisfied with your purchase, we’re here to help.</p>

  <h3 class="text-lg font-semibold mt-6">Returns</h3>
  <p>You may request a return within <strong>15 days</strong> of receiving your order.</p>
  <p>Items must be unused, in their original packaging, with all tags intact.</p>
  <p>
    Certain items—such as perishables, personal care, and final sale products—cannot be returned.
    Please see product pages for exceptions.
  </p>

  <h3 class="text-lg font-semibold mt-6">Refunds</h3>
  <p>
    Once your return is received and inspected, your refund will be approved if the item meets our return conditions.
    Approved refunds will be credited to your original mode of payment within 7 business days.
  </p>
  <p>
    You will receive an email or SMS notification when your refund has been processed.
    If you do not see the refund after 7 business days, please contact our support team.
  </p>

  <h3 class="text-lg font-semibold mt-6">Exchanges</h3>
  <p>
    If you received a defective or incorrect item, we will be happy to replace it at no extra cost.
    For size or color exchanges, please initiate a return and place a new order.
  </p>

  <h3 class="text-lg font-semibold mt-6">How to Request a Return or Refund</h3>
  <p>
    Contact our support team at
    <a href="mailto:kitchenvission@gmail.com" class="text-indigo-600 underline">kitchenvission@gmail.com</a>
    with your order number and reason for return. We’ll guide you through the process and provide a return shipping label if eligible.
  </p>
`;



// export default function PrivacyPolicy() {
//   return (
//     <>
//       <Header />
//       <main className="bg-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-3xl mx-auto">
//           <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900">
//             Privacy Policy
//           </h1>
//           <article
//             className="prose prose-indigo prose-lg text-gray-700"
//             dangerouslySetInnerHTML={{ __html: privacyContent }}
//           />
//         </div>
//       </main>
//       <Footer />
//     </>
//   );
// }


export default function RefundPolicy() {
  return (
    <PolicyPage title="Refund Policy" content={refundPolicyContent} />
  );
}
