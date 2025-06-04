export async function fetchCars() {
    const headers = {
        'X-RapidAPI-Key': '9798d72b04msh8bf6082c33da6fbp1564b6jsnc6fa69da43ec',
        'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
    }

    const response = await fetch('https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=corolla', {
        headers: headers,
    });

    const result = await response.json();
    
    return result;
}



export function calculateRentalRate(city_mpg: any, year: number): number {
    const basePricePerDay = 50;
    const mileageFactor = 0.1;
    const ageFactor = 0.05;

    const currentYear = new Date().getFullYear();

    // Verificare dacă city_mpg este un număr valid, altfel se folosește 24
    const validCityMpg = typeof city_mpg === 'number' && !isNaN(city_mpg) ? city_mpg : 24;

    const mileageRate = validCityMpg * mileageFactor;
    const ageRate = (currentYear - year) * ageFactor;

    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;
    return Number(rentalRatePerDay.toFixed(2));
}