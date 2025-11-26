## Step 5: Trigger & Validate

Awesome! :rocket: You've created the Rate Jokes GitHub Action, leveraged structured outputs and authored a workflow to use it.

The only thing left to do is test it out!

### ⌨️ Activity: Try out your action

1. Create a comment in this issue (or create a new issue).

1. Comment with jokes you'd like the AI to rate. Here is an example joke you can use:

    ```md
    How many tickles does it take to tickle an octopus? Ten-tickles!
    ```

    You can find example jokes on the [icanhazdadjoke](https://icanhazdadjoke.com/) website.

1. Comment with regular comments and monitor if they are correctly classified as non-jokes.

1. Mona will post the exercise review once your new Rate Joke workflow completes **successfully**! 

   <details>
   <summary>Having trouble? 🤷</summary><br/>

   If the workflow doesn't trigger or fails:
   - Check the Actions tab for error messages
   - Verify that your `dist/index.js` file exists and was committed
   - If you did any updates to your source code, ensure you re-bundled with `npm run build` and pushed the changes
   - Ensure your workflow file is correctly formatted
   </details>
