const username_input = document.getElementById('username');
const phone_input = document.getElementById('phone');
const password_input = document.getElementById('password');
const vldcode_input = document.getElementById('vldcode');
const vld_img = document.getElementById('vld_img');

vld_img.addEventListener("click", function() { refresh_vldimg(); });

function refresh_vldimg() {
    vld_img.src = "/webapi.cgi?do=vldimg&random=" + Math.random();
}

function showMessage(elementId, text) {
    const msgEl = document.getElementById(elementId);
    if (msgEl) {
        msgEl.innerText = text;
    }
}

function clearMessages() {
    ['usernameMsg','phoneMsg','passwordMsg','confirmMsg','termsMsg','vldcodeMsg'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerText = '';
    });
}

function isValidPhone(phone) {
    return /^1\d{10}$/.test(phone);
}

function isValidUsername(username) {
    if (!username) return false;
    // 必须只包含字母和数字
    if (!/^[a-zA-Z0-9]+$/.test(username)) return false;
    // 不能全是数字（即必须至少包含一个字母）
    return /[a-zA-Z]/.test(username);
}

// 构建请求参数
function buildRequestParams(action) {
    const params = new URLSearchParams();
    params.append('do', action);
    params.append('username', username_input.value);
    params.append('password', password_input.value);
    params.append('phone', phone_input.value);
    params.append('vldcode', vldcode_input.value);
    return params;
}

// 发送请求
async function sendRequest(action) {
    const params = buildRequestParams(action);
    
    try {
        const response = await fetch(`/webapi.cgi?${params.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP错误: ${response.status}`);
        }

        const result = await response.json();
        
        if (result.success) {
            return true;
        } else {
            throw new Error(result.reason);
        }
        
        return true;
    } catch (error) {
        if (error.message == "Validate code error") {
            showMessage('vldcodeMsg', '验证码错误');
        } else {
            alert(`失败: ${error.message}`, 'error');
        }
        return false;
    }
}

(function() {
    window.handleRegister = async function(event) {
        event.preventDefault();
        clearMessages();

        const username = document.getElementById('username').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const vldcode = document.getElementById('vldcode').value.trim();
        const password = document.getElementById('password').value;
        const confirmPwd = document.getElementById('confirmPwd').value;
        const agreeTerms = document.getElementById('agreeTerms').checked;

        let isValid = true;

        // 用户名验证 - 新规则
        if (!username) {
            showMessage('usernameMsg', '用户名不能为空');
            isValid = false;
        } else if (!isValidUsername(username)) {
            showMessage('usernameMsg', '用户名只能包含字母和数字，且不能全是数字');
            isValid = false;
        }

        if (phone && !isValidPhone(phone)) {
            showMessage('phoneMsg', '请输入11位有效手机号');
            isValid = false;
        }

        if (!vldcode) {
            showMessage('vldcodeMsg', '请输入验证码');
            isValid = false;
        }

        if (!password) {
            showMessage('passwordMsg', '密码不能为空');
            isValid = false;
        }

        if (password !== confirmPwd) {
            showMessage('confirmMsg', '两次密码不一致');
            isValid = false;
        }

        if (!agreeTerms) {
            showMessage('termsMsg', '请同意协议');
            isValid = false;
        }

        if (isValid) {
            const success = await sendRequest('user_reg');
            if (success) {
                window.location.href = "user_portal.htm";
            }
            refresh_vldimg();
        } else {
            const firstMsg = document.querySelector('.form-message:not(:empty)');
            if (firstMsg) firstMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    // 实时清除错误提示
    document.querySelectorAll('#registerForm input').forEach(input => {
        input.addEventListener('input', function() {
            const parent = this.closest('.form-row');
            if (parent) {
                const msgDiv = parent.querySelector('.form-message');
                if (msgDiv) msgDiv.innerText = '';
            }
        });
    });
    document.getElementById('agreeTerms')?.addEventListener('change', function() {
        document.getElementById('termsMsg').innerText = '';
    });
    document.getElementById('confirmPwd')?.addEventListener('input', function() {
        document.getElementById('confirmMsg').innerText = '';
    });
})();
