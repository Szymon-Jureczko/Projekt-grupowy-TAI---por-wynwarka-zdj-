let init = ()=> {
	let po;

	po = document.getElementsByClassName('po'); //znalezienie klasy "po" w HTML'u

	for (let i = 0; i < po.length; i++) {
		Porownywarka(po[i]);
	}
}

function Porownywarka(zdj) {
	var zdj, suwak, szer, wys, klikniete = 0;

	szer = zdj.offsetWidth; //pobranie szerokości zdjecia
	wys = zdj.offsetHeight; //pobranie wysokosci zdjecia

	zdj.style.width = (szer/2) + "px"; //ustawienie szerokosci zdjecia na 50%

	suwak = document.createElement('DIV'); //tworzenie Diva
	suwak.setAttribute('class','slider'); //przypisanie mu klasy slider

	zdj.parentElement.insertBefore(suwak, zdj); //wklejenie Diva

	suwak.style.top = (wys / 2) - (suwak.offsetHeight / 2) + "px"; //ustawienie pozycji - wysokosc
	suwak.style.left = (szer / 2) - (suwak.offsetWidth / 2) +"px"; //ustawienie pozycji - szerokosc

	suwak.addEventListener('mousedown',suwakgotowy); //uruchomienie funkcji suwakgotowy gdy bedzie klikniety przycisk myszy
	suwak.addEventListener('mouseup',suwakskonczony); //uruchomienie funkcji suwakskonczony gdy przycisk myszy bedzie odklikniety

	function suwakgotowy(e) {
		e.preventDefault(); //przerywa wszystkie domyślne akcje z wiązane z danym zdarzeniem

		klikniete = 1; //zmiana wartości "klikniete" na 1

	window.addEventListener("mousemove", ruch); //wykonanie funkcji ruch jezeli slider bedzie poruszany
	}

	function suwakskonczony() {
		klikniete = 0; //zmiana wartości "klikniete" na 0
	}

	function ruch(e) {
	var pozycja;

	if(klikniete==0) return false; //jezeli zmienna klikniete jest rowna 0 to wtedy zwaracamy wartosc "false"

	pozycja = pobierzkursor(e); //przypisanie zmiennej "pozycja" funkcji "pobierzkursor" o parametrze "e"

	if(pozycja < 0) pozycja = 0; //jezeli zmienna "pozycja" jest mniejsza od 0 to wtedy ustawiamy jej wartosc na 0
	if(pozycja > szer) pozycja = szer; //jezeli zmienna "pozycja" ma wartosc wieksza niz "szer" to wtedy ustawiamy wartosc "pozycja" rowna zmiennej "szer"

	slide(pozycja); //wywołanie funkcji slide o argumencie "pozycja"
}

	function pobierzkursor(e) {
	var a, x = 0;

	e = e || window.event; //jezeli nie bedzie "e" to stanie się ono "window.event"

	a = zdj.getBoundingClientRect(); //pobranie pozycji poziomej zdjecia 

	x = e.pageX - a.left; //obliczenie położenia kursora wzgledem zdjecia

	x = x - window.pageXOffset; //odjecie od "x" liczby pikseli w osi x

	return x; //zwrocenie wartosci "x"
	}

	function slide(x){
	zdj.style.width = x + "px"; //zmiana szerokosci zdjecia

	suwak.style.left = zdj.offsetWidth - (suwak.offsetWidth / 2) + "px"; //pozycjonowanie suwaka
	}



	}
window.addEventListener('load',init,false); //wykonanie funkcji init po załadowaniu strony