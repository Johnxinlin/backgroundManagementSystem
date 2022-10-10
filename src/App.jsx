
import { BrowserRouter , Routes, Route, useRoutes} from 'react-router-dom'
import React from 'react'
import Admin from "./pages/admin/admin";
import Login from "./pages/login/login";

export default function App() {
    
    return (
        <div style={{height:"100%"}}>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Admin/>} />
                    <Route path="/admin" element={<Admin/>}></Route>
                    <Route path="/login" element={<Login/>}></Route>
                </Routes>
            </BrowserRouter>
            {/* <Button type="primary">kewu</Button> */}
        </div>
    );
    
}

