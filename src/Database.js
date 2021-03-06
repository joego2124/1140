import config from './config';
import Firebase from "firebase";

var jsonTree;

function InitializeJsonTree(){

	if (!Firebase.apps.length) {
        // if (window.location.hostname === "localhost") {
        //     console.warn("USING EMULATOR DATABASE");
        //     Firebase.database().useEmulator('localhost', 9000);
        // }
		Firebase.initializeApp(config);
	}else {
		Firebase.app(); // if already initialized, use that one
	}
    
    let ref = Firebase.database().ref('/');
    ref.on('value', snapshot => {
        const state = snapshot.val();
        jsonTree = state;
        //console.table(jsonTree);
    });
}

function findPath(varName, parentName){
    //TODO: add caching
    //TODO make general function blacklist train list
    if(parentName != undefined){
        if(typeof parentName === 'string'){
            var parent = findById(jsonTree, `${parentName}`.toLocaleLowerCase(), '');
        } else{
            var parentNameCleaned = Object.values(parentName)[0];
            var parent = findById(jsonTree, `${parentNameCleaned}`.toLowerCase(), '');
        }
        if(!parent){
            console.log('test',parentName, parentNameCleaned);
            console.warn(`PARENT ${parentNameCleaned != undefined ? parentNameCleaned : parentName} NOT FOUND IN RTDB TREE`);
        } else {
            // console.log(parent.newPath);
        return findById(parent.obj, varName.toLowerCase(), parent.newPath)?.newPath;
        }
    } else {
        return findById(jsonTree, varName.toLowerCase(), '')?.newPath;
    }
}

function findById(o, id, path) {
    // console.log(id,path, o);
    var result, p; 
    for (p in o) {
        if( o.hasOwnProperty(p) ) {

            var newPath = path + '/' + p;
            // console.log(path, p, newPath)
            if(p.toLowerCase() === id) {
                var obj = o[p];
                // console.log(newPath, obj);
                return {newPath, obj};
            } 
            if (typeof(o[p]) === 'object') {
                var result = findById(o[p], id, newPath);
                if(result) return result;
            }
        }
    }
    return result;
}

// function listById(o, id) {
//     // console.log(id, o);
//     // if(o.toLowerCase() === id){
//     //     var result = [], p;
//     //     for (p in o) {
//     //         if( o.hasOwnProperty(p)) result.push(p.id);
//     //     }
//     //     return result;
//     // }

//     var result, p; 
//     for (p in o) {
//         if( o.hasOwnProperty(p) ) {
//             if(p.toLowerCase() === id) {
//                 return ;
//             } 

//             if (typeof(o[p]) === 'object') {
//                 var result = findById(o[p], IDBCursor);
//                 if(result) return result;
//             }
//         }
//     }
//     return result;
// }

function DatabaseSet(value, varName, parentName){
    
    var path = findPath(varName, parentName);
    console.log('DB Setter Path: ', path)

    if (!path) {
        console.warn(`${varName} NOT FOUND IN RTDB TREE`);
    } else {
        Firebase.database().ref(path).set(value);
    }
}

function DatabaseSet2(value, varName, parentName){
    
    var path = '/TrainList/' + parentName + '/' + varName;

    if (!path) {
        console.warn(`${varName} NOT FOUND IN RTDB TREE`);
    } else {
        Firebase.database().ref(path).set(value);
    }
}

function DatabaseSet3(value){
    
    var path = '/TC/EnableHW';
    if (!path) {
        console.warn(`NOT FOUND IN RTDB TREE`);
    } else {
        Firebase.database().ref(path).set(value);
    }
}

function DatabaseGet(setter, varName, parentName){
    
    //console.log('varName: ', varName)
    //console.log('parentName: ', parentName)
    // var path = '/TrainList/' + parentName + '/' + varName;
    var path = findPath(varName, parentName);
    //console.log('path: ', path)

    if (!path) {
        console.log(path);
        console.log("hello");
        console.warn(`${varName} NOT FOUND IN RTDB TREE`);
    } else {
        let ref = Firebase.database().ref(path);
        ref.on('value', snapshot => {
            const state = snapshot.val();
            setter(state);
        });
    }
}

function DatabaseGet2(setter, varName, parentName){

    var path = '/TrainList/' + parentName + '/' + varName;

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

function DatabaseGet3(setter){

    var path = '/TC/EnableHW';
    if (!path) {
        console.warn(`NOT FOUND IN RTDB TREE`);
    } else {
        let ref = Firebase.database().ref(path);
        ref.on('value', snapshot => {
            const state = snapshot.val();
            setter(state);
        });
    }
}

function DatabaseAdd(path, value){
    Firebase.database().ref(path).set(value);
}

function DatabaseList(setter, varName, parentName){
    // listById(jsonTree, varName);
    var path = findPath(varName, parentName);
    console.log(varName,parentName,path);

    if (!path) {
        console.warn(`${varName} NOT FOUND IN RTDB TREE`);
    } else {
        let ref = Firebase.database().ref(path);
        ref.on('value')
        .then(function(snapshot) {
          const state = snapshot.val();
          var p, result = [];
          for(p in state)
          {
            //   console.log(state,p);
              result.push(p);
          }
        //   console.table(path, result);
          setter(result);
        //   console.log('list',result);
          
            // ref.on('child_added', (snapshot, prevChildKey) => {
            //     const child = snapshot.val();
            //     result.push(child.id);
            //     setter(result);
            // });

            // ref.on('child_removed', snapshot => {
            //     const child = snapshot.val();
            //     result.remove(child.id);
            //     setter(result);
            // });
        });
    }
}

export {
    InitializeJsonTree,
    DatabaseSet,
    DatabaseSet2,
    DatabaseSet3,
    DatabaseGet,
    DatabaseGet2,
    DatabaseGet3,
    DatabaseAdd,
    DatabaseList,
}