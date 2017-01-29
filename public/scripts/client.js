$(function(){
  console.log('JQ is here!');

  getTasks();

  // listen for events on the form
  $('#task-form').on('submit', addTask);
  $('#task-list').on('click', '.save', updateTask);
  $('#task-list').on('click', '.delete', deleteTask);
  $('#task-list').on('click', '.complete', completeTask);

});

function getTasks() {
  $.ajax({
    url: '/tasks',
    type: 'GET',
    success: displayTasks
  });
}

function displayTasks(tasks) {
  console.log('Tasks from the server', tasks);

  $('#task-list').empty();

  tasks.forEach(function(task){
    //appending input fields and buttons to the form
    var $li = $('<li></li>');

    var $form = $('<form></form>');


    $form.append('<input type="text" name="title" value="' + task.title + '"/>');
    $form.append('<input type="text" name="description" value="' + task.description + '"/>');
    $form.append('<input type="text" name="location" value="' + task.location + '"/>');

    // ISO format: yyyy-mm-ddThh-mm-ssZ
    // desired format:  yyyy-mm-dd
    var date = new Date(task.creation_date).toISOString().slice(0,10);
    $form.append('<input type="date" name="created" value ="'+ date + '"/>');


    var $saveButton = $('<button class="save">Save</button>');
    $saveButton.data('id', task.id);
    $form.append($saveButton);

    var $deleteButton = $('<button class="delete">Delete</button>');
    $deleteButton.data('id', task.id);
    $form.append($deleteButton);


    var color = "red";
    console.log(task.completion_status);
    if(task.completion_status == 'true'){
      color = "green";
    }
    var $completeButton = $('<button id = "'+task.id+'" class="complete" data-status = "'+task.completion_status+'" style ="background-color: '+color+'">Complete</button>');
    $completeButton.data('id', task.id);
    $form.append($completeButton);

    $li.append($form);
    $('#task-list').append($li);
  });
}

function addTask(event) {
  // prevent browser refreshing
  event.preventDefault();

  // get the info from the form
  var formData = $(this).serialize();
  console.log(formData);
  // send data to server
  $.ajax({
    url: '/tasks',
    type: 'POST',
    data: formData,
    success: getTasks
  });
}

function updateTask(event) {
  event.preventDefault();

  var $button = $(this);
  var $form = $button.closest('form');

  var data = $form.serialize();

  $.ajax({
    url: '/tasks/' + $button.data('id'),
    type: 'PUT',
    data: data,
    success: getTasks
  });
}

function deleteTask(event) {
  event.preventDefault();
  $.ajax({
    url: '/tasks/' + $(this).data('id'),
    type: 'DELETE',
    success: getTasks
  });
}

function completeTask(event) {
  event.preventDefault();
  var completionStatus = $(this).data('status');
  var data={};
  if(completionStatus === true){
    data.completion_status=false;
  }else{
    data.completion_status=true;
  }

  $.ajax({
    url: '/completionStatus/' + $(this).data('id'),
    type: 'PUT',
    data:data,
    success: getTasks
  });
}
