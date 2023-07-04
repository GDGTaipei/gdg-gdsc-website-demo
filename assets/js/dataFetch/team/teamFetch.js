var database = firebase.database();
var myData = firebase.database().ref(`/team`);


myData.on('value', function(snapshot) {
    let member_array = snapshot.val();

    let content = '<div class=" mt--300"><div class="text-center mt-2" style="margin-top: 14px !important">'

    for (var j = 0; j < member_array.length; j++) {

        if (j % 3 === 0) {
            content += '<div class="row">'
        }

        content += '<div class="col-md-4" style="padding:15px 15px;">' +
            `<img src="${member_array[j]['thumbnail_url'] ? member_array[j]['thumbnail_url'] : '../../assets/img/default.png'}" alt="Circle image" class="img-fluid rounded-circle shadow" style="width: 150px;">
            <h4>${member_array[j].last_name + ' ' + member_array[j].first_name}<br>
            ${member_array[j]['title'] ? `<small>${member_array[j]['title']}</small>` : "TEST"}
            </h4></div>`

        if (j % 3 === 2) {
            content += '</div>'
        }
    }

    content = content + '</div></div></div>'

    document.getElementById("guide_list").innerHTML = content

})