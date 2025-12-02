// VIRTUAL PET GAME - COMPLETE LOGIC
class VirtualPet {
    constructor() {
        // Pet stats (0-100)
        this.stats = {
            happiness: 100,
            hunger: 0,
            energy: 100,
            sleepiness: 0,
            health: 100,
            hygiene: 100
        };
        
        // Pet state
        this.state = 'idle'; // idle, walking, eating, playing, sleeping, sad, sick
        this.mood = 'Happy';
        this.isWalking = false;
        this.currentAnimation = null;
        
        // Food bowl state
        this.foodBowlFull = true;
        
        // Image paths - using your exact files
        this.images = {
            idle: 'assets/neutral.png',
            happy: 'assets/happy.png',
            sad: 'assets/sad.png',
            sleeping: 'assets/sleeping.gif', // Using GIF for sleeping
            walking1: 'assets/walking.gif',
            walking2: 'assets/walking2.png',
            eating: 'assets/happy.png',
            playing: 'assets/happy.png'
        };
        
        // DOM Elements
        this.petImage = document.getElementById('petImage');
        this.thoughtBubble = document.getElementById('thoughtBubble');
        this.petContainer = document.getElementById('petContainer');
        this.currentMood = document.getElementById('currentMood');
        this.sunMoon = document.getElementById('sunMoon');
        this.sky = document.getElementById('sky');
        
        // Food bowl element
        this.foodBowlImg = document.querySelector('#foodBowl .item-img');
        
        // Stats display elements
        this.statElements = {
            happiness: document.getElementById('happinessBar'),
            hunger: document.getElementById('hungerBar'),
            energy: document.getElementById('energyBar'),
            sleepiness: document.getElementById('sleepinessBar')
        };
        
        this.statValues = {
            happiness: document.getElementById('happinessValue'),
            hunger: document.getElementById('hungerValue'),
            energy: document.getElementById('energyValue'),
            sleepiness: document.getElementById('sleepinessValue')
        };
        
        // Time display
        this.timeOfDay = document.getElementById('timeOfDay');
        
        // Action buttons
        this.actions = {
            feed: document.getElementById('feedBtn'),
            play: document.getElementById('playBtn'),
            sleep: document.getElementById('sleepBtn'),
            pet: document.getElementById('petBtn'),
            clean: document.getElementById('cleanBtn'),
            treat: document.getElementById('treatBtn'),
            medicine: document.getElementById('medicineBtn'),
            refill: document.getElementById('refillBtn'),
            reset: document.getElementById('resetBtn')
        };
        
        // Interactive items
        this.items = {
            food: document.getElementById('foodBowl'),
            toy: document.getElementById('toy'),
            bed: document.getElementById('bed')
        };
        
        // Position mapping - Updated to match CSS positions
        this.positions = {
            center: '50%',
            food: '50%',
            toy: '75%',
            bed: '30%'
        };
        
        this.init();
    }
    
    init() {
        console.log('🎮 Virtual Pet Game Initialized!');
        
        // Load saved data
        this.loadGame();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Initial display update
        this.updateDisplay();
        
        // Update food bowl image
        this.updateFoodBowl();
        
        // Show welcome message
        this.showThought('Hello! I\'m your new pet! 🐾 Take good care of me!', 3000);
        
        // Start game loop
        this.startGameLoop();
        
        // Start idle animations
        this.startIdleAnimations();
        
        // Start auto-refill timer
        this.startAutoRefill();
    }
    
    setupEventListeners() {
        // Action buttons
        this.actions.feed.addEventListener('click', () => this.feed());
        this.actions.play.addEventListener('click', () => this.play());
        this.actions.sleep.addEventListener('click', () => this.sleepToggle());
        this.actions.pet.addEventListener('click', () => this.pet());
        this.actions.clean.addEventListener('click', () => this.clean());
        this.actions.treat.addEventListener('click', () => this.treat());
        this.actions.medicine.addEventListener('click', () => this.medicine());
        this.actions.refill.addEventListener('click', () => this.refillFoodBowl());
        this.actions.reset.addEventListener('click', () => this.resetGame());
        
        // Interactive items
        this.items.food.addEventListener('click', () => this.feed());
        this.items.toy.addEventListener('click', () => this.play());
        this.items.bed.addEventListener('click', () => this.sleepToggle());
        
        // Pet click
        this.petImage.addEventListener('click', () => this.pet());
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }
    
