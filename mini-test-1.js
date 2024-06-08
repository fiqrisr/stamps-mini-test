function isPrime(num) {
	if (num <= 1) {
		return false;
	}

	if (num <= 3) return true;

	if (num % 2 === 0 || num % 3 === 0) return false;

	for (let i = 5; i <= Math.sqrt(num); i += 6) {
		if (num % i === 0 || num % (i + 2) === 0) return false;
	}

	return true;
}

const result = [];

Array.from({ length: 100 }).forEach((_, i) => {
	const num = i + 1;

	if (!isPrime(num)) {
		if (num % 3 === 0 && num % 5 === 0) return result.unshift("FooBar");
		if (num % 5 === 0) return result.unshift("Bar");
		if (num % 3 === 0) return result.unshift("Foo");

		result.unshift(num);
	}
});

console.log(result.join(", "));
