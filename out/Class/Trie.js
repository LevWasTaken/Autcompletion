"use strict";
exports.__esModule = true;
exports.Trie = void 0;
var TrieNode_1 = require("./TrieNode");
var Trie = /** @class */ (function () {
    function Trie() {
        this.root = new TrieNode_1.TrieNode();
    }
    //add the word to the trie structure and add a * to the end of the word
    Trie.prototype.insert = function (word) {
        var current = this.root;
        for (var i = 0; i < word.length; i++) {
            if (!current.children[word[i]]) {
                current.children[word[i]] = new TrieNode_1.TrieNode();
            }
            current = current.children[word[i]];
        }
        console.log(current);
        current.children["*"] = new TrieNode_1.TrieNode();
    };
    // search the word in the trie structure and return null if not found or the last letter of the word
    Trie.prototype.search = function (word) {
        var current = this.root;
        for (var i = 0; i < word.length; i++) {
            if (!current.children[word[i]]) {
                return null;
            }
            current = current.children[word[i]];
        }
        return current;
    };
    // browse into the trie structure from a node and store all the words in an array
    Trie.prototype.collectAllWords = function (words, node, word) {
        if (node === null) {
            return words;
        }
        for (var key in node.children) {
            if (key === "*") {
                words.push(word);
            }
            words = this.collectAllWords(words, node.children[key], word + key);
        }
        return words;
    };
    // browse into the trie structure from a node and return all the words that start with the prefix
    Trie.prototype.autocomplete = function (prefix) {
        var current = this.root;
        for (var i = 0; i < prefix.length; i++) {
            if (!current.children[prefix[i]]) {
                return [];
            }
            current = current.children[prefix[i]];
        }
        return this.collectAllWords([], current, prefix);
    };
    return Trie;
}());
exports.Trie = Trie;
//# sourceMappingURL=Trie.js.map