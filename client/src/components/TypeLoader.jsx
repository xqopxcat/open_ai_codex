import React, { useEffect, useState } from 'react';

const TypeLoader = () => {
    const [content, setContent] = useState('');
    useEffect(() => {
        const updateWord = () => {
            if (content === '...') {
                setContent('');
            }
            else {
                setContent(content + '.');
            }
        }
        setTimeout(updateWord, 400);
    }, [content]);
    
    return (
        <div className="text-white">{ content }</div>
    );
};

export default TypeLoader;