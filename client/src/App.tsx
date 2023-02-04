import './App.css'
import {ActionIcon, Box, Button, Container, List, Text, ThemeIcon} from '@mantine/core'
import useSWR from "swr"
import AddTodo from "../components/AddTodo";
import Grid from '@mui/material/Grid';
import ListTodos from "../components/ListTodos";


export interface Todo {
    id: number
    title: string
    body: string
    done: boolean
}

export const ENDPOINT = 'http://localhost:4000'

const fetcher = (url: string) => fetch(`${ENDPOINT}${url}`).then(response => response.json())

function App() {

  const {data, mutate} = useSWR<Todo[]>('/api/todos', fetcher)

    return (
        <Box
            sx={(theme) => ({
                padding: '2rem',
                width: '100%',
                maxWidth: '40rem',
                margin: '0 auto',

            })}
        >
            <Grid
                container spacing={2}
                minHeight={160}
                >
                {[...Array(15)].map((_, i) =>
                    <Grid xs key={i + "__Grid"} item={true} display="flex" justifyContent="center" alignItems="center">
                        <Container key={i + "__Container"}>
                        <ListTodos mutate={mutate} data={data} key={i + "__ListTodos"}/>
                        <AddTodo mutate={mutate} key={i + "__AddTodo"}/>
                        </Container>
                    </Grid>
                )}
            </Grid>
        </Box>

  )
}

export default App
