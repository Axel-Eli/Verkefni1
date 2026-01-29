//rétt og rangt tracker
let correct = 0;
let wrong = 0;
//uppfærir stöðuna eftir að er ýtt á rangt eða rétt
function updateScore() {
  let score = document.querySelector("#score");

  if (!score) {
    score = document.createElement("p");

    score.id = "score";
    document.body.prepend(score);
  }

  score.textContent = `Rétt: ${correct} | Rangt: ${wrong}`;
}
//felum svarið til að byrja með svo þegar ýtt er á "sýna svar" þá birtist það með tökkunum rétt og rangt
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
    const actionButtons = question.querySelectorAll(".actions button");
    actionButtons.forEach((btn) => {
      btn.disabled = true;
      btn.classList.toggle("choice-selected", btn === target);
      btn.classList.toggle("choice-dim", btn !== target);
    });
  } else if (target.hasAttribute("data-wrong")) {
    wrong++;
    updateScore();

    const question = target.closest(".question");
    const actionButtons = question.querySelectorAll(".actions button");
    actionButtons.forEach((btn) => {
      btn.disabled = true;
      btn.classList.toggle("choice-selected", btn === target);
      btn.classList.toggle("choice-dim", btn !== target);
    });
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
