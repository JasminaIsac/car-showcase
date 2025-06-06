"use client";

import { ShowMoreProps } from "@/types";
import { updateSearchParams } from "@/utils";
import { useRouter } from "next/navigation";
import CustomButton from "./CustomButton";

const ShowMore = ({ pageNumber, isNext }: ShowMoreProps) => {
    const router = useRouter();

    const handleNavigation = () => {
        // const newLimit = (pageNumber + 1) * 10;
        // const newPathName = updateSearchParams("limit", `${newLimit}`);

        // Calculate the new limit (10 more items)
        const newLimit = (pageNumber + 1) * 10;
        
        // Update the URL with the new limit
        const newPathName = updateSearchParams("limit", String(newLimit));
        router.push(newPathName, { scroll: false }); // Added scroll: false to prevent scrolling to top
    }

    return (
        <div className="w-full flex-center gap-5 mt-10">
            {!isNext && (
                <CustomButton
                    title="Show More"
                    btnType="button"
                    containerStyles="bg-primary-blue text-white rounded-full"
                    handleClick={handleNavigation}
                />
            )}
        </div>
    )
}   

export default ShowMore;