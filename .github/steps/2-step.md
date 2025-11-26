## Step 2: Implement AI Joke Rating Logic

Now that your action can connect to GitHub Models, it's time to implement the core logic that will analyze jokes and provide ratings. You'll create the main action code that processes comments and generates AI-powered feedback.

### 📖 Theory: AI Model Integration and Error Handling

**Model Selection** is crucial for optimal performance and cost:

- **Low-tier models** (like GPT-4o-mini) are suitable for simple text analysis tasks
- **Rate limit management** requires handling API limits gracefully with retry logic
- **Prompt engineering** affects output quality - clear, specific prompts yield better results

**Error Handling** for AI services should account for:

- Network timeouts and connection issues
- Rate limit exceeded responses (HTTP 429)
- Invalid or malformed responses from the AI model
- Token limit exceeded errors

For more information, see:

- [GitHub Models API - Chat completions](https://docs.github.com/en/rest/models/chat-completions)
- [OpenAI SDK documentation](https://github.com/openai/openai-node)

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
            content: "You are a helpful assistant that evaluates jokes. Assess whether the input is actually a joke, and if so, rate its humor quality, creativity, and delivery."
          },
          {
            role: "user",
            content: `Please rate this joke: "${joke}"`
          }
        ],
        model: "openai/gpt-4.1",
      });

      // Return the plain text response
      return response.choices[0].message.content;

    }

    module.exports = { rateJoke };
    ```

   The `rateJoke` function initializes an OpenAI client configured for GitHub Models endpoint and sends the joke to an AI model for evaluation.

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
      core.setOutput("result", JSON.stringify(rating));
    }

    module.exports = { run };

    ```

1. Create `src/index.js` that will be the main entrypoint for the action:

    ```js
    const { run } = require('./main');

    run();
    ```

### ⌨️ Activity: Test Action Locally

To test the action locally, we need to configure a `.env` file with properly formatted environment variables to simulate GitHub Actions inputs.

1. Create a copy of `.env.example` file and name it `.env`

    ```sh
    cp .env.example .env
    ```

1. Update the values in `.env` with your GitHub token and a test joke

    ```sh
    echo $GITHUB_TOKEN
    ```

1. In the `Run and Debug` section of VSCode, run the action
1. If everything works correctly, you should see the AI-generated joke rating in the debug console!

### ⌨️ Activity: Build and Package Action

Let's build and package the action for distribution.

1. Let's build your action by running:

   ```sh
   npm run build
   ```

1. Commit and push all the changes to the `main` branch.

