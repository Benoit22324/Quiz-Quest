import type { PartialNote } from "../domain/entities/Note";
import { FaRegStar, FaRegStarHalfStroke, FaStar } from "react-icons/fa6"

export const StarShow = (notes: PartialNote[]) => {
    const totalNotes = notes.reduce((a, c) => c.note ? a += c.note : a, 0);
    const note = totalNotes > 0 ? totalNotes / notes.length : 0;

    const starNode = [];

    for(let i = 1; i <= 5; i++) {
        if (note >= i) starNode.push(<FaStar className="star_icon" key={i} />);
        else if (note < i && note >= i - 0.5) starNode.push(<FaRegStarHalfStroke className="star_icon" key={i} />);
        else starNode.push(<FaRegStar className="star_icon" key={i} />);
    }

    return starNode
}