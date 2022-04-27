import { useEffect } from "react";
import { useRouter } from "next/router";
import LoaderSpinner from "components/shared/LoaderSpinnerSpinner";

export default function Index({ resources }) {
  const router = useRouter();

  useEffect(() => {
    router.push("/home");
  });

  return (
    <>
      <LoaderSpinner />
    </>
  );
}
