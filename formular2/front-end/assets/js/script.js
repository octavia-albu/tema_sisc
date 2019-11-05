$(document).ready(function () {
	$('select').material_select();
});

const campuri = {
	nume: "Nume",
	prenume: "Prenume",
	telefon: "Telefon",
	email: "Email",
	facebook: "Link Facebook",
	abonament: "Tip abonament",
	nrCard: "Numar Card",
    cvv: "CVV",
    varsta: "Varsta",
    cnp: "CNP"
}


document.querySelector('#regbutton').addEventListener("click", (e) => {
	e.preventDefault();
	toastr.remove()
	const abonament = {
		nume: document.querySelector('#nume').value,
		prenume: document.querySelector('#prenume').value,
		telefon: document.querySelector('#telefon').value,
		email: document.querySelector('#email').value,
		facebook: document.querySelector('#facebook').value,
		abonament: document.querySelector('#abonament').value,
		nrCard: document.querySelector('#nrCard').value,
        cvv: document.querySelector("#cvv").value,
        varsta: document.querySelector("#varsta").value,
        cnp: document.querySelector("#cnp").value,
        sex: ""
	}
	var ok = true, key;
	for (key in abonament) {
		if (abonament[key].length == 0 && key !="sex") {
			alert("Campul " + campuri[key] + " nu poate sa fie gol!");
            ok = false;
            break;
        }
        if ((key == "nume" || key == "prenume") && (abonament[key].length < 3 || abonament[key].length > 20)) {
            alert("Campul " + campuri[key] + " nu are lungimea corespunzatoare!");
            ok = false;
            break;
        }
        if ((key == "nume" || key == "prenume") && !abonament[key].match("^[A-Za-z]+$")) {
            alert("Campul " + campuri[key] + " trebuie sa contina doar litere!");
            ok = false;
            break;
        }
        if (key == "telefon" && (abonament[key].length != 10 || !abonament[key].match("^[0-9]+$"))) {
            alert("Campul " + campuri[key] + " trebuie sa contina 10 cifre!");
            ok = false;
            break;
        }
        if (key == "email" && !abonament[key].match(".+\@.+\..+")) {
            alert("Campul " + campuri[key] + " trebuie sa contina o adresa de mail valida!");
            ok = false;
            break;
        }
        if (key == "facebook" && !abonament[key].match("(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/?")) {
            alert("Campul " + campuri[key] + " trebuie sa contina un link de Facebook valid!");
            ok = false;
            break;
        }
        if (key == "nrCard" && (abonament[key].length != 16 || !abonament[key].match("^[0-9]+$"))) {
            alert("Campul " + campuri[key] + " trebuie sa contina 16 cifre!");
            ok = false;
            break;
        }
        if (key == "cvv" && (abonament[key].length != 3 || !abonament[key].match("^[0-9]+$"))) {
            alert("Campul " + campuri[key] + " trebuie sa contina 3 cifre!");
            ok = false;
            break;
        }
        if (key == "varsta" && (abonament[key].length < 1 || abonament[key].length > 3 || !abonament[key].match("^[0-9]+$"))) {
            alert("Campul " + campuri[key] + " trebuie sa contina intre 1 si 3 cifre!");
            ok = false;
            break;
        }
        if (key == "cnp" && (abonament[key].length != 13 || !abonament[key].match("^[0-9]+$"))) {
            alert("Campul " + campuri[key] + " trebuie sa contina 13 cifre!");
            ok = false;
            break;
        }
        var an = abonament["cnp"].substring(1,3);
        var currentDate = new Date();
        var twoDigitsYear = currentDate.getFullYear().toString().substring(1, 3);
        var luna = parseInt(abonament["cnp"].substring(3,5));
        if ( luna > 12) {
            alert("CNP invalid!");
            ok = false;
            break;
        }
        var zi = parseInt(abonament["cnp"].substring(5,7));
        if (zi > 31) {
            alert("CNP invalid!");
            ok = false;
            break;

        }
        var fullAn = "";
        if (an.toString() > twoDigitsYear.toString()) {
             fullAn = "19"  + (an.toString());
        } else {
             fullAn = "20" + (an.toString());
        }
        fullAn = parseInt(fullAn);
        var ziDeNastere = new Date(fullAn, luna, zi);
        var difVarsta = "";
        function calculVarsta(ziNastere) { 
            difVarsta = Date.now() - ziNastere.getTime();
            var ageDate = new Date(difVarsta); 
            var ageCompare = Math.abs(ageDate.getUTCFullYear() - 1970);
            if (parseInt(ageCompare) != parseInt(document.querySelector("#varsta").value)) {
                alert("Varsta si CNP-ul nu corespund!");
                ok = false;
                return;
            }
        } 
        if (key == "cnp") {
            calculVarsta(ziDeNastere);
        }

        
    }

    function gender(cnp) {
        if ((cnp.substring(0, 1) % 2) == 0) {
            return "F";
        } else {
            return "M";
        }
    }

    abonament.sex = gender(abonament["cnp"]);

	if (ok) {
		axios.post('/abonament', abonament).then((response) => {
			toastr.success("Abonament achizitionat!");
		}).catch((error) => {
			
				toastr.error(error)
		})
	}
}, false);