import { 
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject 
  } from 'firebase/storage';
  import { storage } from './config';
  
  export const uploadFile = async (path, file) => {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };
  
  export const deleteFile = async (path) => {
    const storageRef = ref(storage, path);
    return deleteObject(storageRef);
  };