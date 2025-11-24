import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PolicyPage from "./PolicyPage";

const termsContent = `
<p>Welcome to the OVENIA website. By browsing or using this site, you agree to the following terms and conditions, which are legally binding. If you do not agree, you should not use our website. This platform is owned and operated by OVENIA, an early-stage startup focused on smart kitchen appliances. The site is currently intended to showcase our product concept and gather interest from potential users and stakeholders.</p>

<p>All content, including text, images, graphics, and logos, is the intellectual property of OVENIA and may not be reproduced or used without written permission. You are granted limited, non-exclusive access to use this site for personal and non-commercial purposes only. Any misuse or unauthorized use may result in legal action.</p>

<p>You must not attempt to disrupt the operation of the website, upload harmful content, or access any restricted areas without permission. If you are under 18, you must use this site under parental guidance. We reserve the right to update or remove any part of the site without prior notice. We also reserve the right to block access to users who violate these terms.</p>

<p>While we strive to provide accurate information, we do not guarantee that all content on the website is complete, up to date, or free of errors. Product details shown are for demonstration purposes and may change without notice as development continues. Any feedback or suggestions you provide become the property of OVENIA and may be used to improve our services without compensation to you.</p>

<p>Links to third-party websites are provided for your convenience but do not imply endorsement. We are not responsible for the content, privacy practices, or accuracy of those external sites. Use them at your own risk. The website may use analytics tools to understand user behavior and improve functionality. These tools do not give us access to personal details unless you voluntarily provide them.</p>

<p>OVENIA disclaims all warranties regarding the website and its content. We do not guarantee uninterrupted or error-free access. To the fullest extent permitted by law, we are not liable for any damages resulting from your use of the site. This includes direct, indirect, incidental, or consequential losses. Your use of this website is entirely at your own risk.</p>

<p>We comply with Indian laws, and any disputes arising from the use of the site shall be governed by the laws of India. You agree that any legal proceedings will take place in the courts located in Shimoga, Karnataka, India. These Terms constitute the entire agreement between you and OVENIA regarding website usage and override any previous agreements.</p>

<p>We may revise these Terms at any time by updating this page. Continued use of the site indicates your acceptance of the latest version. We encourage users to check this page regularly. If any part of these Terms is found to be unenforceable, the remaining parts will still apply. If you have questions or concerns, please email us at <a href="mailto:kitchenvission@gmail.com" class="text-indigo-600 underline">kitchenvission@gmail.com</a>.</p>

<p>We appreciate your interest in our brand and thank you for visiting our website. These terms were last updated on 03/06/2025.</p>
`;

// export default function TermsConditions() {
//   return (
//     <>
//       <Header />
//       <main className="bg-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-3xl mx-auto">
//           <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900">
//             Terms & Conditions
//           </h1>
//           <article
//             className="prose prose-indigo prose-lg text-gray-700"
//             dangerouslySetInnerHTML={{ __html: termsContent }}
//           />
//         </div>
//       </main>
//       <Footer />
//     </>
//   );
// }
export default function PrivacyPolicy() {
  return (
    <PolicyPage title="Terms & Conditions" content={termsContent} />
  );
}