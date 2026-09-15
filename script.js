// DOM Elements
const modeButtons = document.querySelectorAll('.mode-btn');
const currencySelect = document.getElementById('currencySelect');
const customCurrencySelect = document.getElementById('customCurrencySelect');
const currencyTrigger = document.getElementById('currencyTrigger');
const currencyDropdown = document.getElementById('currencyDropdown');
const currencyText = document.getElementById('currencyText');
const flag1 = document.getElementById('flag1');
const flag2 = document.getElementById('flag2');
const timeframeSelect = document.getElementById('timeframeSelect');
const customTimeframeSelect = document.getElementById('customTimeframeSelect');
const timeframeTrigger = document.getElementById('timeframeTrigger');
const timeframeDropdown = document.getElementById('timeframeDropdown');
const timeframeText = document.getElementById('timeframeText');
const signalPlaceholder = document.getElementById('signalPlaceholder');
const imageInput = document.getElementById('imageInput');
const previewImage = document.getElementById('previewImage');
const signalInfo = document.getElementById('signalInfo');
const calculatingIndicators = document.getElementById('calculatingIndicators');
const getSignalBtn = document.getElementById('getSignalBtn');
const customLanguageSelect = document.getElementById('customLanguageSelect');
const languageTrigger = document.getElementById('languageTrigger');
const languageModal = document.getElementById('languageModal');
const languageModalClose = document.getElementById('languageModalClose');
const languageModalList = document.getElementById('languageModalList');
const languageFlag = document.getElementById('languageFlag');
const newPhotoBtn = document.getElementById('newPhotoBtn');

// State
let selectedImage = null;
let currentMode = 'forex';
let currentLanguage = 'en'; // 'en', 'ru', 'hi', 'ar', 'tg', 'uz', 'tr'

// Telegram WebApp initialization
function initTelegramWebApp() {
    if (window.Telegram && window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;
        
        // Уведомляем Telegram о готовности приложения
        tg.ready();
        
        // Растягиваем окно на всю доступную высоту
        tg.expand();
        
        // Запрашиваем полноэкранный режим
        tg.requestFullscreen();
        
        // Дополнительные настройки для лучшего отображения
        tg.enableClosingConfirmation();
        
        // Устанавливаем отступ для safe area (iPhone notch/Dynamic Island) + дополнительно 20px
        const header = document.querySelector('.header');
        if (header && tg.safeAreaInsets) {
            const topInset = tg.safeAreaInsets.top || 0;
            const additionalPadding = 20;
            header.style.paddingTop = `${topInset + additionalPadding}px`;
        }
    }
}

// Инициализируем при загрузке страницы
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTelegramWebApp);
} else {
    // Если страница уже загружена, пробуем сразу
    initTelegramWebApp();
    // Также пробуем через небольшую задержку на случай, если скрипт Telegram еще загружается
    setTimeout(initTelegramWebApp, 100);
}

