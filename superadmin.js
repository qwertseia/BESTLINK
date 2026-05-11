document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // 1. VIEW SWITCHER (NAVIGATION)
    // ==========================================
    const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
    const views = document.querySelectorAll('.dashboard-view');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            if(item.classList.contains('logout')) return;
            e.preventDefault();
            
            // Remove active states from all tabs
            navItems.forEach(nav => nav.classList.remove('active'));
            views.forEach(view => view.style.display = 'none');

            // Add active state to the clicked tab
            item.classList.add('active');
            const targetId = item.getAttribute('data-target');
            const targetView = document.getElementById(targetId);
            if (targetView) targetView.style.display = 'block';
        });
    });

    // ==========================================
    // 2. FEATURE 3.2: DECENTRALIZED ACTIVITY MONITORING
    // ==========================================
    // Simulated real-time audit logs from Satellite Branches
    const mockLogs = [
        { time: "Just Now", site: "Cavite", admin: "Eduardly Mateo", action: "Approved Application", target: "APP-CAV-089" },
        { time: "15 mins ago", site: "Laguna", admin: "Maria Santos", action: "Scheduled Exam", target: "APP-LAG-003" },
        { time: "1 hour ago", site: "Laguna", admin: "Maria Santos", action: "Verified Documents", target: "APP-LAG-004" },
        { time: "2 hours ago", site: "Cavite", admin: "Eduardly Mateo", action: "Executed Deployment", target: "APP-CAV-096" },
        { time: "Yesterday", site: "System", admin: "Auto-System", action: "Dispatched Batch Emails", target: "Orientation Cohort B" },
        { time: "Yesterday", site: "Laguna", admin: "Paul Gomez", action: "Rejected Application", target: "APP-LAG-015" }
    ];

    const renderLogs = (filterText = '') => {
        const body = document.getElementById('monitoringLogsBody');
        if(!body) return;
        body.innerHTML = '';
        
        const filteredLogs = mockLogs.filter(log => 
            log.action.toLowerCase().includes(filterText.toLowerCase()) || 
            log.admin.toLowerCase().includes(filterText.toLowerCase()) ||
            log.target.toLowerCase().includes(filterText.toLowerCase())
        );

        filteredLogs.forEach(log => {
            const siteBadge = log.site === "Cavite" ? "site-cavite" : (log.site === "Laguna" ? "site-laguna" : "");
            const row = `
                <tr>
                    <td style="font-size: 0.85rem; color: var(--text-muted);">${log.time}</td>
                    <td><span class="badge ${siteBadge}" style="background: #e2e8f0; color: #334155;">${log.site}</span></td>
                    <td style="font-weight: 600;">${log.admin}</td>
                    <td style="color: var(--primary-blue);">${log.action}</td>
                    <td style="font-family: monospace;">${log.target}</td>
                </tr>
            `;
            body.insertAdjacentHTML('beforeend', row);
        });
    };
    
    // Initialize logs
    renderLogs();

    // Global Search Bar Logic (Filters Logs)
    const globalSearch = document.querySelector('.search-bar input');
    if (globalSearch) {
        globalSearch.addEventListener('input', (e) => {
            // Automatically switch to monitoring tab when searching
            document.querySelector('[data-target="view-monitoring"]').click();
            renderLogs(e.target.value);
        });
    }

    // ==========================================
    // 3. FEATURE 3.4: DYNAMIC SYSTEM & ALGORITHM CONFIG
    // ==========================================
    const ahpSlider = document.getElementById('ahpThreshold');
    const ahpDisplay = document.getElementById('ahpThresholdDisplay');
    const saveThresholdBtn = document.getElementById('saveThresholdBtn');

    if (ahpSlider && ahpDisplay) {
        // Update the pill display as the slider moves
        ahpSlider.addEventListener('input', (e) => {
            ahpDisplay.innerText = e.target.value + '%';
            
            // Visual feedback: turn red if threshold is dangerously low
            if (e.target.value < 60) {
                ahpDisplay.style.color = '#ef4444';
                ahpDisplay.style.borderColor = '#fca5a5';
                ahpDisplay.style.background = '#fef2f2';
            } else {
                ahpDisplay.style.color = 'var(--primary-blue)';
                ahpDisplay.style.borderColor = '#bfdbfe';
                ahpDisplay.style.background = '#eff6ff';
            }
        });

        // Save Global Config
        saveThresholdBtn.addEventListener('click', () => {
            const threshold = ahpSlider.value;
            alert(`Global Algorithm Updated!\n\nThe minimum AHP Suitability passing score is now enforced globally at ${threshold}%.`);
            saveThresholdBtn.innerHTML = '<i class="fa-solid fa-check"></i> Applied Successfully';
            saveThresholdBtn.classList.replace('btn-solid-primary', 'btn-solid-success');
            
            setTimeout(() => {
                saveThresholdBtn.innerHTML = 'Apply Global Threshold';
                saveThresholdBtn.classList.replace('btn-solid-success', 'btn-solid-primary');
            }, 3000);
        });
    }

    // System Automation Toggles
    const toggleSwitches = document.querySelectorAll('.switch input[type="checkbox"]');
    toggleSwitches.forEach(toggle => {
        toggle.addEventListener('change', (e) => {
            const settingName = e.target.closest('li').querySelector('.doc-title').innerText.trim();
            if (e.target.checked) {
                console.log(`[System Config] Enabled: ${settingName}`);
            } else {
                console.log(`[System Config] Disabled: ${settingName}`);
            }
        });
    });

    // ==========================================
    // 4. FEATURE 3.5: ADMINISTRATIVE ACCOUNT MANAGEMENT
    // ==========================================
    let mockAdmins = [
        { id: "HR-CAV-01", name: "Eduardly Mateo", site: "Cavite", status: "Active" },
        { id: "HR-LAG-01", name: "Maria Santos", site: "Laguna", status: "Active" },
        { id: "HR-LAG-02", name: "Paul Gomez", site: "Laguna", status: "Suspended" }
    ];

    const renderAdmins = () => {
        const body = document.getElementById('adminAccountsBody');
        if(!body) return;
        body.innerHTML = '';

        mockAdmins.forEach(admin => {
            const statusColor = admin.status === 'Active' ? 'var(--primary-green)' : '#ef4444';
            const actionBtn = admin.status === 'Active' 
                ? `<button class="btn-outline-danger btn-revoke" data-id="${admin.id}" style="padding: 4px 10px; font-size: 0.75rem;">Suspend Access</button>`
                : `<button class="btn-solid-success btn-restore" data-id="${admin.id}" style="padding: 4px 10px; font-size: 0.75rem;">Restore</button>`;

            const row = `
                <tr>
                    <td style="font-family: monospace; color: var(--text-muted);">${admin.id}</td>
                    <td style="font-weight: 600; color: var(--sidebar-bg);">${admin.name}</td>
                    <td>${admin.site}</td>
                    <td><span style="color: ${statusColor}; font-weight: 700; font-size: 0.85rem;"><i class="fa-solid fa-circle" style="font-size: 0.5rem; vertical-align: middle;"></i> ${admin.status}</span></td>
                    <td>${actionBtn}</td>
                </tr>
            `;
            body.insertAdjacentHTML('beforeend', row);
        });

        attachAdminActionListeners();
    };

    const attachAdminActionListeners = () => {
        // Suspend Admin Access
        document.querySelectorAll('.btn-revoke').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const adminId = e.target.getAttribute('data-id');
                if(confirm(`Are you sure you want to suspend access for Admin ${adminId}?`)) {
                    const admin = mockAdmins.find(a => a.id === adminId);
                    admin.status = 'Suspended';
                    renderAdmins();
                }
            });
        });

        // Restore Admin Access
        document.querySelectorAll('.btn-restore').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const adminId = e.target.getAttribute('data-id');
                const admin = mockAdmins.find(a => a.id === adminId);
                admin.status = 'Active';
                renderAdmins();
            });
        });
    };

    // Initialize Admin Table
    renderAdmins();

    // Add New Admin Trigger
    const addAdminBtn = document.querySelector('.btn-solid-success:has(.fa-user-plus)');
    if (addAdminBtn) {
        addAdminBtn.addEventListener('click', () => {
            const name = prompt("Enter new Admin Name:");
            const site = prompt("Assign to Site (Cavite / Laguna / Makati):");
            
            if (name && site) {
                const newId = `HR-${site.substring(0,3).toUpperCase()}-0${mockAdmins.length + 1}`;
                mockAdmins.push({ id: newId, name: name, site: site, status: "Active" });
                renderAdmins();
                alert(`Admin account created successfully.\nID: ${newId}`);
            }
        });
    }
});