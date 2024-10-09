document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages');
    const messageForm = document.getElementById('message-form');
    const messageInput = document.getElementById('message-input');

    async function fetchMessages() {
        const response = await fetch('/api/messages');
        const messages = await response.json();
        renderMessages(messages);
    }

    async function sendMessage(text) {
        const response = await fetch('/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text, sent: true }),
        });
        return response.json();
    }

    function renderMessages(messages) {
        chatMessages.innerHTML = '';
        for (const message of messages) {
            const messageElement = document.createElement('div');
            messageElement.classList.add('message', message.sent ? 'message-sent' : 'message-received');
            messageElement.innerHTML = `
                <p class="text-sm">${message.text}</p>
                <p class="message-time">${new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            `;
            chatMessages.appendChild(messageElement);
        }
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    messageForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(messageForm);
        const res = await fetch(`${this.action}`, { method: "POST", body: formData });

        if (res.ok) {
            if (res.status > 400) {
                // TODO: Handle error
            }

            // TODO: Handle success
        }
    });

    // Initial fetch of messages
    fetchMessages();

    // Poll for new messages every 5 seconds
    setInterval(fetchMessages, 5000);
});