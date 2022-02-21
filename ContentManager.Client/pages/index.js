import { useRouter } from "next/router";

export default function Home({resources}) {
  const router = useRouter();
  router.push("/home");
  return (
    <>
    </>
  );
}
