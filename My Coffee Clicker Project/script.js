// Coffee CLicker Notes:
// hard part: storing logic of producers & update DOM

// I want to represent Chemex coffee producer in code:
// Object:

// Best way is to create an array of objects...

// What are some global variables? total # of coffee, rate of coffee

// Grabs portions of HTML for manipulation:
const body = document.querySelector('body');
const producerList = document.querySelector('#producer-container');
const coffeeButton = document.querySelector("#coffee-pic");
const coffeeCountTally = document.querySelector('.counting-container');
const cpsTally = document.querySelector('#coffee-per-second');

let sumCPS = 0;
let coffeeScore = 0;

// Data represnted in array of objects
const coffeeProducers = [
{
    id: 1,
    name: 'Chemex',
    isVisible: false,
    quantity: 0,
    rate: 1,
    cost: 10
},

// when have 10 coffees set isVisible to true

{
    id: 2,
    name: 'FrenchPress',
    isVisible: false,
    quantity: 0,
    rate: 2,
    cost: 50
},

{
    id: 3,
    name: 'Mr. Coffee',
    isVisible: false,
    quantity: 0,
    rate: 5,
    cost: 100
},
];

// Create empty array of "activeProducers". Will receive producer push if !alreadyExists
const activeProducers = [];

// creates new div element for activeProducers. Appends to producer container.
function createProducer() {
  for (i in coffeeProducers) {
    if (coffeeScore >= coffeeProducers[i].cost / 2) {
      let producer = document.createElement('div');
      producer.innerHTML = `
<div class="producer-info">
<div class="producer-name">
  <h4>${coffeeProducers[i].name}</h4>
</div>
<div class="producer-info">
  <h6>Quantity: ${coffeeProducers[
    i
  ].quantity}<h6>
  <h6>Coffee/Second: ${coffeeProducers[i].rate}</h6>
  <h6>Cost: ${coffeeProducers[i].cost}</h6>
  <button id="buy">Buy</button>
</div>
</div>
`;
      // Creates button for specific producer so that producer's specific paramters can be targed when clicked. 
      buyButton(producer, i);

    // Appends producer to producer container if does not already exist
      let alreadyExists = checkExists(i);
      if (!alreadyExists) {
        producerList.appendChild(producer);
        activeProducers.push(coffeeProducers[i].name);
      }
    }
  }
}

function checkExists(i) {
    // Initially set to false
    let alreadyExists = false;
    //If are currently no activeProducers...
    if (activeProducers.length !== 0) {
      activeProducers.forEach((producerName) => {
        // If producer matches one that is already in producer container, set alreadyExists to true.
        if (producerName === coffeeProducers[i].name) {
          alreadyExists = true;
        }
      });
    }
    return alreadyExists;
  }

  function buyButton(producer, i) {
    let button = producer.querySelector('button');
    // Adding listener to buy button in producer container.
    button.addEventListener('click', () => {
      if (coffeeScore < coffeeProducers[i].cost) {
        // if coffeeScore is less than producer cost, error alert message
        alert('You need more coffee!');
      } else {
        coffeeScore -= coffeeProducers[i].cost; // removes producer cost from coffeeScore
        sumCPS += coffeeProducers[i].rate; // adds producer rate to sumCPS total.
        coffeeCountTally.innerHTML = `Coffee: ${coffeeScore}`; // updates HTML
        cpsTally.innerHTML = sumCPS; // updates HTML
      }
    });
  }

  // Adds event listener to coffee icon. Increase coffeeScore upon click. Updates HTML.
const coffeeIcon = document.getElementById('coffee-pic');
coffeeIcon.addEventListener('click', () => {
    coffeeScore++;
    coffeeCountTally.innerHTML = `Coffee: ${coffeeScore}`;
});

// Add 1-second interval function that updates coffeeScore + cps & updates HTML
setInterval(function () {
    if (sumCPS > 0) {
        coffeeScore += sumCPS;
        coffeeCountTally.innerHTML = `Coffee: ${coffeeScore}`;
    }
    createProducer();
}, 1000);

// Resets Game Function
function resetGame () {
    window.localStorage.clear();
    location.reload();
}
// Grabs reset button & attaches resetGame function.
const resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', resetGame);