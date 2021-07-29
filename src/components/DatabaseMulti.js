import Firebase from "firebase";

// FIXME: DatabaseGetMulti isn't working with the VarIndicators :(

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

function DatabaseSetMulti({ value, path }){
    
    if (!path) {
        console.warn(`${path} NOT FOUND IN RTDB TREE`);
    } else {
        Firebase.database().ref(path).set(value);
    }
}

export {
    DatabaseGetMulti,
    DatabaseSetMulti,
}
