# Tidy

Tidies the list formatting copied from LLM outputs (ChatGPT, Claude, Gemini, etc.). Automatically removes extra newlines from lists when pasting into Obsidian.

## Features

- ✅ **Auto-paste mode**: Automatically cleans lists when pasting from LLMs
- ✅ **Manual command**: Fix existing notes via Command Palette
- ✅ **Toggle setting**: Turn auto-paste on/off in settings
- ✅ Handles both bullet lists (`-`, `*`) and numbered lists (`1.`, `2.`, etc.)
- ✅ Supports nested/indented lists
- ✅ Handles multiple consecutive blank lines
- ✅ Preserves blank lines at the end of lists

## Installation

### From Obsidian Community Plugins (Recommended)

1. Open Obsidian Settings
2. Go to Community Plugins → Browse
3. Search for "Tidy"
4. Click Install, then Enable

### Manual Installation

1. Download `main.js` and `manifest.json` from the [latest release](https://github.com/yourusername/obsidian-tidy/releases)
2. Create folder: `YourVault/.obsidian/plugins/tidy/`
3. Copy both files into the folder
4. Reload Obsidian
5. Enable "Tidy" in Settings → Community Plugins

## Usage

### 🔄 Automatic Mode (Default)

Just copy from any LLM and paste into Obsidian - lists are automatically cleaned!

**Before pasting:**
```markdown
- Item 1

- Item 2

- Item 3
```

**After pasting:**
```markdown
- Item 1
- Item 2
- Item 3
```

### 🛠️ Manual Command

Fix existing notes:
1. Open Command Palette (`Ctrl/Cmd + P`)
2. Search for "Fix list spacing in current note"
3. Run the command

### ⚙️ Settings

Go to **Settings → Tidy**:
- **Auto-fix list spacing on paste**: Toggle automatic cleanup (default: ON)

## Examples

### Simple List
```markdown
Before:                       After:
- First                       - First
                              - Second
- Second                      - Third
                              
- Third
```

### Nested List
```markdown
Before:                       After:
- Parent 1                    - Parent 1
                                - Child 1
  - Child 1                     - Child 2
                              - Parent 2
  - Child 2
                              
- Parent 2
```

### Numbered List
```markdown
Before:                       After:
1. Step one                   1. Step one
                              2. Step two
2. Step two                   3. Step three
                              
3. Step three
```

## Development

### Building from Source

```bash
# Install dependencies
npm install

# Build the plugin
npm run build

# Run tests
node test_comprehensive.js
```

### Project Structure

```
.
├── main.ts              # TypeScript source code
├── main.js              # Compiled plugin (generated)
├── manifest.json        # Plugin metadata
├── package.json         # npm configuration
├── tsconfig.json        # TypeScript configuration
└── test_comprehensive.js # Test suite
```

### Running Tests

```bash
npm run build
node test_comprehensive.js
```

Expected output: `7 passed, 0 failed out of 7 tests`

## How It Works

Tidy detects list items with double newlines and removes the extra spacing:

1. **On Paste**: Intercepts clipboard content, checks for lists with extra newlines
2. **Pattern Detection**: Uses regex to identify bullet/numbered lists
3. **Smart Cleanup**: Removes blank lines between list items while preserving:
   - Blank lines after lists (before regular text)
   - Nested list indentation
   - List item content
   - Other markdown formatting

### Technical Details

- **Regex patterns**: Properly grouped patterns for bullet (`-`, `*`) and numbered lists (`1.`, `2.`)
- **Edge cases handled**: Multiple consecutive blank lines, nested lists, mixed list types
- **Non-destructive**: Only processes list items, ignores code blocks and other content

## FAQ

**Q: Does it work with all LLMs?**  
A: Yes! Works with ChatGPT, Claude, Gemini, and any other LLM that adds extra spacing.

**Q: Will it mess up my code blocks?**  
A: No! Tidy only processes list items, not code blocks or other content.

**Q: Can I undo if something goes wrong?**  
A: Yes! Use `Ctrl/Cmd + Z` to undo immediately after pasting or running the command.

**Q: Does it work on mobile?**  
A: Yes! The plugin works on both desktop and mobile Obsidian.

**Q: What if I want spacing between some list items?**  
A: Turn off auto-paste in settings and manually format, or add spacing after Tidy runs.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Bug Fixes & Improvements

Recent fixes include:
- Fixed regex patterns for better list detection
- Improved handling of multiple consecutive blank lines
- Better edge case handling for nested lists
- Added TypeScript definite assignment assertion

## License

MIT

## Support

If you encounter any issues or have suggestions, please [open an issue](https://github.com/yourusername/obsidian-tidy/issues) on GitHub.
