const form = document.querySelector('form');
const show = document.querySelector('.show');
const btn = document.querySelector('.sound');

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

  if (response.status === 404) {
    return (show.innerHTML = '<h1>Are you sure? Try again...</h1>');
  }
  const template = await cardTempale();
  const result = await response.json();

  const audioRespons = await fetch(
    `https://lingua-robot.p.rapidapi.com/language/v1/entries/en/${result.word}`,
    {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'lingua-robot.p.rapidapi.com',
        'x-rapidapi-key': '6af9db4afcmshe6cbf70837c034cp15045bjsn5ebe0d1762f2',
      },
    }
  );

  const sound = await audioRespons.json();

  let audio;
  if (sound.entries[0].pronunciations[0].audio) {
    audio = sound.entries[0].pronunciations[0].audio.url;
  } else {
    audio = sound.entries[0].pronunciations[1].audio.url;
  }
  if (audio) {
    result.audio = audio;
  }

  show.innerHTML = template(result);
});

//   console.log(btn)
// btn.addEventListener('click', async (e) => {
//   e.preventDefault();
//   console.log(e.target.href)
// })
