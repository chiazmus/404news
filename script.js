const weatherBox = document.querySelector('.weather');
const storiesBox = document.querySelector('.stories');
const typeEmojis = {'sunny':'☀️', 'rainy': '🌧️', 'cloudy': '☁️'};
const today = new Date();

const getDayOfYear = (date = new Date()) => {
  // Create a new Date object for January 1st of the same year as the input date.
  // We use date.getFullYear() to ensure it's the correct year (handles leap years implicitly).
  const startOfYear = new Date(date.getFullYear(), 0, 1); // Month is 0-indexed, so 0 is January

  // Calculate the difference in milliseconds between the input date and the start of the year.
  // getTime() returns the number of milliseconds since the Unix epoch.
  const diff = date.getTime() - startOfYear.getTime();

  // Convert milliseconds to days.
  // There are 1000 milliseconds in a second, 60 seconds in a minute, 60 minutes in an hour,
  // and 24 hours in a day.
  const oneDay = 1000 * 60 * 60 * 24;

  // Round up the result using Math.ceil() to ensure partial days are counted as a full day.
  // Add 1 because January 1st is day 1, not day 0.
  const dayOfYear = Math.ceil(diff / oneDay) + 1;

  return dayOfYear;
}

const produceWeather = () => {
    const date = getDayOfYear(today);
    const weatherPattern = ['sunny', 'sunny', 'cloudy', 'rainy', 'sunny', 'cloudy', 'cloudy', 'sunny', 'rainy'];
    const tempPattern = ['20', '18', '15', '8', '10', '12', '9', '14', '10'];
    const weatherType = weatherPattern[date % weatherPattern.length];
    const temperature = tempPattern[date % tempPattern.length];
    displayWeather(weatherType, temperature);
}

const displayWeather = (weatherType, temperature) => {
    const type = document.createElement('p');
    const emoji = document.createElement('p');
    emoji.innerText = `${typeEmojis[weatherType]}`;
    emoji.classList.add('emoji');
    type.innerText = `The current weather is ${weatherType}`;
    const temp = document.createElement('p');
    temp.innerText = `The temperature is ${temperature}°C`;
    weatherBox.appendChild(emoji)
    weatherBox.appendChild(type);
    weatherBox.appendChild(temp);
}

const displayStory = (data) => {
    // Display a different story depending on the date.  For each date 1-365 of the year, get the modulus of the number of stories in data and display that story.
    const date = getDayOfYear(today);
    const index = date % data.length;

    const title = document.createElement('h3');
    const story = document.createElement('p');
    title.innerText = `${data[index].title}`;
    story.innerText = `${data[index].story}`;
    storiesBox.appendChild(title);
    storiesBox.appendChild(story);
}

async function collectStories() {
    const response = await fetch('./stories.json');
    const data = await response.json();
    displayStory(data);
}

produceWeather();
collectStories();