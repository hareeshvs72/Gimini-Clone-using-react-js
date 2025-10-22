import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faClockRotateLeft, faGear, faMessage, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
function Sidebar({setPrevprompt,prevPrompt}) {
    const [menuBar,setMenuBar] = useState(false)
    console.log(prevPrompt);
    
    return (
        <>
            <div >
                {/* menu icon */}
              
                    <div className={`${menuBar ? "w-[80px]" : "md:w-[200px]"} h-screen bg-gray-300 p-3 flex flex-col justify-between `}>
                      <div className='flex  flex-col'>
                           <button type='button' onClick={()=>setMenuBar(!menuBar)}> 
                            
                            <img src="/menu_icon.png" alt="menu icon" width={'30px'} height={'50px'} />
                            </button>
        
        
                        {/* new chat */}
                         <div>
                                <div className='bg-gray-200 rounded-full p-3 mt-10 flex items-center justify-center   '>
                                   <FontAwesomeIcon icon={faPlus}   />
                                    <p className={`mx-3 font-semibold ${menuBar?"hidden" :"visible"}` }>New Chat</p>
                                </div>
                                <p className={`mx-3 text-xl my-3 font-semibold  ${menuBar?"hidden" :"visible"}` }>Recent</p>
                         </div>
                         { prevPrompt.map((items,index)=>(
                             <div key={index} className='rounded-full p-3 mt-1 flex  hover:bg-gray-200  '>
                               <FontAwesomeIcon icon={faMessage}   />
                                <p className={`mx-3 font-semibold ${menuBar?"hidden" :"visible"}` }> {items} </p>
                            </div>
                         ))  
                           }
                      </div>
                         <div className=''>
                       {/* help */}
                    
                            <div className=' rounded-full p-3 mt-3 flex items-center justify-center  hover:bg-gray-200 '>
                               <FontAwesomeIcon icon={faQuestionCircle}   />
                                <p className={`mx-5 font-semibold ${menuBar?"hidden" :"visible"}` }> Help</p>
                            </div>
                            {/* Activities */}
                              <div className=' rounded-full p-3 mt-3 flex items-center justify-center  hover:bg-gray-200  '>
                               <FontAwesomeIcon icon={faClockRotateLeft}   />
                                <p className={`mx-3 font-semibold ${menuBar?"hidden" :"visible"}` }> Activity</p>
                            </div>
                            {/* settings */}
                             <div className='rounded-full p-3 mt-3 flex items-center justify-center  hover:bg-gray-200  '>
                               <FontAwesomeIcon icon={faGear}   />
                                <p className={`mx-3 font-semibold ${menuBar?"hidden" :"visible"}` }> Settings</p>
                            </div>
                </div>
          
             












                 
                </div>    
            </div>



        </>
    )
}

export default Sidebar