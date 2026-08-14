export function initNavBar() {
    const toggle = document.querySelector('.topnav .icon');
    const menu = document.getElementById('myLinks');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', (event) => {
        event.preventDefault();
        const isOpen = menu.style.display === 'block';
        menu.style.display = isOpen ? 'none' : 'block';
    });
}

