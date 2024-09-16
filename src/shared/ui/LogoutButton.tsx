import {Button} from "antd";
import {logout} from "../store/slices/auth/authSlice";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";

export default function LogoutButton(){

    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    return(
        <div>
            {
                isAuthenticated
                    ? <Button className={"self-end"} onClick={() => dispatch(logout())}>Logout</Button>
                    : null
            }
        </div>
    )
}