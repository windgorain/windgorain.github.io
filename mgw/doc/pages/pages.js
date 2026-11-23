const CURRENT_PAGE_ID = current_id;
let pageList = [
        { id: "what_is_mgw", title: "MGW是什么" },
        { id: "mgw_class", title: "组件类型" },
        { id: "mgw_cmd", title: "MGW命令" },
        { id: "tree_instance", title: "tree instance" },
        { id: "show_instance", title: "show instance" },
        { id: "show_statics", title: "show statics" },
        { id: "show_attr", title: "show attr" },
        { id: "show_slot", title: "show slot" },
        { id: "show_vslot", title: "show vslot" },
        { id: "load_instance", title: "load instance" },
        { id: "unload_instance", title: "unload instance" },
        { id: "unload_all_instance", title: "unload all-instance" },
        { id: "attach_xdp", title: "attach xdp" },
        { id: "detach_xdp", title: "detach xdp" },
        { id: "attach_tc", title: "attach tc" },
        { id: "attach_instance", title: "attach instance" },
        { id: "detach_instance", title: "detach instance" },
        { id: "detach_all_instance", title: "detach all-instance" },
        { id: "enable_instance", title: "enable instance" },
        { id: "disable_instance", title: "disable instance" },
        { id: "enable_all", title: "enable all" },
        { id: "disable_all", title: "disable all" },
        { id: "mgw_ip_cluster", title: "ip_cluster" },
        { id: "mgw_vni_cluster", title: "vni_cluster" },
        { id: "mgw_sip_traffic", title: "sip_traffic" },
        { id: "mgw_dip_traffic", title: "dip_traffic" },
        { id: "mgw_sport_traffic", title: "sport_traffic" },
        { id: "mgw_dport_traffic", title: "dport_traffic" },
        { id: "mgw_ip_protocol_traffic", title: "ip_protocol_traffic" },
        { id: "mgw_vni_traffic", title: "vni_traffic" },
        { id: "mgw_and_traffic", title: "and_traffic" },
        { id: "mgw_or_traffic", title: "or_traffic" },
        { id: "mgw_cpu_traffic", title: "cpu_traffic" },
        { id: "mgw_triode_traffic", title: "triode_traffic" },
        { id: "mgw_ttriode_traffic", title: "ttriode_traffic" },
        { id: "mgw_flowmatch_traffic", title: "flowmatch_traffic" },
        { id: "mgw_pass_pipe", title: "pass_pipe" },
        { id: "mgw_drop_pipe", title: "drop_pipe" },
        { id: "mgw_not_pipe", title: "not_pipe" },
        { id: "mgw_setret_pipe", title: "setret_pipe" },
        { id: "mgw_setdscp_pipe", title: "setdscp_pipe" },
        { id: "mgw_ppslimit_pipe", title: "ppslimit_pipe" },
        { id: "mgw_ppslimit_pipe", title: "ppslimit_pipe" },
        { id: "mgw_simple_encrypt_pipe", title: "simple_encrypt_pipe" },
        { id: "mgw_ip_printer_leaf", title: "ip_printer_leaf" },
        { id: "mgw_drop_leaf", title: "drop_leaf" },
        { id: "mgw_drop_syn_leaf", title: "drop_syn_leaf" },
        { id: "mgw_pass_syn_leaf", title: "pass_syn_leaf" },
        { id: "mgw_ethtx_leaf", title: "ethtx_leaf" },
        { id: "mgw_iptx_leaf", title: "iptx_leaf" },
        { id: "mgw_setdscp_leaf", title: "setdscp_leaf" },
        { id: "mgw_ip_acl_leaf", title: "ip_acl_leaf" },
        { id: "mgw_url_filter_leaf", title: "url_filter_leaf" },
        { id: "mgw_lua_leaf", title: "lua_leaf" },
        { id: "mgw_xdp_event_leaf", title: "xdp_event_leaf" },
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
    navigateTo('what_is_mgw');
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

