let input = document.getElementById("enterusername");
let btn = document.getElementById("btn");
let dp = document.getElementById("dp");
let username = document.getElementById("username");
let viewProfile = document.getElementById("viewProfile");
let followers = document.getElementById("followers");
let following = document.getElementById("following");
let repo = document.getElementById("repos");
let bio = document.getElementById("bio");
let output = document.getElementsByClassName("result")[0];
let invalid = document.getElementsByClassName("invalid")[0];
async function Github() {
    try {
        let inputValue = input.value;
        input.value = "";
        let p = await fetch(`https://api.github.com/users/${inputValue}`);
        let q = await p.json();
        if (q.status == "404") {
            invalid.style.display = "flex";
            output.style.display = "none";
            return;
        }
        output.style.display = "flex";
        invalid.style.display = "none";
        dp.src = q.avatar_url;
        username.innerHTML = q.login;
        viewProfile.href = `https://github.com/${inputValue}`;
        followers.innerHTML = q.followers;
        following.innerHTML = q.following;
        repo.innerHTML = q.public_repos;
        if (q.bio) {
            let bioDetails = q.bio;
            bio.innerHTML = `${bioDetails.slice(0, 30)}...`;
        } else {
            bio.innerHTML = " ";
        }
    } catch (err) {
        console.log("Error Occured" + err);
    }
}
btn.addEventListener('click', Github);