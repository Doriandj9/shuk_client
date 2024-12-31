import { useParams } from "react-router-dom";

const ViewPosts = () => {
    const params = useParams();

    
    return (
        <div>
            <h1>View Posts whit param {params.id}</h1>
        </div>
    );
};

export default ViewPosts;