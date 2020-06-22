import axios from "axios";

// registration logic 
// we have to catch significantinfos of user like name email etc..
export const register = newUser => {
      return axios
      .post("user/register", {
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email,
            password: newUser.password,

      })
      .then(res => {
            console.log("Registered!")
      })
}

// Login logic! comparing  
export const login = user => {
      return axios
      .post("users/login", {
            password: user.password
      })
      .then(res => {
            localStorage.setItem("usertoken", res.data)
            return res.data
      })
      .catch(err => {
            console.log(err)
      })
} 