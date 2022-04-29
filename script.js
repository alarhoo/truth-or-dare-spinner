const avatarDesigns = [
  'adventurer',
  'adventurer-neutral',
  'avataaars',
  'big-ears',
  'big-ears-neutral',
  'big-smile',
  'bottts',
  'croodles',
  'croodles-neutral',
  'identicon',
  'initials',
  'micah',
  'miniavs',
  'open-peeps',
  'personas',
  'pixel-art',
  'pixel-art-neutral',
];

const truths = [
  `When was the last time you lied?`,
  `When was the last time you cried?`,
  `What's your biggest fear?`,
  `What's your biggest fantasy?`,
  `Do you have any fetishes?`,
  `What's something you're glad your mum doesn't know about you?`,
  `Have you ever cheated on someone?`,
  `What's the worst thing you've ever done?`,
  `What's a secret you've never told anyone?`,
  `Do you have a hidden talent?`,
  `Who was your first celebrity crush?`,
  `What are your thoughts on polyamory?`,
  `What's the worst intimate experience you've ever had?`,
  `Have you ever cheated in an exam?`,
  `What's the most drunk you've ever been?`,
  `Have you ever broken the law?`,
  `What's the most embarrassing thing you've ever done?`,
  `What's your biggest insecurity?`,
  `What's the biggest mistake you've ever made?`,
  `What's the most disgusting thing you've ever done?`,
  `Who would you like to kiss in this room?`,
  `What's the worst thing anyone's ever done to you?`,
  `Have you ever had a run in with the law?`,
  `What's your worst habit?`,
  `What's the worst thing you've ever said to anyone?`,
  `Have you ever peed in the shower?`,
  `What's the strangest dream you've had?`,
  `Have you ever been caught doing something you shouldn't have?`,
  `What's the worst date you've been on?`,
  `What's your biggest regret?`,
  `What's the biggest misconception about you?`,
  `Where's the weirdest place you've had sex?`,
  `Why did your last relationship break down?`,
  `Have you ever lied to get out of a bad date?`,
  `What's the most trouble you've been in?`,
];

const dares = [
  `Show the most embarrassing photo on your phone`,
  `Show the last five people you texted and what the messages said`,
  `Let the rest of the group DM someone from your Instagram account`,
  `Eat a raw piece of garlic`,
  `Do 100 squats`,
  `Keep three ice cubes in your mouth until they melt`,
  `Say something dirty to the person on your left`,
  `Give a foot massage to the person on your right`,
  `Put 10 different available liquids into a cup and drink it`,
  `Yell out the first word that comes to your mind`,
  `Give a lap dance to someone of your choice`,
  `Remove four items of clothing`,
  `Like the first 15 posts on your Facebook newsfeed`,
  `Eat a spoonful of mustard`,
  `Keep your eyes closed until it's your go again`,
  `Send a sext to the last person in your phonebook`,
  `Show off your orgasm face`,
  `Seductively eat a banana`,
  `Empty out your wallet/purse and show everyone what's inside`,
  `Do your best sexy crawl`,
  `Pretend to be the person to your right for 10 minutes`,
  `Eat a snack without using your hands`,
  `Say two honest things about everyone else in the group`,
  `Twerk for a minute`,
  `Try and make the group laugh as quickly as possible`,
  `Try to put your whole fist in your mouth`,
  `Tell everyone an embarrassing story about yourself`,
  `Try to lick your elbow`,
  `Post the oldest selfie on your phone on Instagram Stories`,
  `Tell the saddest story you know`,
  `Howl like a wolf for two minutes`,
  `Dance without music for two minutes`,
  `Pole dance with an imaginary pole`,
  `Let someone else tickle you and try not to laugh`,
  `Put as many snacks into your mouth at once as you can`,
];

const bottle = document.getElementById('bottle');
const players = document.querySelector('.players');
const action = document.getElementById('data-spin-action');

const doSpin = () => {
  bottle.style.transform = `rotate(${HELPER.randomNumber()}deg)`;
  action.innerText = `Fuck Lisa Ann`;
};

const HELPER = {
  randomNumber: function () {
    return Math.floor(Math.random() * 360 * 10 + 1);
  },

  randomAvatar: async function (seed = 'tod') {
    const apiUrl = `https://avatars.dicebear.com/api/${avatarDesigns[Math.floor(Math.random() * 16 + 1)]}/${seed}.svg`;
    const response = await fetch(apiUrl);
    return response;
  },
};

const numOfPlayers = 4;

const createPlayersElement = () => {
  const circleDegree = 360;
  const sliceAngle = circleDegree / numOfPlayers;
  const skewAngle = -(90 - sliceAngle);
  const unskewAngle = -skewAngle;
  let rotateDegree = 0;

  for (let i = 0; i < numOfPlayers; i++) {
    let player = document.createElement('div');
    player.classList.add('player');
    player.style.transform = `skewY(${unskewAngle}deg) rotate(${sliceAngle / 2}deg)`;

    let avatar = document.createElement('img');
    avatar.height = 50;
    avatar.id = `player${i + 1}`;
    avatar.alt = `player${i + 1}`;

    HELPER.randomAvatar(`${i + 1}`).then((data) => (avatar.src = data.url));
    player.appendChild(avatar);

    let playerParentElem = document.createElement('li');
    playerParentElem.classList.add('player-container');
    playerParentElem.style.transform = `rotate(${rotateDegree}deg) skewY(${skewAngle}deg)`;
    rotateDegree += sliceAngle;
    playerParentElem.appendChild(player);

    players.prepend(playerParentElem);
  }
};

(function () {
  bottle.addEventListener('click', doSpin);
  window.addEventListener(
    'keypress',
    function (e) {
      if (e.key == ' ') {
        doSpin();
      }
    },
    false
  );
  createPlayersElement();
})();
