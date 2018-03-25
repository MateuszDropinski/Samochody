export default function reminder()
{
    return {
        restrict: 'E',
        templateUrl:'./templates/reminder.html',
        replace:true,
        scope:true,
        link: (scope,elem,attr) =>
        {
            let changeName = (text) =>
            {
                switch(text) {
                    case 'Przegląd windy':
                        text = "elevator_date";
                        break;
                    case 'Przegląd Tacho':
                        text = "tacho_date";
                        break;
                    case 'Ubezpieczenie samochodu':
                        text = "car_insurance_date";
                        break;
                    case 'Ubezpieczenie towaru':
                        text = "commodity_insurance_date";
                        break;
                    case 'Przegląd samochodu':
                        text = "car_date";
                        break;
                    case 'ATP':
                        text = "atp";
                        break;
                    case 'Wymiana oleju':
                        text = "oil_date";
                        break;
                    default:
                        break;
                } 
                return text;
            }
            
            
            
            scope.changeDate = (value, cm , reg) =>
            {
                let input = document.createElement('input');
                input.setAttribute('type','text');
                input.setAttribute('readonly','readonly');
                input.value = value;
                
                let fp = flatpickr(input, {
                    minDate: new Date(),
                    dateFormat: 'd-m-Y',
                    animate:false
                });
                
                document.getElementsByClassName('change-data-background')[0].style.display = 'block';
                document.getElementsByClassName('change-data-background')[0].setAttribute('data-car-registration',reg);
                document.getElementsByClassName('change-data-header')[0].innerHTML = cm;
                document.getElementsByClassName('change-data-header')[0].setAttribute('data-attribute' , changeName(cm));
                document.getElementsByClassName('change-data-element')[0].innerHTML = '';
                document.getElementsByClassName('change-data-element')[0].appendChild(input);                
                
                let dateZero = document.createElement('i');
                dateZero.classList = 'fa fa-times change-data-element-cross';
                dateZero.setAttribute('aria-hidden','true');
                dateZero.addEventListener('click',function(e){
                    document.getElementsByClassName('change-data-element')[0].children[0].value = '';
                })
                document.getElementsByClassName('change-data-element')[0].appendChild(dateZero);     
            }
        }
    }
}