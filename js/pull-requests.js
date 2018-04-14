// Write code here to communicate with Github

function getPrs(username){

    document.getElementById("pull-requests-list").innerHTML = "";

    fetch("https://api.github.com/repos/codeyourfuture/js-exercises/pulls")
    .then(function(response) {
        return response.json();
    })
    .then(function(prs) {
        prsArray = [];
        for (i = 0; i < prs.length; i++) {
        prsArray = prsArray.concat([
            [prs[i]["title"], prs[i]["html_url"], prs[i]['user']['login']]
        ]);
        }
        return prsArray;
    })
    .then(function(prsArrUnfiltered){
        prsArrFiltered = [];
        for (i = 0; i < prsArrUnfiltered.length; i++) {
            if (prsArrUnfiltered[i][2] == username) {
                prsArrFiltered = prsArrFiltered.concat([prsArrUnfiltered[i]]);
            }
        }
        return prsArrFiltered;
    })
    .then(function(prsArr) {
        for (i = 0; i < prsArr.length; i++) {
        var liTag = document.createElement("li");
        var aTag = document.createElement("a");
        aTag.innerHTML = prsArr[i][0];
        aTag.href = prsArr[i][1];
        liTag.appendChild(aTag);
        document.getElementById("pull-requests-list").appendChild(liTag);
        }
    });
}

getPrs('neelunsiri');


document.getElementById("pr-search-box").addEventListener('keyup', function(event) {
    getPrs(event.target.value);
});