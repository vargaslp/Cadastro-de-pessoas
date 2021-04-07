class RegisterController {


    constructor(formID, tableID) {

        this.form = document.getElementById(formID)
        this.table = document.getElementById(tableID)

        document.addEventListener('load', this.getViaCep())

    }


    submit() {

        this.form.addEventListener('submit', e => {

            e.preventDefault();

            let btnSubtmit = this.form.querySelector("[type=submit]")

            btnSubtmit.disabled = false

            let user = this.getData()

            if(!user) return false;

            this.getPhoto().then(
                (content) => {
                    
                    user.photo = content

                    this.addLine(user)

                    this.form.reset()

                    btnSubtmit = true

                }, (e) => {
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

            fileReader.onerror = (e) => {
                reject(e)
            }

            if (file) {
                fileReader.readAsDataURL(file)
            } else {
                resolve('../none.png')
            }

        })



    }// closing the getPhoto()



    addLine(dataUser) {

        let tr = document.createElement("tr")


        tr.innerHTML =
            `
             <td><img src="${dataUser.photo}" alt="user image" class="rounded-circle img-sm"></td>
             <td>${dataUser.name}</td>
             <td>${dataUser.email}</td>
             <td>${dataUser.gender}</td>
             <td>${dataUser.birth}</td>
             <td>${dataUser.street} </td>
             <td>${dataUser.number} </td>
             <td>${dataUser.district} </td>
             <td>${Utilities.dateFormat(dataUser.date)}</td>
             <td>
                <button type="button" class="btn btn-dark">Editar</button>
                <button type="button" class="btn btn-danger">Excluir</button>
             </td>
        `

        this.table.appendChild(tr)
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
        let formIsValid = true;


        [...this.form.elements].forEach(function (field) {

            if (['name', 'email', 'password'].indexOf(field.name) > -1 && !field.value) {

                field.parentElement.classList.add('has-error')
                formIsValid = false


            }

            if (field.name == "gender") {
                if (field.checked) {

                    register[field.name] = field.value
                }

            } else {

                register[field.name] = field.value

            }

        })

        if (!formIsValid) {
            return false

        }

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