var register = {}
var form = document.querySelectorAll('#formID [name]');
//var form = document.querySelectorAll('#formID [name = gender ]:checked')


const cep = document.getElementById("cepID")

cep.addEventListener('blur', (e) => {

    let street = document.getElementById('streetID');
    let district = document.getElementById('districtID')
    let city = document.getElementById('cityID')


    let swap = cep.value.replace("-","")
    const options = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }

    fetch(`http://viacep.com.br/ws/${swap}/json/`,options).then((response)=>{
        response.json().then(data =>{
            
            street.value = data.logradouro
            district.value = data.bairro
            city.value = data.localidade
            console.log(data)
        })

    }).catch(e => console.log("Erro"+ e.message))


})

document.getElementById("formID").addEventListener('submit', (e) => {




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



