const r = () => Math.floor(Math.random() * 101);

const distance = (a, b) =>
  a.reduce((acc, x, i) => acc + (x - b[i]) ** 2, 0) ** 0.5;

function findPoint(f) {
  let guess = [0, 0, 0];
  let dist = f(guess);
  if (dist === 0) return guess;
  let candidates = [];
  const limit = Math.min(100, Math.round(dist));
  for (let x = 0; x <= limit; x++) {
    const p = [x, limit, 0];
    while (p[1] >= 0 && p[2] <= limit) {
      const d = distance(p, guess);
      const diff = d - dist;
      if (Math.abs(diff) < 1e-7) candidates.push([...p]);
      if (diff >= 0) p[1]--;
      else p[2]++;
    }
  }
  while (candidates.length > 1) {
    const candidates2 = [];
    guess = candidates[0];
    dist = f(guess);
    if (dist === 0) return guess;
    for (const p of candidates) {
      let d = distance(p, guess);
      let diff = d - dist;
      if (Math.abs(diff) < 1e-7) candidates2.push(p);
    }
    candidates = candidates2;
  }
  return candidates[0];
}

function blackbox() {
  const secret = [r(), r(), r()];
  let guessCount = 0;
  const f = (guess) => {
    guessCount++;
    const dist = distance(secret, guess);

    return dist;
  };
  const report = (result) => {
    console.log(
      "3-task result:",
      JSON.stringify({
        result: {
          random_point: { x: r(), y: r(), z: r() },
          search_points: result,
          calls: guessCount,
        },
      })
    );
  };
  return { f, report };
}

const { f, report } = blackbox();
const result = findPoint(f);
report(result);
