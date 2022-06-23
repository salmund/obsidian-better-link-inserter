import {
	Editor,
	MarkdownView,
	Plugin,
} from "obsidian";



export default class BetterLinkInserterPlugin extends Plugin {
	async onload() {
		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: "use-selected-word-as-alias",
			name: "Insert an internal link (using selected word as alias if possible)",
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selected_word = editor.getSelection();
				if (selected_word == "") {
					editor.replaceSelection(`[[]]`);
					const current_line = editor.getCursor();
					const wanted_position = current_line;
					wanted_position.ch =
						wanted_position.ch - 2;
					editor.setCursor(wanted_position);
				} else {
					editor.replaceSelection(`[[|${selected_word}]]`);
					const current_line = editor.getCursor();
					const wanted_position = current_line;
					wanted_position.ch =
						wanted_position.ch - (selected_word.length + 3);
					editor.setCursor(wanted_position);
				}
			},
		});

	}

	onunload() {}
}
