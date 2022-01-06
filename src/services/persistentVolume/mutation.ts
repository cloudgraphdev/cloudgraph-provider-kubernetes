export default `mutation($input: [Addk8sPersistentVolumeInput!]!) {
  addk8sPersistentVolume(input: $input, upsert: true) {
    numUids
  }
}`;
