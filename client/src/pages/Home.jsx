
import Friends from "../components/Friends";
import Goals from "../components/Goals";
import AddFriendModal from "../components/AddFriendModal";
import AddGoalModal from "../components/AddGoalModal";

export default function Home() {
    return (
        <>
            <div className="d-flex gap-3 mb-4">
                <AddFriendModal />
                <AddGoalModal />
            </div>
            <Goals />
            <hr />
            <Friends/>
            
        </>
    )
}