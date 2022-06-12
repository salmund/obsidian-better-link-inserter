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
			name: "Insert an internal link",
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

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(
			window.setInterval(() => console.log("setInterval"), 5 * 60 * 1000)
		);
	}

	onunload() {}
}
