document.addEventListener("DOMContentLoaded", () => {
    const branchSelect = document.getElementById('branch-select');
    const jobsContainerWrapper = document.getElementById('jobs-container-wrapper');
    const jobsContainer = document.getElementById('jobs-container');

    if (!branchSelect || !jobsContainerWrapper) return;

    // Database derived exactly from the Company Profile PDF Functional Areas
    const siteData = {
        makati: {
            title: "Makati (Main Office)",
            desc: "Central hub for administrative management, professional staffing, and overall talent bank recruitment.",
            categories: [
                {
                    title: "Professional & Office Staff",
                    roles: "Secretarial and office clerks, Data encoders, Messengers, Receptionists, Store Officers, Sales Associates, Marketing Assistants.",
                    status: "Available",
                    urlParam: "makati-professional"
                },
                {
                    title: "Supervisory and Technical Staff",
                    roles: "Safety officers, Managers, and Executives.",
                    status: "Urgent",
                    urlParam: "makati-supervisory"
                }
            ]
        },
        cavite: {
            title: "Cavite Satellite Office",
            desc: "Deployments focusing heavily on food processing, inventory, and laundry services for large clients.",
            categories: [
                {
                    title: "Production Helper: Process Roles",
                    roles: "Mixers, Slitters, Dough weighers, Dumpers, Scrap helpers, Feeders, Cup tappers, and Fryers.",
                    status: "Urgent",
                    urlParam: "cavite-process"
                },
                {
                    title: "Production Helper: Packaging & Sorting",
                    roles: "Sorters, Baggers, Overhead sorters, Palletizers, Carton sealers, Packers, Catchers, and Extruders.",
                    status: "Available",
                    urlParam: "cavite-packaging"
                },
                {
                    title: "Service & Quality Assurance",
                    roles: "Inventory taking staff, Laundry shop staff, and GMP compliance assistants.",
                    status: "Unavailable",
                    urlParam: "cavite-service"
                }
            ]
        },
        laguna: {
            title: "Laguna Satellite Office",
            desc: "Spanning specialized snacks, pretzels, and chocolates across three major plant locations.",
            categories: [
                {
                    title: "Production Helper: Process Roles",
                    roles: "Extraction helpers, Weighers, Mixers, Cookers, Dough handlers, Mondo mix helpers, Pulverizers.",
                    status: "Available",
                    urlParam: "laguna-process"
                },
                {
                    title: "Production Helper: Packaging & Sorting",
                    roles: "Bottle sorters, Sealers, Tilting conveyor helpers, Labeling assistants, Palletizers, Export sorters.",
                    status: "Urgent",
                    urlParam: "laguna-packaging"
                },
                {
                    title: "Technical, Maintenance & Support",
                    roles: "Forklift Operators, Maintenance Helpers, Sanitarian staff, Utilities, QA Laboratory assistants, Inventory Taggers.",
                    status: "Available",
                    urlParam: "laguna-technical"
                }
            ]
        }
    };

    const renderSiteData = (branchKey) => {
        const data = siteData[branchKey];
        if (!data) return;

        // Unhide the grid
        jobsContainerWrapper.style.display = 'block';

        const titleEl = document.getElementById('current-branch-title');
        const descEl = document.getElementById('current-branch-desc');
        if (titleEl) titleEl.innerText = data.title;
        if (descEl) descEl.innerText = data.desc;

        // Render Categorized Cards
        jobsContainer.innerHTML = '';
        data.categories.forEach(cat => {
            
            // Determine dynamic status
            let badgeClass = '';
            if (cat.status === 'Urgent') badgeClass = 'status-urgent';
            else if (cat.status === 'Available') badgeClass = 'status-available';
            else badgeClass = 'status-unavailable';

            const cardClass = cat.status === 'Unavailable' ? 'category-card unavailable' : 'category-card';
            const btnText = cat.status === 'Unavailable' ? 'Hiring Closed' : 'Apply Now';
            const btnHref = cat.status === 'Unavailable' ? 'javascript:void(0)' : `apply.html?branch=${branchKey}&category=${cat.urlParam}`;

            const cardHTML = `
                <div class="${cardClass}">
                    <div>
                        <div class="category-header">
                            <h4>${cat.title}</h4>
                            <span class="status-badge ${badgeClass}">${cat.status}</span>
                        </div>
                        <div class="category-roles-list">
                            <strong>Roles Include:</strong><br>
                            ${cat.roles}
                        </div>
                    </div>
                    <div class="category-action">
                        <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;"><i class="fa-solid fa-users" style="color: var(--primary-green);"></i> Multiple Openings</span>
                        <a href="${btnHref}" class="btn-primary" style="padding: 10px 20px;">${btnText}</a>
                    </div>
                </div>
            `;

            jobsContainer.insertAdjacentHTML('beforeend', cardHTML);
        });
    };

    // Listen for Dropdown Changes
    branchSelect.addEventListener('change', (e) => {
        if(e.target.value !== 'none') {
            renderSiteData(e.target.value);
            // Smooth scroll down to the loaded content
            jobsContainerWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });

    // Support URL parameters if routing from the homepage (e.g., jobs.html?branch=laguna)
    const urlParams = new URLSearchParams(window.location.search);
    const branchParam = urlParams.get('branch');

    if (branchParam && siteData[branchParam]) {
        branchSelect.value = branchParam;
        renderSiteData(branchParam);
    }
});