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
        await main(prompt)
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
