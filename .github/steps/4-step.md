## Step 4: Add Structured Outputs

While your action provides good feedback, you want to make the data more structured and useful for potential integrations. You'll enhance the action to return JSON data with specific fields for ratings, humor types, and detailed feedback.

### ⌨️ Activity: Install Zod 


1. Run the following command to install Zod:

   ```sh
   npm install zod
   ```

1. Verify the installation by checking the `package.json` file for the `zod` dependency.

### ⌨️ Activity: Implement structured outputs

1. Replace the contents of your `src/rateJoke.js` file. 

    ```js
    const OpenAI = require("openai");
    const { zodResponseFormat } = require("openai/helpers/zod");
    const { z } = require("zod");

    // Define the structured output format using Zod schema
    const JokeRatingSchema = z.object({
      is_joke: z.boolean().describe("Whether the input is actually a joke or attempt at humor"),
      score: z.number().min(1).max(10).nullable().describe("Rating from 1-10, where 10 is the funniest."),
      humor_type: z.string().nullable().describe("The type of humor (e.g., pun, wordplay, dad joke, dark, etc)"),
      feedback: z.string().nullable().describe("Short feedback on the joke's strengths and weaknesses."),
    });

    async function rateJoke(joke, token) {
      const endpoint = "https://models.github.ai/inference";

      // Initialize OpenAI client with GitHub Models endpoint
      const client = new OpenAI({ baseURL: endpoint, apiKey: token });

      // Create chat completion with Zod response format
      const completion = await client.chat.completions.parse({
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that evaluates jokes. Assess whether the input is actually a joke, and if so, rate its humor quality, creativity, and delivery.",
          },
          {
            role: "user",
            content: `Please rate this joke: "${joke}"`,
          },
        ],
        model: "openai/gpt-4.1-mini",

        // Use Zod schema for structured response
        response_format: zodResponseFormat(JokeRatingSchema, "joke_rating"),
      });

      // Return the parsed response (automatically validated by Zod)
      return completion.choices[0]?.message?.parsed;
    }

    module.exports = { rateJoke };

    ```

    This looks very similar to your previous implementation, but now includes the Zod schema definition and uses it for structured outputs from the AI model.

### ⌨️ Activity: Test locally and update build

1. In the `Run and Debug` section of VSCode, run the action
1. You should see the `result` output containing structured JSON data matching the defined schema.
1. Since we did code changes, we need to update your action distribution by running:

   ```sh
   npm run build
   ```

   This should update your `dist/index.js` file with the latest code.


### ⌨️ Activity: Update Workflow with Conditional Logic

1. Open your workflow file at `.github/workflows/rate-joke.yml`.
1. Update the `Update Comment` step to only trigger if the input is a joke:

   ```yaml
    - name: Update comment
      if: fromJSON(steps.rate-joke.outputs.result).is_joke == true
      uses: peter-evans/create-or-update-comment@v5
   ```

    <!-- > TODO: Add note about individual outputs -->

1. Update the comment body to use the structured fields:

   ```yaml
   body: |
     ## 🤖 AI Joke Rating Results
     
     **Your joke:**
     > {% raw %}${{ github.event.comment.body }}{% endraw %}
     
     **AI Analysis:**
     - **Score:** {% raw %}${{ fromJSON(steps.rate-joke.outputs.result).score }}{% endraw %}/10
     - **Humor Type:** {% raw %}${{ fromJSON(steps.rate-joke.outputs.result).humor_type }}{% endraw %}
     - **Feedback:** {% raw %}${{ fromJSON(steps.rate-joke.outputs.result).feedback }}{% endraw %}
     
   ```

1. Commit and push all your changes to the `main` branch.