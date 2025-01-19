import OPENAI from 'openai';
import dotenv from 'dotenv';
import readlineSync from 'readline-sync';

dotenv.config(); // Load environment variables from .env

const client = new OPENAI({
    apiKey: process.env.OPENAI_API_KEY, // Read the API key from the environment variable
});

// Tools
function getWeatherDetails(city = '') {
    const weatherData = {
        'los angeles': '10°C',
        'los vegas': '20°C',
        'new york': '5°C',
        'chicago': '2°C',
        'sandiego': '15°C',
    };
    return weatherData[city.toLowerCase()] || 'Unknown';
}

const SYSTEM_PROMPT = `

You are an AI assistant with START, PLAN, ACTION, Observation and Output State.
Wait for the user prompt and first PLAN using available tools.
After Planning, Take the action with appropriate tools and wait for Observation based on Action.
Once you get the observations, Return the AI response based on START prompt and observations

Available Tools:
function getWeatherDetails(city = string): string
getWeatherDetails is a function that accepts city name as string and returns the weather details

Example:
START
{"type":"user", "user": " What is the sum of weather of chicago and los angeles?" }
{"type":"plan", "plan": " I will call the getWeatherDetails for chicago" }
{"type":"action", "fuunction": "getWeatherDetails", " input": "chicago" }
{"type":"observation", "observation": "2°C"}
{"type":"plan", "plan": " I will call the getWeatherDetails for los angeles" }
{"type":"action", "fuunction": "getWeatherDetails", " input": "los angeles" }
{"type":"observation", "observation": "10°C"}
{"type":"output", "output": "The sum of weather of chicago and los angeles is 12°C"}

`

const messages=[ { role: 'system', content: SYSTEM_PROMPT}];

while (true){
    const query = readlineSync.question('>> ');
    const q= {
        type: 'user',
        user: query,

    };
    messages.push({"role": "user", content: JSON.stringify(q)})

}

// const user = "Hey, What is the weather of sandiego?";



// async function chat(){
//     const result = await client.chat.completions
//     .create({
//         model: "gpt-3.5-turbo",
//         messages: [
//             {role: "system", content: SYSTEM_PROMPT},
//             { role: 'user', content: user }],
//     });
//     console.log(result.choices[0].message.content);

// }

// chat()

 

