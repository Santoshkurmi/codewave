

function setToken(token:string){
    localStorage.setItem("token",token);
}

function getToken(){
    // alert(localStorage.getItem('token'))
    return localStorage.getItem("token");
}

function getUser(){
    return localStorage.getItem('user_id');
}
function setUserXYZ(user:string){
    return localStorage.setItem('user_id',user);
}


export {setToken,getToken,setUserXYZ,getUser}