'use strict'

const appData = {
    title: '',
    screens: '',
    screenPrice: 0,
    adaptive: true,
    service1: '',
    service2: '',
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    rollback: 10,
    asking: function () {
        appData.title = prompt("Как называется ваш проект?", "Калькулятор верстки");
        appData.screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");
        do {
            appData.screenPrice = prompt("Сколько будет стоить данная работа?");
            appData.screenPrice = Number(appData.screenPrice);
        } while(!appData.isNumber(appData.screenPrice))

        appData.adaptive = confirm("Нужен ли адаптив на сайте?");
    },
    isNumber: function (num) {
        return !isNaN(parseFloat(num) && isFinite(num));
    },
    getAllServicePrices: function() {
        let sum = 0;

        for (let i =0; i < 2; i++) {
            if (i === 0) {
                appData.service1 = prompt("Какой дополнительный тип услуги нужен?");
            } else if (i === 1) {
                appData.service2 = prompt("Какой дополнительный тип услуги нужен?");
            }

            //sum += isNumber(prompt("Сколько это будет стоить?"));
            let price = prompt("Сколько это будет стоить?");
            price = Number(price);

            if(appData.isNumber(price)) {
                sum += price;
            } else {
                price = prompt("Сколько это будет стоить?");
                price = Number(price);
                sum += price;
            }
        }
        return sum;
    },
    getFullPrice: function() {
        return appData.screenPrice + appData.allServicePrices;
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
        return appData.title = appData.title[0].toUpperCase() + appData.title.slice(1);
    },
    getServicePercentPrices: function () {
        return appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));
    },

    start: function () {
        appData.asking();
        appData.allServicePrices = appData.getAllServicePrices();
        appData.fullPrice = appData.getFullPrice();
        appData.servicePercentPrice = appData.getServicePercentPrices();
        appData.title = appData.getTitle();
        appData.logger()
    },
    logger: function () {
        for (let prop in appData) {
            console.log(prop);
        }
    }
}

appData.start();












