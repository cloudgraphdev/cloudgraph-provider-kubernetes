export default `mutation($input: [Addk8sCronJobInput!]!) {
  addk8sCronJob(input: $input, upsert: true) {
    numUids
  }
}`;