// Translations
const translations = {
    en: {
        selectLanguage: 'Select Language',
        placeholderText: 'Click to take a photo or select an image',
        getSignal: 'GET SIGNAL',
        analyzing: 'ANALYZING...',
        loadMorePhotos: 'Load more photos',
        calculatingIndicators: 'Calculating indicators',
        analyzingIndicators: 'Analyzing technical indicators...',
        calculating: 'Calculating...',
        ready: 'Ready ✓',
        sign: 'SIGNAL',
        currencyPair: 'Currency Pair',
        timeframe: 'Timeframe',
        accuracy: 'Accuracy',
        direction: 'Direction',
        signalFound: 'Signal found',
        buy: 'BUY',
        sell: 'SELL'
    },
    ru: {
        selectLanguage: 'Выбрать язык',
        placeholderText: 'Нажмите, чтобы сделать фото или выбрать изображение',
        getSignal: 'ПОЛУЧИТЬ СИГНАЛ',
        analyzing: 'АНАЛИЗИРУЮ...',
        loadMorePhotos: 'Загрузить еще фото',
        calculatingIndicators: 'Вычисление индикаторов',
        analyzingIndicators: 'Анализ технических индикаторов...',
        calculating: 'Вычисляется...',
        ready: 'Готово ✓',
        sign: 'СИГНАЛ',
        currencyPair: 'Валютная пара',
        timeframe: 'Таймфрейм',
        accuracy: 'Точность',
        direction: 'Направление',
        signalFound: 'Сигнал найден',
        buy: 'ПОКУПКА',
        sell: 'ПРОДАЖА'
    },
    hi: {
        selectLanguage: 'भाषा चुनें',
        placeholderText: 'फोटो लेने या छवि चुनने के लिए क्लिक करें',
        getSignal: 'सिग्नल प्राप्त करें',
        analyzing: 'विश्लेषण कर रहा है...',
        loadMorePhotos: 'और फोटो लोड करें',
        calculatingIndicators: 'संकेतकों की गणना',
        analyzingIndicators: 'तकनीकी संकेतकों का विश्लेषण...',
        calculating: 'गणना हो रही है...',
        ready: 'तैयार ✓',
        sign: 'सिग्नल',
        currencyPair: 'मुद्रा जोड़ी',
        timeframe: 'समय सीमा',
        accuracy: 'सटीकता',
        direction: 'दिशा',
        signalFound: 'सिग्नल मिला',
        buy: 'खरीदें',
        sell: 'बेचें'
    },
    ar: {
        selectLanguage: 'اختر اللغة',
        placeholderText: 'انقر لالتقاط صورة أو تحديد صورة',
        getSignal: 'الحصول على إشارة',
        analyzing: 'جارٍ التحليل...',
        loadMorePhotos: 'تحميل المزيد من الصور',
        calculatingIndicators: 'حساب المؤشرات',
        analyzingIndicators: 'تحليل المؤشرات الفنية...',
        calculating: 'جارٍ الحساب...',
        ready: 'جاهز ✓',
        sign: 'إشارة',
        currencyPair: 'زوج العملات',
        timeframe: 'الإطار الزمني',
        accuracy: 'الدقة',
        direction: 'الاتجاه',
        signalFound: 'تم العثور على إشارة',
        buy: 'شراء',
        sell: 'بيع'
    },
    tg: {
        selectLanguage: 'Забонро интихоб кунед',
        placeholderText: 'Барои гирифтани акс ё интихоби тасвир клик кунед',
        getSignal: 'СИГНАЛ ГИРЕД',
        analyzing: 'ТАҲЛИЛ МЕКУНАМ...',
        loadMorePhotos: 'Аксҳои бештарро бор кунед',
        calculatingIndicators: 'Ҳисоб кардани нишондиҳандаҳо',
        analyzingIndicators: 'Тахлили нишондиҳандаҳои техникӣ...',
        calculating: 'Ҳисоб карда мешавад...',
        ready: 'Омода ✓',
        sign: 'СИГНАЛ',
        currencyPair: 'Ҷуфти асъор',
        timeframe: 'Вақти фрейм',
        accuracy: 'Дақиқӣ',
        direction: 'Самт',
        signalFound: 'Сигнал ёфт шуд',
        buy: 'ХАРИД',
        sell: 'ФУРУШ'
    },
    uz: {
        selectLanguage: 'Tilni tanlang',
        placeholderText: 'Rasm yoki tasvirni tanlash uchun bosing',
        getSignal: 'SIGNAL OLISH',
        analyzing: 'TAHLIL QILYAPMAN...',
        loadMorePhotos: 'Ko\'proq rasmlarni yuklash',
        calculatingIndicators: 'Ko\'rsatkichlarni hisoblash',
        analyzingIndicators: 'Texnik ko\'rsatkichlarni tahlil qilish...',
        calculating: 'Hisoblanmoqda...',
        ready: 'Tayyor ✓',
        sign: 'SIGNAL',
        currencyPair: 'Valyuta juftligi',
        timeframe: 'Vaqt oralig\'i',
        accuracy: 'Aniqlik',
        direction: 'Yo\'nalish',
        signalFound: 'Signal topildi',
        buy: 'SOTIB OLISH',
        sell: 'SOTISH'
    },
    tr: {
        selectLanguage: 'Dil seçin',
        placeholderText: 'Fotoğraf çekmek veya görüntü seçmek için tıklayın',
        getSignal: 'SİNYAL AL',
        analyzing: 'ANALİZ EDİYORUM...',
        loadMorePhotos: 'Daha fazla fotoğraf yükle',
        calculatingIndicators: 'Göstergeleri hesaplama',
        analyzingIndicators: 'Teknik göstergeleri analiz ediyor...',
        calculating: 'Hesaplanıyor...',
        ready: 'Hazır ✓',
        sign: 'SİNYAL',
        currencyPair: 'Para birimi çifti',
        timeframe: 'Zaman dilimi',
        accuracy: 'Doğruluk',
        direction: 'Yön',
        signalFound: 'Sinyal bulundu',
        buy: 'SATIN AL',
        sell: 'SAT'
    }
};

