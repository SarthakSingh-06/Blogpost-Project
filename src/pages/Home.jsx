import { useEffect, useState } from "react";
import dbAndBucketService from "../appwrite/database-and-storage.js";
import { Container, PostCard } from "../components/index.js";

function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        dbAndBucketService.getAllPosts([])
            .then((posts) => {
                if (posts) {
                    setPosts(posts.rows);
                }
            });
    }, []);

    if (posts.length === 0) {
        return (
            <div className="py-8 w-full mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                No posts found
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="py-8 w-full">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div
                            key={post.$id}
                            className="p-2 w-1/4"
                        >
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

export default Home;
