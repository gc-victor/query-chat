const messageForm = document.getElementById('message-form');
const messagesContainer = document.getElementById('messages-container');

messagesContainer.scrollTop = messagesContainer.scrollHeight;

messageForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
        const res = await fetch(messageForm.action, {
            method: "POST",
            body: new FormData(messageForm)
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        messageForm.reset();
    } catch (error) {
        console.error("Error submitting form:", error);
    }
});

let lastModified = null;

const href = window.location.href;
const source = new EventSource(`${window.location.origin}/hot-reload?href=${href}`);

source.onmessage = (event) => {
    const newLastModified = event.data;

    if (lastModified && lastModified !== newLastModified) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(JSON.parse(event.data).html, 'text/html');
        const newMessagesContainer = doc.querySelector('#messages-container');

        messagesContainer.replaceChildren(...newMessagesContainer.children);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    lastModified = newLastModified;
};
