document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. MOCK APPLICANT DATA
    // ==========================================
    const applicantData = {
        name: "Juan Dela Cruz",
        id: "APP-LAG-2026-001",
        targetRole: "Production Helper",
        site: "Laguna",
        ahpScore: 88,
        statusStep: 2 // 1: Submitted, 2: Review, 3: Orientation, 4: Deployed
    };

    // ==========================================
    // 2. POPULATE UI TEXT
    // ==========================================
    const appNameEl = document.getElementById('app-name');
    if(appNameEl) appNameEl.innerText = applicantData.name;
    
    const welcomeNameEl = document.getElementById('welcome-name');
    if(welcomeNameEl) welcomeNameEl.innerText = applicantData.name.split(' ')[0]; // First name only
    
    const appIdEl = document.getElementById('app-id');
    if(appIdEl) appIdEl.innerText = applicantData.id;
    
    const appRoleEl = document.getElementById('app-role');
    if(appRoleEl) appRoleEl.innerText = `${applicantData.targetRole} (${applicantData.site})`;

    // ==========================================
    // 3. LOGOUT BUTTON LOGIC
    // ==========================================
    const logoutBtn = document.querySelector('.logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            setTimeout(() => { window.location.href = 'login.html'; }, 300);
        });
    }

    // ==========================================
    // 4. INTERACTIVE PIPELINE TOGGLE LOGIC
    // ==========================================
const toggleButtons = document.querySelectorAll('.toggle-btn');

// Fix pipeline connecting lines: ensure step-line inherits the same status as the previous step
    // (no-op if CSS already handles it; safe for completed states)
    document.querySelectorAll('.stepper-container .step.completed').forEach(stepEl => {
        const line = stepEl.querySelector('.step-line');
        if (line) line.style.background = 'var(--primary-green)';
    });

    toggleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            const icon = btn.querySelector('i');

            // If it's currently hidden, open it
            if (targetContent && targetContent.style.display === 'none') {
                targetContent.style.display = 'block';
                btn.style.background = 'var(--light-bg)';
                btn.style.borderColor = 'var(--primary-blue)';
                btn.style.color = 'var(--primary-blue)';
                
                // Rotate the arrow icon
                if(icon) {
                    icon.style.transform = 'rotate(180deg)';
                    icon.style.transition = 'transform 0.3s ease';
                }
            } 
            // If it's open, close it
            else if (targetContent) {
                targetContent.style.display = 'none';
                btn.style.background = 'transparent';
                btn.style.borderColor = 'var(--border-color)';
                btn.style.color = 'var(--text-main)';
                
                // Reset the arrow icon
                if(icon) {
                    icon.style.transform = 'rotate(0deg)';
                }
            }
        });
    });

document.addEventListener("DOMContentLoaded", () => {

    // 1. Mock Data (This would come from your login session/database)

    const applicantContext = {
        name: "Juan Dela Cruz",
        id: "APP-LAG-2026-001",
        role: "Production Helper",
        branch: "Laguna", // Switch to "Cavite" to see the change
        currentStep: 2 // Index of the step they are currently on
    };

    // 2. Official Hiring Processes 
    const sitePipelines = {
        Cavite: [
            { title: "Application Form", desc: "Initial biodata submission" },
            { title: "General Exam", desc: "Basic competency assessment" },
            { title: "Interview", desc: "Face-to-face or virtual HR screening" },
            { title: "Medical & Health Card", desc: "Upload and submit physical results" },
            { title: "2 Days Orientation", desc: "On-site company training" },
            { title: "Requirements Completion", desc: "Submission of statutory documents" },
            { title: "Contract & Gear Issuance", desc: "Signing and PPE/GMP collection" },
            { title: "Security & Safety Validation", desc: "Final site safety orientation" },
            { title: "Deployment", desc: "Deployment to assigned station" }
        ],
        Laguna: [
            { title: "Application Form", desc: "Initial biodata submission" },
            { title: "Physical Screening", desc: "On-site physical fitness check" },
            { title: "General Exam", desc: "Basic competency assessment" },
            { title: "Initial Interview", desc: "Background and profile check" },
            { title: "Final Interview", desc: "Job offer and department matching" },
            { title: "Requirements Submission", desc: "Upload of official clearances" },
            { title: "Orientation", desc: "Site-specific company training" },
            { title: "Job-related Test", desc: "Technical or production line assessment" },
            { title: "Signing Contract", desc: "Final employment agreement" },
            { title: "Deployment", desc: "Deployment to assigned plant" }
        ]
    };

    // 3. UI Update Helpers
    const populatePortalDetails = () => {
        document.getElementById('welcome-name').innerText = applicantContext.name.split(' ')[0];
        document.getElementById('app-name-display').innerText = applicantContext.name;
        document.getElementById('app-id-display').innerText = applicantContext.id;
        document.getElementById('branch-name-display').innerText = applicantContext.branch;
        document.getElementById('app-role-display').innerText = applicantContext.role;
    };

    const renderPipeline = (branch, currentIdx) => {
        const container = document.getElementById('pipeline-container');
        const steps = sitePipelines[branch];
        if (!container || !steps) return;

        container.innerHTML = '';

        steps.forEach((step, index) => {
            const isCompleted = index < currentIdx;
            const isActive = index === currentIdx;
            
            const stepClass = isCompleted ? 'completed' : (isActive ? 'active' : '');
            const iconContent = isCompleted ? '<i class="fa-solid fa-check"></i>' : (index + 1);
            
            const stepHTML = `
                <div class="step ${stepClass}">
                    <div class="step-icon-wrapper">
                        <div class="step-icon">${iconContent}</div>
                        ${index !== steps.length - 1 ? '<div class="step-line"></div>' : ''}
                    </div>
                    <div class="step-main">
                        <div class="step-header">
                            <div class="step-title-block">
                                <h3>${step.title}</h3>
                                <p>${step.desc}</p>
                            </div>
                            ${isActive ? '<span class="badge new">Current Stage</span>' : ''}
                        </div>
                    </div>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', stepHTML);
        });
    };

    // 4. Initialization
    populatePortalDetails();
    renderPipeline(applicantContext.branch, applicantContext.currentStep);
});
    
});