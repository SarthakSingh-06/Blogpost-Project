import { useState, useEffect } from "react";
import { Container, PostCard } from "../components/index.js";
import dbAndBucketService from "../appwrite/database-and-storage.js";

function AllPost() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        dbAndBucketService.getAllPosts([])
        .then((posts) => {
            if (posts)
                setPosts(posts.rows)
        })
    }, []);

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div className="p-2 w-1/4">
                            <PostCard 
                                key={post.$id}
                                $id={post.$id}
                                title={post.title}
                                featuredImage={post.featuredImage}
                            />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default AllPost;
