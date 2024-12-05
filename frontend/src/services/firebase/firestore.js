import { 
    collection,
    doc,
    setDoc,
    getDoc,
    getDocs,
    query,
    where 
  } from 'firebase/firestore';
  import { db } from './config';
  
  export const addDocument = async (collectionName, data, id) => {
    const ref = id 
      ? doc(db, collectionName, id)
      : doc(collection(db, collectionName));
    
    await setDoc(ref, data);
    return ref;
  };
  
  export const getDocument = async (collectionName, id) => {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  };