const username = "sanxxit"; // Change to your GitHub username

async function fetchGitHubContributions() {
    try {
        const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=2024`);
        if (!response.ok) {
            throw new Error("Failed to fetch contributions");
        }
        const data = await response.json();
        const contributions = data.contributions;

        const graphContainer = document.getElementById("contributions-graph");
        graphContainer.innerHTML = ""; // Clear previous content

        contributions.slice(-365).forEach(day => {
            const box = document.createElement("div");
            box.className = "contribution-box";
            box.dataset.level = day.intensity; // Store intensity for debugging
            box.style.backgroundColor = getContributionColor(day.intensity);
            graphContainer.appendChild(box);
        });
    } catch (error) {
        console.error("Error fetching contributions:", error);
        document.getElementById("contributions-graph").innerHTML = "<p>Failed to load contributions.</p>";
    }
}

// Color function based on intensity
function getContributionColor(intensity) {
    if (intensity === 0) return "#161b22"; // No contribution (GitHub dark mode background)
    if (intensity === 1) return "#0e4429"; // Low
    if (intensity === 2) return "#006d32"; // Medium
    if (intensity === 3) return "#26a641"; // High
    return "#39d353"; // Very high
}

fetchGitHubContributions();
