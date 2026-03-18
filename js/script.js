document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Navbar Scroll Effect
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        navbar.classList.add('shadow-md', 'bg-white/95');
        navbar.classList.replace('py-3', 'py-2');
      } else {
        navbar.classList.remove('shadow-md', 'bg-white/95');
        navbar.classList.replace('py-2', 'py-3');
      }
    });
  }

  // Initialize AOS (Optimized for Performance)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 500,  // Fast duration to avoid perceived lag
      once: true,     // Only animate once
      offset: 50,     // Start earlier
      easing: 'ease-out'
    });
  }
  // Floating Chatbot Logic
  const chatbotToggle = document.getElementById('chatbot-toggle');
  const chatbotModal = document.getElementById('chatbot-modal');
  const closeChat = document.getElementById('close-chat');
  const chatInput = document.getElementById('chat-input');
  const sendChat = document.getElementById('send-chat');
  const chatMessages = document.getElementById('chat-messages');

  if (chatbotToggle && chatbotModal && closeChat) {
    const notifyDot = chatbotToggle.querySelector('.notification-dot');
    
    chatbotToggle.addEventListener('click', () => {
      chatbotModal.classList.toggle('scale-100');
      chatbotModal.classList.toggle('translate-y-0');
      chatbotModal.classList.toggle('opacity-100');
      if (notifyDot) notifyDot.style.display = 'none';
      if (chatInput) chatInput.focus();
    });

    closeChat.addEventListener('click', () => {
      chatbotModal.classList.remove('scale-100', 'translate-y-0', 'opacity-100');
    });

    const addMessage = (msg, isUser = false) => {
      const msgDiv = document.createElement('div');
      msgDiv.className = `p-4 rounded-2xl shadow-sm mb-4 border border-gray-100 max-w-[85%] text-sm ${
        isUser ? 'ml-auto bg-primary text-white text-right' : 'bg-white text-gray-600 font-light leading-relaxed'
      }`;
      msgDiv.innerHTML = `<p>${msg}</p>`;
      chatMessages.appendChild(msgDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const handleChat = () => {
      const msg = chatInput.value.trim();
      if (!msg) return;
      addMessage(msg, true);
      chatInput.value = '';
      
      // Basic automation
      setTimeout(() => {
        addMessage("Thanks for your message! Our engineering team is reviewing your inquiry. For an immediate quote, please use the WhatsApp Quick Connect button.");
      }, 1000);
    };

    if (sendChat) sendChat.addEventListener('click', handleChat);
    if (chatInput) {
      chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleChat();
      });
    }
  }
});
