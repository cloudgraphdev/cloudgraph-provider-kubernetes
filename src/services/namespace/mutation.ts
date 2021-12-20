export default `mutation($input: [Addk8sNamespaceInput!]!) {
  addk8sNamespace(input: $input, upsert: true) {
    numUids
  }
}`;
