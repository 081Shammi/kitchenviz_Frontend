import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PolicyPage from "./PolicyPage";

const importantNotesContent = `
  <ul>
    <li>OVENIA reserves the right to reject a return or exchange request if the conditions of this policy are not met.</li>
    <li>In case of product unavailability for exchange, we may offer a suitable replacement or credit note.</li>
    <li>Shipping costs (if any) for exchanges outside damage-related claims will be communicated transparently in advance.</li>
    <li>This policy is subject to change without prior notice. The version applicable will be the one in effect at the time of your order.</li>
  </ul>`;
export default function ImportantNotes() {
  return (
    <>
      <PolicyPage title={"Important Notes"} content={importantNotesContent} />
    </>
  );
}
