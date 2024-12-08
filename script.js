function fetchUserData(){
    const userList = document.getElementById('user-list');
    userList.innerHTML = '<li> Loading . . . </li>';
    
    // Fetch data from the API

    fetch('https://jsonplaceholder.typicode.com/users')
        .then(function (response){
            // Check is the response is valid
            if (!response.ok){
                throw new Error('Failed to fetch data');
            }
            return response.json()
        })

        .then(function (users){
            // Display the info of the users

            userList.innerHTML = '';
            users.forEach(function (user){

                // Extract 10 digit phone number
                const phone = user.phone.replace(/[^0-9]/g, '').slice(0, 10);

                // Create a user card
                const userCard = document.createElement('li');
                userCard.className = 'user-card';
                userCard.innerHTML = `
                    <h2>${user.name}</h2>
                    <p>Email: ${user.email}</p>
                    <p>Phone: ${phone}</p>
                `;
                userList.appendChild(userCard);
            });
        })

        .catch(function (error){
            // Handle errors that might occur
            userList.innerHTML = '<li>Error loading data . . . PLease try again</li>';
            console.error('Error: ', error);
        });
}

// Create Event Listener for the Button
document.getElementById('reload-button').addEventListener('click', fetchUserData);

// Fetch user data when the page loads
fetchUserData();