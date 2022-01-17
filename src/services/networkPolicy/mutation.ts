export default `mutation($input: [Addk8sNetworkPolicyInput!]!) {
  addk8sNetworkPolicy(input: $input, upsert: true) {
    numUids
  }
}`;
