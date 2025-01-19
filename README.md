# AI Assistant with Tool Integration

This project is an interactive AI assistant that uses OpenAI's GPT-3.5-turbo model to process user inputs, plan actions, execute tools, and generate responses. It simulates an intelligent agent capable of using predefined tools to provide actionable insights.

## Features

- **Interactive Chat**: Accepts user input via the terminal and generates responses.
- **Tool Integration**: Includes a `getWeatherDetails` tool to fetch weather details for specific cities.
- **JSON Workflow**: Follows a structured JSON-based process for planning, action execution, and observations.
- **Customizable Tools**: Easily extend the project by adding more tools to enhance functionality.

## How It Works

1. **System Initialization**: The AI is initialized with a system prompt that defines its behavior.
2. **User Query**: The user inputs a query (e.g., "What is the weather in Chicago?").
3. **AI Workflow**:
   - Plans the next steps based on the input.
   - Executes relevant tools (e.g., `getWeatherDetails`).
   - Observes results and integrates them into the response.
4. **Response Output**: The AI responds with a well-formed answer.

## Prerequisites

1. **Node.js**: Install [Node.js](https://nodejs.org/) (version 16 or higher).
2. **OpenAI API Key**: Obtain an API key from [OpenAI](https://platform.openai.com/account/api-keys).
3. **Dependencies**: Install project dependencies using `npm`.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ai-assistant-tools.git
   cd ai-assistant-tools```
2. Install dependencies

3. Create a .env file in the root directory and add your OpenAI API key.

## Usage
1. Run the project:
```bash
   node index.js
```
2.Interact with the assistant by typing queries into the terminal.

Example queries:
  What is the weather in Chicago?
  What is the sum of weather for Los Angeles and New York?

3.The assistant will process the query, use tools as needed, and respond.

## Structure
```bash
   .
├── index.js       # Main application file
├── package.json   # Project dependencies and metadata
├── .env           # Environment variables (not included in the repo)
├── README.md      # Project documentation

```

## Dependencies

OpenAI: For AI completions.
dotenv: For environment variable management.
readline-sync: For interactive terminal input.


