"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
console.clear();
var Trie_1 = require("./Class/Trie");
var prompt_sync_1 = __importDefault(require("prompt-sync"));
var inquirer_1 = __importDefault(require("inquirer"));
var prompt = (0, prompt_sync_1["default"])();
var trie = new Trie_1.Trie();
var start = function () {
    inquirer_1["default"].prompt([
        {
            name: 'CLI',
            type: 'list',
            message: 'Choose an action:',
            choices: ['Insert new word', 'Search word', 'Display words', 'Autocomplete', 'Exit']
        }
    ]).then(function (answer) {
        console.clear();
        promptRoot(answer);
    })["finally"](function () {
        start();
    });
};
var promptRoot = function (answer) {
    if (answer.CLI === 'Insert new word')
        inputInsert();
    else if (answer.CLI === 'Search word')
        inputSearch();
    else if (answer.CLI === 'Display words')
        displayWords();
    else if (answer.CLI === 'Autocomplete')
        inputAutoComplete();
    else
        process.exit();
};
var inputInsert = function () {
    var input = prompt('Enter a word to insert : ');
    input = input.toLowerCase();
    console.log(input);
    console.clear();
    trie.insert(input);
    console.log('Inserted');
    console.log(trie.root);
};
var inputSearch = function () {
    var input = prompt('Enter a word to search: ');
    console.clear();
    var res = trie.search(input);
    console.log(res);
};
var displayWords = function () {
    var words = trie.collectAllWords([], trie.root, '');
    console.log(words);
};
var inputAutoComplete = function () {
    var input = prompt('Enter a prefix to autocomplete: ');
    console.clear();
    var res = trie.autocomplete(input);
    console.log(res);
};
start();
//# sourceMappingURL=app.js.map