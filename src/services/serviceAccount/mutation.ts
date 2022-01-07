export default `mutation($input: [Addk8sServiceAccountInput!]!) {
  addk8sServiceAccount(input: $input, upsert: true) {
    numUids
  }
}`;
