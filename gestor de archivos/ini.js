var fs = require("fs");

class Ini {
    
    constructor (dir) {
        this.dir = dir;
        this._file;
    }

    open () {
        let str = "";
        fs.writeFile(this.dir, "", { flag: 'a' }, function (err) {
            if (err) {
                console.error(err.message);
            }
        });

        try {
            str = fs.readFileSync(this.dir).toString().split("\n");
        } catch (err) {
            console.error(err.message);
            return false;
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

        this._file = file;
    }

    parameter (parameter, value="") {
        if (Array.isArray(parameter)) {
            let pos;
            if (parameter[0][0] !== "[") {
                for (let i=0; i < this._file.parameter.length; i++) {
                    if (pos) {
                        if (this._file.parameter[i] === "[" || i === this._file.parameter.length-1) {
                            if (value) {
                                this._file.parameter.splice(i+1, 0, parameter[1]);
                                this._file.value.splice(i+1, 0, value);
                                
                                return true;
                            }
                            
                            return false;
                        }
                        if (this._file.parameter[i] === parameter[1]) {
                            if (value) {
                                this._file.value[i] = value;
                                
                                return true;
                            }

                            return this._file.value[i];
                        }
                    } else if (this._file.parameter[i] === "[" && this._file.value[i] === "[" + parameter[0] + "]") {
                        pos = i;
                        console.log("Encontrado en "+i);
                    }
                }
                if (value){
                    this._file.parameter.push("[");
                    this._file.value.push("["+parameter[0]+"]");
                    this._file.parameter.push(parameter[1]);
                    this._file.value.push(value);
                }
            }

            return false;
        } else {
            let pos = this._file.parameter.indexOf(parameter);
            if (pos + 1) {
                if (value) {
                    this._file.value[pos] = value;
                    return true;
                } else {
                    return this._file.value[pos];
                }
            } else {
                if (!value) {
                    return false;
                }

                this._file.parameter.push(parameter);
                this._file.value.push(Array(value + ""));
                
                return true;
            }
        }
    }

    parameters (parameter, pos=false) {
        let res = Array();
        if (pos){
            for (let i=0; i < this._file.parameter.length ;i++) {
                if (this.parameter[i] === parameter) {
                    res.push(i);
                }
            }
            if (res.length === 0) {
                return false;
            }
        } else {
            for (let i=0; i < this._file.parameter.length ;i++) {
                if (this.parameter[i] === parameter) {
                    res.push(this._file.value[i]);
                }
            }
        }
        
        return res;
    }
    
    write () {
        let res = "";
        for (let i = 0; i < this._file.parameter.length; i++) {
            if (this._file.parameter[i] === "") { } 
            else if (this._file.parameter[i] === ";" || this._file.parameter[i] === "[") {
                res += this._file.value[i];
            } else {
                res += this._file.parameter[i] + "=" + this._file.value[i];
            }

            if (i < this._file.parameter.length-1) {
                res += "\n";
            }
        }

        try {
            fs.writeFileSync(this.dir, res);
        } catch (err) {
            console.error(err.message);
            return false;
        }

        return true;
    }
}

module.exports = Ini;
