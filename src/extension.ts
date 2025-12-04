import * as vscode from 'vscode';
import { registerCreateReviewFileCommand } from './commands';
import { registerScanProjectCommand } from './scanner';
import { createDiagnostics, loadThreatDatabase } from './linter';
import { registerTestEndpointCommand } from './tester'; // <-- CORRECTLY PLACED IMPORT

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "api-validator" is now active!');

    // 1. Load the threat intelligence data on activation
    loadThreatDatabase(context);
    
    // 2. Register Commands
    context.subscriptions.push(registerCreateReviewFileCommand());
    context.subscriptions.push(registerScanProjectCommand());
    context.subscriptions.push(registerTestEndpointCommand()); // <-- CORRECTLY PLACED FUNCTION CALL

    // 3. Create and register the diagnostic collection for security linting
    const diagnosticCollection = vscode.languages.createDiagnosticCollection('api-validator');
    context.subscriptions.push(diagnosticCollection);

    // Run linter on the active document when the extension starts
    if (vscode.window.activeTextEditor) {
        createDiagnostics(vscode.window.activeTextEditor.document, diagnosticCollection);
    }

    // Add listeners to run the linter when documents are opened or saved
    context.subscriptions.push(
        vscode.workspace.onDidOpenTextDocument(doc => createDiagnostics(doc, diagnosticCollection))
    );
    context.subscriptions.push(
        vscode.workspace.onDidSaveTextDocument(doc => createDiagnostics(doc, diagnosticCollection))
    );
    context.subscriptions.push(
        vscode.workspace.onDidCloseTextDocument(doc => diagnosticCollection.delete(doc.uri))
    );
}

export function deactivate() {}