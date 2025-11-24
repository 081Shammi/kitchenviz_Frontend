import PolicyPage from "./PolicyPage";

const privacyContent = `
<p>At OVENIA, we value your privacy and are committed to protecting any personal information you share with us through our website. When you visit our site, we may collect basic details like your name, email address, and phone number especially if you fill out a form, subscribe to a newsletter, or contact us.</p>

<p>We also collect technical data like IP address, browser type, and usage stats via cookies to improve your experience.</p>

<p>We use this information to communicate with you and enhance our services. We do NOT sell your data but may share with trusted service providers under confidentiality agreements. You can opt out of marketing emails anytime.</p>

<p>Cookies help analyze traffic and customize content; you can disable cookies but the site may lose some features. We use tools like Google Analytics with anonymized data for insights.</p>

<p>Your data is securely stored and accessed only by authorized personnel. However, no online service is perfectly secure; please be cautious sharing sensitive info.</p>

<p>If you want to review or delete your data, email us at <a href="mailto:kitchenvission@gmail.com" class="text-indigo-600 underline">kitchenvission@gmail.com</a>. Requests are handled promptly.</p>

<p>We do not knowingly collect data from children under 13; if discovered, it is deleted immediately. We are not responsible for external sites linked from ours.</p>

<p>Policy updates occur as needed; continued use means acceptance. Governed by Indian laws, disputes resolved accordingly.</p>

<p>We do not track users across sites or handle payment data yet. Feedback is confidential and used to improve our services.</p>

<p>We aim for transparency and trust, committed to protecting your data and providing a safe environment.</p>

<p><small>Last updated: 03/09/2025</small></p>
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


export default function PrivacyPolicy() {
  return (
    <PolicyPage title="Privacy Policy" content={privacyContent} />
  );
}
