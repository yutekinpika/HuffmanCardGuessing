class Node {
    constructor(char, freq) {
        this.char = char;
        this.freq = freq;
        this.left = null;
        this.right = null;
    }
}

class MinHeap {
    constructor() {
        this.nodes = [];
    }

    insert(node) {
        this.nodes.push(node);
        this.bubbleUp();
    }

    bubbleUp() {
        let index = this.nodes.length - 1;
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.nodes[index].freq >= this.nodes[parentIndex].freq) break;
            [this.nodes[index], this.nodes[parentIndex]] = [this.nodes[parentIndex], this.nodes[index]];
            index = parentIndex;
        }
    }

    extractMin() {
        if (this.nodes.length < 2) return this.nodes.pop();
        const minNode = this.nodes[0];
        this.nodes[0] = this.nodes.pop();
        this.bubbleDown();
        return minNode;
    }

    bubbleDown() {
        let index = 0;
        const length = this.nodes.length;
        while (true) {
            let leftChildIndex = 2 * index + 1;
            let rightChildIndex = 2 * index + 2;
            let smallestIndex = index;

            if (leftChildIndex < length && this.nodes[leftChildIndex].freq < this.nodes[smallestIndex].freq) {
                smallestIndex = leftChildIndex;
            }

            if (rightChildIndex < length && this.nodes[rightChildIndex].freq < this.nodes[smallestIndex].freq) {
                smallestIndex = rightChildIndex;
            }

            if (smallestIndex === index) break;
            [this.nodes[index], this.nodes[smallestIndex]] = [this.nodes[smallestIndex], this.nodes[index]];
            index = smallestIndex;
        }
    }
}

function buildHuffmanTree(frequencies) {
    const minHeap = new MinHeap();

    for (const [char, freq] of Object.entries(frequencies)) {
        minHeap.insert(new Node(char, freq));
    }

    while (minHeap.nodes.length > 1) {
        const left = minHeap.extractMin();
        const right = minHeap.extractMin();
        const merged = new Node(null, left.freq + right.freq);
        merged.left = left;
        merged.right = right;
        minHeap.insert(merged);
    }

    return minHeap.extractMin();
}

function generateCodes(node, prefix = "", codes = {}) {
    if (node) {
        if (node.char !== null) {
            codes[node.char] = prefix;
        }
        generateCodes(node.left, prefix + "0", codes);
        generateCodes(node.right, prefix + "1", codes);
    }
    return codes;
}

function huffmanCoding(cards) {
    const frequencies = {};

    for (const card of cards) {
        frequencies[card] = (frequencies[card] || 0) + 1;
    }

    const huffmanTree = buildHuffmanTree(frequencies);
    const huffmanCodes = generateCodes(huffmanTree);

    return { huffmanTree, huffmanCodes };
}

function decodeHuffman(node, encodedStr) {
    let currentNode = node;
    let decodedStr = '';

    for (const bit of encodedStr) {
        currentNode = bit === '0' ? currentNode.left : currentNode.right;

        if (currentNode.left === null && currentNode.right === null) {
            decodedStr += currentNode.char;
            currentNode = node;
        }
    }

    return decodedStr;
}

function isDecodable(node, encodedStr) {
    let currentNode = node;

    for (const bit of encodedStr) {
        currentNode = bit === '0' ? currentNode.left : currentNode.right;

        if (currentNode === null) {
            return false; // 無効なビット列
        }
    }

    // 最後に葉ノードにいるかどうかをチェック
    return currentNode.left === null && currentNode.right === null;
}

const sampleCards = [];

