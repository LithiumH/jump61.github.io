var ref = new Firebase("https://intense-fire-7909.firebaseio.com/");
var test_data = ref.child("data");
var queue = ref.child("queue");
var form = document.getElementById("user");
var lst = document.querySelector(".list ul");


// Retrieve new posts as they are added to Firebase
ref.child("queue").on("child_added", function(snapshot) {
    var newPost = snapshot.val();
    console.log("name is " + newPost.name);
    console.log("question number " + newPost.question);
    var node = document.createElement("LI");
    var button = document.createElement("BUTTON");
    var undo = document.createElement("BUTTON");
    var txt= document.createTextNode(newPost.name + ", Question " + newPost.question + " ");
    var buttonTxt = document.createTextNode("Clear");
    var undoTxt = document.createTextNode("Undo");
    button.appendChild(buttonTxt);
    undo.appendChild(undoTxt);
    node.appendChild(txt);
    node.appendChild(button);
    node.appendChild(undo);
    node.style.color = "black";
    lst.appendChild(node);
    button.addEventListener("click", function doClean(event) {
        event.preventDefault();
        this.parentNode.style.color = "grey";
    });
    undo.addEventListener("click", function undo(event) {
        event.preventDefault();
        this.parentNode.style.color = "black";
    });
});

// Reset all data
var reset_data = function() {
    test_data.set(null);
}
// Reset all queue
var reset_queue = function() {
    queue.set(null);
}

// Reset ALL
var reset = function() {
    reset_data();
    reset_queue();
}

var relive = function() {
    var lis = document.querySelector(".list ul");
    lis = lis.getElementsByTagName("li");
    for (i = 0; i < lis.length; i += 1) {
        lis[i].style.color = "black";
    }
}

resetButton = document.querySelector(".jumbotron button");
resetButton.addEventListener("click", reset);
