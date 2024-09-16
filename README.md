Тестовое задание на позицию Frontend-разработчик

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



![Описание скриншота]((https://github.com/user-attachments/assets/e78d7512-b1d7-4616-a536-17473195ecb4))
<figcaption align="center">Форма авторизации</figcaption>

Таблица для просмотра пользователей
<img width="1412" alt="image" src="https://github.com/user-attachments/assets/40815285-37ab-45e9-9c5c-c731d2796778">

Таблица редактирования пользователей
<img width="1410" alt="image" src="https://github.com/user-attachments/assets/c7056b10-84cc-4742-9da1-7f7d64d4ef00">

Модальные окна изменения и добавления пользователей
<img width="546" alt="image" src="https://github.com/user-attachments/assets/16a95a08-f5bc-4ae7-8a09-dd6547dac42f"> <img width="545" alt="image" src="https://github.com/user-attachments/assets/5d1b4e4e-b4c9-4ad0-b8cf-21c604eb1e0d">

