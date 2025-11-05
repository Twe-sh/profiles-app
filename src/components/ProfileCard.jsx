import Card from 'react-bootstrap/Card';

export default function ProfileCard({ name, likes, id, onLikeClicked }) {
    function likeClicked() {
        onLikeClicked(id)
    }

    return (
        <Card className="mb-3 shadow-sm ">
        <Card.Body>
            <Card.Title className="h5 mb-1">{name}</Card.Title>
            <Card.Text className="mb-0">Likes: {likes}</Card.Text>
            <button onClick={likeClicked}>Add Like</button>
        </Card.Body>
        </Card>
    );
}