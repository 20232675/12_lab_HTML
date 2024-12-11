const toggle = document.getElementById('toggleDark');
const body = document.querySelector('body');

toggle.addEventListener('click', function () {
    body.classList.toggle('dark-mode');
});


function displayTime() {
    let dateTime = new Date(); // Dabartinė data ir laikas
    let hrs = dateTime.getHours();
    let min = dateTime.getMinutes();
    let sec = dateTime.getSeconds();

    // Pridedame nulį prie valandų, minučių ar sekundžių, jei jos mažesnės nei 10
    if (hrs < 10) hrs = "0" + hrs;
    if (min < 10) min = "0" + min;
    if (sec < 10) sec = "0" + sec;

    // Atnaujiname laikrodžio turinį
    const clock = document.getElementById("clock");
    if (clock) {
        clock.textContent = `${hrs}:${min}:${sec}`;
    }
}

// Nustatome, kad funkcija būtų iškviečiama kas sekundę
setInterval(displayTime, 1000);

// Iškart atnaujiname laikrodžio reikšmę
displayTime();


document.getElementById('submitBtn').addEventListener('click', () => {
    // Paimti įvesties duomenis
    const name = document.getElementById('name').value.trim();
    const surname = document.getElementById('surname').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const features = [
        parseFloat(document.getElementById('feature1').value),
        parseFloat(document.getElementById('feature2').value),
        parseFloat(document.getElementById('feature3').value),
        parseFloat(document.getElementById('feature4').value),
        parseFloat(document.getElementById('feature5').value),
    ];

    // Inicializuoti klaidų elementus
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const addressError = document.getElementById('addressError');
    emailError.textContent = '';
    phoneError.textContent = '';
    addressError.textContent = '';

    let hasError = false;

    // El. pašto patikra
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        emailError.textContent = 'Neteisingas el. pašto formatas. Pvz.: vardas@domenas.lt';
        hasError = true;
    }

    // Telefono numerio patikra
    if (!/^\+?[0-9]{9,15}$/.test(phone)) {
        phoneError.textContent = 'Neteisingas telefono numeris. Pvz.: +37060000000';
        hasError = true;
    }

    // Adreso patikra
    if (address.length < 5) {
        addressError.textContent = 'Adresas turi būti bent 5 simbolių ilgio.';
        hasError = true;
    }

    // Jei yra klaidų, pranešti vartotojui ir sustabdyti vykdymą
    if (hasError) {
        alert('Prašome pataisyti klaidas formoje.');
        return;
    }

    // Apskaičiuoti požymių vidurkį
    const average = features.reduce((sum, val) => sum + val, 0) / features.length;

    // Sukurti objektą su vartotojo duomenimis
    const userData = {
        name,
        surname,
        email,
        phone,
        address,
        features,
        average,
    };

    // Atvaizduoti objekto turinį naršyklės terminale
    console.log(userData);

    // Atvaizduoti rezultatus tinklalapyje
    const output = document.getElementById('output');
    output.innerHTML = `
        <p><strong>Vardas:</strong> ${name}</p>
        <p><strong>Pavardė:</strong> ${surname}</p>
        <p><strong>El. paštas:</strong> ${email}</p>
        <p><strong>Telefonas:</strong> ${phone}</p>
        <p><strong>Adresas:</strong> ${address}</p>
        ${features.map((f, i) => `<p><strong>Požymis ${i + 1}:</strong> ${f}</p>`).join('')}
        <p><strong>Vidurkis:</strong> <span style="color: ${getAverageColor(average)};">${average.toFixed(2)}</span></p>
        <p><strong>Rezultatas:</strong> ${name} ${surname} (${email}): ${average.toFixed(2)}</p>
    `;
});

// Funkcija nustatyti vidurkio spalvą
function getAverageColor(avg) {
    if (avg < 3) return 'green';
    if (avg < 7) return 'white';
    return 'green';
}


