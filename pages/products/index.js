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

export default function ProductsPage() {
  const { data, isLoading } = useSWR(`/api/products`, fetcher);
  if (isLoading) return "is loading";
  console.log(data);

  return (
    <ul>
      {data.map((product) => (
        <li key={product.id}>
          <p>{product.name}</p>
        </li>
      ))}
    </ul>
  );
}
