
	atOptions = {
		'key' : '8c5030410fa6adf08402ef30473d5fa0',
		'format' : 'iframe',
		'height' : 250,
		'width' : 300,
		'params' : {}
	};


	atOptions = {
		'key' : '8c5030410fa6adf08402ef30473d5fa0',
		'format' : 'iframe',
		'height' : 250,
		'width' : 300,
		'params' : {}
	};


	atOptions = {
		'key' : '8c5030410fa6adf08402ef30473d5fa0',
		'format' : 'iframe',
		'height' : 250,
		'width' : 300,
		'params' : {}
	};


	atOptions = {
		'key' : '8c5030410fa6adf08402ef30473d5fa0',
		'format' : 'iframe',
		'height' : 250,
		'width' : 300,
		'params' : {}
	};


	atOptions = {
		'key' : '8c5030410fa6adf08402ef30473d5fa0',
		'format' : 'iframe',
		'height' : 250,
		'width' : 300,
		'params' : {}
	};


	atOptions = {
		'key' : '8c5030410fa6adf08402ef30473d5fa0',
		'format' : 'iframe',
		'height' : 250,
		'width' : 300,
		'params' : {}
	};


	atOptions = {
		'key' : '8c5030410fa6adf08402ef30473d5fa0',
		'format' : 'iframe',
		'height' : 250,
		'width' : 300,
		'params' : {}
	};


	atOptions = {
		'key' : '8c5030410fa6adf08402ef30473d5fa0',
		'format' : 'iframe',
		'height' : 250,
		'width' : 300,
		'params' : {}
	};


	atOptions = {
		'key' : '8c5030410fa6adf08402ef30473d5fa0',
		'format' : 'iframe',
		'height' : 250,
		'width' : 300,
		'params' : {}
	};


