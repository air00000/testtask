import usersData from '../../shared/db/Users.json';
import userTypesData from '../../shared/db/UserTypes.json';
import { UserInterface, UserTypeInterface } from "./UserInterface";

export default class Users {
    public users: UserInterface[];

    constructor() {
        this.users = this.initializeUsers();
    }

    private initializeUsers(): UserInterface[] {
        const userTypesMap = this.initializeTypes();

        return usersData.map(user => ({
            id: user.id,
            login: user.login,
            password: user.password,
            name: user.name,
            last_visit_date: new Date(user.last_visit_date),
            type: {
                id: user.type_id,
                name: userTypesMap[user.type_id]?.name || 'Неизвестный тип',
                allow_edit: userTypesMap[user.type_id]?.allow_edit || false
            }
        }));
    }

    private initializeTypes(): { [key: number]: UserTypeInterface } {
        return userTypesData.reduce((acc, userType) => {
            acc[userType.id] = {
                id: userType.id,
                name: userType.name,
                allow_edit: userType.allow_edit
            };
            return acc;
        }, {} as { [key: number]: UserTypeInterface });
    }

    public getUsers(name = '', type = 0, dateAfter = '', dateBefore = ''): UserInterface[] {
        let filteredUsers = this.users; // Используем отдельную переменную для фильтрации

        if (name) {
            filteredUsers = filteredUsers.filter(item => item.name === name);
        }
        if (type) {
            filteredUsers = filteredUsers.filter(item => item.type.id === type);
        }
        if (dateAfter) {
            filteredUsers = filteredUsers.filter(item => new Date(dateAfter) < item.last_visit_date);
        }
        if (dateBefore) {
            filteredUsers = filteredUsers.filter(item => new Date(dateBefore) > item.last_visit_date);
        }
        return filteredUsers;
    }

    public getAllUsers(): UserInterface[] {
        return this.users;
    }
}

