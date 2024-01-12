function calculateAverageWordLength(words) {
    let wordCount = 0;
    let totalWordLength = 0;

    for (const word of words) {
        wordCount++;
        totalWordLength += word.length;
    }

    const avgWordLength = wordCount > 0 ? (totalWordLength/wordCount).toFixed(2) : 0;
    return {wordCount, avgWordLength};
}

module.exports = {
    calculateAverageWordLength
}