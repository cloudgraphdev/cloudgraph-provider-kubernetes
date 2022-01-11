export default `mutation($input: [Addk8sJobInput!]!) {
  addk8sJob(input: $input, upsert: true) {
    numUids
  }
}`;
