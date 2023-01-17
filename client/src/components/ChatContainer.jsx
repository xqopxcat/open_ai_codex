import React from 'react';
import { ChatStripe } from './';

const ChatContainer = ({ content, containerRef }) => {
    return (
        <div ref={ containerRef } className="relative flex flex-1 w-full h-full overflow-y-scroll flex-col gap-3 pb-5 scroll-smooth">
            { 
                content.map(({ id, value, isAi, isImage }) => {
                    return (
                        <ChatStripe 
                            key={ id } 
                            id={ id } 
                            value={ value } 
                            isAi={ isAi } 
                            isImage={ isImage }
                        />
                    );
                })
            }
        </div>
    );
};

export default ChatContainer;