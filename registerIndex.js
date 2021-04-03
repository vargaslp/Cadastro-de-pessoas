var register = {}
var form = document.querySelectorAll('#formID [name]');
//var form = document.querySelectorAll('#formID [name = gender ]:checked')

document.getElementById("formID").addEventListener('submit', (e)=>{

    e.preventDefault()

    form.forEach(function (field) {

        if (field.name == "gender") {
            if (field.checked) {
    
                register[field.name] = field.value
            }
    
        } else {
    
            register[field.name] = field.value
    
        }
    })


    console.log(register)
})



