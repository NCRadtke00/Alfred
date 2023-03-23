const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();

const configuration = new Configuration({
    organization: process.env.ORGANIZATION_KEY,
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const app = express();
const port = process.env.PORT || 3080;
const defaultModel = "text-davinci-003";

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.post("/", async (req, res) => {
    const { message, currentModel = defaultModel } = req.body;
    try {
        const response = await openai.createCompletion({
            model: currentModel,
            prompt: message,
            max_tokens: 100,
            temperature: 0.5,
        });
        res.json({ message: response.data.choices[0].text });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong." });
    }
});

app.get("/models", async (req, res) => {
    try {
        const response = await openai.listEngines();
        res.json({ models: response.data.data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Something went wrong: ${error.message}` });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server started on port ${port}.`);
});