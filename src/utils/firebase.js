import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyAHCRZH5_KDWpVj2IPv-Zk0kdclByk-_CA',
	authDomain: 'onboard-auth-8f54a.firebaseapp.com',
	projectId: 'onboard-auth-8f54a',
	storageBucket: 'onboard-auth-8f54a.appspot.com',
	messagingSenderId: '985580383617',
	appId: '1:985580383617:web:3748f90834ae56453c4c80',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
