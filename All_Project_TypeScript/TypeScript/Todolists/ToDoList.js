var enterButton = document.getElementById('enter');
var input = document.getElementById("userInput");
var ol = document.querySelector("ol");
var items = document.getElementsByTagName("li");
function inputLength() {
    return input.value.length;
}
function listLength() {
    return items.length;
}
function createListElement() {
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(input.value));
    ol.appendChild(li);
    input.value = "";
    function crossOut() {
        li.classList.toggle("done");
    }
    li.addEventListener("click", crossOut);
    var dBtn = document.createElement("button");
    dBtn.appendChild(document.createTextNode("X"));
    li.appendChild(dBtn);
    dBtn.addEventListener("click", deleteListItem);
    function deleteListItem() {
        li.classList.add("delete");
    }
}
function addListAfterClick() {
    if (inputLength() > 0) {
        createListElement();
    }
}
function addListAfterKeyPress(event) {
    if (inputLength() > 0 && event.key === "Enter") {
        event.preventDefault();
        createListElement();
    }
}
document.addEventListener("keydown", addListAfterKeyPress);
enterButton.addEventListener("click", addListAfterClick);
