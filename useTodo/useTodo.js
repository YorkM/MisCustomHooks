import { useEffect, useReducer } from "react";
import { todoReducer } from "./todoReducer";

export const useTodo = () => {
   
    const init = () => {
        return JSON.parse( localStorage.getItem( 'todos' ) ) || [];
    }

    const initialState = [];

    const [todos, dispatch] = useReducer(todoReducer, initialState, init);

    useEffect(() => {
        localStorage.setItem( 'todos', JSON.stringify( todos ) );
    }, [ todos ]);

    const handleNewTodo = ( newTodo ) => {
        const action = {
            type: '[TODO] add todo',
            payload: newTodo
        }

        dispatch( action );
    }

    const handleDeleteTodo = ( id ) => {
        let confirmar = confirm('¿Está seguro que dese eliminar el todo?');
        if ( confirmar ) {
            dispatch({
                type: '[TODO] remove todo',
                payload: id
            })
        }
    }

    const handleToggleTodo = ( id ) => {
        dispatch({
            type: '[TODO] toggle todo',
            payload: id
        })
    }  

    const todosPending = todos.filter( todo => !todo.done );
  
    return {
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo,
        todos,
        todosCount: todos.length,
        todosPending: todosPending.length
    } 
}
