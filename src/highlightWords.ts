/**
 * Highlight given word in child text nodes of given root node. 
 * Highlighting is implemented by wrapping the word between <mark>..</mark> tags.
 * The mark tag is supported in HTML5.
 * @param rootNode the parse tree
 * @return the visitor result
 */
export function markText(rootNode: HTMLElement, word: string, caseSensitive = false) {
    // word can also be empty string "" which we do not mark!
    if (word == "") return;
    // create regex
    let flags = 'gi';
    if (caseSensitive) {
        flags = 'g';
    }
    const regex = new RegExp(`(${word})`, flags);
    // setup walker to walk over text nodes below rootNode
    const walker = document.createTreeWalker(rootNode, NodeFilter.SHOW_TEXT, null);
    let node;
    node = walker.nextNode();
    while (node) {
        // we much fetch nextNode already, because
        // if we have a match we create a newNode based on 'node'
        // place newNode before 'node' and remove 'node'.
        // If walker's current node is 'node', and we remove it,
        // then the walker state is affected such that if stops.
        // We prevent this by already taking a nextNode before
        // handling 'node'.
        let nextNode = walker.nextNode()
        const parentNode = node.parentNode!;
        if (node.nodeValue && regex.test(node.nodeValue)) {
            // create new html text from text in textnode 
            const newHTML = node.nodeValue.replace(regex, '<mark>$1</mark>');
            // place this text in a div element as innerHTML making the text being parsed as html!
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = newHTML;
            // take the newly html nodes inside the div (tempDiv.firstChild) and place it in parentnode
            //  as child before node (we are changing), then remove this old node from parent. (only remaining the newly html nodes in the parent node) 
            while (tempDiv.firstChild) {
                parentNode.insertBefore(tempDiv.firstChild, node);
            }
            parentNode.removeChild(node);
        }
        node = nextNode;
    }
}

/**
 * Remove all highlighting in child text nodes of given root node.
 * Remove highlighting is implemented by unwrapping words between <mark>..</mark> tags.
 * The mark tag is supported in HTML5.
 * @param ctx the parse tree
 * @return the visitor result
 */
export function unMarkText(rootNode: HTMLElement) {
    // Unwrap any <mark> elements inside the item from previous search
    rootNode.querySelectorAll("mark").forEach((mark) => {
        const parent = mark.parentNode!;
        while (mark.firstChild) {
            parent.insertBefore(mark.firstChild, mark);
            // bla <mark>textinside</mark>  --> bla textinside<mark>textinside</mark>
        }
        parent.removeChild(mark);
        // bla textinside<mark>textinside</mark> -> bla textinside
        parent.normalize(); // after removing mark tags we get multiple adjacent text nodes, with normalized they get merged into one
        // without normalizing a split text could not be matched by a next search anymore
    });
}