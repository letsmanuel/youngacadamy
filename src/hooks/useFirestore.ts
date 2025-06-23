
import { useState, useEffect } from 'react';
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  onSnapshot,
  Timestamp 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export const useCollection = <T>(collectionName: string, conditions?: any[]) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let q = collection(db, collectionName);
    
    if (conditions && conditions.length > 0) {
      q = query(q, ...conditions) as any;
    }

    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const docs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt,
          updatedAt: doc.data().updatedAt?.toDate?.() || doc.data().updatedAt,
        })) as T[];
        setData(docs);
        setLoading(false);
      },
      (error) => {
        setError(error);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [collectionName, JSON.stringify(conditions)]);

  return { data, loading, error };
};

export const useDocument = <T>(collectionName: string, documentId: string | null) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!documentId) {
      setData(null);
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(doc(db, collectionName, documentId),
      (doc) => {
        if (doc.exists()) {
          const docData = doc.data();
          setData({
            id: doc.id,
            ...docData,
            createdAt: docData.createdAt?.toDate?.() || docData.createdAt,
            updatedAt: docData.updatedAt?.toDate?.() || docData.updatedAt,
          } as T);
        } else {
          setData(null);
        }
        setLoading(false);
      },
      (error) => {
        setError(error);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [collectionName, documentId]);

  return { data, loading, error };
};

export const addDocument = async (collectionName: string, data: any) => {
  const docData = {
    ...data,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  };
  return await addDoc(collection(db, collectionName), docData);
};

export const updateDocument = async (collectionName: string, documentId: string, data: any) => {
  const docData = {
    ...data,
    updatedAt: Timestamp.now()
  };
  return await updateDoc(doc(db, collectionName, documentId), docData);
};

export const deleteDocument = async (collectionName: string, documentId: string) => {
  return await deleteDoc(doc(db, collectionName, documentId));
};
