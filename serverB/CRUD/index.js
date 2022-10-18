const { initializeApp } = require('firebase/app');

const {
    getFirestore,
    collection,
    doc,
    setDoc,
    addDoc,
    getDocs,
    getDoc,
    deleteDoc
} = require('firebase/firestore/lite');


const firebaseConfig = initializeApp({
    apiKey: "AIzaSyCZfylZ6VRE17gNmFybNFyinaDk9hkLxw8",
    authDomain: "learning-docker-6f896.firebaseapp.com",
    projectId: "learning-docker-6f896",
    storageBucket: "learning-docker-6f896.appspot.com",
    messagingSenderId: "315634099939",
    appId: "1:315634099939:web:4daa87e0aa1950c88f87d6"
  });

  const db = getFirestore();

async function save(nomeTabela, id, dado) {
    if (id) {
        const referenceEntity = await setDoc(doc(db, nomeTabela, id), dado);
        const savedData = {
            ...dado,
            id: id
        }
        return savedData;
    } else {
        const referenceEntity = await addDoc(collection(db, nomeTabela), dado);
        const savedData = {
            ...dado,
            id: referenceEntity.id
        }
        return savedData;
    }
}

async function get(nomeTabela) {
    const data = await getDocs(collection(db, nomeTabela));
    return data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
}

async function getById(nomeTabela, id) {
    const docRef = doc(db, nomeTabela, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return new Error("Not found!");
    }

}

async function remove(nomeTabela, id){
    await deleteDoc(doc(db, nomeTabela, id));
}
async function getById(table_name, id) {
    const docTable = doc(db, table_name, id);
    const docResp = await getDoc(docTable);
    
    if (docResp.exists()) {
        return docResp.data();
    }
    else {
        return new Error("Not found!");
    }
}

module.exports = {
    save,
    get,
    getById,
    remove
}