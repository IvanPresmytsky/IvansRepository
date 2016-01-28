var list = []; // array of the notes
var totalItemsCount = 0; // notes quantity
var newListItemId = 0;  // var for notes id creating
var filter = 'All'; // (Active, Completed) var for filter behavior
var todos = document.getElementById('list-container');
var listFooter = document.getElementById('footer');
var noteList = document.getElementById('list');
var display = document.getElementById('list-display');
var checkAllBtn = document.getElementById('checK-all-btn');
var delAllCheckedNotes = document.getElementById('del-checked-items-btn');


// This function add notes to notes array
function addToList () {
  newListItemId++;
  var newListItem = new Object();
  newListItem.id = newListItemId;
  newListItem.content = getDisplayvalue();

  newListItem.marcup = formListMarcup(newListItem.content, newListItemId);
  
  list.push(newListItem);
  totalItemsCount = list.length;
}


function getDisplayvalue () {
 return document.getElementById('list-display').value;
}

function clearDisplay () {
  document.getElementById('list-display').value = null; 
}


// This function make marcup for visual "todos" notes
// arguments: content - content of the note, value - value of the checkbox
function formListMarcup (content, value) {
  var listMarcup = '<div class="list-item__visible-block"> \
                     <input class="list-item__checkbox" type="checkbox" id="checkbox'+ value +'" name="note-checkbox" value="'+ value +'"/> \
                     <label class="list-item__text">' + content + '</label> \
                     <button class="list-item__del-btn  del-current-list-item">X</button>\
                   </div> \
                   <input type="text" class="list-item__edit-text"/>'
                  
  return listMarcup;              
}


// This function renders adddition and removing of notes
// adds actionlisterners for checkboxes, del-buttons, delAllCheckedNote button and checkAllBtn
function addToListVisual () {
  noteList = document.getElementById('list');
  var listItem = document.createElement('LI');
  
  listItem.id = newListItemId;
  listItem.classList.add('list-item-container__list-item', 'active');
  listItem.innerHTML = list[(list.length-1)].marcup;
  noteList.appendChild(listItem);
  
  checkForItemsAvailability();
}

// This function removes notes from notes array
function deleteFromList (id) {
  list = list.filter(function activeFilter(item) {
    return item.id != id;
  });
 totalItemsCount = list.length; 
 checkForItemsAvailability();
}

// This function renders filtred notes
function renderingFiltredList () {
  var listItems = document.querySelectorAll('.list-item-container__list-item');
  var activeItems = document.querySelectorAll('.active');
  var comletedItems = document.querySelectorAll('.completed');
  
  function displayItems (items, state) {
    for (var i = 0, l = items.length; i < l; i++) {
      (function (j) {
        items[j].style.display = state;
      })(i);
    }
  }
  
  if (filter === 'All') {
    displayItems(listItems, 'block');
  } else if (filter === 'Active') {
    displayItems(comletedItems, 'none');
    displayItems(activeItems, 'block');
  } else if (filter === 'Completed') {
    displayItems(activeItems, 'none');
    displayItems(comletedItems, 'block');
  } 
}


// This function checks for availibility of notes and adds "footer" and "checK-all-btn"
function checkForItemsAvailability () {
  listFooter = document.getElementById('footer');
  var listItemCounter = document.getElementById('counter');

  if (totalItemsCount === 0) {
    listFooter.style.display = 'none';
    checkAllBtn.style.visibility = 'hidden';
  } else {
    listFooter.style.display = 'block';
    checkAllBtn.style.visibility = 'visible';
    listItemCounter.innerHTML = totalItemsCount;
  }
}


// This function checks for checboxes checking and adds behavior for them
// args: item - parent note-block, checkbox - note checkbox, label - note checkbox label
function checkForChecked (item, checkbox, label) {
  if (checkbox.checked) {          
     label.style.color = 'red';

     if (filter === 'active') {
       item.style.display = 'none';
     }

     item.classList.add('completed');
     item.classList.remove('active');
            
     } else {
     label.style.color = 'black';

     if (filter === 'completed') {
       item.style.display = 'none';
      }
          
      item.classList.add('active');
      item.classList.remove('completed');    
  }
  
  if (checkForCheckedCheckboxes()) {
    delAllCheckedNotes.style.visibility = 'visible';
  } else {
    delAllCheckedNotes.style.visibility = 'hidden';
  }
}

