onload = () =>{
        document.body.classList.remove("container");
};

// Если этот скрипт подключён на стартовой/первой сцене — перенаправляем
// на `scene2.html` через 10 секунд. (Исправлено: раньше был лишний редирект на end.)
if (location.pathname.endsWith('scene1.html') || location.pathname.endsWith('/') || location.pathname.endsWith('index.html')){
    setTimeout(() => {
        window.location.href = "scene2.html";
    }, 10000); // 10 секунд
}