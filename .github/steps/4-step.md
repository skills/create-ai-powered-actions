## Step 4: Add Structured Outputs

Good job — ready to take it a step further?

Right now, the workflow eagerly updates every new issue comment, even when the comment isn’t a joke. What we really want is to only react to actual jokes. The tricky part is that our action currently returns plain text, which makes it hard to write clean conditional logic in the workflow.

Let’s change that by using structured outputs!

### 📖 Theory: Taking control with Structured Outputs

[Structured outputs](https://platform.openai.com/docs/guides/structured-outputs) let you ask models for well-formed data (JSON) instead of free text, making downstream automation and integrations reliable.

Structured Outputs that ensures the model will always generate responses that adhere to your supplied JSON Schema.

[Zod](https://zod.dev/) is a popular schema declaration and validation library that can be used instead of writing raw [JSON Schemas](https://json-schema.org/).

Once the schema is defined, you can include it in your requests to GitHub Models, and the responses will be automatically validated and parsed according to that schema, instead of free-form text.



### ⌨️ Activity: Install Zod

Let's start off by installing [Zod](https://zod.dev/) in your action project.

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

   Additionally, this function now returns a JSON object matching the defined schema instead of plain text.

### ⌨️ Activity: Test locally and update build

1. In the `Run and Debug` section of VSCode, run the action.
1. You should see the `result` output containing structured JSON data matching the defined schema.
1. Since we introduced code changes, we need to update the action distribution by running the build command:

   ```sh
   npm run build
   ```

   This should update your `dist/index.js` file with the latest code changes.

### ⌨️ Activity: Update Workflow with Conditional Logic

Okay! Now that the action returns structured data, we can update the workflow to only update comments when the input is actually a joke.

1. Open your workflow file at `.github/workflows/rate-joke.yml`.
1. Update the `Update Comment` step to only trigger if the input is a joke:

   ```yaml
   - name: Update comment
     if: fromJSON(steps.rate-joke.outputs.result).is_joke == true
     uses: peter-evans/create-or-update-comment@v5
   ```

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
1. With the changes pushed to GitHub, Mona will check your work and share the next steps.

> [!TIP]
> While in this action we use a single JSON `result` output and parse it in the workflow - it may be a good idea to expose the structured fields as individual outputs in the action
>
> Later, once you have finished the exercise, feel free to revisit the action code to add individual outputs for `is_joke`, `score`, `humor_type`, and `feedback` for easier consumption in workflows!