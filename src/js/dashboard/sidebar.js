const body = document.querySelector('body'),
    modeToggle = body.querySelector('.mode-toggle');
    sidebar = body.querySelector('nav');
    sidebarToggle = body.querySelector('.sidebar-toggle');
    const arrowRotated = document.getElementById('rotated');

let getMode = localStorage.getItem('mode');
if (getMode && getMode === 'dark') {
    body.classList.toggle('dark');
}

let getStatus = localStorage.getItem('status');
if (getStatus && getStatus === 'close') {
    sidebar.classList.toggle('close');
    arrowRotated.classList.add('rotated-element');
}

modeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    if (body.classList.contains('dark')) {
        localStorage.setItem('mode', 'dark');
    } else {
        localStorage.setItem('mode', 'light');
    }
});

sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('close');
    if (sidebar.classList.contains('close')) {
        localStorage.setItem('status', 'close');
        arrowRotated.classList.add('rotated-element');
    } else {
        localStorage.setItem('status', 'open');
        arrowRotated.classList.remove('rotated-element');
    }
});
