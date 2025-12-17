"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const obsidian_1 = require("obsidian");
const DEFAULT_SETTINGS = {
    autoFixOnPaste: true
};
class ListPasteFixerPlugin extends obsidian_1.Plugin {
    async onload() {
        await this.loadSettings();
        // Register paste event handler
        this.registerEvent(this.app.workspace.on('editor-paste', (evt, editor) => {
            if (this.settings.autoFixOnPaste) {
                this.handlePaste(evt, editor);
            }
        }));
        // Add command to manually fix lists
        this.addCommand({
            id: 'fix-list-spacing',
            name: 'Fix list spacing in current note',
            editorCallback: (editor) => {
                const content = editor.getValue();
                const fixed = this.fixListSpacing(content);
                if (fixed !== content) {
                    editor.setValue(fixed);
                }
            }
        });
        // Add settings tab
        this.addSettingTab(new ListPasteFixerSettingTab(this.app, this));
    }
    handlePaste(evt, editor) {
        const clipboardText = evt.clipboardData?.getData('text/plain');
        if (!clipboardText)
            return;
        // Check if the clipboard contains lists with double newlines
        if (this.hasDoubleNewlineInLists(clipboardText)) {
            evt.preventDefault();
            const fixed = this.fixListSpacing(clipboardText);
            editor.replaceSelection(fixed);
        }
    }
    hasDoubleNewlineInLists(text) {
        // Check if there are list items separated by double newlines
        const listPattern = /^[\s]*([-*]|\d+\.)\s/m;
        const doubleNewlinePattern = /\n\n[\s]*([-*]|\d+\.)\s/;
        return listPattern.test(text) && doubleNewlinePattern.test(text);
    }
    fixListSpacing(text) {
        const lines = text.split('\n');
        const result = [];
        let i = 0;
        while (i < lines.length) {
            const currentLine = lines[i];
            // Check if current line is a list item
            if (this.isListItem(currentLine)) {
                result.push(currentLine);
                // Skip all consecutive blank lines if followed by another list item
                let blankLineCount = 0;
                let j = i + 1;
                // Count consecutive blank lines
                while (j < lines.length && lines[j].trim() === '') {
                    blankLineCount++;
                    j++;
                }
                // If there are blank lines followed by another list item, skip them
                if (blankLineCount > 0 && j < lines.length && this.isListItem(lines[j])) {
                    // Skip all the blank lines
                    i = j - 1; // Will be incremented at the end of the loop
                }
                else if (blankLineCount > 0) {
                    // Keep the blank lines if not followed by a list item
                    for (let k = 0; k < blankLineCount; k++) {
                        result.push('');
                    }
                    i = j - 1;
                }
            }
            else {
                // Not a list item, just add it
                result.push(currentLine);
            }
            i++;
        }
        return result.join('\n');
    }
    isListItem(line) {
        const trimmed = line.trimStart();
        // Match bullet lists: -, *, or numbered lists: 1., 2., etc.
        return /^[-*]\s/.test(trimmed) || /^\d+\.\s/.test(trimmed);
    }
    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }
    async saveSettings() {
        await this.saveData(this.settings);
    }
}
exports.default = ListPasteFixerPlugin;
class ListPasteFixerSettingTab extends obsidian_1.PluginSettingTab {
    constructor(app, plugin) {
        super(app, plugin);
        this.plugin = plugin;
    }
    display() {
        const { containerEl } = this;
        containerEl.empty();
        new obsidian_1.Setting(containerEl)
            .setName('Auto-fix list spacing on paste')
            .setDesc('Automatically remove double newlines between list items when pasting')
            .addToggle(toggle => toggle
            .setValue(this.plugin.settings.autoFixOnPaste)
            .onChange(async (value) => {
            this.plugin.settings.autoFixOnPaste = value;
            await this.plugin.saveSettings();
        }));
    }
}
