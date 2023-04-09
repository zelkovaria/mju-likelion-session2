const todoContainerEl = document.querySelector("#todoContainer");
const todoInputEl = document.querySelector("#todoInput");
const todoButtonEl = document.querySelector("#todoButton");
const logoutButtonEl = document.querySelector("#logoutButton");

//로그인이 되어있냐
const isLogin=() => {
    const loginedUser = localStorage.getItem('login');//localStorage에서 키가 login
    if (!loginedUser){
        alert('로그인이 필요합니다');
        location.href = './signin.html;'
    }
};
//updateComplete() 함수를 호출하여 체크 여부를 업데이트
//-> 이후에 다시 readTodo() 함수를 호출하여 변경된 todo list를 다시 렌더링
const updateComplete = (id, completed) => {
    const todos = JSON.parse(localStorage.getItem('todos'));
    const todoIndex = todos.findIndex(todo => todo.id === id);
    todos[todoIndex].complete = completed;
    localStorage.setItem('todos', JSON.stringify(todos));
  };

/*localStorage에 read하면 모든 값을 다 읽어오게됨
-> create하면 해당 내용들 다 복사하고 comcat을 통해 추가함 */
const readTodo = () => {
    todoContainerEl.innerHTML = '';//다 날리고 가져올거니까
//todo를 가져올때 arr, rever(뒤집어서) 갖고오는 경우가 있음
    const todos = JSON.parse(localStorage.getItem('todos')).reverse();//reverse앞까지는 배열로 나오게됨

    todos.forEach(todo => {
        const divEl = document.createElement('div');
        const completeEl = document.createElement('input');
        const userEl = document.createElement('p');
        const deleteEl = document.createElement('button');

        const contentEl = document.createElement('label');

        divEl.className = 'todoItem';

        completeEl.type='checkbox';
        completeEl.className='checkbox';
        completeEl.id=todo.id; //현재 forEach문에 있는 todo
        completeEl.addEventListener('click', () => {
            updateComplete(todo.id, completeEl.checked);
        });
        completeEl.checked = todo.complete;

        deleteEl.type = 'button';
        deleteEl.textContent ='X';
        deleteEl.className = 'deleteButton';
        deleteEl.addEventListener('click', () => deleteTodo(todo.id));

        contentEl.textContent=todo.content;
        contentEl.htmlFor = todo.id; //labelFor속성에 체크박스에 있는 id와 맞추게되면 
        //라벨선택시 체크박스 선택됨 아니어도 체크박스가 되어야하는걸 ui적으로 개선하기위함

        userEl.textContent=todo.user; 

        divEl.append(completeEl, contentEl, userEl, deleteEl);
        todoContainerEl.append(divEl);
    })
    ;
};

  
const createTodo = () => {
    const todoText = todoInputEl.value; //내가 체크리스트로 입력하는 값을 가져옴
    /*
    [
     {내용} , {내용}  
    ] 꼴의 형태로 저장됨*/
    const todos = JSON.parse(localStorage.getItem('todos'));
    const newId = todos.length > 0?todos[todos.length - 1].id+1 : 1;//질문하기
    //length가 0이상이면 맨 마지막todo에 있는 id를 보고 그 아이디에 +1한 것을 newId에 넣음
    //해당 객체 자체의 id는 내가 회원가입한 id랑 다름

    const newTodo= {
        id: newId, 
        complete: false, 
        content: todoText,
        user: JSON.parse(localStorage.getItem('login')), //localstorage에 login되어있는 user의 정보 참고
    };

    todos.push(newTodo);

    localStorage.setItem('todos', JSON.stringify(todos));

    todoInputEl.value=''; //다음것을 입력해야하니까 초기화를 해줌

    //다 날리고 다시 그림
    readTodo();
};

const logout = () => {
    localStorage.removeItem('login');
    alert('로그아웃!');
    location.href='./signin.html';
};

const deleteTodo = (deleteId) => {
    const todos = JSON.parse(localStorage.getItem('todos'));
    const filterdTodos = todos.filter( (todo) => todo.id !== deleteId); //해당되는 값이 아닌것을 거르고 나서 저장

    localStorage.setItem('todos', JSON.stringify(filterdTodos)); 

    readTodo();
};

const init = () => {
    isLogin(); //로그인 되어있는지 확인
    console.log('dd');
    if(!localStorage.getItem('todos')){
        localStorage.setItem('todos',JSON.stringify([]));//localStorage에 아이템이 없는 경우
    }
    //예외처리
    console.log('dd');

    //로그인이 되어있음
    readTodo();

    todoButtonEl.addEventListener('click', createTodo);
    logoutButtonEl.addEventListener('click', logout);
};

document.addEventListener('DOMContentLoaded', init);