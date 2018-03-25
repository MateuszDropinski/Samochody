export default function car()
{
    return {
        restrict: 'E',
        templateUrl:'./templates/car.html',
        replace:true,
        scope:true,
        link: (scope,elem,attr) =>
        {            
            let elements = elem[0].getElementsByTagName('ul');
            let digest = true;
            let firstCheck = false;
            
            let compareDate = (date) =>
            {
                let actualDay = new Date(),
                    day = parseInt(date.substr(0,2))+1,
                    month = parseInt(date.substr(3,2))-1,
                    year = date.substr(6,4),
                    newDate = new Date(year,month,day);
                
                let difference = Math.ceil((newDate - actualDay)/(60*60*24000));

                return difference
            }
            
            scope.$watch('remindersAmount',function(){
                if((scope.remindersAmount.value === 0 && digest) || (scope.remindersAmount.value && digest))
                {
                    scope.checkCar();
                }    
            })
            
            let removeClass = (search) =>
            {    
                for(let i = 0; i < elements.length; i++)
                {
                    if(elements[i].classList[0] == search)
                    {
                        elements[i].classList.remove('reminder');
                        elements[i].classList.remove('warning');
                    }
                }
            }
            
            let setReminder = (search) =>
            {    
                for(let i = 0; i < elements.length; i++)
                {
                    if(elements[i].classList[0] == search)
                    {
                        elements[i].className = search
                        elements[i].classList.add('reminder');
                        return true;
                    }
                }
            }
            
            let setWarning = (search) =>
            {                
                for(let i = 0; i < elements.length; i++)
                {
                    if(elements[i].classList[0] == search)
                    {
                        elements[i].className = search
                        elements[i].classList.add('warning');
                        return true;
                    }
                }
            }
            
            let changeName = (text) =>
            {
                switch(text) {
                    case 'mark':
                        text = "Marka";
                        break;
                    case 'registration':
                        text = "Rejestracja";
                        break;
                    case 'others':
                        text = "Inne";
                        break;
                    case 'fuel':
                        text = "Paliwo";
                        break;
                    case 'elevator_date':
                        text = "Przegląd windy";
                        break;
                    case 'tacho_date':
                        text = "Przegląd Tacho";
                        break;
                    case 'car_insurance_date':
                        text = "Ubezpieczenie samochodu";
                        break;
                    case 'commodity_insurance_date':
                        text = "Ubezpieczenie towaru";
                        break;
                    case 'car_date':
                        text = "Przegląd samochodu";
                        break;
                    case 'atp':
                        text = "ATP";
                        break;
                    case 'oil_date':
                        text = "Wymiana oleju";
                        break;
                    default:
                        break;
                } 
                return text;
            }
            
            let compare = (object , array) =>
            {
                for(let i in array)
                {
                    if(object['mark']==array[i]['mark'])
                    {
                        if(object['registration']==array[i]['registration'])
                        {
                            if(object['event']==array[i]['event'])
                            {
                                return false;
                            }
                        }
                    }
                }
                
                return true
            }
        
            scope.$watch('car',function(){
                if(firstCheck)
                {
                    changeCars();
                }
                firstCheck=true;
            },true);
            
            let changeCars = () =>
            {
                let elementsToDelete = new Array();
                for(let i in scope.reminders)
                {                    
                    if(scope.car['registration']==scope.reminders[i]['registration'])
                    {
                        elementsToDelete.push(i);
                    }
                }
                for(let i = elementsToDelete.length-1; i>=0; i--)
                {
                    scope.reminders.splice(elementsToDelete[i],1);
                }
                scope.remindersAmount.value -= elementsToDelete.length;
                elementsToDelete = new Array();
                for(let i in scope.warnings)
                {
                    if(scope.car['registration']==scope.warnings[i]['registration'])
                    {
                        elementsToDelete.push(i);
                    }
                }
                for(let i = elementsToDelete.length-1; i>=0; i--)
                {
                    scope.warnings.splice(elementsToDelete[i],1);
                }
                scope.remindersAmount.value -= elementsToDelete.length;
                scope.checkCar();
            }
            
            scope.checkCar = () =>
            {
                let reminders = new Array();
                let warnings = new Array();
                let remindersAmount = 0;                
                if(scope.car)
                {
                    for(let data in scope.car)
                    {                        
                        if(data!='mark'&&data!='registration'&&data!='year'&&data!='vin'&&data!='fuel'&&data!='others'&&data!='$$hashKey')
                        {
                            if(scope.car[data]!='')
                            {          
                                if(compareDate(scope.car[data])<31&&compareDate(scope.car[data])>14)
                                {
                                    if(setReminder(data))
                                    {
                                        let reminder= 
                                        {
                                            mark: scope.car['mark'],
                                            registration: scope.car['registration'],
                                            event: changeName(data),
                                            date: scope.car[data]
                                        };
                                        if(compare(reminder,scope.reminders))
                                        {
                                            reminders.push(reminder);
                                            remindersAmount++;
                                        }
                                    }
                                }
                                else if(compareDate(scope.car[data])<=14)
                                {
                                    if(setWarning(data))
                                    {
                                        let warning= 
                                        {
                                            mark: scope.car['mark'],
                                            registration: scope.car['registration'],
                                            event: changeName(data),
                                            date: scope.car[data]
                                        } 
                                        if(compare(warning,scope.warnings))
                                        {
                                            warnings.push(warning);
                                            remindersAmount++;
                                        }
                                    }                                        
                                }
                                else
                                {
                                    removeClass(data);
                                }                                
                            }
                            else
                            {
                                removeClass(data);
                            }  
                        }
                    }
                    for(let i = 0; i<reminders.length;i++)scope.reminders.push(reminders[i]);      
                    for(let i = 0; i<warnings.length;i++)scope.warnings.push(warnings[i]);  
                    scope.remindersAmount.value +=remindersAmount;
                    digest = false;
                }
            }
            
            let displayChangeData = (header,content,date=false) =>
            {
                document.getElementsByClassName('change-data-background')[0].style.display = 'block';
                document.getElementsByClassName('change-data-background')[0].setAttribute('data-car-registration',scope.car['registration']);
                document.getElementsByClassName('change-data-header')[0].innerHTML = changeName(header);
                document.getElementsByClassName('change-data-header')[0].setAttribute('data-attribute' , header);
                document.getElementsByClassName('change-data-element')[0].innerHTML = '';
                document.getElementsByClassName('change-data-element')[0].appendChild(content);
                
                if(date)
                {
                    let dateZero = document.createElement('i');
                    dateZero.classList.add('fa');
                    dateZero.classList.add('fa-times');
                    dateZero.classList.add('change-data-element-cross');
                    dateZero.setAttribute('aria-hidden','true');
                    dateZero.addEventListener('click',function(e){
                        document.getElementsByClassName('change-data-element')[0].children[0].value = '';
                    })
                    document.getElementsByClassName('change-data-element')[0].appendChild(dateZero);                    
                }
            }
            
            scope.changeText = (value ,cm) =>
            {
                let input = document.createElement('input');
                input.setAttribute('type','text');
                input.value = value;
                displayChangeData(cm,input);
            }
            
            scope.changeOthers = (value,cm) =>
            {
                let input = document.createElement('textarea');
                input.value = value;
                displayChangeData(cm,input);
            }
            
            scope.changeDate = (value,cm) =>
            {
                let input = document.createElement('input');
                input.setAttribute('type','text');
                input.setAttribute('readonly','readonly');
                input.value = value;
                displayChangeData(cm,input,true);
                
                let fp = flatpickr(input, {
                    minDate: new Date(),
                    dateFormat: 'd-m-Y',
                    animate:false
                });
            }
            
            scope.askForDelete = () =>
            {                
                document.getElementsByClassName('delete-car-background')[0].style.display = 'block'; 
                document.getElementsByClassName('delete-car-background')[0].setAttribute('data-car-registration',scope.car['registration']); 
            }
        }
    }
}