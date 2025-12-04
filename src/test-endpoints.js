// A file to test the API Validator scanner

const stripeApi = "https://api.stripe.com/v1/charges";
const internalService = "http://dev.my-internal-api.com/users";

// The scanner should find both of the URLs above.

// This one might not be found because it doesn't have "api" or "dev"
const regularUrl = "https://www.google.com";