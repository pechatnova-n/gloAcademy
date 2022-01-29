
const title = "GLO";
const screens = "Простые, Сложные, Интерактивные";
const screenPrice = 200;
const rollback = 18;
const fullPrice = 80000;
const adaptive = false;

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);
console.log("Стоимость верстки экранов " + screenPrice + " рублей");
console.log("Стоимость разработки сайта " + fullPrice + " рублей");

console.log(screens.toLowerCase().split(", "));
console.log(fullPrice * (rollback / 100));