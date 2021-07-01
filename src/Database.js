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
    return findById(jsonTree, varName, '')?.newPath;
}

function findById(o, id, path) {
    // console.log(id, o);
    var result, p; 
    for (p in o) {
        if( o.hasOwnProperty(p) ) {

            var newPath = path + '/' + p;
            // console.log(path, p, newPath)
            if(p.toLowerCase() === id) {
                return {newPath, o};
            } 
            if (typeof(o[p]) === 'object') {
                var result = findById(o[p], id, newPath);
                if(result) return result;
            }
        }
    }
    return result;
}

function DatabaseSet(value, varName, parentName){
    if(parentName != undefined){
        var parentNameCleaned = Object.values(parentName)[0];
        var parent = findById(jsonTree, `${parentNameCleaned}`.toLowerCase(), '');
        if(!parent){
            console.warn(`PARENT ${parentNameCleaned} NOT FOUND IN RTDB TREE`);
        } else {
        var path = findById(Object.values(parent.o)[0], varName.toLowerCase(), parent.newPath)?.newPath;
        }
    } else {
        var path = findPath(varName.toLowerCase());
    }
    
    if (!path) {
        console.warn(`${varName} NOT FOUND IN RTDB TREE`);
    } else {
        Firebase.database().ref(path).set(value);
    }
}

function DatabaseGet(setter, varName, parentName){
    if(parentName != undefined){
        var parentNameCleaned = Object.values(parentName)[0];
        var parent = findById(jsonTree, `${parentNameCleaned}`.toLowerCase(), '');
        if(!parent){
            console.warn(`PARENT ${parentNameCleaned} NOT FOUND IN RTDB TREE`);
        } else {
            var path = findById(Object.values(parent.o)[0], varName.toLowerCase(), parent.newPath)?.newPath;
        }
    } else {
        var path = findPath(varName.toLowerCase());
    }

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