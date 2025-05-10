- Snaplens folder is the mobile application.
- server folder is the local server.


To connect the Snaplens to the server:
- If using emulator: no changes

- Else if using real phone: 
	1. move to SocketContext.js in Snaplens project folder.
	2. comment out the: 
		const newSocket = io('http://10.0.2.2:5050/chat', {
    			transports: ['websocket'],
    		});
	3. uncomment the:
		const newSocket = io('http://192.168.0.14:5050/chat', {
        		transports: ['websocket'],
    		});
	4. change the 192.168.0.14 to the IP address of your local machine.


To start the server:
1. move to the server/ directory.
2. execute "python chatServer.py".
3. run the http://10.0.2.2:5050/chat for emulator or http://192.168.0.14:5050/chat for real device to start the web application.