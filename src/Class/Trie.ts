import { TrieNode } from "./TrieNode";
export class Trie {
  root: TrieNode;
  constructor() {
    this.root = new TrieNode();
  }
  //add the word to the trie structure and add a * to the end of the word
  insert(word: string): void {
    let current = this.root;
    for (let i = 0; i < word.length; i++) {
      // if the node doesn't have the letter, we create it
      if (!current.children[word[i]]) {
        // we create the node
        current.children[word[i]] = new TrieNode();
      }
      // we move to the next node
      current = current.children[word[i]];
    }
    // we add the * to the end of the word
    current.children["*"] = new TrieNode();
  }
  
  // search the word in the trie structure and return null if not found or the last letter of the word
  search(word: string): null | TrieNode {
    let current = this.root;
    // we search the word in the trie
    for (let i = 0; i < word.length; i++) {
      // if the node doesn't have the letter, we return null
      if (!current.children[word[i]]) {
        return null;
      }
      // we move to the next node
      current = current.children[word[i]];
    }
    // we return the last letter of the word
    return current;
  }

  // browse into the trie structure from a node and store all the words in an array
  collectAllWords(
    words: string[],
    node: TrieNode | null,
    word: string
  ): string[] {
    // if the node is null, we reached the end of the trie
    if (node === null) {
      return words;
    }
    // if the node has a *, we reached the end of the word
    for (let key in node.children) {
      if (key === "*") {
        // we add the word to the array
        words.push(word);
      }
      // if the node has a child, we continue the search
      words = this.collectAllWords(words, node.children[key], word + key);
    }
    return words;
  }

  // browse into the trie structure from a node and return all the words that start with the prefix
  autocomplete(prefix: string): string[] {
    let current = this.root;
    // we search the prefix in the trie
    for (let i = 0; i < prefix.length; i++) {
      // if the node doesn't have the letter, we return an empty array
      if (!current.children[prefix[i]]) {
        return [];
      }
      // we move to the next node
      current = current.children[prefix[i]];
    }
    // we collect all the words that start with the prefix
    return this.collectAllWords([], current, prefix);
  }
  
}
