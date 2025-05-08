import { createContext, useState } from "react";
import main from "../config/gemini";


export const Context = createContext()

const ContextProvider = (props) => {

    const [input, setInput] = useState('')
    const [recentPrompt, setRecentPrompt] = useState("")
    const [prevPrompt, setPrevPrompt] = useState([])
    const [showResult, setShowResult] = useState(false)
    const [loading, setLoading] = useState(false)
    const [resultData, setResultData] = useState("")

    //delay pragraph text effect
    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResultData(prev => prev + nextWord)
        }, 15 * index)
    }

    //new chat button function
    const newChat = () => {
        setLoading(false)
        setShowResult(false)
        setInput("")
    }


    //API main function
    const onSent = async (prompt) => {
        setResultData("")
        setLoading(true)
        setShowResult(true)

        //check the input whether is from search box or recent prompt
        let response;
        if (prompt !== undefined) {
            response = await main(prompt)
            setRecentPrompt(prompt)
        }
        else {
            setPrevPrompt(prev => [...prev, input])
            response = await main(input)
            setRecentPrompt(input)
        }

        //adding bold text to the response for **
        let responseArray = response.split("**")
        let newResponse = "";
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i]
            }
            else {
                newResponse += `<b>${responseArray[i]}</b>`
            }
        }

        //add new line for *
        let newResponse2 = newResponse.split("*").join("<br/></br>")

        //delay pragraph text effect
        let newResponseArray = newResponse2.split(" ")
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i]
            delayPara(i, nextWord + " ")
        }

        setLoading(false)
        setInput("")
    }


    const contextValue = {
        input, setInput,
        recentPrompt, setRecentPrompt,
        prevPrompt, setPrevPrompt,
        showResult, setShowResult,
        loading, setLoading,
        resultData, setResultData,
        onSent,
        newChat
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;
