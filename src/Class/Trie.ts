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
      if (!current.children[word[i]]) {
        current.children[word[i]] = new TrieNode();
      }
      current = current.children[word[i]];
    }
    console.log(current);
    current.children["*"] = new TrieNode();
  }
  
  // search the word in the trie structure and return null if not found or the last letter of the word
  search(word: string): null | TrieNode {
    let current = this.root;
    for (let i = 0; i < word.length; i++) {
      if (!current.children[word[i]]) {
        return null;
      }
      current = current.children[word[i]];
    }
    return current;
  }

  // browse into the trie structure from a node and store all the words in an array
  collectAllWords(
    words: string[],
    node: TrieNode | null,
    word: string
  ): string[] {
    if (node === null) {
      return words;
    }
    for (let key in node.children) {
      if (key === "*") {
        words.push(word);
      }
      words = this.collectAllWords(words, node.children[key], word + key);
    }
    return words;
  }

  // browse into the trie structure from a node and return all the words that start with the prefix
  autocomplete(prefix: string): string[] {
    let current = this.root;
    for (let i = 0; i < prefix.length; i++) {
      if (!current.children[prefix[i]]) {
        return [];
      }
      current = current.children[prefix[i]];
    }
    return this.collectAllWords([], current, prefix);
  }
  
}
