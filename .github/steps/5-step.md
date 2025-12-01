## Step 5: Trigger & Validate

Awesome! :rocket: You've created the Rate Jokes GitHub Action, leveraged structured outputs and authored a workflow to use it.

The only thing left to do is test it out!

### ⌨️ Activity: Try out your action

If everything works correctly, your workflow should update the joke comments and leave the generic comments unchanged.

Let's try that out!

1. Right here in this issue, comment with a joke you would like the AI to rate. Here are some examples

    ```md
    How many tickles does it take to tickle an octopus? Ten-tickles!
    ```

    ```md
    Want to hear my pizza joke? Never mind, it's too cheesy.
    ```

    ```md
    Why don't sharks eat clowns? Because they taste funny.
    ```

    > 🪧 **Note:** You can find more jokes on the [icanhazdadjoke](https://icanhazdadjoke.com/) website.

1. Let's try commenting with a non-joke comment and monitor the Actions tab if they are correctly classified. Here are some examples.

    ```md
    I love learning about GitHub Actions!
    ```

    ```md
    What's the weather like today?
    ```

    ```md
    Can someone help me with my code?
    ```

    For all of the non-joke comments, the workflow should leave them unchanged.

    In the workflow logs you should see the `Update comment` step being skipped.

1. Mona will post the exercise review once your new Rate Joke workflow completes **successfully**!

   <details>
   <summary>Having trouble? 🤷</summary><br/>

   If the workflow doesn't trigger or fails:
   - Check the Actions tab for error messages
   - Verify that your `dist/index.js` file exists and was committed
   - If you did any updates to your source code, ensure you re-bundled with `npm run build` and pushed the changes
   - Ensure your workflow file is correctly formatted

    If you are not receiving reviews from Mona:
    - Ensure your workflow is named `Rate Joke` and completes successfully
   </details>

> [!NOTE]
> Even after the exercise is finished, you can continue commenting with jokes or non-jokes!