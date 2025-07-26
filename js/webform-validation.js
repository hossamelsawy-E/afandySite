document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('visaForm');
    const submitBtn = document.getElementById('submitBtn');
    
    // Validation rules - updated without visaCities as required
    const validationRules = {
        fullName: {
            required: true,
            minLength: 2,
            pattern: /^[\u0600-\u06FFa-zA-Z\s.]+$/,
            message: 'يجب إدخال الاسم باللغة العربية أو الإنجليزية فقط'
        },
        whatsapp: {
            required: true,
            pattern: /^01[0-9]{9}$/,
            message: 'رقم الواتساب يجب أن يبدأ بـ 01 ويتكون من 11 رقم'
        },
        personalPhone: {
            required: true,
            pattern: /^01[0-9]{9}$/,
            message: 'رقم الهاتف يجب أن يبدأ بـ 01 ويتكون من 11 رقم'
        },
        profession: {
            required: true,
            minLength: 2,
            message: 'يجب إدخال المهنة (حرفين على الأقل)'
        }
    };

    // Radio button groups
    const radioGroups = [
        'bankBalance',
        'bankActivity', 
        'hasBankAccount',
        'hrLetter',
        'commercialReg'
    ];

    // Destinations validation function
    function validateDestinations() {
        const visaCity = document.getElementById('visaCities').value.trim();
        const egyptDestination = document.getElementById('egyptDestinations').value.trim();
        
        // At least one destination must be selected
        if (!visaCity && !egyptDestination) {
            showDestinationError();
            return false;
        } else {
            hideDestinationError();
            return true;
        }
    }

    function showDestinationError() {
        const errorElement = document.getElementById('destinationError');
        const visaCityField = document.getElementById('visaCities');
        const egyptDestField = document.getElementById('egyptDestinations');
        
        errorElement.classList.remove('hidden');
        
        // Add visual error styling
        addErrorClass(visaCityField);
        addErrorClass(egyptDestField);
        
        // Shake animation for the section
        const destinationSection = errorElement.closest('.bg-gray-50');
        destinationSection.classList.add('shake-animation');
        setTimeout(() => {
            destinationSection.classList.remove('shake-animation');
        }, 500);
    }

    function hideDestinationError() {
        const errorElement = document.getElementById('destinationError');
        const visaCityField = document.getElementById('visaCities');
        const egyptDestField = document.getElementById('egyptDestinations');
        
        errorElement.classList.add('hidden');
        removeErrorClass(visaCityField);
        removeErrorClass(egyptDestField);
    }

    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous errors and messages
        clearErrors();
        hideMessages();
        
        // Validate all fields
        let isValid = validateForm();
        
        if (isValid) {
            // Check financial eligibility
            const eligibilityResult = checkFinancialEligibility();
            
            if (eligibilityResult.isEligible) {
                // All requirements met - submit form
                prepareSubmission();
                showSuccessMessage();
                setTimeout(() => {
                    form.submit(); // Submit to Webform
                }, 1500);
                
            } else {
                // Financial requirements not met - show error, don't submit
                showErrorMessage();
                resetSubmitButton();
            }
        } else {
            // Form validation failed
            const firstError = document.querySelector('.error-message:not(.hidden), #destinationError:not(.hidden)');
            if (firstError) {
                firstError.closest('.bg-gray-50, .bg-white').classList.add('shake-animation');
                setTimeout(() => {
                    firstError.closest('.bg-gray-50, .bg-white').classList.remove('shake-animation');
                }, 500);
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            resetSubmitButton();
        }
    });

    function validateForm() {
        let isValid = true;
        
        // Validate text fields
        Object.keys(validationRules).forEach(fieldName => {
            const field = document.getElementById(fieldName);
            const rule = validationRules[fieldName];
            
            if (!validateField(field, rule)) {
                isValid = false;
            }
        });
        
        // Validate destinations (at least one required)
        if (!validateDestinations()) {
            isValid = false;
        }
        
        // Validate radio groups
        radioGroups.forEach(groupName => {
            if (!validateRadioGroup(groupName)) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    function validateField(field, rule) {
        const value = field.value.trim();
        const errorElement = field.parentNode.querySelector('.error-message');
        
        // Required validation
        if (rule.required && !value) {
            showFieldError(errorElement, 'هذا الحقل مطلوب');
            addErrorClass(field);
            return false;
        }
        
        // Skip other validations if field is empty and not required
        if (!value && !rule.required) {
            removeErrorClass(field);
            return true;
        }
        
        // Pattern validation
        if (rule.pattern && !rule.pattern.test(value)) {
            showFieldError(errorElement, rule.message);
            addErrorClass(field);
            return false;
        }
        
        // Min length validation
        if (rule.minLength && value.length < rule.minLength) {
            showFieldError(errorElement, `يجب أن يكون النص ${rule.minLength} أحرف على الأقل`);
            addErrorClass(field);
            return false;
        }
        
        // Phone number specific validation
        if ((field.id === 'whatsapp' || field.id === 'personalPhone') && value.length !== 11) {
            showFieldError(errorElement, 'رقم الهاتف يجب أن يتكون من 11 رقم');
            addErrorClass(field);
            return false;
        }
        
        // Field is valid
        removeErrorClass(field);
        return true;
    }

    function validateRadioGroup(groupName) {
        const radios = document.querySelectorAll(`input[name="${groupName}"]`);
        const isSelected = Array.from(radios).some(radio => radio.checked);
        const container = document.getElementById(`${groupName}-container`);
        const errorElement = container.querySelector('.radio-error-message');
        
        if (!isSelected) {
            showFieldError(errorElement, 'يرجى اختيار إجابة');
            addErrorClassToContainer(container);
            return false;
        } else {
            removeErrorClassFromContainer(container);
            return true;
        }
    }

    function checkFinancialEligibility() {
        const formData = new FormData(form);
        
        // Get financial data
        const hasEnoughBalance = formData.get('bankBalance') === 'yes';
        const hasBankActivity = formData.get('bankActivity') === 'yes';
        const hasBankAccount = formData.get('hasBankAccount') === 'yes';
        const hasHR = formData.get('hrLetter') === 'yes';
        const hasCommercialReg = formData.get('commercialReg') === 'yes';
        const hrNotApplicable = formData.get('hrLetter') === 'not_applicable';
        
        // Work proof logic
        let hasWorkProof = false;
        if (hasHR || (hrNotApplicable && hasCommercialReg) || 
            (formData.get('hrLetter') === 'no' && hasCommercialReg)) {
            hasWorkProof = true;
        }
        
        // ALL financial conditions must be true for eligibility
        const isEligible = hasEnoughBalance && hasBankActivity && hasBankAccount && hasWorkProof;
        
        return {
            isEligible,
            details: {
                hasEnoughBalance,
                hasBankActivity,
                hasBankAccount,
                hasWorkProof
            }
        };
    }

    function prepareSubmission() {
        // Set hidden fields for successful submission
        document.getElementById('eligibilityStatus').value = 'مؤهل ✅';
        document.getElementById('requestId').value = generateRequestId();
        document.getElementById('applicationDate').value = new Date().toLocaleString('ar-EG');
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i>جاري الإرسال...';
        submitBtn.disabled = true;
    }

    function showSuccessMessage() {
        const successDiv = document.getElementById('successMessage');
        successDiv.classList.remove('hidden');
        successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    function showErrorMessage() {
        const errorDiv = document.getElementById('errorMessage');
        errorDiv.classList.remove('hidden');
        errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    function hideMessages() {
        document.getElementById('successMessage').classList.add('hidden');
        document.getElementById('errorMessage').classList.add('hidden');
    }

    function showFieldError(errorElement, message) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
    }

    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message, .radio-error-message');
        errorElements.forEach(element => {
            element.classList.add('hidden');
            element.textContent = '';
        });
        
        // Hide destination error
        hideDestinationError();
        
        const fields = document.querySelectorAll('input, select');
        fields.forEach(removeErrorClass);
        
        const containers = document.querySelectorAll('[id$="-container"]');
        containers.forEach(removeErrorClassFromContainer);
    }

    function addErrorClass(field) {
        field.classList.add('border-red-500', 'ring-2', 'ring-red-200');
        field.classList.remove('border-gray-300');
    }

    function removeErrorClass(field) {
        field.classList.remove('border-red-500', 'ring-2', 'ring-red-200');
        field.classList.add('border-gray-300');
    }

    function addErrorClassToContainer(container) {
        container.classList.add('border-red-400', 'bg-red-50');
        container.classList.remove('border-gray-200');
    }

    function removeErrorClassFromContainer(container) {
        container.classList.remove('border-red-400', 'bg-red-50');
        container.classList.add('border-gray-200');
    }

    function resetSubmitButton() {
        submitBtn.innerHTML = '<i class="fas fa-paper-plane ml-2"></i>إرسال الطلب';
        submitBtn.disabled = false;
    }

    function generateRequestId() {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000);
        return `VIS-${timestamp}-${random}`;
    }

    // Phone number formatting
    ['whatsapp', 'personalPhone'].forEach(fieldId => {
        document.getElementById(fieldId).addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) {
                value = value.slice(0, 11);
            }
            e.target.value = value;
        });
    });

    // Real-time validation for text fields
    Object.keys(validationRules).forEach(fieldName => {
        const field = document.getElementById(fieldName);
        
        field.addEventListener('blur', function() {
            validateField(field, validationRules[fieldName]);
        });
        
        field.addEventListener('input', function() {
            const errorElement = field.parentNode.querySelector('.error-message');
            if (!errorElement.classList.contains('hidden')) {
                removeErrorClass(field);
                errorElement.classList.add('hidden');
            }
        });
    });

    // Real-time validation for radio groups
    radioGroups.forEach(groupName => {
        const radios = document.querySelectorAll(`input[name="${groupName}"]`);
        radios.forEach(radio => {
            radio.addEventListener('change', function() {
                validateRadioGroup(groupName);
            });
        });
    });

    // Event listeners for destination fields
    const visaCitiesField = document.getElementById('visaCities');
    const egyptDestField = document.getElementById('egyptDestinations');
    
    visaCitiesField.addEventListener('change', function() {
        // Hide error if something is selected
        if (this.value || egyptDestField.value) {
            hideDestinationError();
        }
        
        // Update placeholder for the other field
        if (this.value) {
            egyptDestField.querySelector('option[value=""]').textContent = 'اختر وجهة إضافية داخل مصر (اختياري)';
        } else {
            egyptDestField.querySelector('option[value=""]').textContent = 'اختر الوجهة (مطلوب إذا لم تختر مدينة خارجية)';
        }
    });
    
    egyptDestField.addEventListener('change', function() {
        // Hide error if something is selected
        if (this.value || visaCitiesField.value) {
            hideDestinationError();
        }
        
        // Update placeholder for the other field
        if (this.value) {
            visaCitiesField.querySelector('option[value=""]').textContent = 'اختر مدينة إضافية خارج مصر (اختياري)';
        } else {
            visaCitiesField.querySelector('option[value=""]').textContent = 'اختر المدينة (مطلوب إذا لم تختر وجهة داخل مصر)';
        }
    });
});
