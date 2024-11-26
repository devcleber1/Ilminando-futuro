// Carrossel
const carousel = document.querySelector('.carousel-container');
const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let currentSlide = 0;

function updateCarousel() {
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateCarousel();
}

prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// Auto-play do carrossel
let autoplayInterval = setInterval(nextSlide, 5000);

function openModal() {
    document.getElementById('donationModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('donationModal').style.display = 'none';
}

// Fecha o modal ao clicar fora do conteúdo
window.onclick = function(event) {
    const modal = document.getElementById('donationModal');
    if (event.target === modal) {
        closeModal();
    }
};

function copyPixKey() {
    // Seleciona o parágrafo que contém a chave Pix
    const pixKey = document.querySelector(".pix-info p");

    if (!pixKey) {
        console.error("Chave Pix não encontrada!");
        return;
    }

    // Cria um elemento input temporário para copiar o texto
    const tempInput = document.createElement("input");
    tempInput.value = pixKey.innerText.replace("Chave Pix: ", ""); // Remove o "Chave Pix: " do texto
    document.body.appendChild(tempInput);

    // Seleciona o conteúdo do input temporário
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); // Para dispositivos móveis

    // Tenta copiar o texto para a área de transferência
    try {
        const successful = document.execCommand("copy");
        if (successful) {
            showCopyNotification("Chave Pix copiada com sucesso!");
        } else {
            showCopyNotification("Falha ao copiar a chave Pix.");
        }
    } catch (err) {
        console.error("Erro ao copiar a chave Pix: ", err);
        showCopyNotification("Erro ao copiar a chave Pix.");
    }

    // Remove o input temporário
    document.body.removeChild(tempInput);
}

// Função para mostrar a notificação
function showCopyNotification(message) {
    const notification = document.createElement("div");
    notification.classList.add("copy-notification");
    notification.innerText = message;

    document.body.appendChild(notification);

    // Remover a notificação após 2 segundos
    setTimeout(() => {
        notification.remove();
    }, 2000);
}


// Inicializando o EmailJS com seu userID
(function() {
    emailjs.init("CNl5XnNQQ79jCbrag");  
})();

// Função que envia o formulário via email usando o EmailJS
document.getElementById('volunteerForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Impede o envio padrão do formulário

    // Obtém os valores dos campos do formulário
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const area = document.getElementById('area').value;
    const message = document.getElementById('message').value;

    // Envia o formulário com os dados coletados
    emailjs.send("service_jpu7pto", "template_x90kf6r", {
        from_name: name,
        from_email: email,
        phone: phone,
        area_of_interest: area,
        message: message
    })
    .then(function(response) {
        console.log('Sucesso:', response);
        showCopyNotification("Formulário enviado com sucesso!");  // Notificação de sucesso
        
        // Limpar o formulário após envio
        document.getElementById('volunteerForm').reset();  // Limpa os campos do formulário
    }, function(error) {
        console.error('Erro:', error);
        showCopyNotification("Falha ao enviar o formulário.");  // Notificação de erro
    });
});


// Inicializando o EmailJS com seu userID
document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("CNl5XnNQQ79jCbrag");

    const pickupField = document.getElementById("pickup");
    const addressGroup = document.getElementById("addressGroup");

    // Mostra ou esconde o campo de endereço com base na seleção do pickup
    pickupField.addEventListener("change", function () {
        if (pickupField.value === "sim") {
            addressGroup.style.display = "block"; // Exibe o campo de endereço
        } else {
            addressGroup.style.display = "none"; // Esconde o campo de endereço
        }
    });

    document.getElementById("donationForm").addEventListener("submit", function (event) {
        event.preventDefault();

        // Coleta os valores dos campos
        const name = document.getElementById("named").value;
        const email = document.getElementById("emaild").value;
        const material = document.getElementById("material").value;
        const pickup = document.getElementById("pickup").value;
        const address = document.getElementById("address").value; // Campo de endereço

        // Verifica os valores no console
        console.log({
            from_name: name,
            from_email: email,
            materials_for_donation: material,
            pickup_needed: pickup,
            pickup_address: pickup === "sim" ? address : "Não aplicável", // Inclui endereço apenas se necessário
        });

        // Envia o formulário
        emailjs
            .send("service_jpu7pto", "template_kbk2zei", {
                from_name: name,
                from_email: email,
                materials_for_donation: material,
                pickup_needed: pickup,
                pickup_address: pickup === "sim" ? address : "Não aplicável",
            })
            .then(
                function (response) {
                    console.log("Sucesso:", response);
                    showCopyNotification("Formulário de doação enviado com sucesso!");
                    document.getElementById("donationForm").reset();
                    addressGroup.style.display = "none"; // Reseta o campo de endereço
                },
                function (error) {
                    console.error("Erro:", error);
                    showCopyNotification("Falha ao enviar o formulário de doação.");
                }
            );
    });
});



// Função para mostrar a notificação
function showCopyNotification(message) {
    const notification = document.createElement("div");
    notification.classList.add("copy-notification");
    notification.innerText = message;

    document.body.appendChild(notification);

    // Remover a notificação após 2 segundos
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

