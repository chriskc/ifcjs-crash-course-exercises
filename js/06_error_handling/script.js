function logDivide(first, second) {
    if (second === 0) {
    // if error is thrown, it gets caught and sent to the catch(error) section
      throw new Error("You can't divide by zero!");
    }
    
    const result = first / second;
    console.log(result);
}

try {
    logDivide(100, 1);
    logDivide(100, 0);
} catch (error) {
    // showing up in the window.console
    console.log("Hey, there was an error: ", error)
    // pop up in window
    alert("Hey, there was an error: " + error)
}

