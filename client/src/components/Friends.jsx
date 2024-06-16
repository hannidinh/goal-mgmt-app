import { useQuery } from '@apollo/client';
import FriendRow from './FriendRow';
import Spinner from './Spinner';
import { GET_FRIENDS } from '../queries/friendQueries';

export default function Friends() {
    const { loading, error, data} = useQuery(GET_FRIENDS)
    if (loading) return <Spinner />;
    if (error) return <p>Something Went Wrong</p>;

    return <>{!loading && !error && (
        <table className='table table-hover mt-3'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {data.friends.map(friend => (
                    <FriendRow key={friend.id} friend = {friend} />
                ))}
            </tbody>
        </table>
    )}</>

}