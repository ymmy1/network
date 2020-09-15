document.addEventListener('DOMContentLoaded', function() {

    // Use buttons to toggle between views
    document.querySelector('#all_posts').addEventListener('click', () => load_posts());
  
  });
  
  function load_posts() {
    fetch(`/posts`)
    .then(response => response.json())
    .then(posts => {
        // Creating Table of email list
        alert("lol");
        alert(posts);
    })
  
}
  
  