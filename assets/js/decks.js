const fetchedDecks = [];
const decks = [
  {
    _id: "html-basics",
    name: "HTML Basics",
    description: "Core HTML tags and concepts",
    cards: [
      {
        _id: 1,
        question: "What does HTML stand for?",
        answer: "HyperText Markup Language",
      },
      {
        _id: 2,
        question: "What tag creates the largest heading on a page?",
        answer: "<h1>",
      },
      {
        _id: 3,
        question: "What tag is used to create a paragraph?",
        answer: "<p>",
      },
      {
        _id: 4,
        question: "What tag creates a hyperlink?",
        answer: "<a>",
      },
      {
        _id: 5,
        question: "What attribute is required on every <img> tag?",
        answer: "alt — it prov_ides alternative text describing the image",
      },
      {
        _id: 6,
        question: "What tag creates an unordered (bulleted) list?",
        answer: "<ul>",
      },
      {
        _id: 7,
        question: "What tag creates an ordered (numbered) list?",
        answer: "<ol>",
      },
      {
        _id: 8,
        question: "What tag contains a single item in a list?",
        answer: "<li>",
      },
      {
        _id: 9,
        question: "What attribute makes a link open in a new tab?",
        answer: 'target="_blank"',
      },
      {
        _id: 10,
        question: "What is the root element of every HTML page?",
        answer: "<html>",
      },
    ],
    color: "#64d583",
  },
  {
    _id: "html-semantic",
    name: "Semantic HTML",
    description: "Meaningful HTML elements for structure and accessibility",
    cards: [
      {
        _id: 11,
        question: "What semantic tag represents the top section of a page?",
        answer: "<header>",
      },
      {
        _id: 12,
        question: "What semantic tag wraps the main navigation links?",
        answer: "<nav>",
      },
      {
        _id: 13,
        question:
          "What semantic tag represents the primary content of the page?",
        answer: "<main>",
      },
      {
        _id: 14,
        question:
          "What semantic tag represents a standalone piece of content, like a blog post?",
        answer: "<article>",
      },
      {
        _id: 15,
        question:
          "What semantic tag represents a thematic grouping of content?",
        answer: "<section>",
      },
      {
        _id: 16,
        question:
          "What semantic tag represents content tangentially related to the main content (e.g., a s_idebar)?",
        answer: "<as_ide>",
      },
      {
        _id: 17,
        question:
          "What semantic tag represents the bottom of a page or section?",
        answer: "<footer>",
      },
      {
        _id: 18,
        question:
          "What is a key benefit of using semantic HTML over generic <div> tags?",
        answer:
          "It improves accessibility, SEO, and makes the code easier to read",
      },
      {
        _id: 19,
        question:
          "What non-semantic tag is commonly used as a generic container?",
        answer: "<div>",
      },
      {
        _id: 20,
        question:
          "What non-semantic inline tag is used to style or group inline content?",
        answer: "<span>",
      },
    ],
    color: "#91a8f9",
  },
  {
    _id: "css-fundamentals",
    name: "CSS Fundamentals",
    description: "Selectors, properties, and the cascade",
    cards: [
      {
        _id: 21,
        question: "What does CSS stand for?",
        answer: "Cascading Style Sheets",
      },
      {
        _id: 22,
        question: "What are the three parts of a CSS rule?",
        answer: "Selector, property, and value",
      },
      {
        _id: 23,
        question: "How do you select an element by its class in CSS?",
        answer: "Use a dot followed by the class name — e.g., .classname",
      },
      {
        _id: 24,
        question: "How do you select an element by its _id in CSS?",
        answer: "Use a hash followed by the _id — e.g., #_idname",
      },
      {
        _id: 25,
        question: "What CSS property changes text color?",
        answer: "color",
      },
      {
        _id: 26,
        question: "What CSS property sets the background color?",
        answer: "background-color",
      },
      {
        _id: 27,
        question: "What CSS property controls the size of text?",
        answer: "font-size",
      },
      {
        _id: 28,
        question: "What does display: none do to an element?",
        answer:
          "H_ides the element completely and removes it from the document flow",
      },
      {
        _id: 29,
        question:
          "In the cascade, which selector takes priority: a class or an element selector?",
        answer: "A class selector — it has higher specificity",
      },
      {
        _id: 30,
        question: "What does the * selector match?",
        answer: "Every element on the page (the universal selector)",
      },
    ],
    color: "#ee955e",
  },
  {
    _id: "css-box-model",
    name: "CSS Box Model",
    description: "Content, padding, border, and margin",
    cards: [
      {
        _id: 31,
        question:
          "What are the four parts of the CSS box model, from ins_ide out?",
        answer: "Content, padding, border, margin",
      },
      {
        _id: 32,
        question:
          "What CSS property controls the space between the content and the border?",
        answer: "padding",
      },
      {
        _id: 33,
        question:
          "What CSS property controls the space outs_ide the border, between elements?",
        answer: "margin",
      },
      {
        _id: 34,
        question:
          "What value of box-sizing includes padding and border in an element's total w_idth and height?",
        answer: "border-box",
      },
      {
        _id: 35,
        question: "What is the default value of box-sizing?",
        answer: "content-box",
      },
      {
        _id: 36,
        question:
          "What shorthand sets top, right, bottom, and left padding in one declaration?",
        answer:
          "padding: top right bottom left — e.g., padding: 10px 20px 10px 20px",
      },
      {
        _id: 37,
        question: "What does margin: auto do when applied to a block element?",
        answer: "Centers the element horizontally within its container",
      },
      {
        _id: 38,
        question: "What does overflow: h_idden do?",
        answer: "Clips any content that extends beyond the element's box",
      },
      {
        _id: 39,
        question:
          "What shorthand declaration adds a 1px sol_id black border on all s_ides?",
        answer: "border: 1px sol_id black",
      },
      {
        _id: 40,
        question: "What CSS property sets the maximum w_idth of an element?",
        answer: "max-w_idth",
      },
    ],
    color: "#ee92d7",
  },
  {
    _id: "css-flexbox",
    name: "CSS Flexbox",
    description: "Flexible layout with Flexbox",
    cards: [
      {
        _id: 41,
        question: "What declaration enables Flexbox on a container?",
        answer: "display: flex",
      },
      {
        _id: 42,
        question:
          "What property controls whether flex items are arranged in a row or column?",
        answer: "flex-direction",
      },
      {
        _id: 43,
        question: "What property aligns flex items along the main axis?",
        answer: "justify-content",
      },
      {
        _id: 44,
        question: "What property aligns flex items along the cross axis?",
        answer: "align-items",
      },
      {
        _id: 45,
        question: "What is the default value of flex-direction?",
        answer: "row",
      },
      {
        _id: 46,
        question:
          "What value of justify-content places equal space between items but none on the edges?",
        answer: "space-between",
      },
      {
        _id: 47,
        question:
          "What value of justify-content and align-items centers items?",
        answer: "center",
      },
      {
        _id: 48,
        question:
          "What property allows flex items to wrap onto multiple lines?",
        answer: "flex-wrap",
      },
      {
        _id: 49,
        question:
          "What property controls how much a flex item grows relative to its siblings?",
        answer: "flex-grow",
      },
      {
        _id: 50,
        question: "What CSS property sets the gap between flex items?",
        answer: "gap",
      },
    ],
    color: "#aa8ef0",
  },
  {
    _id: "js-basics",
    name: "JavaScript Basics",
    description: "Variables, types, and operators",
    cards: [
      {
        _id: 51,
        question:
          "What keyword declares a variable that can be reassigned later?",
        answer: "let",
      },
      {
        _id: 52,
        question: "What keyword declares a variable that cannot be reassigned?",
        answer: "const",
      },
      {
        _id: 53,
        question: "Name three primitive data types in JavaScript.",
        answer:
          "string, number, and boolean (also: null, undefined, symbol, bigint)",
      },
      {
        _id: 54,
        question: "What does typeof return when called on a string?",
        answer: '"string"',
      },
      {
        _id: 55,
        question: "What is the difference between == and === in JavaScript?",
        answer:
          "== checks value only (loose equality); === checks both value and type (strict equality)",
      },
      {
        _id: 56,
        question: 'What is the result of 5 + "3" in JavaScript?',
        answer: '"53" — the number is coerced to a string and concatenated',
      },
      {
        _id: 57,
        question: "What does console.log() do?",
        answer: "Prints a value to the browser developer console",
      },
      {
        _id: 58,
        question: "How do you write a single-line comment in JavaScript?",
        answer: "// followed by the comment text",
      },
      {
        _id: 59,
        question: "What does the ! operator do?",
        answer: "Negates a boolean value (logical NOT): !true === false",
      },
      {
        _id: 60,
        question: "What values are falsy in JavaScript?",
        answer: "false, 0, '' (empty string), null, undefined, and NaN",
      },
    ],
    color: "#f5d770",
  },
  {
    _id: "js-functions",
    name: "JavaScript Functions",
    description: "Declaring, calling, and passing functions",
    cards: [
      {
        _id: 61,
        question: "What keyword declares a traditional named function?",
        answer: "function",
      },
      {
        _id: 62,
        question: "What is a parameter?",
        answer:
          "A named variable in the function definition that receives a value when the function is called",
      },
      {
        _id: 63,
        question: "What is an argument?",
        answer: "The actual value passed to a function when it is called",
      },
      {
        _id: 64,
        question: "What does the return keyword do?",
        answer: "Exits the function and sends a value back to the caller",
      },
      {
        _id: 65,
        question: "What is an arrow function?",
        answer:
          "A concise function syntax using => — e.g., const add = (a, b) => a + b",
      },
      {
        _id: 66,
        question: "What is a callback function?",
        answer:
          "A function passed as an argument to another function, to be executed later",
      },
      {
        _id: 67,
        question:
          "What is the difference between a function declaration and a function expression?",
        answer:
          "Declarations are hoisted to the top of their scope; expressions are not",
      },
      {
        _id: 68,
        question: "What happens if a function has no return statement?",
        answer: "It returns undefined by default",
      },
      {
        _id: 69,
        question:
          "What does writing a function name without parentheses (e.g., myFn) do?",
        answer: "References the function as a value without calling it",
      },
      {
        _id: 70,
        question: "What is a higher-order function?",
        answer:
          "A function that accepts another function as an argument or returns a function",
      },
    ],
    color: "#64d583",
  },
  {
    _id: "js-arrays",
    name: "JavaScript Arrays",
    description: "Working with lists of data",
    cards: [
      {
        _id: 71,
        question: "How do you access the first element of an array called arr?",
        answer: "arr[0] — arrays are zero-indexed",
      },
      {
        _id: 72,
        question: "What property returns the number of elements in an array?",
        answer: ".length",
      },
      {
        _id: 73,
        question:
          "What method adds one or more elements to the end of an array?",
        answer: ".push()",
      },
      {
        _id: 74,
        question:
          "What method removes and returns the last element of an array?",
        answer: ".pop()",
      },
      {
        _id: 75,
        question:
          "What method creates a new array by transforming each element with a callback?",
        answer: ".map()",
      },
      {
        _id: 76,
        question:
          "What method returns a new array containing only elements that pass a test?",
        answer: ".filter()",
      },
      {
        _id: 77,
        question:
          "What method calls a function once for each element without returning a new array?",
        answer: ".forEach()",
      },
      {
        _id: 78,
        question:
          "What method returns the first element that satisfies a condition?",
        answer: ".find()",
      },
      {
        _id: 79,
        question:
          "What method checks whether at least one element passes a test?",
        answer: ".some()",
      },
      {
        _id: 80,
        question: "What method checks whether every element passes a test?",
        answer: ".every()",
      },
    ],
    color: "#91a8f9",
  },
  {
    _id: "js-dom",
    name: "JavaScript DOM",
    description: "Selecting and manipulating elements on the page",
    cards: [
      {
        _id: 81,
        question: "What does DOM stand for?",
        answer: "Document Object Model",
      },
      {
        _id: 82,
        question:
          "What method selects the first element that matches a CSS selector?",
        answer: "document.querySelector()",
      },
      {
        _id: 83,
        question: "What method selects all elements that match a CSS selector?",
        answer: "document.querySelectorAll()",
      },
      {
        _id: 84,
        question:
          "What property gets or sets the visible text content of an element?",
        answer: ".textContent",
      },
      {
        _id: 85,
        question:
          "What property gets or sets the HTML markup ins_ide an element?",
        answer: ".innerHTML",
      },
      {
        _id: 86,
        question: "What method attaches an event handler to an element?",
        answer: ".addEventListener()",
      },
      {
        _id: 87,
        question: "What method creates a new HTML element in JavaScript?",
        answer: "document.createElement()",
      },
      {
        _id: 88,
        question: "What method appends a child node to a parent element?",
        answer: ".append() or .appendChild()",
      },
      {
        _id: 89,
        question:
          "What property prov_ides access to the list of classes on an element?",
        answer: ".classList",
      },
      {
        _id: 90,
        question: "What method adds a class to an element's class list?",
        answer: ".classList.add()",
      },
    ],
    color: "#ee955e",
  },
  {
    _id: "web-tech-terms",
    name: "Web Tech Terms",
    description: "Foundational vocabulary for how the web works",
    cards: [
      {
        _id: 91,
        question: "What does URL stand for?",
        answer: "Uniform Resource Locator",
      },
      {
        _id: 92,
        question: "What does HTTP stand for?",
        answer: "HyperText Transfer Protocol",
      },
      {
        _id: 93,
        question: "What does HTTPS add over HTTP?",
        answer: "Encryption via SSL/TLS, making communication secure",
      },
      {
        _id: 94,
        question: "What is a web browser?",
        answer:
          "A program that retrieves, renders, and displays web pages (e.g., Chrome, Firefox)",
      },
      {
        _id: 95,
        question: "What is a web server?",
        answer: "A computer that stores files and responds to client requests",
      },
      {
        _id: 96,
        question: "What is the difference between a client and a server?",
        answer:
          "A client requests resources; a server responds with those resources",
      },
      {
        _id: 97,
        question: "What does DNS stand for, and what does it do?",
        answer:
          "Domain Name System — it translates domain names (e.g., google.com) into IP addresses",
      },
      {
        _id: 98,
        question: "What is an IP address?",
        answer:
          "A unique numerical label _identifying each device on a network (e.g., 192.168.1.1)",
      },
      {
        _id: 99,
        question: "What does 'rendering' mean in the context of a browser?",
        answer:
          "The process of turning HTML, CSS, and JS into a visual, interactive web page",
      },
      {
        _id: 100,
        question: "What is localhost?",
        answer:
          "The loopback address (127.0.0.1) — it refers to your own computer",
      },
    ],
    color: "#ee92d7",
  },
  {
    _id: "dev-tools",
    name: "Developer Tools",
    description: "Using the browser DevTools to inspect and debug",
    cards: [
      {
        _id: 101,
        question: "How do you open browser Developer Tools in most browsers?",
        answer:
          "Press F12 (or Cmd+Option+I on Mac), or right-click the page and choose Inspect",
      },
      {
        _id: 102,
        question: "What DevTools tab shows the page's HTML structure?",
        answer: "Elements (Chrome) or Inspector (Firefox)",
      },
      {
        _id: 103,
        question:
          "What DevTools tab lets you run JavaScript expressions directly?",
        answer: "Console",
      },
      {
        _id: 104,
        question: "What DevTools tab shows CSS rules for a selected element?",
        answer: "The Styles panel ins_ide the Elements (or Inspector) tab",
      },
      {
        _id: 105,
        question: "What DevTools tab shows network requests made by the page?",
        answer: "Network",
      },
      {
        _id: 106,
        question:
          "What does console.error() do differently from console.log()?",
        answer: "It prints the message in red and marks it as an error",
      },
      {
        _id: 107,
        question: "What is a breakpoint in DevTools?",
        answer:
          "A marker that pauses code execution at a specific line so you can inspect state",
      },
      {
        _id: 108,
        question: "What does 'responsive design mode' in DevTools let you do?",
        answer:
          "Preview and test how a page looks at different screen sizes and device types",
      },
      {
        _id: 109,
        question:
          "In the Elements tab, how can you temporarily change a CSS value to test it?",
        answer:
          "Click the value in the Styles panel and type a new one — changes are live but not saved",
      },
      {
        _id: 110,
        question:
          "What does a red message in the Console tab usually indicate?",
        answer: "A JavaScript runtime error has occurred",
      },
    ],
    color: "#aa8ef0",
  },
  {
    _id: "git-basics",
    name: "Git Basics",
    description: "Version control with Git",
    cards: [
      {
        _id: 111,
        question: "What command initializes a new Git repository in a folder?",
        answer: "git init",
      },
      {
        _id: 112,
        question: "What command stages a specific file for the next commit?",
        answer: "git add <filename>",
      },
      {
        _id: 113,
        question: "What command creates a commit with a descriptive message?",
        answer: 'git commit -m "your message here"',
      },
      {
        _id: 114,
        question:
          "What command shows the current state of your working directory?",
        answer: "git status",
      },
      {
        _id: 115,
        question: "What command shows the history of commits?",
        answer: "git log",
      },
      {
        _id: 116,
        question: "What is a branch in Git?",
        answer:
          "An independent line of development that lets you work without affecting the main codebase",
      },
      {
        _id: 117,
        question: "What command creates and switches to a new branch?",
        answer: "git checkout -b branch-name",
      },
      {
        _id: 118,
        question: "What does git pull do?",
        answer:
          "Fetches changes from a remote repository and merges them into your current branch",
      },
      {
        _id: 119,
        question: "What does git push do?",
        answer: "Uploads your local commits to the remote repository",
      },
      {
        _id: 120,
        question: "What is a merge conflict?",
        answer:
          "When two branches have made different changes to the same part of a file and Git cannot auto-merge them",
      },
    ],
    color: "#f5d770",
  },
];

/**
 * Retrieves a deck object by its _id from the decks array.
 *
 * @param {string} deck_id - The unique _identifier of the deck to retrieve
 * @returns {object|undefined} The deck object if found, undefined otherwise
 */
function getDeckByID(deck_id) {
  return fetchedDecks.find((deck) => deck._id === deck_id);
}

export { fetchedDecks, getDeckByID };
