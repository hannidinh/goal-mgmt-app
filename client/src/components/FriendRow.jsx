import { FaTrash } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { DELETE_FRIEND } from '../mutations/friendMutations';
import { GET_FRIENDS } from '../queries/friendQueries';

export default function FriendRow({ friend }) {
    const [deleteFriend] = useMutation(DELETE_FRIEND, {
        variables: { id: friend.id },
        //refetchQueries: [{ query: GET_FRIENDS }]
        update(cache, { data: { deleteFriend } }) {
            const { friends } = cache.readQuery({ query: GET_FRIENDS });
            cache.writeQuery({
                query: GET_FRIENDS,
                data: { friends: friends.filter(friend => friend.id !== deleteFriend.id) }
            })
        }
    });
    return (
        <tr>
            <td>{ friend.name }</td>
            <td>{ friend.email }</td>
            <td>{ friend.phone }</td>
            <td>
                <button className="btn btn-danger btn-sm" onClick={deleteFriend}>
                    <FaTrash />
                </button>
            </td>
        </tr>
    )
}