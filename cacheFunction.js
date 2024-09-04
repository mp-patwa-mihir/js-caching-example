/**
 * This function demonstrates how to implement caching for expensive computations or data fetching.
 * It returns a function that caches results based on input parameters to avoid redundant calculations or requests.
 *
 * @param {Function} fn - The function to be cached. It could be a data fetcher or a computationally expensive function.
 * @returns {Function} - A new function that caches the results based on input arguments.
 */
function cacheFunction(fn) {
  const cache = {};

  return function (...args) {
    const key = JSON.stringify(args);

    // Measure start time
    const startTime = performance.now();

    if (cache[key]) {
      // Log the time taken to retrieve from cache
      console.log("Fetching from cache:", key);
      const endTime = performance.now();
      console.log(`Execution time (cached): ${endTime - startTime} ms`);
      return cache[key];
    }

    console.log("Computing result for:", key);
    const result = fn(...args);
    cache[key] = result;

    // Log the time taken to compute the result
    const endTime = performance.now();
    console.log(`Execution time (computed): ${endTime - startTime} ms`);

    return result;
  };
}

// Example usage

// An expensive computation function (e.g., factorial calculation)
function expensiveComputation(n) {
  if (n === 0 || n === 1) return 1;
  return n * expensiveComputation(n - 1);
}

// Wrap the expensive function with caching
const cachedComputation = cacheFunction(expensiveComputation);

console.log(cachedComputation(10)); // Computes and caches the result
console.log(cachedComputation(10)); // Fetches the result from cache

// Simulate a data fetching function
async function fetchData(apiEndpoint) {
  const response = await fetch(apiEndpoint);
  return response.json();
}

// Wrap the data fetching function with caching
const cachedFetchData = cacheFunction(fetchData);

(async () => {
  const data = await cachedFetchData(
    "https://jsonplaceholder.typicode.com/posts/1"
  );
  console.log(data);

  const cachedData = await cachedFetchData(
    "https://jsonplaceholder.typicode.com/posts/1"
  );
  console.log(cachedData); // Fetches from cache
})();
