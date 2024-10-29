window.onload = function() {
    const user = JSON.parse(localStorage.getItem('user'));
    const headerContainer = document.getElementById('header-container');
    
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            headerContainer.innerHTML = data;

            // Убедитесь, что элементы загружены, прежде чем пытаться их обновить
            if (user) {
                displayAccountInfo(user);
            }
        })
        .catch(error => console.error('Ошибка загрузки header.html:', error));
};

function displayAccountInfo(user) {
    // Убедитесь, что элементы существуют
    const loggedOutHeader = document.getElementById('header-logged-out');
    const loggedInHeader = document.getElementById('header-logged-in');
    
    if (loggedOutHeader && loggedInHeader) {
        loggedOutHeader.style.display = 'none';
        loggedInHeader.style.display = 'block';
    }

    // Обновляем информацию о пользователе
    const usernameElement = document.getElementById('username');
    const avatarElement = document.getElementById('avatar');

    if (usernameElement && avatarElement) {
        usernameElement.innerText = user.username;
        avatarElement.src = user.avatar_url; // Используйте src для изображения
    }

    // Добавляем обработчик события для кнопки выхода
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('user');
            location.reload(); // Перезагрузить страницу
        });
    }
}
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/index.html')); // или другой HTML файл, который вы хотите вернуть
});