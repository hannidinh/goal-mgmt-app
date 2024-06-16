import { useState } from 'react';
import { FaList } from 'react-icons/fa';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_GOAL } from '../mutations/goalMutations';
import { GET_GOALS } from '../queries/goalQueries';
import { GET_FRIENDS } from '../queries/friendQueries';

export default function AddGoalModal() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [friendId, setFriendId] = useState('');
    const [status, setStatus] = useState('new');

    const [addGoal] = useMutation(ADD_GOAL, {
        variables: { name, description, friendId, status },
        update(cache, { data: { addGoal } }) {
            const { goals } = cache.readQuery({ query: GET_GOALS });
            cache.writeQuery({
                query: GET_GOALS,
                data: { goals: [...goals, addGoal] },
            });
        }
    }); 

    //Get Friends for select
    const { loading, error, data } = useQuery(GET_FRIENDS);

    const onSubmit = (e) => {
        e.preventDefault();
        if (name === '' || description === '' || status === '') {
            return alert('Please fill in all fields');
        }

        addGoal(name, description, friendId, status);

        setName('');
        setDescription('');
        setStatus('new');
        setFriendId('');
    };

    if (loading) return null;
    if (error) return 'Something Went Wrong';

    return (
        <>
            {!loading && !error && (
            <>
            <button 
                type="button" 
                className="btn btn-primary" 
                data-bs-toggle="modal" 
                data-bs-target="#addGoalModal">

                <div className="d-flex align-items-center">
                    <FaList className='icon' />
                    <div>Add Goal</div>
                </div>
            </button>

            <div 
                className="modal fade" 
                id="addGoalModal" 
                aria-labelledby="addGoalModalLabel" 
                aria-hidden="true">
                <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="addGoalModalLabel">
                                New Goal
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={onSubmit}>
                                <div className="mb-3">
                                    <label className='form-label'>Name</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="name" 
                                        value={name} 
                                        onChange={(e) => { setName(e.target.value) }}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className='form-label'>Description</label>
                                    <textarea 
                                        className="form-control" 
                                        id="description" 
                                        value={description} 
                                        onChange={(e) => { setDescription(e.target.value) }}>   
                                    </textarea>
                                </div>
                                <div className="mb-3">
                                    <label className='form-label'>Status</label>
                                    <select 
                                        id="status" 
                                        className="form-select" 
                                        value={status} 
                                        onChange={(e) => setStatus(e.target.value)}
                                    >   
                                        <option value="new">Not Started</option>
                                        <option value="progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Share your goal with your BFF!</label>
                                    <select
                                        id='friendId'
                                        className='form-select'
                                        value={friendId}
                                        onChange={(e) => setFriendId(e.target.value)}>
                                        <option value=''>Select Friend</option>
                                        {data.friends.map((friend) => (
                                        <option key={friend.id} value={friend.id}>
                                            {friend.name}
                                        </option>
                                        ))}
                                    </select>
                                </div>
                                <button  type="submit" data-bs-dismiss="modal" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>  
                </>
            )}

        </>
    )
}