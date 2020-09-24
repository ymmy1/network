document.addEventListener('DOMContentLoaded', function() {

    // Use buttons to toggle between views
    document.querySelectorAll('.like_button').forEach(link => {link.onclick = () => { like_post(link) }});
    document.querySelectorAll('.unlike_button').forEach(link => {link.onclick = () => { unlike_post(link) }});
    document.querySelectorAll('.follow_button').forEach(link => {link.onclick = () => { follow_user(link) }});
    document.querySelectorAll('.unfollow_button').forEach(link => {link.onclick = () => { unfollow_user(link) }});
    document.querySelectorAll('.edit_post_button').forEach(link => {link.onclick = () => { edit_post(link) }});
    document.querySelectorAll('.delete_post_button').forEach(link => {link.onclick = () => { delete_post(link) }});
    if (document.querySelector('#new_post'))
    {
      document.querySelector('#new_post').addEventListener('click', () => new_post());
    }
  
  });
  

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
      button.innerHTML = "UnFollow";
      button.setAttribute("class", "unfollow_button")
    }
  }
  document.querySelectorAll('.unfollow_button').forEach(link => {
    link.onclick = () => { unfollow_user(link) };
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
  });
}

function edit_post(link)
{
  var textarea = link.parentElement.querySelector('textarea');
  var form = link.parentElement.querySelector('form');
  link.parentElement.querySelector('.post_body').style.display = "none";
  textarea.value = link.parentElement.querySelector('.post_body').innerHTML;
  link.parentElement.querySelector('form').style.display = "block";
  
  $(document).mouseup(function(e) 
  {
    var container = $(form);
    
    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) 
    {
      link.parentElement.querySelector('.post_body').style.display = "block";
      link.parentElement.querySelector('form').style.display = "none";
      
    }
  });
  
  form.onsubmit = (e) => { 
    e.preventDefault();
    fetch('/edit_post', {
      method: 'POST',
      body: JSON.stringify({
          body : textarea.value,
          post_id : link.dataset.page
      })
    })
    link.parentElement.querySelector('.post_body').style.display = "block";
    link.parentElement.querySelector('.post_body').innerHTML = textarea.value;
    link.parentElement.querySelector('form').style.display = "none";
  
  }
}

function delete_post(link)
{
  // Front End
  link.parentElement.style.opacity = "0";
  link.parentElement.style.display = "none";  
  // Back End
  fetch('/delete_post', {
    method: 'POST',
    body: JSON.stringify({
      post_id : link.dataset.page
    })
  }
  )
}