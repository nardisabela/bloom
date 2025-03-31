document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const taskInput = document.getElementById('taskInput');
    const addBtn = document.getElementById('addBtn');
    const taskList = document.getElementById('taskList');
    const taskCount = document.getElementById('taskCount');
    
    // Audio elements
    const bgMusic = document.getElementById('bgMusic');
    const addSound = document.getElementById('addSound');
    const completeSound = document.getElementById('completeSound');
    const notificationSound = document.getElementById('notificationSound');
    const musicToggle = document.getElementById('musicToggle');
    const volumeControl = document.getElementById('volumeControl');
    
    // Initialize
    let isMusicPlaying = false;
    let audioEnabled = false;
    
    // Set initial volumes
    bgMusic.volume = 0.3;
    addSound.volume = 0.4;
    completeSound.volume = 0.6;
    notificationSound.volume = 0.5;
    
    // Task Functions
    function addTask() {
        const taskText = taskInput.value.trim();
        
        if (!taskText) {
            showNotification("Please enter a task first!");
            notificationSound.play().catch(e => console.log("Sound error:", e));
            return;
        }
        
        // Create task element
        const taskItem = document.createElement('li');
        const date = new Date().toLocaleString();
        
        taskItem.innerHTML = `
            <span class="task-text">${taskText}</span>
            <span class="task-date">${date}</span>
            <button class="delete-btn" title="Complete task">
                <i class="fas fa-check"></i>
            </button>
        `;
        
        // Add delete functionality
        const deleteBtn = taskItem.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', function() {
            completeSound.play().catch(e => console.log("Sound error:", e));
            taskItem.classList.add('completed');
            setTimeout(() => {
                taskItem.remove();
                updateTaskCount();
            }, 300);
        });
        
        // Add to list
        taskList.appendChild(taskItem);
        taskInput.value = "";
        updateTaskCount();
        
        // Play sound and animate
        addSound.play().catch(e => console.log("Sound error:", e));
        taskItem.style.animation = 'fadeIn 0.5s ease-out';
    }
    
    function updateTaskCount() {
        const count = taskList.children.length;
        taskCount.textContent = `${count} ${count === 1 ? 'task' : 'tasks'} blooming`;
    }
    
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 10);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // Event Listeners
    addBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') addTask();
    });
    
    // Music Controls
    function enableAudio() {
        audioEnabled = true;
        musicToggle.addEventListener('click', toggleMusic);
        volumeControl.addEventListener('input', () => {
            bgMusic.volume = volumeControl.value;
        });
    }
    
    function toggleMusic() {
        isMusicPlaying = !isMusicPlaying;
        if (isMusicPlaying) {
            bgMusic.play().catch(e => console.log("Music error:", e));
            musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            bgMusic.pause();
            musicToggle.innerHTML = '<i class="fas fa-music"></i>';
        }
    }
    
    // Initial setup
    document.addEventListener('click', enableAudio, { once: true });
    document.addEventListener('keydown', enableAudio, { once: true });
    updateTaskCount();
});