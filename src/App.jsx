
import {useRoutes} from 'react-router-dom'
import React from 'react'
import routers from './routers/routers'
export default function App() {
    const element = useRoutes(routers)
    return (
        <div style={{height:"100%"}}>
            {element}
            {/* <Button type="primary">kewu</Button> */}
        </div>
    );
    
}