document.addEventListener('DOMContentLoaded', () => {
    // --- Basic Setup ---
    const body = document.body;
    const toolModal = document.getElementById('tool-modal');
    const toolModalTitle = document.getElementById('tool-modal-title');
    const toolInterfaceContent = document.getElementById('tool-interface-content');
    const aboutModal = document.getElementById('about-us-modal');
    const privacyModal = document.getElementById('privacy-policy-modal');
    // CONFIG object for future use (no API keys stored in frontend)
    const CONFIG = {};

// ✅ Example: Use the key
console.log("Gemini API Key:", CONFIG.API_KEYS.GEMINI);

    let pdfDoc = null;
    let addedTexts = [];
    let chartInstance = null;
    let recognition; // SpeechRecognition instance
    let isRecording = false;
    let final_transcript = '';

    // --- Tool Descriptions for Modals and "How To Use" Section ---
    const toolDetails = {
        'income-tax-calculator': {
            icon: 'fas fa-rupee-sign', title: 'Income Tax Calculator',
            desc: 'Navigate tax season with confidence using our free Income Tax Calculator. Designed for both salaried individuals and freelancers, this online tool simplifies complex calculations for the latest financial year. Just enter your annual income to get an instant, accurate estimate of your tax liability under the new regime.'
        },
        'sip-calculator': {
            icon: 'fas fa-hand-holding-dollar', title: 'SIP Calculator',
            desc: 'Plan your path to financial freedom with our powerful SIP Calculator. This free online tool helps you forecast the future value of your Systematic Investment Plan (SIP) in mutual funds. By entering your investment details, you can visualize your potential wealth accumulation over time.'
        },
        'emi-calculator': {
            icon: 'fas fa-landmark', title: 'EMI Calculator',
            desc: 'Considering a new loan? Our free EMI Calculator is the perfect online tool to help you plan your finances. Whether it\'s for a home, car, or personal loan, you can instantly calculate your Equated Monthly Installment (EMI) by inputting the loan amount, interest rate, and tenure.'
        },
        'word-counter': {
            icon: 'fas fa-file-word', title: 'Word / Character Counter',
            desc: 'Meet your writing goals with our efficient Word Counter tool. Perfect for students, writers, and digital marketers, this free online utility provides an instant and accurate count of words, characters, and sentences in your text. Simply paste your content for a real-time analysis.'
        },
        'text-to-speech': {
            icon: 'fas fa-volume-up', title: 'Text to Speech',
            desc: 'Transform written content into natural-sounding audio with our free Text to Speech (TTS) converter. This powerful online tool is perfect for multitasking—listen to articles while you work, proofread documents by hearing them aloud, or create voiceovers for your projects. It supports multiple languages and a variety of voices.'
        },
        'speech-to-text': {
            icon: 'fas fa-microphone', title: 'Speech to Text',
            desc: 'Capture your thoughts effortlessly with our free Speech to Text transcription tool. Ideal for students, journalists, and professionals, this online utility converts your spoken words into written text in real-time. Simply click the record button and start speaking to take hands-free notes or draft emails.'
        },
        'grammar-checker': {
            icon: 'fas fa-check-double', title: 'Grammar Checker',
            desc: 'Polish your writing to perfection with our Grammar Checker. This free online tool helps you identify and correct common grammatical errors, spelling mistakes, and punctuation issues. Simply paste your text, and our checker will highlight potential improvements, helping you write with more confidence.'
        },
        'rephraser': {
            icon: 'fas fa-retweet', title: 'Rephraser',
            desc: 'Overcome writer\'s block and enhance your vocabulary with our free online Rephraser tool. This utility helps you find new ways to express your ideas by rewording sentences and suggesting alternative phrasing. It\'s perfect for making your writing more engaging, clear, and original.'
        },
		        'merge-pdf': {
            icon: 'fas fa-object-group', title: 'Merge PDF',
            desc: 'Streamline your document management with our free Merge PDF tool. Easily combine multiple PDF files into a single, organized document directly in your browser. This online utility is perfect for compiling reports, presentations, or personal documents. Simply upload your files and merge.'
        },
        'split-pdf': {
            icon: 'fas fa-object-ungroup', title: 'Split PDF',
            desc: 'Need to extract specific pages from a large PDF? Our free Split PDF tool makes it easy. This online utility allows you to divide a single PDF into multiple smaller files or extract a specific range of pages. It\'s perfect for separating chapters, creating excerpts, or reducing file size.'
        },
        'pdf-unlocker': {
            icon: 'fas fa-unlock-alt', title: 'PDF Unlocker',
            desc: 'Regain access to your restricted documents with our free PDF Unlocker. This online tool is designed to remove owner password protection from PDF files, allowing you to edit, copy, or print them. The process is fast and secure, as your file is handled directly on your device.'
        },
        'pdf-editor': {
            icon: 'fas fa-file-signature', title: 'PDF Editor (Add Text)',
            desc: 'Make quick changes to your documents with our simple and free PDF Editor. This online tool allows you to easily add text to any PDF file, making it perfect for filling out forms, adding comments, or making quick annotations without complex software. It\'s a secure, browser-based solution.'
        },
        'text-summarizer': {
            icon: 'fas fa-file-contract', title: 'Text Summarizer',
            desc: 'Quickly condense long articles, documents, or essays with our free Text Summarizer. This tool analyzes your text and extracts the most important points, creating a concise summary while preserving key information. Perfect for students, researchers, and professionals who need to process large amounts of text efficiently.'
        },
        'wish-generator': {
            icon: 'fas fa-birthday-cake', title: 'Birthday Wish Generator',
			desc: 'Create personalized birthday wishes instantly! Just enter a name, choose a style (funny, formal, heartfelt), and our AI will generate a unique birthday message. Perfect for when you want to send warm wishes but need some creative inspiration.'	},

            'wedding-anniversary-wish': {
            icon: 'fas fa-ring',
            title: 'Wedding Anniversary Wish',
            desc: 'Craft heartfelt wedding anniversary wishes instantly! Enter the couple\'s name, select a tone (romantic, formal, funny), and generate a personalized message to celebrate their special day with love and warmth.'
        },
        'recipe-generator': {
            icon: 'fas fa-utensils',
            title: 'Recipe Generator',
            desc: 'Enter the name of a dish and generate its recipe in both English and Hindi. Great for bilingual cooking inspiration! I would appreciate it if you could wait for 2 minutes after entering the recipe name before providing the output.'
        },


        'work-anniversary-wish': {
            icon: 'fas fa-briefcase',
            title: 'Work Anniversary Wish',
            desc: 'Generate professional and thoughtful work anniversary wishes! Input a name, pick a tone (formal, cheerful, appreciative), and get a custom message to honor career milestones and dedication.'
        },

        'romantic-shayari-generator': {
            icon: 'fas fa-heartbeat',
            title: 'Romantic Shayari Generator',
            desc: 'Express your love with beautiful romantic shayari! Choose a style (filmy, poetic, modern), and instantly get soulful lines to impress your special someone or add magic to your messages.'
        },
        'email-writer': {
            icon: 'fas fa-envelope',
            title: 'Professional Email Writer',
            desc: 'Generate professional email drafts in seconds. Simply enter your subject, and our AI will create a polished email body tailored to your topic. Perfect for formal, business, or job-related communication.'
        },

        'sad-status-generator': {
            icon: 'fas fa-cloud-rain',
            title: 'Sad status Generator',
            desc: 'Dive into emotions with touching sad status. Select a theme (heartbreak, loneliness, nostalgia) and let AI create deep, soulful verses to match your mood or artistic expression.'
        },
        'c-program-generator': {
            icon: 'fas fa-code',
            title: 'C Program Generator',
            desc: 'Generate C programs instantly! Just enter your desired functionality or problem statement, and get a clean, compilable C program written by AI. Great for students, developers, and coding practice.'
        },

        'cpp-program-generator': {
            icon: 'fas fa-laptop-code',
            title: 'C++ Program Generator',
            desc: 'Create C++ programs effortlessly! Provide a task or topic, and our AI will generate a modern, standards-compliant C++ program with proper structure and comments. Ideal for learning and prototyping.'
        },

        'python-program-generator': {
            icon: 'fab fa-python',
            title: 'Python Program Generator',
            desc: 'Get Python code generated instantly! Enter a problem or task, and receive a well-commented Python script tailored to your needs. Useful for quick automation, learning, or data projects.'
        },
        'qr-generator': {
            icon: 'fas fa-qrcode', title: 'QR Code Generator',
            desc: 'Create custom QR codes in seconds with our free QR Code Generator. This versatile online tool allows you to generate high-quality QR codes for URLs, text, Wi-Fi credentials, email addresses, and more. It\'s an essential utility for businesses, marketers, and individuals.'
        },
        'image-resizer': {
            icon: 'fas fa-crop-alt', title: 'Image Resizer',
            desc: 'Resize your images perfectly for any platform with our free online Image Resizer. Whether you need to prepare photos for social media, a website, or an email attachment, this tool makes it easy. Upload your image, enter your desired dimensions, and our resizer will adjust it instantly.'
        },
        'baby-name-combiner': {
            icon: 'fas fa-baby', title: 'Baby Name Combiner',
            desc: 'Create unique baby names by combining parents\' names with our AI-powered Baby Name Combiner. Simply enter the parents\' names, select gender and cultural origin preferences, and get a list of creative name combinations. Perfect for expecting parents looking for meaningful name ideas.'
        }
    };
    
    // --- Populate "How To Use" Section ---
    const howToUseContainer = document.querySelector('.how-to-use-container');
    if (howToUseContainer) {
        howToUseContainer.innerHTML = Object.values(toolDetails).map(tool => `
            <div class="how-to-item">
                <div class="icon"><i class="${tool.icon}"></i></div>
                <div class="how-to-item-content">
                    <h3>${tool.title}</h3>
                    <p>${tool.desc}</p>
                </div>
            </div>
        `).join('');
    }
    
    // --- Theme Toggling ---
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'light-theme') {
        body.classList.add('light-theme');
    }

    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        localStorage.setItem('theme', body.classList.contains('light-theme') ? 'light-theme' : 'dark-theme');
    });

    // --- Interactive Background ---
    const canvas = document.getElementById('starfield-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let stars = [];
        let animationFrameId;

        const setupCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createStars = () => {
            stars = [];
            const starCount = Math.floor((canvas.width * canvas.height) / 4000);
            for (let i = 0; i < starCount; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 1.5 + 0.5,
                    velocity: 0.1 + Math.random() * 0.2
                });
            }
        };

        const draw = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim();
            const starColor = `rgba(${parseInt(accentColor.substr(1, 2), 16)}, ${parseInt(accentColor.substr(3, 2), 16)}, ${parseInt(accentColor.substr(5, 2), 16)}, 0.8)`;
            const lineColor = `rgba(${parseInt(accentColor.substr(1, 2), 16)}, ${parseInt(accentColor.substr(3, 2), 16)}, ${parseInt(accentColor.substr(5, 2), 16)}, 0.3)`;
            
            ctx.fillStyle = starColor;
            stars.forEach(star => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fill();
            });

            ctx.beginPath();
            for (let i = 0; i < stars.length; i++) {
                for (let j = i; j < stars.length; j++) {
                    const dx = stars[i].x - stars[j].x;
                    const dy = stars[i].y - stars[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 120) {
                        ctx.moveTo(stars[i].x, stars[i].y);
                        ctx.lineTo(stars[j].x, stars[j].y);
                        ctx.strokeStyle = lineColor;
                        ctx.lineWidth = 0.3;
                    }
                }
            }
            ctx.stroke();
        };

        const update = () => {
            stars.forEach(star => {
                star.y += star.velocity;
                if (star.y > canvas.height + star.radius) {
                    star.y = -star.radius;
                    star.x = Math.random() * canvas.width;
                }
            });
        };

        const animate = () => {
            draw();
            update();
            animationFrameId = requestAnimationFrame(animate);
        };

        const initAnimation = () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            setupCanvas();
            createStars();
            animate();
        };
        
        window.addEventListener('resize', initAnimation);
        initAnimation();
    }

    // --- Scroll Animations ---
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });
    sections.forEach(section => observer.observe(section));
    
    // --- Sidebar and Navigation ---
    const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
    const mobileMenuToggleBtn = document.getElementById('mobile-menu-toggle-btn');
    sidebarToggleBtn.addEventListener('click', () => body.classList.toggle('sidebar-collapsed'));
    mobileMenuToggleBtn.addEventListener('click', (e) => { 
        e.stopPropagation(); 
        body.classList.toggle('sidebar-open');
        body.classList.remove('sidebar-collapsed');
    });
    
    document.addEventListener('click', (e) => {
        const sidebar = document.getElementById('sidebar');
        if (body.classList.contains('sidebar-open') && sidebar && !sidebar.contains(e.target) && e.target !== mobileMenuToggleBtn) {
            body.classList.remove('sidebar-open');
        }
    });
    
    // --- Tool Filtering ---
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            sidebarLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            const category = this.dataset.category;
            
            document.querySelectorAll('.grid-container .tool-card').forEach(card => {
                const cardCategories = card.dataset.category ? card.dataset.category.split(' ') : [];
                const isStatCard = !card.hasAttribute('data-category');
                
                if (category === 'all' || isStatCard) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = cardCategories.includes(category) ? 'flex' : 'none';
                }
            });

            if (window.innerWidth <= 992) {
                body.classList.remove('sidebar-open');
            }
        });
    });

    // --- Modal Handling ---
    const closeModal = (modal) => { 
        if(modal) modal.style.display = 'none'; 
        if(toolInterfaceContent) toolInterfaceContent.innerHTML = ''; 
        pdfDoc = null;
        addedTexts = [];
        if (chartInstance) {
            chartInstance.destroy();
            chartInstance = null;
        }
        // Stop any ongoing speech synthesis or recognition
        speechSynthesis.cancel();
        if (recognition && isRecording) {
            recognition.stop();
        }
    };

    [toolModal, aboutModal, privacyModal].forEach(modal => {
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal || e.target.classList.contains('close-btn')) {
                    closeModal(modal);
                }
            });
        }
    });
    
    // --- Page Navigation Links ---
    document.querySelectorAll('a.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#about-us') {
                e.preventDefault();
                if(aboutModal) aboutModal.style.display = 'flex';
            } else if (targetId === '#privacy-policy') {
                e.preventDefault();
                if(privacyModal) privacyModal.style.display = 'flex';
            } else if (targetId.startsWith('#')) {
                 e.preventDefault();
                 const targetElement = document.querySelector(targetId);
                 if(targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                 }
            }
        });
    });

    // --- Tool Card Click ---
    document.querySelectorAll('.tool-card[data-tool]').forEach(card => {
        card.addEventListener('click', () => {
            const toolId = card.dataset.tool;
            const toolData = toolDetails[toolId];
            if (!toolData) return;
            
            toolModalTitle.innerText = toolData.title;
            setupToolInterface(toolId, toolData.desc);
            toolModal.style.display = 'flex';
        });
    });
    
    // --- Tool Interface Setup ---
    const setupToolInterface = (toolId, description) => {
        let html = '';
        const calculatorWithSliderUI = (fields, resultLayout) => {
            const tabs = fields.tabs ? `
                <div class="calc-tabs">
                    ${fields.tabs.map((tab, index) => `<div class="calc-tab ${index === 0 ? 'active' : ''}" data-tab="${tab.id}">${tab.name}</div>`).join('')}
                </div>` : '';
            
            const tabContent = (tabFields) => tabFields.map(f => `
                <div class="control-group">
                    <div class="control-row">
                        <label for="${f.id}">${f.label}</label>
                        <input type="number" id="${f.id}-num" value="${f.value}" step="${f.step || 1}">
                    </div>
                    <input type="range" id="${f.id}-range" min="${f.min}" max="${f.max}" value="${f.value}" step="${f.step || 1}">
                </div>
            `).join('');

            const content = fields.tabs ? 
                fields.tabs.map((tab, index) => `<div id="tab-${tab.id}" class="tab-content" style="display:${index === 0 ? 'block' : 'none'};">${tabContent(tab.fields)}</div>`).join('') :
                tabContent(fields.fields);

            return `
                ${tabs}
                <div class="tool-controls">${content}</div>
                <div id="tool-output-container" style="display:none; margin-top: 1.5rem;">
                    ${resultLayout}
                </div>
            `;
        };

        const textToolUI = (buttonText, placeholder, note = '') => `
            <textarea id="text-input" class="tool-textarea" placeholder="${placeholder}"></textarea>
            <button id="process-btn" class="cta-button" style="width:100%; border-radius:8px;">${buttonText}</button>
            ${note ? `<p style="font-size: 0.8rem; text-align: center; margin-top: 1rem;">${note}</p>` : ''}
            <div id="tool-output-container" style="display:none;">
                 <div class="tool-output-header">
                    <span>Result</span>
                    <button class="copy-btn" id="copy-result-btn"><i class="fas fa-copy"></i> Copy</button>
                </div>
                <div id="tool-output" class="tool-output"></div>
            </div>
        `;
        
        const fileToolUI = (options) => `
            <div class="tool-controls">
                <label for="file-input" class="file-input-label"><i class="fas fa-upload"></i> ${options.label}</label>
                <input type="file" id="file-input" ${options.multiple ? 'multiple' : ''} accept="${options.accept}">
                <div id="file-list" class="file-list">No file selected</div>
                ${options.fields ? options.fields.map(f => `
                    <div class="control-group">
                        <label for="${f.id}">${f.label}</label>
                        <input type="${f.type || 'text'}" id="${f.id}" placeholder="${f.placeholder || ''}" class="tool-textarea" style="min-height: auto; padding: 0.75rem;">
                    </div>`).join('') : ''
                }
            </div>
            <button id="process-btn" class="cta-button" style="width:100%; border-radius:8px; margin-top: 1rem;">${options.buttonText}</button>
            <div id="tool-output-container" style="text-align:center; display:none; margin-top: 1rem;">
                <div id="tool-output" class="tool-output"></div>
            </div>
        `;

        switch (toolId) {
		        case 'sip-calculator':
                html = calculatorWithSliderUI({
                    tabs: [
                        { id: 'sip', name: 'SIP', fields: [
                            {id: 'monthly-investment', label: 'Monthly Investment (₹)', min: 500, max: 100000, value: 5000, step: 500},
                            {id: 'return-rate', label: 'Expected Return Rate (p.a. %)', min: 1, max: 30, value: 12, step: 0.5},
                            {id: 'duration', label: 'Time Period (Years)', min: 1, max: 40, value: 10, step: 1}
                        ]},
                        { id: 'lumpsum', name: 'Lumpsum', fields: [
                            {id: 'total-investment', label: 'Total Investment (₹)', min: 1000, max: 10000000, value: 100000, step: 1000},
                            {id: 'lumpsum-return-rate', label: 'Expected Return Rate (p.a. %)', min: 1, max: 30, value: 12, step: 0.5},
                            {id: 'lumpsum-duration', label: 'Time Period (Years)', min: 1, max: 40, value: 10, step: 1}
                        ]}
                    ]
                },
                `<div style="display: flex; flex-direction: column; align-items: center; gap: 1.5rem;">
                    <div id="chart-container" style="position: relative; height:200px; width:200px;"><canvas id="result-chart"></canvas></div>
                    <div id="tool-output" class="tool-output" style="width: 100%; text-align: left;"></div>
                 </div>`
                );
                break;
                        case 'baby-name-combiner': 
                html = `
                    <div class="tool-controls">
                        <div class="control-group">
                            <label for="name1">Name 1 (e.g. Father)</label>
                            <input type="text" id="name1" class="tool-textarea" style="min-height: auto; padding: 0.75rem;" placeholder="e.g. Ankit">
                        </div>
                        <div class="control-group">
                            <label for="name2">Name 2 (e.g. Mother)</label>
                            <input type="text" id="name2" class="tool-textarea" style="min-height: auto; padding: 0.75rem;" placeholder="e.g. Preeti">
                        </div>
                        <div class="control-group">
                            <label for="gender">Gender</label>
                            <select id="gender" class="tool-textarea" style="min-height: auto; padding: 0.75rem;">
                                <option value="">Any</option>
                                <option value="boy">Boy</option>
                                <option value="girl">Girl</option>
                            </select>
                        </div>
                        <div class="control-group">
                            <label for="origin">Category</label>
                            <select id="origin" class="tool-textarea" style="min-height: auto; padding: 0.75rem;">
                                <option value="">Any</option>
                                <option value="hindu">Hindu</option>
                                <option value="english">English</option>
                                <option value="arabic">Arabic</option>
                                <option value="sanskrit">Sanskrit</option>
                            </select>
                        </div>
                    </div>
                    <button id="process-btn" class="cta-button" style="width:100%; border-radius:8px;">Generate Names</button>
                    <div id="tool-output-container" style="display:none; margin-top: 1.5rem;">
                        <div class="tool-output-header">
                            <span>Generated Names</span>
                        </div>
                        <div id="tool-output" class="tool-output"></div>
                    </div>
                `;
                break;    
            case 'emi-calculator': html = calculatorWithSliderUI({
                fields: [
                    {id: 'principal', label: 'Loan Amount (₹)', min: 1000, max: 10000000, value: 500000, step: 1000},
                    {id: 'interest', label: 'Interest Rate (%)', min: 1, max: 20, value: 8.5, step: 0.1},
                    {id: 'tenure', label: 'Loan Tenure (Years)', min: 1, max: 30, value: 5, step: 1}
                ]
            }, `<div id="tool-output" class="tool-output" style="text-align: left;"></div>`); break;
            case 'income-tax-calculator':
                html = `
                    <div class="tool-controls">
                        <div class="control-group">
                           <label for="age-category">Age Category</label>
                           <select id="age-category">
                               <option value="below_60">Below 60 years</option>
                               <option value="60_to_80">60 to 80 years</option>
                               <option value="above_80">Above 80 years</option>
                           </select>
                        </div>
                        <div class="control-group">
                            <div class="control-row"><label for="annual-income">Total Annual Income (₹)</label><input type="number" id="annual-income-num" value="1000000"></div>
                            <input type="range" id="annual-income-range" min="250000" max="10000000" value="1000000" step="10000">
                        </div>
                        <div class="control-group">
                            <div class="control-row"><label for="deductions">Total Deductions (₹)</label><input type="number" id="deductions-num" value="150000"></div>
                            <input type="range" id="deductions-range" min="0" max="500000" value="150000" step="5000">
                        </div>
                    </div>
                    <button id="calc-btn" class="cta-button" style="width:100%; border-radius:8px; margin-top: 1rem;">Calculate</button>
                    <div id="tool-output-container" style="display:none; margin-top: 1.5rem;">
                        <div id="tool-output" class="tool-output" style="text-align: left;"></div>
                    </div>
                `;
                break;
            case 'word-counter': html = `<textarea id="wc-input" class="tool-textarea" placeholder="Paste your text here to count words, characters..."></textarea><div id="tool-output-container" style="display: block;"><div id="tool-output" class="tool-output">Words: 0 | Characters: 0 | Sentences: 0</div></div>`; break;
            case 'text-to-speech': 
                html = `
                    <textarea id="tts-input" class="tool-textarea" placeholder="Enter text to speak..."></textarea>
                    <div class="tool-controls" style="margin-top: 1rem; gap: 1.5rem;">
                        <div class="control-group">
                            <label for="tts-voice">Voice</label>
                            <select id="tts-voice"></select>
                        </div>
                        <div class="control-group">
                            <label for="tts-rate">Rate: <span id="tts-rate-value">1</span></label>
                            <input type="range" id="tts-rate" min="0.5" max="2" value="1" step="0.1">
                        </div>
                        <div class="control-group">
                            <label for="tts-pitch">Pitch: <span id="tts-pitch-value">1</span></label>
                            <input type="range" id="tts-pitch" min="0" max="2" value="1" step="0.1">
                        </div>
                    </div>
                    <button id="tts-speak-btn" class="cta-button" style="width:100%; border-radius:8px; margin-top: 1rem;"><i class="fas fa-play"></i> Speak</button>
                `; 
                break;
            case 'speech-to-text': html = `<div class="tool-output-header"><span>Recognized Text</span><button class="copy-btn" id="copy-result-btn"><i class="fas fa-copy"></i> Copy</button></div><textarea id="stt-output" class="tool-textarea" readonly placeholder="Press the button and start speaking..."></textarea><button id="stt-btn" class="cta-button speech-btn" style="width:100%; border-radius:8px;"><i class="fas fa-microphone"></i> Record</button>`; break;

            case 'grammar-checker': html = textToolUI('Check Grammar', 'Paste your text here for a basic grammar check...', '(Note: This tool uses AI and may not be 100% accurate.)'); break;
			case 'rephraser': html = textToolUI('Rephrase', 'Paste your text here to get a rephrased version...', '(Note: This tool uses AI and may require review.)'); break;
			case 'text-summarizer': html = textToolUI('Summarize', 'Paste your text here to generate a summary...', 'This tool will analyze your text and extract the key points.'); break;
            case 'merge-pdf': html = fileToolUI({ label: 'Select PDFs to Merge', accept: '.pdf', multiple: true, buttonText: 'Merge PDFs' }); break;
            case 'split-pdf': html = fileToolUI({ label: 'Select PDF to Split', accept: '.pdf', buttonText: 'Split PDF', fields: [{id: 'page-range', label: 'Page Range (e.g., 1-3, 5, 8-10)', placeholder: 'e.g., 1-3, 5, 8-10'}] }); break;
            case 'pdf-unlocker': html = fileToolUI({ label: 'Select PDF to Unlock', accept: '.pdf', buttonText: 'Unlock PDF', fields: [{id: 'pdf-password', type: 'password', label: 'PDF Password (if known)', placeholder: 'Optional'}] }); break;
            case 'recipe-generator': 
    html = `
        <div class="tool-controls">
            <div class="control-group">
                <label for="recipe-name">Recipe Name</label>
                <input type="text" id="recipe-name" class="tool-textarea" placeholder="Enter recipe name, e.g., Paneer Butter Masala" style="min-height: auto; padding: 0.75rem;">
            </div>
        </div>
        
        <button id="process-btn" class="cta-button" style="width:100%; border-radius:8px;">Generate Recipe</button>
        
        <div id="error" style="color: var(--error-color); margin-top: 1rem; text-align: center;"></div>
        
        <div id="recipeCard" class="tool-output" style="display: none; margin-top: 1.5rem; position: relative; overflow: hidden;">
            <div id="recipeText" style="padding: 1rem;"></div>
            <button id="copy-recipe-btn" class="copy-btn" style="position: absolute; bottom: 1rem; right: 1rem;">
                <i class="fas fa-copy"></i> Copy
            </button>
        </div>
    `; break;

            case 'wish-generator':
                html = `
                    <div class="tool-controls">
                        <div class="control-group">
                            <label for="name">Recipient's Name</label>
                            <input type="text" id="name" class="tool-textarea" placeholder="Enter name" style="min-height: auto; padding: 0.75rem;">
                        </div>
                        
                        <div class="control-group">
                            <label for="style">Wish Style</label>
                            <select id="style" class="tool-textarea" style="min-height: auto; padding: 0.75rem;">
                                <option value="funny">Funny</option>
                                <option value="formal">Formal</option>
                                <option value="heartfelt">Heartfelt</option>
                                <option value="creative">Creative</option>
                            </select>
                        </div>
                        
                        <div class="control-group">
                            <label for="animation">Animation</label>
                            <select id="animation" class="tool-textarea" style="min-height: auto; padding: 0.75rem;">
                                <option value="none">None</option>
                                <option value="confetti">Confetti</option>
                            </select>
                        </div>
                    </div>
                    
                    <button id="process-btn" class="cta-button" style="width:100%; border-radius:8px;">Generate Wish</button>
                    
                    <div id="error" style="color: var(--error-color); margin-top: 1rem; text-align: center;"></div>
                    
                    <div id="wishCard" class="tool-output" style="display: none; margin-top: 1.5rem; position: relative; overflow: hidden;">
                        <div id="wishText" style="padding: 1rem;"></div>
                        <button id="copy-wish-btn" class="copy-btn" style="position: absolute; bottom: 1rem; right: 1rem;">
                            <i class="fas fa-copy"></i> Copy
                        </button>
                    </div>
                `;break;
            // Wedding Anniversary Wish
            case 'wedding-anniversary-wish': 
              html = `
              <div class="tool-controls">
                <div class="control-group">
                <label for="name">Couple's Name</label>
                <input type="text" id="name" class="tool-textarea" placeholder="Enter names (e.g., John & Jane)" style="min-height: auto; padding: 0.75rem;">
              </div>

              <div class="control-group">
                <label for="style">Wish Style</label>
                <select id="style" class="tool-textarea" style="min-height: auto; padding: 0.75rem;">
                    <option value="romantic">Romantic</option>
                    <option value="funny">Funny</option>
                    <option value="formal">Formal</option>
                    <option value="poetic">Poetic</option>
                </select>
              </div>

            <div class="control-group">
                <label for="animation">Animation</label>
                <select id="animation" class="tool-textarea" style="min-height: auto; padding: 0.75rem;">
                    <option value="none">None</option>
                    <option value="confetti">Confetti</option>
                </select>
            </div>
        </div>

        <button id="process-btn" class="cta-button" style="width:100%; border-radius:8px;">Generate Wish</button>

        <div id="error" style="color: var(--error-color); margin-top: 1rem; text-align: center;"></div>

        <div id="wishCard" class="tool-output" style="display: none; margin-top: 1.5rem; position: relative; overflow: hidden;">
            <div id="wishText" style="padding: 1rem;"></div>
            <button id="copy-wish-btn" class="copy-btn" style="position: absolute; bottom: 1rem; right: 1rem;">
                <i class="fas fa-copy"></i> Copy
            </button>
        </div>
    `;
    break;

                   // Work Anniversary Wish
            case 'work-anniversary-wish': 
             html = `
        <div class="tool-controls">
            <div class="control-group">
                <label for="name">Employee's Name</label>
                <input type="text" id="name" class="tool-textarea" placeholder="Enter name" style="min-height: auto; padding: 0.75rem;">
            </div>

            <div class="control-group">
                <label for="style">Wish Style</label>
                <select id="style" class="tool-textarea" style="min-height: auto; padding: 0.75rem;">
                    <option value="formal">Formal</option>
                    <option value="appreciative">Appreciative</option>
                    <option value="light-hearted">Light-Hearted</option>
                </select>
            </div>

            <div class="control-group">
                <label for="animation">Animation</label>
                <select id="animation" class="tool-textarea" style="min-height: auto; padding: 0.75rem;">
                    <option value="none">None</option>
                    <option value="confetti">Confetti</option>
                </select>
            </div>
        </div>

        <button id="process-btn" class="cta-button" style="width:100%; border-radius:8px;">Generate Wish</button>

        <div id="error" style="color: var(--error-color); margin-top: 1rem; text-align: center;"></div>

        <div id="wishCard" class="tool-output" style="display: none; margin-top: 1.5rem; position: relative; overflow: hidden;">
            <div id="wishText" style="padding: 1rem;"></div>
            <button id="copy-wish-btn" class="copy-btn" style="position: absolute; bottom: 1rem; right: 1rem;">
                <i class="fas fa-copy"></i> Copy
            </button>
        </div>
    `;
    break; 
            case 'email-writer':
    html = `
        <input type="text" id="email-subject" class="tool-textarea" placeholder="Enter email subject..." style="min-height:auto;">
        <button id="process-btn" class="cta-button" style="width:100%; border-radius:8px;">Generate Email</button>
        <div id="tool-output-container" style="display:none; margin-top: 1rem;">
            <div class="tool-output-header">
                <span>Generated Email</span>
                <button class="copy-btn" id="copy-result-btn"><i class="fas fa-copy"></i> Copy</button>
            </div>
            <div id="tool-output" class="tool-output"></div>
        </div>
    `;
    break;
 
           // Romantic Shayari Generator
        case 'romantic-shayari-generator': 
          html = `
        <div class="tool-controls">
            <div class="control-group">
                <label for="name">Recipient's Name</label>
                <input type="text" id="name" class="tool-textarea" placeholder="Enter name (optional)" style="min-height: auto; padding: 0.75rem;">
            </div>

            <div class="control-group">
                <label for="style">Shayari Style</label>
                <select id="style" class="tool-textarea" style="min-height: auto; padding: 0.75rem;">
                    <option value="filmy">Filmy</option>
                    <option value="classic">Classic</option>
                    <option value="modern">Modern</option>
                    <option value="urdu">Urdu</option>
                </select>
            </div>

            <div class="control-group">
                <label for="animation">Animation</label>
                <select id="animation" class="tool-textarea" style="min-height: auto; padding: 0.75rem;">
                    <option value="none">None</option>
                    <option value="confetti">Confetti</option>
                </select>
            </div>
        </div>

        <button id="process-btn" class="cta-button" style="width:100%; border-radius:8px;">Generate Shayari</button>

        <div id="error" style="color: var(--error-color); margin-top: 1rem; text-align: center;"></div>

        <div id="wishCard" class="tool-output" style="display: none; margin-top: 1.5rem; position: relative; overflow: hidden;">
            <div id="wishText" style="padding: 1rem;"></div>
            <button id="copy-wish-btn" class="copy-btn" style="position: absolute; bottom: 1rem; right: 1rem;">
                <i class="fas fa-copy"></i> Copy
            </button>
        </div>
    `;
            break;
            case 'sad-status-generator': 
      html = `
    <div class="tool-controls">
        <div class="control-group">
            <label for="name">Recipient's Name</label>
            <input type="text" id="name" class="tool-textarea" placeholder="Enter name (optional)" style="min-height: auto; padding: 0.75rem;">
        </div>

        <div class="control-group">
            <label for="style">Poem Theme</label>
            <select id="style" class="tool-textarea" style="min-height: auto; padding: 0.75rem;">
                <option value="heartbreak">Heartbreak</option>
                <option value="loneliness">Loneliness</option>
                <option value="nostalgia">Nostalgia</option>
                <option value="existential">Existential</option>
            </select>
        </div>

        <div class="control-group">
            <label for="animation">Animation</label>
            <select id="animation" class="tool-textarea" style="min-height: auto; padding: 0.75rem;">
                <option value="none">None</option>
                <option value="confetti">Confetti</option>
            </select>
        </div>
    </div>

    <button id="process-btn" class="cta-button" style="width:100%; border-radius:8px;">Generate Poem</button>

    <div id="error" style="color: var(--error-color); margin-top: 1rem; text-align: center;"></div>

    <div id="wishCard" class="tool-output" style="display: none; margin-top: 1.5rem; position: relative; overflow: hidden;">
        <div id="wishText" style="padding: 1rem;"></div>
        <button id="copy-wish-btn" class="copy-btn" style="position: absolute; bottom: 1rem; right: 1rem;">
            <i class="fas fa-copy"></i> Copy
        </button>
    </div>
`;
    break;
            
    case 'c-program-generator': 
    html = `
        <div class="tool-controls">
            <div class="control-group">
                <label for="name">Program Topic</label>
                <input type="text" id="name" class="tool-textarea" placeholder="e.g., Fibonacci Series, File Handling" style="min-height: auto; padding: 0.75rem;">
            </div>

            <div class="control-group">
                <label for="style">Complexity</label>
                <select id="style" class="tool-textarea" style="min-height: auto; padding: 0.75rem;">
                    <option value="basic">Basic</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                </select>
            </div>

            <div class="control-group">
                <label for="animation">Animation</label>
                <select id="animation" class="tool-textarea" style="min-height: auto; padding: 0.75rem;">
                    <option value="none">None</option>
                    <option value="confetti">Confetti</option>
                </select>
            </div>
        </div>

        <button id="process-btn" class="cta-button" style="width:100%; border-radius:8px;">Generate C Program</button>

        <div id="error" style="color: var(--error-color); margin-top: 1rem; text-align: center;"></div>

        <div id="wishCard" class="tool-output" style="display: none; margin-top: 1.5rem; position: relative; overflow: hidden;">
            <div id="wishText" style="padding: 1rem;"></div>
            <button id="copy-wish-btn" class="copy-btn" style="position: absolute; bottom: 1rem; right: 1rem;">
                <i class="fas fa-copy"></i> Copy
            </button>
        </div>
    `;
    break;
            case 'cpp-program-generator': 
    html = `
        <div class="tool-controls">
            <div class="control-group">
                <label for="name">Program Topic</label>
                <input type="text" id="name" class="tool-textarea" placeholder="e.g., Inheritance, STL, File I/O" style="min-height: auto; padding: 0.75rem;">
            </div>

            <div class="control-group">
                <label for="style">Complexity</label>
                <select id="style" class="tool-textarea" style="min-height: auto; padding: 0.75rem;">
                    <option value="basic">Basic</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                </select>
            </div>

            <div class="control-group">
                <label for="animation">Animation</label>
                <select id="animation" class="tool-textarea" style="min-height: auto; padding: 0.75rem;">
                    <option value="none">None</option>
                    <option value="confetti">Confetti</option>
                </select>
            </div>
        </div>

        <button id="process-btn" class="cta-button" style="width:100%; border-radius:8px;">Generate C++ Program</button>

        <div id="error" style="color: var(--error-color); margin-top: 1rem; text-align: center;"></div>

        <div id="wishCard" class="tool-output" style="display: none; margin-top: 1.5rem; position: relative; overflow: hidden;">
            <div id="wishText" style="padding: 1rem;"></div>
            <button id="copy-wish-btn" class="copy-btn" style="position: absolute; bottom: 1rem; right: 1rem;">
                <i class="fas fa-copy"></i> Copy
            </button>
        </div>
    `;
    break;
            case 'python-program-generator': 
    html = `
        <div class="tool-controls">
            <div class="control-group">
                <label for="name">Program Topic</label>
                <input type="text" id="name" class="tool-textarea" placeholder="e.g., Calculator, Web Scraper, File Handling" style="min-height: auto; padding: 0.75rem;">
            </div>

            <div class="control-group">
                <label for="style">Complexity</label>
                <select id="style" class="tool-textarea" style="min-height: auto; padding: 0.75rem;">
                    <option value="basic">Basic</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                </select>
            </div>

            <div class="control-group">
                <label for="animation">Animation</label>
                <select id="animation" class="tool-textarea" style="min-height: auto; padding: 0.75rem;">
                    <option value="none">None</option>
                    <option value="confetti">Confetti</option>
                </select>
            </div>
        </div>

        <button id="process-btn" class="cta-button" style="width:100%; border-radius:8px;">Generate Python Program</button>

        <div id="error" style="color: var(--error-color); margin-top: 1rem; text-align: center;"></div>

        <div id="wishCard" class="tool-output" style="display: none; margin-top: 1.5rem; position: relative; overflow: hidden;">
            <div id="wishText" style="padding: 1rem;"></div>
            <button id="copy-wish-btn" class="copy-btn" style="position: absolute; bottom: 1rem; right: 1rem;">
                <i class="fas fa-copy"></i> Copy
            </button>
        </div>
    `;
    break;
			case 'qr-generator': html = `<textarea id="qr-input" class="tool-textarea" placeholder="Enter URL or text..."></textarea><button id="qr-generate-btn" class="cta-button" style="width:100%; border-radius:8px;">Generate QR Code</button><div id="tool-output-container" style="text-align:center; display:none; margin-top: 1rem;"><div class="tool-output" id="tool-output"><div id="qrcode-container" style="display: inline-block; border: 5px solid white; border-radius: 8px; padding: 5px; background: white;"></div><br><a id="qr-download-link" class="cta-button" style="margin-top: 1rem; display:none;">Download QR</a></div></div>`; break;
            case 'image-resizer': html = fileToolUI({ label: 'Select Image to Resize', accept: 'image/*', buttonText: 'Resize Image', fields: [{id: 'new-width', type: 'number', label: 'New Width (px)'}, {id: 'new-height', type: 'number', label: 'New Height (px)'}] }); break;
	        default: html = `<p>Tool not found.</p>`; break;
        }
        
        // Ad code for the modal
        const adHtml = `
            <div class="ad-container" style="margin-top: 2rem; text-align: center;">
                <script type="text/javascript">
                    atOptions = {
                        'key' : 'b8768121ebe075225e43db945a61a4c8',
                        'format' : 'iframe',
                        'height' : 60,
                        'width' : 468,
                        'params' : {}
                    };
                <\/script>
                <script type="text/javascript" src="//www.highperformanceformat.com/b8768121ebe075225e43db945a61a4c8/invoke.js" defer><\/script>
            </div>
        `;

        toolInterfaceContent.innerHTML = `<p class="tool-modal-description">${description}</p>` + html + adHtml;
        addToolEventListeners(toolId);
    };

    // --- Tool Event Listeners ---
        const addToolEventListeners = (toolId) => {
        const processBtn = document.getElementById('process-btn');
        const outputContainer = document.getElementById('tool-output-container');
        const outputDiv = document.getElementById('tool-output');
        const fileInput = document.getElementById('file-input');
        const copyBtn = document.getElementById('copy-result-btn');
        const copyWishBtn = document.getElementById('copy-wish-btn');

        const getFloat = id => parseFloat(document.getElementById(id).value) || 0;
        const showOutput = (content, isHTML = false) => {
            if (!outputContainer || !outputDiv) return;
            outputContainer.style.display = 'block';
            if (isHTML) outputDiv.innerHTML = content;
            else outputDiv.innerText = content;
        };
        const showLoader = () => {
            showOutput('<div class="loader"></div>', true);
        };
        const createDownloadLink = (blob, fileName) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            a.textContent = `Download ${fileName}`;
            a.className = 'cta-button';
            a.style.display = 'inline-block';
            a.style.marginTop = '1rem';
            showOutput('', true);
            outputDiv.appendChild(a);
        };

        if(copyBtn) {
            copyBtn.addEventListener('click', () => {
                const contentHolder = document.getElementById(toolId === 'speech-to-text' ? 'stt-output' : 'tool-output');
                const content = contentHolder.tagName === 'TEXTAREA' ? contentHolder.value : contentHolder.innerText;
                const tempTextarea = document.createElement('textarea');
                tempTextarea.value = content;
                document.body.appendChild(tempTextarea);
                tempTextarea.select();
                try {
                    document.execCommand('copy');
                    copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                    setTimeout(() => { copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy'; }, 2000);
                } catch (err) {
                    console.error('Copy failed', err);
                    copyBtn.innerText = 'Error';
                }
                document.body.removeChild(tempTextarea);
            });
        }

        if(copyWishBtn) {
            copyWishBtn.addEventListener('click', copyWish);
        }

        if(fileInput) {
            fileInput.addEventListener('change', () => {
                const fileListDiv = document.getElementById('file-list');
                if (fileInput.files.length > 0) {
                    fileListDiv.textContent = `${fileInput.files.length} file(s) selected: ${Array.from(fileInput.files).map(f => f.name).join(', ')}`;
                } else {
                    fileListDiv.textContent = 'No file selected';
                }
            });
        }

        // --- Calculator Logic ---
        if (toolId === 'sip-calculator' || toolId === 'emi-calculator' || toolId === 'income-tax-calculator') {
            const inputs = toolInterfaceContent.querySelectorAll('input[type="range"], input[type="number"], select');
            
            function syncInputs(e) {
                const id = e.target.id.replace('-range', '').replace('-num', '');
                const range = document.getElementById(`${id}-range`);
                const num = document.getElementById(`${id}-num`);
                if (!range || !num) return;

                if (e.target.type === 'range') {
                    num.value = range.value;
                } else {
                    range.value = num.value;
                }
                calculate();
            }

            function calculate() {
                try {
                    if (toolId === 'sip-calculator') {
                        const activeTab = document.querySelector('.calc-tab.active').dataset.tab;
                        if (activeTab === 'sip') {
                            const m = getFloat('monthly-investment-num'), annualRate = getFloat('return-rate-num'), years = getFloat('duration-num');
                            if (m <= 0 || years <= 0) { if(chartInstance) chartInstance.destroy(); outputContainer.style.display = 'none'; return; }
                            const n = years * 12;
                            const i = (annualRate / 100) / 12;
                            const totalInvestment = m * n;
                            const futureValue = i === 0 ? totalInvestment : m * ((((1 + i) ** n) - 1) / i) * (1 + i);
                            const wealthGained = futureValue - totalInvestment;
                            updateCalculatorResult(totalInvestment, wealthGained, futureValue);
                        } else { // Lumpsum
                            const p = getFloat('total-investment-num'), annualRate = getFloat('lumpsum-return-rate-num'), years = getFloat('lumpsum-duration-num');
                            if (p <= 0 || years <= 0) { if(chartInstance) chartInstance.destroy(); outputContainer.style.display = 'none'; return; }
                            const i = annualRate / 100;
                            const futureValue = p * ((1 + i) ** years);
                            const wealthGained = futureValue - p;
                            updateCalculatorResult(p, wealthGained, futureValue);
                        }
                    } else if (toolId === 'emi-calculator') {
                        const p = getFloat('principal-num'), annualInterest = getFloat('interest-num'), years = getFloat('tenure-num');
                        if (p <= 0 || annualInterest <= 0 || years <= 0) { outputContainer.style.display = 'none'; return; }
                        const r = (annualInterest / 12) / 100;
                        const n = years * 12;
                        if (r === 0) {
                            showOutput(`Monthly EMI: ₹ ${(p/n).toLocaleString('en-IN', {maximumFractionDigits: 0})}`, true);
                            return;
                        }
                        const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
                        const totalPayable = emi * n;
                        const totalInterest = totalPayable - p;
                        const result = `
                            <div style="display:flex; justify-content: space-between; padding: 0.5rem 0;"><span>Monthly EMI:</span> <strong>₹ ${emi.toLocaleString('en-IN', {maximumFractionDigits: 0})}</strong></div>
                            <div style="display:flex; justify-content: space-between; padding: 0.5rem 0; border-top: 1px solid var(--card-border);"><span>Total Interest:</span> <strong>₹ ${totalInterest.toLocaleString('en-IN', {maximumFractionDigits: 0})}</strong></div>
                            <div style="display:flex; justify-content: space-between; padding: 0.5rem 0; border-top: 1px solid var(--card-border);"><span>Total Payment:</span> <strong>₹ ${totalPayable.toLocaleString('en-IN', {maximumFractionDigits: 0})}</strong></div>
                        `;
                        showOutput(result, true);
                    } else if (toolId === 'income-tax-calculator') {
                        const income = getFloat('annual-income-num');
                        const taxableIncome = Math.max(0, income - 50000); // Standard deduction
                        let tax = 0;
                        if (taxableIncome <= 700000) { tax = 0; }
                        else {
                            if (taxableIncome > 300000) tax += (Math.min(taxableIncome, 600000) - 300000) * 0.05;
                            if (taxableIncome > 600000) tax += (Math.min(taxableIncome, 900000) - 600000) * 0.10;
                            if (taxableIncome > 900000) tax += (Math.min(taxableIncome, 1200000) - 900000) * 0.15;
                            if (taxableIncome > 1200000) tax += (Math.min(taxableIncome, 1500000) - 1200000) * 0.20;
                            if (taxableIncome > 1500000) tax += (taxableIncome - 1500000) * 0.30;
                        }
                        const cess = tax * 0.04;
                        const totalTax = tax + cess;
                        const result = `
                            <div style="display:flex; justify-content: space-between; padding: 0.5rem 0;"><span>Taxable Income:</span> <strong>₹ ${taxableIncome.toLocaleString('en-IN')}</strong></div>
                            <div style="display:flex; justify-content: space-between; padding: 0.5rem 0; border-top: 1px solid var(--card-border);"><span>Income Tax Payable:</span> <strong>₹ ${totalTax.toLocaleString('en-IN', {maximumFractionDigits: 0})}</strong></div>
                             <p style="font-size:0.8rem; text-align:center; margin-top:1rem;">(As per New Tax Regime for FY 2024-25. Includes standard deduction of ₹50,000.)</p>
                        `;
                        showOutput(result, true);
                    }
                } catch (err) {
                    showOutput(`<strong>Error:</strong> ${err.message}`, true);
                }
            }

            function updateCalculatorResult(invested, returns, total) {
                const result = `
                    <div style="display:flex; justify-content: space-between; padding: 0.5rem 0;"><span>Invested Amount:</span> <strong>₹ ${invested.toLocaleString('en-IN')}</strong></div>
                    <div style="display:flex; justify-content: space-between; padding: 0.5rem 0; border-top: 1px solid var(--card-border);"><span>Est. Returns:</span> <strong>₹ ${returns.toLocaleString('en-IN', {maximumFractionDigits: 0})}</strong></div>
                    <div style="display:flex; justify-content: space-between; padding: 0.5rem 0; border-top: 1px solid var(--card-border); font-size: 1.2rem;"><span>Total Value:</span> <strong>₹ ${total.toLocaleString('en-IN', {maximumFractionDigits: 0})}</strong></div>
                `;
                showOutput(result, true);
                updateChart([invested, returns]);
            }

            function updateChart(data) {
                const chartCanvas = document.getElementById('result-chart');
                if (!chartCanvas) return;
                const ctx = chartCanvas.getContext('2d');
                
                if (chartInstance) chartInstance.destroy();

                chartInstance = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: ['Invested Amount', 'Est. Returns'],
                        datasets: [{
                            data: data,
                            backgroundColor: ['#888', getComputedStyle(document.documentElement).getPropertyValue('--accent-color')],
                            borderWidth: 0,
                        }]
                    },
                    options: {
                        responsive: true, maintainAspectRatio: false, cutout: '70%',
                        plugins: { legend: { display: false }, tooltip: { enabled: false } }
                    }
                });
            }

            inputs.forEach(input => input.addEventListener('input', syncInputs));
            if(document.getElementById('calc-btn')) document.getElementById('calc-btn').addEventListener('click', calculate);
            
            if (toolId === 'sip-calculator') {
                const tabs = document.querySelectorAll('.calc-tab');
                tabs.forEach(tab => {
                    tab.addEventListener('click', () => {
                        tabs.forEach(t => t.classList.remove('active'));
                        tab.classList.add('active');
                        document.querySelectorAll('.tab-content').forEach(content => content.style.display = 'none');
                        document.getElementById(`tab-${tab.dataset.tab}`).style.display = 'block';
                        calculate();
                    });
                });
            }

            calculate(); // Initial calculation
        }
        
        if (processBtn) {
            processBtn.addEventListener('click', async () => {
                processBtn.disabled = true;
                
                if (toolId === 'wish-generator') {
                    showLoader();
                    const wishCard = document.getElementById('wishCard');
                    wishCard.style.display = 'none';
                    document.getElementById('error').textContent = '';
                } else {
                    showLoader();
                }
                
                try {
                    switch (toolId) {
                        case 'grammar-checker':
                        case 'rephraser':
                        case 'text-summarizer': {
                            const text = document.getElementById('text-input').value;
                            if (!text.trim()) throw new Error("Please enter some text.");

                            let promptAction;
                            if (toolId === 'grammar-checker') {
                                promptAction = "Correct the grammar of the following text";
                            } else if (toolId === 'rephraser') {
                                promptAction = "Rephrase the following text to enhance clarity";
                            } else { // text-summarizer
                                promptAction = "Summarize the following text, extracting the key points and main ideas";
                            }

                            const prompt = `${promptAction}:\n\n"${text}"`;

                            // Call local server API instead of Google Gemini directly
                            const response = await fetch('/api/ai', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ prompt })
                            });

                            if (!response.ok) throw new Error(`API error: ${response.statusText}`);
                            const result = await response.json();

                            if (result && result.text) {
                                showOutput(result.text);
                            } else if (result && result.error) {
                                throw new Error(result.error);
                            } else {
                                throw new Error("Could not get a valid response from the AI. Please try again.");
                            }
                            break;
                        }
						case 'image-resizer': {
                            if (!fileInput.files[0]) throw new Error("Please select an image file.");
                            const file = fileInput.files[0];
                            const newWidth = getFloat('new-width');
                            const newHeight = getFloat('new-height');
                            if (isNaN(newWidth) || isNaN(newHeight) || newWidth <= 0 || newHeight <= 0) throw new Error("Please enter valid positive width and height.");
                            
                            const reader = new FileReader();
                            reader.onload = (e) => {
                                const img = new Image();
                                img.onload = () => {
                                    const canvas = document.createElement('canvas');
                                    canvas.width = newWidth;
                                    canvas.height = newHeight;
                                    const ctx = canvas.getContext('2d');
                                    ctx.drawImage(img, 0, 0, newWidth, newHeight);
                                    canvas.toBlob(blob => {
                                        createDownloadLink(blob, `resized-${file.name}`);
                                    }, file.type);
                                };
                                img.src = e.target.result;
                            };
                            reader.readAsDataURL(file);
                            break;
                        }
                        // PDF Tools
                        case 'merge-pdf': {
                            if (fileInput.files.length < 2) throw new Error("Please select at least two PDF files to merge.");
                            const { PDFDocument } = PDFLib;
                            const mergedPdf = await PDFDocument.create();
                            for (const file of fileInput.files) {
                                const pdfBytes = await file.arrayBuffer();
                                const pdfDoc = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });
                                const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
                                copiedPages.forEach(page => mergedPdf.addPage(page));
                            }
                            const mergedPdfBytes = await mergedPdf.save();
                            createDownloadLink(new Blob([mergedPdfBytes], { type: 'application/pdf' }), 'merged.pdf');
                            break;
                        }
                        case 'split-pdf': {
                            if (!fileInput.files[0]) throw new Error("Please select a PDF file.");
                            const { PDFDocument } = PDFLib;
                            const rangeStr = document.getElementById('page-range').value;
                            if (!rangeStr) throw new Error("Please enter a page range.");
                            
                            const indices = [];
                            rangeStr.split(',').forEach(part => {
                                part = part.trim();
                                if (part.includes('-')) {
                                    const [start, end] = part.split('-').map(Number);
                                    if(isNaN(start) || isNaN(end) || start <= 0 || end < start) return;
                                    for (let i = start; i <= end; i++) indices.push(i - 1);
                                } else {
                                    const num = Number(part);
                                    if(!isNaN(num) && num > 0) indices.push(num - 1);
                                }
                            });
                            if(indices.length === 0) throw new Error("Invalid page range format.");
                            
                            const pdfBytes = await fileInput.files[0].arrayBuffer();
                            const pdfDoc = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });
                            const newPdf = await PDFDocument.create();
                            const validIndices = indices.filter(i => i < pdfDoc.getPageCount());
                            if(validIndices.length === 0) throw new Error("Page range is out of bounds for the PDF.");
                            const copiedPages = await newPdf.copyPages(pdfDoc, validIndices);
                            copiedPages.forEach(page => newPdf.addPage(page));
                            
                            const newPdfBytes = await newPdf.save();
                            createDownloadLink(new Blob([newPdfBytes], { type: 'application/pdf' }), 'split.pdf');
                            break;
							}
                        case 'wish-generator': {
                            const name = document.getElementById('name').value.trim();
                            const style = document.getElementById('style').value;
                            const animation = document.getElementById('animation').value;
                            const wishCard = document.getElementById('wishCard');
                            const wishText = document.getElementById('wishText');
                            const errorDiv = document.getElementById('error');

                            if (!name) {
                                throw new Error('Please enter a name.');
                            }

                            const prompt = `Can you generate a ${style} birthday wish for ${name} that captures the essence of celebration? Please ensure that the message is concise, keeping it under 200 words, and suitable for a festive greeting. Additionally, consider incorporating elements that reflect ${name}'s personality or interests to make the wish more personalized and meaningful.`;
                            
                            let chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
                            const payload = { contents: chatHistory };
                            const apiKey = CONFIG.API_KEYS.GEMINI; 
                            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
                            
                            const response = await fetch(apiUrl, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(payload)
                            });

                            if (!response.ok) throw new Error(`API error: ${response.statusText}`);
                            const result = await response.json();
                            
                            if (result.candidates && result.candidates[0]?.content?.parts[0]?.text) {
                                wishText.textContent = result.candidates[0].content.parts[0].text;
                                wishCard.style.display = 'block';
                                
                                // Add animation if selected
                                if (animation === 'confetti') {
                                    createConfetti();
                                }
                            } else {
                                throw new Error("Could not get a valid response from the AI. Please try again.");
                            }
                            break;
                            
                        }
                    case 'wedding-anniversary-wish': {
    const name = document.getElementById('name').value.trim();
    const style = document.getElementById('style').value;
    const animation = document.getElementById('animation').value;
    const wishCard = document.getElementById('wishCard');
    const wishText = document.getElementById('wishText');
    const errorDiv = document.getElementById('error');

    if (!name) {
        throw new Error('Please enter a name or couple\'s name.');
    }

    const prompt = `Could you please generate a heartfelt wedding anniversary wish for ${name} that reflects the style of ${style}? I would like the message to be concise, ideally under 200 words, and suitable for expressing deep affection and appreciation on this special occasion. Additionally, if possible, include a personal touch or a memorable moment that could make the wish even more meaningful.`;

    let chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
    const payload = { contents: chatHistory };
    const apiKey = CONFIG.API_KEYS.GEMINI;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error(`API error: ${response.statusText}`);
    const result = await response.json();

    if (result.candidates && result.candidates[0]?.content?.parts[0]?.text) {
        wishText.textContent = result.candidates[0].content.parts[0].text;
        wishCard.style.display = 'block';

        if (animation === 'confetti') {
            createConfetti();
        }
    } else {
        throw new Error("Could not get a valid response from the AI. Please try again.");
    }
    break;
}
 case 'recipe-generator': {
    const recipeName = document.getElementById('recipe-name').value.trim();
    const recipeCard = document.getElementById('recipeCard');
    const recipeText = document.getElementById('recipeText');
    const errorDiv = document.getElementById('error');

    if (!recipeName) {
        throw new Error('Please enter a recipe name.');
    }

    const prompt = `Could you please generate a detailed recipe for "${recipeName}" that includes a comprehensive list of ingredients and step-by-step instructions? Additionally, I would like the recipe to be provided in both English and Hindi to cater to a diverse audience. It would be helpful if you could also include any tips for preparation, cooking times, and serving suggestions to enhance the overall cooking experience. Furthermore, if possible, could you add a link to a highly-rated and relevant YouTube video that demonstrates the chosen recipe? This would be particularly beneficial for individuals who prefer visual guidance while cooking. Thank you!`;

    let chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
    const payload = { contents: chatHistory };
    const apiKey = CONFIG.API_KEYS.GEMINI;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error(`API error: ${response.statusText}`);
    const result = await response.json();

    if (result.candidates && result.candidates[0]?.content?.parts[0]?.text) {
        recipeText.textContent = result.candidates[0].content.parts[0].text;
        recipeCard.style.display = 'block';
    } else {
        throw new Error("Could not get a valid response from the AI. Please try again.");
    }
    break;
}

 case 'work-anniversary-wish': {
    const name = document.getElementById('name').value.trim();
    const style = document.getElementById('style').value;
    const animation = document.getElementById('animation').value;
    const wishCard = document.getElementById('wishCard');
    const wishText = document.getElementById('wishText');
    const errorDiv = document.getElementById('error');

    if (!name) {
        throw new Error('Please enter an employee\'s name.');
    }

    const prompt = `Can you generate a ${style} work anniversary wish for ${name}? Please ensure that the message is concise, keeping it under 200 words, and is suitable for celebrating professional milestones. Additionally, consider incorporating elements that reflect the individual’s contributions to the team, the significance of their tenure, and any specific achievements or qualities that make them a valued member of the organization. This will help make the wish more personalized and meaningful.`;

    let chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
    const payload = { contents: chatHistory };
    const apiKey = CONFIG.API_KEYS.GEMINI;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error(`API error: ${response.statusText}`);
    const result = await response.json();

    if (result.candidates && result.candidates[0]?.content?.parts[0]?.text) {
        wishText.textContent = result.candidates[0].content.parts[0].text;
        wishCard.style.display = 'block';

        if (animation === 'confetti') {
            createConfetti();
        }
    } else {
        throw new Error("Could not get a valid response from the AI. Please try again.");
    }
    break;
}
   case 'email-writer': {
    const subject = document.getElementById('email-subject').value.trim();
    if (!subject) throw new Error("Please enter an email subject.");

    const prompt = `Please write a professional email based on the following subject: “${subject}”. Ensure that the email maintains a polite tone and adheres to standard formatting conventions, including a proper greeting, a well-structured body that clearly conveys the message, and a courteous closing. Additionally, consider the context of the subject matter and the intended recipient to tailor the language and content appropriately.`;

    let chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
    const payload = { contents: chatHistory };
    const apiKey = CONFIG.API_KEYS.GEMINI;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error(`API error: ${response.statusText}`);
    const result = await response.json();

    const emailText = result?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!emailText) throw new Error("No response from AI. Try again.");

    showOutput(emailText);
    break;
}
   case 'romantic-shayari-generator': { 
    const name = document.getElementById('name').value.trim();
    const style = document.getElementById('style').value;
    const animation = document.getElementById('animation').value;
    const wishCard = document.getElementById('wishCard');
    const wishText = document.getElementById('wishText');
    const errorDiv = document.getElementById('error');

    // Name is optional for Shayari, but add a placeholder if empty
    const displayName = name || "my love";

    const prompt = `Could you please generate a romantic shayari in the style of ${style} specifically for ${displayName}? I would like it to be poetic and expressive, capturing deep emotions in an elegant tone. The shayari should be under 200 words and can incorporate beautiful Urdu or Hindi terms to enhance its romantic essence. Additionally, please consider themes of love, longing, and connection to make it truly special and memorable.`;

    let chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
    const payload = { contents: chatHistory };
    const apiKey = CONFIG.API_KEYS.GEMINI; 
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error(`API error: ${response.statusText}`);
    const result = await response.json();
    
    if (result.candidates && result.candidates[0]?.content?.parts[0]?.text) {
        wishText.textContent = result.candidates[0].content.parts[0].text;
        wishCard.style.display = 'block';

        // Add animation if selected
        if (animation === 'confetti') {
            createConfetti();
        }
    } else {
        throw new Error("Could not get a valid response from the AI. Please try again.");
    }
    break;
}   case 'sad-status-generator': { 
    const name = document.getElementById('name').value.trim();
    const style = document.getElementById('style').value;
    const animation = document.getElementById('animation').value;
    const wishCard = document.getElementById('wishCard');
    const wishText = document.getElementById('wishText');
    const errorDiv = document.getElementById('error');

    // Name is optional for Sad Poem, use a default if not provided
    const displayName = name || "someone dear";

    const prompt = `Write a breakup status themed around ${style}, addressed to ${displayName}. It should be expressive, emotional, and under 200 words. The tone should be melancholic and reflective, suitable for evoking deep feelings of sorrow or longing.`;

    let chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
    const payload = { contents: chatHistory };
    const apiKey = CONFIG.API_KEYS.GEMINI; 
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error(`API error: ${response.statusText}`);
    const result = await response.json();
    
    if (result.candidates && result.candidates[0]?.content?.parts[0]?.text) {
        wishText.textContent = result.candidates[0].content.parts[0].text;
        wishCard.style.display = 'block';

        // Add animation if selected
        if (animation === 'confetti') {
            createConfetti();
        }
    } else {
        throw new Error("Could not get a valid response from the AI. Please try again.");
    }
    break;
}
case 'baby-name-combiner': {
                            const name1 = document.getElementById('name1').value.trim();
                            const name2 = document.getElementById('name2').value.trim();
                            const gender = document.getElementById('gender').value;
                            const origin = document.getElementById('origin').value;

                            if (!name1 || !name2) {
                                throw new Error("Please enter both parent names.");
                            }

                            const prompt = `
Can you generate 50 unique baby names by creatively combining the letters from the names of both parents "${name1}" and "${name2}"?  The goal is to maximize the use of letters from both parents' names while allowing for the addition of a few extra letters to create meaningful and harmonious names. Please ensure that the names are diverse and reflect a variety of combinations, while still being easy to pronounce and appealing. 
- Target gender: ${gender || "any"}
- Cultural origin: ${origin || "any"}
- Only return a plain list of names, no extra text.
- Example format: Preetan, Ankree, Preeank...
                            `;

                            const apiKey = CONFIG.API_KEYS.GEMINI; 
                            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

                            const response = await fetch(apiUrl, {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                    contents: [{ parts: [{ text: prompt }] }]
                                })
                            });

                            const data = await response.json();
                            console.log("Gemini raw response:", data);

                            const outputText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

                            const nameLines = outputText
                                .split("\n")
                                .map(line => line.replace(/^[-•\d.]\s*/, "").trim())
                                .filter(line => line.length > 2 && /^[A-Za-z]+$/.test(line.replace(/\s/g, '')));

                            if (nameLines.length) {
                                const namesHTML = nameLines.map(n => `<div class="baby-name-result">👶 ${n}</div>`).join("");
                                showOutput(namesHTML, true);
                            } else {
                                throw new Error("No valid names were generated. Please try again with different inputs.");
                            }
                            break;
                        }
