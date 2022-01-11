export default `mutation($input: [Addk8sRoleInput!]!) {
  addk8sRole(input: $input, upsert: true) {
    numUids
  }
}`;
