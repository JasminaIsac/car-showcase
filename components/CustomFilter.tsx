"use client";
import { CustomButton } from ".";

interface CustomFilterProps {
    title: string;
}

const CustomFilter = ({ title }: CustomFilterProps) => {
    return (
        <div className="custom-filter">
            <div className="custom-filter__button-container">
                <CustomButton 
                    title={title}
                    containerStyles="custom-filter__button"
                    handleClick={() => {}}
                />
            </div>
        </div>
    )
}

export default CustomFilter;