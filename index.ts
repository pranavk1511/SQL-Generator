const PORT : number = 8000;
import express , {Application,Request,Response } from "express";
import cors from "cors"
import {Configuration,OpenAIApi} from "openai"

const app : Application = express()
app.use(cors())
app.use(express.json())



const configuration = new Configuration({
    apiKey:API_KEY
})

const openai = new OpenAIApi(configuration)

app.post('/completetions',async(req:Request,res:Response)=>{
    try{
           const completions = await openai.createChatCompletion({
                model:"gpt-3.5-turbo",
                messages:[{role:"user",content :req.body.messages}]
            })

        res.send(completions.data.choices[0].message)
    }
    catch(error){
        console.log(error)
        res.status(500).send("server error")
    }
})
app.listen(PORT,()=> console.log(`Your Server is running on PORT ${PORT}`))