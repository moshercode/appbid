import { initializeApp } from 'firebase/app';
import { getDataConnect } from 'firebase/data-connect';
import { isSupported, getAnalytics } from 'firebase/analytics';
import { connectorConfig } from './generated/esm/index.esm.js';

const firebaseConfig = {
  projectId: 'appbid-69f5b',
  appId: '1:182978217993:web:1ed48b6dc4cba34f9c10d8',
  storageBucket: 'appbid-69f5b.firebasestorage.app',
  apiKey: 'AIzaSyA14fdnW6jVHzBxf4Y-Mt6p8-9jEVSEwYk',
  authDomain: 'appbid-69f5b.firebaseapp.com',
  messagingSenderId: '182978217993',
  measurementId: 'G-E00WXGTHML',
};

export const app = initializeApp(firebaseConfig);
export const dataConnect = getDataConnect(app, connectorConfig);

// Analytics needs browser APIs (cookies/indexedDB) it won't have in some
// contexts (e.g. private browsing) — isSupported() guards against throwing.
isSupported().then((supported) => {
  if (supported) getAnalytics(app);
});
