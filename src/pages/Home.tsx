import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskTitleAlreadyInUse = tasks.find(task => task.title === newTaskTitle);

    if(taskTitleAlreadyInUse) {
      Alert.alert("Task já cadastrada", "Você não pode cadastrar uma task com o mesmo nome");
    } else {
      const newTask: Task = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false
      };
  
      setTasks(tasks => [...tasks, newTask])
    };
  }

  function handleToggleTaskDone(id: number) {
    setTasks(tasks => tasks.map(task => {
      if(task.id === id) {
        task.done = !task.done;
      };

      return task;
    }));
  }

  function handleRemoveTask(id: number) {
    Alert.alert("Remover item", "Tem certeza que você deseja remover esse item?", [{
      text: "Não",
    },
    {
      text: "Sim",
      onPress: () => {
        setTasks(tasks => tasks.filter(task => task.id !== id));
      }
    }]);
  }

  function handleEditTaskItem(taskId: number, taskNewTitle: string) {
    setTasks(tasks => tasks.map(task => {
      if(task.id === taskId) {
        task.title = taskNewTitle;
      };

      return task;
    }));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        editTask={handleEditTaskItem}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})