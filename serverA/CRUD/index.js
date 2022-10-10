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
    apiKey: "AIzaSyBWln3ZPK057mDXj-TzbVznpT1WDsZiyOI",
    authDomain: "atividade-2-cloud.firebaseapp.com",
    projectId: "atividade-2-cloud",
    storageBucket: "atividade-2-cloud.appspot.com",
    messagingSenderId: "703579778435",
    appId: "1:703579778435:web:dcc8b40a5ced5a5d785ab6",
    measurementId: "G-JDZMRQ2BGH"
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