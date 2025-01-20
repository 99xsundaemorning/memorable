// Import required modules
require('dotenv').config(); // Load environment variables from .env file
const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const express = require('express');

// Create an Express app
const app = express();

// Create a new Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});

// Serve a simple "I'm Alive" message at the root URL
app.get('/', (req, res) => {
  res.send("I am alive! 👾");
});

// Start the web server to listen for requests on the dynamic port provided by Render
const PORT = process.env.PORT || 3000; // Default to 3000 if the PORT variable is not set
app.listen(PORT, () => {
  console.log(`Web server running on port ${PORT}`);
});

// Your Discord bot token loaded from the .env file
const token = process.env.DISCORD_TOKEN; // Fetch token from environment variable

// Log the bot in
client.login(token);

// On bot ready, log a success message and set the initial activity
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  // Set initial activity
  client.user.setActivity('your gossips!', { type: ActivityType.Listening });
  
  // Change activity every 5 minutes (300000 ms)
  setInterval(() => {
    const activities = [
      { name: 'DOWNTOWN INDIΛ!', type: ActivityType.Watching },
      { name: 'in Voice Channel!', type: ActivityType.Streaming },
      { name: 'Music!', type: ActivityType.Listening }
    ];
    
      // Select a random activity from the array
    const randomActivity = activities[Math.floor(Math.random() * activities.length)];
    client.user.setActivity(randomActivity.name, { type: randomActivity.type });
    console.log(`Changed activity to: ${randomActivity.name}`);
  }, 10000); // Change activity every 10 seconds
});

// Bot command example
client.on('messageCreate', (message) => {
  if (message.content.toLowerCase() === '!ping') {
    message.reply('Pong! 🏓');
  }
});
