import OPENAI from 'openai';
import dotenv from 'dotenv';
import readlineSync from 'readline-sync';

dotenv.config();

const client = new OPENAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Tools
function getWeatherDetails(city = '') {
    const weatherData = {
        'los angeles': '10°C',
        'los vegas': '20°C',
        'new york': '5°C',
        'chicago': '2°C',
        'san diego': '15°C',
    };
    return weatherData[city.toLowerCase()] || 'Unknown';
}

const tools = {
    "getWeatherDetails": getWeatherDetails,
};

const SYSTEM_PROMPT = `
You are an AI assistant with START, PLAN, ACTION, Observation, and Output State.
Wait for the user prompt and first PLAN using available tools.
After Planning, Take the action with appropriate tools and wait for Observation based on Action.
Once you get the observations, Return the AI response based on START prompt and observations.

Strictly follow the JSON output format.

Available Tools:
function getWeatherDetails(city = string): string
getWeatherDetails is a function that accepts a city name as string and returns the weather details.

Example:
START
{"type":"user", "user": "What is the sum of weather of chicago and los angeles?"}
{"type":"plan", "plan": "I will call the getWeatherDetails for chicago"}
{"type":"action", "function": "getWeatherDetails", "input": "chicago"}
{"type":"observation", "observation": "2°C"}
{"type":"plan", "plan": "I will call the getWeatherDetails for los angeles"}
{"type":"action", "function": "getWeatherDetails", "input": "los angeles"}
{"type":"observation", "observation": "10°C"}
{"type":"output", "output": "The sum of weather of chicago and los angeles is 12°C"}
`;

const messages = [{ role: 'system', content: SYSTEM_PROMPT }];

async function chat() {
    while (true) {
        const query = readlineSync.question('>> ');
        const userMessage = { type: 'user', user: query };
        messages.push({ role: 'user', content: JSON.stringify(userMessage) });

        while (true) {
            try {
                const chat = await client.chat.completions.create({
                    model: "gpt-3.5-turbo",
                    messages: messages,
                });

                const result = chat.choices[0].message.content;
                messages.push({ role: 'assistant', content: result });

                console.log("Before JSON parsing...");
                console.log('\n\n----------------- START AI -------------------');
                console.log(result);
                console.log('----------------- END AI -------------------\n\n');
                console.log("After JSON parsing...");
                
                const call = JSON.parse(result);

                if (call.type === 'output') {
                    console.log(`🤖: ${call.output}`);
                    break;
                } else if (call.type === 'action') {
                    const fn = tools[call.function];
                    if (fn) {
                        const observation = fn(call.input);
                        const obs = { type: "observation", observation };
                        messages.push({ role: 'developer', content: JSON.stringify(obs) });
                    } else {
                        console.error(`Error: Tool ${call.function} not found.`);
                        break;
                    }
                }
            } catch (error) {
                console.error("Error:", error);
                break;
            }
        }
    }
}

chat();
