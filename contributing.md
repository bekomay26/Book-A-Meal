# Contributing

#### Contributors should please follow these guidelines:
* Study the Git naming conventions and best practices below thoroughly:

### Branch Naming

Branches created should be named using the following format:

```
{story type}-{2 word summary}-{pivotal tracker id}
```

`story-type` - Indicates the context of the branch and should be one of:

- ft == Feature
- bg == Bug
- ch == Chore

* Check that your code will pass `eslint` code standards, `hound` will review your code and ensure you act accordingly.
* Check that your code will pass tests: `npm test` will run tests for you.
* Keep pull requests concise, and document new functionality in PRs.
* Avoid breaking changes unless they are very essential. We encourage people to care a lot about backwards compatibility.

### Pull Requests
Create a PR to propose and collaborate on changes to the app. 
- It Should reference an issue if one exists, or provide detailed information on the goal of the PR
- Pass the tests
- And it hould use the template below when writing the PR:

```md
#### What does this PR do?
#### Description of Task to be completed?
#### How should this be manually tested?
#### Any background context you want to provide?
#### What are the relevant pivotal tracker stories?
#### Screenshots (if appropriate)
```

