
tldr: po pobraniu terminal wpisz "npm install", jak się pobierze to wpisz "npm run start"
I jesteś gotowy do klepania kodu. Na sttronę wchodzisz wpisując "localhost:3000" albo "localhost:3000/register" itd. do url

Rzeby to wszystko działało to trzeba mieć node.js oczywiście i opócz tego trzeba pobrać kilka paczek rzeby dizłały różne funkcje
więc według mojej wiedy jak puści się komendę "npm install" (do terminala w VSC)  i wszysko powinno się pobrać
Wtedy jak chcesz zobaczyć projekt na żywo to wpisujesz w terminal "npm run start" (to odświerza ci rerwer po każdej zmianie, jak masz jakiś błąd w kodzie to wyświetli że jest crash)
Jak to już śmiga to wpisujesz w url "localhost:3000"  i ewentualnie /login  /register bo to istnieje

Update: Rejestracja i Logowanie działa już przez Sequelize, jeszcze nie jest "refined" ale nie ma już żadnego czystego SQL.
  Teraz trzeba się przypatrzeć serialaze i deserialize bo nie rozumiem tego, wyświeetlaniu z js na stronę i poprawićblokadę przy rejestracji bo coś tam się strona wiesza
