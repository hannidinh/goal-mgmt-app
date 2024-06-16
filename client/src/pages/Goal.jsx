
import { Link, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import FriendInfo from '../components/FriendInfo';
import { useQuery } from '@apollo/client';
import { GET_GOAL } from '../queries/goalQueries';
import DeleteGoalButton from '../components/DeleteGoalButton';
import EditGoalForm from '../components/EditGoalForm';

export default function Goal() {
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_GOAL, { variables: {id}});

    if (loading) return <Spinner />;
    if (error) return <p>Something Went Wrong</p>

    return (
        <>
            {!loading && !error && (
                <div className="mx-auto w-75 card p-5">
                    <Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">Back</Link>
                    <h1>{ data.goal.name }</h1>
                    <p>{ data.goal.description }</p>
                    <h5 className="mt-3">Goal Status</h5>
                    <p className="lead">{data.goal.status}</p>

                    <FriendInfo friend={data.goal.friend} />

                    <EditGoalForm goal={data.goal} />

                    <DeleteGoalButton goalId={data.goal.id} />
                </div>
            )}
        </>
    )
}