# Continuous Integration for Python

## Linting
There are several linters for Python. Popular choices are:
- flake8
- pylint
- black

Python linters will check for syntax error as well as code smells and stylistic choices. The Python language has a guiding style guide called PEP8 for how things from variable naming to indentation should be conducted in Python modules.

## Testing
Testing in Python is often done through pytest. As is the case with testing frameworks in other languages, CI/CD pipelines can call pytest to run a suite of tests and output a standardised test result format which can be interpreted natively by most CI/CD tools for metrics like test success and test coverage.

## Building
Python is an interpreted language, and therefore does not need to be compiled in the conventional sense. However, one can think of "building" Python programs as setting up dependencies such as libraries and setting up virtual environments or containers. In doing so, we are enabling the environment for the code to run on any machine, not just the developers.

## CI Setups
There is no shortage of CI tools to choose from. Alternatives besides Jenkins and GitHub Actions include:
- Atlassian Bamboo
- JetBrains TeamCity
- CircleCI
- Microsoft Azure Pipelines
- AWS CodePipeline
- GitLab pipelines

## Self Hosted or Cloud Based?
**It depends** - but typically cloud based CI/CD providers will abstract much of the complexity away for DevOps teams as they are providing the service, whereas self hosted will also involve the provisioning and maintenance of the underlying resources. It therefore becomes a matter of whether there needs to be more granular control over factors like networking, security and cost - if so then self hosted is a good option but otherwise cloud based/managed CI/CD is typically the easier setup.