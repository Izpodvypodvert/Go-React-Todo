import {ActionIcon, List, Text} from '@mantine/core'
import  {KeyedMutator} from "swr"

import {CheckCircleFillIcon, RepoDeletedIcon} from "@primer/octicons-react";
import {ENDPOINT, Todo} from "../src/App";


function ListTodos({mutate, data}: { mutate: KeyedMutator<Todo[]>, data: Todo[] | undefined }) {

    async function markTodoAsDone(id: number) {
        const updated = await fetch(`${ENDPOINT}/api/todos/${id}/done`, {
            method: 'PATCH',
        }).then(response => response.json())

        await mutate(updated)
    }

    async function deleteTodo(id: number) {
        const updated = await fetch(`${ENDPOINT}/api/todos/${id}/delete`, {
            method: 'DELETE',
        }).then(response => response.json())

        await mutate(updated)
    }

    return (

            <List spacing="xs" size="sm" mb={12} center>
                {data?.map((todo) => {
                    return <List.Item
                        key={`todo_list__${todo.id}`}>

                        <div style={{display: 'flex'}}>
                            <Text color="white">{todo.title}</Text>
                            {todo.done ?
                                (
                                    <ActionIcon onClick={() => markTodoAsDone(todo.id)} color="teal" size={24}
                                                radius="xl">
                                        <CheckCircleFillIcon size={20}/>
                                    </ActionIcon>
                                ) :
                                (
                                    <ActionIcon onClick={() => markTodoAsDone(todo.id)} color="gray" size={24}
                                                radius="xl">
                                        <CheckCircleFillIcon size={20}/>
                                    </ActionIcon>
                                )}
                            <ActionIcon onClick={() => deleteTodo(todo.id)} color="red" size={24} radius="xl">
                                <RepoDeletedIcon size={20}/>
                            </ActionIcon>

                        </div>
                    </List.Item>
                })}
            </List>
    )
}

export default ListTodos