const UserById=async()=>{


   //  TO  GET  paramter  from  the  winodow  url  aslwys  like  this three  lins 
   const parameters=new URLSearchParams(window.location.search);
   //  get  is  the  paramter  same  name  thet  i  have  send  it  in ?
   //  its  the  para i  have  give it  a  name  and send  it  when the useer  is  clike  the  linke
   const userId=parameters.get("user_id");
  const response=await axios.get(`http://ums12.runasp.net/api/users/${userId}`);
   console.log(response);

   document.querySelector(".username").textContent=response.data.data.name;
      document.querySelector(".email").textContent=response.data.data.email;
   document.querySelector(".age").textContent=response.data.data.age;


}
UserById();