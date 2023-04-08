const formEl = document.querySelector('#loginForm');
const idEl = document.querySelector('#idInput');
const passwordEl = document.querySelector('#passwordInput');

const checkLogin = (id, password) => {
    const userList = localStorage.getItem('userList');

    if(!userList) return false; //userList를 아예 찾을수 없는 경우

    const convertToJson = JSON.parse(userList); //문자열 json형식으로 파싱

    const coincedUser = convertToJson.find(user => user.id ===id && user.password ===password);//파라미터로 받은 id와 일치하는지

    return coincedUser ? true : false; //일치하는 유저가 있을 때는 true, 없으면 false

};
//로그인 판단 로직
const isLogined = () => {
    return localStorage.getItem('login') ? true : false; //값이있어서 로그인이 되면 true 아니면 false

};

const init = () => {
    if(isLogined()){
        alert('이미 로그인 되어있습니다!'); //로그인이 되어있는 경우
        location.href='./index.html';
        return;//아래 코드들 실행 못하게 return으로 끊음
    }

    //로그인이 안되었을 때 로직
    formEl.addEventListener('submit', (e) => {
        e.preventDefault()//submit은 새로고침 이벤트가 발생하므로 

        const isSuccess = checkLogin(idEl.value, passwordEl.value);

        if(isSuccess){
            alert('로그인 성공!');
            //로그인되면 localStorage에 저장
            localStorage.setItem('login', JSON.stringify(idEl.value)); //login을 키값으로
            location.href='./index.html';
        } else{
            //isSuccess가 아닌경우
            alert('실패!');
            idEl.value='';
            passwordEl.value='';
        }
    });
};


document.addEventListener('DOMContentLoaded',init);