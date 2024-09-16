import React from 'react';
import {Route, Routes} from "react-router-dom";
import SignIn from "./pages/signin/page";
import {Header} from "./features/header/Header";
import ViewUsersPage from "./pages/viewusers/page";
import EditUsersPage from "./pages/editusers/page";

function App() {
    return (
        <div>
            <Header/>
            <Routes>
                <Route path="/signin" element={<SignIn/>}/>
                <Route path="/viewusers" element={<ViewUsersPage/>}/>
                <Route path="/editusers" element={<EditUsersPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
