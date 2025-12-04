import * as vscode from 'vscode';

// Regex to find potential API base URLs in code.
const API_URL_REGEX = /(https?:\/\/(api|dev|stage)\.[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/v\d+)?)/g;

export function registerScanProjectCommand() {
    return vscode.commands.registerCommand('api-validator.scanProjectForApis', async () => {
        console.log('API Validator: Starting project scan...');
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            return vscode.window.showInformationMessage('Please open a project folder to scan for APIs.');
        }

        const files = await vscode.workspace.findFiles('**/*.{js,ts,py,java,go,env}', '**/node_modules/**');
        if (files.length === 0) {
            return vscode.window.showInformationMessage('No relevant files found to scan for APIs.');
        }

        const discoveredApis = new Set<string>();
        
        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "Scanning project for API endpoints...",
            cancellable: true
        }, async (progress) => {
            for (const file of files) {
                progress.report({ message: `Scanning ${vscode.workspace.asRelativePath(file)}` });
                const document = await vscode.workspace.openTextDocument(file);
                const text = document.getText();
                let match;
                while ((match = API_URL_REGEX.exec(text)) !== null) {
                    discoveredApis.add(match[1]);
                }
            }
        });

        if (discoveredApis.size === 0) {
            return vscode.window.showInformationMessage('No potential API endpoints found in the project.');
        }

        const selectedApi = await vscode.window.showQuickPick(
            Array.from(discoveredApis), 
            { placeHolder: 'We found these APIs. Select one to create a review file for.' }
        );

        if (selectedApi) {
            vscode.commands.executeCommand('api-validator.newReviewFile', selectedApi);
        }
    });
}