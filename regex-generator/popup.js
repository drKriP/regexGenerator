// popup.js
document.getElementById("generate").addEventListener("click", function () {
    const inputText = document.getElementById("examples").value.trim();
    const lines = inputText.split(/\n/).map(line => line.trim()).filter(line => line);
    
    if (lines.length < 2) {
        document.getElementById("output").innerText = "Please enter at least two examples.";
        return;
    }
    
    const regex = generateRegex(lines);
    document.getElementById("output").innerText = regex;
});

function generateRegex(samples) {
    const commonPrefix = samples.reduce((a, b) => a.substring(0, [...a].findIndex((c, i) => c !== b[i])), samples[0]);
    const commonSuffix = samples.reduce((a, b) => a.substring(a.length - [...a].reverse().findIndex((c, i) => c !== [...b].reverse()[i])), samples[0]);
    const variablePart = samples.map(s => s.slice(commonPrefix.length, s.length - commonSuffix.length));
    
    if (variablePart.every(part => /^\d+$/.test(part))) {
        return `${commonPrefix}\d{${variablePart[0].length}}${commonSuffix}`;
    }
    if (variablePart.every(part => /^[a-zA-Z]+$/.test(part))) {
        return `${commonPrefix}[a-zA-Z]+${commonSuffix}`;
    }
    return `${commonPrefix}.*${commonSuffix}`;
}