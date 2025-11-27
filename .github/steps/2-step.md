## Step 2: Implement AI Joke Rating Logic

Alright! Now that you have set up the action metadata and installed the OpenAI SDK, it's time to implement the core logic of your AI-powered GitHub Action.

Let's first understand how we will interact with GitHub Models using the OpenAI SDK.

### 📖 Theory: Quick tour of GitHub Models

[GitHub Models](https://github.com/features/models) brings AI into your developer workflow with a single API key that unlocks multiple leading models.

Usage of GitHub Models is subject to different tiers of [rate limits](https://docs.github.com/en/github-models/use-github-models/prototyping-with-ai-models#rate-limits). Additionally, different models may have varying rate limits. Be especially mindful of that if you don't have a paid Copilot plan.

All models are also accessible programmatically, which is exactly what we need for our action! You can use regular HTTP requests or leverage existing SDKs to interact with GitHub Models - as you may have already guessed, we'll be using the OpenAI SDK for this exercise.

> [!NOTE]
> Explore all available models on the [GitHub Marketplace](https://github.com/marketplace/models).
>
> Learn more about GitHub Models [rate limits](https://docs.github.com/en/github-models/use-github-models/prototyping-with-ai-models#rate-limits).

### ⌨️ Activity: Implement the Action

Let's create the source files and implement the logic for your action.

1. Create `src/` directory to hold your JavaScript files:

1. Create `src/rateJoke.js` file to hold the logic for communicating with GitHub Models and rating jokes:

   ```js
   const OpenAI = require("openai");

   async function rateJoke(joke, token) {
     const endpoint = "https://models.github.ai/inference";

     // Initialize OpenAI client with GitHub Models endpoint
     const client = new OpenAI({ baseURL: endpoint, apiKey: token });

     const response = await client.chat.completions.create({
       messages: [
         {
           role: "system",
           content:
             "You are a helpful assistant that evaluates jokes. Assess whether the input is actually a joke, and if so, rate its humor quality, creativity, and delivery. Respond briefly and include a numeric overall rating from 0–10.",
         },
         {
           role: "user",
           content: `Please rate this joke: "${joke}"`,
         },
       ],
       model: "openai/gpt-4.1-mini",
     });

     // Return the plain text response
     return response.choices[0].message.content;
   }

   module.exports = { rateJoke };
   ```

   The `rateJoke` function initializes an OpenAI client configured for GitHub Models endpoint and sends the joke to an AI model for evaluation.

   The response from the model is returned as plain text.

1. Create `src/main.js` that will be the main logic for the action:

   ```js
   const { rateJoke } = require("./rateJoke");
   const core = require("@actions/core");

   async function run() {
     // Get inputs
     const joke = core.getInput("joke", { required: true });
     const token = core.getInput("token", { required: true });

     // Rate the joke using GitHub Models
     const rating = await rateJoke(joke, token);

     // Set the output
     core.setOutput("result", rating);
   }

   module.exports = { run };
   ```

   The `run` function retrieves the action inputs, calls the `rateJoke` function to get the AI-generated rating, and sets the output for the action.

1. Create `src/index.js` that will be the main entrypoint for the action:

   ```js
   const { run } = require("./main");

   run();
   ```

### ⌨️ Activity: Test Action Locally

To test the action locally, we need to configure a `.env` file with properly formatted environment variables to simulate GitHub Actions inputs.

1. Create a copy of `.env.example` file and name it `.env`

   ```sh
   cp .env.example .env
   ```

1. Open `.env` and replace the placeholder value with your GitHub token.

   ```sh
   echo $GITHUB_TOKEN
   ```

   > ✨ **Bonus:** Try changing the joke input to test different punchlines! But be mindful of rate limits!

1. Open the `Run and Debug` section of VSCode and run the action.

   > ✨ **Bonus:** If you are familiar with the debugging features of VSCode, set breakpoints in your code to step through the execution and inspect variables.

   <img width="400" alt="image showing run and debug section of vscode and a button to run action" src="https://github.com/user-attachments/assets/8be1b62f-8c11-4af0-9e0a-255b9d33f83e" />

   > 🪧 **Note:** The run configuration is stored in `.vscode/launch.json` and it uses `@github/local-action` together with your `.env` file

1. If everything works correctly, you should see the AI-generated joke rating in the debug console!

   <details>
   <summary>📸 Show screenshot</summary><br/>

   <img width="800" alt="image showing github/local-action debug logs in vscode console" src="https://github.com/user-attachments/assets/3eec5e80-21a7-4f55-b7ff-25f6a710874f" />

   </details>

### ⌨️ Activity: Build and Package Action

Now that you've verified your action works correctly when tested locally - let's build and package the action for distribution.

1. Let's build your action by running:

   ```sh
   npm run build
   ```

1. Commit and push all the changes to the `main` branch.
1. With the changes pushed to GitHub, Mona will check your work and share the next steps.
