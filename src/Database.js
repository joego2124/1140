import config from './config';
import Firebase from "firebase";

var jsonTree;

function InitializeJsonTree(){

	if (!Firebase.apps.length) {
		Firebase.initializeApp(config);
	}else {
		Firebase.app(); // if already initialized, use that one
	}
    
    let ref = Firebase.database().ref('/');
    ref.once('value', snapshot => {
        const state = snapshot.val();
        jsonTree = state;
        console.table(jsonTree);
    });
}

function findPath(varName){
    //TODO: add caching
    //TODO make general function blacklist train list
    return findById(jsonTree, varName, '');
}

function findById(o, id, path) {
    var result, p; 
    for (p in o) {
        if( o.hasOwnProperty(p) ) {

            var newP = path + '/' + p;
            if(p.toLowerCase() === id) {
                return newP;
            } 
            if (typeof(o[p]) === 'object') {
                var result = findById(o[p], id, newP);
                if(result) return result;
            }
        }
    }
    return result;
}

function DatabaseSet(value, varName){
    var path = findPath(varName.toLowerCase());
    
    if (!path) {
        console.warn(`${varName} NOT FOUND IN RTDB TREE`);
    } else {
        Firebase.database().ref(path).set(value);
    }
}

function DatabaseGet(setter, varName){
    var path = findPath(varName.toLowerCase());

    if (!path) {
        console.warn(`${varName} NOT FOUND IN RTDB TREE`);
    } else {
        let ref = Firebase.database().ref(path);
        ref.on('value', snapshot => {
            const state = snapshot.val();
            setter(state);
        });
    }
}

export {
    InitializeJsonTree,
    DatabaseSet,
    DatabaseGet,
}