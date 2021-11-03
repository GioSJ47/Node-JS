import { statSync, closeSync, openSync, readFileSync, writeFileSync } from "fs";

class INI {
    #file;
    constructor (dir) {
        this.dir = dir;
    }

    open () {
        let str = "";
        try {
            try {
                statSync(this.dir);
            } catch (err) {
                if (err.code === 'ENOENT') {
                    closeSync(openSync(this.dir, 'w'));
                } else {
                    console.error(err.message);
                }
            }
            
            str = readFileSync(this.dir).toString().split("\n");
        } catch (err) {
            console.error(err.message);
        }

        let file = {
            parameter: Array(), 
            value: Array() 
        };

        for (let i = 0; i < str.length; i++) {
            if (!str[i].trim()) {
                file.parameter.push("");
                file.value.push("");
            } else if (str[i] !== undefined) {
                let a = str[i].split("=")
                file.parameter.push(a[0]);
                file.value.push(Array(a[1]));
            }
        }

        this.#file = file;
    }

    parameter (parameter, value = "") {
        let pos = this.#file.parameter.indexOf(parameter);
        if (pos + 1) {
            if (value) {
                this.#file.value[pos] = value;
                return true;
            } else {
                return this.#file.value[pos].toString();
            }
        } else {
            if (!value) {
                return false;
            }

            this.#file.parameter.push(parameter);
            this.#file.value.push(Array(value.toString()));
            
            return true;
        }
    }
    
    close () {
        let res = "";
        for (let i = 0; i < this.#file.parameter.length; i++) {
            if (this.#file.parameter[i].match(";")) {
                res += this.#file.parameter[i];
            } else if (this.#file.parameter[i].trim()) {
                res += this.#file.parameter[i] + "=" + this.#file.value[i];
            }

            if (res.trim() && this.#file.parameter[i].trim()) {
                res += "\n";
            }
        }

        try {
            writeFileSync(this.dir, res);
        } catch (err) {
            console.error(err.message);
        }

        return true;
    }
}

export default INI;
