+# Repository AGENT Instructions
+
+This AGENTS.md file guides future contributors and Codex agents on how to extend
+this repository. The main goal is to generate a simple HTML website from the
+markdown document `New folder/Generic Data Mapping System.md`.
+
+## Website Generation
+- When instructed to **build or update the website**, convert the markdown
+  content of `New folder/Generic Data Mapping System.md` into an HTML page
+  placed at `generic_data_mapping_system.html` in the repository root.
+- Keep the HTML output minimal: header information, the converted body, and a
+  footer. Do not include heavy frameworks or external dependencies.
+- Update `index.html` so that it links to the generated HTML page. The link text
+  should be "Generic Data Mapping System".
+
+## Commit Guidelines
+- Summaries in commit messages should briefly state what changed, for example:
+  `Add HTML page for Generic Data Mapping System`
+- If multiple files are changed, mention the key files in the commit message.
+- Ensure the working tree is clean before concluding your work.
+
+These instructions serve as a lightweight guideline for creating a website page
+based on the provided markdown document.
