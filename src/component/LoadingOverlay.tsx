import React from 'react'
import { LoadingOverlay } from '@mantine/core';

interface OverlayProps {
    status: boolean | any;
    color?: string;
}

const LoadingOverlayComp: React.FC<OverlayProps> = ({ status = false, color = 'blue' }) => {
    return (
        <LoadingOverlay
            visible={status}
            zIndex={1000}
            overlayProps={{ radius: 'sm', blur: 2 }}
            loaderProps={{ color, type: 'bars' }}
        />
    )
}

export default LoadingOverlayComp