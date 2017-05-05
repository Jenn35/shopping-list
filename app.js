
//I had a hard time with writing code for the DOM manipulation and event listners.  After spending close to 3 hours on  this assignment, I had to look at Thinkful's
//source code.  I could also use more explanation on how to choose the correct arguments for each function.  

var shoppingListState = {
  items: []
};

var listItemTemplate = (
'<li>' +
        '<span class="shopping-item js-shopping-item"></span>' +
        '<div class="shopping-item-controls">' +
          '<button class="shopping-item-toggle">' +
            '<span class="button-label"></span>' +
          '</button>' +
          '<button class="shopping-item-delete">' +
            '<span class="button-label">delete</span>' +
          '</button>' +
        '</div>' +
      '</li>'
);



function addItem(shoppigListState, item) {
  shoppingListState.items.push({
    showItem: item;
    checkedOff: false;
  });
};

function getItem(shoppingListState, itemIndex) {
  return shoppingListState.items[itemIndex];
};

function removeItem(shoppingListState, itemIndex) {
  shoppingListState.items.splice(itemIndex, 1);
};

function updateItem(state, itemIndex, newItemState) {
  state.items[itemindex] = newItemState;
};





function renderItem(item, itemID, itemTemplate, itemDataAttr) {
  var element = $(itemTemplate);
  element.find('.js-shopping-item').text(item.showItem);
  if(item.checkedOff) {
    element.find('.js-shopping-item').addClass('shopping-item_checked');
    element.find('.js-shopping-item-toggle');
    element.attr(itemDataAttr, itemId);
    return element;
  }
}

function renderList(shoppingListState, listElement, itemDataAttr) {
  var itemsHTML = shoppingListState.items.map(
  function(item, index) {
    return renderItem(item, index, listItemTemplate, itemDataAttr);
  });
  listElement.html(itemsHTML);
}


function handleItemAdds(formElement, newItemIdentifier, itemDataAttr, listElement, shoppingListState) {
  formElement.submit(function(event) {
    event.preventDefault();
    var newItem = formElement.find(newItemIdentifier).val();
    addItem(shoppingListState, newItem);
    renderList(shoppingListState, listElement, itemDataAttr);
    this.reset();
  });
}

function handleItemDeletes(
  formElement, removeIdentifier, itemDataAttr, listElement, shoppingListState) {

  listElement.on('click', removeIdentifier, function(event) {
    var itemIndex = parseInt($(this).closest('li').attr(itemDataAttr));
    deleteItem(shoppingListstate, itemIndex);
    renderList(shoppingListstate, listElement, itemDataAttr);
  })
}


function handleItemToggles(
  listElement, toggleIdentifier, itemDataAttr, shoppingListstate) {

  listElement.on('click', toggleIdentifier, function(event) {
    var itemId = $(event.currentTarget.closest('li')).attr(itemDataAttr);
    var oldItem = getItem(shoppingListstate, itemId);

    updateItem(shoppingListState, itemId, {
      displayName: oldItem.displayName,
      checkedOff: !oldItem.checkedOff
    });
    renderList(shoppingListstate, listElement, itemDataAttr)
  });
}


$(function() {
  var formElement = $('#js-shopping-list-form');
  var listElement = $('.js-shopping-list');

  
  var newItemIdentifier = '#js-new-item';

  
  var removeIdentifier = '.js-shopping-item-delete';

  
  var itemDataAttr = 'data-list-item-id';

  
  var toggleIdentifier = '.js-shopping-item-toggle'

  handleItemAdds(
    formElement, newItemIdentifier, itemDataAttr, listElement, shoppingListState);
  handleItemDeletes(
    formElement, removeIdentifier, itemDataAttr, listElement, shoppingListState);
  handleItemToggles(listElement, toggleIdentifier, itemDataAttr, shoppingListState);
});






