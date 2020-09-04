const { Translate } = require('@google-cloud/translate').v2;
// GOOGLE_APPLICATION_CREDENTIALS="/home/patric/Downloads/My Project 1-741f03f22385.json";

const translate = new Translate({
  keyFilename: './config/My Project 1-741f03f22385.json', //eg my-project-0fwewexyz.json
});

// const text = 'Hello, world!';
// const target = 'ru';

// async function translateText() {
//   // Translates the text into the target language. "text" can be a string for
//   // translating a single piece of text, or an array of strings for translating
//   // multiple texts.
//   let [translations] = await translate.translate(text, target);
//   translations = Array.isArray(translations) ? translations : [translations];
//   console.log('Translations:');
//   translations.forEach((translation, i) => {
//     console.log(`${text[i]} => (${target}) ${translation}`);
//   });
// }

// translateText();

// const projectId = 'dogwood-reef-288406';

// // Imports the Google Cloud client library
// const {Translate} = require('@google-cloud/translate').v2;

// // Instantiates a client
// const translate = new Translate({projectId});

module.exports = async function quickStart(text) {
  // The text to translate
  // const text = 'Hello, world!';

  // The target language
  const target = 'en';

  // Translates some text into Russian
  // const [translation] = await translate.translate(text, target);

  const [translation] = await translate.translate(text, target);
  return translation;
}
