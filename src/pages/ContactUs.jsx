import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ContactUs() {
  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h1 className="text-4xl font-extrabold mb-3 text-gray-900">Contact Us</h1>
          <p className="text-lg text-gray-600">
            Get in touch with us for any inquiries, support, or collaboration opportunities.
          </p>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Address Card */}
          <div className="rounded-2xl bg-white shadow-lg p-7 flex flex-col items-start">
            <div className="flex items-center mb-4">
              <svg className="w-7 h-7 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-xl font-semibold text-gray-900">
                Our Address
              </span>
            </div>
            <div className="pl-4">
              <span className="block text-sm text-gray-500 mb-1">Main Office</span>
              <span className="block font-bold text-gray-900 leading-relaxed">
                Karnataka Madiga Mahasabha<br />
                #39/A, 1st Floor, near Shivananda Circle,<br />
                Kumara Park East, Seshadripuram,<br />
                Bengaluru, Karnataka 560001
              </span>
            </div>
          </div>

          {/* Contact Card */}
          <div className="rounded-2xl bg-white shadow-lg p-7 flex flex-col items-start">
            <div className="flex items-center mb-4">
              <svg className="w-7 h-7 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-xl font-semibold text-gray-900">
                Get In Touch
              </span>
            </div>
            {/* Email */}
            <div className="flex items-center mb-3 w-full">
              <div>
                <svg className="w-6 h-6 text-blue-500 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12V8a4 4 0 00-8 0v4M12 16v2m-6 4h12a2 2 0 002-2v-5a2 2 0 00-2-2h-4a2 2 0 01-2-2V8m4 8a2 2 0 002-2H6a2 2 0 00-2 2v5a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <span className="block text-gray-700 text-sm">Email us</span>
                <a href="mailto:kitchenvission@gmail.com" className="text-blue-700 font-bold hover:underline">kitchenvission@gmail.com</a>
              </div>
            </div>
            {/* Phone */}
            <div className="flex items-center mb-3 w-full">
              <svg className="w-6 h-6 text-green-500 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <div>
                <span className="block text-gray-700 text-sm">Call us</span>
                <a href="tel:+916363828516" className="text-green-700 font-bold hover:underline">
                  +91 63638 28516
                </a>
              </div>
            </div>
            {/* WhatsApp */}
            <div className="flex items-center mb-3 w-full">
              <svg className="w-6 h-6 text-green-600 mr-2 inline-block" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              <div>
                <span className="block text-gray-700 text-sm">WhatsApp</span>
                <a href="https://wa.me/916363828516" target="_blank" rel="noopener noreferrer" className="text-green-700 font-bold hover:underline">
                  +91 63638 28516
                </a>
              </div>
            </div>
            {/* Instagram */}
            <div className="flex items-center mb-1 w-full">
              <svg className="w-6 h-6 text-pink-600 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" strokeWidth={2} />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.5 7.5h.01"/>
                <circle cx="12" cy="12" r="4" strokeWidth={2} />
              </svg>
              <div>
                <span className="block text-gray-700 text-sm">Instagram</span>
                <a href="https://instagram.com/kitchenviz.co" target="_blank" rel="noopener noreferrer" className="text-pink-600 font-bold hover:underline">
                  @kitchenviz.co
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