case 'pdf-unlocker': {
                            if (!fileInput.files[0]) throw new Error("Please select a PDF file.");
                            const password = document.getElementById('pdf-password').value;
                            const { PDFDocument } = PDFLib;
                            const pdfBytes = await fileInput.files[0].arrayBuffer();
                            const pdfDoc = await PDFDocument.load(pdfBytes, { ownerPassword: password, userPassword: password, ignoreEncryption: !password });
                            const newPdfBytes = await pdfDoc.save();
                            createDownloadLink(new Blob([newPdfBytes], { type: 'application/pdf' }), `unlocked-${fileInput.files[0].name}`);
                            break;
                        }
                        
    case 'c-program-generator': {
    const name = document.getElementById('name').value.trim();
    const style = document.getElementById('style').value;
    const animation = document.getElementById('animation').value;
    const wishCard = document.getElementById('wishCard');
    const wishText = document.getElementById('wishText');
    const errorDiv = document.getElementById('error');

    if (!name) throw new Error('Please enter a program topic.');

    const prompt = `Could you please generate a level C program in the style of ${style} on the topic of ${name}? It is important that the program includes detailed comments to explain the code functionality and logic.  This will help in maintaining clarity and readability while adhering to the specified constraints.`;

    let chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
    const payload = { contents: chatHistory };
    const apiKey = CONFIG.API_KEYS.GEMINI;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error(`API error: ${response.statusText}`);
    const result = await response.json();

    if (result.candidates && result.candidates[0]?.content?.parts[0]?.text) {
        wishText.textContent = result.candidates[0].content.parts[0].text;
        wishCard.style.display = 'block';
        if (animation === 'confetti') createConfetti();
    } else {
        throw new Error("Could not get a valid response from the AI. Please try again.");
    }
    break;
}
    case 'cpp-program-generator': {
    const name = document.getElementById('name').value.trim();
    const style = document.getElementById('style').value;
    const animation = document.getElementById('animation').value;
    const wishCard = document.getElementById('wishCard');
    const wishText = document.getElementById('wishText');
    const errorDiv = document.getElementById('error');

    if (!name) throw new Error('Please enter a program topic.');

    const prompt = `Could you please generate a C++ program at a ${style} level on the topic of ${name}? It should include detailed comments explaining the code and adhere to best programming practices.  If possible, could you also provide a brief overview of the key concepts or algorithms used in the program to enhance understanding?`;

    let chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
    const payload = { contents: chatHistory };
    const apiKey = CONFIG.API_KEYS.GEMINI;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error(`API error: ${response.statusText}`);
    const result = await response.json();

    if (result.candidates && result.candidates[0]?.content?.parts[0]?.text) {
        wishText.textContent = result.candidates[0].content.parts[0].text;
        wishCard.style.display = 'block';
        if (animation === 'confetti') createConfetti();
    } else {
        throw new Error("Could not get a valid response from the AI. Please try again.");
    }
    break;
}
    case 'python-program-generator': {
    const name = document.getElementById('name').value.trim();
    const style = document.getElementById('style').value;
    const animation = document.getElementById('animation').value;
    const wishCard = document.getElementById('wishCard');
    const wishText = document.getElementById('wishText');
    const errorDiv = document.getElementById('error');

    if (!name) throw new Error('Please enter a program topic.');

    const prompt = `Could you please generate a Python program at a ${style} level on the topic of ${name}? It is important that the program includes meaningful comments to explain the code, maintains a clean and organized structure, and is concise. Additionally, please ensure that the program demonstrates best practices in coding and is suitable for someone at the specified skill level.`;

    let chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
    const payload = { contents: chatHistory };
    const apiKey = CONFIG.API_KEYS.GEMINI;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error(`API error: ${response.statusText}`);
    const result = await response.json();

    if (result.candidates && result.candidates[0]?.content?.parts[0]?.text) {
        wishText.textContent = result.candidates[0].content.parts[0].text;
        wishCard.style.display = 'block';
        if (animation === 'confetti') createConfetti();
    } else {
        throw new Error("Could not get a valid response from the AI. Please try again.");
    }
    break;
}




}
                } catch (err) {
                    if (toolId === 'wish-generator') {
                        document.getElementById('error').textContent = err.message;
                    } else {
                        showOutput(`<strong>Error:</strong> ${err.message}`, true);
                    }
                } finally {
                    processBtn.disabled = false;
                }
            });
        }
        
        // --- Specific Tool Logic ---
        switch (toolId) {
            case 'word-counter':
                document.getElementById('wc-input').addEventListener('input', (e) => {
                    const text = e.target.value;
                    const words = text.match(/\b\w+\b/g)?.length || 0;
                    const chars = text.length;
                    const sentences = text.match(/[^.!?]+[.!?]+/g)?.length || 0;
                    if(outputDiv) showOutput(`Words: ${words} | Characters: ${chars} | Sentences: ${sentences}`);
                });
                break;
            case 'text-to-speech': {
                const speakBtn = document.getElementById('tts-speak-btn');
                const textInput = document.getElementById('tts-input');
                const voiceSelect = document.getElementById('tts-voice');
                const rateInput = document.getElementById('tts-rate');
                const rateValue = document.getElementById('tts-rate-value');
                const pitchInput = document.getElementById('tts-pitch');
                const pitchValue = document.getElementById('tts-pitch-value');
                let voices = [];

                function populateVoiceList() {
                    voices = speechSynthesis.getVoices();
                    voiceSelect.innerHTML = '';
                    voices.forEach(voice => {
                        const option = document.createElement('option');
                        option.textContent = `${voice.name} (${voice.lang})`;
                        if(voice.default) option.selected = true;
                        option.setAttribute('data-lang', voice.lang);
                        option.setAttribute('data-name', voice.name);
                        voiceSelect.appendChild(option);
                    });
                }
                
                populateVoiceList();
                if (speechSynthesis.onvoiceschanged !== undefined) {
                    speechSynthesis.onvoiceschanged = populateVoiceList;
                }

                rateInput.addEventListener('input', () => rateValue.textContent = rateInput.value);
                pitchInput.addEventListener('input', () => pitchValue.textContent = pitchInput.value);

                speakBtn.addEventListener('click', () => {
                    if (speechSynthesis.speaking) {
                        speechSynthesis.cancel();
                    }
                    const text = textInput.value;
                    if (text.trim() === '') return;
                    
                    const utterance = new SpeechSynthesisUtterance(text);
                    const selectedVoiceName = voiceSelect.selectedOptions[0].getAttribute('data-name');
                    utterance.voice = voices.find(voice => voice.name === selectedVoiceName);
                    utterance.pitch = pitchInput.value;
                    utterance.rate = rateInput.value;
                    speechSynthesis.speak(utterance);
                });
                break;
            }
            case 'speech-to-text': {
                const sttBtn = document.getElementById('stt-btn');
                const sttOutput = document.getElementById('stt-output');
                const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                
                if (SpeechRecognition) {
                    recognition = new SpeechRecognition();
                    recognition.continuous = true;
                    recognition.interimResults = true;
                    recognition.lang = 'en-US';

                    recognition.onresult = (event) => {
                        let interim_transcript = '';
                        let final_transcript_segment = '';
                        for (let i = event.resultIndex; i < event.results.length; ++i) {
                            if (event.results[i].isFinal) {
                                final_transcript_segment += event.results[i][0].transcript;
                            } else {
                                interim_transcript += event.results[i][0].transcript;
                            }
                        }
                        final_transcript += final_transcript_segment;
                        sttOutput.value = final_transcript + interim_transcript;
                    };
					
                    recognition.onstart = () => {
                        isRecording = true;
                        sttBtn.innerHTML = '<i class="fas fa-stop"></i> Stop';
                        sttBtn.classList.add('recording');
                    };

                    recognition.onend = () => {
                        isRecording = false;
                        sttBtn.innerHTML = '<i class="fas fa-microphone"></i> Record';
                        sttBtn.classList.remove('recording');
                    };
                    
                    sttBtn.addEventListener('click', () => {
                        if (isRecording) {
                            recognition.stop();
                        } else {
                            final_transcript = '';
                            sttOutput.value = '';
                            recognition.start();
                        }
                    });
                } else {
                    sttBtn.disabled = true;
                    sttBtn.textContent = 'Browser Not Supported';
                    sttOutput.value = 'Your browser does not support the Speech Recognition API.';
                }
                break;
            }
            case 'qr-generator':
                document.getElementById('qr-generate-btn').addEventListener('click', () => {
                    const data = document.getElementById('qr-input').value.trim();
                    if (data === '') return;
                    
                    const qrCodeContainer = document.getElementById('qrcode-container');
                    const downloadLink = document.getElementById('qr-download-link');
                    
                    if (outputContainer && qrCodeContainer) {
                        outputContainer.style.display = 'block';
                        qrCodeContainer.innerHTML = '';
                        
                        new QRCode(qrCodeContainer, {
                            text: data,
                            width: 150,
                            height: 150,
                            colorDark: "#000000",
                            colorLight: "#ffffff",
                            correctLevel: QRCode.CorrectLevel.H
                        });

                        setTimeout(() => {
                            const canvas = qrCodeContainer.querySelector('canvas');
                            if (canvas) {
                                downloadLink.href = canvas.toDataURL("image/png");
                                downloadLink.download = "qrcode.png";
                                downloadLink.style.display = 'inline-block';
                            }
                        }, 100);
                    }
                });
                break;
        }
    };

    // Confetti functions
    function createConfetti() {
        const wishCard = document.getElementById('wishCard');
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.background = ['#f1c40f', '#e74c3c', '#3498db', '#2ecc71'][Math.floor(Math.random() * 4)];
            confetti.style.animationDelay = Math.random() * 3 + 's';
            wishCard.appendChild(confetti);
        }
    }

    function removeConfetti() {
        const confetti = document.querySelectorAll('.confetti');
        confetti.forEach(c => c.remove());
    }

    function copyWish() {
        const wishText = document.getElementById('wishText').textContent;
        navigator.clipboard.writeText(wishText).then(() => {
            const copyBtn = document.getElementById('copy-wish-btn');
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            setTimeout(() => { 
                copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy'; 
            }, 2000);
        });
    }
});

