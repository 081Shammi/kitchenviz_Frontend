// import PolicyPage from "./PolicyPage";

import PolicyPage from "./PolicyPage";

const exclusionsContent = `
  <p>We do not accept returns or exchanges for:</p>
  <ul>
    <li>Minor cosmetic flaws that do not affect functionality.</li>
    <li>Damages caused by misuse, improper installation, power fluctuations, or physical mishandling after delivery.</li>
    <li>Unauthorized repairs or modifications performed by third parties.</li>
    <li>Products outside of the warranty period.</li>
    <li>Warranty does not cover consumables, accessories, or external parts unless specified.</li>
  </ul>
`;

export default function Exclusions() {
  return (
    <PolicyPage title="Exclusions" content={exclusionsContent} />
  );
}
