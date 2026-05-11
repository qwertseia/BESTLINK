document.addEventListener("DOMContentLoaded", () => {
    
    // --- Homepage Branch Buttons (from previous step) ---
    const branchButtons = document.querySelectorAll('.btn-branch');
    branchButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); 
            const branchName = e.target.parentElement.querySelector('h3').innerText.toLowerCase();
            // Redirect to jobs page with a URL parameter for the branch
            window.location.href = `jobs.html?branch=${branchName}`;
        });
    });

    // --- Jobs Page Logic ---
    const jobsContainer = document.getElementById('jobs-container');
    const timelineContainer = document.getElementById('process-timeline');
    
    // Only run this script if we are actually on the Jobs page
    if(jobsContainer && timelineContainer) {
        
        // Data Structure based on Bestlink Scope & Limitations Document
        const siteData = {
            makati: {
                title: "Makati (Main Office)",
                desc: "Executive placement and professional management roles.",
                process: [
                    "Application Form",
                    "Initial Screening",
                    "Executive Interview",
                    "Requirements Submission",
                    "Deployment"
                ],
                jobs: [
                    { title: "HR Admin Assistant", type: "Full-Time", req: "College Graduate", tags: ["Urgent", "Office"] },
                    { title: "Payroll Officer", type: "Full-Time", req: "BS Accountancy", tags: ["Office"] }
                ]
            },
            cavite: {
                title: "Cavite Satellite Office",
                desc: "Specializing in large-scale manufacturing and production floor leadership.",
                process: [
                    "Application Form",
                    "General Exam",
                    "Face-to-Face Interview",
                    "Requirements Collection",
                    "2-Day Orientation (Policy & 8hr Training)",
                    "Deployment"
                ],
                jobs: [
                    { title: "Production Helper", type: "Shifting", req: "High School Grad / ALS", tags: ["Production"] },
                    { title: "Accounting Clerk", type: "Full-Time", req: "College Level", tags: ["Office", "Urgent"] },
                    { title: "QA Laboratory Assistant", type: "Full-Time", req: "Science Degree", tags: ["Technical"] }
                ]
            },
            laguna: {
                title: "Laguna Satellite Office",
                desc: "Manpower agency handling high-volume production and NC2 skilled trades.",
                process: [
                    "Application Form",
                    "Physical Applicant Screening",
                    "Initial Interview (by OJT/HR)",
                    "Final Interview",
                    "Job Offer & Requirements List",
                    "Orientation (Company Policy & Safety)",
                    "Job-Related Test",
                    "Contract Signing & Deployment"
                ],
                jobs: [
                    { title: "Production Helper (Biñan/Calamba/Canlubang)", type: "Shifting", req: "High School Grad / ALS", tags: ["MCDM Routing", "Production"] },
                    { title: "Forklift Operator", type: "Full-Time", req: "NC2 Certificate", tags: ["Skilled Trade", "Calamba Plant"] },
                    { title: "Maintenance Welder/Electrician", type: "Full-Time", req: "NC2 Certificate", tags: ["Skilled Trade"] }
                ]
            }
        };

// Track current branch for apply button
        let currentBranch = 'makati';

        const renderSiteData = (branchKey) => {
            const data = siteData[branchKey];
            if(!data) return;
            
            // Update current branch tracking
            currentBranch = branchKey;

            // Update Titles
            document.getElementById('current-branch-title').innerText = `Available Positions: ${data.title}`;
            document.getElementById('process-desc').innerText = data.desc;

            // Render Jobs
            jobsContainer.innerHTML = '';
            data.jobs.forEach(job => {
                const tagsHTML = job.tags.map(tag => `<span>${tag}</span>`).join('');
                const jobTitle = encodeURIComponent(job.title);
                const jobCard = `
                    <div class="job-card">
                        <div class="job-info">
                            <h4>${job.title}</h4>
                            <div class="job-meta">
                                <span><i class="fa-solid fa-clock"></i> ${job.type}</span>
                                <span><i class="fa-solid fa-graduation-cap"></i> ${job.req}</span>
                            </div>
                            <div class="job-tags">${tagsHTML}</div>
                        </div>
                        <div class="job-action">
                            <a href="apply.html?branch=${branchKey}&position=${jobTitle}" class="btn-primary">Apply Now</a>
                        </div>
                    </div>
                `;
                jobsContainer.innerHTML += jobCard;
            });

            // Render Timeline Process
            timelineContainer.innerHTML = '';
            data.process.forEach(step => {
                timelineContainer.innerHTML += `<li>${step}</li>`;
            });
        };

        // Tab Clicking Logic
        const tabs = document.querySelectorAll('.tab-btn');
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                // Remove active class from all tabs
                tabs.forEach(t => t.classList.remove('active'));
                // Add active class to clicked tab
                e.target.classList.add('active');
                
                // Get branch key and render
                const branchKey = e.target.getAttribute('data-branch');
                renderSiteData(branchKey);
            });
        });

        // Initialize with Makati on page load (or check URL parameter if arriving from Home)
        const urlParams = new URLSearchParams(window.location.search);
        const branchParam = urlParams.get('branch');
        
        if(branchParam && siteData[branchParam]) {
            document.querySelector(`.tab-btn[data-branch="${branchParam}"]`).click();
        } else {
            renderSiteData('makati'); // Default load
        }
    }
});

