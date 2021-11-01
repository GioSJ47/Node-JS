var fs = require("fs");
module.exports = class Ini{
    #file;
    constructor(dir){
        this.dir=dir;
        this.read();
    }
    read(){
        this.str=fs.readFileSync(this.dir, {flag:'r'}).toString().split("\n");
        this.l=this.str.length;
        this.file={parameter:Array(),value:Array()};
        for(let i=0; i<this.l ;i++){
            if(this.str[i]===""){
                this.file.parameter.push("");
                this.file.value.push("");
            }else{
                this.a=this.str[i].split(";");
                if(this.a[0]===""&&this.a[1]!==""){
                    this.file.parameter.push(";");
                    this.file.value.push([this.a[1]]);
                    this.l2=this.a.length;
                    if(this.l2>2){
                        for(let i=2; i<this.l2 ;i++){
                            this.file.value[this.file.value.length-1][0]+=";"+this.a[i];
                        }
                    }
                }else if(this.a[0]!==undefined){
                    this.a[0]=this.a[0].split("=");
                    this.file.parameter.push(this.a[0][0]);
                    if(this.a.length===1){
                        this.file.value.push(Array(this.a[0][1]));
                    } else{
                        this.file.value.push(Array(this.a[0][1],this.a[1]));
                    }
                }
            }
        }
        this.#file=this.file;
    }
    parameter(parameter, value="", comment=""){
        this.pos=this.#file.parameter.indexOf(parameter);
        if(this.pos+1){
            if(value){
                this.#file.value[this.pos][0]=value;
                return true;
            }else{
                return this.#file.value[this.pos][0];
            }
        }else{
            if(!value){value=""}
            this.#file.parameter.push(parameter);
            if(comment){
                this.#file.value.push(Array(value+"",comment+""));
            }else{
                this.#file.value.push(Array(value+""));
            }
            return true;
        }
    }
    write(){
        this.res="";
        this.l=this.#file.parameter.length;
        for(let i=0; i<this.l ;i++){
            if(this.#file.parameter[i]===";"){
                this.res+=";"+this.#file.value[i][0];
            }else if(this.#file.parameter[i]!==""){
                this.res+=this.#file.parameter[i]+"="+this.#file.value[i][0]+((this.#file.value[i].length===2)?";"+this.#file.value[i][1]:"");
            }
            this.res+=""+((i+1===this.l)?"":"\n");
        }
        fs.writeFileSync(this.dir, this.res);
        return true;
    }
}
