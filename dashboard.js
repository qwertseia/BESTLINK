document.addEventListener("DOMContentLoaded", () => {
    
    // 1. SIMULATED AUTHENTICATION & CONTEXT
    // Each branch admin manages ONLY their assigned location. 
    // Change site to "Laguna" to test site isolation.
    const currentUserContext = {
        name: "Eduardly Mateo",
        role: "Area Operations Mgr",
        site: "Cavite", 
        siteCode: "CAV"
    };

    // Update UI headers
    const uiSiteName = document.getElementById('ui-site-name');
    if (uiSiteName) uiSiteName.innerHTML = `<i class="fa-solid fa-location-dot"></i> <span>${currentUserContext.site} Satellite</span>`;
    
    const uiAdminName = document.getElementById('ui-admin-name');
    if (uiAdminName) uiAdminName.innerText = currentUserContext.name;
    
    const uiHeaderSite = document.getElementById('ui-header-site');
    if (uiHeaderSite) uiHeaderSite.innerText = currentUserContext.site;
    
    const uiTableSite = document.getElementById('ui-table-site');
    if (uiTableSite) uiTableSite.innerText = currentUserContext.site;

    // 2. THE HIRING PIPELINES 
    const sitePipelines = {
        Cavite: [
            { step: 1, name: "Application Form", actionType: "approve_reject", actionLabel: "Approve / Reject" },
            { step: 2, name: "General Exam", actionType: "schedule_open", actionLabel: "Schedule to Open Exam" },
            { step: 3, name: "Interview", actionType: "schedule_notify", actionLabel: "Set Schedule & Notify" },
            { step: 4, name: "Medical and Health Card", actionType: "review", actionLabel: "Review Uploads" },
            { step: 5, name: "2 Days Orientation", actionType: "schedule_notify", actionLabel: "Set Schedule & Notify" },
            { step: 6, name: "Requirements", actionType: "review", actionLabel: "Review Uploads" },
            { step: 7, name: "Contract, PPE & GMP", actionType: "schedule_notify", actionLabel: "Set Schedule & Notify" },
            { step: 8, name: "Security / Safety Orientation", actionType: "schedule_notify", actionLabel: "Set Schedule & Notify" },
            { step: 9, name: "Deployment", actionType: "deploy", actionLabel: "Execute Deployment" }
        ],
        Laguna: [
            { step: 1, name: "Application Form", actionType: "approve_reject", actionLabel: "Approve / Reject" },
            { step: 2, name: "Physical Screening", actionType: "schedule_notify", actionLabel: "Set Schedule & Notify" },
            { step: 3, name: "General Exam", actionType: "schedule_open", actionLabel: "Schedule to Open Exam" },
            { step: 4, name: "Initial Interview (B.I.)", actionType: "schedule_notify", actionLabel: "Set Schedule & Notify" },
            { step: 5, name: "Final Interview (Job Offer)", actionType: "schedule_notify", actionLabel: "Set Schedule & Notify" },
            { step: 6, name: "Requirements", actionType: "review", actionLabel: "Review Uploads" },
            { step: 7, name: "Orientation", actionType: "schedule_notify", actionLabel: "Set Schedule & Notify" },
            { step: 8, name: "Job-related Test", actionType: "schedule_open", actionLabel: "Schedule to Open Test" },
            { step: 9, name: "Signing Contract", actionType: "schedule_notify", actionLabel: "Set Schedule & Notify" },
            { step: 10, name: "Deployment", actionType: "deploy", actionLabel: "Execute Deployment" }
        ]
    };

    // 3. EXPANDED GLOBAL MOCK DATABASE 
    let globalApplicants = [
        // --- CAVITE APPLICANTS ---
        { id: "CAV-089", name: "Mark Reyes", role: "Production Helper", branch: "Cavite", date: "Oct 28, 2024", score: "Pending", currentStep: 1, subState: null, status: "New", statusClass: "new" },
        { id: "CAV-090", name: "Anna Lim", role: "Professional Staff", branch: "Cavite", date: "Oct 26, 2024", score: "88%", currentStep: 3, subState: "waiting", status: "In Process", statusClass: "review" },
        { id: "CAV-091", name: "Paul Gomez", role: "Skilled Trades", branch: "Cavite", date: "Oct 25, 2024", score: "92%", currentStep: 8, subState: null, status: "In Process", statusClass: "review" },
        { id: "CAV-092", name: "Maria Santos", role: "Production Helper", branch: "Cavite", date: "Oct 24, 2024", score: "85%", currentStep: 4, subState: null, status: "In Process", statusClass: "review" },
        { id: "CAV-093", name: "Carlos Mendoza", role: "Skilled Trades", branch: "Cavite", date: "Oct 22, 2024", score: "78%", currentStep: 2, subState: "waiting", status: "In Process", statusClass: "review" },
        { id: "CAV-094", name: "Diana Cruz", role: "Professional Staff", branch: "Cavite", date: "Oct 20, 2024", score: "94%", currentStep: 6, subState: null, status: "In Process", statusClass: "review" },
        { id: "CAV-095", name: "Ramon Bautista", role: "Production Helper", branch: "Cavite", date: "Oct 18, 2024", score: "81%", currentStep: 9, subState: null, status: "In Process", statusClass: "review" },
        { id: "CAV-096", name: "Elena Gonzales", role: "Production Helper", branch: "Cavite", date: "Oct 15, 2024", score: "89%", currentStep: 10, subState: null, status: "Deployed", statusClass: "hired" },
        { id: "CAV-097", name: "Victor Villanueva", role: "Skilled Trades", branch: "Cavite", date: "Oct 28, 2024", score: "Pending", currentStep: 1, subState: null, status: "New", statusClass: "new" },
        { id: "CAV-098", name: "Sarah Fernandez", role: "Professional Staff", branch: "Cavite", date: "Oct 27, 2024", score: "91%", currentStep: 5, subState: "waiting", status: "In Process", statusClass: "review" },

        // --- LAGUNA APPLICANTS ---
        { id: "LAG-001", name: "Juan Dela Cruz", role: "Production Helper", branch: "Laguna", date: "Oct 28, 2024", score: "Pending", currentStep: 1, subState: null, status: "New", statusClass: "new" },
        { id: "LAG-002", name: "Jose Rizal", role: "Skilled Trades", branch: "Laguna", date: "Oct 15, 2024", score: "95%", currentStep: 11, subState: null, status: "Deployed", statusClass: "hired" },
        { id: "LAG-003", name: "Andres Bonifacio", role: "Production Helper", branch: "Laguna", date: "Oct 27, 2024", score: "82%", currentStep: 3, subState: "waiting", status: "In Process", statusClass: "review" },
        { id: "LAG-004", name: "Emilio Aguinaldo", role: "Professional Staff", branch: "Laguna", date: "Oct 25, 2024", score: "90%", currentStep: 4, subState: null, status: "In Process", statusClass: "review" },
        { id: "LAG-005", name: "Apolinario Mabini", role: "Skilled Trades", branch: "Laguna", date: "Oct 23, 2024", score: "88%", currentStep: 6, subState: null, status: "In Process", statusClass: "review" },
        { id: "LAG-006", name: "Gabriela Silang", role: "Production Helper", branch: "Laguna", date: "Oct 21, 2024", score: "86%", currentStep: 8, subState: "waiting", status: "In Process", statusClass: "review" },
        { id: "LAG-007", name: "Melchora Aquino", role: "Professional Staff", branch: "Laguna", date: "Oct 20, 2024", score: "93%", currentStep: 9, subState: null, status: "In Process", statusClass: "review" },
        { id: "LAG-008", name: "Antonio Luna", role: "Skilled Trades", branch: "Laguna", date: "Oct 18, 2024", score: "89%", currentStep: 10, subState: null, status: "In Process", statusClass: "review" },
        { id: "LAG-009", name: "Marcelo Del Pilar", role: "Production Helper", branch: "Laguna", date: "Oct 28, 2024", score: "Pending", currentStep: 1, subState: null, status: "New", statusClass: "new" },
        { id: "LAG-010", name: "Teresa Magbanua", role: "Professional Staff", branch: "Laguna", date: "Oct 26, 2024", score: "87%", currentStep: 2, subState: "waiting", status: "In Process", statusClass: "review" }
    ];

    let localApplicants = globalApplicants.filter(app => app.branch === currentUserContext.site);
    let activeApplicantId = null;

    // 4. RENDER QUEUE TABLE (WITH FIFO SORTING)
    const renderTable = () => {
        const tableBody = document.getElementById('applicantTableBody');
        if (!tableBody) return;
        tableBody.innerHTML = ''; 

        // Update KPIs based on the newly populated local data
        const kpiNew = document.getElementById('kpi-new-apps');
        if (kpiNew) kpiNew.innerText = localApplicants.filter(a => a.status === 'New').length;
        
        const kpiOrient = document.getElementById('kpi-pending-orient');
        if (kpiOrient) kpiOrient.innerText = localApplicants.filter(a => a.score === 'Pending').length;

        const kpiDeployed = document.getElementById('kpi-deployed');
        if (kpiDeployed) kpiDeployed.innerText = localApplicants.filter(a => a.status === 'Deployed').length + 395; 

        // CRITICAL UPDATE: Sort Local Applicants from Oldest to Newest (FIFO)
        localApplicants.sort((a, b) => new Date(a.date) - new Date(b.date));

        localApplicants.forEach((app, index) => {
            const currentPipeline = sitePipelines[currentUserContext.site];
            const stageName = currentPipeline[app.currentStep - 1]?.name || "Cleared for Deployment";

            const row = `
                <tr>
                    <td style="font-size: 0.85rem; color: var(--text-muted);">
                        <span style="font-weight: 700; color: var(--primary-blue); margin-right: 6px;">#${index + 1}</span>
                        ${app.id}
                    </td>
                    <td style="font-weight: 600; color: var(--sidebar-bg);">${app.name}</td>
                    <td>${app.role}</td>
                    <td style="font-size: 0.85rem;">
                        <i class="fa-regular fa-calendar" style="margin-right: 4px; color: var(--text-muted);"></i> ${app.date}
                    </td>
                    <td><span class="score-badge">${app.score}</span></td>
                    <td style="font-size: 0.85rem;"><span class="badge" style="background: #e2e8f0; color: #334155;">Step ${app.currentStep > currentPipeline.length ? 'Max' : app.currentStep}: ${stageName}</span></td>
                    <td>
                        <button class="action-btn open-pipeline-btn" data-id="${app.id}" title="Manage Pipeline"><i class="fa-solid fa-bars-progress"></i></button>
                    </td>
                </tr>
            `;
            tableBody.insertAdjacentHTML('beforeend', row);
        });
    };
    renderTable();

    // 5. PIPELINE MANAGER LOGIC
    const pipelineModal = document.getElementById('pipelineModal');

    const tableBody = document.getElementById('applicantTableBody');
    if (tableBody) {
        tableBody.addEventListener('click', (e) => {
            const btn = e.target.closest('.open-pipeline-btn');
            if (!btn) return;

            const appId = btn.getAttribute('data-id');
            const appData = localApplicants.find(a => a.id === appId);
            activeApplicantId = appId;

            if (appData) {
                document.getElementById('modal-app-name').innerText = appData.name;
                document.getElementById('modal-app-id').innerText = appData.id;
                document.getElementById('modal-app-role').innerText = appData.role;
                document.getElementById('modal-app-date').innerText = appData.date;
                document.getElementById('modal-app-score').innerText = appData.score;
                document.getElementById('modal-site-badge').innerText = `${currentUserContext.site} Pipeline`;
                
                renderPipelineTracker(appData);
                pipelineModal.style.display = 'flex';
            }
        });
    }

    const renderPipelineTracker = (appData) => {
        const container = document.getElementById('adminPipelineContainer');
        if (!container) return;
        container.innerHTML = '';
        const pipeline = sitePipelines[currentUserContext.site];

        pipeline.forEach((stage, index) => {
            const isCompleted = index + 1 < appData.currentStep;
            const isActive = index + 1 === appData.currentStep;
            
            let stateClass = isCompleted ? 'completed' : (isActive ? 'active' : 'locked');
            
            let actionHtml = '';
            if (isActive) {
                if (appData.subState === 'waiting') {
                    actionHtml = `
                        <div class="action-panel">
                            <span class="status-label" style="background: #fffbeb; color: #d97706; border-color: #fde68a;">
                                <i class="fa-solid fa-hourglass-half"></i> Awaiting Applicant
                            </span>
                            <button class="btn-solid-primary btn-verify" style="margin-left: auto;">Verify Output & Advance</button>
                        </div>
                    `;
                } else {
                    if (stage.actionType === 'approve_reject') {
                        actionHtml = `
                            <div class="action-panel">
                                <button class="btn-solid-success btn-approve">Approve Profile</button>
                                <button class="btn-outline-danger btn-reject">Reject</button>
                            </div>
                        `;
                    } else if (stage.actionType === 'schedule_open' || stage.actionType === 'schedule_notify') {
                        actionHtml = `
                            <div class="action-panel">
                                <button class="btn-solid-primary btn-process" data-action="${stage.actionType}"><i class="fa-solid fa-paper-plane" style="margin-right:6px;"></i> ${stage.actionLabel}</button>
                            </div>
                        `;
                    } else if (stage.actionType === 'review') {
                        actionHtml = `
                            <div class="action-panel">
                                <button class="btn-solid-primary btn-process" data-action="${stage.actionType}"><i class="fa-solid fa-magnifying-glass" style="margin-right:6px;"></i> ${stage.actionLabel}</button>
                            </div>
                        `;
                    } else if (stage.actionType === 'deploy') {
                        actionHtml = `
                            <div class="action-panel">
                                <button class="btn-solid-success btn-process" data-action="${stage.actionType}"><i class="fa-solid fa-helmet-safety" style="margin-right:6px;"></i> ${stage.actionLabel}</button>
                            </div>
                        `;
                    }
                }
            } else if (isCompleted) {
                actionHtml = `<div class="action-panel"><span class="status-label"><i class="fa-solid fa-check-double"></i> Cleared & Logged</span></div>`;
            }

            const stepHtml = `
                <div class="timeline-step ${stateClass}">
                    <div class="timeline-marker"></div>
                    <div class="timeline-content">
                        <div class="timeline-title">${stage.step}. ${stage.name}</div>
                        ${isActive && !appData.subState ? '<div class="timeline-meta">Requires Admin Setup</div>' : ''}
                        ${actionHtml}
                    </div>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', stepHtml);
        });

        attachPipelineActionListeners();
    };

    // 6. PIPELINE ACTION TRIGGERS (Management & Wait States)
    const attachPipelineActionListeners = () => {
        const app = localApplicants.find(a => a.id === activeApplicantId);
        if (!app) return;

        const approveBtn = document.querySelector('.btn-approve');
        if (approveBtn) approveBtn.addEventListener('click', () => {
            alert("Application Approved. System dispatched login credentials via Email/SMS.");
            advancePipelineStage(app);
        });

        const rejectBtn = document.querySelector('.btn-reject');
        if (rejectBtn) rejectBtn.addEventListener('click', () => {
            const reason = prompt("Select Rejection Reason:\n1. Incorrect Inputs\n2. Invalid Documents\n3. Does Not Meet Criteria");
            if (reason) {
                alert("Applicant Rejected. System dispatched notification regarding standard criteria mismatch.");
                app.status = "Rejected";
                app.statusClass = "review"; 
                renderTable();
                closePipelineModal();
            }
        });

        document.querySelectorAll('.btn-process').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.getAttribute('data-action');
                
                if (action === 'schedule_notify') {
                    const date = prompt("Set Date for this Schedule (YYYY-MM-DD):");
                    if (date) {
                        alert(`Schedule set for ${date}. Automated Email/SMS dispatched to applicant.`);
                        app.subState = 'waiting'; 
                        renderPipelineTracker(app);
                    }
                } else if (action === 'schedule_open') {
                    alert("Portal Link Opened. System notified the applicant to take the digital exam/test.");
                    app.subState = 'waiting'; 
                    renderPipelineTracker(app);
                } else if (action === 'review') {
                    alert("Documents successfully reviewed and verified.");
                    advancePipelineStage(app); 
                } else if (action === 'deploy') {
                    alert("Deployment Executed! Applicant is now officially hired.");
                    advancePipelineStage(app);
                }
            });
        });

        const verifyBtn = document.querySelector('.btn-verify');
        if (verifyBtn) verifyBtn.addEventListener('click', () => {
            app.subState = null; 
            alert("Applicant output verified. Moving to the next stage of the pipeline.");
            advancePipelineStage(app);
        });
    };

    const advancePipelineStage = (app) => {
        const pipelineLen = sitePipelines[currentUserContext.site].length;

        if (app.currentStep <= pipelineLen) {
            app.currentStep += 1;
            app.status = "In Process";
            app.statusClass = "review";
            
            if (app.currentStep > pipelineLen) {
                app.status = "Deployed";
                app.statusClass = "hired";
            }
        }

        renderTable();
        renderPipelineTracker(app);
    };

    const closePipelineModal = () => { 
        const modal = document.getElementById('pipelineModal');
        if (modal) modal.style.display = 'none'; 
        activeApplicantId = null; 
    };
    
    const closePipelineBtn = document.getElementById('closePipelineBtn');
    if (closePipelineBtn) closePipelineBtn.addEventListener('click', closePipelineModal);
});

// 7. VIEW SWITCHER (NAVIGATION)
    const navOverviewBtn = document.getElementById('nav-overview');
    const navQueueBtn = document.getElementById('nav-queue');
    const navOffboardBtn = document.getElementById('nav-offboarding');
    
    const viewOverview = document.getElementById('view-overview');
    const viewQueue = document.getElementById('view-queue');
    const viewOffboarding = document.getElementById('view-offboarding');

    const switchView = (activeBtn, activeView) => {
        [navOverviewBtn, navQueueBtn, navOffboardBtn].forEach(btn => {
            if(btn) btn.classList.remove('active');
        });
        [viewOverview, viewQueue, viewOffboarding].forEach(view => { 
            if(view) view.style.display = 'none'; 
        });
        
        if(activeBtn) activeBtn.classList.add('active');
        if(activeView) activeView.style.display = 'block';

        // Trigger animation rendering if opening Overview
        if (activeView === viewOverview) renderAnalytics();
    };

    if (navOverviewBtn) navOverviewBtn.addEventListener('click', (e) => { e.preventDefault(); switchView(navOverviewBtn, viewOverview); });
    if (navQueueBtn) navQueueBtn.addEventListener('click', (e) => { e.preventDefault(); switchView(navQueueBtn, viewQueue); });
    if (navOffboardBtn) navOffboardBtn.addEventListener('click', (e) => { e.preventDefault(); switchView(navOffboardBtn, viewOffboarding); });

    // 8. RENDER LOCAL ANALYTICS
    const renderAnalytics = () => {
        const siteNameTag = document.getElementById('analytics-site-name');
        if (siteNameTag) siteNameTag.innerText = currentUserContext.site;

        // Metric: Total Processed
        const totalProcessed = localApplicants.length;
        document.getElementById('metric-total-processed').innerText = totalProcessed;

        // --- Render Funnel Chart ---
        const funnelContainer = document.getElementById('pipelineFunnel');
        if (funnelContainer) {
            const newCount = localApplicants.filter(a => a.status === 'New').length;
            const processCount = localApplicants.filter(a => a.status === 'In Process').length;
            const hiredCount = localApplicants.filter(a => a.status === 'Deployed').length;

            const newPct = totalProcessed === 0 ? 0 : Math.round((newCount / totalProcessed) * 100);
            const processPct = totalProcessed === 0 ? 0 : Math.round((processCount / totalProcessed) * 100);
            const hiredPct = totalProcessed === 0 ? 0 : Math.round((hiredCount / totalProcessed) * 100);

            funnelContainer.innerHTML = `
                <div class="funnel-row">
                    <div class="funnel-label">New Applications</div>
                    <div class="funnel-bar-container"><div class="funnel-bar blue" style="width: ${newPct}%">${newPct}%</div></div>
                    <div class="funnel-value">${newCount}</div>
                </div>
                <div class="funnel-row">
                    <div class="funnel-label">In Pipeline</div>
                    <div class="funnel-bar-container"><div class="funnel-bar amber" style="width: ${processPct}%">${processPct}%</div></div>
                    <div class="funnel-value">${processCount}</div>
                </div>
                <div class="funnel-row">
                    <div class="funnel-label">Cleared & Deployed</div>
                    <div class="funnel-bar-container"><div class="funnel-bar green" style="width: ${hiredPct}%">${hiredPct}%</div></div>
                    <div class="funnel-value">${hiredCount}</div>
                </div>
            `;
        }

        // --- Render Role Distribution Chart ---
        const roleContainer = document.getElementById('roleDistributionChart');
        if (roleContainer) {
            // Count occurrences of each role dynamically
            const roleCounts = {};
            localApplicants.forEach(app => {
                roleCounts[app.role] = (roleCounts[app.role] || 0) + 1;
            });

            // Sort roles by highest demand
            const sortedRoles = Object.entries(roleCounts).sort((a, b) => b[1] - a[1]);

            roleContainer.innerHTML = '';
            sortedRoles.forEach(([role, count]) => {
                const percentage = Math.round((count / totalProcessed) * 100);
                const roleHtml = `
                    <div class="bar-row">
                        <div class="bar-label-group">
                            <span>${role}</span>
                            <span>${count} applicants (${percentage}%)</span>
                        </div>
                        <div class="bar-track">
                            <div class="bar-fill" style="width: ${percentage}%"></div>
                        </div>
                    </div>
                `;
                roleContainer.insertAdjacentHTML('beforeend', roleHtml);
            });
        }
    };

    // Initialize analytics on load if Overview is the default view
    if (viewOverview && viewOverview.style.display !== 'none') {
        renderAnalytics();
    }