console.log("is it this one");
import * as functions from "firebase-functions";
import express from "express";

import Loaders from './loaders';
import Logger from './loaders/logger';

async function startServer() {
  const app = express();

  await Loaders({ expressApp: app });

  try{
    console.log("starting")
    exports.app = functions.https.onRequest(app);
    console.log("🚀  Server listening  🚀")
  } catch (error) {
    Logger.error("⛔️ ERROR STARTING SERVER")
  }
}

startServer();