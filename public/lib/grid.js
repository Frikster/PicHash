class Grid {
    constructor(sentence, sets=[]) {
        // Replace repeated spaces with single spaces
        this.sentence = sentence.replace(/\s{2,}/g, " ").trim();
        this.sets = sets;
        this.imgURLs = {};
        this.sentence.split(' ').forEach(word => {
            const setNo = sets[Math.floor(Math.random() * sets.length)];
            this.imgURLs[word] = `https://robohash.org/${word}?set=set${setNo}`;
        });
    }
}

export default Grid;