// Timeframe options
const timeframeOptions = {
    forex: [
        { value: '1m', label: '1M' },
        { value: '3m', label: '3M' },
        { value: '5m', label: '5M' },
        { value: '15m', label: '15M' },
        { value: '30m', label: '30M' }
    ],
    otc: [
        { value: '5s', label: '5S' },
        { value: '15s', label: '15S' },
        { value: '30s', label: '30S' },
        { value: '1m', label: '1M' },
        { value: '5m', label: '5M' },
        { value: '15m', label: '15M' }
    ]
};

// Mode Selection
modeButtons.forEach(btn => {
    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        modeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentMode = btn.dataset.mode;
        updateCurrencyOptions();
        updateCustomCurrencyOptions();
        updateTimeframeOptions();
        btn.blur();
    };
    
    btn.addEventListener('click', handleClick);
});

// Update currency options based on mode
function updateCurrencyOptions() {
    const options = currencySelect.querySelectorAll('option');
    const selectedValue = currencySelect.value;
    
    options.forEach(option => {
        const pair = option.value;
        // For Forex: just the pair name, for OTC: pair name + " OTC"
        if (currentMode === 'otc') {
            option.textContent = `${pair} OTC`;
        } else {
            option.textContent = pair;
        }
    });
    
    currencySelect.value = selectedValue;
}

// Update timeframe options based on mode
function updateTimeframeOptions() {
    const options = timeframeOptions[currentMode];
    const currentValue = timeframeSelect.value;
    
    // Update hidden select
    timeframeSelect.innerHTML = '';
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.value;
        optionElement.textContent = option.label;
        timeframeSelect.appendChild(optionElement);
    });
    
    // Try to set previous value if it exists in new options
    let selectedValue = options[0].value;
    if (options.find(opt => opt.value === currentValue)) {
        selectedValue = currentValue;
    }
    timeframeSelect.value = selectedValue;
    
    // Update custom dropdown
    timeframeDropdown.innerHTML = '';
    options.forEach(option => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'custom-option';
        optionDiv.dataset.value = option.value;
        optionDiv.innerHTML = `<span class="timeframe-text">${option.label}</span>`;
        
        if (option.value === selectedValue) {
            optionDiv.classList.add('selected');
        }
        
        optionDiv.addEventListener('click', (e) => {
            e.stopPropagation();
            const value = optionDiv.dataset.value;
            // Update hidden select
            timeframeSelect.value = value;
            // Update trigger display
            timeframeText.textContent = option.label;
            // Update selected state
            timeframeDropdown.querySelectorAll('.custom-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            optionDiv.classList.add('selected');
            // Close dropdown
            timeframeTrigger.classList.remove('active');
            timeframeDropdown.classList.remove('open');
        });
        timeframeDropdown.appendChild(optionDiv);
    });
    // Update trigger text
    const selectedOption = options.find(opt => opt.value === selectedValue);
    if (selectedOption) {
        timeframeText.textContent = selectedOption.label;
    }
}

// Custom Language Selector functionality - Open Modal
languageTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    // Close other dropdowns if open
    currencyTrigger.classList.remove('active');
    currencyDropdown.classList.remove('open');
    timeframeTrigger.classList.remove('active');
    timeframeDropdown.classList.remove('open');
    // Open language modal
    languageModal.classList.add('active');
    updateLanguageModalTitle();
});

// Close modal button
languageModalClose.addEventListener('click', (e) => {
    e.stopPropagation();
    languageModal.classList.remove('active');
    setTimeout(() => {
        removeAllFocus();
    }, 100);
});

// Close modal when clicking outside
languageModal.addEventListener('click', (e) => {
    if (e.target === languageModal) {
        languageModal.classList.remove('active');
        setTimeout(() => {
            removeAllFocus();
        }, 100);
    }
});

