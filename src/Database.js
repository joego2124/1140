import config from './config';
import Firebase from "firebase";
import { waitFor } from '@testing-library/react';

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
    // console.log('tree check', jsonTree.hasOwnProperty('CTC'))
    // if(!jsonTree.hasOwnProperty('CTC')) InitializeJsonTree();
    // console.log('before',jsonTree);
    // if(jsonTree ==undefined){
    //     InitializeJsonTree();
    //     while(jsonTree == undefined);
    // } 
    // console.log('after', jsonTree);
    //TODO: add caching
    //TODO make general function blacklist train list
    return findById(jsonTree, varName, '');
}

function findById(o, id, path) {
    var result, p; 
    for (p in o) {
        if( o.hasOwnProperty(p) ) {

            var newP = path + '/' + p;
            // console.log(newP);
            if(p.toLowerCase() === id) {
                // console.log('FOUND',newP);
                return newP;
            } 
            if (typeof(o[p]) === 'object') {
                // console.log("recursing");
                var result = findById(o[p], id, newP);
                if(result) return result;
            }
        }
    }
    return result;
}

function DatabaseSet(value, varName){
    // console.log("write attempted", varName);
    var path = findPath(varName.toLowerCase());
    console.log(path);
    if (!path) {
        console.warn(`${varName} NOT FOUND IN RTDB TREE`);
    } else {
        Firebase.database().ref(path).set(value);
    }
}

function DatabaseGet(setter, varName){
    // console.log('read attempted');
    var path = findPath(varName.toLowerCase());
    // console.log(varName,path, jsonTree);
    let ref = Firebase.database().ref(path);
    ref.on('value', snapshot => {
        const state = snapshot.val();
        // console.log(`${varName}`);
        // state.keys().forEach(element => console.log(element));
        // console.table(state);
        // setter(state);
        // console.log(state);
    });
}

export {
    InitializeJsonTree,
    DatabaseSet,
    DatabaseGet,
}