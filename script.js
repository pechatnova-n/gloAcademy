const title = prompt("Как называется ваш проект?");
const screens = prompt("Какие типы экранов нужно разработать? (пример: 'Простые, Сложные, Интерактивные')");
const screenPrice = +prompt("Сколько будет стоить данная работа?");
const rollback = 18;
const adaptive = confirm("Нужен ли адаптив на сайте?");
const service1 = prompt("Какой дополнительный тип услуги нужен?");
const servicePrice1 = +prompt("Сколько это будет стоить?");
const service2 = prompt("Какой дополнительный тип услуги нужен?");
const servicePrice2 = +prompt("Сколько это будет стоить?");


const fullPrice = screenPrice + servicePrice1 + servicePrice2;
console.log(fullPrice);

const servicePercentPrice = Math.ceil(fullPrice - 2000.65);
console.log(servicePercentPrice);


if(fullPrice >= 30000) {
    console.log("Даем скидку в 10%");
} else if (fullPrice >= 15000 && fullPrice < 30000) {
    console.log("Даем скидку в 5%");
} else if (fullPrice < 15000 && fullPrice >= 0) {
    console.log("Скидка не предусмотрена");
} else if (fullPrice < 0) {
    console.log("Что то пошло не так");
}


console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);
console.log("Стоимость верстки экранов " + screenPrice + " рублей");
console.log("Стоимость разработки сайта " + fullPrice + " рублей");
console.log(screens.toLowerCase().split(", "));
console.log(fullPrice * (rollback / 100));



