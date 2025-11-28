// ===== Navbar Sticky =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Form Validation =====
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

// Validazione email regex
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

// Real-time validation
document.getElementById('nome').addEventListener('blur', () => {
    const nome = document.getElementById('nome').value;
    const nomeError = document.getElementById('nomeError');
    if (nome.length < 3) {
        nomeError.textContent = 'Minimo 3 caratteri';
        document.getElementById('nome').classList.add('is-invalid');
    } else {
        nomeError.textContent = '';
        document.getElementById('nome').classList.remove('is-invalid');
    }
});

document.getElementById('email').addEventListener('blur', () => {
    const email = document.getElementById('email').value;
    const emailError = document.getElementById('emailError');
    if (!validateEmail(email)) {
        emailError.textContent = 'Email non valida';
        document.getElementById('email').classList.add('is-invalid');
    } else {
        emailError.textContent = '';
        document.getElementById('email').classList.remove('is-invalid');
    }
});

document.getElementById('messaggio').addEventListener('blur', () => {
    const messaggio = document.getElementById('messaggio').value;
    const messaggioError = document.getElementById('messaggioError');
    if (messaggio.length < 10) {
        messaggioError.textContent = 'Minimo 10 caratteri';
        document.getElementById('messaggio').classList.add('is-invalid');
    } else {
        messaggioError.textContent = '';
        document.getElementById('messaggio').classList.remove('is-invalid');
    }
});

// Submit handler
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const oggetto = document.getElementById('oggetto').value.trim();
    const messaggio = document.getElementById('messaggio').value.trim();
    const privacy = document.getElementById('privacy').checked;

    let isValid = true;

    // Validazione completa
    if (nome.length < 3) {
        document.getElementById('nomeError').textContent = 'Minimo 3 caratteri';
        document.getElementById('nome').classList.add('is-invalid');
        isValid = false;
    }

    if (!validateEmail(email)) {
        document.getElementById('emailError').textContent = 'Email non valida';
        document.getElementById('email').classList.add('is-invalid');
        isValid = false;
    }

    if (!oggetto) {
        document.getElementById('oggettoError').textContent = 'Campo obbligatorio';
        document.getElementById('oggetto').classList.add('is-invalid');
        isValid = false;
    }

    if (messaggio.length < 10 || messaggio.length > 500) {
        document.getElementById('messaggioError').textContent = 'Tra 10 e 500 caratteri';
        document.getElementById('messaggio').classList.add('is-invalid');
        isValid = false;
    }

    if (!privacy) {
        document.getElementById('privacyError').textContent = 'Accettare l\'informativa';
        document.getElementById('privacy').classList.add('is-invalid');
        isValid = false;
    }

    if (isValid) {
        // Simulazione invio
        successMessage.style.display = 'block';
        contactForm.reset();
        document.querySelectorAll('input, textarea').forEach(el => {
            el.classList.remove('is-invalid');
        });
        document.querySelectorAll('.text-danger').forEach(el => {
            el.textContent = '';
        });

        // Nascondi messaggio dopo 5 secondi
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    }
});

// Smooth scroll per link interni
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Chiudi navbar dopo click su mobile
document.querySelectorAll('.navbar-collapse a.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const bsCollapse = new bootstrap.Collapse(document.querySelector('.navbar-collapse'));
        bsCollapse.hide();
    });
});

console.log('✅ Sydney WebApp caricata correttamente');
