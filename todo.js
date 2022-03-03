const toDoForm = document.querySelector(".toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector('.toDoList');

const TODOS_LS = "";

let toDos = [];


function deleteToDo(e) {
    const btn = e.target;
    const li = btn.parentNode; // li는 btn의 부모태그이므로
    toDoList.removeChild(li);

    //id 값이 같지 않은 값을 반환한다
    const cleanToDos = toDos.filter(toDo => {
      return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
  }

function saveToDos(){ 
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
    console.log(toDos);
}

function paintToDo(text){
    const li = document.createElement("li"); // ul 태그 아래에 추가할 li 태그
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length+1;

    /*ul 자식에 li 태그를 삽입 */
    li.id = newId;
    li.appendChild(span);
    li.appendChild(delBtn);
    toDoList.appendChild(li);

    /* 삭제 버튼 및 text 설정*/
    delBtn.innerText = "삭제";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = newId + ". " + text;


    /*로컬 스토리지에 객체를 넣는다*/
    const toDoObj = { 
        id : newId,
        text : text
        
    };

    toDos.push(toDoObj);
    saveToDos();
    
}


function loadToDos(){ 
    const loaded = localStorage.getItem(TODOS_LS);
    if(loaded !== null){
        const parsedToDos = JSON.parse(loaded);
        parsedToDos.forEach(todo => {
            paintToDo(todo.text);
        });
    }
}

function submitForm(e){
    e.preventDefault(); //undefined 해결 ?
    const curValue = toDoInput.value; //submit 된 데이터의 value로 치환
    paintToDo(curValue); 
    toDoInput.value=""; //초기화
}

function init(){ 
    loadToDos();
    toDoForm.addEventListener("submit", submitForm);
}

init();