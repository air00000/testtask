import React, {useState, useEffect} from 'react';
import {Table, Button, Modal, Form, Input, Select, message} from 'antd';
import {EditOutlined, DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import dayjs from 'dayjs';
import Users from "../../entities/user/Users";
import {UserInterface} from "../../entities/user/UserInterface";
import compareType from "../../entities/user/compareType";


const usersClassInstance = new Users();
const {Option} = Select;

export const EditUsersTable = () => {
    const [users, setUsers] = useState<UserInterface[]>([]);
    const [newUser, setNewUser] = useState<UserInterface>({
        id: 0,
        login: '',
        password: '',
        name: '',
        type: {id: 0, name: '', allow_edit: false},
        last_visit_date: new Date()
    });
    const [editUser, setEditUser] = useState<UserInterface>({
        id: 0,
        login: '',
        password: '',
        name: '',
        type: {id: 0, name: '', allow_edit: false},
        last_visit_date: new Date()
    });
    const [isModalCreateVisible, setIsModalCreateVisible] = useState(false);
    const [isModalEditVisible, setIsModalEditVisible] = useState(false);

    const currentUserId = Number(localStorage.getItem('currentUserId'));
    const currentUserType = Number(localStorage.getItem('currentUserType'));

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
    }, []);

    const saveToLocalStorage = (data: UserInterface[]) => {
        localStorage.setItem('users', JSON.stringify(data));
    };

    const handleCreate = () => {
        const updatedUsers = [...users, {...newUser, last_visit_date: new Date(), id: users.length + 1}];
        setUsers(updatedUsers);
        saveToLocalStorage(updatedUsers);
        message.success('Новый пользователь успешно добавлен');
        setIsModalCreateVisible(false)
    };

    const handleDelete = (id: number) => {
        const updatedUsers = users.filter((user) => user.id !== id);
        setUsers(updatedUsers);
        saveToLocalStorage(updatedUsers);
        message.success('Пользователь успешно удалён');
    };

    const canEditOrDelete = (): boolean => {
        return (currentUserType === 2 || currentUserType === 3);
    };

    const handleEdit = (record: UserInterface) => {
        setEditUser({...record});
        setIsModalEditVisible(true);
    }

    function handleSave() {
        const storedUsers = localStorage.getItem('users');
        if (storedUsers) {
            const users: UserInterface[] = JSON.parse(storedUsers);

            const updatedUsers = users.map(user =>
                user.id === editUser.id ? editUser : user
            );
            console.log(editUser);
            message.success('Пользователь успешно отредактирован');
            saveToLocalStorage(updatedUsers);
            setIsModalEditVisible(false)
        }
    }

    const columns = [
        {
            title: 'Login',
            dataIndex: 'login',
            key: 'login',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'User Type',
            dataIndex: ['type', 'name'],
            key: 'type',
        },
        {
            title: 'Last Visit Date',
            dataIndex: 'last_visit_date',
            key: 'last_visit_date',
            render: (text: Date) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: UserInterface) => (
                <span>
                    <Button
                        icon={<EditOutlined/>}
                        onClick={() => handleEdit(record)}
                        disabled={!(canEditOrDelete) && !(record.id === currentUserId)}
                        style={{marginRight: 8}}
                    />
                    <Button
                        icon={<DeleteOutlined/>}
                        onClick={() => handleDelete(record.id)}
                        disabled={!canEditOrDelete()}
                    />
                </span>
            ),
        },
    ];

    return (
        <div>
            {canEditOrDelete() && (
                <Button
                    icon={<PlusOutlined/>}
                    type="primary"
                    onClick={() => setIsModalCreateVisible(true)}
                    style={{margin: 20}}
                >
                    Добавить пользователя
                </Button>
            )}
            <Table columns={columns} dataSource={users} rowKey="id"/>
            <Modal
                title="Создать пользователя"
                visible={isModalCreateVisible}
                onOk={handleCreate}
                onCancel={() => setIsModalCreateVisible(false)}
            >
                <Form layout="vertical">
                    <Form.Item label="Имя" required>
                        <Input
                            value={newUser.name}
                            onChange={(e) =>
                                setNewUser(prev => ({...prev, name: e.target.value}))
                            }
                        />
                    </Form.Item>
                    <Form.Item label="Логин" required>
                        <Input
                            value={newUser.login}
                            onChange={(e) =>
                                setNewUser(prev => ({ ...prev, login: e.target.value }))
                            }
                        />
                    </Form.Item>
                    <Form.Item label="Пароль" required>
                        <Input.Password
                            value={newUser.password}
                            onChange={(e) =>
                                setNewUser(prev => ({...prev, password: e.target.value}))
                            }
                        />
                    </Form.Item>
                    <Form.Item label="Тип пользователя" required>
                        <Select
                            value={newUser.type.id}
                            onChange={(value) =>
                                setNewUser(prev => ({...prev, type: compareType(value)}))
                            }
                        >
                            <Option value={1}>Пользователь</Option>
                            <Option value={2}>Администратор</Option>
                            <Option value={3}>Модератор</Option>
                            <Option value={4}>Тестировщик</Option>
                            <Option value={5}>Гость</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="Редактировать пользователя"
                visible={isModalEditVisible}
                onOk={handleSave}
                onCancel={() => setIsModalEditVisible(false)}
            >
                <Form layout="vertical">
                    <Form.Item label="Имя" required>
                        <Input
                            value={editUser.name}
                            onChange={(e) =>
                                setEditUser(prev => ({...prev, name: e.target.value}))
                            }
                        />
                    </Form.Item>
                    <Form.Item label="Логин" required>
                        <Input
                            value={editUser.login}
                            onChange={(e) =>
                                setEditUser(prev => ({...prev, login: e.target.value}))
                            }
                        />
                    </Form.Item>
                    <Form.Item label="Пароль" required>
                        <Input.Password
                            value={editUser.password}
                            onChange={(e) =>
                                setEditUser(prev => ({...prev, password: e.target.value}))
                            }
                        />
                    </Form.Item>
                    <Form.Item label="Тип пользователя" required>
                        <Select
                            value={editUser.type.id}
                            onChange={(value) =>
                                setEditUser(prev => ({...prev, type: compareType(value)}))
                            }
                        >
                            <Option value={1}>Пользователь</Option>
                            <Option value={2}>Администратор</Option>
                            <Option value={3}>Модератор</Option>
                            <Option value={4}>Тестировщик</Option>
                            <Option value={5}>Гость</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};
