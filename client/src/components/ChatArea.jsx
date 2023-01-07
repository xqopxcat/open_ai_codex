import React, { useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { generateUniqueId } from "../helpers/utils";


const ChatArea = ({ onSubmit }) => {
    const [chatTerm, setChatTerm] = useState('')
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (chatTerm.trim() !== '') {
            const id = generateUniqueId();
            onSubmit(id, chatTerm);
            setChatTerm('');
        }
    }
    
    const handleKeyUp = (e) => {
        if (e.keyCode === 13 && !e.shiftKeys) {
            handleSubmit(e);
        };
    }
    
    return (
        <form
            className="p-2 text-gray-400 focus-within:text-gray-600 w-full max-w-7xl"
            onSubmit={ handleSubmit }
        >
            <div className="flex flex-row justify-start items-center">
                <textarea
                    name="send-field"
                    rows={ 1 }
                    cols={ 1 }
                    id="send-field"
                    placeholder="Ask Codex..."
                    value={ chatTerm }
                    onKeyUp={ handleKeyUp }
                    onChange={(e) => setChatTerm(e.target.value)}
                    className="flex-1 bg-transparent border-none rounded-md
                        outline-none placeholder-gray-500 
                        text-base text-white p-3" 
                ></textarea>
                <button type="submit" className="outline-0 border-0 cursor-pointer bg-transparent">
                    <AiOutlineSend className="w-6 h-6 m-4 text-white" />
                </button>
            </div>
        </form>
    )
}

export default ChatArea;