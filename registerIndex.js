var register = {}

//var form = document.querySelectorAll('#formID [name = gender ]:checked')
var name = document.querySelector('#nameID');
var email = document.querySelector('#emailID');
var cep = document.querySelector('cepID');



var form = document.querySelectorAll('#formID [name]');


form.forEach(function(value){

    if(value.name == "gender" && value.checked){

        console.log(value);

    }else{

    }
    



})