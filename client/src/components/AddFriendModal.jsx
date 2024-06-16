import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { ADD_FRIEND } from '../mutations/friendMutations';
import { GET_FRIENDS } from '../queries/friendQueries';

export default function AddFriendModal() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [addFriend] = useMutation(ADD_FRIEND, {
        variables: { name, email, phone },
        update(cache, { data: { addFriend }}) {
            const { friends } = cache.readQuery({
                query: GET_FRIENDS
            });
            cache.writeQuery({
                query: GET_FRIENDS,
                data: { friends: [...friends, addFriend] },
            })
        }
    })

    const onSubmit = (e) => {
        e.preventDefault();
        if (name === '' || email === '' || phone === '') {
            return alert('Please fill in all fields');
        }
        addFriend(name, email, phone);
        setName('');
        setEmail('');
        setPhone('');
    }

    return (
        <>
            <button 
                type="button" 
                className="btn btn-secondary" 
                data-bs-toggle="modal" 
                data-bs-target="#addFriendModal">

                <div className="d-flex align-items-center">
                    <FaUser className='icon' />
                    <div>Add Friend</div>
                </div>
            </button>

            <div 
                className="modal fade" 
                id="addFriendModal" 
                aria-labelledby="addFriendModalLabel" 
                aria-hidden="true">
                <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="addFriendModalLabel">
                                Add Friend
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
                                    <label className='form-label'>Email</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="email" 
                                        value={email} 
                                        onChange={(e) => { setEmail(e.target.value) }}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className='form-label'>Phone</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="phone" 
                                        value={phone} 
                                        onChange={(e) => { setPhone(e.target.value) }}
                                    />
                                </div>
                                <button  type="submit" data-bs-dismiss="modal" className="btn btn-secondary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}