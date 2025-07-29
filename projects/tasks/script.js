document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const filterBtns = document.querySelectorAll('.filter-btn');

    const alarmModal = document.getElementById('alarm-modal');
    const alarmTaskText = document.getElementById('alarm-task-text');
    const alarmInput = document.getElementById('alarm-datetime-input');
    const setAlarmBtn = document.getElementById('set-alarm-btn');
    const cancelAlarmBtn = document.getElementById('cancel-alarm-btn');
    const removeAlarmBtn = document.getElementById('remove-alarm-btn');
    let currentEditingAlarmId = null;

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let currentFilter = 'all';

    const saveTasks = () => localStorage.setItem('tasks', JSON.stringify(tasks));

    const renderTasks = () => {
        taskList.innerHTML = '';
        const filteredTasks = tasks.filter(task => {
            if (currentFilter === 'completed') return task.completed;
            if (currentFilter === 'active') return !task.completed;
            return true;
        });

        filteredTasks.forEach(task => {
            const li = document.createElement('li');
            li.dataset.id = task.id;
            if (task.completed) li.classList.add('completed');

            const alarmActive = task.alarm && new Date(task.alarm) > new Date();
            const alarmDisplay = alarmActive ? `Alarma: ${new Date(task.alarm).toLocaleString()}` : '';

            li.innerHTML = `
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                <div class="task-details">
                    <span class="task-text-content">${task.text}</span>
                    ${alarmActive ? `<div class="alarm-display">${alarmDisplay}</div>` : ''}
                </div>
                <div class="task-actions">
                    <button class="alarm-btn ${alarmActive ? 'active' : ''}" aria-label="Fijar alarma"><i class="fas fa-bell"></i></button>
                    <button class="delete-btn" aria-label="Borrar tarea"><i class="fas fa-trash"></i></button>
                </div>
            `;
            taskList.appendChild(li);
        });
    };

    const saveAndRender = () => {
        saveTasks();
        renderTasks();
    };

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = taskInput.value.trim();
        if (text) {
            tasks.push({ id: Date.now(), text, completed: false, alarm: null });
            saveAndRender();
            taskInput.value = '';
        }
    });

    taskList.addEventListener('click', (e) => {
        const li = e.target.closest('li');
        if (!li) return;
        const id = parseInt(li.dataset.id);

        if (li.classList.contains('alarming')) {
            li.classList.remove('alarming');
            const task = tasks.find(t => t.id === id);
            if (task) task.alarm = null;
            saveAndRender();
            return;
        }

        if (e.target.closest('.delete-btn')) {
            tasks = tasks.filter(t => t.id !== id);
        } else if (e.target.closest('.alarm-btn')) {
            openAlarmModal(id);
            return;
        } else if (e.target.type === 'checkbox') {
            const task = tasks.find(t => t.id === id);
            if (task) task.completed = e.target.checked;
        }
        saveAndRender();
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderTasks();
        });
    });

    // Alarm Logic
    const openAlarmModal = (id) => {
        currentEditingAlarmId = id;
        const task = tasks.find(t => t.id === id);
        alarmTaskText.textContent = task.text;
        alarmInput.value = task.alarm ? task.alarm.slice(0, 16) : '';
        alarmModal.classList.add('visible');
    };

    const closeModal = () => alarmModal.classList.remove('visible');
    setAlarmBtn.addEventListener('click', () => {
        if (currentEditingAlarmId && alarmInput.value) {
            const task = tasks.find(t => t.id === currentEditingAlarmId);
            if (task) task.alarm = alarmInput.value;
            saveAndRender();
        }
        closeModal();
    });
    removeAlarmBtn.addEventListener('click', () => {
        if (currentEditingAlarmId) {
            const task = tasks.find(t => t.id === currentEditingAlarmId);
            if (task) task.alarm = null;
            saveAndRender();
        }
        closeModal();
    });
    cancelAlarmBtn.addEventListener('click', closeModal);

    const checkAlarms = () => {
        const now = new Date();
        tasks.forEach(task => {
            if (task.alarm && !task.completed && now >= new Date(task.alarm)) {
                const taskLi = document.querySelector(`li[data-id='${task.id}']`);
                if (taskLi) taskLi.classList.add('alarming');
            }
        });
    };

    setInterval(checkAlarms, 1000);
    renderTasks();
});
