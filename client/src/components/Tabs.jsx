import React, { useState } from 'react';

const Tabs = ({ tabItems, onTabClick }) => {
    const [activeTab, setActiveTab] = useState(tabItems[0].title);
    const handleClick = (title) => {
        setActiveTab(title);
        onTabClick(title);
    }
    return (        
        <div className="border-b border-gray-700 w-full max-w-7xl">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-400">
                {
                    tabItems.map(({ title, icon }) => {
                        return (
                            <li className={`tab-item ${ activeTab === title && 'active' }`} onClick={ () => handleClick(title) }>
                                { icon }
                                <span>{ title }</span>
                            </li>
                        )
                    })
                }
            </ul>
            {
                tabItems.map(({ title, element }) => {
                    return (
                        <div className={ activeTab === title ? 'flex' : 'hidden' }>
                            { element }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Tabs;