import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import team5 from "assets/images/team-5.jpg";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    image: team5,
    firstName: "Devangi",
    lastName: "Bhutiya",
    username: "devangibhutiya",
    password: "devangi@123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },

  {
    _id: uuid(),
    firstName: "Chintan",
    image: team2,
    lastName: "Bhutiya",
    username: "chintanhutiya",
    password: "chintan@123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },

  {
    _id: uuid(),
    firstName: "Nency",
    image: team3,
    lastName: "Patel",
    username: "nencypatel",
    password: "nency@123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },

  {
    _id: uuid(),
    firstName: "Akash",
    image: team4,
    lastName: "Patel",
    username: "akashpatel",
    password: "akash@123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
