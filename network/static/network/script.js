document.addEventListener('DOMContentLoaded', function() {

    // Use buttons to toggle between views
    document.querySelector('#all_posts').addEventListener('click', () => load_posts());
    document.querySelector('#new_post').addEventListener('click', () => new_post());
    document.querySelectorAll('.like_button').forEach(link => {link.onclick = () => { like_post(link) }});
    document.querySelectorAll('.unlike_button').forEach(link => {link.onclick = () => { unlike_post(link) }});
    document.querySelectorAll('.follow_button').forEach(link => {
      link.onclick = () => { follow_user(link) };
    });
    document.querySelectorAll('.unfollow_button').forEach(link => {
      link.onclick = () => { unfollow_user(link) };
      link.onmouseover = () => { link.innerHTML = "Unfollow"};
      link.onmouseout = () => { link.innerHTML = "Following"};
    });
  
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
  img = document.createElement('img')
  avatar_src = document.getElementById("profile_avatar").getAttribute("src");

  img.setAttribute("width", '20px')
  img.setAttribute("src", `${avatar_src}`)
  document.getElementById(`like_avatars_${link.dataset.page}`).append(img)

  var current_likes = parseInt(document.getElementById(`like_for_${link.dataset.page}`).innerHTML)
  current_likes = current_likes + 1;
  document.getElementById(`like_for_${link.dataset.page}`).innerHTML = current_likes
  link.setAttribute("class", "unlike_button")
  link.innerHTML = "UnLike"
  document.querySelectorAll('.unlike_button').forEach(link => {link.onclick = () => { unlike_post(link) }});
}

function unlike_post(link)
{
  // Back End Part
  fetch('/unlike_post', {
    method: 'POST',
    body: JSON.stringify({
      post_id : link.dataset.page,
    })
  })

  // Front End part
  avatar_src = document.getElementById("profile_avatar").getAttribute("src");

  container = document.getElementById(`like_avatars_${link.dataset.page}`)
  avatar = container.querySelector(`[src*= "${avatar_src}"]`)
  avatar.remove()

  var current_likes = parseInt(document.getElementById(`like_for_${link.dataset.page}`).innerHTML)
  current_likes = current_likes - 1;
  document.getElementById(`like_for_${link.dataset.page}`).innerHTML = current_likes
  link.setAttribute("class", "like_button")
  link.innerHTML = "Like"
  document.querySelectorAll('.like_button').forEach(link => {link.onclick = () => { like_post(link) }});
}

function follow_user(link)
{
  // Back End Part
  fetch('/follow_user', {
    method: 'POST',
    body: JSON.stringify({
      user_id : link.dataset.page,
    })
  })

  // Front End part
  nickname = link.parentElement.querySelector('.profile_link');
  links = document.querySelectorAll(".profile_link");

  for(i=0; i < links.length; i++)
  {
    if(links[i].innerHTML == nickname.innerHTML)
    {
      button = links[i].parentElement.querySelector('.follow_button');
      button.innerHTML = "Following";
      button.setAttribute("class", "unfollow_button")
    }
  }
  document.querySelectorAll('.unfollow_button').forEach(link => {
    link.onclick = () => { unfollow_user(link) };
    link.onmouseover = () => { link.innerHTML = "Unfollow"};
    link.onmouseout = () => { link.innerHTML = "Following"};
  });
}

function unfollow_user(link)
{
  // Back End Part
  fetch('/unfollow_user', {
    method: 'POST',
    body: JSON.stringify({
      user_id : link.dataset.page,
    })
  })

  // Front End part
  nickname = link.parentElement.querySelector('.profile_link');
  links = document.querySelectorAll(".profile_link");

  for(i=0; i < links.length; i++)
  {
    if(links[i].innerHTML == nickname.innerHTML)
    {
      button = links[i].parentElement.querySelector('.unfollow_button');
      button.innerHTML = "Follow";
      button.setAttribute("class", "follow_button")
    }
  }
  document.querySelectorAll('.follow_button').forEach(link => {
    link.onclick = () => { follow_user(link) };
    link.onmouseover = () => { link.innerHTML = "Follow"};
    link.onmouseout = () => { link.innerHTML = "Follow"};
  });
}