class Grid {
    constructor(sentence) {
        this.sentence = sentence;
        this.imgURLs = []
        this.sentence.split(' ').forEach(word => {
            this.imgURLs.push(`https://robohash.org/${word}`);
        });
    }
}

export default Grid;
