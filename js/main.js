let currentIdx = 0;
let totalScore = 0;
const totalStandard = 15;

function startTest() {
    const mainSec = document.getElementById('main');
    const qnaSec = document.getElementById('qna');
    
    if (mainSec && qnaSec) {
        mainSec.style.display = 'none';
        qnaSec.style.display = 'block';
        showQuestion();
    }
}

function showQuestion() {
    const q = qnaList[currentIdx];
    const qText = document.getElementById('q-text');
    const answerBox = document.querySelector('.answer-box');
    const progressBar = document.querySelector('.progress-bar');

    if (!qText || !answerBox) return;

    qText.innerText = q.q;
    answerBox.innerHTML = ''; 

    q.a.forEach((ans) => {
        const btn = document.createElement('button');
        btn.className = 'btn answer-btn';
        btn.innerText = ans.text;
        
        btn.onclick = () => {
            totalScore += ans.score;

            if (currentIdx === 14) {
                if (ans.text !== q.a[0].text) {
                    showResult(); 
                    return;
                }
            }
            next();
        };
        answerBox.appendChild(btn);
    });

    const progress = Math.min((currentIdx + 1) / totalStandard * 100, 100);
    if (progressBar) progressBar.style.width = progress + '%';
}

function next() {
    if (currentIdx < qnaList.length - 1) {
        currentIdx++;
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    const qnaSec = document.getElementById('qna');
    const resultSec = document.getElementById('result');
    
    if (qnaSec && resultSec) {
        qnaSec.style.display = 'none';
        resultSec.style.display = 'block';
    }

    const finalResult = resultList.find(r => totalScore >= r.threshold) 
                        || resultList[resultList.length - 1];

    const resultper = document.getElementById('result-per');
    const resultName = document.getElementById('result-name');
    const resultDesc = document.getElementById('result-desc');
    const resultImg = document.getElementById('result-img');

    if (resultper) resultper.innerText = finalResult.per + " %";
    if (resultName) resultName.innerText = finalResult.name;
    if (resultDesc) resultDesc.innerText = finalResult.desc;
    if (resultImg && finalResult.img) {
        resultImg.src = `img/${finalResult.img}`;
        resultImg.alt = finalResult.name;
    }
}

function showAllResults() {
    document.getElementById('main').style.display = 'none';
    document.getElementById('qna').style.display = 'none';
    document.getElementById('result').style.display = 'none';
    document.getElementById('all-results').style.display = 'block';

    const listContainer = document.getElementById('all-results-list');
    listContainer.innerHTML = '';

    resultList.forEach((data) => {
        const card = document.createElement('div');
        card.className = 'result-card';
        card.innerHTML = `
            <div class="card-inner">
                <img src="img/${data.img}" alt="${data.name}" class="card-img">
                <div class="card-content">
                    <span class="card-per">${data.per}%</span>
                    <strong class="card-name">${data.name}</strong>
                    <p class="card-desc">${data.desc}</p>
                </div>
            </div>
            <div class="line">· 🪫 · ✧ · ⚡ · ✧ · 🔋 ·</div>
        `;
        listContainer.appendChild(card);
    });
    window.scrollTo(0, 0);
}