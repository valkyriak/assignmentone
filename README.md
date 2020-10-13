### MyApp - Chat Room

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.6.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Log-In

The default logins are:

- Username: Admin1
- Password: 123

- Username: Admin2
- Password: 123

- Username: Admin3
- Password: 123

### Installation and Running

The best way to get this project up and running is to download the ZIP file from this repository of your choice, open it in an IDE and then follow these steps:
1. Run npm install/update within the my-app directory to ensure you have all the relevant dependencies 
2. Open three terminals
    Run ng serve within the Angular "my-app" directory through the first terminal. 
    Run node server.js within the server directory through the second terminal. 
    Run mongodb within the third terminal.

### Version Control

Throughout the development of this chat app, Github was extensively used for both the side features and main integrations which greatly assisted workflow development. Github acts a data/code backup for all work completed in addition to providing the ability to roll-back features to a previous commits incase something goes wrong or is not working as intended. Github also allows for co-development whether that be open-source or within a privately utilised repository through usage of merge and branch commands. 

There are many modular parts to an Angular project such as the front-end (my-app/src)  and back-end (Server directory in this case). Github provides a transparent and easy way to see what features have been added, when, and by who which makes navigating larger file structures such as this one much easier. With each new feature commited to the repository, commit messages have also been added detailing the change making it even easier to navigate the project development timeline. The primary commands used for this project were:
`git add .`
`git commit -m`
`git push`
`git pull`

### Data Structures

Initially the project used a locally based JSON file which was used to pull actively acquired information such as logins into session or local storage for use of other functionality. These files were located within the data folder within the server directory and were as follows:
>channel_groups.json
>users.json
>group.json

As per requirements, the chat room application had then been extended to include integration with MongoDB noSQL document-based database. The file orgnaisation/collections within MongoDb is as follows.

# Users:
- ID
- Username 
- Password
- Email
- Role

# Groups:
- Name
- Users
- Channels

# Channels:
- Name
- Group_name
- Users

# Chathistory:
- channel_name
- message
- username

### REST API
| Route  | Description |
| ------------- | ------------- |
| /api/channels | Content Cell  |
| /api/groups  | Content Cell  |
| /api/auth  | Content Cell  |
| /api/postAuth  | Content Cell  |
| /api/creategroup  | Content Cell  |
| /api/createchannel  | Content Cell  |
| /api/createuser  | Content Cell  |
| /api/addgroup  | Content Cell  |
| /api/addgroupuser  | Content Cell  |
| /api/addchanneluser  | Content Cell  |
| /api/removeuser  | Content Cell  |
| /api/removegroupuser  | Content Cell  |
| /api/removechanneluser | Content Cell  |
| /api/addgroupuser  | Content Cell  |

### Angular Architecture

## Components
| Component Name  | Description |
| ------------- | ------------- |
| Login | The login component is accessed by the "/login" path and performs the authentication feature for this application. The login component has a html front-end that provides the user an easy and streamlined way to login by entering their appropriate details into the fields then clicking log in. This then triggers the function that searches the available database through the "/api/auth" pathway in order to verify if the user exists. |
| Account  | The account page is a page that displays features relevant to the user's role and permissions. For example the user may be an admin and in which case means they have access to all the commands available within the application.  |
| Main  | The main component is accessed by the '/main' path and is home to all primary chat features the user may want to utilise. The main component has a HTML front-end which utilises bootstrap in order to split the page into three main sections. One column houses the channels and groups join/leave function which triggers the function the user to join or leave the room through the '/api/groups' pathway. The middle column houses the actual chat application which is handled by the socket service. The third column just provides relevant information regarding the group the user is within. |
| Profile  | This houses all information relevant pertaining to the user such as their username, email and details |

## Services
| Service Name  | Description |
| ------------- | ------------- |
| SocketService | The socket service is dedicated towards usage of the actual chat application, depending on the socket emit or broadcast determines the function. Functions include `joinRoom()` which allows a user to join a room by emitting 'join' socket data. `newUserJoined()` broadcasts when a new user has joined the room within the chat. `leaveRoom()` allows the user to leave the room by emitting the 'leave' socket data. `userLeftRoom()` broadcasts when a user leaves the room within the chat to other users. `sendMessage()` emits the 'message' connection allowing users to send messages upon pressing the send button. `newMessageReceived()` allows users in the chat to receive messages. 

## Models
Only one model was used which handled the User information. This is the `user.ts` file.

### Client-Server Architecture
The client-server side architecture of this application is divided in a way in which majority of the data is process through the server side via the HTTPClient whereas the client provides a front-end means in which users can interact and interpret this information. An example would be a particular function being triggered through the press of a button on the front-end client side which in turn processes through the associated service/route and the information is then acquired throuhg the server whether it be from a JSON file or MongoDB collection. This information is then processed and displayed back through the client such as a "log-in successful!" alert. 

### Testing
