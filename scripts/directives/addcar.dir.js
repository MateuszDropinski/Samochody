export default function addcar()
{
    return {
        restrict: 'E',
        templateUrl:'./templates/addcar.html',
        replace:true,
        scope:true,
        link: (scope,elem,attrs) =>
        {
            scope.closeAddCar = () =>
            {
                document.getElementsByClassName('add-car-background')[0].style.display = 'none';
                scope.error.registration = "";
                scope.error.mark = "";
                for(let i in scope.car)
                {
                    scope.car[i] = "";
                }
            }
            
            let datepickers = flatpickr('.add-car-date', {
                minDate: new Date(),
                dateFormat: 'd-m-Y',
                animate:false
            })    
            
            scope.car = {
                mark:"",
                registration:"",
                year:"",
                vin:"",
                elevator_date:"",
                car_date:"",
                tacho_date:"",
                car_insurance_date:"",
                commodity_insurance_date:"",
                atp:"",
                fuel:"",
                oil_date:"",
                others:""
            }
            
            scope.error = {
                mark:"",
                registration:""
            }
            
            let checkRegisters = () =>
            {
                for(let i = 0 ; i < scope.cars.length ; i++)
                {
                    if(scope.cars[i]['registration']==scope.car.registration.trim())return true;
                }  
                return false;
            }
        
            scope.addCar = () =>
            {                
                let car = angular.copy(scope.car);
                
                if(!car.mark)
                {
                    scope.error.mark = "Marka samochodu musi być wypełniona";  
                }                
                else if(!car.registration)
                {
                    scope.error.registration = "Rejestracja samochodu musi być wypełniona";
                    scope.error.mark = "";
                }
                else if(checkRegisters())
                {
                    scope.error.registration = "Istnieje już samochód z taką rejestracją.";               
                }
                else
                {
                    scope.error.registration = ""; 
                    scope.cars.push(car);
                    
                    car.registration = car.registration.toUpperCase();
                    
                    for(let i in scope.car)
                    {
                        scope.car[i] = "";
                    }
                    
                    document.getElementsByClassName('add-car-background')[0].style.display = 'none';
                }
            }
        }
    }
}