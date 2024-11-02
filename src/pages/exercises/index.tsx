import { api } from "~/utils/api";
import { PageLayout } from "~/components/layout";
import React from "react";
import type { RouterOutputs } from "~/utils/api";
import Link from "next/link"
import { LoadingPage } from "~/components/loading";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type Exercise = RouterOutputs["exercise"]["getAll"][number];
const ExerciseCard = (props: Exercise) => {
  const { id, name, contents } = props;
  return (
    <Link href={`/exercises/${id}`}>
      <Card>
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{contents}</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </Link>
  )
}

export default function Home() {
  const { data, isLoading } = api.exercise.getAll.useQuery();
  return (
    <PageLayout>
      {isLoading ? <LoadingPage /> :
        data?.map((exercise) => {
          return <ExerciseCard key={exercise.id} {...exercise} />
        })}
    </PageLayout>
  );
}


