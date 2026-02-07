const admin = require('firebase-admin');
const logger = require('../utils/logger');
const path = require('path');

let firebaseInitialized = false;

const initializeFirebase = () => {
  if (firebaseInitialized) {
    return admin;
  }

  try {
    const serviceAccountPath = path.join(__dirname, '..', 'firebase-service-account.json');
    const serviceAccount = require(serviceAccountPath);

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });

    firebaseInitialized = true;
    logger.info('Firebase Admin initialized successfully');
  } catch (error) {
    logger.error('Firebase initialization failed', { error: error.message });
    logger.warn('SMS will use development mode (console logging)');
  }

  return admin;
};

module.exports = { initializeFirebase, admin };
