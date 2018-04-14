// Write code here to communicate with Github
function getRepos(username){
    document.getElementById('repos-list').innerHTML = '';

    fetch("https://api.github.com/users/" + username + "/repos").then(
        function(response) {
            return response.json();
        }
    ).then(
        function(repos) {
            reposArray = [];
            for (i = 0; i < repos.length; i++) {
            reposArray = reposArray.concat([[repos[i]["name"], repos[i]['html_url']]]);
            }
            return reposArray;
        }
        
    ).then(function(reposArr) {
        for (i = 0; i < reposArr.length; i++) {
            var liTag = document.createElement('li');
            var aTag = document.createElement('a');
            aTag.innerHTML = reposArr[i][0];
            aTag.href = reposArr[i][1];
            liTag.appendChild(aTag);
            document.getElementById('repos-list').appendChild(liTag);
        }
        document.getElementById('repos-count').innerHTML = reposArr.length;
    });
}

getRepos('neelunsiri');

document.getElementById('repos-search-button').addEventListener('keyup', function() {
    getRepos(document.getElementById('repos-search-box').value);
});