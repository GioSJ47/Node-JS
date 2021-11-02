var fs = require("fs");

class Ini {
    #file;
    constructor (dir, autoOpen=false) {
        this.dir = dir;
        if (autoOpen) {
            this.open();
        }
    }

    open () {
        let str;
        try {
            str = fs.readFileSync(this.dir, { flag: 'r' }).toString().split("\n");
        } catch {
            str = [""];
        }

        let file = {
            parameter: Array(), 
            value: Array() 
        };

        for (let i = 0; i < str.length; i++) {
            if (str[i] === "") {
                file.parameter.push("");
                file.value.push("");
            } else if (str[i][0] === ";") {
                file.parameter.push(";");
                file.value.push(str[i]);
            } else if (str[i][0] === "[" && str[i][str[i].length-1] === "]") {
                file.parameter.push("[");
                file.value.push(str[i]);
            } else {
                let a = str[i].split("=")
                if (a.length === 1) {
                    file.parameter.push(";");
                    file.value.push(a[1]);
                } else if (a.length === 2) {
                    file.parameter.push(a[0]);
                    file.value.push(a[1]);
                } else if (a.length > 2) {
                    file.parameter.push(a[0]);
                    file.value.push("");
                    for (let i = 1; i < a.length; i++) {
                        file.value[file.value.length-1] += ((i===1)?"":"=") + a[i];
                    }
                }
            }
        }

        this.#file = file;
    }

    parameter (parameter, value="") {
        if (Array.isArray(parameter)) {
            if (parameter[0][0] !== "[") {
                let pos;
                for (let i=0; i < this.#file.parameter.length; i++) {
                    if (pos) {
                        if (this.#file.parameter[i] === "[" || i === this.#file.parameter.length-1) {
                            if (value) {
                                this.#file.parameter.splice(i+1, 0, parameter[1]);
                                this.#file.value.splice(i+1, 0, value);
                                
                                return true;
                            }
                            
                            return false;
                        }
                        if (this.#file.parameter[i] === parameter[1]) {
                            if (value) {
                                this.#file.value[i] = value;
                                
                                return true;
                            }

                            return this.#file.value[i];
                        }
                    } else if (this.#file.parameter[i] === "[" && this.#file.value[i] === "[" + parameter[0] + "]") {
                        pos = i;
                    }
                }
                if (value) {
                    this.#file.parameter.push("[");
                    this.#file.value.push("["+parameter[0]+"]");
                    this.#file.parameter.push(parameter[1]);
                    this.#file.value.push(value);
                }
            }

            return false;
        } else {
            let pos = this.#file.parameter.indexOf(parameter);
            if (pos + 1) {
                if (value) {
                    this.#file.value[pos] = value;
                    return true;
                } else {
                    return this.#file.value[pos];
                }
            } else {
                if (!value) {
                    return false;
                }

                this.#file.parameter.push(parameter);
                this.#file.value.push(Array(value + ""));
                
                return true;
            }
        }
    }

    parameters (parameter, pos=false) {
        let res = Array();
        if (pos) {
            for (let i=0; i < this.#file.parameter.length ;i++) {
                if (this.parameter[i] === parameter) {
                    res.push(i);
                }
            }
            if (res.length === 0) {
                return false;
            }
        } else {
            for (let i=0; i < this.#file.parameter.length ;i++) {
                if (this.parameter[i] === parameter) {
                    res.push(this.#file.value[i]);
                }
            }
        }
        
        return res;
    }
    
    write () {
        let res = "",
            _i = (this.#file.parameter[0] === "") ? 1 : 0;
        for (let i = _i; i < this.#file.parameter.length; i++) {
            if (this.#file.parameter[i] === "") { } 
            else if (this.#file.parameter[i] === ";" || this.#file.parameter[i] === "[") {
                res += this.#file.value[i];
            } else {
                res += this.#file.parameter[i] + "=" + this.#file.value[i];
            }

            if (i < this.#file.parameter.length-1) {
                res += "\n";
            }
        }

        try {
            fs.writeFileSync(this.dir, res, { flag: 'w+' });
        } catch (err) {
            console.error(err.message);
            return false;
        }

        return true;
    }
}

module.exports = Ini;
