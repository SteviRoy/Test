
/* eslint-disable */
// everything that should happen when the submit button is clicked on the signup page after filling out/selecting values for stuff
const signupFormHandler = async (event) => {
    event.preventDefault();
    // for text/typed input we will just query the value in the input area
    const name = document.querySelector('#user_name').value;
    const email = document.querySelector('#user_email').value;
    const password = document.querySelector('#user_password').value;
    const bio = document.querySelector('#user_bio').value;
    const favorite_food = document.querySelector('#favorite_food').value;
    const birthday = document.querySelector('#user_birthdate').value;
    // for radio-button options (gender and avatars) will query all buttons with same name ('gender' for gender buttons, 'avatar' for avatar buttons) 
    const genderOptions = document.getElementsByName('gender');
    let gender; 
    // loop through all options (radio buttons) for genderOptions and whichever button is 'checked' will decide the value of gender variable
    for (i of genderOptions) {
        if (i.checked === true) {gender = i.value};
    };
    // for the 'select' input dropdown boxes we can simply query the box that contains all of the options and get the value (which will be decided by whatever the user clicked in the dropdown)
    const location = (document.getElementById('location').value);
    const what_to_eat = (document.getElementById('what-to-eat').value);
    const zodiac = (document.getElementById('zodiac').value);

    // will do the same thing for avatars as did for gender options
    const avatars = document.getElementsByName('avatar');
    let profile_pic;
    for (i of avatars) {
        if (i.checked === true) {profile_pic = i.value};
    };
    const answers = {name, email, password, favorite_food, bio, birthday, gender, location, what_to_eat, zodiac, profile_pic};
    console.log(answers);
    fetch("api/users", {
        method: "POST",
        body: JSON.stringify(answers),
        headers: {"Content-Type": "application/json"},
    });
}; 

// event listener for the signup button
document.querySelector("#signup-btn").addEventListener("click", signupFormHandler);


// event listener for the signup button
document
  .querySelector('#signup-btn')
  .addEventListener('click', signupFormHandler);
