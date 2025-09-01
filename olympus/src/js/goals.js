const goalsContainer = document.getElementById("savedGoalsContainer");
const token = localStorage.getItem("token");

async function loadGoals() {
  try {
    const res = await fetch("http://localhost:4000/api/goals", {
      headers: { "Authorization": `Bearer ${token}` }
    });

    if (!res.ok) throw new Error("Failed to fetch goals");

    const goals = await res.json();
    goalsContainer.innerHTML = ""; // Limpiar contenedor

    goals.forEach(goal => {
      const progressPercent = goal.target_distance
        ? Math.min((goal.progress / goal.target_distance) * 100, 100)
        : goal.progress_percentage || 0;

      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <h3>${goal.title} (${goal.goal_type_name})</h3>
        <p>${goal.description || ""}</p>

        ${goal.target_distance ? `<p class="progress">Progress: ${goal.progress || 0} / ${goal.target_distance} km</p>` : ""}
        ${goal.target_duration ? `<p class="progress">Progress: ${goal.progress_time || 0} / ${goal.target_duration} min</p>` : ""}
        ${goal.target_date ? `<p class="progress">Due: ${new Date(goal.target_date).toLocaleDateString()}</p>` : ""}

        <div class="barra">
          <div class="relleno" style="width:${progressPercent}%"></div>
        </div>

        ${goal.target_distance ? `<p class="remaining">Remaining: ${goal.target_distance - (goal.progress || 0)} km</p>` : ""}
        ${goal.target_duration ? `<p class="remaining">Remaining: ${goal.target_duration - (goal.progress_time || 0)} min</p>` : ""}
        ${goal.motivation ? `<p class="motivacion">${goal.motivation}</p>` : ""}
      `;

      goalsContainer.appendChild(card);
    });
  } catch (error) {
    console.error(error);
    goalsContainer.innerHTML = "<p>Error loading goals.</p>";
  }
}

loadGoals();
