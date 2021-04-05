class RegisterController {


    constructor(formID, tableID) {

        this.form = document.getElementById(formID)
        this.table = document.getElementById(tableID)

        document.addEventListener('load', this.getViaCep())

    }


    submit() {

        this.form.addEventListener('submit', e => {

            e.preventDefault();

            let user = this.getData()

            this.getPhoto().then(
                (content)=>{
                    user.photo = content

                    this.addLine(user)

                },(e)=>{
                    console.error(e)

                }
            )

        })


    }//closing the submit()


    getPhoto() {

        return new Promise((resolve, reject) => {

            let fileReader = new FileReader();

            let elements = [...this.form.elements].filter(item => {
                if (item.name === "photo") {
                    return item
                }
            })

            let file = elements[0].files[0]
            fileReader.onload = () => {

                resolve(fileReader.result)
            }

            fileReader.onerror = (e)=>{
                reject(e)
            }

            fileReader.readAsDataURL(file)

        })



    }



    addLine(dataUser) {

        this.table.innerHTML =
            ` <tr>
             <td><img src=${dataUser.photo} alt="user image" class="rounded-circle img-sm"></td>
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
            register.password,
            register.photo
        )



    }//closing the getData()






}//closing the class