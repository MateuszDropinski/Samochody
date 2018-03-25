import angular from 'angular';

import home from './scripts/controllers/home.ctrl.js';

import cars from './scripts/factories/cars.fct.js';

import car from './scripts/directives/car.dir.js';
import warning from './scripts/directives/warning.dir.js';
import reminder from './scripts/directives/reminder.dir.js';
import addcar from './scripts/directives/addcar.dir.js';

let app = angular.module('app',[])
            .factory('cars',cars)
            .controller('homeController',home)
            .directive('car',car)
            .directive('warning',warning)
            .directive('addcar',addcar)
            .directive('reminder',reminder);