// Handle language option selection
languageModalList.querySelectorAll('.language-modal-option').forEach(option => {
    option.addEventListener('click', (e) => {
        e.stopPropagation();
        const lang = option.dataset.lang;
        const flag = option.dataset.flag;
        
        if (lang && lang !== currentLanguage) {
            // Update language
            currentLanguage = lang;
            
            // Save to localStorage
            localStorage.setItem('language', currentLanguage);
            
            // Update trigger display
            languageFlag.src = `svg/${flag}.svg`;
            
            // Update selected state
            languageModalList.querySelectorAll('.language-modal-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            option.classList.add('selected');
            
            // Close modal
            languageModal.classList.remove('active');
            
            // Update all text
            updateLanguage();
        } else {
            // Just close modal if same language selected
            languageModal.classList.remove('active');
        }
        
        // Remove focus
        setTimeout(() => {
            removeAllFocus();
        }, 100);
    });
});

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
    if (!customCurrencySelect.contains(e.target)) {
        currencyTrigger.classList.remove('active');
        currencyDropdown.classList.remove('open');
    }
    if (!customTimeframeSelect.contains(e.target)) {
        timeframeTrigger.classList.remove('active');
        timeframeDropdown.classList.remove('open');
    }
});

// Handle option selection
currencyDropdown.querySelectorAll('.custom-option').forEach(option => {
    option.addEventListener('click', (e) => {
        e.stopPropagation();
        const value = option.dataset.value;
        const flag1Value = option.dataset.flag1;
        const flag2Value = option.dataset.flag2;
        
        // Update hidden select
        currencySelect.value = value;
        
        // Update trigger display
        if (currentMode === 'otc') {
            currencyText.textContent = `${value} OTC`;
        } else {
            currencyText.textContent = value;
        }
        
        // Update flags
        if (flag1 && flag2 && flag1Value && flag2Value) {
            flag1.src = `svg/${flag1Value}.svg`;
            flag2.src = `svg/${flag2Value}.svg`;
        }
        
        // Update selected state
        currencyDropdown.querySelectorAll('.custom-option').forEach(opt => {
            opt.classList.remove('selected');
        });
        option.classList.add('selected');
        
        // Close dropdown
        currencyTrigger.classList.remove('active');
        currencyDropdown.classList.remove('open');
        
        // Trigger change event
        currencySelect.dispatchEvent(new Event('change'));
        
        // Remove focus
        setTimeout(() => {
            removeAllFocus();
        }, 100);
    });
});

// Update currency select when mode changes
currencySelect.addEventListener('change', () => {
    updateCurrencyOptions();
    updateCustomCurrencyOptions();
});

timeframeSelect.addEventListener('change', () => {
    // Remove focus styles immediately
    timeframeSelect.style.outline = 'none';
    timeframeSelect.style.borderColor = 'rgba(255, 255, 255, 0.2)';
    timeframeSelect.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.2)';
    // Blur after selection is made
    setTimeout(() => {
        timeframeSelect.blur();
        removeAllFocus();
    }, 100);
});

// Function to remove focus from all elements
function removeAllFocus() {
    if (document.activeElement && document.activeElement !== document.body) {
        document.activeElement.blur();
    }
}

// Image Upload/Capture
const handlePlaceholderClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    imageInput.click();
};

signalPlaceholder.addEventListener('click', handlePlaceholderClick);

let previewObjectUrl = null;

imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (previewObjectUrl) {
        URL.revokeObjectURL(previewObjectUrl);
        previewObjectUrl = null;
    }

    previewObjectUrl = URL.createObjectURL(file);
    selectedImage = previewObjectUrl;
    previewImage.src = previewObjectUrl;
    previewImage.decoding = 'async';

    signalPlaceholder.style.display = 'none';
    previewImage.style.display = 'block';
    previewImage.style.opacity = '1';
    signalInfo.style.display = 'none';

    getSignalBtn.disabled = false;
    getSignalBtn.style.opacity = '1';
    getSignalBtn.style.cursor = 'pointer';
});

