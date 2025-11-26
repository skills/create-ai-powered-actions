const { rateJoke } = require("./rateJoke");
const core = require("@actions/core");

async function run() {
  // Get the joke input from the action
  const joke = core.getInput("joke", { required: true });
  
  // Get the GitHub token for authentication
  const token = core.getInput("token", { required: true });
  
  // Rate the joke using AI with structured outputs
  const rating = await rateJoke(joke, token);
  
  console.log("Joke rating:", rating);
  
  // Set the output
  core.setOutput("result", rating);
}

module.exports = { run };
