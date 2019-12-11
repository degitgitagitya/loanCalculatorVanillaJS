// Listen for submit
document.querySelector("#loan-form").addEventListener("submit", function(e) {
  // Hide results
  document.querySelector("#results").style.display = "none";
  // Show loader
  document.querySelector("#loading").style.display = "block";

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

// Calculate Results
function calculateResults(e) {
  // UI Vars
  const amount = document.querySelector("#amount");
  const interest = document.querySelector("#interest");
  const years = document.querySelector("#years");
  const monthlyPayment = document.querySelector("#monthly-payment");
  const totalPayment = document.querySelector("#total-payment");
  const totalInterest = document.querySelector("#total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayment = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayment);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayment).toFixed(2);
    totalInterest.value = (monthly * calculatedPayment - principal).toFixed(2);

    // Show results
    document.querySelector("#results").style.display = "block";

    // Hide loader
    document.querySelector("#loading").style.display = "none";
  } else {
    showError("Please check your number");
  }
}

// Show Error
function showError(error) {
  // Hide results
  document.querySelector("#results").style.display = "none";

  // Hide loader
  document.querySelector("#loading").style.display = "none";
  // Create a div
  const errorDiv = document.createElement("div");

  // Get Elements
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  // Add class
  errorDiv.className = "alert alert-danger";

  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  card.insertBefore(errorDiv, heading);

  // Clear error after 3 seconds
  setTimeout(clearError, 3000);
}

// Clear error
function clearError() {
  document.querySelector(".alert").remove();
}
