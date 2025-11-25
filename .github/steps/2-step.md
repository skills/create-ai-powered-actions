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

### ⌨️ Activity: Implement Core Rating Logic

1. Create the main `rateJoke.js` module with AI integration
1. Implement prompt template for joke analysis and rating
1. Add comprehensive error handling for API calls
1. Create helper functions for input validation and response processing

### ⌨️ Activity: Test Action Locally

1. Set up environment variables for testing (GitHub token, test jokes)
1. Create a local test script to validate the joke rating functionality
1. Test with various joke types and edge cases (non-jokes, empty input)
1. Verify proper error messages and graceful failure handling

### ⌨️ Activity: Build and Package Action

1. Run `npm run build` or equivalent packaging command
1. Commit the built `dist/` directory with compiled action code
1. Update version tags and release information
1. Test the packaged action in a separate repository

<details>
<summary>Having trouble? 🤷</summary><br/>

- Use environment variables for sensitive data like API tokens during local testing
- Test with the same model you plan to use in production (GPT-4o-mini is recommended for cost efficiency)
- Make sure your error handling covers both network issues and AI model response problems
- The `dist/` folder should contain the compiled JavaScript that GitHub Actions will execute

</details>
