const token = localStorage.getItem('token'); // JWT del usuario
const chatListDiv = document.getElementById('chat-list');
const chatBox = document.getElementById('chat-box');
const formChat = document.getElementById('form-chat');
const inputMensaje = document.getElementById('mensaje');
const chatHeader = document.getElementById('chat-header');
const createChatBtn = document.getElementById('create-chat-btn');

let currentChatId = null;

// Función para renderizar un mensaje
const renderMessage = (msg, sender) => {
  const div = document.createElement('div');
  div.classList.add(sender === 'me' ? 'text-right' : 'text-left', 'mb-2');
  div.innerHTML = `<span class="px-3 py-2 rounded-lg ${sender === 'me' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'}">${msg}</span>`;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
};

// Cargar chats del usuario
const loadChats = async () => {
  try {
    const res = await fetch('http://localhost:4000/api/chats', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const chats = await res.json();
    chatListDiv.innerHTML = '';
    chats.forEach(chat => {
      const div = document.createElement('div');
      div.textContent = chat.name || `Chat #${chat.id_chat}`;
      div.classList.add('p-2', 'rounded-lg', 'cursor-pointer', 'hover:bg-gray-200');
      div.addEventListener('click', () => selectChat(chat));
      chatListDiv.appendChild(div);
    });
  } catch (error) {
    console.error('Error cargando chats:', error);
  }
};

// Seleccionar chat
const selectChat = async (chat) => {
  currentChatId = chat.id_chat;
  chatHeader.textContent = chat.name || `Chat #${chat.id_chat}`;
  await loadMessages(chat.id_chat);
};

// Cargar mensajes de un chat
async function loadMessages(chatId) {
  try {
    const res = await fetch(`http://localhost:4000/api/messages/${chatId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    if (!res.ok) {
      // Manejo de errores HTTP
      if (res.status === 404) {
        console.warn("Chat no encontrado o sin mensajes");
      } else {
        console.error("Error al cargar mensajes:", res.status, res.statusText);
      }
      return;
    }

    const messages = await res.json();

    if (!Array.isArray(messages)) {
      console.error("La respuesta no es un array de mensajes", messages);
      return;
    }

    const app = document.getElementById("app");
    app.innerHTML = ""; // Limpiamos mensajes anteriores

    messages.forEach(msg => {
      const msgDiv = document.createElement("div");
      msgDiv.classList.add("message");
      msgDiv.innerHTML = `<strong>${msg.name}:</strong> ${msg.content}`;
      app.appendChild(msgDiv);
    });

  } catch (err) {
    console.error("Error cargando mensajes:", err);
  }
}

// Uso
// loadMessages(1); // Pasar el id del chat


// Crear chat nuevo
createChatBtn.addEventListener('click', async () => {
  const name = prompt('Nombre del chat:');
  if (!name) return;
  try {
    const res = await fetch('http://localhost:4000/api/chats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ name, type: 'private' })
    });
    const data = await res.json();
    loadChats();
  } catch (error) {
    console.error('Error creando chat:', error);
  }
});

// Enviar mensaje
formChat.addEventListener('submit', async (e) => {
  e.preventDefault();
  const content = inputMensaje.value.trim();
  if (!content || !currentChatId) return;

  renderMessage(content, 'me');
  inputMensaje.value = '';

  try {
    await fetch("http://localhost:4000/api/messages", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ id_chat: currentChatId, content })
    });

    await loadMessages(currentChatId);
  } catch (error) {
    console.error('Error enviando mensaje:', error);
  }
});

// Cargar chats al inicio
loadChats();