    handleKeyboard(e) {
        if (e.ctrlKey || e.altKey) return;
        
        switch(e.key.toLowerCase()) {
            case 'f': this.feed(); break;
            case 'p': this.play(); break;
            case 's': this.sleepToggle(); break;
            case 'e': this.pet(); break;
            case 'c': this.clean(); break;
            case 't': this.treat(); break;
            case 'm': this.medicine(); break;
            case 'r': this.refillFoodBowl(); break;
            case 'x': if (e.ctrlKey) this.resetGame(); break;
        }
    }
    
    // ACTION METHODS
    async feed() {
        if (this.state === 'sleeping') {
            this.showThought('Zzz... I\'m sleeping... 😴');
            return;
        }
        
        if (!this.foodBowlFull) {
            this.showThought('The food bowl is empty! Please refill! 🍽️');
            return;
        }
        
        if (this.stats.hunger < 15) {
            this.showThought('I\'m not hungry right now! 🍎');
            return;
        }
        
        // Walk to food bowl
        await this.walkTo('food');
        
        // Empty the food bowl
        this.foodBowlFull = false;
        this.updateFoodBowl();
        
        // Eating action
        this.state = 'eating';
        this.showThought('Yum! This is delicious! 🍓');
        
        // Update stats
        this.updateStat('hunger', -30);
        this.updateStat('happiness', 10);
        this.updateStat('energy', 5);
        
        // Eating animation
        this.petImage.classList.add('eating');
        
        // Update display
        this.updateDisplay();
        
        // Wait for eating to finish
        await this.wait(2000);
        
        // Clean up
        this.petImage.classList.remove('eating');
        this.state = 'idle';
        this.updateDisplay();
    }
    
    async play() {
        if (this.state === 'sleeping') {
            this.showThought('Zzz... Let me sleep... 😴');
            return;
        }
        
        if (this.stats.energy < 25) {
            this.showThought('I\'m too tired to play... 💤');
            return;
        }
        
        // Walk to toy
        await this.walkTo('toy');
        
        // Playing action
        this.state = 'playing';
        this.showThought('Yay! Playtime is fun! 🎾');
        
        // Update stats
        this.updateStat('energy', -20);
        this.updateStat('happiness', 25);
        this.updateStat('hunger', 15);
        this.updateStat('sleepiness', 10);
        
        // Playing animation
        this.petImage.classList.add('bouncing');
        
        // Update display
        this.updateDisplay();
        
        // Wait for playing to finish
        await this.wait(2500);
        
        // Clean up
        this.petImage.classList.remove('bouncing');
        this.state = 'idle';
        this.updateDisplay();
    }
    
    async sleepToggle() {
        if (this.state === 'sleeping') {
            this.wakeUp();
            return;
        }
        
        // Walk to bed
        await this.walkTo('bed');
        
        // Sleeping action
        this.state = 'sleeping';
        this.showThought('Goodnight... Time for sleep... 😴');
        
        // Update display (will show sleeping GIF)
        this.updateDisplay();
    }
    
    wakeUp() {
        this.state = 'idle';
        this.showThought('Good morning! I feel rested! ☀️');
        
        // Recover energy from sleep
        this.updateStat('energy', 40);
        this.updateStat('sleepiness', -50);
        this.updateStat('health', 10);
        
        this.updateDisplay();
    }
    
    pet() {
        if (this.state === 'sleeping') {
            this.showThought('Zzz... 😴');
            return;
        }
        
        this.showThought('I love when you pet me! 💕');
        
        // Update stats
        this.updateStat('happiness', 15);
        this.updateStat('sleepiness', -5);
        
        // Happy animation
        this.petImage.classList.add('happy');
        setTimeout(() => this.petImage.classList.remove('happy'), 1000);
        
        this.updateDisplay();
    }
    
    clean() {
        if (this.state === 'sleeping') {
            this.showThought('Zzz... 😴');
            return;
        }
        
        this.showThought('I feel fresh and clean! 🛁');
        
        // Update stats
        this.updateStat('hygiene', 40);
        this.updateStat('happiness', 10);
        this.updateStat('health', 5);
        
        this.updateDisplay();
    }
    
