import { api } from "~/utils/api";
import { PageLayout } from "~/components/layout";
type Inputs = {
  textAreaID: string
}
// TODO lazy loading on those exercises
export default function Home() {
  const { data, isLoading } = api.exercise.getAll.useQuery();
  return (
<PageLayout>
        { isLoading ? "carregando..." : 
        data?.map((exercise) => { 
          return <div key={exercise.id}> <br/> {exercise.name} </div> 
          })}
          </PageLayout>
  );
}


