const generateUniqueId = () => {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);
    
    return `id-${timestamp}-${hexadecimalString}`;
}

const imageMarkdownRegex = /(\!)(\[.*\])(\((http)(?:s)?(\:\/\/).*\))/s;

export {
    generateUniqueId,
    imageMarkdownRegex
};