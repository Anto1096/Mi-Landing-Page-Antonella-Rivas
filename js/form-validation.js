// ========================================
// FORM VALIDATION - ANTONELLA RIVAS PORTFOLIO
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    initFormValidation();
    initContactForm();
});

// ========================================
// FORM VALIDATION FUNCTIONALITY
// ========================================

function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            // Real-time validation
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => clearErrors(input));
        });
        
        // Form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateForm(form)) {
                handleFormSubmission(form);
            }
        });
    });
}

// ========================================
// FIELD VALIDATION
// ========================================

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    const fieldType = field.type;
    const isRequired = field.hasAttribute('required');
    
    // Clear previous errors
    clearErrors(field);
    
    // Required field validation
    if (isRequired && !value) {
        showError(field, 'Este campo es obligatorio');
        return false;
    }
    
    // Skip validation if field is empty and not required
    if (!value && !isRequired) {
        return true;
    }
    
    // Specific field validations
    switch (fieldName) {
        case 'name':
            return validateName(field, value);
        case 'email':
            return validateEmail(field, value);
        case 'phone':
            return validatePhone(field, value);
        case 'message':
            return validateMessage(field, value);
        default:
            return true;
    }
}

// ========================================
// SPECIFIC VALIDATION FUNCTIONS
// ========================================

function validateName(field, value) {
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/;
    
    if (value.length < 2) {
        showError(field, 'El nombre debe tener al menos 2 caracteres');
        return false;
    }
    
    if (value.length > 50) {
        showError(field, 'El nombre no puede tener más de 50 caracteres');
        return false;
    }
    
    if (!nameRegex.test(value)) {
        showError(field, 'El nombre solo puede contener letras y espacios');
        return false;
    }
    
    showSuccess(field);
    return true;
}

function validateEmail(field, value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(value)) {
        showError(field, 'Por favor ingresa un email válido');
        return false;
    }
    
    if (value.length > 254) {
        showError(field, 'El email es demasiado largo');
        return false;
    }
    
    showSuccess(field);
    return true;
}

function validatePhone(field, value) {
    // Remove all non-numeric characters
    const cleanPhone = value.replace(/\D/g, '');
    
    if (cleanPhone.length < 10) {
        showError(field, 'El teléfono debe tener al menos 10 dígitos');
        return false;
    }
    
    if (cleanPhone.length > 15) {
        showError(field, 'El teléfono no puede tener más de 15 dígitos');
        return false;
    }
    
    showSuccess(field);
    return true;
}

function validateMessage(field, value) {
    if (value.length < 10) {
        showError(field, 'El mensaje debe tener al menos 10 caracteres');
        return false;
    }
    
    if (value.length > 1000) {
        showError(field, 'El mensaje no puede tener más de 1000 caracteres');
        return false;
    }
    
    showSuccess(field);
    return true;
}

// ========================================
// FORM VALIDATION
// ========================================

function validateForm(form) {
    const fields = form.querySelectorAll('input, textarea');
    let isValid = true;
    
    fields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// ========================================
// ERROR AND SUCCESS DISPLAY
// ========================================

function showError(field, message) {
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    // Add error class
    formGroup.classList.add('error');
    formGroup.classList.remove('success');
    
    // Show error message
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    // Add red border
    field.style.borderColor = '#f56565';
}

function showSuccess(field) {
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    // Add success class
    formGroup.classList.add('success');
    formGroup.classList.remove('error');
    
    // Hide error message
    if (errorElement) {
        errorElement.style.display = 'none';
    }
    
    // Add green border
    field.style.borderColor = '#48bb78';
}

function clearErrors(field) {
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    // Remove error/success classes
    formGroup.classList.remove('error', 'success');
    
    // Hide error message
    if (errorElement) {
        errorElement.style.display = 'none';
    }
    
    // Reset border color
    field.style.borderColor = '';
}

// ========================================
// CONTACT FORM HANDLING
// ========================================

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    // Add character counter for textarea
    const messageField = contactForm.querySelector('#message');
    if (messageField) {
        addCharacterCounter(messageField);
    }
    
    // Add phone formatting
    const phoneField = contactForm.querySelector('#phone');
    if (phoneField) {
        addPhoneFormatting(phoneField);
    }
}

