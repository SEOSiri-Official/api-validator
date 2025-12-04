import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'yaml';

interface Threat {
    domain: string;
    threatType: string;
    description: string;
    severity: 'high' | 'medium' | 'low';
}

let threatDatabase: Threat[] = [];

// Load the threat database from our JSON file
export function loadThreatDatabase(context: vscode.ExtensionContext) {
    const dbPath = path.join(context.extensionPath, 'data', 'threat-database.json');
    try {
        const rawData = fs.readFileSync(dbPath, 'utf8');
        threatDatabase = JSON.parse(rawData);
        console.log('API Validator: Threat database loaded successfully.');
    } catch (error) {
        console.error('API Validator: Failed to load threat database.', error);
        vscode.window.showErrorMessage('API Validator: Could not load threat intelligence data.');
    }
}

export function createDiagnostics(doc: vscode.TextDocument, collection: vscode.DiagnosticCollection) {
    if (!doc.fileName.endsWith('.api-review.yml') || threatDatabase.length === 0) {
        return;
    }

    const diagnostics: vscode.Diagnostic[] = [];
    const text = doc.getText();
    const lines = text.split('\n');

    try {
        const reviewData = parse(text);
        const urlsToCheck = [
            reviewData.integration?.documentationUrl,
            reviewData.performance?.statusPageUrl,
            reviewData.cost?.pricingUrl
        ].filter(Boolean); // Filter out any undefined/null URLs

        for (const url of urlsToCheck) {
            for (const threat of threatDatabase) {
                if (url.includes(threat.domain)) {
                    const lineIndex = lines.findIndex(line => line.includes(url));
                    if (lineIndex !== -1) {
                         const line = doc.lineAt(lineIndex);
                        const diagnostic = new vscode.Diagnostic(
                            line.range,
                            `[Security Warning] This domain (${threat.domain}) is associated with ${threat.threatType}. Reason: ${threat.description}`,
                            vscode.DiagnosticSeverity.Error
                        );
                        diagnostic.source = 'API Validator';
                        diagnostics.push(diagnostic);
                    }
                }
            }
        }
    } catch (error) {
       // Could be a YAML parsing error, ignore for now
    }
    
    collection.set(doc.uri, diagnostics);
}