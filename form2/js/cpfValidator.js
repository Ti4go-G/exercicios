class CPFValidator {
    constructor(cpf) {
        this.cpf = cpf.replace(/\D/g, ""); 
    }

    isValid() {
        if (!this.isCorrectLength() || this.hasAllSameDigits()) return false;

        return this.checkDigits();
    }

    isCorrectLength() {
        return this.cpf.length === 11;
    }

    hasAllSameDigits() {
        return /^(\d)\1+$/.test(this.cpf);
    }

    checkDigits() {
        for (let j = 9; j <= 10; j++) {
            let sum = 0;
            let mod;

            for (let i = 0; i < j; i++) {
                sum += parseInt(this.cpf[i]) * (j + 1 - i);
            }

            mod = (sum * 10) % 11;
            if (mod === 10) mod = 0;

            if (mod !== parseInt(this.cpf[j])) return false;
        }
        return true;
    }
}
