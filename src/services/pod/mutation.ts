export default `mutation($input: [Addk8sPodInput!]!) {
  addk8sPod(input: $input, upsert: true) {
    numUids
  }
}`;
