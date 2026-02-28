# 3D Binary Search Algorithm Visualizer

A modern, interactive web application for visualizing binary search algorithms in 3D using React, Vite, Three.js, and Firebase.

## Features

 **3D Visualization** - Interactive 3D cube grid visualization using Three.js
**Binary Search Algorithm** - Step-by-step visualization of binary search
 **Real-time Animation** - Control animation speed and playback
 **Custom Data Entry** - Enter your own datasets to visualize
**Firebase Authentication** - Secure login and signup
 **Educational Examples** - Learn about different search algorithms
 **Dark/Light Theme** - Toggle between dark and light themes
 **Responsive Design** - Works on desktop and mobile devices

## Project Structure

```
src/
├── main.jsx                 # React entry point
├── App.jsx                  # Main app component with routing
├── algorithms/
│   └── binarySearch3D.js   # Binary search algorithm implementation
├── components/
│   ├── Navbar.jsx          # Navigation bar
│   ├── BinarySearchVisualizer.jsx  # Main visualizer component
│   ├── CubeGrid3D.jsx      # 3D cube grid using Three.js
│   ├── ControlPanel.jsx    # Search controls
│   ├── SpeedSlider.jsx     # Animation speed control
│   ├── Flowchart.jsx       # Algorithm flowchart
│   ├── FlowNode.jsx        # Flowchart node component
│   ├── DataInput.jsx       # Data input component
│   ├── LogoutDropdown.jsx  # User logout dropdown
│   ├── ThemeToggle.jsx     # Theme toggle button
│   └── *.css               # Component styles
├── context/
│   ├── AuthContext.jsx     # Authentication context
│   └── ThemeContext.jsx    # Theme context
├── firebase/
│   └── firebaseConfig.js   # Firebase configuration
├── pages/
│   ├── Home.jsx            # Home page
│   ├── Login.jsx           # Login page
│   ├── Signup.jsx          # Signup page
│   ├── Simulation.jsx      # Simulation page
│   ├── DataEntry.jsx       # Data entry page
│   ├── RealTimeExamples.jsx # Examples page
│   └── *.css               # Page styles
├── services/
│   ├── firebaseAuth.js     # Firebase authentication service
│   └── firebaseDatabase.js # Firebase database service
└── styles/
    └── theme.css           # Global styles and theme
```

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup Steps

1. **Clone or navigate to the project directory**
```bash
cd "binary search 3d lab"
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure Firebase**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Authentication (Email/Password)
   - Enable Firestore Database
   - Get your Firebase config credentials
   - Update `src/firebase/firebaseConfig.js`:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
}
```

4. **Start the development server**
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Usage

### Home Page
- Overview of the application
- Quick links to main features
- Information about binary search

### Data Entry Page
- Enter comma-separated numbers
- Load example datasets
- Data is automatically sorted
- Click "Start Simulation" to proceed

### Simulation Page
- **3D Visualization**: Rotating cube grid representing your data
- **Search Controls**: Enter a value to search
- **Play/Pause**: Control animation playback
- **Speed Slider**: Adjust animation speed
- **Reset**: Clear the current search
- **Results**: View search statistics and steps

### Real-Time Examples
- Interactive flowchart of search algorithms
- Algorithm complexity information
- Real-world use cases

### Authentication
- Sign up with email and password
- Login to save your datasets
- Logout from the dropdown menu

## Technologies Used

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Three.js** - 3D graphics library
- **Firebase** - Authentication and database
- **React Router** - Client-side routing
- **CSS3** - Styling with neon theme

## Features Explained

### 3D Binary Search Visualization
The application visualizes binary search using an interactive 3D cube grid:
- Each cube represents a data element
- Cyan cubes are unvisited
- Red cubes are currently being checked
- Green cubes indicate the found element
- Cubes scale up when highlighted

### Binary Search Algorithm
The implementation includes:
- Efficient O(log n) search
- Step-by-step visualization
- Iteration tracking
- Found/not found status

### Theme System
- Dark theme (default) with neon cyan and purple accents
- Light theme with soft colors
- Toggle button in navbar
- Preference saved to localStorage

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Optimized 3D rendering with Three.js
- Efficient algorithm implementation
- Responsive design for all screen sizes
- Lazy loading of components

## Troubleshooting

### White Screen
- Check browser console for errors
- Ensure all dependencies are installed: `npm install`
- Clear browser cache and reload

### Firebase Connection Issues
- Verify Firebase credentials in `firebaseConfig.js`
- Check Firebase project settings
- Ensure authentication is enabled

### 3D Visualization Not Showing
- Check if WebGL is supported in your browser
- Update graphics drivers
- Try a different browser

## Development

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Contributing

Feel free to fork and submit pull requests for any improvements.

## License

MIT License - feel free to use this project for educational purposes.

## Support

For issues or questions, please check the browser console for error messages and ensure all dependencies are properly installed.

---

**Happy Learning! 🚀**