    treat() {
        if (this.state === 'sleeping') {
            this.showThought('Zzz... 😴');
            return;
        }
        
        this.showThought('Yummy treat! Thank you! 🍪');
        
        // Update stats
        this.updateStat('happiness', 20);
        this.updateStat('hunger', -10);
        this.updateStat('energy', 10);
        
        // Happy animation
        this.petImage.classList.add('happy');
        setTimeout(() => this.petImage.classList.remove('happy'), 1000);
        
        this.updateDisplay();
    }
    
    medicine() {
        if (this.state === 'sleeping') {
            this.showThought('Zzz... 😴');
            return;
        }
        
        if (this.stats.health > 80) {
            this.showThought('I\'m not sick! I feel fine! 💊');
            return;
        }
        
        this.showThought('Medicine tastes bad but I needed it... 🩹');
        
        // Update stats
        this.updateStat('health', 50);
        this.updateStat('happiness', -10);
        
        this.updateDisplay();
    }
    
    // WALKING SYSTEM - EXTENDED DURATION
    async walkTo(destination) {
        if (this.isWalking || this.state === 'sleeping') return;
        
        this.isWalking = true;
        this.state = 'walking';
        
        const targetPosition = this.positions[destination];
        const currentPosition = this.petContainer.style.left || this.positions.center;
        
        // Start walking animation - longer duration
        let walkStep = 0;
        const walkInterval = setInterval(() => {
            walkStep = (walkStep + 1) % 2;
            this.petImage.src = this.images[`walking${walkStep + 1}`];
        }, 400); // Slower animation (400ms instead of 300ms)
        
        this.petImage.classList.add('walking');
        
        // Calculate distance and duration - longer movement
        const currentPercent = parseInt(currentPosition);
        const targetPercent = parseInt(targetPosition);
        const distance = Math.abs(targetPercent - currentPercent);
        const duration = Math.min(distance * 25, 2000); // Increased to max 2 seconds
        
        // Move pet container
        this.petContainer.style.transition = `left ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        this.petContainer.style.left = targetPosition;
        
        // Wait for movement to complete
        await this.wait(duration);
        
        // Keep walking animation for a bit longer after reaching destination
        await this.wait(500);
        
        // Clean up
        clearInterval(walkInterval);
        this.petImage.classList.remove('walking');
        this.isWalking = false;
        this.state = 'idle';
        
        // Update pet image back to idle
        this.updatePetImage();
    }
    
    // FOOD BOWL MANAGEMENT
    updateFoodBowl() {
        if (this.foodBowlFull) {
            this.foodBowlImg.src = 'assets/food_fill.png'; // Full food bowl
        } else {
            this.foodBowlImg.src = 'assets/food.png'; // Empty food bowl
        }
    }
    
    refillFoodBowl() {
        if (!this.foodBowlFull) {
            this.foodBowlFull = true;
            this.updateFoodBowl();
            
            // Add refill animation
            this.foodBowlImg.classList.add('refilling');
            setTimeout(() => {
                this.foodBowlImg.classList.remove('refilling');
            }, 500);
            
            this.showThought('Food bowl has been refilled! 🍎');
        } else {
            this.showThought('Food bowl is already full! 🍽️');
        }
    }
    
    startAutoRefill() {
        // Auto-refill food bowl every 3 minutes
        setInterval(() => {
            if (!this.foodBowlFull) {
                this.refillFoodBowl();
            }
        }, 180000); // 3 minutes in milliseconds
    }
    
    // STAT MANAGEMENT
    updateStat(stat, change) {
        this.stats[stat] = Math.max(0, Math.min(100, this.stats[stat] + change));
    }
    
    // DISPLAY UPDATE
    updateDisplay() {
        // Update stat bars
        for (const [stat, element] of Object.entries(this.statElements)) {
            element.style.width = `${this.stats[stat]}%`;
        }
        
        // Update stat values
        for (const [stat, element] of Object.entries(this.statValues)) {
            element.textContent = `${Math.round(this.stats[stat])}%`;
        }
        
        // Update mood
        this.updateMood();
        this.currentMood.textContent = this.mood;
        
        // Update time
        this.updateTime();
        
        // Update pet image
        this.updatePetImage();
        
        // Save game state
        this.saveGame();
    }
    
    updateMood() {
        if (this.state === 'sleeping') {
            this.mood = 'Sleeping 💤';
        } else if (this.stats.health < 50) {
            this.mood = 'Sick 🤒';
        } else if (this.stats.happiness >= 85) {
            this.mood = 'Very Happy 😄';
        } else if (this.stats.happiness >= 70) {
            this.mood = 'Happy 😊';
        } else if (this.stats.happiness >= 50) {
            this.mood = 'Content 🙂';
        } else if (this.stats.happiness >= 30) {
            this.mood = 'Sad 😔';
        } else if (this.stats.happiness >= 15) {
            this.mood = 'Very Sad 😢';
        } else {
            this.mood = 'Depressed 😭';
        }
    }
    
    updatePetImage() {
        // Don't change image if walking (it's controlled by walkTo method)
        if (this.state === 'walking' || this.isWalking) {
            return;
        }
        
        let imageSrc = this.images.idle;
        
        if (this.state === 'sleeping') {
            // Use sleeping GIF
            imageSrc = this.images.sleeping;
        } else if (this.stats.happiness >= 70 || this.state === 'playing' || this.state === 'eating') {
            imageSrc = this.images.happy;
        } else if (this.stats.happiness <= 30) {
            imageSrc = this.images.sad;
        }
        
        // Only update if image has changed
        if (this.petImage.src && !this.petImage.src.includes(imageSrc.split('/').pop())) {
            this.petImage.src = imageSrc;
        } else if (!this.petImage.src) {
            this.petImage.src = imageSrc;
        }
    }
    
    updateTime() {
        const hour = new Date().getHours();
        let time = 'Day';
        
        if (hour >= 5 && hour < 12) {
            time = 'Morning 🌅';
        } else if (hour >= 12 && hour < 17) {
            time = 'Afternoon ☀️';
        } else if (hour >= 17 && hour < 20) {
            time = 'Evening 🌇';
        } else {
            time = 'Night 🌙';
        }
        
        this.timeOfDay.textContent = time;
        
        // Update sun/moon visual
        if (hour >= 6 && hour < 18) {
            // Day
            this.sunMoon.style.background = '#ffde59';
            this.sunMoon.style.boxShadow = '0 0 30px #ffde59';
            this.sky.style.background = 'linear-gradient(to bottom, #87ceeb, #98d8f0)';
        } else {
            // Night
            this.sunMoon.style.background = '#f0f0f0';
            this.sunMoon.style.boxShadow = '0 0 20px #f0f0f0';
            this.sky.style.background = 'linear-gradient(to bottom, #1a237e, #283593)';
        }
    }
    
    // GAME LOOP
    startGameLoop() {
        setInterval(() => {
            // Passive stat changes
            this.updateStat('hunger', 1.5);
            this.updateStat('sleepiness', 1);
            this.updateStat('energy', -0.8);
            this.updateStat('hygiene', -0.5);
            
            // Effects of low stats
            if (this.stats.hunger > 70) {
                this.updateStat('happiness', -2);
                this.updateStat('health', -1);
            }
            
            if (this.stats.sleepiness > 80 && this.state !== 'sleeping') {
                this.updateStat('happiness', -1.5);
                this.updateStat('energy', -2);
            }
            
            if (this.stats.hygiene < 30) {
                this.updateStat('health', -2);
                this.updateStat('happiness', -1);
            }
            
            if (this.stats.health < 50) {
                this.updateStat('happiness', -3);
            }
            
            // Benefits of sleeping
            if (this.state === 'sleeping') {
                this.updateStat('energy', 10);
                this.updateStat('sleepiness', -12);
                this.updateStat('health', 3);
                
                // Auto-wake when fully rested
                if (this.stats.energy >= 95 && this.stats.sleepiness <= 20) {
                    this.wakeUp();
                }
            }
            
            // Random events (10% chance per cycle)
            if (Math.random() < 0.1) {
                this.randomEvent();
            }
            
            // Update display
            this.updateDisplay();
            
        }, 10000); // Update every 10 seconds
    }
    
    randomEvent() {
        const events = [
            () => {
                if (this.state !== 'sleeping') {
                    this.showThought('I found something shiny! ✨');
                    this.updateStat('happiness', 8);
                }
            },
            () => {
                if (Math.random() < 0.3 && this.state !== 'sleeping') {
                    this.showThought('I think I caught a cold... 🤧');
                    this.updateStat('health', -25);
                }
            },
            () => {
                this.showThought('I love being your pet! 💖');
                this.updateStat('happiness', 15);
            },
            () => {
                if (this.stats.energy > 50) {
                    this.showThought('I\'m feeling energetic! Let\'s play! ⚡');
                    this.updateStat('energy', -10);
                    this.updateStat('happiness', 5);
                }
            },
            () => {
                // Random food bowl refill
                if (!this.foodBowlFull && this.state !== 'sleeping') {
                    this.refillFoodBowl();
                    this.showThought('Someone refilled my food bowl! 🎉');
                }
            }
        ];
        
        events[Math.floor(Math.random() * events.length)]();
    }
    
    startIdleAnimations() {
        // Random blinking/breathing
        setInterval(() => {
            if (this.state === 'idle' && Math.random() < 0.3) {
                this.petImage.style.transform = 'scale(1.02)';
                setTimeout(() => {
                    this.petImage.style.transform = 'scale(1)';
                }, 300);
            }
        }, 3000);
    }
    
    // UTILITY METHODS
    showThought(message, duration = 2500) {
        this.thoughtBubble.textContent = message;
        this.thoughtBubble.style.opacity = '1';
        
        // Clear previous timeout
        if (this.thoughtTimeout) {
            clearTimeout(this.thoughtTimeout);
        }
        
        this.thoughtTimeout = setTimeout(() => {
            this.thoughtBubble.style.opacity = '0';
        }, duration);
    }
    
    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    // GAME STATE MANAGEMENT
    saveGame() {
        try {
            const gameState = {
                stats: this.stats,
                state: this.state,
                mood: this.mood,
                position: this.petContainer.style.left || this.positions.center,
                foodBowlFull: this.foodBowlFull,
                timestamp: Date.now()
            };
            localStorage.setItem('virtualPetGame', JSON.stringify(gameState));
        } catch (error) {
            console.log('Could not save game:', error);
        }
    }
    
    loadGame() {
        try {
            const saved = localStorage.getItem('virtualPetGame');
            if (saved) {
                const data = JSON.parse(saved);
                
                // Check if save is not too old (24 hours)
                const hoursSinceSave = (Date.now() - (data.timestamp || 0)) / (1000 * 60 * 60);
                if (hoursSinceSave < 24) {
                    this.stats = data.stats || this.stats;
                    this.state = data.state || this.state;
                    this.mood = data.mood || this.mood;
                    this.foodBowlFull = data.foodBowlFull !== undefined ? data.foodBowlFull : true;
                    
                    if (data.position) {
                        this.petContainer.style.left = data.position;
                    }
                    
                    // Update food bowl image
                    this.updateFoodBowl();
                    
                    console.log('Game loaded from save');
                }
            }
        } catch (error) {
            console.log('Could not load game:', error);
        }
    }
    
    resetGame() {
        if (confirm('Are you sure you want to reset your pet to its initial state?')) {
            // Reset stats
            this.stats = {
                happiness: 100,
                hunger: 0,
                energy: 100,
                sleepiness: 0,
                health: 100,
                hygiene: 100
            };
            
            // Reset state
            this.state = 'idle';
            this.mood = 'Happy';
            this.isWalking = false;
            this.foodBowlFull = true;
            
            // Reset position
            this.petContainer.style.left = this.positions.center;
            
            // Update food bowl
            this.updateFoodBowl();
            
            // Clear animations
            this.petImage.className = 'pet-image';
            
            // Show message
            this.showThought('Fresh start! Let\'s have fun! 🌟');
            
            // Update display
            this.updateDisplay();
            
            // Clear save
            localStorage.removeItem('virtualPetGame');
        }
    }
}

// Initialize the game when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.virtualPet = new VirtualPet();
    
    // Console welcome
    console.log('%c🐾 Virtual Pet Game 🐾', 'font-size: 24px; color: #ff6b6b; font-weight: bold;');
    console.log('%cTake good care of your virtual pet!', 'color: #6a11cb; font-size: 16px;');
    console.log('%cKeyboard shortcuts: F=Feed, P=Play, S=Sleep, E=Pet, C=Clean, T=Treat, M=Medicine, R=Refill, Ctrl+X=Reset', 
                'color: #2ecc71; font-size: 14px;');
});