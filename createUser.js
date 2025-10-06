//  bothe  of them  return same  data  
//const createUserForm=document.querySelector(".createUserForm");
const createUserForm = document.querySelector(".createUserForm");


createUserForm.addEventListener("submit", async (e) => {
    //  alwyes  in submit  must  used  the  prevent
    e.preventDefault();


    //  name  email age  must be  same  name  as  backend  json and  the  input  name  must  be  same  aslo 
    const user = {
        Name: createUserForm.name.value,
        Email: createUserForm.email.value,
        Age: createUserForm.age.value
    }

    console.log(user);
    // api  post  to  send  the  data  thet inputs  by  user  in  form 
    //  post  fun  and  send the obj 
    const response = await axios.post("http://ums12.runasp.net/api/users", user);
    console.log(response);
})
















const JS_HELP = {
    console: {
        log(){}, warn(){}, error(){}
    },
    window: {
        alert(){}, prompt(){}, confirm(){}, setTimeout(){}, setInterval(){}, clearTimeout(){}, clearInterval(){}
    },
    document: {
        getElementById(){}, getElementsByClassName(){}, getElementsByTagName(){}, querySelector(){}, querySelectorAll(){},
        createElement(){}, createTextNode(){}, appendChild(){}, removeChild(){}, replaceChild(){}, addEventListener(){}, removeEventListener(){},
        getAttribute(){}, setAttribute(){}, classList: { add(){}, remove(){}, toggle(){}, contains(){} }, innerHTML(){}, textContent(){}
    },
    Array: {
        isArray(){}, from(){}, prototype: {
            map(){}, forEach(){}, filter(){}, reduce(){}, find(){}, findIndex(){}, includes(){}, push(){}, pop(){}, shift(){}, unshift(){}, sort(){}, reverse(){}
        }
    },
    String: {
        prototype: { split(){}, join(){}, trim(){}, includes(){}, startsWith(){}, endsWith(){}, indexOf(){}, replace(){}, toUpperCase(){}, toLowerCase(){} }
    },
    Math: { random(){}, floor(){}, ceil(){}, round(){}, max(){}, min(){} },
    Date: { now(){}, prototype: { getDate(){}, getMonth(){}, getFullYear(){} } },
    Promise: { then(){}, catch(){}, finally(){} },
};
