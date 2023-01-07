import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChatArea, ChatContainer } from './components';
import { usePostAiCoreMutation } from './redux/services/openAiCore';
import { generateUniqueId } from "./helpers/utils";

function App() {
    const [content, setContent] = useState([]);
    const containerRef = useRef(null);
    const [postAiCore] = usePostAiCoreMutation();
    
    useEffect(() => {
        scrollToBottom();
    }, [content]);
    
    const scrollToBottom = () => {
        containerRef.current?.lastElementChild?.scrollIntoView({ block: 'end', behavior: 'smooth' });
    };
    
    const onSubmit = useCallback(async (id, value) => {
        setContent(content => [...content, 
            { id: generateUniqueId(), value, isAi: false },
            { id, value: '', isAi: true },
        ]);
        try {
            const { data, error } = await postAiCore({ prompt: value });
            setContent(content => {
                if (error) {
                    return content.map(item => item.id === id ? { ...item, value: error?.error } : item );
                }
                return content.map(item => item.id === id ? { ...item, value: data?.bot.trim() } : item );
            });
        }
        catch (e) {
            console.log(e);
            // setContent(content => [...content, { id: generateUniqueId(), isAi: true, value: error?.message }]);
        }
    }, []);
    
    return (
        <div className="flex flex-col items-center justify-between bg-[#343541] w-screen h-screen">
            <div className="flex w-full justify-center items-center h-[90%]">
                <ChatContainer containerRef={ containerRef } content={ content } />
            </div>
            <div className="flex w-full justify-center items-center fixed bottom-0">
                <ChatArea onSubmit={ onSubmit } />
            </div>
        </div>
    );
};

export default App;
