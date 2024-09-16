Тестовое задание на позицию Frontend-разработчик

Установка зависимостей - npm install

Запуск проекта - npm start dev

Стек:
- React
- Redux
- TypeScript
- React Router

```bash
  src/
├── entities/            # Сущности
│   └── user/         
├── features/            # Фичи
│   ├── signin/
│   ├── editusers/
│   ├── viewusers/
│   └── header/
├── pages/               # Страницы приложения
│   ├── signin/
│   ├── editusers/
│   └── viewusers/        
├── shared/               # Общие ресурсы (store, ui, local JSON files)
│   ├── db/
│   ├── store/
│   └── ui/             
└── index.tsx            # Точка входа приложения
```
Приложение 
При выполнении тестового задания были выполнены следующие функциональные требования:
* Авторизация пользователя
* Предоставление пользователям полного перечня CRUD-операций в зависимости от роли пользователя
* Предоставление функции фильтрации пользоватей по именам, типам и времени последнего визита

Форма авторизации
<img width="1400" alt="image" src="https://github.com/user-attachments/assets/55d7af22-9e19-4f0d-86ad-a1caa5e16eeb">

Таблица для просмотра пользователей
<img width="1400" alt="image" src="https://github.com/user-attachments/assets/40815285-37ab-45e9-9c5c-c731d2796778">

Таблица редактирования пользователей
<img width="1400" alt="image" src="https://github.com/user-attachments/assets/c7056b10-84cc-4742-9da1-7f7d64d4ef00">

Модальные окна изменения и добавления пользователей
<img width="1400" alt="image" src="https://github.com/user-attachments/assets/9921e2a9-db79-47f6-9bc6-ec8602b321ee">
<img width="1400" alt="image" src="https://github.com/user-attachments/assets/3af77ace-1efa-4166-a3f7-b3c4388aecef">


