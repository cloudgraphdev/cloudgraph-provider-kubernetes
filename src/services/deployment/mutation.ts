export default `mutation($input: [Addk8sDeploymentInput!]!) {
  addk8sDeployment(input: $input, upsert: true) {
    numUids
  }
}`;
