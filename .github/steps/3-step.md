## Step 3: Create Interactive Workflow

Your AI-powered action is ready, but you need a way for users to interact with it. You'll create a workflow that listens for jokes in issue comments and automatically responds with AI-generated ratings and feedback.

### ⌨️ Activity: Author Workflow

Let's see your Dad Jokes action in action by creating a GitHub Actions workflow that uses it!

1. Create a new GitHub Actions workflow file with the following name

   ```txt
   .github/workflows/rate-joke.yml
   ```

1. Add the following contents to the workflow file:

   ```yaml
   name: Rate Joke
   run-name: {% raw %}Rate Joke by ${{ github.event.comment.user.login }}{% endraw %}

   on:
    issue_comment:
      types: [created]

   permissions:
    issues: write
    contents: read
    models: read
  
   jobs:
     joke:
       name: Rate Joke
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v6
         - name: Rate Joke
           id: rate-joke
           uses: ./
           with:
            joke: {% raw %}${{ github.event.comment.body }}{% endraw %}
            token: {% raw %}${{ secrets.GITHUB_TOKEN }}{% endraw %}
         - name: Create comment
           uses: peter-evans/create-or-update-comment@v5
           with:
            issue-number: {% raw %}${{ github.event.issue.number }}{% endraw %}
            body: |
              ## 🤖 AI Joke Rating Results
              
              **Your joke:**
              > {% raw %}${{ github.event.comment.body }}{% endraw %}
              
              **AI Analysis:**
              {% raw %}${{ steps.rate-joke.outputs.result }}{% endraw %}
              
              ---
              *Powered by GitHub Models* ✨
   ```

   This workflow triggers for all new issue comments in the repository.


1. Commit and push the workflow file to the `main` branch:

   ```sh
   git add .github/workflows/rate-joke.yml
   git commit -m "Add workflow to test joke action"
   git push
   ```

### ⌨️ Activity: Test Workflow with Real Comments

1. Create a test issue in your repository
1. Post a comment containing a joke to trigger the workflow.
  
    Example:

    ```md
    Why did the scarecrow win an award? Because he was outstanding in his field!
    ```

1. Post a comment without a joke to test non-joke handling.

    Example:

    ```md
    I love learning about GitHub Actions!
    ```

1. Verify the action responds appropriately in both scenarios
