class Grid {
    constructor(sentence, sets=[]) {
        // Replace repeated spaces with single spaces
        this.sentence = sentence.replace(/\s{2,}/g, " ").trim();
        this.sets = sets;
        this.URLtoWord = {};
        this.imgURLs = [];
        this.sentence.split(' ').forEach(word => {
            const setNo = sets[Math.floor(Math.random() * sets.length)];
            const url = `https://robohash.org/${word}?set=set${setNo}`;
            this.URLtoWord[url] = word;
            this.imgURLs.push(`https://robohash.org/${word}?set=set${setNo}`)
        });
    }
}

export default Grid;
