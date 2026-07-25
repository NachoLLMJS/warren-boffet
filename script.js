const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

const toast = $('#toast');
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.remove('show');
  void toast.offsetWidth;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

function rainMoney(count = 35) {
  const stage = $('#moneyRain');
  const symbols = ['💵', '💚', '📈', '🍌', '💎', '🟢'];
  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.className = 'money';
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.left = `${Math.random() * 100}%`;
    el.style.setProperty('--duration', `${1.9 + Math.random() * 2.2}s`);
    el.style.setProperty('--drift', `${-120 + Math.random() * 240}px`);
    el.style.animationDelay = `${Math.random() * .5}s`;
    stage.appendChild(el);
    el.addEventListener('animationend', () => el.remove());
  }
}

$('#compoundBtn').addEventListener('click', () => {
  rainMoney(45);
  showToast('COMPOUNDING VIBES AT 420% APY*');
  document.body.classList.add('shake');
  setTimeout(() => document.body.classList.remove('shake'), 550);
});

$('#panicBtn').addEventListener('click', () => {
  showToast('PANIC REJECTED. HORIZON EXTENDED TO 2126.');
  $('#panicBtn').textContent = 'HOLD ✓';
  setTimeout(() => { $('#panicBtn').innerHTML = 'PANIC <span>↗</span>'; }, 1800);
});

$('#copyCaBtn').addEventListener('click', async () => {
  const address = $('#contractAddress').textContent;
  try {
    await navigator.clipboard.writeText(address);
    $('#copyCaBtn').textContent = 'COPIED ✓';
    showToast('CONTRACT ADDRESS COPIED');
    setTimeout(() => { $('#copyCaBtn').textContent = 'COPY'; }, 1800);
  } catch {
    showToast('COPY FAILED — SELECT THE CA MANUALLY');
  }
});

const quotes = [
  'Price is what you pay.<br><span>Meme is what you get.</span>',
  'Be greedy when others<br><span>close the browser.</span>',
  'Our favorite holding period is<br><span>until Wi-Fi returns.</span>',
  'Never invest in a business<br><span>you cannot meme.</span>',
  'Risk comes from<br><span>checking the chart sober.</span>'
];
let quoteIndex = 0;
$('#newQuoteBtn').addEventListener('click', () => {
  quoteIndex = (quoteIndex + 1) % quotes.length;
  const q = $('#quoteText');
  q.innerHTML = quotes[quoteIndex];
  q.classList.remove('pop');
  void q.offsetWidth;
  q.classList.add('pop');
});

const oracleAnswers = [
  'IF YOU NEED TO CHECK THE CHART EVERY 4 MINUTES, YOU DO NOT OWN THE STOCK. THE STOCK OWNS YOU.',
  'THE DIP IS JUST THE MARKET PUTTING YOUR CONVICTION ON SALE.',
  'CLOSE THE APP. OPEN A BOOK. REOPEN THE APP IN 2046.',
  'A RED CANDLE IS A GREEN CANDLE WITH A CHARACTER ARC.',
  'YOUR FIRST MISTAKE WAS EXPECTING THE LINE TO RESPECT YOUR FEELINGS.',
  'DIVERSIFY: OWN SEVERAL DIFFERENT SHADES OF GREEN.',
  'THE ORACLE HAS REVIEWED YOUR PORTFOLIO AND RECOMMENDS A NAP.'
];

function askOracle() {
  const input = $('#oracleInput');
  const response = $('#oracleResponse');
  if (!input.value.trim()) {
    showToast('THE ORACLE REQUIRES AT LEAST ONE BAD DECISION.');
    input.focus();
    return;
  }
  response.textContent = '> CALCULATING THE INTRINSIC VALUE OF YOUR EMOTIONS...';
  setTimeout(() => {
    const answer = oracleAnswers[Math.floor(Math.random() * oracleAnswers.length)];
    response.textContent = `> ADVICE: ${answer}`;
    response.classList.remove('pop');
    void response.offsetWidth;
    response.classList.add('pop');
  }, 650);
}
$('#askBtn').addEventListener('click', askOracle);
$('#oracleInput').addEventListener('keydown', e => { if (e.key === 'Enter') askOracle(); });

$('#finalBtn').addEventListener('click', () => {
  rainMoney(70);
  showToast('SHAREHOLDER VALUE: +1 MEME');
  $('#finalBtn').textContent = 'VALUE SUCCESSFULLY CREATED ✓';
});

$$('.tilt').forEach(card => {
  card.addEventListener('pointermove', e => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    card.style.transform = `perspective(900px) rotateX(${-y * 3}deg) rotateY(${x * 3}deg) translateY(-3px)`;
  });
  card.addEventListener('pointerleave', () => card.style.transform = '');
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.animate([
        { opacity: 0, transform: 'translateY(25px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], { duration: 600, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'both' });
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12 });
$$('.manifesto-grid, .section-head, .meme-card, .quote-card, .terminal-copy, .terminal').forEach(el => observer.observe(el));
