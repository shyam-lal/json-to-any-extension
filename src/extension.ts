import * as vscode from 'vscode';
import { convertToCS } from './languages/csharp';
import { convertToDart } from './languages/dart';
import { convertToJS } from './languages/javascript';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "jsontoany" is now active!');

	let disposable = vscode.commands.registerCommand('jsontoany.helloWorld', () => {
		// vscode.window.showInformationMessage('Hello World from JsonToAny!');
		const arrayData: string[] = ['dart', 'cs', 'js'];

		const searchOptions: vscode.QuickPickOptions = {
			placeHolder: 'Enter the required language',
		};

		vscode.window.showQuickPick(arrayData, searchOptions).then((selectedItem) => {
			if (selectedItem) {
				vscode.window.showInformationMessage(`Selected item is ${selectedItem}`)
				showClassNameBox(selectedItem);
			}
		});
	});

	context.subscriptions.push(disposable);
}

function showClassNameBox(selectedItem: string) {
	const inputOptions: vscode.InputBoxOptions = {
		prompt: `Enter the required class name`
	};

	vscode.window.showInputBox(inputOptions).then((className) => {
		if (className) {
			showInputBox(selectedItem, className);
		}
	});
}



function showInputBox(selectedItem: string, className: string) {
	const inputOptions: vscode.InputBoxOptions = {
	  prompt: `Selected: ${selectedItem}. Paste something into the input box.`,
	};
  
	vscode.window.showInputBox(inputOptions).then((pastedText) => {
	  if (pastedText) {
		// Handle the pasted text
		try {
			vscode.window.showInformationMessage(`You pasted: ${pastedText}`);
		
			// const jsonText = "{}";
		const jsonObject = JSON.parse(pastedText);
		// const dartCode = convertToDart(jsonObject, "GeneratedClass");
		let modelCode: string;
		switch (selectedItem) {
			case 'dart':
				modelCode = convertToDart(jsonObject, className);		
				break;

			case 'cs':
				modelCode = convertToCS(jsonObject, className);
				break;

			case 'js':
				modelCode = convertToJS(jsonObject, className);
				break;
		
			default:
				break;
		}

		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const cursor = editor.selection;
			editor.edit((editBuilder) => {
				editBuilder.insert(cursor.active, modelCode);
			});
		}

		// showDartCode(dartCode);
	} catch (error) {
		vscode.window.showErrorMessage('Invalid JSON');
	}
}
	});
}

// {
// 	"name": "Shyam",
// 	"age": 10
// }

// {
// 	"id": 863,
// 	"title": "Hello",
// 	"items": [
// 		{
// 			"id": 110167
// 		}
// 	]
// }
  
  

//   function showDartCode(dartCode: string) {
// 	const panel = vscode.window.createWebviewPanel(
// 	  'dartCodePanel',
// 	  'Dart Code',
// 	  vscode.ViewColumn.One,
// 	  {}
// 	);
  
// 	panel.webview.html = `<html><body><pre>${dartCode}</pre></body></html>`;
//   }

export function deactivate() {}