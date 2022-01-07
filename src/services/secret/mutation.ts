export default `mutation($input: [Addk8sSecretInput!]!) {
  addk8sSecret(input: $input, upsert: true) {
    numUids
  }
}`;
