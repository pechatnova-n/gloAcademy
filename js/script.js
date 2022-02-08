'use strict'

const titlePage = document.getElementsByTagName('h1')[0];
const buttons = document.getElementsByClassName('handler_btn');
const addBtn = document.querySelector('.screen-btn');
const percent = document.querySelectorAll('.other-items.percent');
const number = document.querySelectorAll('.other-items.number');
const rollback = document.querySelector('.rollback input[type = "range"]');
const rangValue = document.querySelector('.rollback span.range-value');
const inputs = Array.from(document.getElementsByClassName('total-input'));
let screen  = document.querySelectorAll ('.screen');

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    services: {},
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    rollback: 10,
    start: function () {
        appData.asking();
        appData.addPrices();
        appData.getFullPrice();
        appData.getServicePercentPrices();
        appData.getTitle();
        appData.logger()
    },
    asking: function () {

        do {
            appData.title = prompt("Как называется ваш проект?", "Калькулятор верстки");
        } while (typeof(appData.title) != 'string' || appData.isNumber(appData.title));

        for (let i = 0; i < 2; i++) {
            let name;
            do {
                name = prompt("Какие типы экранов нужно разработать?");
            } while (typeof(name) != 'string' || appData.isNumber(name));
            let price = 0;

            do {
                price = prompt("Сколько будет стоить данная работа?");
                price = Number(price);
            } while(!appData.isNumber(price));

            appData.screens.push({ id: i, name: name, price: price });

            console.log('Как называется ваш проект?', typeof appData.title);
            console.log('Какие типы экранов нужно разработать?', typeof name);
            console.log('Сколько будет стоить данная работа?', typeof price);
        }

        for (let i = 0; i < 2; i++) {
            let name;
            let price = 0;

            do {
                name = prompt("Какой дополнительный тип услуги нужен?");
            } while (typeof(name) != 'string' || appData.isNumber(name));

            do {
                price = prompt("Сколько это будет стоить?");
                price = Number(price);
            } while (!appData.isNumber(price));

            appData.services[name] = +price;

            console.log('Какой дополнительный тип услуги нужен?', typeof name);
            console.log('Сколько это будет стоить?', typeof price);
        }

        appData.adaptive = confirm("Нужен ли адаптив на сайте?");
    },
    addPrices: function () {
        for (let screen of appData.screens) {
            appData.screenPrice += +screen.price;
        }

        for (let key in appData.services) {
            appData.allServicePrices += appData.services[key];
        }
    },
    isNumber: function (num) {
        return !isNaN(parseFloat(num)) && isFinite(num);
    },
    getFullPrice: function() {
        appData.fullPrice = appData.screenPrice + appData.allServicePrices;
    },
    getRollbackMessage: function(price) {
        if(price >= 30000) {
            return "Даем скидку в 10%";
        } else if (price >= 15000 && price < 30000) {
            return "Даем скидку в 5%";
        } else if (price < 15000 && price >= 0) {
            return  "Скидка не предусмотрена";
        } else if (price < 0) {
            return "Что то пошло не так";
        }
    },
    getTitle: function() {
        appData.title = appData.title.trim().toLowerCase();
        appData.title = appData.title[0].toUpperCase() + appData.title.slice(1);
    },
    getServicePercentPrices: function () {
        appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));
    },

    logger: function () {
        for (let prop in appData) {
            console.log(prop);
        }
        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrice);
        console.log(appData.screens);
    }
}

appData.start();

console.log(titlePage);
console.log(buttons);
console.log(addBtn);
console.log(percent);
console.log(number);
console.log(rollback);
console.log(rangValue);
console.log(inputs);
console.log(screen);












