window.addEventListener("load", function () {
  const _profile_1 = document.getElementById("profile-1");
  const _profile_2 = document.getElementById("profile-2");
  const _gamer_1 = document.getElementById("gamer-1");
  const _gamer_2 = document.getElementById("gamer-2");
  const _score_1 = document.getElementById("score-1");
  const _score_2 = document.getElementById("score-2");
  const _timer = document.getElementById("timer");

  const _home = document.getElementById("home");
  const _off = document.getElementById("off");
  const _rating = document.getElementById("rating");

  _home.addEventListener("click", function () {
    console.log("Home");
  });
  _off.addEventListener("click", function () {
    const msg =
      "Bütün informasiyalarınız sıfırlanacaq\nProseduru davam etdirmək isteyirsinizmi ?";
    if (confirm(msg)) {
      localStorage.clear();
      window.location.reload();
    }
  });
  _rating.addEventListener("click", function () {
    console.log("Rating");
  });

  if (!localStorage.getItem("gamer_1")) {
    localStorage.setItem("gamer_1", prompt("1-ci oyuncunun adini yazin"));
  }
  if (!localStorage.getItem("gamer_2")) {
    localStorage.setItem("gamer_2", prompt("2-ci oyuncunun adini yazin"));
  }

  if (!localStorage.getItem("score_1")) {
    localStorage.setItem("score_1", 0);
  }
  if (!localStorage.getItem("score_2")) {
    localStorage.setItem("score_2", 0);
  }

  _gamer_1.innerText = localStorage.getItem("gamer_1");
  _gamer_2.innerText = localStorage.getItem("gamer_2");

  _score_1.innerText = parseInt(localStorage.getItem("score_1"));
  _score_2.innerText = parseInt(localStorage.getItem("score_2"));

  const _box = document.querySelectorAll(".box");

  let nums = shuffleArray([..._box].map((v, i) => i + 1));

  let gameStatus = true;
  let run = true;
  let gamer = true;
  let startPoint = 1;
  const max = Math.max(...nums);
  const time = 2000;
  const addTimer = (max * time) / 1000;
  const T = 10 + addTimer;

  let interval = null;

  _timer.innerText = T;
  activeProfile(gamer);
  startTimer();

  _box.forEach(function (b, i) {
    b.innerHTML = `<p>${nums[i]}</p>`;
    b.addEventListener("click", function () {
      if (run) {
        run = false;
        if (gameStatus) {
          b.classList.add("open");
          setTimeout(function () {
            const openNumber = Number(b.innerText);
            if (openNumber < startPoint) {
              const msg = "Zəhmət olmazsa bağlı olan dama seçin !";
              alert(msg);
            } else {
              if (openNumber === startPoint) {
                correct();
              } else {
                wrong();
              }
            }
            run = true;
          }, time);
        } else {
          const msg = "Oyun bitib\nYeniden oynamaq isteyirsinizmi ?";
          if (confirm(msg)) {
            window.location.reload();
          } else {
            run = true;
          }
        }
      }
    });
  });

  function startTimer() {
    interval = setInterval(function () {
      if (gameStatus) {
        let t = parseInt(_timer.innerText);
        if (t > 0) {
          t--;
          _timer.innerText = t;
        } else {
          wrong();
        }
      } else {
        clearInterval(interval);
      }
    }, 1000);
  }
  function correct() {
    startPoint++;
    if (startPoint > max) {
      gameEnd();
    }
  }
  function wrong() {
    _box.forEach((b) => b.classList.remove("open"));
    gamer = !gamer;
    startPoint = 1;
    activeProfile(gamer);
    _timer.innerText = T;
  }
  function activeProfile(gamer) {
    if (gamer) {
      _profile_2.classList.remove("active");
      _profile_1.classList.add("active");
    } else {
      _profile_1.classList.remove("active");
      _profile_2.classList.add("active");
    }
  }
  function gameEnd() {
    gameStatus = false;
    succesNumber(gamer);
    const msg = "Oyun bitdi";
    alert(msg);
  }
  function succesNumber(gamer) {
    if (gamer) {
      const score = Number(localStorage.score_1);
      localStorage.setItem("score_1", score + 1);
      _score_1.innerText = localStorage.getItem("score_1");
    } else {
      const score = Number(localStorage.score_2);
      localStorage.setItem("score_2", score + 1);
      _score_2.innerText = localStorage.getItem("score_2");
    }
  }
});
function randomNums(count = 9, end = 9, start = 1) {
  const temp = [];
  let n = null;
  do {
    n = start + Math.floor(Math.random() * (end - start));
    if (!temp.includes(n)) temp.push(n);
    console.log(n);
  } while (temp.length < count);
  return temp;
}
function shuffleArray(array = []) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
