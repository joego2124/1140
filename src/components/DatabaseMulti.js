import Firebase from "firebase";

function DatabaseGetMulti({ setterFunction, path }){

    if (!path) {
        console.warn(`${path} NOT FOUND IN RTDB TREE`);
    } else {
        let ref = Firebase.database().ref(path);
        ref.on('value', snapshot => {
            const state = snapshot.val();
            setterFunction(state);
        });
    }
}

export default DatabaseGetMulti;
