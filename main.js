let newsList = []
const PAGE_SIZE = 20;
const searchIcon = document.querySelector('.fa-magnifying-glass')
const searchInput = document.querySelector('.search-input')
const hamburger = document.querySelector('.hamburger')
const sideMenus = document.querySelector('.side-menus')
const closeBtn = document.querySelector('.close-btn')
const menus = document.querySelectorAll('.menus button')
const sideMenusBtn = document.querySelectorAll('.side-menus button')
menus.forEach(menu=>menu.addEventListener('click',(event)=>{getNewsByCategory(event)}))
sideMenusBtn.forEach(button=>button.addEventListener('click',(event)=>{getNewsByCategory(event)}))
// console.log('mmm',menus)

searchIcon.addEventListener('click',()=>{
  searchInput.classList.toggle('active');
  if(searchInput.classList.contains('active')){
    searchInput.focus();
  }})

hamburger.addEventListener('click', ()=>{
  sideMenus.classList.toggle('open')
})

closeBtn.addEventListener('click', ()=>{
  sideMenus.classList.remove('open')
})

function daysAgo(dateString) {
  const now = new Date();
  const past = new Date(dateString);
  const diff = now - past;
  const days = Math.floor(diff / (1000*60*60*24));
  return `${days}일 전`;
}

const getLatestNews = async() => {
  const url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&pageSize=${PAGE_SIZE}`
  );
  // console.log('uuu',url);

  const response = await fetch(url);
  const data = await response.json();

  newsList = data.articles;
  render()
  console.log('ddd',newsList);
};

const getNewsByCategory = async(event) => {
  const category = event.target.textContent.toLowerCase();

  console.log('category',category)
  const url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&category=${category}&pageSize=${PAGE_SIZE}`)
  
  const response = await fetch(url)
  const data = await response.json()
  console.log('ddd',data)
  newsList = data.articles;
  render()
}

const getNewsByKeyword =async() => {
  const keyword = document.getElementById('search-input').value;
  console.log(keyword)
  const url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&q=${keyword}&pageSize=${PAGE_SIZE}`)
  
  const response = await fetch(url);
  const data = await response.json()
  console.log('keyword data',data)
  newsList = data.articles
  render()
}

const render =()=> {
  const newsHTML = newsList.map(news=> {
    let summary = news.description || "내용없음";
    if (summary.length > 200){
      summary = summary.substring(0,200) +"..."
    }

    let image = news.urlToImage || "./image/no_image.jpeg";
    let source = news.source?.name || "no source";
    const published = news.publishedAt ? daysAgo(news.publishedAt) : "날짜없음";

    return `<div class="row news">
      <div class="col-lg-4">
        <img class="news-img-size" src=${image} alt="">
         </div>
          <div class="col-lg-8">
           <h2>${news.title}</h2>
           <p>${summary}</p>
           <div>${source} ${published}</div>
          </div>
        </div>`}).join('');
  

  document.getElementById('news-board').innerHTML = newsHTML;
}


getLatestNews();

// 카테고리만들기 1.버튼들에 클릭이벤트주기
//2.카테고리별 뉴스 가져오기
//3.그 뉴스를 보여주기
