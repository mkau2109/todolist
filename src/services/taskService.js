export const taskService = {
  getTasks: () => JSON.parse(localStorage.getItem('tasks')) || [],

  saveTask: (task) => {
    const tasks = taskService.getTasks();
    if (task.id) {
      const index = tasks.findIndex((t) => t.id === task.id);
      tasks[index] = task;
    } else {
      task.id = Date.now();
      tasks.push(task);
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
  },

  deleteTask: (id) => {
    const tasks = taskService.getTasks().filter((task) => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
};
