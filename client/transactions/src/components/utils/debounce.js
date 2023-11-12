// Debounce function to delay the execution of a function
const debounce = (func, delay) => {
    // Variable to store the timer reference
    let debounceTimer;

    // Return a function that will be used for debouncing
    return function () {
        // Store the current context and arguments
        const context = this;
        const args = arguments;

        // Clear the previous timer to restart the delay
        clearTimeout(debounceTimer);

        // Set a new timer to execute the function after the specified delay
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
};

// Export the debounce function
export default debounce;
