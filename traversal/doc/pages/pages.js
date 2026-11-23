const CURRENT_PAGE_ID = current_id;
let pageList = [
        { id: "what_is_vnmesh", title: "什么是VNMesh" },
        { id: "why_vnmesh", title: "为什么开发VNMesh" },
        { id: "vnmesh_advantage", title: "VNMesh的优势" },
        { id: "fast_start", title: "快速开始" },
        { id: "install_os", title: "安装VNMesh" },
        { id: "run_vnmesh", title: "运行方式" },
        { id: "how_to_config_client", title: "如何配置客户端" },
        { id: "quit_vnmesh", title: "关闭VNMesh" },
        { id: "user_login", title: "用户登录" },
        { id: "sec_config", title: "安全配置" },
        { id: "neighbor", title: "在线设备" },
        { id: "session", title: "会话" },
        { id: "public_node", title: "公网节点" },
        { id: "domain_map", title: "域名映射" },
        { id: "domain_map_multi_active", title: "域名映射的灾备多活" },
        { id: "domain_verify", title: "域名所有权验证" },
        { id: "tcp_port_map", title: "TCP端口映射" },
        { id: "dev_map", title: "设备映射" },
        { id: "dev_door", title: "设备门禁" },
        { id: "user_mng", title: "用户管理" },
        { id: "self_server_verify", title: "自建服务器认证码" },
        { id: "self_server", title: "自建服务器" },
        { id: "ipacl", title: "IPACL" },
        { id: "ip_group", title: "地址组" },
        { id: "port_group", title: "端口组" },
        { id: "test_perf_dev_map", title: "设备映射性能测试报告" },
    ];

// 获取上一篇/下一篇
function getPrevNext() {
    const list = pageList;
    const index = list.findIndex(p => p.id === CURRENT_PAGE_ID);
    return {
        prev: index > 0 ? list[index - 1] : null,
        next: index < list.length - 1 ? list[index + 1] : null
    };
}

// 跳转页面（通知父框架）
function navigateTo(pageId) {
    window.parent.postMessage({ type: 'nav', page: pageId }, '*');
}

function goHome() {
    navigateTo('what_is_vnmesh');
}

// 渲染导航
function renderNav() {
    const { prev, next } = getPrevNext();
    const prevLink = document.getElementById('prevLink');
    const nextLink = document.getElementById('nextLink');
    
    if (prevLink) {
        if (prev) {
            prevLink.textContent = `← ${prev.title}`;
            prevLink.onclick = () => navigateTo(prev.id);
        } else {
            prevLink.textContent = '无';
            prevLink.style.color = '#cbd5e1';
            prevLink.style.cursor = 'default';
            prevLink.onclick = null;
        }
    }
    
    if (nextLink) {
        if (next) {
            nextLink.textContent = `${next.title} →`;
            nextLink.onclick = () => navigateTo(next.id);
        } else {
            nextLink.textContent = '无';
            nextLink.style.color = '#cbd5e1';
            nextLink.style.cursor = 'default';
            nextLink.onclick = null;
        }
    }
}

renderNav();

