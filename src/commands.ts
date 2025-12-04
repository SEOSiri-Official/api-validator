import * as vscode from 'vscode';
import * as path from 'path';

const newApiReviewFileContent = `
# API Review for: [API Name]
# Use this file to evaluate an API based on key factors.
# The API Validator extension will provide autocompletion and validation.

apiName: "Example API"
version: "v1"

architecture: REST # Options: REST, GraphQL, SOAP, gRPC

functionality:
  endGoal: "Describe the primary business goal this API helps solve."
  requiredFeatures:
    - Feature A
    - Feature B
  featureCoverage:
    - requirement: "User authentication via SSO"
      isCovered: false
    - requirement: "Process one-time payments"
      isCovered: true
    - requirement: "Handle recurring subscriptions"
      isCovered: true
  notes: ""

integration:
  documentationUrl: "https://docs.example.com"
  sdkAvailability:
    - JavaScript
    - Python
  clarityScore: 4 # Score from 1 (poor) to 5 (excellent)

security:
  authentication: "API Key" # Options: OAuth 2.0, API Key, JWT, etc.
  dataEncryption: true
  compliance: []

performance:
  slaUptime: "99.9%"
  statusPageUrl: "https://status.example.com"
  avgResponseTimeMs: 250
  testEndpoint: "https://api.example.com/v1/health" # A simple GET endpoint for latency tests

cost:
  pricingModel: Freemium # Options: Pay-as-you-go, Subscription, etc.
  pricingUrl: "https://example.com/pricing"
  notes: "Rate limits apply on the free tier."

vendor:
  name: "Example Inc."
  lastUpdate: "${new Date().toISOString().split('T')[0]}" # YYYY-MM-DD
  # Interested in becoming a featured partner? 
  # Contact us at: https://www.seosiri.com/p/contact-us.html
  partnerLink: "" # This will be your partner-specific URL
`;

export function registerCreateReviewFileCommand() {
    return vscode.commands.registerCommand('api-validator.newReviewFile', async (apiNameToPreFill?: string) => {
        if (!vscode.workspace.workspaceFolders) {
            vscode.window.showErrorMessage('Please open a folder or workspace to create an API review file.');
            return;
        }

        let finalContent = newApiReviewFileContent;
        if (apiNameToPreFill) {
            finalContent = finalContent
                .replace('apiName: "Example API"', `apiName: "${apiNameToPreFill}"`)
                .replace('documentationUrl: "https://docs.example.com"', `documentationUrl: "${apiNameToPreFill}"`)
                // Also pre-fill the test endpoint if possible
                .replace('testEndpoint: "https://api.example.com/v1/health"', `testEndpoint: "${apiNameToPreFill}/health"`);
        }

        const workspacePath = vscode.workspace.workspaceFolders[0].uri.fsPath;
        const safeFileName = apiNameToPreFill?.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase() || 'new-api';
        const newFilePath = vscode.Uri.file(path.join(workspacePath, `${safeFileName}.api-review.yml`));

        try {
            await vscode.workspace.fs.writeFile(newFilePath, Buffer.from(finalContent, 'utf8'));
            const doc = await vscode.workspace.openTextDocument(newFilePath);
            await vscode.window.showTextDocument(doc);
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to create file: ${error instanceof Error ? error.message : String(error)}`);
        }
    });
}