class Grid {
    constructor(sentence, sets=[]) {
        this.sentence = sentence;
        this.sets = sets;
        this.imgURLs = [];
        this.sentence.split(' ').forEach(word => {
            const setNo = sets[Math.floor(Math.random() * sets.length)];
            this.imgURLs.push(`https://robohash.org/${word}?set=set${setNo}`);
        });
    }
}

export default Grid;
