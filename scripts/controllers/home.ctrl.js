homeController.$inject = ['$scope','cars'];

export default function homeController($scope,cars)
{
    $scope.cars;
    
    cars.then((success)=>{
        $scope.cars = success.data;
    })
    
    $scope.remindersAmount = {value:0};
    $scope.reminders = [];
    $scope.warnings = [];
    
    $scope.emptyError = '';
    
    $scope.query = {};
    $scope.queryBy = '$';
    
    let remindersContainer = document.getElementsByClassName('header-info')[0];
    let changeDataContainer = document.getElementsByClassName('change-data-background')[0];
    let deleteCarContainer = document.getElementsByClassName('delete-car-background')[0];
    let addCarContainer = document.getElementsByClassName('add-car-background')[0];
    
    remindersContainer.children[1].children[0].addEventListener('click',()=>{
        remindersContainer.children[1].style.display = 'none';
    });
    
    remindersContainer.children[0].addEventListener('click',()=>{
        remindersContainer.children[1].style.display = 'block';
    });
    
    changeDataContainer.children[0].children[2].children[0].addEventListener('click',function(){
        changeDataContainer.style.display = 'none';  
        $scope.emptyError = '';
    });
    
    changeDataContainer.children[0].children[2].children[1].addEventListener('click',function(){
        changeData();
    });
    
    let changeData = () =>
    {         
        let car = changeDataContainer.getAttribute('data-car-registration'),
            attribute = changeDataContainer.children[0].children[0].getAttribute('data-attribute'),
            value = changeDataContainer.children[0].children[1].children[0].value.trim(),
            pass = true;
        
        if(attribute == 'registration')
        {
            for(let i = 0 ; i < $scope.cars.length ; i++)
            {
                if($scope.cars[i]['registration'] == value.toUpperCase())
                {
                    $scope.emptyError = "Samochód z taką rejestracją już istnieje";
                    pass = false;
                }
            }  
        }
        
        if((attribute == 'registration' && value == '') || (attribute == 'mark' && value == ''))
        {
            if(value == '')
            {
                $scope.emptyError = 'Pole nie może być puste.';
                pass = false;
            }
        }    
        
        if(pass)
        {
            changeDataContainer.style.display = 'none';   
            
            if(attribute == 'registration')value = value.toUpperCase();
        
            for(let i = 0 ; i < $scope.cars.length ; i++)
            {
                if($scope.cars[i]['registration'] == car)$scope.cars[i][attribute] = value;
            } 

            $scope.changed=true;
        }  
    }
    
    deleteCarContainer.children[0].children[1].children[0].addEventListener('click',function(){        
        deleteCarContainer.style.display = 'none';    
    });
    
    deleteCarContainer.children[0].children[1].children[1].addEventListener('click',function(){
        
        deleteCarContainer.style.display = 'none';    
        
        let toDeleteRegistration = deleteCarContainer.getAttribute('data-car-registration');
        
        for(let i = 0 ; i < $scope.cars.length ; i++)
        {
            if($scope.cars[i]['registration']==toDeleteRegistration)$scope.cars.splice(i,1);
        }       
        
        let elementsToDelete = new Array();
        for(let i in $scope.reminders)
        {
            if(toDeleteRegistration==$scope.reminders[i]['registration'])
            {
                elementsToDelete.push(i);
            }
        }
        for(let i = elementsToDelete.length-1; i>=0; i--)
        {
            $scope.reminders.splice(elementsToDelete[i],1);
        }
        $scope.remindersAmount.value -= elementsToDelete.length;
        elementsToDelete = new Array();
        for(let i in $scope.warnings)
        {
            if(toDeleteRegistration==$scope.warnings[i]['registration'])
            {
                elementsToDelete.push(i);
            }
        }
        for(let i = elementsToDelete.length-1; i>=0; i--)
        {
            $scope.warnings.splice(elementsToDelete[i],1);
        }
        $scope.remindersAmount.value -= elementsToDelete.length;
    });
    
    $scope.addCarForm = () =>
    {
        addCarContainer.style.display = 'block';
    }
    
    $scope.openHelp = () =>
    {
        document.getElementsByClassName('help-background')[0].style.display = 'block';
    }
}