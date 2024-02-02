import { api } from "~/utils/api";
import { PageLayout } from "~/components/layout";
import { LoadingPage } from "~/components/loading";
export default function Home() {
    const { data, isLoading } = api.post.getAllByUser.useQuery();
  return (
<PageLayout>
      <h1>stats</h1>
      { isLoading ? 
          <LoadingPage /> : 
          data?.map((post) => { return <> <br/> {post.name} </>}) 
      }
        </PageLayout>
  );
}