function addCharacterCounter(textarea) {
    const maxLength = 1000;
    const counter = document.createElement('div');
    counter.className = 'character-counter';
    counter.style.cssText = `
        text-align: right;
        font-size: 0.875rem;
        color: #718096;
        margin-top: 0.25rem;
    `;
    
    textarea.parentNode.appendChild(counter);
    
    function updateCounter() {
        const remaining = maxLength - textarea.value.length;
        counter.textContent = `${remaining} caracteres restantes`;
        
        if (remaining < 50) {
            counter.style.color = '#f56565';
        } else if (remaining < 100) {
            counter.style.color = '#ed8936';
        } else {
            counter.style.color = '#718096';
        }
    }
    
    textarea.addEventListener('input', updateCounter);
    updateCounter();
}

function addPhoneFormatting(phoneField) {
    phoneField.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        let formattedValue = '';
        
        if (value.length > 0) {
            if (value.length <= 3) {
                formattedValue = value;
            } else if (value.length <= 6) {
                formattedValue = value.slice(0, 3) + '-' + value.slice(3);
            } else {
                formattedValue = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6, 10);
            }
        }
        
        e.target.value = formattedValue;
    });
}

// ========================================
// FORM SUBMISSION
// ========================================

async function handleFormSubmission(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    const status = document.getElementById('form-status');
    
    // Show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="loading-spinner"></span> Enviando...';
    
    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Client-side validation
    let valid = true;
    if (!data.get('name').trim()) {
        document.getElementById('nameError').textContent = 'Por favor, ingresa tu nombre.';
        valid = false;
    } else {
        document.getElementById('nameError').textContent = '';
    }

    const email = data.get('email').trim();
    if (!email) {
        document.getElementById('emailError').textContent = 'Por favor, ingresa tu email.';
        valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        document.getElementById('emailError').textContent = 'Por favor, ingresa un email válido.';
        valid = false;
    } else {
        document.getElementById('emailError').textContent = '';
    }

    if (!data.get('message').trim()) {
        document.getElementById('messageError').textContent = 'Por favor, escribe un mensaje.';
        valid = false;
    } else {
        document.getElementById('messageError').textContent = '';
    }

    if (!valid) {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
        return;
    }
    
    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            status.textContent = "¡Gracias por tu mensaje! Te responderé pronto.";
            status.style.color = 'green';
            form.reset();
        } else {
            const responseData = await response.json();
            if (Object.hasOwn(responseData, 'errors')) {
                status.textContent = responseData["errors"].map(error => error["message"]).join(", ");
            } else {
                status.textContent = "Oops! Hubo un problema al enviar tu formulario.";
            }
            status.style.color = 'red';
        }
    } catch (error) {
        status.textContent = "Oops! Hubo un problema al enviar tu formulario.";
        status.style.color = 'red';
    } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
    }
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Email validation with more sophisticated regex
function isValidEmail(email) {
    const emailRegex = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;
    return emailRegex.test(email);
}

// Sanitize input to prevent XSS
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

// Format phone number
function formatPhoneNumber(phoneNumber) {
    const cleaned = phoneNumber.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    
    if (match) {
        return `${match[1]}-${match[2]}-${match[3]}`;
    }
    
    return phoneNumber;
}

// ========================================
// EXPORT FUNCTIONS (for testing)
// ========================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateField,
        validateName,
        validateEmail,
        validatePhone,
        validateMessage,
        validateForm,
        showError,
        showSuccess,
        clearErrors,
        handleFormSubmission,
        isValidEmail,
        sanitizeInput,
        formatPhoneNumber
    };
}
    module.exports = {
        validateField,
        validateName,
        validateEmail,
        validatePhone,
        validateMessage,
        validateForm,
        showError,
        showSuccess,
        clearErrors,
        handleFormSubmission,
        isValidEmail,
        sanitizeInput,
        formatPhoneNumber
    };
}
