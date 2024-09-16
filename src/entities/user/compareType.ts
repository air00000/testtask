import {UserTypeInterface} from "./UserInterface";

export default function compareType(type_id: number): UserTypeInterface {
    switch(type_id) {
        case 1:
            return {id: 1, name:"Пользователь", allow_edit: false}
        case 2:
            return {id: 2, name:"Администратор", allow_edit: true}
        case 3:
            return {id: 3, name:"Модератор", allow_edit: true}
        case 4:
            return {id: 4, name:"Тестировщик", allow_edit: false}
        case 5:
            return {id: 5, name:"Гость", allow_edit: false}
        default: return {id: 5, name:"Гость", allow_edit: false}
    }
}