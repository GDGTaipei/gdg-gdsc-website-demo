const capitalize = s => s && s[0].toUpperCase() + s.slice(1)

firebase.auth().onAuthStateChanged(async function (user) {
  if (user) {

    var user = firebase.auth().currentUser;

    if (user != null) {

      let currentUserEmail = user.email;
  
      let whitelist = await getData()

      

      if (!whitelist.includes(currentUserEmail)) {
        let timerInterval
        swal({
          title: '錯誤',
          text: "你沒有權限造訪這個後台",
          icon: "warning",
          timer: 1000,
          timerProgressBar: true,
          buttons:false,
          didOpen: () => {
            swal.showLoading()
            const b = swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
              b.textContent = swal.getTimerLeft()
            }, 100)
          },
          willClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {
            logout()
            if (!regexPattern.test(window.location.pathname)){
              const filteredPath = window.location.pathname.replace(/\/backstage\/.*$/, "$1");
              window.location.href = filteredPath
            }
        })
      }
      else{
        if (window.location.pathname.indexOf("pages") === -1) {
          window.location.href = './pages/dashboard.html'
        }
      }
    }

  } else {
    const regexPattern = /\/backstage\/.*$/;
    if (!regexPattern.test(window.location.pathname)){
      const filteredPath = window.location.pathname.replace(/\/backstage\/.*$/, "$1");
        window.location.href = filteredPath
    }
    
    
  }
});

async function getData() {
  try {
    // Use await to get a snapshot of the data at a database reference
    let database = firebase.database();
    const snapshot = await database.ref(`/whitelist`).once("value");

    // Extract the data from the snapshot
    const data = snapshot.val();

    // Do something with the data
    return data;
  } catch (error) {
    console.error(error);
  }
}

let login = async () => {
  document.getElementById("login_btn").disabled = true;
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  let whitelist = await getData(location)

  if (!whitelist.includes(userEmail)) {
    document.getElementById('login_btn').classList.remove("btn-dark")
    document.getElementById('login_btn').classList.add("btn-danger")
    document.getElementById('login_btn').innerHTML = `這個帳號沒有權限存取後台`
    await sleep(3000);
    document.getElementById('login_btn').classList.remove("btn-danger")
    document.getElementById('login_btn').classList.add("btn-dark")
    document.getElementById('login_btn').innerHTML = `登入`
    document.getElementById("login_btn").disabled = false;

    throw Error('the request member is not in the list')
  }

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).then(async function (result) {

    

    document.getElementById('login_btn').classList.remove("btn-dark")
    document.getElementById('login_btn').classList.add("btn-success")
    document.getElementById('login_btn').innerHTML = `登入成功`
    await sleep(3000);

    if (window.location.pathname.indexOf("pages") === -1) {
      window.location.href = './pages/dashboard.html'
    }

  }).catch(async function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    document.getElementById('login_btn').classList.remove("btn-dark")
    document.getElementById('login_btn').classList.add("btn-danger")
    document.getElementById('login_btn').innerHTML = `${errorCode} 登入失敗`
    await sleep(3000);
    document.getElementById('login_btn').classList.remove("btn-danger")
    document.getElementById('login_btn').classList.add("btn-dark")
    document.getElementById('login_btn').innerHTML = `登入`
    document.getElementById("login_btn").disabled = false;

  });

}

// google 登入
let google_login = async () => {

  const provider = new firebase.auth.GoogleAuthProvider();
  // 自動偵測瀏覽器語言
  firebase.auth().useDeviceLanguage();
  firebase.auth().signInWithPopup(provider).then(async function (result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;

    let whitelist = await getData()

    console.log(whitelist)

    if (!whitelist.includes(userEmail)) {
      document.getElementById('login_btn').classList.remove("btn-dark")
      document.getElementById('login_btn').classList.add("btn-danger")
      document.getElementById('login_btn').innerHTML = `這個帳號沒有權限存取後台`
      await sleep(3000);
      document.getElementById('login_btn').classList.remove("btn-danger")
      document.getElementById('login_btn').classList.add("btn-dark")
      document.getElementById('login_btn').innerHTML = `登入`
      document.getElementById("login_btn").disabled = false;
  
      throw Error('the request member is not in the list')
    }
    
    if (window.location.pathname.indexOf("pages") === -1) {
      window.location.href = './pages/dashboard.html'
    }
    // ...
  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
    
  });
}


function logout() {
  firebase.auth().signOut();
}
