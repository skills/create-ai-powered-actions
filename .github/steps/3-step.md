## Step 3: Create Workflow to test your Action

Let's pause for a moment with the code changes and set up a workflow to test your action in a real GitHub Actions environment.

Let's create a workflow that will trigger your action whenever a new comment is added to an issue. Your action will analyze the joke in the comment and we will use that result to update the comment with the AI-generated rating.

### 📖 Theory: Granting access to GitHub Models

The built in `{% raw %}${{ secrets.GITHUB_TOKEN }}{% endraw %}` token used in GitHub Actions workflows does not have access to GitHub's AI models by default.

To enable your workflow to use these models, you need to explicitly grant the `models: read` permission in your workflow file.

### ⌨️ Activity: Author Workflow

Let's see your Dad Jokes action in action by creating a GitHub Actions workflow that uses it!

1. Create a new GitHub Actions workflow file with the following name

   ```txt
   .github/workflows/rate-joke.yml
   ```

1. Let's define the workflow to trigger on new issue comments and run your action and add the required permissions:

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
   ```

1. Let's add a job that uses your action to rate the joke provided in the issue comment `body`:

   ```yaml
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

   ```

1. Now let's use the `peter-evans/update-comment` action to update the original comment in-place and use the result of your action.

   ```yaml
    - name: Update comment
      uses: peter-evans/create-or-update-comment@v5
      with:
      comment-id: {% raw %}${{ github.event.comment.id }}{% endraw %}
      reactions: laugh
      edit-mode: replace
      body: |
         ## 🤖 AI Joke Rating Results
         
         **Your joke:**
         > {% raw %}${{ github.event.comment.body }}{% endraw %}
         
         **AI Analysis:**
         {% raw %}${{ steps.rate-joke.outputs.result }}{% endraw %}
   ```

1. Commit and push the workflow file to the `main` branch:

   ```sh
   git add .github/workflows/rate-joke.yml
   git commit -m "Add workflow to test rate joke action"
   git push
   ```

### ⌨️ Activity: Test Workflow with Real Comments

Let's try testing the workflow by commenting right here, on the issue!

1. Post a comment containing a joke to trigger the workflow.
  
    Example:

    ```md
    Why did the scarecrow win an award? Because he was outstanding in his field!
    ```

   After a moment, you should see the comment you added get updated.

1. (optional) Post a comment without a joke to test how your action will handle non-joke comments.

    Example:

    ```md
    I love learning about GitHub Actions!
    ```

1. With the comment added, Mona should share the next steps!

<details>
<summary>Having trouble? 🤷</summary><br/>

If the workflow doesn't trigger or complete successfully, please check the following:

- See for any errors in the Actions tab of your repository.
- Ensure that you have ran `npm run build` on the latest code changes.
- Make sure the workflow file is correctly formatted
- If you are encountering rate limiting issues, please wait a few minutes and try again.
  - If you have hit daily limits, you may have to come back to this exercise tomorrow.

</details>