// Get Signal Button
const handleGetSignalClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!selectedImage) {
        getSignalBtn.style.transform = 'scale(0.97)';
        setTimeout(() => {
            getSignalBtn.style.transform = '';
        }, 120);
        return;
    }

    previewImage.style.display = 'none';
    getSignalBtn.disabled = true;
    getSignalBtn.classList.add('loading');
    getSignalBtn.textContent = translations[currentLanguage].analyzing;
    
    signalPlaceholder.style.display = 'none';
    signalInfo.style.display = 'none';
    
    calculatingIndicators.style.display = 'flex';
    calculatingIndicators.style.opacity = '1';
    animateIndicatorsCalculation();
    
    setTimeout(() => {
        calculatingIndicators.style.display = 'none';
        calculatingIndicators.style.opacity = '0';
        analyzeSignal();
        
        getSignalBtn.classList.remove('loading');
        getSignalBtn.style.display = 'none';
        newPhotoBtn.style.display = 'flex';
        newPhotoBtn.style.opacity = '1';
        newPhotoBtn.disabled = false;
        newPhotoBtn.classList.remove('loading');
    }, 2200);
};

getSignalBtn.addEventListener('click', handleGetSignalClick);

// Animate indicators calculation
function animateIndicatorsCalculation() {
    const indicators = calculatingIndicators.querySelectorAll('.indicator-item');
    const delay = 400; // Delay between each indicator
    
    // Reset all indicators to calculating state first
    indicators.forEach((indicator) => {
        const status = indicator.querySelector('.indicator-status');
        status.classList.remove('completed');
        status.classList.add('calculating');
        status.textContent = translations[currentLanguage].calculating;
    });
    
    // Then animate them to completed state
    indicators.forEach((indicator, index) => {
        setTimeout(() => {
            const status = indicator.querySelector('.indicator-status');
            status.classList.remove('calculating');
            status.classList.add('completed');
            status.textContent = translations[currentLanguage].ready;
        }, delay * (index + 1));
    });
}

// Fake Signal Analysis
function analyzeSignal() {
    // Generate fake prediction
    const directions = ['BUY', 'SELL'];
    const randomDirection = directions[Math.floor(Math.random() * directions.length)];
    const isUp = randomDirection === 'BUY';
    const accuracy = Math.floor(Math.random() * 19) + 75; // 75-93%
    
    // Get selected currency pair info
    const selectedOption = currencySelect.options[currencySelect.selectedIndex];
    const pairValue = selectedOption.value;
    const flag1Value = selectedOption.dataset.flag1;
    const flag2Value = selectedOption.dataset.flag2;
    
    // Update currency pair flags
    const signalCurrencyFlags = document.getElementById('signalCurrencyFlags');
    if (signalCurrencyFlags && flag1Value && flag2Value) {
        signalCurrencyFlags.innerHTML = `
            <img src="svg/${flag1Value}.svg" alt="${flag1Value.toUpperCase()}" class="flag-icon">
            <img src="svg/${flag2Value}.svg" alt="${flag2Value.toUpperCase()}" class="flag-icon">
        `;
    }
    
    // Update currency pair text
    const pairText = currentMode === 'otc' ? `${pairValue} OTC` : pairValue;
    document.getElementById('detailPair').textContent = pairText;
    
    // Update timeframe
    document.getElementById('detailTimeframe').textContent = timeframeSelect.value;
    
    // Animate accuracy counter
    const accuracyElement = document.getElementById('detailAccuracy');
    let currentAccuracy = 0;
    const animateAccuracy = () => {
        currentAccuracy = Math.min(currentAccuracy + 3, accuracy);
        accuracyElement.textContent = currentAccuracy + '%';
        if (currentAccuracy < accuracy) {
            requestAnimationFrame(animateAccuracy);
        }
    };
    requestAnimationFrame(animateAccuracy);
    
    // Update direction
    const directionElement = document.getElementById('detailDirection');
    const directionIcon = document.getElementById('directionIcon');
    const t = translations[currentLanguage];
    directionElement.textContent = isUp ? t.buy : t.sell;
    directionElement.className = 'direction-text ' + (isUp ? 'up' : 'down');
    // Store direction type for language updates
    directionElement.dataset.direction = isUp ? 'buy' : 'sell';
    
    // Update direction icon
    if (directionIcon) {
        directionIcon.className = 'direction-icon ' + (isUp ? 'up' : 'down');
        if (isUp) {
            directionIcon.innerHTML = `
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 17L12 12L17 17M7 11L12 6L17 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            `;
        } else {
            directionIcon.innerHTML = `
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 13L12 18L17 13M7 6L12 11L17 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            `;
        }
    }
    
    // Show signal info
    signalInfo.style.display = 'block';
    signalInfo.style.opacity = '1';
    signalInfo.style.transform = 'none';
    
    // Animate progress bar
    const progressFill = document.getElementById('progressFill');
    const progressPercent = document.getElementById('progressPercent');
    progressFill.style.width = '0%';
    
    let progress = 0;
    const animateProgress = () => {
        progress = Math.min(progress + 4, 100);
        progressFill.style.width = progress + '%';
        progressPercent.textContent = progress + '%';
        if (progress < 100) {
            requestAnimationFrame(animateProgress);
        }
    };
    requestAnimationFrame(animateProgress);
}

