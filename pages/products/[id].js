import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = async (url) => {
  const res = await fetch(url);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

export default function ProductDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = useSWR(`/api/products/${id}`, fetcher);
  const newData = { ...data };
  const { name, description, price, currency, category } = newData;

  if (isLoading) <p>Loading...</p>;

  return (
    <>
      <h2>{name}</h2>
      <ul>
        <li>{category}</li>
        <li>{description}</li>
        <li>
          Price: {price}
          {currency}
        </li>
      </ul>
    </>
  );
}
