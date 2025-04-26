import admin from "firebase-admin";
import serviceAccount from "./firebaseAdmin.json" with { type: "json" };


// initialise firebase admin SDK with credentials from json file above
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;