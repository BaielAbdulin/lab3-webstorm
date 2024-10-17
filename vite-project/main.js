import axios from 'axios'; // Импортируем axios

let posts = []; // Массив для хранения постов

// TODO: Функция для загрузки постов с сервера
async function getPosts() {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        posts = response.data; // Загружаем данные в массив
        displayPosts(); // Обновляем отображение постов
    } catch (error) {
        console.error('Error loading posts:', error);
    }
}

// TODO: Функция для отображения постов в таблице
function displayPosts() {
    const tableBody = document.querySelector('#post-table-body');
    tableBody.innerHTML = ''; // Очищаем таблицу перед обновлением
    posts.forEach((post) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${post.id}</td>
            <td>${post.userId}</td>
            <td>${post.title}</td>
            <td>${post.body}</td>
            <td>
                <button class="btn btn-warning edit-btn" data-id="${post.id}">Edit</button>
                <button class="btn btn-danger delete-btn" data-id="${post.id}">Delete</button>
            </td>
        `;
        tableBody.appendChild(row); // Добавляем строку в конец таблицы
    });
}

// TODO: Функция для добавления нового поста
async function addPost() {
    const newPost = {
        userId: 1,
        title: `New Post ${posts.length + 1}`, // Уникальный заголовок для нового поста
        body: 'This is a new post', // Тело нового поста
    };

    try {
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
        posts.unshift(response.data); // Добавляем новый пост в начало массива
        displayPosts(); // Обновляем отображение постов
    } catch (error) {
        console.error('Error adding post:', error);
    }
}

// TODO: Функция для редактирования поста
async function editPost(postId) {
    const postIndex = posts.findIndex(p => p.id === postId); // Найдем индекс поста
    if (postIndex !== -1) {
        const post = posts[postIndex]; // Получаем пост по индексу
        const newTitle = prompt('Edit title:', post.title);
        const newBody = prompt('Edit body:', post.body);
        if (newTitle !== null) post.title = newTitle;
        if (newBody !== null) post.body = newBody;

        try {
            await axios.put(`https://jsonplaceholder.typicode.com/posts/${postId}`, post);
            posts[postIndex] = post; // Обновляем массив с измененным постом
            displayPosts(); // Обновляем отображение постов
        } catch (error) {
            console.error('Error editing post:', error);
        }
    }
}

// TODO: Функция для удаления поста
async function deletePost(postId) {
    try {
        await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        posts = posts.filter(p => p.id !== postId);
        displayPosts(); // Обновляем отображение постов
    } catch (error) {
        console.error('Error deleting post:', error);
    }
}

// TODO: Делегирование событий для всех кнопок
document.addEventListener('click', (event) => {
    if (event.target.id === 'addPostButton') {
        addPost(); // Вызов функции добавления поста
    } else if (event.target.classList.contains('edit-btn')) {
        const postId = parseInt(event.target.getAttribute('data-id'));
        editPost(postId); // Вызов функции редактирования поста
    } else if (event.target.classList.contains('delete-btn')) {
        const postId = parseInt(event.target.getAttribute('data-id'));
        deletePost(postId); // Вызов функции удаления поста
    }
});

// TODO: Изначально загружаем посты
getPosts();