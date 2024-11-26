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
            showCopyNotification("Chave Pix copiada com sucesso!");
        } else {
            showCopyNotification("Falha ao copiar a chave Pix.");
        }
    } catch (err) {
        console.error("Erro ao copiar a chave Pix: ", err);
        showCopyNotification("Erro ao copiar a chave Pix.");
    }

    document.body.removeChild(tempInput);
}

// Envvio do email de voluntario
(function() {
    emailjs.init("CNl5XnNQQ79jCbrag");  
})();

document.getElementById('volunteerForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const area = document.getElementById('area').value;
    const message = document.getElementById('message').value;

    emailjs.send("service_jpu7pto", "template_x90kf6r", {
        from_name: name,
        from_email: email,
        phone: phone,
        area_of_interest: area,
        message: message
    })
    .then(function(response) {
        console.log('Sucesso:', response);
        showCopyNotification("Formulário enviado com sucesso!");  
        // Limpar o formulário após envio
        document.getElementById('volunteerForm').reset();  
    }, function(error) {
        console.error('Erro:', error);
        showCopyNotification("Falha ao enviar o formulário.");  
    });
});


// Envio do email da doação de materiais
document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("CNl5XnNQQ79jCbrag");

    const pickupField = document.getElementById("pickup");
    const addressGroup = document.getElementById("addressGroup");

    
    pickupField.addEventListener("change", function () {
        if (pickupField.value === "sim") {
            addressGroup.style.display = "block"; 
        } else {
            addressGroup.style.display = "none"; 
        }
    });

    document.getElementById("donationForm").addEventListener("submit", function (event) {
        event.preventDefault();

        // Coleta os valores dos campos
        const name = document.getElementById("named").value;
        const email = document.getElementById("emaild").value;
        const material = document.getElementById("material").value;
        const pickup = document.getElementById("pickup").value;
        const address = document.getElementById("address").value; 

        const payload = {
            from_name: name || "Nome não fornecido",
            from_email: email || "Email não fornecido",
            materials_for_donation: material || "Materiais não especificados",
            pickup_needed: pickup,
        };
        
        if (pickup === "sim" && address) {
            payload.pickup_address = address;
        } else {
            payload.pickup_address = null; 
        }
        
        emailjs
            .send("service_jpu7pto", "template_kbk2zei", payload)
            .then(
                function (response) {
                    showCopyNotification("Formulário de doação enviado com sucesso!");
                    document.getElementById("donationForm").reset();
                    addressGroup.style.display = "none"; 
                },
                function (error) {
                    showCopyNotification("Falha ao enviar o formulário de doação.");
                }
            );
    });
});


function showCopyNotification(message) {
    const notification = document.createElement("div");
    notification.classList.add("copy-notification");
    notification.innerText = message;

    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 6000);
}