require('dotenv').config();
const https = require('https'); 

function httpsGet(url){
return new Promise((resolve, reject) => {
    https.get(url, (response) => {
        let data = ''; 

        response.on('data',(chunk) => {
            data += chunk; 
        });  

    response.on('end',() => {
        if (response.statusCode === 200) {
            resolve(JSON.parse(data)); 
        } else {
            reject(new Error(`HTTP error! Status: ${response.statusCode}`)); 
        }
    }); 
}).on('error', (error) => {
    reject(error); 
}); 
}); 
}

async function fetchPosts() {
    try {
        const baseUrl = process.env.BASE_URL; 
        if (!baseUrl) {
            throw new Error('BASE_URL is not defined in .env file'); 
        }

    const endpoint = `${baseUrl}/posts`; 
    console.log('Fetching data from: ${endpoint}'); 
    const posts = await httpsGet(endpoint); 
    console.log(`Successfully retrieved ${posts.length} posts\n`);
    console.log('Titles:'); 
    posts.forEach((post, index) => {
        console.log(`${index + 1}. ${post.title}`);
    }); 
} catch (error) {
    console.log('Error occurred while fetching posts:');
    console.log(`Error Type: ${error.name}`); 
    console.log(`Error Message: ${error.message}`); 
    if (error.cause) {
        console.log(`Error Cause: ${error.cause}`); 
    }
}
}

fetchPosts(); 