// Update all text content based on current language
function updateLanguage() {
    const t = translations[currentLanguage];
    
    // Language selector - update trigger display
    if (languageFlag) {
        const flagMap = {
            'en': 'gb',
            'ru': 'ru',
            'hi': 'in',
            'ar': 'sa',
            'tg': 'tj',
            'uz': 'uz',
            'tr': 'tr'
        };
        languageFlag.src = `svg/${flagMap[currentLanguage] || 'gb'}.svg`;
    }
    
    // Placeholder text
    const placeholderText = document.querySelector('.placeholder-text');
    if (placeholderText) {
        placeholderText.textContent = t.placeholderText;
    }
    
    // Get Signal button
    if (getSignalBtn && !getSignalBtn.classList.contains('loading')) {
        getSignalBtn.textContent = t.getSignal;
    }
    
    // New Photo button
    const newPhotoBtnSvg = newPhotoBtn.querySelector('svg');
    if (newPhotoBtnSvg) {
        // Find and update text node after SVG
        let textNode = newPhotoBtnSvg.nextSibling;
        // Remove all text nodes after SVG
        while (textNode && textNode.nodeType === 3) {
            const toRemove = textNode;
            textNode = textNode.nextSibling;
            toRemove.remove();
        }
        // Add new text node
        const newTextNode = document.createTextNode(' ' + t.loadMorePhotos);
        newPhotoBtn.insertBefore(newTextNode, newPhotoBtnSvg.nextSibling);
    }
    
    // Calculating indicators
    const calculatingTitle = document.querySelector('.calculating-title');
    if (calculatingTitle) {
        calculatingTitle.textContent = t.calculatingIndicators;
    }
    
    const calculatingText = document.querySelector('.calculating-text');
    if (calculatingText) {
        calculatingText.textContent = t.analyzingIndicators;
    }
    
    // Signal info labels - update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (t[key]) {
            element.textContent = t[key];
        }
    });
    
    // Update direction text if signal was already generated
    const directionElement = document.getElementById('detailDirection');
    if (directionElement && directionElement.dataset.direction) {
        const directionType = directionElement.dataset.direction;
        directionElement.textContent = directionType === 'buy' ? t.buy : t.sell;
    }
    
    // Update modal title if modal is open
    updateLanguageModalTitle();
}

// Custom Language Selector functionality (already defined above)

// Load language from localStorage on page load
function initLanguage() {
    const savedLanguage = localStorage.getItem('language');
    const validLanguages = ['en', 'ru', 'hi', 'ar', 'tg', 'uz', 'tr'];
    if (savedLanguage && validLanguages.includes(savedLanguage)) {
        currentLanguage = savedLanguage;
    } else {
        currentLanguage = 'en'; // Default to English
    }
    
    // Update language selector display
    if (languageFlag) {
        const flagMap = {
            'en': 'gb',
            'ru': 'ru',
            'hi': 'in',
            'ar': 'sa',
            'tg': 'tj',
            'uz': 'uz',
            'tr': 'tr'
        };
        languageFlag.src = `svg/${flagMap[currentLanguage] || 'gb'}.svg`;
        
        // Update selected state in modal
        if (languageModalList) {
            languageModalList.querySelectorAll('.language-modal-option').forEach(opt => {
                opt.classList.remove('selected');
                if (opt.dataset.lang === currentLanguage) {
                    opt.classList.add('selected');
                }
            });
        }
    }
    
    // Update all text content after language is loaded
    updateLanguage();
}