// --- Contact Page Logic ---
    const contactSection = document.querySelector('.contact-section');
    
    if (contactSection) {
        // Branch data for contact page
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
                address: "Unit 10 Alpha Arcade Bldg, Gov. Drive, Brgy. Langkaan II, Dasmariñas, Cavite",
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

        // Function to render branch info
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

        // Tab button logic
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Remove active from all
                tabBtns.forEach(b => b.classList.remove('active'));
                // Add active to clicked
                e.target.classList.add('active');
                
                const branch = e.target.getAttribute('data-branch');
                renderBranchInfo(branch);
            });
        });

        // Initialize Makati
        renderBranchInfo('makati');
    }

    // --- Contact Form Logic ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for reaching out! We have received your message and will get back to you within 24-48 hours.');
            contactForm.reset();
        });
    }

    // --- Enhanced AI Chatbot Widget Logic ---
    const toggleChatBtn = document.getElementById('toggleChat');
    const chatbotWidget = document.getElementById('chatbotWidget');
    const closeChatBtn = document.getElementById('closeChat');
    const sendChatBtn = document.getElementById('sendChat');
    const chatInput = document.getElementById('chatInput');
    const chatBody = document.getElementById('chatBody');
    const faqChips = document.querySelectorAll('.faq-chip');

    if (toggleChatBtn && chatbotWidget) {
        // Toggle visibility
        toggleChatBtn.addEventListener('click', () => {
            const isHidden = chatbotWidget.style.display === 'none' || chatbotWidget.style.display === '';
            chatbotWidget.style.display = isHidden ? 'flex' : 'none';
            if (isHidden) chatInput.focus();
        });

        closeChatBtn.addEventListener('click', () => {
            chatbotWidget.style.display = 'none';
        });

        // Core Send Message Function
        const handleSendMessage = (textOverride = null) => {
            const userText = textOverride || chatInput.value.trim();
            if (userText === '') return;

            // 1. Render User Message
            const userMsgHtml = `<div class="chat-message user-message">${userText}</div>`;
            chatBody.insertAdjacentHTML('beforeend', userMsgHtml);
            chatInput.value = '';
            chatBody.scrollTop = chatBody.scrollHeight;

            // 2. Mock AI Logic based on input
            setTimeout(() => {
                let botReply = "Please check our 'Jobs' tab for specific branch hiring processes, or submit a formal inquiry using the Contact form.";
                
                const lowerText = userText.toLowerCase();
                if (lowerText.includes('apply') || lowerText.includes('hiring')) {
                    botReply = "To apply, please click the 'Jobs' tab, select your preferred branch (Makati, Cavite, or Laguna), and click 'Apply Now' on your desired role. Ensure you have your digital documents ready!";
                } else if (lowerText.includes('branch') || lowerText.includes('location')) {
                    botReply = "We have three main locations: Our Main Office is in Makati. Our Satellite offices are located in Dasmariñas, Cavite and Cabuyao, Laguna.";
                }

                const botMsgHtml = `<div class="chat-message bot-message">${botReply}</div>`;
                chatBody.insertAdjacentHTML('beforeend', botMsgHtml);
                chatBody.scrollTop = chatBody.scrollHeight;
            }, 800); // 800ms typing delay illusion
        };

        // Event Listeners for sending
        sendChatBtn.addEventListener('click', () => handleSendMessage());
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSendMessage();
        });

        // FAQ Chips interaction
        faqChips.forEach(chip => {
            chip.addEventListener('click', (e) => {
                const query = e.target.getAttribute('data-query');
                handleSendMessage(query);
            });
        });
    }


    // =============================================
    // ROLE-BASED LOGIN ROUTING LOGIC
    // =============================================
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Stop page reload
            
            const email = document.getElementById('loginEmail').value.toLowerCase();
            
            // Mock Role Checker
            if (email.includes('super')) {
                // Route for President, CEO, COO
                alert('Authentication Success: SUPERADMIN. \nRedirecting to Executive Dashboard...');
                // window.location.href = 'dashboard-superadmin.html';
                
            } else if (email.includes('hr') || email.includes('admin')) {
                // Route for HR Personnel
                alert('Authentication Success: HR ADMIN. \nRedirecting to HR Operations Dashboard...');
                // window.location.href = 'dashboard-admin.html';
                
            } else {
                // Route for standard Employees
                alert('Authentication Success: EMPLOYEE. \nRedirecting to Employee Portal...');
                // window.location.href = 'dashboard-employee.html';
            }
        });
    }

