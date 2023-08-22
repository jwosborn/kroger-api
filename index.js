import axios from 'axios';
import express from 'express'
import'dotenv/config';
const { PORT, AIKEY, AIORG } = process.env


// This variable instantiates the Express.js library
const app = express()
app.use(express.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
// The code below starts the API with these parameters:
// 1 - The PORT where your API will be available
// 2 - The callback function (function to call) when your API is ready
app.listen(PORT, () =>
  console.log(`The Kroger API is running on: http://localhost:${PORT}.`)
);

app.post('/', (req, response) => {
    (req.body.description && req.body.bullets) &&
        axios.post('https://api.openai.com/v1/chat/completions', {
                model: 'gpt-4',
                messages: [{
                    role: 'system',
                    content: 'You are a world class marketing copywriter.'
                }, {
                    role: 'user',
                    content: `${req.body.description} and ${req.body.bullets}`
                }],
                max_tokens: 1000
            }, {
                    headers: {
                        'Authorization': `Bearer ${AIKEY}`,
                        'OpenAI-Organization': AIORG
                    }
        }).then(res => {
            response.json(res.data.choices)
        }).catch(console.log)
});
