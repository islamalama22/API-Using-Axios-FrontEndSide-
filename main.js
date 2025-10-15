
const loader=document.querySelector((".loader"));

const getUsers = async (page) => {
    const limit = 5; // how many users per page
    const skip = (page - 1) * limit; // 🔍 why: skip = how many users to "skip" before starting this page (pagination math)

    const response = await axios.get(`http://ums12.runasp.net/api/users?limit=${limit}&skip=${skip}`); 
    // 🔍 why: limit=5 → get 5 users per page, skip controls which page

    if (response.status === 200) return response; 
    // 🔍 why: only return data if the response is successful (status code 200)
};


const displayUsers = async (page = 1) => {
    try{

    loader.classList.remove("d-none");

    const response = await getUsers(page); // 🔍 why: call the API and get the current page of users
    if (!response) return;

    let result = "";
    const users = response.data.users;
    const totalCount = response.data.totalCount;
    const limit = 5;
    const numberOfPages = Math.ceil(totalCount / limit); 
    // 🔍 why: divide total users by how many per page → round up to get all pages

    console.log(numberOfPages); // 🔍 why: log total number of pages for debugging

    // 🔍 why: map users to table rows
    result = users
        .map((user) => {
            return `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.age}</td>
                <td>${user.email}</td>
                <td><img src="${user.imageUrl}" width="200px" /></td>
                <td>
                    <a href='./detasil.html?user_id=${user.id}' class="btn btn-outline-dark">detasils</a>
                    <button class="btn btn-outline-danger" onclick=deleteUser(event,"${user.id}")>delete</button>
                </td>
            </tr>`;
        })
        .join("");

    // 🔍 why: embed the HTML by JS
    document.querySelector(".user_data").innerHTML = result;

    // 🔍 why: Call the pagination function separately
    renderPagination(page, numberOfPages);
     
    }catch(err){
console.log(err);
    }finally{//  when we  used  the  finally  
            loader.classList.add("d-none");

    }
};


const renderPagination = (currentPage, totalPages) => {
    let pagintationLink = ``;

    // 🔍 why: show "Previous" button only if not on the first page
    if (currentPage > 1) {
        pagintationLink += `<li class="page-item">
            <button class="page-link" onclick="displayUsers(${currentPage - 1})">Previous</button>
        </li>`;
    } else {
        pagintationLink += `<li class="page-item">
            <button class="page-link" disabled>Previous</button>
        </li>`;
    }

    // 🔍 why: show first, last, and nearby pages
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            pagintationLink += `<li class="page-item ${i === currentPage ? "active" : ""}">
                <button class="page-link" onclick="displayUsers(${i})">${i}</button>
            </li>`;
        } else if (i === 2 && currentPage > 3) {
            pagintationLink += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
        } else if (i === totalPages - 1 && currentPage < totalPages - 2) {
            pagintationLink += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
        }
    }

    // 🔍 why: "Next" button logic
    if (currentPage < totalPages) {
        pagintationLink += `<li class="page-item">
            <button class="page-link" onclick="displayUsers(${currentPage + 1})">Next</button>
        </li>`;
    } else {
        pagintationLink += `<li class="page-item">
            <button class="page-link" disabled>Next</button>
        </li>`;
    }

    // 🔍 why: embed pagination buttons in HTML
    document.querySelector(".pagination").innerHTML = pagintationLink;
};


// 🔍 why: confirm delete with SweetAlert, then refresh data
//  used  event  thet  send  from  the when  delete  clike  to  btton  clike  
//  the  event  its help  me  to  now  which , elemt  i  clike  in  ?  
const deleteUser = (event,id) => {

    console.log(event.target.closest('tr'));


    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
        if (result.isConfirmed) {
            const response = await axios.delete(`http://ums12.runasp.net/api/users/${id}`);
            if (response.status === 200) {
                //  its  remove  the  html  tr  from  screan but  not  delet  it  fron  db 
                //  when  its call  anothere  page  it  will  update  the db  , but  in same  bage  will be  hidden  
                event.target.closest('tr').remove();
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                });

                // re-fetch users from API after delete (refresh the data)
                //  the  problem hear  with  each  date  for  user  it  will  call  all  the fun of  display  
                //  and  send  a  respons  which  is  need time  
               // displayUsers();


               // solution  1 : when the  user  is delete a user  ,  i  will  say  to  backedn  
               //  send  a  now  data  after  delet  as  response  but  this  is  a  problem  becouse  the response e will be  large

               //  solution  2 : by  js  there is   a  fun  remove which  is  can delete  a  html  elemnt  
               


            }
        }
    });
};


// 🔍 why: automatically load and display first page when the page starts
displayUsers();
