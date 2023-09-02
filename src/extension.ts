import * as vscode from 'vscode';
import * as path from 'path'

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "vscode-ext-test" is now active!');

	context.subscriptions.push(
		vscode.commands.registerCommand(`vscode-ext-test.createFlow`, () => {
				vscode.window.showInformationMessage(
					"Task Man Init"
				);
				// console.log('extention root path: ', context.extensionPath)
				const panel = prepareWebView(context);

				panel.webview.onDidReceiveMessage(
					async ({ message }) => {
						vscode.window.showInformationMessage(message);
					},
					undefined,
					context.subscriptions
				);
			}
		)
	)

	context.subscriptions.push(
		vscode.commands.registerCommand('vscode-ext-test.openVueApp', () => {
			vscode.window.showInformationMessage('Task Man Init')
		})
	)
}

export function deactivate() {}

export function prepareWebView(context: vscode.ExtensionContext) {
    const panel = vscode.window.createWebviewPanel(
        "TaskMan",
        "Task Man",
        vscode.ViewColumn.One,
        {
            enableScripts: true,
            localResourceRoots: [
                vscode.Uri.file(
                    path.join(context.extensionPath, "vue-build", "assets")
                ),
                vscode.Uri.file(
                    path.join(context.extensionPath, "vue-app", "assets")
                ),
            ],
        }
    );

    const dependencyNameList = [
        "index.css",
        "index.js",
        "vendor.js",
        "logo.svg",
    ];
    const dependencyList: vscode.Uri[] = dependencyNameList.map((item) =>
        panel.webview.asWebviewUri(
            vscode.Uri.file(
                path.join(context.extensionPath, "vue-build", "assets", item)
            )
        )
    );
    const assetsUri = vscode.Uri.file(path.join(context.extensionPath, 'vue-build', 'assets'));
    const assetsWebviewUri = panel.webview.asWebviewUri(assetsUri);
    const html = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
    <script>
            const vscode = acquireVsCodeApi();
            const assetsUri = ${assetsUri};
            const assetsWebviewUri = ${assetsWebviewUri};
    </script>
    <script type="module" crossorigin src="${dependencyList[1]}"></script>
    <link rel="stylesheet" href="${dependencyList[0]}">
  </head>
  <body>
    <div id="app"></div>
  </body>
  </html>
  `;
    panel.webview.html = html;
    return panel;
}