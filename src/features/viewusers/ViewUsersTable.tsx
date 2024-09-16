import React, { useState } from 'react';
import {Table, Input, Select, Button, DatePicker, Spin} from 'antd';
import Users from "../../entities/user/Users";
import {UserTypeInterface} from "../../entities/user/UserInterface";

const { Option } = Select;

export const ViewUsersTable = () => {
    let profiles = new Users();
    const [filteredData, setFilteredData] = useState(profiles.getAllUsers());
    const [nameFilter, setNameFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState();
    const [startDateFilter, setStartDateFilter] = useState('');
    const [endDateFilter, setEndDateFilter] = useState('');
    const [loading, setLoading] = useState(false); // Состояние загрузки

    const handleReset = () => {
        setNameFilter('');
        setTypeFilter(undefined);
        setStartDateFilter('');
        setEndDateFilter('');
        setFilteredData(profiles.getAllUsers());
    };

    const handleFilter = async () => {
        setLoading(true); // Устанавливаем состояние загрузки в true

        // Имитация асинхронной операции с задержкой
        await new Promise(resolve => setTimeout(resolve, 5000));

        const result = profiles.getUsers(nameFilter, typeFilter, startDateFilter, endDateFilter);
        setFilteredData(result);
        setLoading(false); // Устанавливаем состояние загрузки в false
    };

    const columns = [
        {
            title: 'Имя',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Тип пользователя',
            dataIndex: 'type',
            key: 'type',
            render: (type: UserTypeInterface)=> type.name,
        },
        {
            title: 'Дата последнего визита',
            dataIndex: 'last_visit_date',
            key: 'last_visit_date',
            render: (date: Date) => date.toLocaleString('ru-RU', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            }),
        },

    ];

    return (
        <div className={"flex flex-col"}>
            <div className={"flex flex-row gap-2 p-2 m-2"}>
                <Input
                    placeholder="Фильтр по имени"
                    value={nameFilter}
                    onChange={e => setNameFilter(e.target.value)}
                    style={{marginBottom: 16}}
                />
                <Select
                    placeholder="Фильтр по типу"
                    value={typeFilter}
                    onChange={value => setTypeFilter(value)}
                    style={{width: 400, marginBottom: 16}}
                    allowClear
                >
                    <Option value={1}>Пользователь</Option>
                    <Option value={2}>Администратор</Option>
                    <Option value={3}>Модератор</Option>
                    <Option value={4}>Тестировщик</Option>
                    <Option value={5}>Гость</Option>
                </Select>
                <DatePicker
                    placeholder="C"
                    value={startDateFilter}
                    onOk={value => setStartDateFilter(value)}
                    style={{width: 800, marginBottom: 16}}
                    showTime
                />
                <DatePicker
                    placeholder="По"
                    value={endDateFilter}
                    onOk={value => setEndDateFilter(value)}
                    style={{width: 800, marginBottom: 16}}
                    showTime
                />
                <Button onClick={handleFilter} type="primary" style={{marginBottom: 16}}>
                    Применить фильтры
                </Button>
                <Button onClick={handleReset} type="primary" style={{marginBottom: 16}}>
                    Сбросить фильтры
                </Button>
            </div>
            {loading ? ( // Индикация загрузки
                <Spin tip="Загрузка данных..." />
            ) : (
                <Table
                    columns={columns}
                    dataSource={filteredData}
                    rowKey="id" />
            )}
        </div>
    );
};