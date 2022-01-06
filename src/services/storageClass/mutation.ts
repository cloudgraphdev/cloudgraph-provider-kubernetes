export default `mutation($input: [Addk8sStorageClassInput!]!) {
  addk8sStorageClass(input: $input, upsert: true) {
    numUids
  }
}`;
