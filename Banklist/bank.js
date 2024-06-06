' USE STRICT '

let box = document.getElementsByClassName('box');

const loanamount = document.getElementById('amount-requested').value ; 

let userbalance = document.getElementsByClassName('amount-info')[0];
let date = document.getElementsByClassName('current-date')[0];
let movements = document.getElementsByClassName('statements')[0];
let username;


box[0].style.display = 'none';
let users = {
    DhruvPatel:{
        username : "DhruvPatel",
        password : "1234",
        Balance : 15000,
        getstatements : [+100, -150 , -563, 600 , -800 , 16000 , -4000 , -30 , 20 ,-150 , +400 , -10, +674,],
        intersetrate : 7,
    },

    Kathanshah: {
        username : "Kathanshah",
        password : "1234",
        Balance : 25000,
        getstatements : [ 100, -150 , +400 , -10, +674, -563],
        intersetrate : 5,
    }

};

function updatestatements(user)
{
    document.querySelectorAll('.stat').forEach(element => {
        element.remove();
    })
    user.getstatements.slice(-10).forEach(function(element){
        let type  = element > 0 ? 'credit' : 'debit';
        let html = `
        <div class="stat">
         <div class = 'all'>
            <div class="type ${type}">${type} </div>
            <div><span> ${new Date().toDateString()}</span></div>
         </div>
            <div class="val" style= 'font-size:1.5rem;font-weight:10px;'>${element}</div>
        </div>`;

        movements.insertAdjacentHTML('afterbegin',html);
    });
    console.log(movements);
}

function calculate(xyz){
    let user = getuser(username);
    user.Balance = user.Balance + xyz;
    updatepage(user);
}
function getuser(username)
{
    return users[username];
}

function updatepage(user){
    userbalance.innerHTML = `${user.Balance}`;
    fetchdate();
    updateninterest();
}

function updateninterest(){
    const inn = document.getElementsByClassName('in')[0];
    const out = document.getElementsByClassName('out')[0];
    const interest = document.getElementsByClassName('interest')[0];
    user = getuser(username);
    const deposits = user.getstatements.filter(function(ele){
        if(ele>0)
        {
            return ele;
        }
    });
    const credits = user.getstatements.filter(function(ele){
        if(ele <= 0)
        {
            return ele;
        }
    });
    
    inn.textContent = deposits.reduce(
        function(acc,ele,i,arr){ 
            
                return Number(acc)+Number(ele);
            
    },0);

    
    out.textContent = credits.reduce(function(acc,ele,i,arr){ 
            
        return acc+ele;
    
    },0);

    interest.textContent = (Number(user.Balance)*Number(user.intersetrate))/100;
}

function fetchdate()
{
    date.innerHTML = new Date().toDateString();
}

function checkuser(){
    username = document.getElementById('username').value;
    let password = document.getElementById('password').value;



    if(users[username] && users[username].password == password)
    {
        let user = getuser(username);
        box[0].style.display = 'flex';
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        document.getElementsByClassName('name')[0].textContent = `${username}`;
        updatepage(user);
        updatestatements(user);

    }


}

function transfer()
{
    const user = getuser(username);  
    const transferto = document.getElementById('transferto').value;
    const transferamount = document.getElementById('amountotransfer').value ;  
    user.getstatements.push(-transferamount);
    console.log(user)
    getuser(transferto).getstatements.push(transferamount);
    updatestatements(user);
    document.getElementById('transferto').value = '';
    document.getElementById('amountotransfer').value = ''; 
    calculate(-transferamount); 
}

function request(){
    const user = getuser(username);
    const x = document.getElementById('amount-requested').value;
    user.getstatements.push(x);
    document.getElementById('amount-requested').value = '';
    updatestatements(user);
    calculate(Number(x));

}

function close(){

    const closeuser = document.getElementById('userid').value;
    const closepin = document.getElementById('userpin').value; 
    if(users[closeuser] && users[closeuser].username == closeuser && users[closeuser].password == closepin)
    {
        users.remove(closeuser);
    }
}
