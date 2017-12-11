var arr;

function setTasks(data) {
  clearTasks();
  var obj = data.val();
  arr = Object.keys(obj).map(function (key) { return obj[key]; });
  console.log(arr);
  updateTasks();
}

function clearTasks(){
  var lis = document.querySelectorAll('#myUL li');
  for(var i=0; li=lis[i]; i++) {
      li.parentNode.removeChild(li);
  }
}

function updateTasks() {
  for(var i = arr.length - 1; i>=0; i--){
    newElementFromDB(arr[i].description);
  }
}

function updateTasksInCategory(uid) {
  clearTasks();
  var commentsRef = firebase.database().ref("tasks/"+ category +"/" + uid);
  commentsRef.on('value', function(data) {
    if(data.val() === undefined || data.val() === null){
      clearTasks();
   }else{
     setTasks(data);
   }

  });
}

function sum(a,b){
  return a+b;
}

var category = "Личные";
function setCategory(name) {
  category = name;
   return category;
}


function deleteElement(task) {
  var i =0;
  while(i < arr.length && arr[i].description !== task){
    i++;
  }
  firebase.database().ref("tasks/" + category + "/" + firebase.auth().currentUser.uid +"/" + arr[i].key).remove();
}

function newElementFromDB(task) {
//  alert("С именем");
  var li = document.createElement("li");
  var inputValue = task;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
      deleteElement(div.textContent.substring(0, div.textContent.length - 1));
    }
  }
}

function newElement() {
  var inputValue = document.getElementById("myInput").value;
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    var userId = firebase.auth().currentUser.uid;
    var ref = firebase.database().ref("tasks/" + category + "/" + userId);
    console.log('addData',window.user.email);

    var newPostRef = ref.push().key;
    firebase.database().ref("tasks/" + category + "/" + userId +"/" + newPostRef).set({
        description: inputValue,
        key: newPostRef
    });
    //  console.log('newPost',newPostRef);
  }


}
