import PolicyPage from "./PolicyPage";

const exchangePolicyContent = `
  <p>
    Our products come with a standard warranty period, which covers technical or manufacturing defects. 
    If the product develops a technical fault within the warranty period and it is not due to external damage or misuse, we will repair or replace the defective part/product at our discretion.
  </p>
  <p>
    Customers must contact our support team with a detailed description of the issue, proof of purchase, and (if applicable) supporting images or videos.
  </p>
  <p>
    Our technical team will assess the problem and guide you through the resolution process, which may include:
  </p>
  <ul>
    <li>Remote troubleshooting</li>
    <li>Component replacement</li>
    <li>Product exchange (if necessary)</li>
  </ul>
  <p>
    Turnaround times may vary depending on the issue, but we strive to resolve all technical concerns as quickly as possible.
  </p>
`;

export default function ExchangePolicy() {
  return (
    <PolicyPage title="Exchange Policy – Technical Issues Under Warranty" content={exchangePolicyContent} />
  );
}