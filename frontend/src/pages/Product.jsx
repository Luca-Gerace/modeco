import { useParams } from "react-router-dom";

export default function Product() {
    // Navigation hook
    const { id } = useParams();
    // const navigate = useNavigate();
    return (
      <div>Product id: {id}</div>
    )
}