import { createContext, useState } from "react";
import run from "../Config/Gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextChar) => {
        setTimeout(() => {
            setResultData((prev) => prev + nextChar);
        }, 75 * index);
    };

    const newChat =()=>{
        setLoading(false);
        setShowResult(false);

    }

    const onsent = async (prompt = input) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);

        try {
            setPrevPrompt((prev) => [...prev, prompt]);
            setRecentPrompt(prompt);

            const response = await run(prompt);

            if (typeof response !== 'string') {
                console.error("Response is not a string:", response);
                setLoading(false);
                return;
            }

            let responseArray = response.split("**");
            let newResponse = "";

            for (let i = 0; i < responseArray.length; i++) {
                if (i === 0 || i % 2 !== 1) {
                    newResponse += responseArray[i];
                } else {
                    newResponse += "<b>" + responseArray[i] + "</b>";
                }
            }

            let formattedResponse = newResponse.split("*").join("<br/>");
            let responseArrayChars = [...formattedResponse];

            for (let i = 0; i < responseArrayChars.length; i++) {
                const nextChar = responseArrayChars[i];
                delayPara(i, nextChar);
            }

            console.log("Response received:", response);
        } catch (error) {
            console.error("Error during onsent:", error);
        } finally {
            setLoading(false);
            setInput("");
        }
    };

    const contextValue = {
        prevPrompt,
        setPrevPrompt,
        onsent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
