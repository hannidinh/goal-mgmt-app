import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { GET_GOALS } from '../queries/goalQueries';
import { useMutation } from '@apollo/client';
import { DELETE_GOAL } from '../mutations/goalMutations';

export default function DeleteGoalButton({ goalId }) {
    const navigate = useNavigate();
    const [deleteGoal] = useMutation(DELETE_GOAL, {
        variables: { id: goalId },
        onCompleted: () => navigate('/'),
        refetchQueries: [{ query: GET_GOALS }],
    })

    return (
        <div className='d-flex mt-5 ms-auto'>
            <button className="btn btn-danger m-2" onClick={deleteGoal}>
                <FaTrash className="icon"/> Delete Goal
            </button>
        </div>
    );
}