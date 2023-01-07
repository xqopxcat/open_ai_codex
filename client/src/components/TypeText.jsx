import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const TypeText = ({ content }) => {
    const [displayContent, setDisplayContent] = useState('');
    const [index, setIndex] = useState(0);
    useEffect(() => {
        const updateWord = () => {
            if (index < content.length) {
                setDisplayContent(displayContent + content[index]);
                setIndex(index + 1);
            }
        }
        setTimeout(updateWord, 20);
    }, [index]);
        
    return (
        <div className="flex flex-1 text-[#dcdcdc] text-[14px] max-w-full overflow-x-scroll">
            { displayContent }
        </div>
    )
};

TypeText.propTypes = {
    content: PropTypes.string
};

TypeText.defaultProps = {
    content: ''
};

export default TypeText;