// Initialize theme toggle
function toggleTheme() {
    document.body.classList.toggle('light-theme');
    localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light-theme' : 'dark-theme');
}

// Initialize sidebar toggle
function toggleSidebar() {
    document.body.classList.toggle('sidebar-collapsed');
}

// Initialize mobile menu toggle
function toggleMobileMenu() {
    document.body.classList.toggle('sidebar-open');
}



document.getElementById('nav-search-btn').addEventListener('click', function () {
    const query = document.getElementById('nav-search-input').value.toLowerCase().trim();
    if (!query) return;

    const tools = document.querySelectorAll('.tool-card[data-tool]');
    let found = false;

    tools.forEach(tool => {
        const name = tool.querySelector('h3')?.innerText.toLowerCase();
        if (name && name.includes(query)) {
            tool.scrollIntoView({ behavior: 'smooth' });
            tool.classList.add('highlight');
            setTimeout(() => tool.classList.remove('highlight'), 2000);
            found = true;
        }
    });

    if (!found) alert('No tool matched your search.');
});


document.addEventListener("DOMContentLoaded", function () {
    const adScript = document.createElement("script");
    adScript.src = "//www.highperformanceformat.com/8c5030410fa6adf08402ef30473d5fa0/invoke.js";
    adScript.defer = true;
    document.body.appendChild(adScript);
});
