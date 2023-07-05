import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
import team5 from "assets/images/team-5.jpg";
/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: uuid(),
    content: "this is my first post",
    image: team5,
    likes: {
      likeCount: 1,
      likedBy: [],
      dislikedBy: [],
    },
    username: "devangibhutiya",
    firstName: "Devangi",
    lastName: "Bhutiya",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
