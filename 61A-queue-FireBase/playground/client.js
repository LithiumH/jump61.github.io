var ref = new Firebase("https://intense-fire-7909.firebaseio.com/");

function sendForm() {
    event.preventDefault();
    var form = document.getElementById("user");
    var test_data = ref.child("data");
    var queue = ref.child("queue");
    queue.push({
        name: form.elements[0].value,
        question: form.elements[1].value,
        answered: false
    });
};

