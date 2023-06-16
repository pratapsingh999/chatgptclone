

// import { Configuration, OpenAIApi } from "openai";
const { Configuration, OpenAIApi } = require("openai");
const express = require('express')
const bodyparser = require ('body-parser')
const cors = require('cors')

const configuration = new Configuration({
    organization: "org-q4HXUmOKXd5ukMwAim7FoQuN",
    apiKey:"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",
    // import.meta.env.VITE_Open_AI_Key,
    // "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",
});
const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();

const app = express();

app.use(bodyparser.json())
app.use(cors()) 

const port = 3001

app.post('/', async(req,res)=>{
    const{message} = req.body;
    console.log(message)

    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${message}`,
        max_tokens: 100,
        temperature: 0.5,
      });
      console.log(response.data.choices[0].text)
      res.json({
        message:response.data.choices[0].text,
        // data: response.data
      })
})
app.listen(port, ()=>{
    console.log(`Example app listening at http://localhost:${port}`)
})
