import { useEffect } from "react";
import { useRouter } from "next/router";
import LoaderSpinner from "components/LoaderSpinner";

export default function Index({ resources }) {
  const router = useRouter();

  useEffect(() => {
    router.push("/home");
  });

  return (
    <>
      <LoaderSpinner/>
    </>
  );
}
