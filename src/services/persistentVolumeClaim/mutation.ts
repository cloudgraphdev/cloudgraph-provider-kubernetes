export default `mutation($input: [Addk8sPersistentVolumeClaimInput!]!) {
  addk8sPersistentVolumeClaim(input: $input, upsert: true) {
    numUids
  }
}`;
