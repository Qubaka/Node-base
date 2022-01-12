Nie umiem pushować więc poprostu to to dropnołem

tldr: po pobraniu terminal wpisz "npm install", jak się pobierze to wpisz "npm run start"
I jesteś gotowy do klepania kodu. Na sttronę wchodzisz wpisując "localhost:3000" albo "localhost:3000/register" itd. do url

Rzeby to wszystko działało to trzeba mieć node.js oczywiście i opócz tego trzeba pobrać kilka paczek rzeby dizłały różne funkcje
więc według mojej wiedy jak puści się komendę "npm install" (do terminala w VSC)  i wszysko powinno się pobrać
Wtedy jak chcesz zobaczyć projekt na żywo to wpisujesz w terminal "npm run start" (to odświerza ci rerwer po każdej zmianie, jak masz jakiś błąd w kodzie to wyświetli że jest crash)
Jak to już śmiga to wpisujesz w url "localhost:3000"  i ewentualnie /login  /register bo to istnieje
Jak narazie działa tylko dodawanie do bazy danych nie loogowanie i dizała tylko na lokalnym mySQL więc to treba będzie rozbudowac ale jest już podstawa

Jak coś nie działa to pisać, możliwe że będę wiedział co zrobi, W plikach są komentarze które delkatnie tłumaczą co jest czym, mam nadzieje że pomocne

Update: Logowanie jest prawie na miejscu ale trzeba rozwiązać mały problem z bcrypt'em bo jednak za każdym razem zwraca inny hash nawet przy tym samym inpucie.
