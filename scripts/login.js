document.addEventListener("DOMContentLoaded", () => {
    const roleSelect = document.getElementById('loginRole');
    const branchContainer = document.getElementById('branchContainer');
    const branchSelect = document.getElementById('loginBranch');
    const applicantNoteContainer = document.getElementById('applicantNoteContainer');
    
    const passwordInput = document.getElementById('loginPassword');
    const togglePassword = document.getElementById('togglePassword');

    // 1. UX Feature: Password Visibility Toggle
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            // Toggle the eye icon
            togglePassword.innerHTML = type === 'password' ? '<i class="fa-regular fa-eye"></i>' : '<i class="fa-regular fa-eye-slash"></i>';
        });
    }

    // 2. Conditional Logic: Role Selection
    if (roleSelect) {
        roleSelect.addEventListener('change', (e) => {
            const role = e.target.value;

            // Reset requirement on branch so HTML5 validation doesn't block hidden fields
            branchSelect.required = false;

            if (role === 'superadmin') {
                // Hide Branch, Hide Note
                branchContainer.classList.remove('show');
                applicantNoteContainer.classList.remove('show');
                branchSelect.value = ''; // Clear visual selection
            } else if (role === 'applicant') {
                // Show Branch, Show Note
                branchContainer.classList.add('show');
                applicantNoteContainer.classList.add('show');
                branchSelect.required = true;
            } else if (role === 'admin' || role === 'employee') {
                // Show Branch, Hide Note
                branchContainer.classList.add('show');
                applicantNoteContainer.classList.remove('show');
                branchSelect.required = true;
            }
        });
    }

    // 3. Form Submission Handling
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const role = roleSelect.value;
            let branch = branchSelect.value;
            const username = document.getElementById('loginUsername').value;

            // Enforce Superadmin logic strictly on submit
            if (role === 'superadmin') {
                branch = 'makati'; // Implicitly Makati
            }

            console.log(`Authenticating... User: ${username} | Role: ${role} | Branch: ${branch}`);
            
            // Temporary routing alert for testing
            alert(`Authentication Request\nRole: ${role.toUpperCase()}\nBranch: ${branch.toUpperCase()}`);
            
            // Implement your window.location.href routing here
        });
    }
});