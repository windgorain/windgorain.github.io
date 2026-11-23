    const toolbar = document.getElementById('toolbar');

    toolbar.innerHTML = `
    <!-- 头部导航 -->
    <header>
        <div class="container header-container">
            <div class="logo">
                <span>VNMesh</span>
            </div>
            
            <!-- 桌面端导航 -->
            <nav class="desktop-nav">
                <ul>
                    <li><a href="/">首页</a></li>
                    <li><a href="/traversal/index.htm">内网穿透</a></li>
                    <li><a href="/mgw/index.htm">MGW</a></li>
                    <li><a href="/klc/index.htm">KLC</a></li>
                </ul>
            </nav>

            <nav class="desktop-nav">
                <ul>
                    <li> <a href="/traversal/user/user_reg.htm" style="color:#aa0000;">免费注册</a> </li>
                </ul>
            </nav>

            <!-- 移动端汉堡菜单按钮 -->
            <button class="mobile-menu-toggle" id="mobileMenuToggle" aria-label="菜单">
                <i class="fas fa-bars" id="menuIcon"></i>
            </button>
        </div>
        
        <!-- 移动端导航菜单 -->
        <nav class="mobile-nav" id="mobileNav">
            <ul>
                <li><a href="/">首页</a></li>
                <li><a href="/traversal/index.htm">内网穿透</a></li>
                <li><a href="/mgw/index.htm">MGW</a></li>
                <li><a href="/klc/index.htm">KLC</a></li>
                <a href="/traversal/user/user_reg.htm" class="cta-button" style="color:white;">注册</a>
            </ul>
        </nav>
    </header>

    <!-- 主题切换按钮 -->
    <button class="theme-toggle" id="themeToggle" aria-label="切换主题">
        <i class="fas fa-moon" id="themeIcon"></i>
    </button>
    `

