import {useNavigate} from 'react-router-dom';
import {useEffect} from "react";
import {ViewUsersTable} from "../../features/viewusers/ViewUsersTable";
import {RootState} from "../../shared/store";
import {useSelector} from "react-redux";

export default function ViewUsersPage(){

    let navigate = useNavigate();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/signin');
        }
    }, [isAuthenticated, navigate]);

    if (isAuthenticated) {
        return (
            <div className={"flex flex-col"}>
                <ViewUsersTable/>
            </div>
        );
    }

    return null;
}