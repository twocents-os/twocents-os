import { nanoid } from "nanoid";

const issueVerifiedCredential = (options) => {
  const credentialId = nanoid(10);

  const doc = {
    /**
     * Doc: See https://www.w3.org/TR/vc-data-model/#contexts
     * Type: Array of string
     * Required: True
     */
    "@context": [
      "https://www.w3.org/2018/credentials/v1",
      "https://www.w3.org/2018/credentials/examples/v1",
    ],
    /**
     * Doc: See See https://www.w3.org/TR/vc-data-model/#types
     * Type: Array of string
     * Required: True
     */
    type: ["VerifiableCredential"],
    /**
     * Doc: See https://www.w3.org/TR/vc-data-model/#identifiers
     * Type: Url
     * Required: True
     */
    id: `https://beta.twocents.so/credentials/${credentialId}`,
    /**
     * Doc: See https://www.w3.org/TR/vc-data-model/#issuer
     * Type: Object with required property "id"
     * Required: True
     */
    issuer: {
      id: `https://beta.twocents.so/people/${options.issuerEthAddress}`,
      ethereumAddress: options.issuerEthAddress,
    },
    /**
     * Doc: See  https://www.w3.org/TR/vc-data-model/#issuance-date
     * Type: ISO Date string
     * Required: True
     */
    issuanceDate: options.issuanceDate,
    /**
     * Doc: See https://www.w3.org/TR/vc-data-model/#credential-subject
     * Type: Object with required property "id"
     * Required: True
     */
    credentialSubject: {
      id: `https://beta.twocents.so/credentials/${credentialId}`,
      ethereumAddress: options.targetEthAddress,
      meta: options.meta,
    },
    /**
     * Doc: See https://www.w3.org/TR/vc-data-model/#data-schemas
     * Type: Object with required property "id"
     * Required: True
     */
    credentialSchema: {
      id: "k3y52l7qbv1fryp7fle8dvb02bxwugsqhjz3edlzu8n33msm8w33613fdge24aby8",
      type: "IssuedCredentials",
    },
  };
  return { credentialId, doc };
};

export default issueVerifiedCredential;
