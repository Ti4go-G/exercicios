
class ValidaForm {
    constructor() {
        this.form = document.querySelector('.form');
        this.events();
    }
    events() {
        this.form.addEventListener('submit', e => {
            this.handleSubmit(e);
        })
    }
    handleSubmit(e) {
        e.preventDefault();
        const validFields = this.checkFields();
        const validPassword = this.checkPassword();
    }
    checkPassword() {
        const password = document.getElementById('password');
        const passwordRepeat = document.getElementById('password-repeat');
        let isValid = true;
        if (password.value !== passwordRepeat.value) {
            this.createError(password, `As senhas precisam ser iguais`);
            this.createError(passwordRepeat, `As senhas precisam ser iguais`);
            isValid = false;
        }
        if (password.value.length < 6 || password.value.length > 12) {
            this.createError(password, `A senha precisa ter entre 6 e 12 caracteres`);
            isValid = false;
        }

        return isValid
    }
    checkFields() {
        let isValid = true;
        for (let error of this.form.querySelectorAll('.error-text')) {
            error.remove();
        }
        for (let field of this.form.querySelectorAll('input')) {
            const label = field.previousElementSibling.innerText
            if (!field.value) {
                this.createError(field, `O campo ${label} não pode estar em branco`);
                isValid = false;
            }
            if (field.id === 'cpf') {

            }
            if (field.id === 'user' && !this.validateUser(field)) {
                isValid = false;
            }
        }
    }
    validateUser(field) {
        const user = field.value;
        let isValid = true;

        if (user.length < 3 || user.length > 12) {
            this.createError(field, `O usuário precisa ter entre 3 e 12 caracteres`)
            isValid = false;
        }
        if (!user.match(/^[a-zA-Z0-9]+$/g)) {
            this.createError(field, 'Nome de usuário precisar conter apenas letras e/ou números.');
            isValid = false;
        }
        return isValid
    }
    createError(field, msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');
        field.insertAdjacentElement('afterend', div);
    }

}

const valida = new ValidaForm();