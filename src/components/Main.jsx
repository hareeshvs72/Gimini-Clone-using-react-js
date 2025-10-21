import React, { useState } from 'react'
import Header from './Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faCompass, faLightbulb, faMessage, faImages, faMicrophone, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { GoogleGenAI } from "@google/genai";
import { GEMINI_API_KEY } from './ApiKey';




function Main() {
    const [input, setInput] = useState('')
    const [content, setContent] = useState('')
    const [prevPrompt ,setPrevprompt] = useState([])
    // console.log(input);
    console.log(content);
    console.log(prevPrompt);
    
    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY  });

    async function mainApi(textValue) {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: textValue,
        });
        console.log(response.text);
        setContent(response.text)
    }

    const handileSend = () => {
        mainApi(input);
        setPrevprompt([...prevPrompt,input])
        sessionStorage.setItem("prompt",prevPrompt)
        setInput("")
    }
    

    return (
        <div className=' flex-1 px-10 my-3'>
            <Header />


            <div className='md:px-50  mt-10'>
                {/* headings */}
                {!content ?
                    <>
                        <div className=' md:text-5xl text-2xl font-semibold'>
                            <h1 className='my-3 bg-clip-text text-transparent  bg-gradient-to-r from-[#4796E3] via-[#CA6673] to-[#9177C7]'>Hello, Dev.</h1>
                            <h1 className='text-gray-300'>How can I help you today?</h1>
                        </div>
                        {/* cards */}
                        <div className="grid md:grid-cols-4 mb-19 grid-cols-2 my-3 md:mt-20">
                            <div className='p-5 my-3 rounded-2xl bg-gray-300 mx-2 hover:bg-gray-400'>
                                <div className='flex  flex-col justify-between items-end'>
                                    <p className='my-3'>Sugest Butiful place to see on an upcoming road trip</p>
                                    <FontAwesomeIcon icon={faCompass} className='mt-6 text-xl' />
                                </div>

                            </div>
                            <div className='p-5  my-3 rounded-2xl bg-gray-300 mx-2 hover:bg-gray-400'>
                                <div className='flex  flex-col justify-between items-end'>
                                    <p className='my-3'>Briefly Summarize this concept : urban planning</p>
                                    <FontAwesomeIcon icon={faLightbulb} className='mt-6 text-xl' />
                                </div>

                            </div>
                            <div className='p-5 my-3 rounded-2xl bg-gray-300 mx-2 hover:bg-gray-400'>
                                <div className='flex  flex-col justify-between items-end'>
                                    <p className='my-3'>Brainstorm team bonding activities for our work retreat</p>
                                    <FontAwesomeIcon icon={faMessage} className='mt-6 text-xl' />
                                </div>

                            </div>
                            <div className='p-5 my-3 rounded-2xl bg-gray-300 mx-2 hover:bg-gray-400'>
                                <div className='flex  flex-col justify-between items-end '>
                                    <p className='my-3'>Tell me about React js and React Native</p>
                                    <FontAwesomeIcon icon={faCode} className='mt-13 text-xl' />
                                </div>

                            </div>
                        </div>
                    </>
                    :   

                    <div className='text-justify min-h-[500px] max-h-[500px] my-3 overflow-x-hidden overflow-y-scroll w-ful h-full'>
                        <p>{content}</p>
                    </div>

                }
                {/* serach prompt */}

                <div className='w-full  relative ' >
                    <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e)=>{if(e.key=='Enter'){handileSend()}}} type="text" placeholder='Enter A Prompt Here ' className=' relative bg-gray-300  py-3 px-5 w-full rounded-full ' />
                    <div className='absolute right-0 top-3 mx-5 '>
                        <FontAwesomeIcon icon={faImages} className='text-xl' />
                        <FontAwesomeIcon icon={faMicrophone} className='ms-2 text-xl' />
                        <button type='button' className='cursor-pointer' onClick={handileSend}>  <FontAwesomeIcon icon={faPaperPlane} className='ms-2 text-xl' /></button>

                    </div>
                </div>
                {/* just content */}
                <p className='mt-3 text-center'>Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps</p>
            </div>



        </div>
    )
}

export default Main