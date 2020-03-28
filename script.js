var newItemInput = document.getElementById("addItemInput");
var shoppingList = document.getElementById("shoppingList");
var addItemButton = document.getElementById("addItemButton");
var shoppingListCache = [];
var nextItemNumber = 0;

function adjustHeaderSpacer(){
    var header = document.getElementById("header");
    var spacer = document.getElementById("spacer");
    spacer.style.height = header.offsetHeight + "px";
    console.log(spacer.offsetheight);
}

function addItemToShoppingList() {
    if (newItemInput.value != "" ){

        // Update internal cache
        shoppingListCache[shoppingListCache.length] = {
            itemName: newItemInput.value,
            itemId: "item" + nextItemNumber,
            itemStatus: "todo",
            itemTickId: "tick" + nextItemNumber,
            itemCrossId: "cross" + nextItemNumber
        }
        console.log(shoppingListCache);

        // add item to the HTML
        shoppingList.appendChild(createNewListItemHTML());

        // get ready for next item to be added
        newItemInput.value = "";
        nextItemNumber++;
    }
}

function handleInputEvent(event){
    if (event.type === "keypress"){
        if (event.which === 13){
            addItemToShoppingList();
        }
    }
    else if (event.type === "click"){
        addItemToShoppingList();
    }
    else {
        // Do nothing
    }
}

function handleCompleteTaskEvent(event){
    if (event.type === "click"){
        
        completeTask(event.target.id);
    }
    else {
        // Do nothing
    }
}

function handleDoTaskAgainEvent(event){
    if (event.type === "click"){
        console.log(event);
        doTaskAgain(event.target.id);
    }
    else {
        // Do nothing
    }
}

function handleRemoveTaskEvent(event){
    if (event.type === "click"){
        removeItemFromHtmlById(event.target.parentElement.id);
    }
    else {
        // Do nothing
    }
}



function doTaskAgain(elementId){
    var element = document.getElementById(elementId);
    // sibling number is 0 as per createNewListItemHTML()
    var siblingElement = element.parentElement.children[0];
    
    //Update item in list to no longer be crossed out and remove all event listener
    // siblingElement.removeAttribute("class");
    siblingElement.setAttribute("class", "center"); // un - cross out item text
    element.removeEventListener("click", handleDoTaskAgainEvent); // remove previous event listener

    // Setup item to be able to be re-added to list as not complete
    element.removeAttribute("src");
    element.setAttribute("src", "tick.webp");
    element.addEventListener("click", handleCompleteTaskEvent);
}

function completeTask(elementId){
    var element = document.getElementById(elementId);
    // sibling number is 0 as per createNewListItemHTML()
    var siblingElement = element.parentElement.children[0];
    
    //Update item in list to be crossed out and no longer able to be completed
    // siblingElement.removeAttribute("class");
    siblingElement.setAttribute("class", "center complete"); // cross out item text
    element.removeEventListener("click", handleCompleteTaskEvent); // remove previous event listener

    // Setup item to be able to be re-added to list as not complete
    element.removeAttribute("src");
    element.setAttribute("src", "again.png");
    element.addEventListener("click", handleDoTaskAgainEvent);
}

function removeItemFromHtmlById(elementId){
    var element = document.getElementById(elementId);
    var parentElement = element.parentElement;
    parentElement.removeChild(element);
}



function createNewListItemHTML(){
    // create list element for new item
    var li = document.createElement("li");
    li.textContent = shoppingListCache[nextItemNumber].itemName;
    li.setAttribute("class", "center");
    
    // create complete element for new item
    var tickImg = document.createElement("img");
    tickImg.setAttribute("src", "tick.webp");
    tickImg.setAttribute("class", "center clickable");
    tickImg.setAttribute("type", "tick");
    tickImg.setAttribute("id", shoppingListCache[nextItemNumber].itemTickId);
    tickImg.addEventListener("click", handleCompleteTaskEvent);

    // create delete item element for new item
    var crossImg = document.createElement("img");
    crossImg.setAttribute("src", "cross.webp");
    crossImg.setAttribute("class", "center clickable");
    crossImg.setAttribute("id", shoppingListCache[nextItemNumber].itemCrossId);
    crossImg.addEventListener("click", handleRemoveTaskEvent);

    // Create top level div and append the above sub elements
    var div = document.createElement("div");
    div.setAttribute("class", "itemGrid");
    div.setAttribute("id", shoppingListCache[nextItemNumber].itemId);
    div.appendChild(li); // position 0 in div
    div.appendChild(tickImg);
    div.appendChild(crossImg);

    return div;
}


adjustHeaderSpacer();
addItemButton.addEventListener("click", handleInputEvent);
newItemInput.addEventListener("keypress", handleInputEvent);
window.addEventListener("resize", adjustHeaderSpacer);

alert("Hi there! Let's put a list together!");
// select entry box on page load
newItemInput.select();