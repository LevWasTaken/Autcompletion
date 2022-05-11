import { Trie } from './Class/Trie';
import promptSync from 'prompt-sync';
import inquirer from 'inquirer';

const prompt = promptSync();
const trie = new Trie();

// Start the CLI
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
        console.log(trie.root);
    })
}
// Prompt the user to choose an action
const promptRoot = (answer: any) => {
    if (answer.CLI === 'Insert new word') inputInsert();
    else if (answer.CLI === 'Search word') inputSearch();
    else if (answer.CLI === 'Display words') displayWords();
    else if (answer.CLI === 'Autocomplete') inputAutoComplete();
    else process.exit();
}
// Prompt the user to insert a new word
const inputInsert = () => {
    let input = prompt('Enter a word to insert : ');
    input = input.toLowerCase();
    console.log(input);
    console.clear();
    trie.insert(input);
    console.log('Inserted');
}
// Prompt the user to search a word
const inputSearch = () => {
    const input = prompt('Enter a word to search: ');
    console.clear();
    const res = trie.search(input);
    console.log(res);
}
// Display all the words in the trie
const displayWords = () => {
    const words = trie.collectAllWords([], trie.root, '');
    console.log(words);
}
// Prompt the user to autocomplete a word
const inputAutoComplete = () => {
    const input = prompt('Enter a prefix to autocomplete: ');
    console.clear();
    const res = trie.autocomplete(input);
    console.log(res);
}

start();
