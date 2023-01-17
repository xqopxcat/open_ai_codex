import React, { memo } from 'react';
import { TypeLoader, TypeText } from './';
import { BiBot, BiUser } from 'react-icons/bi';

const ChatStripe = ({ id, value, isAi, isImage }) => {
    const renderType = () => {
        if (isAi) {
            if (value === '') return <TypeLoader />;
            return isImage ? <img src={ value } className="p-3 bg-gray-600 rounded-xl" alt="image" /> : <TypeText content={ value } />;
        }
        return value;
    }
    return (
        <div id={ id } className={`w-full p-[15px] ${ isAi ? 'bg-[#40414F]' : 'bg-transparent' }`}>
            <div className="w-full max-w-7xl my-0 mx-auto flex flex-row items-start gap-3">
                <div 
                    className={`w-[36px] h-[36px] rounded-md 
                        flex items-center justify-center ${ isAi ? 'bg-[#10a37f]' : 'bg-[#5436DA]'}`}
                >
                    { isAi ? <BiBot className="w-5 h-5 text-white" /> : <BiUser className="w-5 h-5 text-white" /> }
                </div>
                <div 
                    className="flex-1 text-[#dcdcdc] max-w-full overflow-x-scroll whitespace-pre-wrap" 
                >
                    { renderType() }
                </div>
            </div>
        </div>
    )
};

export default memo(ChatStripe);