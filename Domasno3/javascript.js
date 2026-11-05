var vozaci = [
    {
        ime: "Max Verstappen",
        tim: "Red Bull",
        brzina: 338,
        vestina: 94,
        gumi: "Soft",
        vreme: 0,
        krug: 0,
        pitStop: false,
        pitKrug: 4,
        status: "Spremen"
    },

    {
        ime: "Lewis Hamilton",
        tim: "Ferrari",
        brzina: 345,
        vestina: 98,
        gumi: "Hard",
        vreme: 0,
        krug: 0,
        pitStop: false,
        pitKrug: 5,
        status: "Spremen"
    },

    {
        ime: "Charles Leclerc",
        tim: "Ferrari",
        brzina: 344,
        vestina: 96,
        gumi: "Soft",
        vreme: 0,
        krug: 0,
        pitStop: false,
        pitKrug: 3,
        status: "Spremen"
    },

    {
        ime: "Lando Norris",
        tim: "McLaren",
        brzina: 329,
        vestina: 87,
        gumi: "Hard",
        vreme: 0,
        krug: 0,
        pitStop: false,
        pitKrug: 6,
        status: "Spremen"
    },

    {
        ime: "Oscar Piastri",
        tim: "McLaren",
        brzina: 333,
        vestina: 91,
        gumi: "Soft",
        vreme: 0,
        krug: 0,
        pitStop: false,
        pitKrug: 4,
        status: "Spremen"
    },

    {
        ime: "George Russell",
        tim: "Mercedes",
        brzina: 340,
        vestina: 90,
        gumi: "Hard",
        vreme: 0,
        krug: 0,
        pitStop: false,
        pitKrug: 5,
        status: "Spremen"
    },

    {
        ime: "Fernando Alonso",
        tim: "Aston Martin",
        brzina: 331,
        vestina: 92,
        gumi: "Soft",
        vreme: 0,
        krug: 0,
        pitStop: false,
        pitKrug: 7,
        status: "Spremen"
    },

    {
        ime: "Kimi Antonelli",
        tim: "Mercedes",
        brzina: 345,
        vestina: 94,
        gumi: "Hard",
        vreme: 0,
        krug: 0,
        pitStop: false,
        pitKrug: 3,
        status: "Spremen"
    },

    {
        ime: "Isack Hadjar",
        tim: "Red Bull",
        brzina: 331,
        vestina: 89,
        gumi: "Soft",
        vreme: 0,
        krug: 0,
        pitStop: false,
        pitKrug: 6,
        status: "Spremen"
    },

    {
        ime: "Lance Stroll",
        tim: "Aston Martin",
        brzina: 351,
        vestina: 99,
        gumi: "Hard",
        vreme: 0,
        krug: 0,
        pitStop: false,
        pitKrug: 5,
        status: "Spremen"
    }
];

var segakrug = 0;

var trkapocnata = false;

var safetycar = false;

var start = document.getElementById("start");

var krug = document.getElementById("krug");

var status = document.getElementById("status");

var safetycar = document.getElementById("safetycar");

var tabela = document.getElementById("tabela");

var pobednik = document.getElementById("pobednik");

function prikaziTabela() {

    tabela.innerHTML = "";

    var sortiraniVozaci = [...vozaci];

    sortiraniVozaci.sort(function(a, b) {
        return a.vreme - b.vreme;
    });

    for (var i = 0; i < sortiraniVozaci.length; i++) {

        var vozac = sortiraniVozaci[i];

        var red = document.createElement("tr");

        red.innerHTML = `
            <td>${i+1}</td>
            <td>${vozac.ime}</td>
            <td>${vozac.tim}</td>
            <td>${vozac.brzina}</td>
            <td>${vozac.vestina}</td>
            <td>${vozac.gumi}</td>
            <td>${vozac.krug}</td>
            <td>${vozac.vreme.toFixed(3)} s</td>
            <td>${vozac.status}</td>
        `;
        tabela.appendChild(red);
    }
}

function bazicnoVreme(vozac) {

    var vreme = 100 - (vozac.brzina - 300) * 0.3;
    vreme = vreme - vozac.vestina * 0.05;

    return vreme;
}

function vremeSoGumi(vozac) {

    if (vozac.gumi == "Soft") {
        return -2;
    }

    else {
        return 1;
    }
}

function pitStop(vozac) {

    vozac.pitStop = true;
    vozac.vreme = vozac.vreme + 22;

    if (vozac.gumi == "Soft") {
        vozac.gumi = "Hard";
    }

    else {
        vozac.gumi = "Soft";
    }
    vozac.status = "Pit-stop";
}

function izletuvanje(vozac) {

    vozac.vreme = vozac.vreme + 10;
    vozac.status = "Izletuvanje";
}

function odigrajKrug() {

    segakrug++;
    krug.innerHTML = segakrug;

    status.innerHTML = "Trkata";

    safetycar = Math.random() < 0.15;

    if (safetycar == true) {
        safetycar.innerHTML = "ON";
    }

    else {
        safetycar.innerHTML = "OFF";
    }

    for (var i = 0; i < vozaci.length; i++) {

        var vozac = vozaci[i];
        vozac.status = "Vo trka";

        var vremeKrug = bazicnoVreme(vozac);
        vremeKrug = vremeKrug + vremeSoGumi(vozac);

        if (safetycar == true) {
            vremeKrug = vremeKrug + 4;
            vozac.status = "Safety Car";
        }

        if (vozac.pitStop == false &&
            segakrug == vozac.pitKrug) {
            pitStop(vozac);
        }

        var slucajno = Math.random();

        if (slucajno < 0.08) {
            izletuvanje(vozac);
        }

        vozac.vreme = vozac.vreme + vremeKrug;
        vozac.krug = segakrug;
    }

    prikaziTabela();

    if (segakrug == 10) {
        zavrsiTrka();
    }

    else {
        setTimeout(odigrajKrug, 1000);
    }
}

function zavrsiTrka() {

    status.innerHTML = "Zavrsena";
    start.disabled = true;
    vozaci.sort(function(a, b) {
        return a.vreme - b.vreme;
    });

    var prvVozac = vozaci[0];

    pobednik.innerHTML =
        prvVozac.ime + " - " + prvVozac.tim;

    prikaziTabela();
}
start.addEventListener("click", function() {

    if (trkapocnata == false) {

        trkapocnata = true;

        start.innerHTML = "Трката е во тек";

        odigrajKrug();
    }

});

prikaziTabela();
