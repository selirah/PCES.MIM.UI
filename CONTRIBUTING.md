# Contributing

## Table of Contents

- [Contributing](#contributing)
  - [Table of Contents](#table-of-contents)
  - [Commits](#commits)
    - [General](#general)
    - [Branch Naming](#branch-naming)
    - [Commit Format](#commit-format)
  - [Pull Requests](#pull-requests)
    - [Review Process](#review-process)
    - [Automatic Review Process](#automatic-review-process)
    - [Manual Review Process](#manual-review-process)
  - [Debugging](#debugging)

## Commits

### General

**Keep Commits Small And Focused** - During local development, this makes it easy to rollback changes and more easily experiment/test work with the frequent checkpoints. And during pull request review, it makes it easier for reviewers to follow the changes.

**Refactoring And Logic Changes Should Be Separate Commits** - it can be hard to follow where new logic was introduced when it is combined with a refactoring change.

**Keep Commit History Clean By Using Git Rebase On Feature Branches** – This avoids having "merge with master" commits adding noise to the commits on the feature branch. Note if the merge is complex/requires many changes, an exception can be made.

**Add Typo/PR Suggestion Changes To Existing Commits** - Avoid creating small "fix pr comments" or "typo" commits that add noise to the feature branch’s commits.

**When Pushing, Use `–force-with-lease` Over `–force`** – This avoids potentially overwriting upstream history/changes.

**Do Not Include the User Story/Task In The Commit Message** - This will be linked automatically in the pull request, and the merged pull request commit will automatically append this information.

### Branch Naming

Branches should be named following the [Git Flow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) model. The name format should match this format:

```
<type>/<branch-name>
```

**Type** is any of the following:

* feature
* fix
* release

Using a slash to separate the type will organize the branches in ADO (and git GUIs) into folders, making it easier to view branches.

Some examples:
* fix/update-failing-foobar-tests
* feature/add-databases-user-table

### Commit Format

Commits should follow the semantic commit message format (taken from [here](https://medium.com/swlh/writing-better-commit-messages-9b0b6ff60c67)). These make it clear when viewing the git history what was changed and when:

```
<type>(<scope>): <subject>

<body>
```

**Type** is any of the following:
* **feat** - The new feature being added
* **fix** - A bug fix
* **style** - Style changes
* **refactor** -  Refactoring a specific section of the codebase
* **test** - Testing changes
* **docs** - Documentation changes
* **chore** - Regular code maintenance

**Scope** is optional and refers to a feature to make it clear what is being worked on. Example:
* feat(data-elements)
* fix(templates)

**Subject** is a short 50-character message using present tense. When more information is needed, use the optional **Body** below the subject.

## Pull Requests

<h3 id="pull-requests-general">General</h3>

**1 Reviewer Per PR** - This is the default in Azure DevOps and provides a good balance between too many reviewers and not enough eyes on changes. 

**All Comments Must Be Resolved** - This ensures the PR author has seen and addressed (in some way or another) all comments.

**Squash PRs Into A Single Merge Commit** – When merging, the changes will be wrapped up into a single merge commit. This allows for a cleaner master branch as only PR merges should be on it.

**Include Screenshots/Gifs In The Description Where Appropriate** - When making UI/frontend changes, include a screenshot of gif to show what the change does. If it changes existing UI styling, a before/after comparison might make more sense.

### Review Process

### Automatic Review Process

When a Pull Request is submitted, a number of automatic checks are performed on the code, including:

* Unit Tests
* Linters - defined in each project's README
* Code Coverage (where applicable) -  defined in each project's README
* All comments resolved

These must all be satisfied before the Pull Request can be successfully completed and the associated work merged.

### Manual Review Process

When reviewing pull requests, be sure to consider all of the following:

1. The PR **description** and **title** should clarify the _what_ and _why_ of these changes. When the changes are merged, these will be the squashed commit message and body, making the intent clear to future contributors reviewing the change history.
2. The associated user story should be reviewed to ensure that the changes either encompass all of the necessary work, or make it clear that there will be additional PRs to cover those missing gaps.
3. When reviewing the code:
    * Is the code easy to follow and readable?
    * Does the code follow project conventions for naming and formatting?
    * Does the code introduce any meaningful impact to performance? If so, has this been considered? This is especially important for work against critical paths, or frequently called code where performance is of higher concern.
    * Is there documentation/is it needed? Consider adding for setup/noteworthy changes.
    * Are there tests where appropriate?
    * Are there any missing edge cases?
4. When reviewing the tests:
    * Does it test all of the relevant scenarios/cases?
    * Are the tests easy to follow?
    * Are the tests fast, focused, and repeatable?

Your job as a Pull Request reviewer is to add comments and suggestions that need to be addressed by the creator of the Pull Request. Every comment needs to be resolved by any of the following ways which has to be agreed upon between the creator and the reviewers:
* A change in the code that addresses the comment
* A backlog ticket to circle back to the comment in a later stage
* An agreement between the reviewer and the creator to dismiss the comment

### Debugging
Since the template is based off NextJS, it affords you the opportunity to be able to run the application in debug mode. Please note that the following details assume you are using VSCode for development.

Debugging requires you to have the `cross-env` package installed globally on your system. Use the following command:

`npm install -g cross-env`

NB: YOU MUST HAVE `launch.json` config in your `.vscode` folder for this to work. An example is included in this project.

To start debugging within your application, run the following command (`yarn` or `npm`) - depending on your choice:
**yarn** - `yarn dev-debug`
**npm** - `npm run dev-debug`

**Server Side Debugging** - Once you have started the application in debug mode using any of the above commands, you can launch server-side debugging in VScode by doing the following:

1. Click on the debug icon in VSCode ( The play icon with the little bug on it :) ). This opens the debug context panel.

2. At the top of the context panel you will see `RUN AND DEBUG` with a dropdown to select you debugging profile. Click that dropdown and select the profile named `Broker 2.0: debug server-side`

3. Once selected, click on the little green play icon to the left of the selected profile. This launches your application in debug mode inside VSCode.

Now you can add breakpoints in your code to capture and debug issues within the server-side aspect of your application


**Client Side Debugging** - Once you have started the application in debug mode using any of the above commands, you can launch client-side debugging in VScode by doing the following:
 
1. Click on the debug icon in VSCode ( The play icon with the little bug on it :) ). This opens the debug context panel.

2. At the top of the context panel you will see `RUN AND DEBUG` with a dropdown to select you debugging profile. Click that dropdown and select the profile named `Broker 2.0: debug client-side`

3. Once selected, click on the little green play icon to the left of the selected profile. This launches an instance of your Chrome browser in debug mode.

**A note about debugging** - The debugging profiles provided in this template repo are meant to serve as a guide for anyone who will like to use VSCode debugging. If you wish to make any changes to the `launch.json` you are free to do so. However, *DO NOT* commit those changes unless you have confirmed with at least one team member that those changes will benefit all by being in the project.
The reason for this is to keep the template as clean and lightweight as possible