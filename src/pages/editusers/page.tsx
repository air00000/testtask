import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../shared/store";
import {useEffect} from "react";
import {EditUsersTable} from "../../features/editusers/EditUsersTable";

export default function EditUsersPage() {
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
                            <EditUsersTable/>
                    </div>
                );
        }

        return null;
}