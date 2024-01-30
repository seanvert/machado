import { api } from "~/utils/api";
import { PageLayout } from "~/components/layout";
export default function Home() {
    const { data, isLoading } = api.post.getAllByUser.useQuery();
  return (
<PageLayout>
      <h1>stats</h1>
      { isLoading ? 
          "carregando..." : 
          data?.map((post) => { return <> <br/> {post.name} </>}) 
      }
        </PageLayout>
  );
}


