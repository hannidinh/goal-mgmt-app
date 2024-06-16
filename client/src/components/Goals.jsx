import Spinner from "./Spinner";
import { useQuery } from "@apollo/client";
import { GET_GOALS } from "../queries/goalQueries";
import GoalCard from './GoalCard';

export default function Goal() {
    const { loading, error, data } = useQuery(GET_GOALS);

    if (loading) return <Spinner />
    if (error) return <p>Something Went Wrong</p>

    return (
        <>
            { data.goals.length > 0 ? (
                <div className="row mt-4">
                    { data.goals.map((goal) => (
                        <GoalCard key={goal.id} goal={goal} />
                    )) }
                </div>
            ) : (<p>People with goals are ten times more likely to succeed</p>)}
        </>
    )
}