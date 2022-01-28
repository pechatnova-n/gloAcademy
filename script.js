let title, screens, screenPrice, rollback, fullPrice, adaptive;

alert("Alert из lesson 1");
console.log("Сообщение из lesson1");

title = "GLO";
screens = "Простые, Сложные, Интерактивные";
screenPrice = 200;
rollback = 18;
fullPrice = 80000;
adaptive = false;

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);
console.log("Стоимость верстки экранов " + screenPrice + " рублей");
console.log("Стоимость разработки сайта " + fullPrice + " рублей");

console.log(screens.toLowerCase().split(", "));
console.log(fullPrice * (rollback/100));