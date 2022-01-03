export default `mutation($input: [Addk8sServiceInput!]!) {
  addk8sService(input: $input, upsert: true) {
    numUids
  }
}`;
