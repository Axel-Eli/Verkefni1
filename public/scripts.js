let correct = 0;
let wrong = 0;

function updateScore() {
  let score = document.querySelector("#score");

  if (!score) {
    score = document.createElement("p");

    score.id = "score";
    document.body.prepend(score);
  }

  score.textContent = `Rétt: ${correct} | Rangt: ${wrong}`;
}

document.addEventListener("click", (event) => {
  const target = event.target;

  if (target.classList.contains("show-answer")) {
    const question = target.closest(".question");
    const svar = question.querySelector(".answer");
    svar.classList.remove("hidden");
    target.disabled = true;
  }

  if (target.hasAttribute("data-correct")) {
    correct++;
    updateScore();

    const question = target.closest(".question");
    question.querySelectorAll("button").forEach((btn) => (btn.disabled = true));
  } else if (target.hasAttribute("data-wrong")) {
    wrong++;
    updateScore();

    const question = target.closest(".question");
    question.querySelectorAll("button").forEach((btn) => (btn.disabled = true));
  }
});

document.querySelectorAll("[data-filter]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;

    document.querySelectorAll(".question").forEach((q) => {
      q.hidden = filter !== "all" && q.dataset.subcategory !== filter;
    });
  });
});
