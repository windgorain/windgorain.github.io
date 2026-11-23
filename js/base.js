// 主题管理 - 修复手动切换问题
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// 检查本地存储的主题偏好
let currentTheme = localStorage.getItem('theme');

// 如果没有本地存储，使用系统偏好
if (!currentTheme) {
    currentTheme = prefersDarkScheme.matches ? 'dark' : 'light';
}

// 应用主题
function applyTheme(theme) {
    // 移除现有的主题类
    document.body.classList.remove('light-theme', 'dark-theme');
    
    // 添加新的主题类
    document.body.classList.add(theme + '-theme');
    
    // 保存到本地存储
    localStorage.setItem('theme', theme);
    currentTheme = theme;
    
    // 更新图标
    updateThemeIcon(theme);
}

// 更新主题图标
function updateThemeIcon(theme) {
    if (theme === 'dark') {
        if (themeIcon) { themeIcon.className = 'fas fa-moon'; }
    } else {
        if (themeIcon) { themeIcon.className = 'fas fa-sun'; }
    }
}

// 切换主题
function toggleTheme() {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
}

// 初始化主题
applyTheme(currentTheme);

// 监听系统主题变化
prefersDarkScheme.addEventListener('change', (e) => {
    // 只有在没有手动设置主题时才跟随系统
    if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        applyTheme(newTheme);
    }
});

// 主题切换按钮事件
if (themeToggle) { themeToggle.addEventListener('click', toggleTheme); }

// 移动端菜单功能
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileNav = document.getElementById('mobileNav');
const menuIcon = document.getElementById('menuIcon');

// 切换移动菜单
function toggleMobileMenu() {
    mobileNav.classList.toggle('active');
    
    // 切换汉堡菜单图标
    if (mobileNav.classList.contains('active')) {
        menuIcon.className = 'fas fa-times';
        // 禁止背景滚动
        document.body.style.overflow = 'hidden';
        // 提高汉堡按钮的z-index
        mobileMenuToggle.style.zIndex = '1002';
    } else {
        menuIcon.className = 'fas fa-bars';
        // 恢复背景滚动
        document.body.style.overflow = '';
        // 恢复汉堡按钮的z-index
        mobileMenuToggle.style.zIndex = '1001';
    }
}

// 点击汉堡菜单按钮
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function(e) {
        e.stopPropagation(); // 防止事件冒泡
        toggleMobileMenu();
    });
}

// 点击移动菜单中的链接时关闭菜单
if (mobileNav) {
    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            menuIcon.className = 'fas fa-bars';
            document.body.style.overflow = '';
            mobileMenuToggle.style.zIndex = '1001';
        });
    });
}

// 点击页面其他区域时关闭移动菜单
document.addEventListener('click', (e) => {
    if ((mobileNav) && (!mobileNav.contains(e.target) && !mobileMenuToggle.contains(e.target))) {
        if (mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
            menuIcon.className = 'fas fa-bars';
            document.body.style.overflow = '';
            mobileMenuToggle.style.zIndex = '1001';
        }
    }
});

// 窗口大小变化时，如果切换到桌面端，确保移动菜单关闭
window.addEventListener('resize', function() {
    if (window.innerWidth > 992) {
        if (mobileNav && mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
            menuIcon.className = 'fas fa-bars';
            document.body.style.overflow = '';
            mobileMenuToggle.style.zIndex = '1001';
        }
    }
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// 头部导航滚动效果
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backdropFilter = 'none';
    }
});

