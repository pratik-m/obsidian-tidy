// Test script for the list paste fixer plugin


// Test cases
const testCases = [
    {
        name: "Simple bullet list with double newlines",
        input: `- Item 1

- Item 2

- Item 3`,
        expected: `- Item 1
- Item 2
- Item 3`
    },
    {
        name: "Numbered list with double newlines",
        input: `1. First item

2. Second item

3. Third item`,
        expected: `1. First item
2. Second item
3. Third item`
    },
    {
        name: "Mixed content with lists",
        input: `Some text here

- List item 1

- List item 2

More text here`,
        expected: `Some text here

- List item 1
- List item 2

More text here`
    },
    {
        name: "Nested lists with double newlines",
        input: `- Parent item 1

  - Child item 1

  - Child item 2

- Parent item 2`,
        expected: `- Parent item 1
  - Child item 1
  - Child item 2
- Parent item 2`
    },
    {
        name: "Multiple consecutive blank lines",
        input: `- Item 1


- Item 2



- Item 3`,
        expected: `- Item 1
- Item 2
- Item 3`
    },
    {
        name: "List ending with blank lines",
        input: `- Item 1

- Item 2

- Item 3

End of list`,
        expected: `- Item 1
- Item 2
- Item 3

End of list`
    },
    {
        name: "Mixed bullet types",
        input: `- Dash item

* Star item

- Another dash`,
        expected: `- Dash item
* Star item
- Another dash`
    }
];

// Helper functions (simplified versions for testing)
function isListItem(line) {
    const trimmed = line.trimStart();
    return /^[-*]\s/.test(trimmed) || /^\d+\.\s/.test(trimmed);
}

function fixListSpacing(text) {
    const lines = text.split('\n');
    const result = [];
    let i = 0;

    while (i < lines.length) {
        const currentLine = lines[i];

        if (isListItem(currentLine)) {
            result.push(currentLine);

            let blankLineCount = 0;
            let j = i + 1;

            while (j < lines.length && lines[j].trim() === '') {
                blankLineCount++;
                j++;
            }

            if (blankLineCount > 0 && j < lines.length && isListItem(lines[j])) {
                i = j - 1;
            } else if (blankLineCount > 0) {
                for (let k = 0; k < blankLineCount; k++) {
                    result.push('');
                }
                i = j - 1;
            }
        } else {
            result.push(currentLine);
        }

        i++;
    }

    return result.join('\n');
}

// Run tests
console.log('Running List Paste Fixer Tests...\n');
let passed = 0;
let failed = 0;

testCases.forEach((test, index) => {
    const result = fixListSpacing(test.input);
    const success = result === test.expected;

    if (success) {
        console.log(`✅ Test ${index + 1}: ${test.name}`);
        passed++;
    } else {
        console.log(`❌ Test ${index + 1}: ${test.name}`);
        console.log('Input:');
        console.log(JSON.stringify(test.input));
        console.log('\nExpected:');
        console.log(JSON.stringify(test.expected));
        console.log('\nGot:');
        console.log(JSON.stringify(result));
        console.log('\n---\n');
        failed++;
    }
});

console.log(`\nResults: ${passed} passed, ${failed} failed out of ${testCases.length} tests`);
