var statusBar = document.querySelector(".statusBar h3");
var ref = new Firebase("https://intense-fire-7909.firebaseio.com/");

function sendForm() {
    event.preventDefault();
    var form = document.getElementById("user");
    statusBar.innerHTML = "Waiting";
    try{
        var test_data = ref.child("data");
        var queue = ref.child("queue");
        queue.push({
            name: form.elements[0].value,
            question: form.elements[1].value,
        }, function onSuccess(errr) {
            if (errr === null) {
                statusBar.innerHTML = "Success";
            } else {
                statusBar.innerHTML = "Fail to Submit";
            }
        });
    }
    catch(err) {
        statusBar.innerHTML = "Fail to Submit";
    }
};

