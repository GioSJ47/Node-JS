var fs = require("fs");
const _fileIni=(file)=>{
    if(typeof file==="object"){
        let obj=Object.entries(file);
        if(obj.indexOf("parameter")&&obj.indexOf("value")){
            return true;
        }
    }
    console.error("A valid file was not entered.");
    return false;
}
module.exports = {
    obj:function(str){
        str=str.split("\n");
        let l=str.length, archivo={parameter:Array(),value:Array()};
        for(let i=0; i<l ;i++){
            if(str[i]===""){
                archivo.parameter.push("");
                archivo.value.push("");
            }else{
                let a=str[i].split(";");
                if(a[0]===""&&a[1]!==""){
                    archivo.parameter.push(";");
                    archivo.value.push([a[1]]);
                    let l=a.length;
                    if(l>2){
                        for(let i=2; i<l ;i++){
                            archivo.value[archivo.value.length-1][0]+=";"+a[i];
                        }
                    }
                }else if(a[0]!==undefined){
                    a[0]=a[0].split("=");
                    archivo.parameter.push(a[0][0]);
                    if(a.length===1){
                        archivo.value.push(Array(a[0][1]));
                    } else{
                        archivo.value.push(Array(a[0][1],a[1]));
                    }
                }
            }
        }
        return archivo;
    },
    read:function(dir){
        return this.obj(fs.readFileSync(dir, {flag:'r'}).toString());
    },
    parameter:function(file, parameter, value="", comment=""){
        if(!_fileIni(file)){return false}
        let pos=file.parameter.indexOf(parameter);
        if(pos+1){
            if(value){
                file.value[pos][0]=value;
                return true;
            }else{
                return file.value[pos][0];
            }
        }else{
            if(!value){value=""}
            file.parameter.push(parameter);
            if(comment){
                file.value.push(Array(value+"",comment+""));
            }else{
                file.value.push(Array(value+""));
            }
            return true;
        }
    },
    write:function(file, dir=null){
        if(!_fileIni(file)){return false}
        if(typeof file==="object"){
            let res="";
            let l=file.parameter.length;
            for(let i=0; i<l ;i++){
                if(file.parameter[i]===";"){
                    res+=";"+file.value[i][0];
                }else if(file.parameter[i]!==""){
                    res+=file.parameter[i]+"="+file.value[i][0]+((file.value[i].length===2)?";"+file.value[i][1]:"");
                }
                res+=""+((i+1===l)?"":"\n");
            }
            fs.writeFileSync(dir, res);
            return true;
        }else if(typeof file==='string'){
            fs.writeFileSync(dir, file);
            return true;
        }
        return false;
    }
};
