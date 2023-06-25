 const todoInput = document.querySelector('.todo-input');
 const todoButton = document.querySelector('.todo-button');
 const todoList = document.querySelector('.todo-list');
 const filterOption = document.querySelector('.filter-todos');


todoButton.addEventListener('click',addtodo);
todoList.addEventListener('click', checkRemove);
filterOption.addEventListener('click', filterTodos);
document.addEventListener('DOMContentLoaded',getLocalTodos);


 function addtodo(e) {
    e.preventDefault();
   //  console.log(e);
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    const newTodo =`
    <li>${todoInput.value}</li>
                <span class="check"> # </span>
                <span class="trash"> $ </span>
                <span class="edit">  @ </span>`;
    todoDiv.innerHTML= newTodo;
    todoList.appendChild(todoDiv);
    saveLocalTodos(todoInput.value);
    todoInput.value = "";

 }

 function checkRemove(e) {
   const classList = [...e.target.classList]
   const item = e.target;
   // console.log(item.parentElement.parentElement)

   if (classList[0] === 'check'){
      const todo = item.parentElement;
      todo.classList.toggle('completed');

   } else if (classList[0] === 'trash') {
      const todo = item.parentElement;
      removeLocalTodos(todo);
      todo.remove();

   } else if (classList[0] === 'edit') {
      
   }
 }

 function filterTodos(e) {
   // console.log(e.target.value);
   // console.log(todoList.childNodes);
   const todos = [...todoList.childNodes];
   todos.forEach(todo => {
      switch(e.target.value){
         case 'all':
            todo.style.display = 'flex';
            break;
         case 'completed':
            if (todo.classList.contains('completed')){
               todo.style.display= 'flex';
            } else {
               todo.style.display = 'none';
            }
            break;
         case 'uncompleted':
            if (!todo.classList.contains('completed')){
               todo.style.display= 'flex';
            } else {
               todo.style.display = 'none';
            }
            break;
      }
   })
 }

function saveLocalTodos(todo){
   // localStorage.getItem('todos');
   // localStorage.setItem('todos',JSON.stringify(todos));  

   let savedTodos = localStorage.getItem('todos')
      ? JSON.parse(localStorage.getItem('todos'))
      : [];

   savedTodos.push(todo);
   localStorage.setItem('todos',JSON.stringify(savedTodos));
}

function getLocalTodos(todo){

   let savedTodos = localStorage.getItem('todos') ?
      JSON.parse(localStorage.getItem('todos')) :
      [];

   savedTodos.forEach(todo => {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    const newTodo =`
    <li>${todo}</li>
                <span class="check"> # </span>
                <span class="trash"> $ </span>
                <span class="edit">  @ </span>`;
    todoDiv.innerHTML= newTodo;
    todoList.appendChild(todoDiv);
   })
}

function removeLocalTodos(todo){
   // console.log(todo.children[0].innerText)

   let savedTodos = localStorage.getItem('todos') ?
      JSON.parse(localStorage.getItem('todos')) :
      [];
   
   const filteredTodos=savedTodos.filter(t => t !== todo.children[0].innerText);
   localStorage.setItem('todos', JSON.stringify(filteredTodos));

}
