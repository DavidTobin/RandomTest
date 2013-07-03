/**
  * Runs tests on random numbers through a range of MIN - MAX
  *
  *  Example options
  *  {
  *    min: 0, // Min number of the range
  *    max: 5, // Max number of the range
  *    loops: 9999 // Number of loops to perform
  *  }
  *
  * @param  {Function|Object} Function to generate random number or list of options to run against.
  * @param  {Object} List of options
  * @return {Object}  Contains check on the total count,
  *                   Check on boundry numbers +-3,
  *                   String containing percentage of total for each number,
  *                   The times object, containing total counts for each number
  *
  * NOTE: min/max is passed to custom function in an object.
*/
var RandomTest = function(fn, options) {
  // Some variables
  var times = {},

  rand = i = j = k = 0,

  percentArray = [],

  options = (typeof fn === 'object' ? fn : (options || {})),

  LOOP_COUNT = (typeof options.loops !== 'undefined' ? options.loops : 999999),
  MIN = (typeof options.min !== 'undefined' ? ~~options.min : 5),
  MAX = (typeof options.max !== 'undefined' ? ~~options.max : 25),

  fn = (typeof fn === 'function') ? fn : function() {
    return false;
  },

  // Counts the total number of entries in an object
  countObj = function(o) {
    var count = 0;

    for (var i in o) count += o[i];

    return count;
  };

  //-- Lets run some code

  // Check for Tom Foolery
  if (LOOP_COUNT > 5000000) {
    console.error(LOOP_COUNT.toString() + " is a silly amount of loops. Try something lower.");

    return false;
  }

  // Setup times obj
  for (j = (MIN - 3); j <= (MAX + 3); j++) {
    times[j] = 0;
  }

  // The dreaded loop
  for (; i < LOOP_COUNT; i++) {
    // Get our random number between ranges
    rand = fn({min: MIN, max: MAX}) || ~~(((Math.random() * (MAX - (MIN - 1))) % (MAX + 1)) + MIN);  

    // Break on out of range number
    if (rand < MIN || rand > MAX) {
      console.error('Out of range number detected. Please alter your function.');      
    }

    // Add to the counter of the 'random' number in this loop
    times[rand]++;
  }

  // Get percentages
  var percentArray = [];
  for(var k = MIN; k <= MAX; k++) {
    percentArray.push(~~((times[k] / LOOP_COUNT) * 100));
    percentArray.push("% / ");
  }
  
  return {
    count: (countObj(times) === LOOP_COUNT ? 'OK!' : 'Total in the times object does not match the loop count!'),
    boundry: (times[MIN - 1] === 0 && times[MIN - 2] === 0 && times[MAX + 1] === 0 && times[MAX + 2] === 0 ? 'OK!' : 'Out of range number!'),
    percentShare: percentArray.join(""),
    times: times
  };  
};