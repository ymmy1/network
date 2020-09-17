document.addEventListener('DOMContentLoaded', function() {

    // Use buttons to toggle between views
    document.querySelector('#all_posts').addEventListener('click', () => load_posts());
    document.querySelector('#new_post').addEventListener('click', () => new_post());
  
  });
  
  function load_posts() {
    fetch(`/index`)
    .then(response => response.json())
    .then(posts => {
        // Creating Table of email list
        alert("lol");
        for (i = 0; i < posts.length; i++)
        {
          console.log(posts[i].body)
        }
    })
  
}

function new_post()
{
  fetch('/new_post', {
    method: 'POST',
    body: JSON.stringify({
        body : document.querySelector('#textarea').value,
    })
  }
  )
  .then(response => response.json())
  .then(result => {
      // Print result
      alert(result.message)
  });
}
  
  