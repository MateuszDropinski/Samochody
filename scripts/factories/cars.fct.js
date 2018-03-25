cars.$inject = ['$http'];

export default function cars($http)
{
    return $http({
            method:'POST',
            url:'php/cars.php',
            headers: {
                'Content-Type': undefined
            },
            data:true
        })    
}