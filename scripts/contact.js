document.addEventListener("DOMContentLoaded", () => {
    // Contact page branch info tabs
    const contactSection = document.querySelector('.contact-section');
    if (contactSection) {
        const branchData = {
            makati: {
                name: "Makati Main Office",
                address: "Rm 213 Makati Executive Center, 114 LP Leviste St., Salcedo Village, Makati City",
                phone: "(632) 8 529-1794 to 95",
                email: "bri_bestlink@globelines.com.ph",
                hours: "Monday - Friday: 8:00 AM - 5:00 PM",
                manager: "Mark Arvin P. Ignacio",
                title: "Chief Executive Officer"
            },
            cavite: {
                name: "Cavite Satellite Office",
                address: "Unit 10 Alpha Arcade Bldg, Gov. Drive, Brgy. Langkaan II, Dasmariñ as, Cavite",
                phone: "(046) 123-4567",
                email: "cavite@bestlink.com.ph",
                hours: "Monday - Saturday: 7:00 AM - 6:00 PM",
                manager: "Jennifer I. Obmasca",
                title: "Sales & Marketing / HR"
            },
            laguna: {
                name: "Laguna Satellite Office",
                address: "Eastland II, 2nd Floor, Unit 7, Brgy. Pulo, Cabuyao City, Laguna",
                phone: "(049) 123-4568",
                email: "laguna@bestlink.com.ph",
                hours: "Monday - Saturday: 7:00 AM - 6:00 PM",
                manager: "Marie C. Villapane",
                title: "Finance & Accounting"
            }
        };

        const renderBranchInfo = (branchKey) => {
            const data = branchData[branchKey];
            const container = document.getElementById('branch-info');
            if (container && data) {
                container.innerHTML = `
                    <div class="branch-contact-card">
                        <h3>${data.name}</h3>
                        <p><i class="fa-solid fa-location-dot"></i> ${data.address}</p>
                        <p><i class="fa-solid fa-phone"></i> ${data.phone}</p>
                        <p><i class="fa-solid fa-envelope"></i> ${data.email}</p>
                        <p><i class="fa-solid fa-clock"></i> ${data.hours}</p>
                        <div class="manager-info">
                            <p class="manager-name">${data.manager}</p>
                            <p class="manager-title">${data.title}</p>
                        </div>
                    </div>
                `;
            }
        };

        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                tabBtns.forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                const branch = e.currentTarget.getAttribute('data-branch');
                renderBranchInfo(branch);
            });
        });

        renderBranchInfo('makati');
    }

    // Contact form submit
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for reaching out! We have received your message and will get back to you within 24-48 hours.');
            contactForm.reset();
        });
    }

    // Chatbot widget (if present)
    const toggleChatBtn = document.getElementById('toggleChat');
    const chatbotWidget = document.getElementById('chatbotWidget');
    const closeChatBtn = document.getElementById('closeChat');
    const sendChatBtn = document.getElementById('sendChat');
    const chatInput = document.getElementById('chatInput');
    const chatBody = document.getElementById('chatBody');
    const faqChips = document.querySelectorAll('.faq-chip');

    if (toggleChatBtn && chatbotWidget && closeChatBtn && sendChatBtn && chatInput && chatBody) {
        toggleChatBtn.addEventListener('click', () => {
            const isHidden = chatbotWidget.style.display === 'none' || chatbotWidget.style.display === '';
            chatbotWidget.style.display = isHidden ? 'flex' : 'none';
            if (isHidden) chatInput.focus();
        });

        closeChatBtn.addEventListener('click', () => {
            chatbotWidget.style.display = 'none';
        });

        const handleSendMessage = (textOverride = null) => {
            const userText = textOverride || chatInput.value.trim();
            if (userText === '') return;

            chatBody.insertAdjacentHTML('beforeend', `<div class="chat-message user-message">${userText}</div>`);
            chatInput.value = '';
            chatBody.scrollTop = chatBody.scrollHeight;

            setTimeout(() => {
                let botReply = "Please check our 'Jobs' tab for specific branch hiring processes, or submit a formal inquiry using the Contact form.";

                const lowerText = userText.toLowerCase();
                if (lowerText.includes('apply') || lowerText.includes('hiring')) {
                    botReply = "To apply, please click the 'Jobs' tab, select your preferred branch (Makati, Cavite, or Laguna), and click 'Apply Now' on your desired role. Ensure you have your digital documents ready!";
                } else if (lowerText.includes('branch') || lowerText.includes('location')) {
                    botReply = "We have three main locations: Our Main Office is in Makati. Our Satellite offices are located in Dasmariñ as, Cavite and Cabuyao, Laguna.";
                }

                chatBody.insertAdjacentHTML('beforeend', `<div class="chat-message bot-message">${botReply}</div>`);
                chatBody.scrollTop = chatBody.scrollHeight;
            }, 800);
        };

        sendChatBtn.addEventListener('click', () => handleSendMessage());
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSendMessage();
        });

        faqChips.forEach(chip => {
            chip.addEventListener('click', (e) => {
                const query = e.target.getAttribute('data-query');
                handleSendMessage(query);
            });
        });
    }
});

