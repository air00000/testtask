export interface UserInterface {
    id: number;
    login: string;
    password: string;
    name: string;
    type: UserTypeInterface;
    last_visit_date: Date;
}

export interface UserTypeInterface {
    id: number;
    name: string;
    allow_edit: boolean;
}

export type Body = {
    login: string;
    password: string;
}



