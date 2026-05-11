document.addEventListener("DOMContentLoaded", () => {
    const biodataForm = document.getElementById('biodataApplicationForm');
    if (!biodataForm) return;

    const branchSelect = document.getElementById('applyBranch');
    const positionSelect = document.getElementById('applyPosition');
    const eduSelect = document.getElementById('highestEducation');
    const historyContainer = document.getElementById('educationHistory');
    const collegeHistory = document.getElementById('collegeHistory');

    const findNearestBtn = document.getElementById('findNearestBtn');
    const suggestionBox = document.getElementById('locationSuggestion');
    const suggestedNameSpan = document.getElementById('suggestedBranchName');
    const acceptLocationBtn = document.getElementById('acceptLocationBtn');
    const dismissLocationBtn = document.getElementById('dismissLocationBtn');

    // Education filtering rules based on jobs page mappings
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

    const normalizeTitle = (title) => {
        return title.toLowerCase()
            .replace(/[\/\-\\_]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    };

    const findJobByTitle = (branchKey, titleText) => {
        const jobs = roleData[branchKey];
        if (!jobs) return null;

        const normalizedSearch = normalizeTitle(titleText);

        let match = jobs.find(j => j.text === titleText);
        if (!match) match = jobs.find(j => j.text.toLowerCase() === titleText.toLowerCase());
        if (!match) match = jobs.find(j => normalizeTitle(j.text) === normalizedSearch);
        if (!match) {
            match = jobs.find(j =>
                normalizedSearch.includes(normalizeTitle(j.text)) ||
                normalizeTitle(j.text).includes(normalizedSearch)
            );
        }
        return match;
    };

    const populatePositions = (branchKey) => {
        positionSelect.innerHTML = '';
        eduSelect.innerHTML = '';

        positionSelect.innerHTML = '<option value="" disabled selected>Select specific position...</option>';
        eduSelect.innerHTML = '<option value="" disabled selected>Please select a position first</option>';
        eduSelect.disabled = true;
        historyContainer.style.display = 'none';

        if (!roleData[branchKey]) return;

        positionSelect.disabled = false;
        roleData[branchKey].forEach(job => {
            positionSelect.innerHTML += `<option value="${job.value}">${job.text}</option>`;
        });
    };

    if (branchSelect) {
        branchSelect.addEventListener('change', (e) => populatePositions(e.target.value));
    }

    const handleAutoFill = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const branchParam = urlParams.get('branch');
        const positionParam = urlParams.get('position');

        if (!branchParam || !roleData[branchParam]) return;

        branchSelect.value = branchParam;
        populatePositions(branchParam);

        const decodedPosition = positionParam ? decodeURIComponent(positionParam) : null;
        if (!decodedPosition) return;

        const matchedJob = findJobByTitle(branchParam, decodedPosition);
        if (!matchedJob) return;

        positionSelect.value = matchedJob.value;
        positionSelect.dispatchEvent(new Event('change'));
    };

    if (branchSelect && (window.location.search.includes('branch=') || window.location.search.includes('position='))) {
        setTimeout(handleAutoFill, 100);
    }

    // Find nearest branch via GPS
    if (findNearestBtn && branchSelect) {
        const branchLocations = {
            makati: { lat: 14.5605, lon: 121.0232 },
            cavite: { lat: 14.3294, lon: 120.9367 },
            laguna: { lat: 14.2766, lon: 121.1235 }
        };

        const branchDisplayNames = {
            makati: "Makati (Main Office)",
            cavite: "Cavite (Satellite)",
            laguna: "Laguna (Satellite)"
        };

        const calculateDistance = (lat1, lon1, lat2, lon2) => {
            const R = 6371;
            const dLat = (lat2 - lat1) * Math.PI / 180;
            const dLon = (lon2 - lon1) * Math.PI / 180;
            const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLon/2) * Math.sin(dLon/2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            return R * c;
        };

        findNearestBtn.addEventListener('click', () => {
            if (!navigator.geolocation) {
                alert('Geolocation is not supported by your browser.');
                return;
            }

            const originalContent = findNearestBtn.innerHTML;
            findNearestBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Locating...';
            suggestionBox.style.display = 'none';

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLat = position.coords.latitude;
                    const userLon = position.coords.longitude;

                    let nearestBranch = '';
                    let shortestDistance = Infinity;

                    for (const [branch, coords] of Object.entries(branchLocations)) {
                        const distance = calculateDistance(userLat, userLon, coords.lat, coords.lon);
                        if (distance < shortestDistance) {
                            shortestDistance = distance;
                            nearestBranch = branch;
                        }
                    }

                    suggestedNameSpan.innerText = branchDisplayNames[nearestBranch];
                    suggestionBox.style.display = 'flex';

                    findNearestBtn.innerHTML = '<i class="fa-solid fa-check" style="color: var(--primary-green);"></i> Found';
                    setTimeout(() => { findNearestBtn.innerHTML = originalContent; }, 2000);

                    acceptLocationBtn.onclick = () => {
                        branchSelect.value = nearestBranch;
                        branchSelect.dispatchEvent(new Event('change'));
                        suggestionBox.style.display = 'none';
                    };

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

    // Filter education options based on selected position
    if (positionSelect && eduSelect && historyContainer) {
        positionSelect.addEventListener('change', (e) => {
            const selectedBranch = branchSelect.value;
            const selectedPositionValue = e.target.value;

            const jobData = roleData[selectedBranch]?.find(j => j.value === selectedPositionValue);

            eduSelect.innerHTML = '<option value="" disabled selected>Select your highest attainment...</option>';
            eduSelect.disabled = false;
            historyContainer.style.display = 'none';

            if (jobData?.education) {
                jobData.education.forEach(edu => {
                    eduSelect.innerHTML += `<option value="${edu.val}">${edu.text}</option>`;
                });
            }
        });
    }

    // Show/hide education history
    if (eduSelect && historyContainer && collegeHistory) {
        eduSelect.addEventListener('change', (e) => {
            const val = e.target.value;
            historyContainer.style.display = 'block';

            if (val === 'college_level' || val === 'college_grad' || val === 'masters' || val === 'bs_accountancy' || val === 'science_degree') {
                collegeHistory.style.display = 'block';
                collegeHistory.querySelector('input')?.setAttribute('required', 'true');
            } else {
                collegeHistory.style.display = 'none';
                collegeHistory.querySelector('input')?.removeAttribute('required');
            }
        });
    }

    // Submission
    biodataForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const lastName = document.getElementById('lastName').value;
        const firstName = document.getElementById('firstName').value;

        alert(`Application Data for ${firstName} ${lastName} has been saved.\n\nThis biodata will be formatted into a printable A4 layout for HR filling and you will be notified for the next step of the hiring process.`);
        window.location.href = 'jobs.html';
    });
    
});

document.addEventListener("DOMContentLoaded", () => {
    const applyBranch = document.getElementById('applyBranch');
    const applyPosition = document.getElementById('applyPosition');
    const highestEducation = document.getElementById('highestEducation');
    const educationHistory = document.getElementById('educationHistory');
    const collegeHistory = document.getElementById('collegeHistory');

    // Branch-to-Position Mapping from Company Profile
    const branchPositions = {
        makati: ['Professional & Office Staff', 'Supervisory and Technical Staff'],
        cavite: ['Production Helper: Process Roles', 'Production Helper: Packaging & Sorting', 'Service & Quality Assurance'],
        laguna: ['Production Helper: Process Roles', 'Production Helper: Packaging & Sorting', 'Technical, Maintenance & Support']
    };

    // Role-to-Education Mapping (Example criteria based on roles)
    const educationRequirements = {
        'Professional & Office Staff': ['College Graduate', 'College Level (at least 2 years)'],
        'Supervisory and Technical Staff': ['Bachelor\'s Degree Holder'],
        'Production Helper: Process Roles': ['High School Graduate', 'ALS Graduate', 'Vocational Course'],
        'Production Helper: Packaging & Sorting': ['High School Graduate', 'ALS Graduate'],
        'Service & Quality Assurance': ['College Level', 'Vocational / Technical Graduate'],
        'Technical, Maintenance & Support': ['Vocational Graduate', 'High School Graduate']
    };

    // Helper to populate positions based on branch
    function updatePositions(branch, preSelectedPos = null) {
        applyPosition.disabled = false;
        applyPosition.innerHTML = '<option value="" disabled selected>Select your target role...</option>';
        
        if (branchPositions[branch]) {
            branchPositions[branch].forEach(pos => {
                const opt = document.createElement('option');
                opt.value = pos;
                opt.innerText = pos;
                if (preSelectedPos && pos === preSelectedPos) opt.selected = true;
                applyPosition.appendChild(opt);
            });
            if (preSelectedPos) applyPosition.dispatchEvent(new Event('change'));
        }
    }

    // 1. Handle Branch Change
    applyBranch.addEventListener('change', function() {
        updatePositions(this.value);
    });

    // 2. Handle Position Change -> Filter Education
    applyPosition.addEventListener('change', function() {
        const position = this.value;
        highestEducation.disabled = false;
        highestEducation.innerHTML = '<option value="" disabled selected>Select highest attainment...</option>';
        
        if (educationRequirements[position]) {
            educationRequirements[position].forEach(edu => {
                const opt = document.createElement('option');
                opt.value = edu;
                opt.innerText = edu;
                highestEducation.appendChild(opt);
            });
        }
    });

    // 3. Handle Education Visibility
    highestEducation.addEventListener('change', function() {
        educationHistory.style.display = 'block';
        const val = this.value;
        collegeHistory.style.display = (val.includes('College') || val.includes('Bachelor')) ? 'block' : 'none';
    });

    // 4. URL Pre-fill Logic (Used when coming from jobs.html)
    function checkUrlParams() {
        const params = new URLSearchParams(window.location.search);
        const branchParam = params.get('branch'); // e.g., 'makati'
        const catParam = params.get('category'); // e.g., 'makati-professional'

        if (branchParam && branchPositions[branchParam]) {
            applyBranch.value = branchParam;
            
            // Map the urlParam slug back to the display category title
            let targetCategory = null;
            if (catParam) {
                if (catParam.includes('professional')) targetCategory = 'Professional & Office Staff';
                else if (catParam.includes('supervisory')) targetCategory = 'Supervisory and Technical Staff';
                else if (catParam.includes('process')) targetCategory = 'Production Helper: Process Roles';
                else if (catParam.includes('packaging')) targetCategory = 'Production Helper: Packaging & Sorting';
                else if (catParam.includes('service')) targetCategory = 'Service & Quality Assurance';
                else if (catParam.includes('technical')) targetCategory = 'Technical, Maintenance & Support';
            }
            
            updatePositions(branchParam, targetCategory);
        }
    }

    checkUrlParams();

    // Form Submission
    document.getElementById('biodataApplicationForm').addEventListener('submit', (e) => {
        e.preventDefault();
        alert("Digital Application Submitted!\n\nPlease check your Email or SMS for your account credentials.");
        window.location.href = "index.html";
    });
});