export default `mutation($input: [Addk8sNodeInput!]!) {
  addk8sNode(input: $input, upsert: true) {
    numUids
  }
}`;
