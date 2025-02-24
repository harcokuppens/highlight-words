export function markText(rootNode, word) {
    if (word == "")
        return;
    const walker = document.createTreeWalker(rootNode, NodeFilter.SHOW_TEXT, null);
    let node;
    while (node = walker.nextNode()) {
        const parentNode = node.parentNode;
        const regex = new RegExp(`(${word})`, 'gi');
        if (node.nodeValue && regex.test(node.nodeValue)) {
            const newHTML = node.nodeValue.replace(regex, '<mark>$1</mark>');
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = newHTML;
            while (tempDiv.firstChild) {
                parentNode.insertBefore(tempDiv.firstChild, node);
            }
            parentNode.removeChild(node);
        }
    }
}
export function unMarkText(rootNode) {
    rootNode.querySelectorAll("mark").forEach((mark) => {
        const parent = mark.parentNode;
        while (mark.firstChild) {
            parent.insertBefore(mark.firstChild, mark);
        }
        parent.removeChild(mark);
        parent.normalize();
    });
}
//# sourceMappingURL=highlightWords.js.map