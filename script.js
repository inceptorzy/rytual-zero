document.addEventListener('DOMContentLoaded', () => {
    const scenes = {
        scene1: document.getElementById('scene1'),
        scene2: document.getElementById('scene2'),
        scene3: document.getElementById('scene3'),
        scene4: document.getElementById('scene4')
    };
    const birthdateInput = document.getElementById('birthdate-input');
    const submitButton = document.getElementById('submit-button');
    const wastedBeatsEl = document.getElementById('wasted-beats');
    const remainingBeatsEl = document.getElementById('remaining-beats');
    const redirectButton = document.getElementById('redirect-button');

    let remainingBeatsInterval;

    function switchScene(nextScene) {
        Object.values(scenes).forEach(scene => {
            scene.classList.remove('active');
            scene.style.opacity = 0;
        });
        nextScene.classList.add('active');
        setTimeout(() => {
            nextScene.style.opacity = 1;
        }, 50);
    }

    // Start Rytuału
    scenes.scene1.style.opacity = 1;
    setTimeout(() => {
        scenes.scene1.style.opacity = 0;
        setTimeout(() => switchScene(scenes.scene2), 1500);
    }, 4000);

    submitButton.addEventListener('click', () => {
        const inputVal = birthdateInput.value.trim();
        const parts = inputVal.match(/(\d{2})[ ./-](\d{2})[ ./-](\d{4})/);
        if (!parts) {
            alert("Proszę wprowadzić datę w formacie DD.MM.RRRR");
            return;
        }

        const day = parseInt(parts[1], 10);
        const month = parseInt(parts[2], 10) - 1;
        const year = parseInt(parts[3], 10);
        const birthDate = new Date(year, month, day);
        const now = new Date();

        if (isNaN(birthDate.getTime()) || birthDate > now || year < 1900) {
            alert("Wprowadzono nieprawidłową datę.");
            return;
        }

        const avgHeartbeatsPerDay = 100000;
        const avgLifeExpectancyYears = 80;

        const daysLived = (now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24);
        const wastedBeats = Math.floor(daysLived * avgHeartbeatsPerDay);

        const totalLifeBeats = avgLifeExpectancyYears * 365.25 * avgHeartbeatsPerDay;
        let remainingBeats = Math.floor(totalLifeBeats - wastedBeats);

        wastedBeatsEl.textContent = wastedBeats.toLocaleString('pl-PL');
        remainingBeatsEl.textContent = remainingBeats.toLocaleString('pl-PL');
        
        switchScene(scenes.scene3);

        clearInterval(remainingBeatsInterval);
        remainingBeatsInterval = setInterval(() => {
            remainingBeats -= Math.floor(Math.random() * 3) + 1; // Dla dramatyzmu
            remainingBeatsEl.textContent = remainingBeats.toLocaleString('pl-PL');
        }, 1000);

        setTimeout(() => {
            switchScene(scenes.scene4);
        }, 8000); // Zwiększony czas na kontemplację
    });

    redirectButton.addEventListener('click', () => {
        window.location.href = "https://inceptorzy.pl"; 
    });
});