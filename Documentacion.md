# Documentación de la arquitectura y uso del Context

## 1. Estructura de archivos

Dentro del repo tienes esto:

- **index.html**: la página principal donde carga todo.  
- **styles.css**: los estilos básicos.  
- **app.js**: es el fichero que arranca React.  
- **src/components/**: aquí van los componentes reutilizables`TaskList.js`, `TaskItem.js`, etc.  
- **src/context/TaskContext.js**: define el Context y el proveedor.  
- **settings.json**: configuración general de la app.

---

## 2. ¿Qué hago en TaskContext.js?

En `src/context/TaskContext.js` hago:

```js
import React, { createContext, useState, useContext } from 'react';

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const addTask = task => setTasks(prev => [...prev, task]);
  const removeTask = id => setTasks(prev => prev.filter(t => t.id !== id));

  return (
    <TaskContext.Provider value={{ tasks, addTask, removeTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks debe usarse dentro de un TaskProvider');
  }
  return context;
}
```

Con esto creo el Context (`TaskContext`), el proveedor (`TaskProvider`) y un hook (`useTasks`) para reutilizarlo en diferentes componentes

---

## 3. Uso del Context en componentes

- **TaskList.js**:  
  ```js
  import React from 'react';
  import { useTasks } from '../context/TaskContext';

  function TaskList() {
    const { tasks, removeTask } = useTasks();

    return (
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title}
            <button onClick={() => removeTask(task.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    );
  }

  export default TaskList;
  ```

- **TaskForm.js** :  
  ```js
  import React, { useState } from 'react';
  import { useTasks } from '../context/TaskContext';

  function TaskForm() {
    const [title, setTitle] = useState('');
    const { addTask } = useTasks();

    const handleSubmit = e => {
      e.preventDefault();
      addTask({ id: Date.now(), title });
      setTitle('');
    };

    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Escribe una tarea"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <button type="submit">Añadir</button>
      </form>
    );
  }

  export default TaskForm;
  ```

---

## 4. Integración en la APP

En `app.js` (o `index.js`) envolvemos la app con el proveedor:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { TaskProvider } from './src/context/TaskContext';
import App from './App';

ReactDOM.render(
  <TaskProvider>
    <App />
  </TaskProvider>,
  document.getElementById('root')
);
```
