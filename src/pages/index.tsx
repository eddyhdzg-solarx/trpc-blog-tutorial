import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div>
      <div>
        <Link href="/posts/new">Create post</Link>
      </div>
      <div>
        <Link href="/register">Register</Link>
      </div>
    </div>
  );
};

export default Home;
