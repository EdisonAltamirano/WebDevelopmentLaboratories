function addTodoItem() {
    var todoItem = $("#todoText").val();
    $("#todo-list").append("<li><input type='checkbox'" + 
                           " name='todo-item-done'" + 
                           " class='todo-item-done'"+ 
                           " value='" + todoItem + "' /> " + 
                           todoItem +
                           "</li>");
    
   $("#todoText").val("");
  }
  
  function clear() {
	
    var items = $('#todo-list');
    items.fadeOut(1000, function() {
      items.remove();
    });   
  }
  function uncheck() {
	
    var items = $('.todo-item-done');
    for(let i = 0; i< items.length; i++){
      items[i].checked = false
  } 
  }
         
  function check() {
	
    var items = $('.todo-item-done');
    console.log("Pruebas");
    console.log(items);
    for(let i = 0; i< items.length; i++){
      items[i].checked = true
  }  
  }
            
  
  $(function() {
   
     $("#ButtonPost").on('click', function(e){
       e.preventDefault();
       addTodoItem()
     });
    
    $('#ButtonDelete').on('click', function(e){
       e.preventDefault();
       clear()
     });
     $('#ButtonClear').on('click', function(e){
      e.preventDefault();
      uncheck()
    });
    $('#ButtonMark').on('click', function(e){
      e.preventDefault();
      check()
    });
  });