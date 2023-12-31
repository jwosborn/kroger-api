import 'dotenv/config';
import axios from 'axios';
import express from 'express'
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

app.options('/',(req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.end();
  } )
app.post('/', (req, response) => {
    axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4',
            messages: [{
                role: 'system',
                content: 'You are a world class marketing copywriter.'
            }, {
                role: 'user',
                content: req.body.prompt
            }],
            max_tokens: 1000
        },
        {
                headers: {
                    'Authorization': `Bearer ${AIKEY}`,
                    'OpenAI-Organization': AIORG
                }
    }).then(res => {
        response.json(res.data.choices)
    }).catch(e => { console.log(e.response.error); response.json(e.response); })
});
