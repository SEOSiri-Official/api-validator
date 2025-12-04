# API Validator - Your Intelligent API Governance Assistant

![API Validator Icon](media/icon.png)

[![version](https://img.shields.io/badge/version-0.0.1-blue.svg)](https://marketplace.visualstudio.com/items?itemName=seosiri.api-validator)
[![license](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Publisher](https://img.shields.io/badge/publisher-seosiri-darkblue.svg)](https://www.seosiri.com)

**API Validator is a VS Code extension that brings security, governance, and quality evaluation for third-party APIs directly into your editor. Stop guessing about API quality and start making data-driven decisions before you write a single line of integration code.**

This extension is essential for any developer or team that consumes third-party APIs and wants to ensure they are secure, reliable, and cost-effective.

---

### Why API Validator? What Problem Does It Solve?

In modern development, we rely on dozens of third-party APIs. But choosing the right ones is a slow, inconsistent, and risky process of manually researching documentation, looking for security best practices, and guessing at performance. A bad API choice can lead to security breaches, poor performance, and unexpected costs.

API Validator solves this by providing a structured, in-editor framework to evaluate and document every API your project depends on, making API governance a seamless part of your development workflow.

---

### ✨ Key Features

*   🔎 **Project-Wide API Discovery:** Automatically scan your entire codebase to find potential third-party API endpoints and kickstart the evaluation process.
*   📝 **Structured Evaluation:** Use the `.api-review.yml` format to document APIs against dozens of critical factors, from security and performance to cost and vendor reliability.
*   ✅ **Feature Coverage Matrix:** Define your project's specific requirements and map them directly against an API's capabilities to calculate a "fit score" and ensure it meets your needs.
*   🛡️ **Threat Intelligence Linter:** Get real-time warnings if you use an API endpoint associated with known malware, phishing, or other security threats.
*   🤖 **Schema-Driven IntelliSense:** Get full autocompletion, validation, and rich hover-documentation when creating your review files, which guides you through best practices.
*   📄 **One-Click Scaffolding:** Generate new, templated review files with a single command to get started in seconds.
*   📊 **Side-by-Side API Comparison (Planned):** The structured nature of our review files is designed to support a powerful comparison tool. Select multiple APIs to see a detailed breakdown and choose the winning solution. *(This command is on our immediate roadmap!)*

![API Validator in Action](https://i.imgur.com/g9skF4E.gif) 

---

### Global User Instructions: Getting Started

Follow these simple steps to begin evaluating your APIs:

**1. Installation**
   *   Open Visual Studio Code.
   *   Go to the Extensions view (`Ctrl+Shift+X` or `Cmd+Shift+X`).
   *   Search for **"API Validator"**.
   *   Click **Install**.

**2. Open Your Project**
   *   Open the folder or workspace containing your source code.

**3. Run a Command**
   *   Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`).
   *   **To find existing APIs:** Type and select **`API Validator: Scan Project for APIs`**.
   *   **To create a new review manually:** Type and select **`API Validator: New API Review File`**.

**4. Evaluate Your API**
   *   Fill out the fields in the `.api-review.yml` file. The extension will provide instant feedback, autocompletion, and security warnings as you type.

---

### An Open-Source Project by seosiri

API Validator is an open-source tool proudly developed and maintained by **seosiri**, an organization dedicated to building innovative solutions that enhance developer productivity and business intelligence.

We believe in the power of community and open source to create high-quality, secure, and accessible tools for everyone.

*   **Explore our work:** Visit our website at [seosiri.com](https://www.seosiri.com).
*   **Contribute to the project:** Find our repository on [GitHub](https://github.com/SEOSiri-Official/api-validator). *(Remember to create a public GitHub repo and add the link here)*.
*   **Discover more tools:** Check out our other innovative products, including **[PersonaFlow IA](https://www.seosiri.com/p/prod-personaflow-ia.html)**.

---

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.