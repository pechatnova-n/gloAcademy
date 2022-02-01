'use strict'

let title = prompt("Как называется ваш проект?");
const screens = prompt("Какие типы экранов нужно разработать? (пример: 'Простые, Сложные, Интерактивные')");
const screenPrice = +prompt("Сколько будет стоить данная работа?");
const adaptive = confirm("Нужен ли адаптив на сайте?");
const service1 = prompt("Какой дополнительный тип услуги нужен?");
const servicePrice1 = +prompt("Сколько это будет стоить?");
const service2 = prompt("Какой дополнительный тип услуги нужен?");
const servicePrice2 = +prompt("Сколько это будет стоить?");
let allServicePrices;
let fullPrice;
let servicePercentPrice;
let rollback = 10;



const showTypeOf = function(variable) {
    console.log(variable, typeof variable);
}

const getRollbackMessage = function(price) {
    if(price >= 30000) {
        return "Даем скидку в 10%";
    } else if (price >= 15000 && price < 30000) {
        return "Даем скидку в 5%";
    } else if (price < 15000 && price >= 0) {
        return  "Скидка не предусмотрена";
    } else if (price < 0) {
        return "Что то пошло не так";
    }
}

const getAllServicePrices = function() {
    return servicePrice1 + servicePrice2;
}

function getFullPrice() {
    return screenPrice + allServicePrices;
}

const getTitle = function() {
    title = title.trim().toLowerCase();
    return title = title[0].toUpperCase() + title.slice(1);
}

function getServicePercentPrices(rollback) {
    return fullPrice - (fullPrice * (rollback / 100));
}


allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrices(rollback);
getTitle();
showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);



console.log(getRollbackMessage(fullPrice));
console.log(screens.toLowerCase().split(", "));
console.log("Стоимость разработки сайта " + servicePercentPrice + " рублей");





