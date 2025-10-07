
//  bothe  of them  return same  data  
//const createUserForm=document.querySelector(".createUserForm");
const createUserForm = document.querySelector(".createUserForm");
const previewImage = document.querySelector("#prieviwe");

createUserForm.image.addEventListener('change', () => {
    //  it  will  return  a  obj  of  files
    const file = createUserForm.image.files[0];

    ///  read  the file  
    const reader = new FileReader();
    reader.readAsDataURL(file);

    //  when  the  read is  load 

    reader.addEventListener("load", (e) => {
        previewImage.setAttribute("src", e.target.result);
      });


});


createUserForm.addEventListener("submit", async (e) => {
    //  alwyes  in submit  must  used  the  prevent
    e.preventDefault();


    //  the  data is  with  file  so  must  be  formdata
    //  it  will  take all  the  inputs by  the  attrebut of  name  in html  ,  so  its  better  to  give  it name  same  as  backend
    const formData = new FormData(createUserForm);

    //  to  see  the  data in  formdata  must  do  loop  in it 
    //  there  is  :  value  which is  the input  of  user  
    //  there  is :   key which  is  the name  ,  email,pass
    formData.forEach((value, key) => {
        console.log(`key : ${key}, value : ${value}`);
    })


    const respones = await axios.post("http://ums12.runasp.net/api/users", formData);

    if (respones.status == 200) {

        location.href = 'index.html';
        console.log("  the  creat  is  done  and  go  to  index.html");
    }
    console.log(respones);

});
















const JS_HELP = {
    console: {
        log() { }, warn() { }, error() { }
    },
    window: {
        alert() { }, prompt() { }, confirm() { }, setTimeout() { }, setInterval() { }, clearTimeout() { }, clearInterval() { }
    },
    document: {
        getElementById() { }, getElementsByClassName() { }, getElementsByTagName() { }, querySelector() { }, querySelectorAll() { },
        createElement() { }, createTextNode() { }, appendChild() { }, removeChild() { }, replaceChild() { }, addEventListener() { }, removeEventListener() { },
        getAttribute() { }, setAttribute() { }, classList: { add() { }, remove() { }, toggle() { }, contains() { } }, innerHTML() { }, textContent() { }
    },
    Array: {
        isArray() { }, from() { }, prototype: {
            map() { }, forEach() { }, filter() { }, reduce() { }, find() { }, findIndex() { }, includes() { }, push() { }, pop() { }, shift() { }, unshift() { }, sort() { }, reverse() { }
        }
    },
    String: {
        prototype: { split() { }, join() { }, trim() { }, includes() { }, startsWith() { }, endsWith() { }, indexOf() { }, replace() { }, toUpperCase() { }, toLowerCase() { } }
    },
    Math: { random() { }, floor() { }, ceil() { }, round() { }, max() { }, min() { } },
    Date: { now() { }, prototype: { getDate() { }, getMonth() { }, getFullYear() { } } },
    Promise: { then() { }, catch() { }, finally() { } },
};
