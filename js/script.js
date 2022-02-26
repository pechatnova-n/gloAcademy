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

const checkboxCms = document.querySelector('#cms-open');
const cmsVariants = document.querySelector('.hidden-cms-variants');
const selectSmc = cmsVariants.querySelector('select');
const dopCmsPers = document.querySelector('.hidden-cms-variants > .main-controls__input');
const inpCms = document.querySelector('#cms-other-input');

const checkboxes = document.querySelectorAll('.main-controls__checkbox');
let screens  = document.querySelectorAll('.screen');



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
    extraPercent: 1,
    init: function () {
        this.addTitle()
        buttonPlus.addEventListener('click', this.addScreenBlock.bind(this))
        startBtn.addEventListener('click', () => {
            this.allCountScreens()
            this.inputsDisabled()
        })
        resetBtn.addEventListener('click', this.reset.bind(this))
        checkboxCms.addEventListener('click', this.openCmsVariants.bind(this))
        inputRange.addEventListener('change', () => {
            this.addRollback()
            if (startBtn.style.display === "none") {
                this.addRollback()
                this.servicePercentPrice = +this.fullPrice - (this.fullPrice * (this.rollback / 100));
                totalCountRollback.value = this.servicePercentPrice;
            }
        })

    },
    addTitle: function () {
        document.title = title.textContent;
    },
    allCountScreens: function () {
        if(this.addScreens() !== true) {
            alert('Не выбран тип или количество экранов');
        } else {
            this.start();
        }
    },
    addScreens: function () {
        screens  = document.querySelectorAll('.screen');
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
        const cloneScreen = screens[0].cloneNode(true);
        screens  = document.querySelectorAll('.screen');
        screens[screens.length - 1].after(cloneScreen);
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
        this.fullPrice = this.fullPrice + +(this.fullPrice / 100) * this.extraPercent;

        this.servicePercentPrice = +this.fullPrice - (this.fullPrice * (this.rollback / 100));
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

        selectSmc.setAttribute('disabled', true);

        inpCms.setAttribute('disabled', true);


        buttonPlus.setAttribute('disabled', true);

        startBtn.style.display = "none";
        resetBtn.style.display = "block";
    },
    openCmsVariants: function () {
        cmsVariants.style.display = 'flex';
        selectSmc.disabled = false;
        selectSmc.selectedIndex = 0;

        selectSmc.addEventListener('change', () => {
            dopCmsPers.style.display = 'none';
            inpCms.value = '';

            if(selectSmc.options[selectSmc.selectedIndex].value == 'other') {
                dopCmsPers.style.display = 'flex';

                inpCms.addEventListener('change', () => {
                    this.extraPercent = +inpCms.value;
                })
            } else  if(selectSmc.options[selectSmc.selectedIndex].value != '' && selectSmc.options[selectSmc.selectedIndex].value != 'other') {
                this.extraPercent = +selectSmc.options[selectSmc.selectedIndex].value;
                console.log(this.extraPercent)
            }
        })
    },
    start: function () {
        this.addScreens()
        this.addServices()
        this.addPrices()
        this.showResult()
        this.logger()
    },
    reset: function () {
            screens.forEach(screen => {
            let sel = screen.querySelector('select');
            sel.removeAttribute('disabled');
            sel.value = '';

            let inp = screen.querySelector('input');
            inp.removeAttribute('disabled');
            inp.value = '';
        })

        for(let i = 1; i< screens.length; i++) {
            screens[i].remove();
        }

        checkboxes.forEach(item => {
            let check = item.querySelector('input[type="checkbox"]');
            check.removeAttribute('disabled');
            check.checked = false;
        })



        total.value = 0;
        totalCount.value = 0;
        totalCountOther.value = 0;
        fullTotalCount.value = 0;
        totalCountRollback.value = 0;

        inpCms.removeAttribute('disabled');
        dopCmsPers.style.display = 'none';


        buttonPlus.removeAttribute('disabled');
        startBtn.style.display = "block";
        resetBtn.style.display = "none";
        cmsVariants.style.display = 'none';
    },
    logger: function () {
        //console.log(this.screens.price);
    }
}

appData.init();














