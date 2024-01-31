import { api } from "~/utils/api";
import { PageLayout } from "~/components/layout";
import React from "react";
import type { RouterOutputs } from "~/utils/api";
import Link from "next/link"

type Exercise = RouterOutputs["exercise"]["getAll"][number];
const ExerciseCard = (props: Exercise) => {
  const {id, name, contents} = props;
  return (
    <Link href={`/exercises/${id}`}>
    <div>
      {name}
      {contents}
    </div>
    </Link>
  )
}

// TODO lazy loading on those exercises
export default function Home() {
  const { data, isLoading } = api.exercise.getAll.useQuery();
  return (
    <PageLayout>
      {isLoading ? "carregando..." :
        data?.map((exercise) => {
          return <ExerciseCard key={exercise.id} {...exercise} />
        })}
    </PageLayout>
  );
}


