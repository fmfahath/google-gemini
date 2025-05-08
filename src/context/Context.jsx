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

    const onSent = async (prompt) => {
        setResultData("")
        setLoading(true)
        setShowResult(true)
        setRecentPrompt(input)
        const response = await main(input)

        //adding bold text to the response for **
        let responseArray = response.split("**")
        let newResponse;
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

        setResultData(newResponse2)
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
        onSent
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;
