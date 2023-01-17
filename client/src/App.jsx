import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChatArea, ChatContainer, Tabs } from './components';
import { usePostAiCoreMutation, useGenerateAiImageMutation } from './redux/services/openAiCore';
import { generateUniqueId } from "./helpers/utils";
import { AiOutlineFileText, AiOutlineFileImage } from 'react-icons/ai';

function App() {
    const [content, setContent] = useState([]);
    const [isImage, setIsImage] = useState(false);
    const [fetchData, setFetchData] = useState();
    const [fetchError, setFetchError] = useState();
    const [contentId, setContentId] = useState('');
    const containerRef = useRef(null);
    const [postAiCore] = usePostAiCoreMutation();
    const [generateAiImage] = useGenerateAiImageMutation();
    
    useEffect(() => {
        setContent(content => {
            if (fetchError) {
                return content.map(item => item.id === contentId ? { ...item, value: fetchError?.error } : item );
            }
            return content.map(item => item.id === contentId ? { ...item, value: fetchData?.bot.trim() } : item );
        });
    }, [fetchData, fetchError, contentId]);
    
    useEffect(() => {
        scrollToBottom();
    }, [content]);
    
    const scrollToBottom = () => {
        containerRef.current?.lastElementChild?.scrollIntoView({ block: 'end', behavior: 'smooth' });
    };
    
    const onSubmit = useCallback(async (id, value) => {
        setContent(content => [...content, 
            { id: generateUniqueId(), value, isAi: false },
            { id, value: '', isAi: true, isImage },
        ]);
        try {
            if (isImage) {
                const { data, error } = await generateAiImage({ prompt: value, size: '256x256' });
                setFetchData(data);
                setFetchError(error);
            }
            else {
                const { data, error } = await postAiCore({ prompt: value });
                setFetchData(data);
                setFetchError(error);
            }
            setContentId(id);
        }
        catch (e) {
            console.log(e);
        }
    }, [isImage]);
    
    const handleTabClick = (title) => {
        setIsImage(title === 'Image');
    }
    
    const tabItems = [{
            title: 'Text',
            icon: <AiOutlineFileText className="mr-2"/>,
            element: <ChatArea onSubmit={ onSubmit } placeholder="Ask codex..." />
        }, {
            title: 'Image',
            icon: <AiOutlineFileImage className="mr-2"/>,
            element:  <ChatArea onSubmit={ onSubmit } placeholder="Describe image..." />
        }
    ]
    
    return (
        <div className="flex flex-col items-center justify-between bg-[#343541] w-screen h-screen">
            <div className="flex w-full justify-center items-center h-[85%]">
                <ChatContainer containerRef={ containerRef } content={ content } />
            </div>
            <div className="flex w-full justify-center items-center fixed bottom-0">
                <Tabs tabItems={ tabItems } onTabClick={ handleTabClick } />
            </div>
        </div>
    );
};

export default App;
