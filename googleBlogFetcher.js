let blogId = '7890705033633930338'
let accessKey = 'AIzaSyBSCLodpmbJ7dhHd6eE9YLqnTyjfETt6Kc'

let dateTrans = (dateString) => {

  const dateObject = new Date(dateString);

  const year = dateObject.getFullYear() ;
  const month = dateObject.getMonth() + 1; // add 1 to get 1-12 range instead of 0-11
  const date = dateObject.getDate();

  return `${year}/${month}/${date}`;

};


let cardTransfrom = (postContent) =>{
  return `
  <div class="col-lg-6 mr-auto text-left mt-4">
    <div class="card card-nav-tabs">
      <div class="card-header card-header-warning h5">
        ${dateTrans(postContent.published)}
      </div>
      <div class="card-body">
        <h4 class="card-title h5">${postContent.title}</h4>
        <p class="card-text">${postContent.content.replace(/<[^>]+>/g, "").substring(0, 150)}...</p>
        <a href="${postContent.url}" class="btn btn-outline-primary btn-round" target="_blank" style="margin: 5px 5px;">查看完整文章</a>
      </div>
    </div>
  </div>
  `
}

let googleBlogPostFetcher = async()=>{

  try{
  const response = await fetch(`https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${accessKey}`);
  const data = await response.json();

  // console.log(data.items[0])

  let postContent = data.items

  let blogContent = cardTransfrom(postContent[0])+cardTransfrom(postContent[1])

  document.getElementById("blogContent").innerHTML =blogContent;

  }
  catch{
    console.error('fetch data error')

  }
}

googleBlogPostFetcher()
