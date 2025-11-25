## Step 3: Create Interactive Workflow

Your AI-powered action is ready, but you need a way for users to interact with it. You'll create a workflow that listens for jokes in issue comments and automatically responds with AI-generated ratings and feedback.

### 📖 Theory: Issue Comment Triggers and GitHub Actions Context

**Issue Comment Triggers** allow actions to respond to user interactions:

- `issue_comment` event triggers on comment creation, editing, or deletion
- Event payload contains comment text, issue information, and user details
- Conditional execution can filter for specific comment patterns or users

**GitHub Actions Context** provides access to:

- `github.event.comment.body` for comment text
- `github.event.issue.number` for issue identification  
- `github.token` for authenticated API access
- Repository and user information for personalized responses

For more details, see:

- [GitHub Actions - Issue comment events](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#issue_comment)
- [GitHub Actions contexts](https://docs.github.com/en/actions/learn-github-actions/contexts)

### ⌨️ Activity: Create Workflow for Issue Comments

1. Create `.github/workflows/joke-rater.yml` workflow file
1. Configure `issue_comment` trigger with appropriate filters
1. Add job that calls your AI-powered action with comment text
1. Set up proper permissions for issue and comment access

### ⌨️ Activity: Test Workflow with Real Comments

1. Create a test issue in your repository
1. Post a comment containing a joke to trigger the workflow
1. Post a comment without a joke to test non-joke handling
1. Verify the action responds appropriately in both scenarios

<details>
<summary>Having trouble? 🤷</summary><br/>

- Make sure your workflow has `issues: write` and `pull-requests: write` permissions to post comments
- The `issue_comment` event includes comments on both issues and pull requests
- Test your workflow with different types of comments to ensure it handles edge cases
- Check the Actions tab to see workflow runs and debug any issues

</details>