// Update language modal title
function updateLanguageModalTitle() {
    const title = document.querySelector('.language-modal-title');
    if (title) {
        const titles = {
            'en': 'Select the language',
            'ru': 'Выберите язык',
            'hi': 'भाषा चुनें',
            'ar': 'اختر اللغة',
            'tg': 'Забонро интихоб кунед',
            'uz': 'Tilni tanlang',
            'tr': 'Dil seçin'
        };
        title.textContent = titles[currentLanguage] || titles['en'];
    }
}

// Close language dropdown when clicking outside
document.addEventListener('click', (e) => {
});

// Custom Currency / Timeframe dropdowns
currencyTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    timeframeTrigger.classList.remove('active');
    timeframeDropdown.classList.remove('open');
    languageModal.classList.remove('active');
    currencyTrigger.classList.toggle('active');
    currencyDropdown.classList.toggle('open');
});

timeframeTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    currencyTrigger.classList.remove('active');
    currencyDropdown.classList.remove('open');
    languageModal.classList.remove('active');
    timeframeTrigger.classList.toggle('active');
    timeframeDropdown.classList.toggle('open');
});

// New Photo Button
const handleNewPhotoClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    newPhotoBtn.classList.remove('loading');
    newPhotoBtn.disabled = false;
    resetToPhotoUpload();
};

newPhotoBtn.addEventListener('click', handleNewPhotoClick);

// Reset to photo upload state
function resetToPhotoUpload() {
    if (previewObjectUrl) {
        URL.revokeObjectURL(previewObjectUrl);
        previewObjectUrl = null;
    }
    selectedImage = null;
    previewImage.removeAttribute('src');
    previewImage.style.display = 'none';
    signalInfo.style.display = 'none';
    calculatingIndicators.style.display = 'none';
    calculatingIndicators.style.opacity = '0';
    signalPlaceholder.style.display = 'flex';
    signalPlaceholder.style.opacity = '1';
    signalPlaceholder.style.transform = 'scale(1)';
    imageInput.value = '';
    
    const indicators = calculatingIndicators.querySelectorAll('.indicator-status');
    indicators.forEach(status => {
        status.classList.remove('completed');
        status.classList.add('calculating');
        status.textContent = translations[currentLanguage].calculating;
    });
    
    newPhotoBtn.style.display = 'none';
    newPhotoBtn.style.opacity = '0';
    newPhotoBtn.classList.remove('loading');
    getSignalBtn.style.display = 'block';
    getSignalBtn.disabled = true;
    getSignalBtn.style.opacity = '0.5';
    getSignalBtn.style.cursor = 'not-allowed';
    getSignalBtn.textContent = translations[currentLanguage].getSignal;
    getSignalBtn.classList.remove('loading');
}

// Initialize language on page load
initLanguage();

// Initialize
getSignalBtn.disabled = true;
getSignalBtn.style.opacity = '0.5';
getSignalBtn.style.cursor = 'not-allowed';

// Initialize timeframes and currency select
updateTimeframeOptions();
updateCurrencyOptions();

// Set initial selected option in custom dropdown
const initialOption = currencyDropdown.querySelector('.custom-option[data-value="EURUSD"]');
if (initialOption) {
    initialOption.classList.add('selected');
}

// Update all custom options when mode changes
function updateCustomCurrencyOptions() {
    const customOptions = currencyDropdown.querySelectorAll('.custom-option');
    const selectedValue = currencySelect.value;
    
    customOptions.forEach(option => {
        const optionValue = option.dataset.value;
        const optionText = option.querySelector('.currency-text');
        
        if (currentMode === 'otc') {
            optionText.textContent = `${optionValue} OTC`;
        } else {
            optionText.textContent = optionValue;
        }
        
        if (optionValue === selectedValue) {
            option.classList.add('selected');
        } else {
            option.classList.remove('selected');
        }
    });
    
    if (currentMode === 'otc') {
        currencyText.textContent = `${selectedValue} OTC`;
    } else {
        currencyText.textContent = selectedValue;
    }
}
