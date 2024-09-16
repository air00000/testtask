import React, {useState} from 'react';
import {MenuProps} from 'antd';
import {Menu} from 'antd';
import {NavLink} from "react-router-dom";
import LogoutButton from "../../shared/ui/LogoutButton";

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        key: 'view',
        label: (
            <NavLink to={"/viewusers"}>
                Просмотр пользователей
            </NavLink>
        ),
    },
    {
        key: 'edit',
        label: (
            <NavLink to={"/editusers"}>
                Изменение пользователей
            </NavLink>
        ),
    },
    {
        key: 'auth',
        label: (
            <LogoutButton/>
        ),
    },
];

export const Header = () => {
    const [current, setCurrent] = useState('mail');


    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
    };

    return (
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items}/>
    )
};