"use strict";
const getusername = document.querySelector("#user");
const formSubmit = document.querySelector("#form");
const main_container = document.querySelector(".main_container");
//reusable function
async function myCustomFetcher(url, options) {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`Network response was not ok - status:${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
}
//display the card ui
const showResultUI = (singleUser) => {
    const { avatar_url, login, url, location } = singleUser;
    main_container.insertAdjacentHTML("beforeend", `<div class="card">
    <img src=${avatar_url} alt=${login} />
    <hr />
    <div class="card-footer">
    <img src=${avatar_url} alt=${login} />
    <a href="${url}">Github </a>
    </div>
    </div>`);
};
function fetchUserData(url) {
    myCustomFetcher(url, {}).then((userinfo) => {
        for (const singleUser of userinfo) {
            showResultUI(singleUser);
        }
    });
}
//default function cal
fetchUserData("https://api.github.com/users");
//search functionality
formSubmit.addEventListener("submit", async (e) => {
    e.preventDefault();
    const searchTerm = getusername.value.toLowerCase();
    try {
        const url = "https://api.github.com/users";
        const allUsersInfo = await myCustomFetcher(url, {});
        const matchingUsers = allUsersInfo.filter((user) => {
            return user.login.toLowerCase().includes(searchTerm);
        });
        //we need to clear the previous data
        main_container.innerHTML = "";
        if (matchingUsers.length === 0) {
            main_container?.insertAdjacentHTML("beforeend", `<p class="empty_msg">No matching users found.</p>`);
        }
        else {
            for (const singleUser of matchingUsers) {
                showResultUI(singleUser);
            }
        }
    }
    catch (error) {
        console.log(error);
    }
});
