const formEl = document.querySelector('#singupForm');
const idEl = document.querySelector('#signupId');
const passwordEl = document.querySelector('#signupPassword');

/*유저가 있는지 검증 */
const isUserExist = (newUserId) => {
    const users = localStorage.getItem('userList');/*userList로 키 참조*/

    if(!users) return false; /*결과 없을 때 */

    const convertedUsers = JSON.parse(users); /*json형태의 객체로 변환 */
    const getExistUsers = convertedUsers.find(user => user.id === newUserId);

    /*{
        id,
        password
    } 들어오는 객체의 형태*/

    return getExistUsers ? true : false; 
};

const registerUser = (userInfo) => {
    /**새로 등록하려는 유저가 존재하는지 판단하기위해 정보갖고옴 
     * userList먼저 가져오고 JSON형태로 파싱
    */
    const currentUsers=JSON.parse(localStorage.getItem('userList'));

    if( !currentUsers){
        /*유저가 없으면 암궛도 없다는거니까 */
        const newUserList = [];
        newUserList.push(
            {
                id: userInfo.id,
                password: userInfo.password,
            });
            /**localStorage는 항상 string형태로 해야함 ->newUserList가 string형태로 파싱됨
             * key-userList로, value- */
            localStorage.setItem('userList', JSON.stringify(newUserList));
    } else{
        const updatedUsers = currentUsers.concat({
            id: userInfo.id, 
            password: userInfo.password,
        });
        //concat은 새로운 객체 반환환 (concat이랑 push차이)
        
        localStorage.setItem('userList', JSON.stringify(updatedUsers));
    }
    /*userList가 localStorage에 존재하는 경우 ->isUserExist사용 */
};

const init = () => {
    //일급객체의 특성 파라미터 안에 함수로 넣을 수 있는거
    formEl.addEventListener('submit', (e) => {
        e.preventDefault();//새로고침 막음


        const idValue = idEl.value; 
        const passwordValue = passwordEl.value;

        console.log(idEl.value)
        //user가 있는지 없는지 판단-회원가입을 하려는 id가 있는지 판단
        if(isUserExist(idValue)){
            alert(`${idValue} 유저는 이미 존재합니다!`);
            idEl.value = '';
            passwordEl.value = '';
            return;
        }

        //유저가 회원가입이 가능하다면 이후 코드
        registerUser({id: idValue, password: passwordValue});
        alert('회원가입 완료');
        location.href='./signin.html';
    });
}; //init은 어디서부터 시작인지 알기위해 나눔

document.addEventListener('DOMContentLoaded', init); //init호출 -> init함수 순차적으로 진행

