class RegisterController {


    constructor(formID, tableID, formIDUpdate) {

        this.form = document.getElementById(formID)
        this.table = document.getElementById(tableID)
        this.formUpdade = document.getElementById(formIDUpdate)


        document.addEventListener('load', this.getViaCep())
        this.selectData()

    }

    editBtnCancel() {

        document.querySelector("#formID-updade .btn-cancel").addEventListener("click", e => {

            this.showPanelCreate()

        })

        this.formUpdade.addEventListener('submit', e => {

            e.preventDefault()

            let btnSubtmit = this.formUpdade.querySelector("[type=submit]")
            btnSubtmit.disabled = true

            let values = this.getData(this.formUpdade)

            let index = this.formUpdade.dataset.trIndex;

            let row = this.table.rows[index]

            let userOld = JSON.parse(row.dataset.user)

            let result = Object.assign({}, userOld, values)

            this.getPhoto(this.formUpdade).then(
                (content) => {

                    if (!values.photo) {
                        result._photo = userOld._photo
                    } else {

                        result._photo = content
                    }

                    row.dataset.user = JSON.stringify(result)

                    row.innerHTML =
                        `
                <td><img src="${result._photo}" alt="user image" class="rounded-circle img-sm"></td>
                <td>${result._name}</td>
                <td>${result._email}</td>
                <td>${result._gender}</td>
                <td>${result._birth}</td>
                <td>${result._street} </td>
                <td>${result._number} </td>
                <td>${result._district} </td>
                <td>${Utilities.dateFormat(result._date)}</td>
                <td>
                   <button type="button" class="btn btn-dark btn-edit">Editar</button>
                   <button type="button" class="btn btn-danger">Excluir</button>
                </td>
           `

                    this.eventTR(row)

                    this.formUpdade.reset()

                    btnSubtmit.disabled = false

                    this.showPanelCreate()

                }, (e) => {
                    console.error(e)

                }
            )

        })

    }


    submit() {


        this.form.addEventListener('submit', e => {

            e.preventDefault();

            let btnSubtmit = this.form.querySelector("[type=submit]")

            btnSubtmit.disabled = false

            let user = this.getData(this.form)

            if (!user) return false;

            this.getPhoto(this.form).then(
                (content) => {

                    user.photo = content

                    this.insert(user)

                    this.addLine(user)

                    this.form.reset()

                    btnSubtmit = true

                }, (e) => {
                    console.error(e)

                }
            )

        })


    }//closing the submit()


    getPhoto(form) {

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


    eventTR(tr) {


        tr.querySelector('.btn-delete').addEventListener('click', e => {

            if (confirm("deseja realmente excluir?")) {

                tr.remove()
            }



        })


        tr.querySelector('.btn-edit').addEventListener('click', e => {



            let json = JSON.parse(tr.dataset.user);
            let formUpdade = document.getElementById("formID-updade")

            formUpdade.dataset.trIndex = tr.sectionRowIndex;


            for (let name in json) {
                let field = formUpdade.querySelector("[name=" + name.replace("_", "") + "]")


                if (field) {

                    switch (field.type) {

                        case 'file':


                            continue;
                            break;
                        case 'radio':
                            field = formUpdade.querySelector("[name=" + name.replace("_", "") + "][value=" + json[name] + "]")
                            field.checked = true
                            break;
                        default:
                            field.value = json[name]


                    }

                }
            }

            formUpdade.querySelector(".photo").src = json._photo

            this.showPanelUpdate()

        })



    }

    getUsersStorage(){

        let users = []

        if (sessionStorage.getItem('users')) {

            users = JSON.parse(sessionStorage.getItem('users'))

        }

        return users
    }

    selectData() {

        let users = this.getUsersStorage()

        
        users.forEach(dataUser =>{

            let user = new Register();

            user.loadFronJson(dataUser)

            this.addLine(user)

        })


    }


    insert(value) {

        let users = this.getUsersStorage()

        users.push(value)

        sessionStorage.setItem('users', JSON.stringify(users))


    }

    addLine(dataUser) {

        let tr = document.createElement("tr")



        tr.dataset.user = JSON.stringify(dataUser)

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
                <button type="button" class="btn btn-dark btn-edit">Editar</button>
                <button type="button" class="btn btn-danger btn-delete">Excluir</button>
             </td>
        `


        this.eventTR(tr)


        this.table.appendChild(tr)
    }//closing the addLine()

    showPanelCreate() {

        document.querySelector('.primary').style.display = "block"
        document.querySelector('.secondary').style.display = "none"

    }// closing showPanelCreate()


    showPanelUpdate() {

        document.querySelector('.primary').style.display = "none"
        document.querySelector('.secondary').style.display = "block"

    }//closing showPanelUpdate()


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

        this.getData(this.form)



    }//closing the getViaCep()


    getData(form) {
        let register = {};
        let formIsValid = true;


        [...form.elements].forEach(function (field) {

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