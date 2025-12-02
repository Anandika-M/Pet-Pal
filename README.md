# Virtual Pet Companion 🐾

## Description
Virtual Pet Companion is an interactive web-based virtual pet game where you can care for your own adorable virtual pet! Feed it, play with it, put it to sleep, and watch as it responds to your care. The pet has various needs (happiness, hunger, energy, sleepiness) that change over time, and it's your job to keep your pet happy and healthy.

## Features ✨
- **Interactive Pet**: Click on your pet or interactive items in the room to interact
- **Multiple Actions**: Feed, play, sleep, pet, clean, treat, medicine, and refill food bowl
- **Dynamic Stats**: Six different stats that change over time
- **Real-time Game Loop**: Stats change automatically every 10 seconds
- **Walking Animation**: Pet walks to different locations with smooth animation
- **Food Bowl System**: Food bowl empties after feeding and needs refilling
- **Day/Night Cycle**: Background changes based on real time
- **Mood System**: Pet's mood changes based on its stats
- **Thought Bubbles**: Pet communicates through speech bubbles
- **Save/Load**: Game automatically saves and loads your progress
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Keyboard Shortcuts**: Quick actions using keyboard keys

## How to Play 🎮
1. **Feed** your pet when hunger is high
2. **Play** to increase happiness and energy
3. **Sleep** when energy is low
4. **Pet** for instant happiness boost
5. **Clean** to maintain hygiene and health
6. **Treat** for special rewards
7. **Medicine** when pet gets sick
8. **Refill** food bowl when empty
9. **Click** on interactive items in the room or use action buttons

## Keyboard Shortcuts ⌨️
- **F** = Feed
- **P** = Play
- **S** = Sleep
- **E** = Pet
- **C** = Clean
- **T** = Treat
- **M** = Medicine
- **R** = Refill
- **Ctrl + X** = Reset game

## Files Structure 📁
```
virtual-pet-game/
├── index.html          # Main HTML file
├── style.css          # Styling and animations
├── script.js          # Game logic and functionality
└── assets/            # Image assets
    ├── bed.png
    ├── food.png
    ├── food_fill.png
    ├── happy.png
    ├── home-bg.png
    ├── neutral.png
    ├── sad.png
    ├── sleeping.gif
    ├── toy.png
    ├── walking1.png
    └── walking2.png
```

## Stats Explained 📊
- **Happiness**: How happy your pet is (affected by all actions)
- **Hunger**: How hungry your pet is (increases over time)
- **Energy**: How energetic your pet is (decreases with activity)
- **Sleepiness**: How tired your pet is (increases over time)
- **Health**: Overall health (affected by hygiene and hunger)
- **Hygiene**: Cleanliness (decreases over time)

## Pet Moods 😊
The pet's mood changes based on its happiness level:
- 😄 Very Happy (85%+)
- 😊 Happy (70%+)
- 🙂 Content (50%+)
- 😔 Sad (30%+)
- 😢 Very Sad (15%+)
- 😭 Depressed (below 15%)
- 💤 Sleeping
- 🤒 Sick (when health < 50%)

## Technical Details 🔧
- Built with vanilla JavaScript, HTML5, and CSS3
- Uses CSS animations for smooth transitions
- Local storage for saving game progress
- Responsive design with media queries
- Object-oriented programming with ES6 classes
- Promise-based asynchronous operations for animations

## Requirements 📋
- Modern web browser (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- Local storage support

## Installation 🚀
1. Download all files
2. Place all files in the same directory
3. Ensure `assets` folder contains all required images
4. Open `index.html` in your web browser
5. Start playing!

## Tips for Success 💡
- Keep an eye on all stats - they affect each other
- Don't let hunger get too high - it affects health
- Sleep is the best way to recover energy
- Regular cleaning prevents health issues
- The food bowl needs refilling after each feeding
- Clicking on the pet directly gives a happiness boost

Enjoy taking care of your virtual pet! 🐾❤️
