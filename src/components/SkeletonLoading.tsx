import React from "react";
import { Skeleton } from "@mantine/core";

function SkeletonLoading() {
  return (
    <>
      <Skeleton height={100} mb="md" mt="30px" />
      <Skeleton height={300} />
    </>
  );
}

export default SkeletonLoading;
