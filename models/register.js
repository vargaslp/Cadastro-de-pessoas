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

    set photo(value) {
        this._photo = value
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


}