// This function checks for only one of checboxes is checking and return boolean
function checkForCheckedCheckboxes () {
  var checkboxes = document.querySelectorAll('.list-item__checkbox');
  checkboxes = Array.prototype.slice.call(checkboxes);
  var checkboxChecked = checkboxes.some(function (item) {
    return item.checked === true;
  });

  return checkboxChecked;
}


noteList.addEventListener('dblclick', function activeNoteEditor (event) {
  var target = event.target;

  if (!target.classList.contains('list-item__text')) {
    return;
  }
  
  var note = target.parentNode.parentNode;
  var noteVisibleContainer = target.parentNode;
  var noteEditor = note.querySelector('.list-item__edit-text');
  var noteLabel = note.querySelector('.list-item__text');

  noteEditor.value = noteLabel.innerHTML;
  noteVisibleContainer.style.display = 'none';
  noteEditor.style.display = 'block';
  noteEditor.focus();
});

todos.addEventListener('blur', function focusLost(event) {
  var target = event.target;
  if(!target.classList.contains('list-item__edit-text')){
    return;
  } else {
    var note = target.parentNode;
    var noteLabel = note.querySelector('.list-item__text');
    var noteVisibleContainer = note.querySelector('.list-item__visible-block');
    noteLabel.innerHTML = target.value;
    
    for( var i = 0, l = list.length; i < l; i++) {
      if(list[i].id === note.id) {
        list[i].content = target.value;
      }
    }
    
    target.style.display = 'none';
    noteVisibleContainer.style.display = 'block';
  }

}, true);

todos.addEventListener('change', function (event) {
  var target = event.target
  
  if (target.classList.contains('list-item__checkbox')) {
    var note = target.parentNode.parentNode;
    var noteLabel = note.querySelector('.list-item__text');
    checkForChecked(note, target, noteLabel);
    
  } else if (target.id === 'checK-all-btn') {
    var checkingItems = noteList.querySelectorAll('.list-item-container__list-item');
      for (var i = 0, l = checkingItems.length; i < l; i++) {
        (function(j) {
          var checkingItem = checkingItems[j];
          var checkingItemLabel = checkingItem.querySelector('.list-item__text');
          var checkingItemCheckbox = checkingItem.querySelector('.list-item__checkbox');
          if (target.checked === true) {
            checkingItemCheckbox.checked = true;
          } else {
            checkingItemCheckbox.checked = false;
          }
          checkForChecked(checkingItem, checkingItemCheckbox, checkingItemLabel);
        })(i);
      }
    
  } else {
    return;
  }
}, false);

noteList.addEventListener('click', function(event) {
  var target = event.target;
  if (!target.classList.contains('del-current-list-item')) {
    return;
  }
  var note = target.parentNode.parentNode;
  deleteFromList(note.id);
  note.remove(note);
}); 

listFooter.addEventListener('click', function activateFilter(event) {
  var target = event.target;

  if (target.classList.contains('list-items-filter')) {
    event.preventDefault();
    filter = target.innerHTML;
    renderingFiltredList();
  } else if (target.id === 'del-checked-items-btn') {
    var comletedItems = document.querySelectorAll('.completed');
    console.log(comletedItems);
    for (var i = 0, l = comletedItems.length; i < l; i++) {
     (function(j) {
       var comletedItem = comletedItems[j];
       deleteFromList(comletedItem.id);
       comletedItem.remove(comletedItem);    
      })(i);
    }
  } else {
    return;
  }
  
}, false);


todos.addEventListener('keyup', function(event) {
  var target = event.target;
  var enterKey = (event.keyCode === 13);
  var spaceKey = (event.keyCode === 32);
  
  if ((target.id === 'list-display'||target.classList.contains('list-item__edit-text')) && spaceKey && (target.value[0] === ' ')) {
    target.value = null;
  } 
  if (target.id === 'list-display' && enterKey && target.value) {
    addToList();
    addToListVisual();    
    clearDisplay();
  } else if (target.classList.contains('list-item__edit-text') && enterKey && target.value) {
    target.blur();
  } else {
    return;
  }
}, false);