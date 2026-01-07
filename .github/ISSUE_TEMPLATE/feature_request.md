name: Feature request
description: Suggest an idea for this project
labels: ["enhancement"]
body:

- type: markdown
  attributes:
  value: |
  We are always open to new ideas and improvements!
- type: textarea
  id: solution
  attributes:
  label: Describe the feature you'd like
  description: A clear and concise description of what you want to happen.
  validations:
  required: true
- type: textarea
  id: context
  attributes:
  label: Use Case / Context
  description: Why is this feature important to you?
  validations:
  required: true
