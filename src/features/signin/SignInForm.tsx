import React, {useEffect, useState} from 'react';
import {Button, Form, Input} from 'antd';
import {Body, UserInterface} from "../../entities/user/UserInterface";
import {useNavigate} from "react-router-dom";
import Users from "../../entities/user/Users";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../shared/store";
import {login} from "../../shared/store/actions/auth/authActions";

type FieldType = {
    login?: string;
    password?: string;
};

const usersClassInstance = new Users();

export default function SignInForm() {
    const dispatch: AppDispatch = useDispatch();

    const [users, setUsers] = useState<UserInterface[]>([]);

    let navigate = useNavigate();


    useEffect(() => {
        const storedUsers = localStorage.getItem('users');
        if (storedUsers) {
            const parsedUsers: UserInterface[] = JSON.parse(storedUsers);
            setUsers(parsedUsers);
        } else {
            const initialUsers = usersClassInstance.getAllUsers();
            setUsers(initialUsers);
            localStorage.setItem('users', JSON.stringify(initialUsers));
        }
    },[]);

    const handleSignIn = (item: Body) =>{
        const user = users.find((user) => user.login === item.login && user.password === item.password);
        if (user){
            dispatch(login(user.login, user.type.id.toString(), user.id.toString()));
            localStorage.setItem('currentUserId', user.id.toString());
            localStorage.setItem('currentUserType', user.type.id.toString());
            navigate('/viewusers');
        } else{
            alert('Неверные данные!')
        }
    };

    return (
        <Form
            name="basic"
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            style={{maxWidth: 600}}
            initialValues={{remember: true}}
            onFinish={handleSignIn}
            autoComplete="off"
        >
            <Form.Item<FieldType>
                label="Логин"
                name="login"
                rules={[{required: true, message: 'Введите свой логин!'}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item<FieldType>
                label="Пароль"
                name="password"
                rules={[{required: true, message: 'Введите свой пароль!'}]}
            >
                <Input.Password/>
            </Form.Item>
            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Button type="primary" htmlType="submit">
                    Войти
                </Button>
            </Form.Item>
        </Form>
    );
}