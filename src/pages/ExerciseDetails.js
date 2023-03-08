import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import Details from "../components/Details";
import ExercisesVideos from "../components/ExercisesVideos";
import SimilarExercises from "../components/SimilarExercises";

import { exerciseOption, fetchData } from "../utils/fetchData";

// URL
const baseURLExercise = "https://exercisedb.p.rapidapi.com";
const baseURLYoutube = "https://youtube-search-and-download.p.rapidapi.com";

const ExerciseDetails = () => {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchExercisesData = async () => {
      const exerciseDetailsData = await fetchData(
        `${baseURLExercise}/exercises/exercise/${id}`,
        exerciseOption
      );

      setExerciseDetail(exerciseDetailsData);
    };
    fetchExercisesData();
  }, [id]);

  return (
    <Box sx={{ mt: { lg: "96px", xs: "60px" } }}>
      <Details exerciseDetail={exerciseDetail} />
      <ExercisesVideos />
      <SimilarExercises />
    </Box>
  );
};

export default ExerciseDetails;
