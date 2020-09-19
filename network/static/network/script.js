document.addEventListener('DOMContentLoaded', function() {

    // Use buttons to toggle between views
    document.querySelector('#all_posts').addEventListener('click', () => load_posts());
    document.querySelector('#new_post').addEventListener('click', () => new_post());
    document.querySelectorAll('.like_button').forEach(link => {link.onclick = () => { like_post(link) }});
  
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
  
function like_post(link)
{
  // Back End Part
  fetch('/like_post', {
    method: 'POST',
    body: JSON.stringify({
      post_id : link.dataset.page,
    })
    })

  // Front End part
  var current_likes = parseInt(document.getElementById(`like_for_${link.dataset.page}`).innerHTML)
  current_likes = current_likes + 1;
  document.getElementById(`like_for_${link.dataset.page}`).innerHTML = current_likes
  link.removeAttribute("data-page")
  link.removeAttribute("class")
  link.setAttribute("disabled", "")
  
  
}