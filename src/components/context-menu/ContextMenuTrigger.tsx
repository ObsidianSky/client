import React, { FunctionComponent, useEffect, useState, useRef, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import ContextMenuContainer from './ContextMenuContainer';

interface ContextMenuTriggerProps {
    data?: any;
    children: ReactNode,
    content: (data: any, close: () => any) => ReactNode
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

        containerRef.current.addEventListener('contextmenu', handleContextMenu);

        return function handleContextMenuCleanup() {
            containerRef.current.removeEventListener('contextmenu', handleContextMenu);
        }
    }, []);


    // TODO probably we should extract rendering functionality
    useEffect(() => {
        const contextMenuContainer = document.getElementById('context-menu-o-lo-lo');

        if (isVisible) {
            ReactDOM.render(
                <ContextMenuContainer x={x} y={y}>
                    {content(data, () => {
                        setIsVisible(false);
                    })}
                </ContextMenuContainer>,
                contextMenuContainer
            );
        } else {
            ReactDOM.render(
                null,
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