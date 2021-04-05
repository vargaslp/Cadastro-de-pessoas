class RegisterController {


    constructor(formID, tableID) {

        this.form = document.getElementById(formID)
        this.table = document.getElementById(tableID)

        document.addEventListener('load', this.getViaCep())

    }


    submit() {

        this.form.addEventListener('submit', e => {

            e.preventDefault();

            this.addLine(this.getData())


        })


    }//closing the submit()

    addLine(dataUser) {

        this.table.innerHTML =
            ` <tr>
             <td>${dataUser.name}</td>
             <td>${dataUser.email}</td>
             <td>${dataUser.gender}</td>
             <td>${dataUser.birth}</td>
             <td>${dataUser.street} </td>
             <td>${dataUser.number} </td>
             <td>${dataUser.district} </td>
             <td>
                <button type="button" class="btn btn-dark">Editar</button>
                <button type="button" class="btn btn-danger">Excluir</button>
             </td>
         </tr>
        `
    }//closing the addLine()

    getViaCep() {

        const cep = document.getElementById("cepID")

        cep.addEventListener('blur', (e) => {

            let street = document.getElementById('streetID');
            let district = document.getElementById('districtID')
            let city = document.getElementById('cityID')


            let swap = cep.value.replace("-", "")
            const options = {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            }

            fetch(`http://viacep.com.br/ws/${swap}/json/`, options).then((response) => {
                response.json().then(data => {

                    street.value = data.logradouro
                    district.value = data.bairro
                    city.value = data.localidade
                })

            }).catch(e => console.log("Erro" + e.message))



        });

        this.getData()



    }//closing the getViaCep()


    getData() {
        let register = {};


        [...this.form.elements].forEach(function (field) {

            if (field.name == "gender") {
                if (field.checked) {

                    register[field.name] = field.value
                }

            } else {

                register[field.name] = field.value

            }

        })

        return new Register(
            register.name,
            register.birth,
            register.gender,
            register.email,
            register.cep,
            register.street,
            register.district,
            register.number,
            register.city,
            register.password
        )



    }//closing the getData()






}//closing the class