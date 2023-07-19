var storage = firebase.storage();

async function uploadFile() {

  var file = document.getElementById("file").files[0];

  console.log(document.getElementById("file").files)

  if(file.type.indexOf('image/')===-1){
    document.getElementById("upload-status").disabled = true;
    document.getElementById('upload-status').classList.remove("btn-dark")
    document.getElementById('upload-status').classList.add("btn-danger")
    document.getElementById('upload-status').innerHTML = `格式不符`
    await sleep(3000);
    document.getElementById("upload-status").disabled = false;
    document.getElementById('upload-status').classList.remove("btn-danger")
    document.getElementById('upload-status').classList.add("btn-dark")
    document.getElementById('upload-status').innerHTML = `上傳檔案`
    document.getElementById("file").value = "";
    return 0
  }

  if(file.size > 1024 * 1024){
    document.getElementById("upload-status").disabled = true;
    document.getElementById('upload-status').classList.remove("btn-dark")
    document.getElementById('upload-status').classList.add("btn-danger")
    document.getElementById('upload-status').innerHTML = `檔案超過限制大小`
    await sleep(3000);
    document.getElementById("upload-status").disabled = false;
    document.getElementById('upload-status').classList.remove("btn-danger")
    document.getElementById('upload-status').classList.add("btn-dark")
    document.getElementById('upload-status').innerHTML = `上傳檔案`
    document.getElementById("file").value = "";
    return 0
  }

  var storageRef = storage.ref();
  var fileRef = storageRef.child(file.name);

  console.log(file)

  // Upload file to Firebase Cloud Storage
  var uploadTask = fileRef.put(file);

  uploadTask.on("state_changed", 
    function(snapshot) {
      document.getElementById('upload-status').classList.remove("btn-dark")
      document.getElementById('upload-status').classList.add("btn-success")
  
      document.getElementById("upload-status").disabled = true;
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      document.getElementById('upload-status').innerHTML = `上傳中：${progress.toFixed(2)}%`

      console.log("Upload progress: " + progress + "%");
    }, 
    async function(error) {
      // Handle error
      console.log("Error uploading file: " + error);
      document.getElementById('upload-status').classList.remove("btn-dark")
      document.getElementById('upload-status').classList.add("btn-danger")  
      document.getElementById('upload-status').innerHTML = `上傳過程發生錯誤`
      await sleep(3000);
      document.getElementById("upload-status").disabled = false;
      document.getElementById('upload-status').classList.remove("btn-danger")
      document.getElementById('upload-status').classList.add("btn-dark")
      document.getElementById('upload-status').innerHTML = `上傳檔案`
      document.getElementById("file").value = "";
    }, 
    function() {
      // Upload complete, get the file URL
      uploadTask.snapshot.ref.getDownloadURL().then(async function(downloadURL) {
        console.log("File available at: " + downloadURL);
        document.getElementById('pic_url').value = downloadURL
        document.getElementById("display-pic").src = downloadURL
        document.getElementById("display-pic").style.backgroundImage = `url(${downloadURL})` 
        document.getElementById('upload-status').innerHTML = `上傳成功`
        await sleep(3000);
        document.getElementById('upload-status').classList.remove("btn-success")
        document.getElementById('upload-status').classList.add("btn-dark")
        document.getElementById('upload-status').innerHTML = `上傳檔案`
        document.getElementById("upload-status").disabled = false;
        document.getElementById("file").value = "";
      });
    }
  );
}