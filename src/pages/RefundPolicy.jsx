import PolicyPage from "./PolicyPage";

const refundPolicyContent = `
  

  <h3 class="text-lg font-semibold mt-6">Refunds</h3>
  <p>
    Approved refunds will be credited to your original mode of payment within 7 business days.
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
