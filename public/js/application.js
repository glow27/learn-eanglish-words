const form = document.querySelector('form');
const show = document.querySelector('.show');


// hbs on client
const cardTempale = async () => {
  // async function returns Promise
  try {
    const response = await fetch('/templates/card.hbs');
    // templates for client lies in public folder
    // that ,means that we can take by usual GET request
    if (response.status === 404) {
      throw Error('smth went wrong'); // throw to catch block
    }
    const result = await response.text(); // get hbs as text
    // global object Handlebars | was conncted by CDN -> layout.hbs 13
    return Handlebars.compile(result);
  } catch (error) {
    // if smth went wrong -> block catch will work
    console.log(error);
    // in case of Error compile template with msg
    return Handlebars.compile('<strong>We have some problems</strong>');
  }
};

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const response = await fetch('/search', {
    method: 'post',
    body: JSON.stringify({ word: e.target.search.value }),
    headers: { 'Content-type': 'Application/json' },
  });

  const template = await cardTempale();
  const result  = await response.json();
  console.log(result)
  show.innerHTML = template(result);
  
});
