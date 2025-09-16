let news = []

const getLatestNews = async() => {
  const url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&pageSize=${PAGE_SIZE}`
  );
  // console.log('uuu',url);

  const response = await fetch(url);
  const data = await response.json();

  news = data.articles;
  // console.log('ddd',news);
};


getLatestNews();
for (let i=0; i<20; i++){
  console.log('after',i)
}
