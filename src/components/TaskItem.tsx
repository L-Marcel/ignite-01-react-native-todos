import React, { useEffect, useRef, useState } from "react";
import { Image, TouchableOpacity, View, StyleSheet, Text, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Task } from "./TasksList";
import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/edit/edit.png'

interface TaskItemProps {
  task: Task;
  index: number;
  toggleTaskDone(id: number): void;
  removeTask(id: number): void;
  editTask(id: number, title: string): void;
}

export function TaskItem({
  task,
  index,
  toggleTaskDone,
  removeTask,
  editTask
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setIsEditing(false);
    setTitle(task.title);
  }

  function handleSubmitEditing() {
    editTask(task.id, title);
    setIsEditing(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing])

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => {
            toggleTaskDone(task.id);
          }}
        >
          <View 
            testID={`marker-${index}`}
            style={task.done? styles.taskMarkerDone:styles.taskMarker}
          >
            { task.done && (
              <Icon 
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput
            value={title}
            ref={textInputRef}
            onChangeText={setTitle}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            style={task.done? styles.taskTextDone:styles.taskText}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.iconsContainer}>
        {
          isEditing? <TouchableOpacity
            onPress={handleCancelEditing}
            style={{ paddingHorizontal: 14 }}
          >
            <Icon name="x" size={24} color="#b2b2b2"/>
          </TouchableOpacity>:
          <TouchableOpacity
            onPress={handleStartEditing}
            style={{ paddingHorizontal: 14 }}
          >
            <Image source={editIcon}/>
          </TouchableOpacity>
        }
        <View style={styles.iconsDivider}/>
        <TouchableOpacity
          testID={`trash-${index}`}
          style={{ paddingLeft: 14, paddingRight: 24 }}
          onPress={() => {
            removeTask(task.id);
          }}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </>
  );
};


const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  iconsDivider: {
    borderColor: '#b2b2b2',
    borderLeftWidth: 2
  }
})