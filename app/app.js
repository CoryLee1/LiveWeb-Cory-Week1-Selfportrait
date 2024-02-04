// 使用 socket.io 客户端库连接到 WebSocket 服务器
const socket = io('ws://localhost:3500');

// 定义一个发送消息的函数，它将在表单提交时被调用
function sendMessage(e) {
    // 阻止表单的默认提交行为，这样页面不会刷新
    e.preventDefault();

    // 选取页面上的 input 元素
    const input = document.querySelector('input');

    // 检查 input 是否有值，如果有，则通过 socket 发送消息
    if (input.value) {
        socket.emit('message', input.value); // 通过 socket 发送消息，事件名为 'message'
        input.value = ""; // 发送后清空 input
    }

    // 让 input 元素重新获得焦点，以便用户可以继续输入
    input.focus();
}

// 为页面上的 form 元素添加 submit 事件监听器
document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('textForm');
    form.addEventListener('submit', sendMessage);
});
// 修改 createMarquee 函数以接收消息作为参数
function createMarquee(message) {
    var marqueeContainer = document.getElementById('marqueeContainer');

    // 创建 marquee 元素
    var marquee = document.createElement('marquee');
    marquee.textContent = message; // 使用接收到的消息作为文本

    // 可以在这里添加更多的 marquee 属性，比如滚动速度、方向等
    marquee.style.position = 'absolute';
    marquee.style.top = Math.random() * window.innerHeight + 'px';
    marquee.style.left = Math.random() * window.innerWidth + 'px';

    // 将 marquee 元素添加到页面中
    marqueeContainer.appendChild(marquee);
}

// 监听来自服务器的消息
socket.on("message", (data) => {
    // 使用接收到的数据调用 createMarquee 函数，而不是创建 li 元素
    createMarquee(data);
});
