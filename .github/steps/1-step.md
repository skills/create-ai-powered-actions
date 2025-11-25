## Step 1: Setup AI-Powered Action Foundation

Your development team wants to add intelligence to your joke-handling action. The first step is setting up the foundation to connect with GitHub Models and prepare your action for AI integration.

### 📖 Theory: GitHub Models and Authentication

**GitHub Models** provides free access to AI models for prototyping and experimentation. It offers a REST API that can be accessed using personal access tokens with `models:read` permissions. The API supports various AI models including GPT-4, Claude, and others, each with different rate limits and capabilities.

**Authentication** with GitHub Models requires:

- A personal access token with `models:read` scope
- Proper API endpoint configuration (`https://models.github.ai/inference`)
- SDK integration (OpenAI SDK compatible with GitHub Models endpoint)

**Rate limits** vary by model tier:

- **Low tier models**: 15 requests/minute, 150 requests/day for free users
- **High tier models**: 10 requests/minute, 50 requests/day for free users
- Token limits: 8000 input tokens, 4000 output tokens per request

For more details, see:

- [GitHub Models - Prototyping with AI models](https://docs.github.com/en/github-models/prototyping-with-ai-models)
- [Managing personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)
- [GitHub Models REST API](https://docs.github.com/en/rest/models)

### ⌨️ Activity: Install Dependencies and Configure Action

1. Install the OpenAI SDK by running `npm install openai`
1. Update `package.json` to include the new dependency
1. Configure `action.yml` with required inputs for GitHub token and comment text
1. Set up the basic action structure with proper input handling

### ⌨️ Activity: Create GitHub Models Integration

1. Create a personal access token with `models:read` permissions at [github.com/settings/tokens](https://github.com/settings/tokens)
1. Set up OpenAI client configuration for GitHub Models endpoint
1. Create a basic function to test AI model connectivity
1. Add error handling for authentication and rate limiting scenarios

<details>
<summary>Having trouble? 🤷</summary><br/>

- Make sure your personal access token has the `models:read` scope selected
- The GitHub Models endpoint is `https://models.github.ai/inference` (different from OpenAI's endpoint)
- Test your token by making a simple API call before integrating into the action
- Check the [GitHub Models documentation](https://docs.github.com/en/github-models) for the latest API changes

</details>
