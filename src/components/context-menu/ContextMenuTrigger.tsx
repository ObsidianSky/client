import React, { FunctionComponent, useEffect, useState, useRef, ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface ContextMenuTriggerProps {
    data?: any;
    children: ReactNode,
    content: ReactNode
}

const ContextMenuTrigger: FunctionComponent<ContextMenuTriggerProps> = ({children, data, content}) => {
    const containerRef = useRef(null);

    const [ x, setX ] = useState(0);
    const [ y, setY ] = useState(0);
    const [ isVisible, setIsVisible ] = useState(false);

    useEffect(() => {
        const handleContextMenu = (event) => {
            event.preventDefault();

            setX(event.clientX);
            setY(event.clientY);
            setIsVisible(true);
        };

        containerRef.current.addEventListener('contextmenu', handleContextMenu)

        // TODO Clean up event listeners
    }, []);

    useEffect(() => {
        const contextMenuContainer = document.getElementById('context-menu-o-lo-lo');

        if (isVisible) {
            const style = {
                position: 'absolute' as 'absolute',
                left: x,
                top: y,
                zIndex: 10
            };

            ReactDOM.render(
                <div style={style}>
                    {content}
                </div>,
                contextMenuContainer
            );
        }

    }, [ x, y, isVisible ]);


    return (
        <div ref={containerRef}>
            {children}
        </div>
    );
};

export default ContextMenuTrigger;