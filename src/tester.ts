import * as vscode from 'vscode';
import { parse, stringify } from 'yaml';
import fetch from 'node-fetch';

export function registerTestEndpointCommand() {
    return vscode.commands.registerCommand('api-validator.testEndpoint', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor || !editor.document.fileName.endsWith('.api-review.yml')) {
            return vscode.window.showWarningMessage('Please open an API Review file to test an endpoint.');
        }

        const document = editor.document;
        const text = document.getText();
        let reviewData;
        try {
            reviewData = parse(text);
        } catch (e) {
            return vscode.window.showErrorMessage('Could not parse the YAML file.');
        }
        
        const testEndpoint = reviewData.performance?.testEndpoint;
        if (!testEndpoint) {
            return vscode.window.showWarningMessage('No "testEndpoint" found in the performance section of this file.');
        }

        vscode.window.showInformationMessage(`Testing latency for: ${testEndpoint}...`);

        try {
            const latencies: number[] = [];
            for (let i = 0; i < 3; i++) { // Make 3 requests to get an average
                const startTime = Date.now();
                await fetch(testEndpoint);
                const endTime = Date.now();
                latencies.push(endTime - startTime);
            }

            const avgLatency = Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length);

            // Update the document
            reviewData.performance.avgResponseTimeMs = avgLatency;
            const newText = stringify(reviewData);

            const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(text.length));
            const edit = new vscode.WorkspaceEdit();
            edit.replace(document.uri, fullRange, newText);
            await vscode.workspace.applyEdit(edit);

            vscode.window.showInformationMessage(`✅ Test complete. Average latency: ${avgLatency}ms. File updated.`);

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            vscode.window.showErrorMessage(`Failed to test endpoint: ${errorMessage}`);
        }
    });
}