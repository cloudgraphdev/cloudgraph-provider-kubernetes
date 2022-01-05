export default `mutation($input: [Addk8sIngressInput!]!) {
  addk8sIngress(input: $input, upsert: true) {
    numUids
  }
}`;
