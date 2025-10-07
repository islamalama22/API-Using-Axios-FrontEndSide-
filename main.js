  const getUsers = async () => {
    //  the  api  is  for  get  user  
    const response = await axios.get("http://ums12.runasp.net/api/users");
    //  the  strucure  of  data  get  it  from  the  respones 
    console.log("response.data   :");
    console.log(response.data);
    //  to  be  public  make  it  let  and out  sid the  if 
    let result = "";
    if (response.status == 200) {
        // 
        result = response.data.users

        //  
            .map((user) => {
                return `
             
            <tr>
                 <td> ${user.id}</td>
                 <td> ${user.name}</td>
                 <td> ${user.age}</td>
                 <td> ${user.email}</td>
                 <td> <img src="${user.imageUrl}" width="200px" />   </td>

                <td> 
                  <a href='./detasil.html?user_id=${user.id}' class="btn btn-outline-dark"> detasils</a>
                   <button class="btn btn-outline-danger " onclick=deleteUser("${user.id}") > delete</button>
                </td>

            </tr> `;
            })
            .join("");
    }//  to  emmbeded  the  html  by  js  
    document.querySelector(".user_data").innerHTML = result;
};

getUsers();


//  accepted  id  =user.id from  the  linke  when  clike
const deleteUser = (id) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
        if (result.isConfirmed) {
            //  the  api  end  point  for  delete  must  send  the id  
            //  the  method  is  delete 
            const response = await axios.delete(`http://ums12.runasp.net/api/users/${id}`);
            if (response.status == 200) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });

                getUsers();
            }


        }
    });
};



