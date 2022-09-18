import * as admin from "firebase-admin";

import serviceAccountKey from "../../serviceAccountKey.json"
//  const serviceAccountKeyjson = require("../serviceAccountKey.json")
const serviceAccount:any = serviceAccountKey;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

const firestoreClient = admin.firestore()

export default firestoreClient;