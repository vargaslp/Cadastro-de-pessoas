class Register {

    constructor(name, birth, gender, email, cep, street, district, number, city, password, photo) {

        this._name = name
        this._birth = birth
        this._gender = gender
        this._email = email
        this._cep = cep
        this._street = street
        this._district = district
        this._number = number
        this._city = city
        this._password = password
        this._photo = photo

        this._date = new Date()
        this._id
    }

    get date() {
        return this._date
    }

    get name() {
        return this._name
    }

    get birth() {
        return this._birth
    }

    get gender() {
        return this._gender
    }

    get email() {
        return this._email
    }

    get cep() {
        return this._cep
    }

    get street() {
        return this._street
    }

    get district() {
        return this._district
    }

    get number() {
        return this._number
    }

    get city() {
        return this._city
    }

    get password() {
        return this._password
    }

    get photo() {
        return this._photo
    }

    get id(){
        return this._id
    }

    set photo(value) {
        this._photo = value
    }

    set id(value){
        this._id = value
    }

    loadFronJson(json) {

        for (let name in json) {
            switch (name) {

                case '_date':
                    this[name] = new Date(json[name])
                    break;
                default:
                    this[name] = json[name]

            }
        }
    }




    static getUsersStorage(){

        let users = []

        if (sessionStorage.getItem('users')) {

            users = JSON.parse(sessionStorage.getItem('users'))

        }

        return users
    }

    
    removeModel(){

        let users = Register.getUsersStorage()

        users.forEach((userData, index)=>{
            

            if(this._email == userData._email){//o indicado seria comparar com id
                console.log(index)
                users.splice(index, 1);
            }

        })

        sessionStorage.setItem('users',JSON.stringify(users))




    }
/*
    newId(){

        if(!window.id) window.id = 0 //window para deixar global no projeto. Se id não existir, recebe o 0 se não, soma mais 1
        id++
        return id

    }


    save(){

        let users = Register.getUsersStorage()

        if(this.id > 0){

            users.map(u=>{


                if(u.id === this.id){

                    u = this
                }

                return u

            })

            let newUserData = Object.assign({}, user, this)

        } else {
            this.id = this.newId()
            users.push(this)

        }

        
        sessionStorage.setItem('users', JSON.stringify(users))

    }
*/

}



