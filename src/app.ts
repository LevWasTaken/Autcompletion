console.clear();

import { Trie } from './Class/Trie';
import promptSync from 'prompt-sync';
import inquirer from 'inquirer';

const prompt = promptSync();
const trie = new Trie();
const start = () => {
    inquirer.prompt([
        {
            name: 'CLI',
            type: 'list',
            message: 'Choose an action:',
            choices: ['Insert new word', 'Search word', 'Display words', 'Autocomplete', 'Exit']
        }
    ]).then((answer: any) => {
        console.clear();
        promptRoot(answer);
    }).finally(() => {
        start();
    })
}

const promptRoot = (answer: any) => {
    if (answer.CLI === 'Insert new word') inputInsert();
    else if (answer.CLI === 'Search word') inputSearch();
    else if (answer.CLI === 'Display words') displayWords();
    else if (answer.CLI === 'Autocomplete') inputAutoComplete();
    else process.exit();
}

const inputInsert = () => {
    let input = prompt('Enter a word to insert : ');
    input = input.toLowerCase();
    console.log(input);
    console.clear();
    trie.insert(input);
    console.log('Inserted');
    console.log(trie.root);
}

const inputSearch = () => {
    const input = prompt('Enter a word to search: ');
    console.clear();
    const res = trie.search(input);
    console.log(res);
}

const displayWords = () => {
    const words = trie.collectAllWords([], trie.root, '');
    console.log(words);
}

const inputAutoComplete = () => {
    const input = prompt('Enter a prefix to autocomplete: ');
    console.clear();
    const res = trie.autocomplete(input);
    console.log(res);
}

start();
