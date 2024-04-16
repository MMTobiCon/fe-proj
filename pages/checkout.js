"use strict";

document.addEventListener('DOMContentLoaded', 
function() {

// Grab orders from session Storage
    const products =  JSON.parse(localStorage.getItem("orders"))
    const total = localStorage.getItem("Total")
    for (let product of products){

          $("#item_container").append(
           ` <p>${product.name} <span class="price">${product.price}</span>
     
           </p>`
          )
          $("#total b").empty().append(total)
        }

	const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/;
	

	// code for Event handler for form submission
	document.getElementById("checkout_form").addEventListener("submit", function(event) {
		event.preventDefault();
    // For getting form values
		const email = 
		document.getElementById("email").value.trim();
		const number = 
		document.getElementById("credit_card").value.trim();
		
    // Validates form values
		const errors = {};
		if (credit_card === "") {
			errors["credit-error"] = "*Please enter your credit card";
		}
		else if (isNaN(credit-card)) {
			errors["credit-error"] = "*Enter a valid phone number";
		}
		if (email === "") {
			errors["email-error"] = "*Please enter an email address";
		  } else if (!emailPattern.test(email)) {
			errors["email-error"] = "*Please enter a valid email address";
		  }
		  if (Object.keys(errors).length > 0) {
			displayErrors(errors);
			return;
		  }
	   
		  // Proceeds with form submission
		});
		function displayErrors(errors) {
			for (let key in errors) {
			  document.getElementById(key).textContent = errors[key];
			}
		  }

          
		});