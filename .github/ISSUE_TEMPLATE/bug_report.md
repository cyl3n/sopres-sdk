name: Bug report
description: Create a report to help us improve
labels: ["bug"]
body:

- type: markdown
  attributes:
  value: |
  Thanks for taking the time to fill out this bug report!
- type: textarea
  id: what-happened
  attributes:
  label: What happened?
  description: Also tell us, what did you expect to happen?
  placeholder: Tell us what you see!
  validations:
  required: true
- type: textarea
  id: reproduction-steps
  attributes:
  label: How to reproduce
  description: Steps to reproduce the behavior.
  validations:
  required: true
- type: dropdown
  id: package
  attributes:
  label: Affected Package
  options: - "@sopres/sdk" - "@sopres/core" - "@sopres/utils" - "Boilerplate / Template" - "Unknown"
- type: input
  id: version
  attributes:
  label: SDK Version
  description: Which version of the SDK are you using?
  placeholder: e.g. 1.0.0
- type: textarea
  id: environment
  attributes:
  label: Environment
  description: Browser version, Node.js version, OS, etc.
