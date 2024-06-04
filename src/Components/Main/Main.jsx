import React, { useContext, useEffect } from 'react';
import { assets } from '../../assets/assets';
import './Main.css';
import { Context } from '../../Context/Context';

const Main = () => {
    const {
        prevPrompt,
        setPrevPrompt,
        onsent,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput
    } = useContext(Context);

    useEffect(() => {
        console.log({ showResult, recentPrompt, loading, resultData });
    }, [showResult, recentPrompt, loading, resultData]);

    const handleSend = () => {
        if (input.trim()) {
            onsent(input);
        }
    };

    return (
        <div className="Main">
            <div className="Nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="User Icon" />
            </div>
            <div className="Main-container">
                {!showResult ? (
                    <>
                        <div className="Greet">
                            <p><span>Hello, Kiran</span></p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className="Cards">
                            <div className="Card">
                                <p>Suggest beautiful places to see on an upcoming road trip</p>
                                <img src={assets.compass_icon} alt="Compass Icon" />
                            </div>
                            <div className="Card">
                                <p>Briefly summarize this concept: Urban Planning</p>
                                <img src={assets.bulb_icon} alt="Bulb Icon" />
                            </div>
                            <div className="Card">
                                <p>Brainstorm team bonding activities for our retreat</p>
                                <img src={assets.message_icon} alt="Message Icon" />
                            </div>
                            <div className="Card">
                                <p>Improve the readability of the following code</p>
                                <img src={assets.code_icon} alt="Code Icon" />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="result">
                        <div className="result-title">
                            <img src={assets.user_icon} alt="User Icon" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="Gemini Icon" />
                            {loading ? (
                                <div className="loader">
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                            ) : (
                                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <div className="Main-bottom">
                <div className="search-box">
                    <input 
                        onChange={(e) => setInput(e.target.value)} 
                        type="text" 
                        value={input} 
                        placeholder='Enter a prompt here' 
                    />
                    <div>
                        <img src={assets.gallery_icon} alt="Gallery Icon" />
                        <img src={assets.mic_icon} alt="Mic Icon" />
                        <img 
                            onClick={handleSend} 
                            src={assets.send_icon} 
                            alt="Send Icon" 
                        />
                    </div>
                </div>
                <p className="bottom-info">
                    Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
                </p>
            </div>
        </div>
    );
};

export default Main;