for(let i=0;i<49;i++)sampleCards.push('AS');
for(let i=0;i<26;i++)sampleCards.push('7H');
for(let i=0;i<21;i++)sampleCards.push('AH');
for(let i=0;i<18;i++)sampleCards.push('JS');
for(let i=0;i<18;i++)sampleCards.push('KS');
for(let i=0;i<16;i++)sampleCards.push('7S');
for(let i=0;i<15;i++)sampleCards.push('3H');
for(let i=0;i<15;i++)sampleCards.push('8S');
for(let i=0;i<14.;i++)sampleCards.push('3S');
for(let i=0;i<13;i++)sampleCards.push('AD');
for(let i=0;i<12;i++)sampleCards.push('7D');
for(let i=0;i<12;i++)sampleCards.push('5H');
for(let i=0;i<10;i++)sampleCards.push('8H');
for(let i=0;i<10;i++)sampleCards.push('QH');
for(let i=0;i<10;i++)sampleCards.push('2S');
for(let i=0;i<9;i++)sampleCards.push('6S');
for(let i=0;i<8;i++)sampleCards.push('8D');
for(let i=0;i<8;i++)sampleCards.push('7C');
for(let i=0;i<8;i++)sampleCards.push('JC');
for(let i=0;i<8;i++)sampleCards.push('2H');
for(let i=0;i<8;i++)sampleCards.push('4H');
for(let i=0;i<8;i++)sampleCards.push('10H');
for(let i=0;i<8;i++)sampleCards.push('4S');
for(let i=0;i<7;i++)sampleCards.push('3C');
for(let i=0;i<7;i++)sampleCards.push('5S');
for(let i=0;i<6;i++)sampleCards.push('JH');
for(let i=0;i<6;i++)sampleCards.push('10S');
for(let i=0;i<6;i++)sampleCards.push('QS');
for(let i=0;i<5;i++)sampleCards.push('4D');
for(let i=0;i<5;i++)sampleCards.push('4C');
for(let i=0;i<5;i++)sampleCards.push('5C');
for(let i=0;i<5;i++)sampleCards.push('9S');
for(let i=0;i<4;i++)sampleCards.push('9D');
for(let i=0;i<4;i++)sampleCards.push('KD');
for(let i=0;i<3;i++)sampleCards.push('10D');
for(let i=0;i<3;i++)sampleCards.push('QD');
for(let i=0;i<3;i++)sampleCards.push('AC');
for(let i=0;i<3;i++)sampleCards.push('2C');
for(let i=0;i<3;i++)sampleCards.push('6C');
for(let i=0;i<3;i++)sampleCards.push('9C');
for(let i=0;i<3;i++)sampleCards.push('QC');
for(let i=0;i<3;i++)sampleCards.push('6H');
for(let i=0;i<3;i++)sampleCards.push('KH');
for(let i=0;i<2;i++)sampleCards.push('2D');
for(let i=0;i<2;i++)sampleCards.push('3D');
for(let i=0;i<2;i++)sampleCards.push('5D');
for(let i=0;i<2;i++)sampleCards.push('6D');
for(let i=0;i<2;i++)sampleCards.push('8C');
for(let i=0;i<2;i++)sampleCards.push('9H');
for(let i=0;i<1;i++)sampleCards.push('JD');
for(let i=0;i<1;i++)sampleCards.push('10C');
for(let i=0;i<1;i++)sampleCards.push('KC');

const { huffmanTree, huffmanCodes } = huffmanCoding(sampleCards);

console.log(Object.entries(huffmanCodes).sort((a, b) => a[1].length - b[1].length));

function collectKeysByBit(input) {
    // まず、最大のビット数を見つける
    const maxLength = Math.max(...Object.values(input).map(binStr => binStr.length));
    
    // 各ビット位置ごとにキーを格納する配列を作成
    const result = Array.from({ length: maxLength }, () => []);

    // 各プロパティを調べる
    for (const [key, binaryString] of Object.entries(input)) {
        // 逆順にしてビットを調べる
        for (let i = 0; i < binaryString.length; i++) {
            if (binaryString[i] === '1') {
                result[i].push(key);
            }
        }
    }

    return result;
}
function sortNestedArrays(input) {
    return input.map(innerArray => innerArray.slice().sort());
}

const cardQuestions = sortNestedArrays(collectKeysByBit(huffmanCodes));

console.log(cardQuestions);

let currentQuestionIndex = 0;
let answers = [];

function displayQuestion() {
    if (currentQuestionIndex < cardQuestions.length) {
        const cards = cardQuestions[currentQuestionIndex];
        const questionText = `下記の中にあなたの選んだカードは含まれていますか？\n${cards.join(' ')}`;
        document.getElementById("question").innerText = questionText;
    } else {
        encodeAndDecode();
    }
}

function encodeAndDecode() {
    const encodedBits = answers.join('');

    const decodedCards = decodeHuffman(huffmanTree, encodedBits);
    document.getElementById("question").innerText = `あなたが選んだカードは: ${decodedCards}`;
}

document.getElementById("yesBtn").onclick = function() {
    answers.push('1'); // Yesの場合、1を追加
    currentQuestionIndex++;
    if(isDecodable(huffmanTree,answers.join(''))){
        encodeAndDecode();
    }else{
        displayQuestion();
    }
};

document.getElementById("noBtn").onclick = function() {
    answers.push('0'); // Noの場合、0を追加
    currentQuestionIndex++;
    if(isDecodable(huffmanTree,answers.join(''))){
        encodeAndDecode();
    }else{
        displayQuestion();
    }
};

// 初回質問の表示
displayQuestion();