// // =============================================
    // BIODATA RESUME & EDUCATION FILTERING LOGIC
    // =============================================
    const biodataForm = document.getElementById('biodataApplicationForm');
    
    if (biodataForm) {
        const branchSelect = document.getElementById('applyBranch');
        const positionSelect = document.getElementById('applyPosition');
        const eduSelect = document.getElementById('highestEducation');
        
const historyContainer = document.getElementById('educationHistory');
        const collegeHistory = document.getElementById('collegeHistory');

        // === URL PARAMETER HANDLING FOR AUTO-FILL ===
        // Check if user arrived from Jobs page with pre-selected position
        const urlParams = new URLSearchParams(window.location.search);
        const branchParam = urlParams.get('branch');
        const positionParam = urlParams.get('position');

// Function to normalize title for matching (removes special chars, normalizes spaces)
        const normalizeTitle = (title) => {
            return title.toLowerCase()
                .replace(/[\/\-\\_]/g, ' ')  // Replace / - _ with space
                .replace(/\s+/g, ' ')          // Normalize multiple spaces to single
                .trim();
        };

        // Function to find matching job by title text
        const findJobByTitle = (branchKey, titleText) => {
            const jobs = roleData[branchKey];
            if (!jobs) return null;
            
            const normalizedSearch = normalizeTitle(titleText);
            
            // Try exact match first
            let match = jobs.find(j => j.text === titleText);
            if (!match) {
                // Try case-insensitive match
                match = jobs.find(j => j.text.toLowerCase() === titleText.toLowerCase());
            }
            if (!match) {
                // Try normalized match (handles / vs / variations)
                match = jobs.find(j => normalizeTitle(j.text) === normalizedSearch);
            }
            if (!match) {
                // Try partial match (includes)
                match = jobs.find(j => normalizedSearch.includes(normalizeTitle(j.text)) || normalizeTitle(j.text).includes(normalizedSearch));
            }
            return match;
        };

        // Exact Job Mappings & Education Requirements matching the Jobs Page
        const roleData = {
            makati: [
                { 
                    value: "hr_admin", 
                    text: "HR Admin Assistant", 
                    education: [
                        { val: "college_grad", text: "College Graduate (Required)" },
                        { val: "masters", text: "Master's Degree / Post-Grad" }
                    ] 
                },
                { 
                    value: "payroll", 
                    text: "Payroll Officer", 
                    education: [
                        { val: "bs_accountancy", text: "BS Accountancy Graduate (Required)" }
                    ] 
                }
            ],
            cavite: [
                { 
                    value: "prod_helper_c", 
                    text: "Production Helper", 
                    education: [
                        { val: "hs_grad", text: "High School Graduate (Required)" },
                        { val: "als_passer", text: "ALS Passer" },
                        { val: "college_level", text: "College Level (Undergrad)" }
                    ] 
                },
                { 
                    value: "acct_clerk", 
                    text: "Accounting Clerk", 
                    education: [
                        { val: "college_level", text: "College Level (Required minimum)" },
                        { val: "college_grad", text: "College Graduate" }
                    ] 
                },
                { 
                    value: "qa_lab", 
                    text: "QA Laboratory Assistant", 
                    education: [
                        { val: "science_degree", text: "BS Science Degree (Required)" },
                        { val: "college_grad", text: "Other College Graduate (With relevant exp)" }
                    ] 
                }
            ],
            laguna: [
                { 
                    value: "prod_helper_l", 
                    text: "Production Helper (Biñan/Calamba/Canlubang)", 
                    education: [
                        { val: "hs_grad", text: "High School Graduate (Required)" },
                        { val: "als_passer", text: "ALS Passer" }
                    ] 
                },
                { 
                    value: "forklift", 
                    text: "Forklift Operator", 
                    education: [
                        { val: "hs_grad_nc2", text: "High School Grad + NC2 Certificate (Required)" },
                        { val: "vocational", text: "Vocational Course Graduate + NC2" }
                    ] 
                },
                { 
                    value: "welder_electrician", 
                    text: "Maintenance Welder / Electrician", 
                    education: [
                        { val: "hs_grad_nc2", text: "High School Grad + NC2 Certificate (Required)" },
                        { val: "vocational", text: "Vocational Course Graduate + NC2" }
                    ] 
                }
            ]
        };

// 1. Populate Positions based on Branch Selection
        const populatePositions = (branchKey) => {
            positionSelect.innerHTML = '<option value="" disabled selected>Select specific position...</option>';
            eduSelect.innerHTML = '<option value="" disabled selected>Please select a specific position first</option>';
            eduSelect.disabled = true;
            historyContainer.style.display = 'none';
            
            if (roleData[branchKey]) {
                positionSelect.disabled = false;
                roleData[branchKey].forEach(job => {
                    positionSelect.innerHTML += `<option value="${job.value}">${job.text}</option>`;
                });
            }
        };

        branchSelect.addEventListener('change', (e) => {
            populatePositions(e.target.value);
        });

        // === AUTO-FILL FROM URL PARAMETERS ===
        const handleAutoFill = () => {
            // Decode the position parameter
            const decodedPosition = positionParam ? decodeURIComponent(positionParam) : null;
            
            // Check if we have valid URL parameters
            if (branchParam && roleData[branchParam]) {
                // Set the branch dropdown
                branchSelect.value = branchParam;
                
                // Populate positions for this branch
                populatePositions(branchParam);
                
                // If position parameter exists, try to find and select it
                if (decodedPosition) {
                    const matchedJob = findJobByTitle(branchParam, decodedPosition);
                    if (matchedJob) {
                        positionSelect.value = matchedJob.value;
                        // Trigger the position change event to populate education options
                        positionSelect.dispatchEvent(new Event('change'));
                    }
                }
            }
        };

        // Run auto-fill after a small delay to ensure DOM is ready
        if (branchParam || positionParam) {
            setTimeout(handleAutoFill, 100);
        }

// --- 3.6 Geolocation: Find Nearest Branch (With User Suggestion) ---
        const findNearestBtn = document.getElementById('findNearestBtn');
        const suggestionBox = document.getElementById('locationSuggestion');
        const suggestedNameSpan = document.getElementById('suggestedBranchName');
        const acceptLocationBtn = document.getElementById('acceptLocationBtn');
        const dismissLocationBtn = document.getElementById('dismissLocationBtn');
        
        if (findNearestBtn && branchSelect) {
            // Real-world approximate coordinates for Bestlink branches
            const branchLocations = {
                makati: { lat: 14.5605, lon: 121.0232 }, // Salcedo Village
                cavite: { lat: 14.3294, lon: 120.9367 }, // Dasmariñas
                laguna: { lat: 14.2766, lon: 121.1235 }  // Cabuyao
            };

            const branchDisplayNames = {
                makati: "Makati (Main Office)",
                cavite: "Cavite (Satellite)",
                laguna: "Laguna (Satellite)"
            };

            // Haversine formula to calculate straight-line distance in kilometers
            const calculateDistance = (lat1, lon1, lat2, lon2) => {
                const R = 6371; // Earth radius in km
                const dLat = (lat2 - lat1) * Math.PI / 180;
                const dLon = (lon2 - lon1) * Math.PI / 180;
                const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                          Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2);
                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
                return R * c;
            };

            findNearestBtn.addEventListener('click', () => {
                if (!navigator.geolocation) {
                    alert('Geolocation is not supported by your browser.');
                    return;
                }

                // UI Loading State
                const originalContent = findNearestBtn.innerHTML;
                findNearestBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Locating...';
                suggestionBox.style.display = 'none'; // Hide if already open
                
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const userLat = position.coords.latitude;
                        const userLon = position.coords.longitude;
                        
                        let nearestBranch = '';
                        let shortestDistance = Infinity;

                        // Find the closest branch
                        for (const [branch, coords] of Object.entries(branchLocations)) {
                            const distance = calculateDistance(userLat, userLon, coords.lat, coords.lon);
                            if (distance < shortestDistance) {
                                shortestDistance = distance;
                                nearestBranch = branch;
                            }
                        }

                        // Populate and show the suggestion box
                        suggestedNameSpan.innerText = branchDisplayNames[nearestBranch];
                        suggestionBox.style.display = 'flex';
                        
                        // Reset button UI
                        findNearestBtn.innerHTML = '<i class="fa-solid fa-check" style="color: var(--primary-green);"></i> Found';
                        setTimeout(() => { findNearestBtn.innerHTML = originalContent; }, 2000);

                        // Handle user clicking "Yes, select"
                        acceptLocationBtn.onclick = () => {
                            branchSelect.value = nearestBranch;
                            branchSelect.dispatchEvent(new Event('change')); // Triggers cascading role logic
                            suggestionBox.style.display = 'none'; // Hide banner
                        };

                        // Handle user clicking "Dismiss"
                        dismissLocationBtn.onclick = () => {
                            suggestionBox.style.display = 'none';
                        };
                    },
                    (error) => {
                        console.warn(`Geolocation Error: ${error.message}`);
                        alert('Unable to retrieve your location. Please select your branch manually or ensure location permissions are granted.');
                        findNearestBtn.innerHTML = originalContent;
                    }
                );
            });
        }

        // 2. Filter Education Options based on Specific Position
        positionSelect.addEventListener('change', (e) => {
            const selectedBranch = branchSelect.value;
            const selectedPositionValue = e.target.value;
            
            // Find the specific job data
            const jobData = roleData[selectedBranch].find(j => j.value === selectedPositionValue);
            
            eduSelect.innerHTML = '<option value="" disabled selected>Select your highest attainment...</option>';
            eduSelect.disabled = false;
            historyContainer.style.display = 'none';

            if (jobData && jobData.education) {
                jobData.education.forEach(edu => {
                    eduSelect.innerHTML += `<option value="${edu.val}">${edu.text}</option>`;
                });
            }
        });

        // 3. Show/Hide Education History based on Selection
        eduSelect.addEventListener('change', (e) => {
            const val = e.target.value;
            historyContainer.style.display = 'block'; // Always show history table once an option is picked
            
            // If they select college level, grad, masters, or science degree, show the college history input
            if (val === 'college_level' || val === 'college_grad' || val === 'masters' || val === 'bs_accountancy' || val === 'science_degree') {
                collegeHistory.style.display = 'block';
                collegeHistory.querySelector('input').required = true;
            } else {
                collegeHistory.style.display = 'none';
                collegeHistory.querySelector('input').required = false;
            }
        });

        // 4. Handle Form Submission
        biodataForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const lastName = document.getElementById('lastName').value;
            const firstName = document.getElementById('firstName').value;
            
            alert(`Application Data for ${firstName} ${lastName} has been saved.\n\nThis biodata will be formatted into a printable A4 layout for HR filling and you will be notified for the next step of the hiring process.`);
            
            // Redirect back to jobs page after successful application
            window.location.href = 'jobs.html';
        });
    }


    