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

### ⌨️ Activity: Set up your development environment

Let's use **GitHub Codespaces** to set up a cloud-based development environment and work in it for the remainder of the exercise!

1. Right-click the below button to open the **Create Codespace** page in a new tab. Use the default configuration.

   [![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/{{full_repo_name}}?quickstart=1)

1. Confirm the **Repository** field is your copy of the exercise, not the original, then click the green **Create Codespace** button.

   - ✅ Your copy: `/{{full_repo_name}}`
   - ❌ Original: `/skills/create-ai-powered-actions`

1. Wait a moment for Visual Studio Code to load in your browser.

1. Verify that **Node.js** is available by opening a terminal and running:

   ```sh
   node --version
   npm --version
   ```

   <details>
   <summary>Having trouble? 🤷</summary><br/>

   - Make sure you selected your personal copy of the repository, not the original template.
   - If the Codespace fails to start, try refreshing the page and creating a new one.
   - Node.js and npm should be pre-installed in the development environment.

   </details>


### ⌨️ Activity: Install OpenAI SDK

Now that your Codespace is ready, let's install the OpenAI SDK, which you'll use to interact with GitHub Models.

1. Open the terminal in your Codespace.
1. Run the following command to install the OpenAI SDK:

   ```sh
   npm install openai
   ```

1. Verify the installation by checking the `package.json` file for the `openai` dependency.


### ⌨️ Activity: Create Metadata File

Let's create the GitHub Action metadata file at the repository root level.

1. Create action.yml at the repository root with the following content:

    <!-- TODO: Describe the action metadata file option present below -->

    ```yml
    name: "Rate Joke Action"
    description: "Rates a joke using GitHub Models"

    inputs:
      joke:
        description: "The joke to be rated"
        required: true
      token:
        description: "Personal access token to be used for GitHub Models API call"
        default: {% raw %}${{ github.token }}{% endraw %}

    outputs:
      result:
        description: "AI-generated joke evaluation"

    runs:
      using: node24
      main: dist/index.js
    ```

1. Commit and push the changes to the `main` branch.
1. With the changes pushed to GitHub, Mona will check your work and share the next steps.
