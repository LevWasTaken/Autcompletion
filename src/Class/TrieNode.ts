export class TrieNode {
  constructor(public children: { [key: string]: TrieNode } = {}) {
    this.children = children;
  }
}
