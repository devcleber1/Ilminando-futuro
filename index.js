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

let autoplayInterval = setInterval(nextSlide, 5000);

function openModal() {
    document.getElementById('donationModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('donationModal').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('donationModal');
    if (event.target === modal) {
        closeModal();
    }
};

function copyPixKey() {
    const pixKey = document.querySelector(".pix-info p");

    if (!pixKey) {
        console.error("Chave Pix não encontrada!");
        return;
    }

    const tempInput = document.createElement("input");
    tempInput.value = pixKey.innerText.replace("Chave Pix: ", ""); 
    document.body.appendChild(tempInput);

    
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); 

    
    try {
        const successful = document.execCommand("copy");
        if (successful) {
            showCopyNotification("Chave Pix copiada com sucesso!", false);
        } else {
            showCopyNotification("Falha ao copiar a chave Pix.", true);
        }
    } catch (err) {
        showCopyNotification("Erro ao copiar a chave Pix.", true);
    }

    document.body.removeChild(tempInput);
}

function sendVolunteerWhatsApp() {
    const name = document.getElementById('name').value;
    const area = document.getElementById('area').value;

    if (name && area) {
        const message = `Olá, meu nome é ${name}. Gostaria de ser voluntário na área de ${area}.`;
        const phoneNumber = "5521968828026"; // Número do WhatsApp da ONG
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    } else {
        showCopyNotification('Por favor, preencha todos os campos.', true);
    }
}

function sendDonationWhatsApp() {
    const name = document.getElementById('named').value;
    const material = document.getElementById('material').value;
    const pickup = document.getElementById('pickup').value;
    const address = document.getElementById('address').value;


    if (name && material && pickup) {
        let message = `Olá, meu nome é ${name}. Gostaria de doar os seguintes materiais: ${material}. `;
        if (pickup === 'sim') {
            message += `Necessito de retirada no endereço: ${address || 'Não informado'}.`;
        } else {
            message += `Não necessito de retirada.`;
        }

        const phoneNumber = "5521968828026"; // Número do WhatsApp da ONG
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    } else {
        showCopyNotification('Por favor, preencha todos os campos.', true);
    }
}

function toggleAddress() {
    const pickup = document.getElementById('pickup').value;
    const addressGroup = document.getElementById('addressGroup');
    addressGroup.style.display = pickup === 'sim' ? 'block' : 'none';
}

function showCopyNotification(message, isError) {
    const notification = document.createElement("div");
    notification.classList.add("copy-notification");
    notification.classList.add(isError ? "error" : "success");  
    notification.innerText = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add("hide");
    }, 5000);

    setTimeout(() => {
        notification.remove();
    }, 6000);
}