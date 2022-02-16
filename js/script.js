'use strict'

const title = document.getElementsByTagName('h1')[0];
const startBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];
const buttonPlus = document.querySelector('.screen-btn');
const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');
const inputRange = document.querySelector('.rollback input[type = "range"]');
const rangValue = document.querySelector('.rollback span.range-value');

const total = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalCountOther = document.getElementsByClassName('total-input')[2];
const fullTotalCount = document.getElementsByClassName('total-input')[3];
const totalCountRollback = document.getElementsByClassName('total-input')[4];

let checkboxes = document.querySelectorAll('.main-controls__checkbox');
let screens  = document.querySelectorAll ('.screen');

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    servicesPercent: {},
    servicesNumber: {},
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    allCount: 0,
    rollback: 10,
    init: function () {
        this.addTitle()
        startBtn.addEventListener('click', this.allCountScreens.bind(this))
        startBtn.addEventListener('click', this.inputsDisabled.bind(this))
        resetBtn.addEventListener('click', this.reset.bind(this))
        buttonPlus.addEventListener('click', this.addScreenBlock.bind(this))
        inputRange.addEventListener('change', this.addRollback.bind(this))
    },
    addTitle: function () {
        document.title = title.textContent;
    },
    allCountScreens: function () {
        if(this.addScreens() !== true) {
            alert('Не выбран тип или количество экранов')
        } else this.start();
    },
    addScreens: function () {
        screens  = document.querySelectorAll ('.screen');

        screens.forEach((screen, index) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;

            this.screens.push({
                id: index,
                name: selectName,
                count: +input.value,
                price: +select.value * +input.value
            })
        })

        if (this.screens.find(item => item.price === 0)) {
            return false;
        } else {
            return true;
        }
    },
    addScreenBlock: function () {
        const cloneScreen = screens[0].cloneNode(true)
        screens[screens.length - 1].after(cloneScreen)
    },
    addServices: function () {
        otherItemsPercent.forEach(item => {
            const check = item.querySelector('input[type=checkbox]')
            const label = item.querySelector('label')
            const input = item.querySelector('input[type=text]')

            if(check.checked) {
                this.servicesPercent[label.textContent] = +input.value
            }
        });


        otherItemsNumber.forEach(item => {
            const check = item.querySelector('input[type=checkbox]')
            const label = item.querySelector('label')
            const input = item.querySelector('input[type=text]')

            if(check.checked) {
                this.servicesNumber[label.textContent] = +input.value
            }
        })
    },
    addPrices: function () {
        for (let screen of this.screens) {
            this.screenPrice += +screen.price;
        }

        for (let key in this.servicesNumber) {
            this.servicePricesNumber += this.servicesNumber[key];
        }

        for (let key in this.servicesPercent) {
            this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100)
        }

        this.screens.forEach( item =>  this.allCount += +item.count);

        this.fullPrice = +this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;

        appData.servicePercentPrice = +this.fullPrice - (this.fullPrice * (this.rollback / 100));
        totalCountRollback.value = this.servicePercentPrice;
    },
    showResult: function () {
        total.value = this.screenPrice
        totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber
        fullTotalCount.value = this.fullPrice
        totalCount.value = this.allCount;
    },
    addRollback: function () {
        this.rollback = +inputRange.value;
        rangValue.textContent = this.rollback  + "%";
    },
    inputsDisabled: function() {
        screens  = document.querySelectorAll ('.screen');

        screens.forEach(screen => {
            screen.querySelector('select').setAttribute('disabled', true);
            screen.querySelector('input').setAttribute('disabled', true);
        })

        checkboxes.forEach(item => {
            item.querySelector('input[type="checkbox"]').setAttribute('disabled', true);
        })

        buttonPlus.setAttribute('disabled', true);

        startBtn.style.display = "none";
        resetBtn.style.display = "block";
    },

    start: function () {
        this.addScreens()
        this.addServices()
        this.addPrices()
        this.showResult()
        this.logger()
    },
    reset: function () {
        //screens  = document.querySelectorAll ('.screen');

        screens.forEach(screen => {
            let sel = screen.querySelector('select');
            sel.removeAttribute('disabled');
            sel.value = '';

            let inp = screen.querySelector('input');
            inp.removeAttribute('disabled');
            inp.value = '';
        })

        console.log(screens)



        checkboxes.forEach(item => {
            let check = item.querySelector('input[type="checkbox"]');
            check.removeAttribute('disabled');
            check.checked = false;
        })

        buttonPlus.removeAttribute('disabled');
        startBtn.style.display = "block";
        resetBtn.style.display = "none";


    },
    logger: function () {
        //console.log(screens);
    }
}

appData.init();














