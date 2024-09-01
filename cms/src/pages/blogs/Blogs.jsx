import { useEffect, useState } from "react";
import { getBlogs } from "../../services/api";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react";
import TableHeader from "../../components/Table/TableHeader";
import TableBody from "../../components/Table/TableBody";
import PostRow from "../../components/Blog/PostRow";
import CreatePostModal from "../../components/Blog/CreatePostModal";

export default function Blogs() {
  const [allBlogs, setAllBlogs] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getBlogs();
        setAllBlogs(data);
        setLoading(false);
      } catch (error) {
        console.error('Errore nel recupero dei brand:', error);
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    const filteredData = allBlogs.filter(brand => {
      const brandName = brand.name.toLowerCase();
      const searchLower = searchTerm.toLowerCase();
      return brandName.includes(searchLower);
    });
    setBlogs(filteredData);
  }, [searchTerm, allBlogs]);

  const tableHeaders = ["Image", "Title", "Content", "Author", "Date", "Blog details"];

  return (
    <div className="px-4">
      <TableHeader
        title="Blogs List"
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
      >
        <Button onClick={handleOpen} className="flex items-center gap-3 rounded-full p-4" size="sm">
          <PlusIcon strokeWidth={2} className="h-4 w-4" /> Add Post
        </Button>
      </TableHeader>
      <TableBody
        theads={tableHeaders}
        rows={blogs}
        loading={loading}
        emptyText="No posts found"
        RowComponent={PostRow}
        modal={<CreatePostModal open={open} handleOpen={handleOpen} setAllBlogs={setAllBlogs} />}
      />
    </div>
  );
}
