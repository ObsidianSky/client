import React, { FunctionComponent, ReactNode, useEffect, useRef, useState } from 'react';

interface ContextMenuContainerProps {
    x: number,
    y: number,
    children: ReactNode
}

const ContextMenuContainer: FunctionComponent<ContextMenuContainerProps> = ({x, y, children}) => {
    const [isReadyToDisplay, setIsReadyToDisplay] = useState(false);
    const [updatedX, setUpdatedX] = useState(0);
    const [updatedY, setUpdatedY] = useState(0);

    const containerRef = useRef(null);

    useEffect(() => {
        const handleContextMenu = (event) => {
            event.preventDefault();
        };

        containerRef.current.addEventListener('contextmenu', handleContextMenu);

        return function handleContextMenuCleanup() {
            containerRef.current.removeEventListener('contextmenu', handleContextMenu);
        }
    }, []);

    useEffect(() => {
        let xOffset = 0;
        let yOffset = 0;

        const { innerWidth, innerHeight } = window;
        const rect = containerRef.current.getBoundingClientRect();

        if (x + rect.width > innerWidth) {
            xOffset = x + rect.width - innerWidth;
        }

        if (y + rect.height > innerHeight) {
            yOffset = y + rect.height - innerHeight;
        }

        setIsReadyToDisplay(true);

        setUpdatedX( x - xOffset);
        setUpdatedY(y - yOffset)

    }, [x, y, children]);

    return (
        <div ref={containerRef} style={{
            visibility: isReadyToDisplay ? 'visible': 'hidden',
            position: 'absolute',
            zIndex: 10,
            top: updatedY,
            left: updatedX
        }}>
            {children}
        </div>
    );
};

export default ContextMenuContainer;