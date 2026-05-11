document.addEventListener("DOMContentLoaded", () => {
    // --- Homepage Branch Buttons ---
    const branchButtons = document.querySelectorAll('.btn-branch');

    branchButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Keep the existing href behavior, but also support consistent behavior
            // when buttons are used without proper query parameters.
            // (If href already contains ?branch=, allow default.)
            const href = button.getAttribute('href') || '';
            if (href.includes('?branch=')) return;

            e.preventDefault();
            const branchName = button.closest('.branch-card')?.querySelector('h3')?.innerText?.toLowerCase();
            if (!branchName) return;
            window.location.href = `jobs.html?branch=${branchName}`;
        });
    });
});

