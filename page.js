document.addEventListener("DOMContentLoaded", function () {
    const yearButtons = document.querySelectorAll(".year-button");
    const semesterButtons = document.querySelectorAll(".semester-button");

    let selectedYear = null;

    // Add event listeners to year buttons
    yearButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            // Remove active class from all year buttons
            yearButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            // Add active class to the clicked year button
            this.classList.add("active");

            // Store the selected year
            selectedYear = this.getAttribute("data-year");

            // Show semester buttons for the selected year
            semesterButtons.forEach(function (semesterBtn) {
                semesterBtn.style.display = "none";
                if (semesterBtn.getAttribute("data-year") === selectedYear) {
                    semesterBtn.style.display = "inline-block";
                }
            });
        });
    });

    // Add event listeners to semester buttons
    semesterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            // Check if a year is selected
            if (!selectedYear) {
                alert("Please choose a year first.");
                return; // Do not proceed if year is not selected
            }

            // Remove active class from all semester buttons
            semesterButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            // Add active class to the clicked semester button
            this.classList.add("active");

            // Determine the semester selected
            const selectedSemester = this.getAttribute("data-semester");

            // Generate the target page URL based on the selection
            const targetURL = `index${selectedYear}-${selectedSemester}.html`;

            // Redirect to the target page
            window.location.href = targetURL;
        });
    });
});
