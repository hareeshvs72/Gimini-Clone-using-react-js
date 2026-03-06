import React, { useState } from 'react'
import Header from './Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faCompass, faLightbulb, faMessage, faImages, faMicrophone, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

function Main({ setPrevprompt, prevPrompt }) {

    const [input, setInput] = useState('')
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(false)
    const [headInput, setHeadInput] = useState("")

    async function mainApi(textValue) {

        try {

            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: textValue,
            });

            const text = response?.text || "No response received"

            setContent(text)

        } catch (error) {

            console.error(error)
            setContent("Something went wrong. Try again.")

        } finally {

            setLoading(false)

        }
    }

    const handleSend = async () => {

        if (loading || !input.trim()) return;

        setLoading(true)
        setContent("")
        setHeadInput(input)

        setPrevprompt(prev => [...prev, input])

        await mainApi(input)

        setInput("")
    }

    return (
        <div className='flex-1 px-10 my-3'>

            <Header />

            <div className='md:px-50 mt-10'>

                {/* Welcome Screen */}
                {!content && !loading && (

                    <>
                        <div className='md:text-5xl text-2xl font-semibold'>
                            <h1 className='my-3 bg-clip-text text-transparent bg-gradient-to-r from-[#4796E3] via-[#CA6673] to-[#9177C7]'>
                                Hello, Dev.
                            </h1>
                            <h1 className='text-gray-300'>
                                How can I help you today?
                            </h1>
                        </div>

                        <div className="grid md:grid-cols-4 mb-19 grid-cols-2 my-3 md:mt-20">

                            <div className='p-5 my-3 rounded-2xl bg-gray-300 mx-2 hover:bg-gray-400'>
                                <div className='flex flex-col justify-between items-end'>
                                    <p className='my-3'>Suggest beautiful place for a road trip</p>
                                    <FontAwesomeIcon icon={faCompass} className='mt-6 text-xl' />
                                </div>
                            </div>

                            <div className='p-5 my-3 rounded-2xl bg-gray-300 mx-2 hover:bg-gray-400'>
                                <div className='flex flex-col justify-between items-end'>
                                    <p className='my-3'>Briefly summarize: urban planning</p>
                                    <FontAwesomeIcon icon={faLightbulb} className='mt-6 text-xl' />
                                </div>
                            </div>

                            <div className='p-5 my-3 rounded-2xl bg-gray-300 mx-2 hover:bg-gray-400'>
                                <div className='flex flex-col justify-between items-end'>
                                    <p className='my-3'>Brainstorm team bonding activities</p>
                                    <FontAwesomeIcon icon={faMessage} className='mt-6 text-xl' />
                                </div>
                            </div>

                            <div className='p-5 my-3 rounded-2xl bg-gray-300 mx-2 hover:bg-gray-400'>
                                <div className='flex flex-col justify-between items-end'>
                                    <p className='my-3'>Tell me about React.js and React Native</p>
                                    <FontAwesomeIcon icon={faCode} className='mt-6 text-xl' />
                                </div>
                            </div>

                        </div>
                    </>
                )}

                {/* Chat Area */}
                {(loading || content) && (

                    <div className='text-justify min-h-[500px] max-h-[500px] my-3 overflow-y-scroll w-full'>

                        {loading && (

                            <div id='loadingAnimation'>
                                <hr />
                                <hr />
                                <hr />
                            </div>

                        )}

                        {!loading && content && (

                            <div>

                                <div className='flex my-2'>
                                    <img src="/user_icon.png" alt="user" width="40" style={{ borderRadius: '50%' }} />
                                    <h1 className='font-bold mx-3'>{headInput}</h1>
                                </div>

                                <div className='flex items-start gap-3'>
                                    <img src="/gemini_icon.png" alt="gemini" width="50" />

                                    <pre className="bg-gray-100 p-4 rounded-md whitespace-pre-wrap break-words text-gray-800 text-sm font-mono">
                                        {content}
                                    </pre>

                                </div>

                            </div>

                        )}

                    </div>

                )}

                {/* Input */}

                <div className='w-full relative'>

                    <input
                        disabled={loading}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleSend()
                        }}
                        type="text"
                        placeholder='Enter a prompt here'
                        className='bg-gray-300 py-3 px-5 w-full rounded-full disabled:opacity-50'
                    />

                    <div className='absolute right-0 top-3 mx-5'>

                        <FontAwesomeIcon icon={faImages} className='text-xl' />
                        <FontAwesomeIcon icon={faMicrophone} className='ms-2 text-xl' />

                        <button
                            disabled={loading}
                            onClick={handleSend}
                            className='cursor-pointer disabled:opacity-50'
                        >
                            {loading ? "..." : <FontAwesomeIcon icon={faPaperPlane} className='ms-2 text-xl' />}
                        </button>

                    </div>

                </div>

                <p className='mt-3 text-center text-sm'>
                    Gemini may display inaccurate info, so double-check responses.
                </p>

            </div>

        </div>
    )
}

export default Main