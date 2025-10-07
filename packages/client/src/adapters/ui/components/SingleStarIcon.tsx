import { FaRegStar, FaRegStarHalfStroke, FaStar } from "react-icons/fa6"

export type SingleStarIconProps = {
    note: number
    limit: number
}

export const SingleStarIcon = ({ note, limit }: SingleStarIconProps) => {
    const selectStar = (type: string) => {
        switch(type) {
            case "full": return <FaStar className="star_icon" />
            case "half": return <FaRegStarHalfStroke className="star_icon" />
            case "empty": return <FaRegStar className="star_icon" />
            default: return <FaRegStar className="star_icon" />
        }
    }

    return <>
        {
            note >= limit ? selectStar("full")
            : (note <= limit - 0.5 && note > limit - 1) ? selectStar("half")
            : selectStar("empty")
        }
    </>
}