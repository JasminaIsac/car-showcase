import Image from "next/image"; 
import { Hero, CustomFilter, SearchBar, CarCard, ShowMore } from "@/components";
import { fetchCars } from "@/utils";
import { fuels, yearsOfProduction } from "@/constants";

export default async function Home({ searchParams }: { searchParams: any }) {
  const allCars = await fetchCars({
    manufacturer: searchParams.manufacturer || "",
    year: searchParams.year ? parseInt(searchParams.year) : 2022,
    fuel: searchParams.fuel || "",
    //limit: searchParams.limit ? parseInt(searchParams.limit) : 10,
    model: searchParams.model || "",
  });
  
  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  // Calculate how many items to show
  const itemsPerLoad = 10;
  const currentLimit = searchParams.limit ? parseInt(searchParams.limit) : itemsPerLoad;
  const paginatedCars = Array.isArray(allCars) ? allCars.slice(0, currentLimit) : [];

  return (
    <main className="overflow-hidden">
        <Hero />
        <div className="mt-12 padding-x padding-y max-width" id="discover">
          <div className="home__text-container">
            <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
            <p>Explore the cars you might like</p>
          </div>

          <div className="home__filters">
            <SearchBar />

            <div className="home__filter-container">
              <CustomFilter title="fuel" options={fuels} />
              <CustomFilter title="year" options={yearsOfProduction} />
            </div>
          </div>

          {!isDataEmpty ? (
            <section>
              <div className="home__cars-wrapper">
              {/*{allCars?.map((car) => ( */}
                {paginatedCars?.map((car) => (
                  <CarCard key={`${car.make}-${car.model}-${car.year}`} car={car}/>
                ))}
              </div>
              <ShowMore
                // pageNumber={Number(searchParams.limit) / 10}
                // isNext={(Number(searchParams.limit) < allCars.length)}
                pageNumber={Math.floor(currentLimit / itemsPerLoad)}
                isNext={currentLimit < (allCars?.length || 0)}
              />
            </section>
          ) : (
            <div className="home__error-container">
              <h2 className="text-black text-xl font-bold">Oops, no results</h2>
              <p>{allCars?.message}</p>
            </div>
          )}
        </div>
    </main>
  );
}
