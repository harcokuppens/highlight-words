<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

# Highlight words in HTML

### Table of Contents

- [Description](##Description)
- [markText][1]
  - [Parameters][2]
- [unMarkText][3]
  - [Parameters][4]

## Description

Using the `highlightWords` typescript library you can easily add highlighting of
words in HTML. For example when searching for a word you can use this library to
highlight the searched word in the webpage. Highlighting is implemented by wrapping
the word between `<mark>..</mark>` tags. The [mark][7] tag is supported in HTML5.

Using the `markText` function you can add highlighting for all appearances of word in
child text nodes of a given root node. You can repeat this to add highlighting for
several different words.

Using the `unMarkText` function you can remove all highlighting in in child text
nodes of a given root node.

## Example

## API

### function markText(rootNode: HTMLElement, word: string)

Highlight given word in child text nodes of a given root node. Highlighting is
implemented by wrapping the word between `<mark>..</mark>` tags. The [mark][7] tag is
supported in HTML5.

#### Parameters

- `rootNode` **[HTMLElement][5]**
- `word` **[string][6]**&#x20;

### function unMarkText(rootNode: HTMLElement)

Remove all highlighting in child text nodes of a given root node. Remove highlighting
is implemented by unwrapping words between `<mark>..</mark>` tags. The [mark][7] tag
is supported in HTML5.

#### Parameters

- `rootNode` **[HTMLElement][5]**&#x20;

[1]: #marktext
[2]: #parameters
[3]: #unmarktext
[4]: #parameters-1
[5]: https://developer.mozilla.org/docs/Web/HTML/Element
[6]:
  https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String
[7]: https://developer.mozilla.org/docs/Web/HTML/Element/mark
