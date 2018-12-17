var photos = document.querySelectorAll('div.photo');
console.log("dklfjçalsdjflkasf");
for(let photo of photos) {
  let photoid = photo.querySelector('input[type=hidden]').value;
  let button = photo.querySelector('button.remove');
  button.addEventListener('click', function(ev) {
    console.log("event click", photoid);
    fetch('/photos/' + photoid, {method: 'DELETE'})
      .then(function(r) {
        console.log("answer from server", r);
        window.location.reload();
      })
      .catch(function(err) {
        console.log("ERROR from server", err);
      });
  });
}
