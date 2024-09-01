import { useEffect, useState } from "react";
import { getPosts } from "../../services/api";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react";
import TableHeader from "../../components/Table/TableHeader";
import TableBody from "../../components/Table/TableBody";
import PostRow from "../../components/Post/PostRow";
import CreatePostModal from "../../components/Post/CreatePostModal";

export default function Posts() {
  const [allPosts, setAllPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setAllPosts(data);
        setLoading(false);
      } catch (error) {
        console.error('Errore nel recupero dei post:', error);
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const filteredData = allPosts
    .filter(post => {
      const postTitle = post.title.toLowerCase();
      const postContent = post.title.toLowerCase();
      const postAuthorName = post.author.name.toLowerCase();
      const postAuthorSurname = post.author.surname.toLowerCase();
      const searchLower = searchTerm.toLowerCase();
      return postTitle.includes(searchLower) || postContent.includes(searchLower) || postAuthorName.includes(searchLower) || postAuthorSurname.includes(searchLower);
    });
    setPosts(filteredData);
  }, [searchTerm, allPosts]);

  const tableHeaders = ["Image", "Title", "Content", "Author", "Date", "Post details"];

  return (
    <div className="px-4">
      <TableHeader
        title="Posts List"
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
      >
        <Button onClick={handleOpen} className="flex items-center gap-3 rounded-full p-4" size="sm">
          <PlusIcon strokeWidth={2} className="h-4 w-4" /> Add Post
        </Button>
      </TableHeader>
      <TableBody
        theads={tableHeaders}
        rows={posts}
        loading={loading}
        emptyText="No posts found"
        RowComponent={PostRow}
        modal={<CreatePostModal open={open} handleOpen={handleOpen} setAllPosts={setAllPosts} />}
      />
    </div>
  );
}
