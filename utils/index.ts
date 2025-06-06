import { CarProps, FilterProps } from "@/types";

export async function fetchCars( filters: FilterProps) {

    const { manufacturer, year, model, fuel, limit } = filters;
    
    const headers = {
        'X-RapidAPI-Key': '9798d72b04msh8bf6082c33da6fbp1564b6jsnc6fa69da43ec',
        'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
    }

    const response = await fetch(`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&fuel_type=${fuel}&limit=${limit}`, {
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

    // If city_mpg is not a number or is NaN, use 24 as default
    const validCityMpg = typeof city_mpg === 'number' && !isNaN(city_mpg) ? city_mpg : 24;

    const mileageRate = validCityMpg * mileageFactor;
    const ageRate = (currentYear - year) * ageFactor;

    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;
    return Number(rentalRatePerDay.toFixed(2));
}


export const generateCarImageUrl = (car: any, angle?: string) => {
    const url = new URL("https://cdn.imagin.studio/getimage");
  
    const { make, year, model } = car;
  
    url.searchParams.append("customer", "hrjavascript-mastery");
    url.searchParams.append("zoomType", "fullscreen");
    url.searchParams.append("paintdescription", "radiant-green");
    url.searchParams.append("modelFamily", model.split(" ")[0]);
    url.searchParams.append("make", make);
    url.searchParams.append("modelYear", `${year}`);
    url.searchParams.append("angle", `${angle || "0"}`);
  
    return `${url}`;
  };


  //Vinaudit Demo API - not working

// export const generateCarImageUrl = (car: CarProps) => {
//     const modelSlug = car.model.toLowerCase().replace(/\s+/g, "_"); // ex: "corolla ce" => "corolla_ce"
//     const carId = `${car.year}_${car.make.toLowerCase()}_${modelSlug}`;
  
//     const url = new URL("https://images.vinaudit.com/v3/images");
//     url.searchParams.append("id", carId);
//     url.searchParams.append("format", "json");
//     url.searchParams.append("key", "VA_DEMO_KEY"); // cheia demo
  
//     return url.toString();
//   };


//Pexels API - working, but not needed images
  
// const API_KEY = "i1uDOCaf9B5OTKhhpnk4bCFpNxc7WFwfzdQDSCiLLRaMBetyJWoqYEA6";

// export const fetchCarImageUrl = async (car: CarProps): Promise<string | null> => {
//     try {
//         const query = `${car.make} ${car.model} ${car.year} car`;
//         const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`;
        
//         console.log('Fetching image for query:', query);
        
//         const response = await fetch(url, {
//             headers: {
//                 Authorization: API_KEY,
//             },
//         });
        
//         if (!response.ok) {
//             console.error("Pexels API Error:", response.status, await response.text());
//             return null;
//         }
        
//         const data = await response.json();
//         console.log('Pexels API response:', data);
        
//         if (data.photos && data.photos.length > 0) {
//             // Use large2x instead of original for better performance
//             return data.photos[0].src.large2x;
//         } else {
//             console.log('No photos found for:', query);
//             return null;
//         }
//     } catch (error) {
//         console.error('Error in fetchCarImageUrl:', error);
//         return null;
//     }
// };

export const updateSearchParams = (type: string, value: string) => {
    const searchParams = new URLSearchParams(window.location.search);
  
    searchParams.set(type, value);
  
    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
  
    return newPathname;
  };