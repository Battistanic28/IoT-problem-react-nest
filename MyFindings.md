# **Nick's Project Progress and Findings:**  

- **Completed:** ✅  
- **Started/Incomplete:** 🚧  
- **TODO:** 🚫  

### **Client-Side Tasks (React and TypeScript)**  
1. **✅ Real-Time Data Visualization**  
2. **✅ Control Panel**  
3. **🚧 Date and Time Selector**  
4. **✅ History View**  
5. **✅ Responsive Design**  
6. **🚫 Error Handling**  

### **Server-Side Tasks (NestJS and TypeScript)**  
1. **✅ Dynamic Number Generation with Timestamps**  
2. **🚧 Dynamic Frequency Control**  
3. **✅ WebSocket Support**  
4. **🚫 Number and Timestamp Filtering API**  
5. **🚫 Rate Limiting**  

### **Approach**  
- Prior to a large refactor, all of my core logic and JSX lived in the `App.tsx` file. In a rush to get something working, I ended up with a monolithic component that went against the spirit of modular React development. The most important element of my refactor was separating the socket logic into a custom hook (`useSocket`). This, in addition to splitting the JSX into modular child components, resulted in a major improvement in readability.  

- I chose to use the MUI library on the frontend to save time and streamline development. The `DataGrid` MUI component included features out of the box that would have been very time-consuming to implement from scratch (filtering, scrolling, pagination, etc.).  

### **Challenges**  
- A lot of my time was spent learning the NestJS framework. This was my first time using NestJS and also my first attempt at using WebSockets. The decorators concept in NestJS was also new to me, which presented a fairly sharp learning curve when getting started with development.  

- I discovered that my TypeScript skills are quite rusty. I didn't anticipate trouble there, but it did slow me down considerably.  

- Managing the component lifecycle with WebSockets proved to be quite challenging. In the `useSocket` hook, you can see that I used a combination of `useEffect` and `useState`. I think with some more time and research I could come up with a better solution.

### **Limitations:**  
- The app, as it is currently implemented, is only designed to handle a single client connection. Multiple clients can connect; however, you will see that the interval changes with each new connection. This is because `getRandomNumber` is called within the connection handling.  

- A page refresh in the browser closes the socket connection. This would not be the desired behavior in a production application.  

- The app does not have any data persistence at the moment. It's not very useful to view a rolling chart of the 20 most recent data points. A future iteration of this application could write data to a database (e.g., MongoDB), where it could be queried via an API.  