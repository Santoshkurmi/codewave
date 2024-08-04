

function setToken(token:string){
    localStorage.setItem("token",token);
}

function getToken(){
    return localStorage.getItem("token");
}

export {setToken,getToken}