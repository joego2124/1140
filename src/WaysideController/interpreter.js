exports.parseFile = (plc) => {
  const { BlockList } = require('net');
  const { openStdin } = require('process');
  const { PassThrough } = require('stream');

  String.format = function (format) {
    var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] != 'undefined' ? args[number] : match;
    });
  };

  //Remove new lines and carridge returns
  plc = plc.replace(/\n\r|\r/gm, '');

  //Split into new lines
  var lines = [];
  lines = plc.split(/\n/);

  console.log(lines[0]);

  var tokens = [];
  var fileName;
  var lineColor;
  //Tokenize all lines
  lines.forEach((element) => {
    //Filter whitespace
    element = element.replace(/\s/, '');

    //Generate Tokens
    tokens.push(tokenGenerator(element));
  });
  //console.log(tokens);
  //Tokenize Conditionals
  tokenizeConditionals(tokens);

  //Write the javascript to file
  //console.log(tokens);
  var text = jsWriter(tokens);
  return { name: fileName, script: text };

  // fs.writeFile("WSC.js", text, (err) => {
  //   if (err) {
  //     console.error(err);
  //     return;
  //   }
  // });

  // ------------ TOKENIZE HELPER ----------
  function tokenGenerator(line) {
    var token = new Object();
    var tokens = [];

    //console.log(line);
    var tokens = [];
    if (line.split(/:/).length == 1) tokens = line.split(/-/);
    else tokens = line.split(/:/);

    token.name = tokens[0];

    if (token.name.includes('WSC')) {
      fileName = token.name.split(':')[0];
      lineColor = tokens[1].replace(/\s/g, '');
      token.type = 'ID';
    } else if (token.name == 'blocks') {
      token.type = 'BLOCKS';
      token.data = tokens[1].split(',');
    } else if (token.name.includes('branch')) {
      token.type = 'BRANCH';
      token.data = tokens[1].split(',');
    } else if (token.name == 'SET') {
      token.type = 'SET';
      token.data = tokens[1];
    }
    //POTENTIALLY REMOVE
    else if (token.name == 'IF') {
      token.type = 'CONDITIONAL';
      token.data = tokens[1];
    } else if (token.name.includes('switch')) {
      token.type = 'SWITCH';
      token.data = tokens[1];
    } else if (token.name == 'listener') {
      token.type = 'BLOCKS';
      token.data = tokens[1].split(',');
    }

    return token;
  }
  // -------- END TOKENIZE HELPER ----------

  // --------- TOKENIZE CONDITIONALS --------

  function tokenizeConditionals(tokens) {
    for (let i = 0; i < tokens.length; i++) {
      switch (tokens[i].name) {
        // case "if":
        //     var data = [];
        //     data = tokens[i].data.split(" ");
        //     var conditions = [];

        //     data.forEach(e => conditions.push(tokenGenerator(e)));
        //     tokens[i].data = conditions;
        case 'SET':
          var data = [];

          // TODO:
          // -Add error checking for SET
          if (!tokens[i].data.includes(' TO ')) {
            throw Error(
              "PLC had a 'SET' without a 'TO' in the line: \n\n" +
                tokens[i].name +
                ' ' +
                tokens[i].data
            );
          }

          data = tokens[i].data.split(' TO ');

          var args = [];

          args.push(new Object({ type: 'TO', variable: data[0] }));

          //Extracts text between '()', splits on ' ', and iterates
          data[1]
            .match(/\(([^)]+)\)/)[1]
            .split(' ')
            .forEach((element) => {
              var obj = new Object();

              // TODO:
              // -Add error checking for correct formatting or args

              if (element.includes('{')) {
                obj.name = element
                  .substr(0, element.indexOf('{'))
                  .toUpperCase();
                obj.type = element
                  .substr(0, element.indexOf('{'))
                  .toUpperCase();
                obj.variable = element.match(/\{(.*?)\}/)[1];
              } else if (
                element.includes('AND') ||
                element.includes('OR') ||
                element.includes('XOR')
              ) {
                obj.type = 'OPERATION';
                obj.operation = element;
              } else {
                obj.type = 'LITERAL';
                obj.variable = element;
              }
              args.push(obj);
            });

          console.log(args);
          tokens[i].data = args;
          break;

        case 'IF':
          tokens[i].data = argParse(tokens[i].data);
      }
    }
  }

  function argParse(args) {
    var tok = args.split(' ');
    var returnArgs = [];

    tok.forEach((element) => {
      var obj = new Object();
      //The two get/set statements
      if (element.includes('occupancy') || element.includes('authority')) {
        obj.type = element.substr(0, element.indexOf('{')).toUpperCase();
        var variable = element.match(/\{(.*?)\}/)[1];

        if (variable.includes('blocks')) {
          var bl = variable.split('-');

          var data = new Object();
          data.name = bl[0];
          data.type = 'BLOCKS';
          data.data = bl[1].split(',');
          obj.data = data;
        } else if (variable.includes('branch')) {
          var data = new Object();
          data.name = variable;
          data.type = 'BRANCH';
          obj.data = data;
        } else if (variable.includes('yard')) {
          var data = new Object();
          data.name = variable;
          data.type = 'YARD';
          obj.data = data;
        } else if (variable.includes('listener')) {
          var data = new Object();
          data.name = variable;
          data.type = 'LISTENER';
          obj.data = data;
        }
        // TODO:
        // -get either literal array or variable name
        // -should be its own function
      } else if (element.includes('SET')) {
        obj.name = element;
        obj.type = element;
      } else if (element.includes('TO')) {
        obj.name = element;
        obj.type = element;
      } else if (element.includes('switch')) {
        var data = new Object();
        obj.name = element;
        obj.type = 'SWITCH';
      } else {
        obj.name = 'LITERAL';
        obj.type = 'LITERAL';
        obj.value = element;

        // TODO:
        // -in either here or jsWriter, get array that does this for the given blocks (Should be array of 1's size of block (THINK))
      }

      if (obj != null) returnArgs.push(obj);
    });
    return returnArgs;
  }

  // function blockBranchExtract(name, data, blocksData){
  //     if (name.includes("blocks")) {
  //         var array = new Array(blocksData.length);
  //         var ones = new Array(blocksData.length);

  //         ones.fill("1", 0, ones.length);
  //         array.fill("0", 0, array.lenth);

  //         //foreach branch
  //         data.forEach((element) => {
  //           array[blocksData.findIndex((el) => el == element)] = "1";
  //         });

  //         var ifAndStr = String.format(
  //           ifAndCall,
  //           "[" + array + "]",
  //           "[" + ones + "]"
  //         );
  //       } else if (name.includes("branch")) {
  //         var ones = new Array(blocksData.length);

  //         ones.fill("1", 0, ones.length);

  //         var split = name.split("-");
  //         var name = split[0] + split[1];

  //         var ifAndStr = String.format(ifAndCall, name, "[" + ones + "]");
  //       }

  //       return ifAndStr;
  // }

  // -------- WRITER HELPER -----------
  function jsWriter(tokens) {
    var header =
      "var firebase = require('firebase-admin');\n\n" +
      'var database = admin.database();\n\n';

    // TODO:
    // -VARIABLE LINE
    var listener =
      "var blockRef = firebase.database().ref('{0}/');\n" +
      'blockRef.get().then((snapshot) => {\n' +
      '\tconst data = snapshot.val();\n' +
      "\tvar ctcRef = firebase.database().ref('CTC/SuggestedAuthority/{1}/');\n" +
      '\tctcRef.get().then((snapshot) => {\n' +
      '\tconst suggestedAuthority = snapshot.val();\n' +
      '\t\tupdateAuth(ctcRef);\n' +
      '\t\tupdateOccupancy(data);\n' +
      '\t\tupdateSwitchState(data);\n' +
      '\t\tlogic();\n' +
      '\t\tupdate(authority, switchState);\n' +
      '});\n' +
      '});\n\n';

    var updateBlocks = 'function updateOccupancy(data){\n';
    var updateBlockInner = "occupancy[{0}] = data['{1}'].Occupancy\n";

    var updateAuth = 'function updateAuth(data){\n';
    var updateAuthInner = "authority[{0}] = data['{1}'].Authority\n";

    var updateSwitchState =
      'function updateSwitchState(data){\n' +
      "switchState = data['{0}'].SwitchState;\n}\n\n";
    var switchState = 'var switchState;\n';

    var and =
      'function and(arr1, arr2){\n' +
      'var result = [];\n' +
      'arr1.map((element, index) => {\n' +
      'result.push(element & arr2[index]);\n' +
      '});\n' +
      'return result;\n' +
      '}\n\n';

    var or =
      'function or(arr1, arr2){\n' +
      'var result = [];\n' +
      'arr1.map((element, index) => {\n' +
      'result.push(element | arr2[index]);\n' +
      '});\n' +
      'return result;\n' +
      '}\n\n';

    var xor =
      'function xor(arr1, arr2){\n' +
      'var result = [];\n' +
      'arr1.map((element, index) => {\n' +
      'result.push(element ^ arr2[index]);\n' +
      '});\n' +
      'return result;\n' +
      '}\n\n';

    var set =
      'function set(indeciesArr, setArr)\n' +
      '{\nvar result = [];\n' +
      'authority = authority.map((element, index) => {\n' +
      'result.push(indeciesArr[index] == 1 ? setArr[index] : element);\n' +
      '})\n authority = result;\n}\n\n';

    var update =
      'function update(auth, switchState){\n' + 'var updates = {};\n';

    var updateInner = "updates['GreenLine/{0}/Authority'] = auth[{1}];\n";
    var updateSwitchInner =
      "updates['GreenLine/{0}/SwitchState'] = switchState;\n";
    var setSwitchState = 'switchState = {0};\n';

    var updateCall = 'update(authority, switchState);\n\n';

    var logic = 'function logic() {\n';

    var simpleDec = '{0} = {1};\n';

    var compoundDec = '{0} = {1}({2},{3});\n';

    var simpleFunc = '{0}({1},{2})';

    var simpleSet = 'set({0}, {1});\n';

    var compoundSet = 'authority = set({0}, {1}({2},{3}));\n';

    var ifBlock = 'if({0}){\n{1}}\n\n';

    var ifCondition = '{0} || {1}';

    var ifAndCall = 'and({0}, {1}).includes(1)';

    var switchUpdate;

    var listenerInner = "listener[{0}] = data['{1}'].Occupancy\n";

    var a = [];
    //Write imports
    var javascript = header;
    var blocks = [];
    var branches = [];
    var switchNum;
    var listenerBlocks = [];

    //Write Tokens
    for (let i = 0; i < tokens.length; i++) {
      switch (tokens[i].type) {
        case 'ID':
          break;
        case 'BLOCKS':
          if (tokens[i].name == 'listener') {
            javascript += 'var listener = [];\n\n';
            for (let j = 0; j < tokens[i].data.length; j++) {
              listenerBlocks.push(tokens[i].data[j]);
              updateBlocks += String.format(
                listenerInner,
                j,
                tokens[i].data[j]
              );
            }
            continue;
          }
          javascript += 'var occupancy = [];\n';
          javascript += 'var authority = [];\n\n';

          javascript += String.format(listener, lineColor);

          for (let j = 0; j < tokens[i].data.length; j++) {
            blocks.push(tokens[i].data[j]);
            update += String.format(updateInner, tokens[i].data[j], j);
            updateAuth += String.format(updateAuthInner, j, tokens[i].data[j]);
            updateBlocks += String.format(
              updateBlockInner,
              j,
              tokens[i].data[j]
            );
          }
          console.log(blocks);
          break;
        case 'BRANCH':
          var temp = [];
          var blockIndex = tokens.findIndex((element) => {
            return element.name === 'blocks';
          });
          var blocksData = tokens[blockIndex].data;

          var name = tokens[i].name.split('-');

          javascript += String.format('var branch{0} = [', name[1]);

          var array = new Array(blocks.length);
          array.fill('0', 0, array.lenth);

          //foreach branch
          tokens[i].data.forEach((element) => {
            array[blocks.findIndex((el) => el == element)] = '1';
          });

          //console.log(array);

          javascript += array;
          javascript += '];\n';
        case 'CLEAR':
        case 'SET':
          // TODO:
          // -Set the logic
          // -Have indexes, can use AND [ones] to get the values before a set
          // -update the authority array or switches
          var data = [];
          data = tokens[i].data;

          var operators = [];

          console.log(tokens[i]);
          data.forEach((element) => {
            //console.log(element);
            switch (element.type) {
              case 'TO':
                if (element.variable.includes('branch'))
                  operators.push(element.variable);
                else if (element.variable.includes('switch')) {
                  operators.push('switchState');
                } else {
                  var data = element.variable.split('-')[1].split(',');
                  var array = new Array(blocks.length);
                  array.fill('0', 0, array.length);
                  data.forEach((element) => {
                    array[blocks.findIndex((el) => el == element)] = '1';
                  });
                  operators.push('[' + array + ']');
                }

                break;
              case 'OCCUPANCY':
              case 'AUTHORITY':
                var name = element.variable.split('-');
                var authOcc = element.type.includes('AUTHORITY')
                  ? 'authority'
                  : 'occupancy';

                //if branch
                if (name.includes('branch')) {
                  name = name[0] + name[1];
                  operators.push(name);
                }

                //else blocks-declaration
                else {
                  var data = name[1].split(',');
                  var array = new Array(blocks.length);
                  array.fill('0', 0, array.length);
                  data.forEach((element) => {
                    array[blocks.findIndex((el) => el == element)] = '1';
                  });

                  name = array;

                  operators.push(
                    String.format(simpleFunc, 'and', '[' + name + ']', authOcc)
                  );
                }

                break;
              case 'OPERATION':
                var operation = element.operation.includes('AND')
                  ? 'and'
                  : element.operation.includes('XOR')
                  ? 'xor'
                  : 'or';
                operators.push(operation);
                break;
              case 'LITERAL':
                operators.push(element.variable);
            }
          });
          console.log(operators);

          // TODO:
          // -Logic is messed up for set
          // -Set should be exclusively
          if (operators.length == 4)
            logic += String.format(
              compoundSet,
              operators[0],
              operators[2],
              operators[1],
              operators[3]
            );
          else if (operators.length == 2)
            logic += String.format(simpleDec, operators[0], operators[1]);
          break;
        case 'CONDITIONAL':
          // TODO:
          // -If needed:
          //      -Get all values necessary for if
          //      -Wrap substatement in if
          //      -update the authority array or switches

          //ops is a list of objects from the operations
          var ops = [];
          for (let j = 0; j < tokens[i].data.length; j++) {
            // FIXME:
            //  -first element is condition
            //  -Add support for more?
            var element = tokens[i].data[j];
            //console.log(tokens[i]);

            if (j == 0) {
              if (element.data.name.includes('blocks')) {
                var array = new Array(blocks.length);
                var ones = new Array(blocks.length);

                ones.fill('1', 0, ones.length);
                array.fill('0', 0, array.lenth);

                //foreach branch
                element.data.data.forEach((element) => {
                  array[blocks.findIndex((el) => el == element)] = '1';
                });

                var arg = element.type.includes('OCCUPANCY')
                  ? 'occupancy'
                  : 'authority';

                var ifAndStr = String.format(ifAndCall, '[' + array + ']', arg);
              } else if (element.data.name.includes('branch')) {
                var ones = new Array(blocks.length);

                ones.fill('1', 0, ones.length);

                var split = element.data.name.split('-');
                var name = split[0] + split[1];

                var arg = element.type.includes('OCCUPANCY')
                  ? 'occupancy'
                  : 'authority';

                var ifAndStr = String.format(ifAndCall, name, arg);
              } else if (element.data.name.includes('yard')) {
                var array = new Array(blocks.length);
                var ones = new Array(blocks.length);

                ones.fill('1', 0, ones.length);
                array.fill('0', 0, array.lenth);

                array[blocks.findIndex((el) => el == '0')] = '1';

                var name = '[' + array + ']';

                var arg = element.type.includes('OCCUPANCY')
                  ? 'occupancy'
                  : 'authority';

                var ifAndStr = String.format(ifAndCall, name, arg);
              } else if (element.data.name.includes('listener')) {
                var array = new Array(listenerBlocks.length);
                var ones = new Array(listenerBlocks.length);

                var ifAndStr = 'listener.includes(1)';
              }
              ops.push(ifAndStr);
            }
            // Assume its a one shot declaration from here on
            else if (element.name == 'SET') {
              // TODO: Either switch, block, or branch

              var element = tokens[i].data[j + 1];
              //console.log(element);

              //GET VARIABLE NAME OF SET
              if (element.type.includes('SWITCH')) {
              } else if (element.data.name.includes('blocks')) {
                var array = new Array(blocks.length);

                array.fill('0', 0, array.lenth);

                element.data.data.forEach((element) => {
                  array[blocks.findIndex((el) => el == element)] = '1';
                });
                var name = '[' + array + ']';
              } else if (element.data.name.includes('branch')) {
                var split = element.data.name.split('-');
                var name = split[0] + split[1];
              } else if (element.data.name.includes('yard')) {
                var array = new Array(blocks.length);
                var ones = new Array(blocks.length);

                ones.fill('1', 0, ones.length);
                array.fill('0', 0, array.lenth);

                array[blocks.findIndex((el) => el == '0')] = '1';

                var name = '[' + array + ']';
              }

              //GET VALUE TO SET TO
              var element = tokens[i].data[j + 3];
              //console.log(element);

              if (element.name.includes('LITERAL')) {
                if (tokens[i].data[j + 1].type.includes('SWITCH')) {
                  ops.push(String.format(setSwitchState, element.value));
                } else {
                  var ones = new Array(blocks.length);

                  ones.fill(element.value, 0, ones.length);

                  var to = '[' + ones + ']';
                  ops.push(String.format(simpleSet, name, to));
                }
              }

              break;
            }
          }
          //console.log(ops);

          var ifstr = String.format(ifBlock, ops[0], ops[1]);
          //console.log(ifstr);
          logic += ifstr;
          break;

        case 'SWITCH':
          javascript += switchState;

          switchNum = tokens[i].data;

          //console.log(String.format(updateSwitchState, tokens[i].data));
          updateSwitchState = String.format(updateSwitchState, tokens[i].data);
          update += String.format(updateSwitchInner, tokens[i].data);
          break;
      }
      javascript += '\n';
    }

    updateBlocks += 'console.log(occupancy);\n';
    updateBlocks += '}\n\n';
    javascript += updateBlocks;
    updateAuth += 'console.log(authority);\n';
    updateAuth += '}\n\n';
    javascript += updateAuth;
    javascript += updateSwitchState;

    logic += '}\n\n';
    javascript += logic;
    javascript += and;
    javascript += or;
    javascript += xor;
    javascript += set;
    //javascript += updateCall;

    update +=
      'firebase.database().ref().update(updates).then(function(error){\nprocess.exit();\n});\n';
    update += '\n}';

    javascript += update;
    return javascript;
  }
};
