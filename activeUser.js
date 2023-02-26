import User from "./user";

//this function allows us to easily save who the active user is and call it thoughout the program
export function activeUser(val){
    let theUser = new User();
    theUser = val;
    return theUser;
}